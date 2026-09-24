import "server-only";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { getDb, COL } from "./db";
import { DEFAULTS, SECTION_KEYS } from "../defaults";

const TAG = "site-content";
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

async function readAll() {
  const db = await getDb();
  const docs = await db.collection(COL.content).find({ key: { $in: SECTION_KEYS } }).toArray();
  return Object.fromEntries(docs.map((d) => [d.key, d]));
}

// Public site: published content, cached and invalidated on publish. Falls back to defaults if the DB is unreachable.
export const getPublishedContent = unstable_cache(async () => {
  try {
    const docs = await readAll();
    return Object.fromEntries(SECTION_KEYS.map((k) => [k, docs[k]?.published ?? DEFAULTS[k]]));
  } catch (e) {
    console.error("[content] using defaults, DB unavailable:", e.message);
    return { ...DEFAULTS };
  }
}, ["published-content"], { tags: [TAG], revalidate: 300 });

// Draft preview (not cached).
export async function getDraftContent() {
  const docs = await readAll();
  return Object.fromEntries(SECTION_KEYS.map((k) => [k, docs[k]?.draft ?? docs[k]?.published ?? DEFAULTS[k]]));
}

// Admin overview: draft + status per section.
export async function getAdminState() {
  const docs = await readAll();
  return SECTION_KEYS.map((k) => {
    const d = docs[k];
    const draft = d?.draft ?? d?.published ?? DEFAULTS[k];
    const published = d?.published ?? DEFAULTS[k];
    return { key: k, draft, version: d?.version || 0, hasChanges: !same(draft, published), updatedAt: d?.updatedAt || null, updatedBy: d?.updatedBy || null, publishedAt: d?.publishedAt || null, publishedBy: d?.publishedBy || null };
  });
}

async function audit(db, user, action, key, extra = {}) {
  await db.collection(COL.audit).insertOne({ at: new Date(), user: user.email, action, key, ...extra });
}

export async function saveDraft(key, data, user) {
  const db = await getDb();
  await db.collection(COL.content).updateOne(
    { key },
    { $set: { draft: data, updatedAt: new Date(), updatedBy: user.email }, $setOnInsert: { key, published: DEFAULTS[key], version: 0 } },
    { upsert: true }
  );
  // One activity entry per editing session, not per autosave.
  const recent = await db.collection(COL.audit).findOne({ user: user.email, key, action: "draft.save", at: { $gt: new Date(Date.now() - 15 * 60000) } });
  if (!recent) await audit(db, user, "draft.save", key);
}

export async function discardDraft(key, user) {
  const db = await getDb();
  const d = await db.collection(COL.content).findOne({ key });
  await db.collection(COL.content).updateOne({ key }, { $set: { draft: d?.published ?? DEFAULTS[key], updatedAt: new Date(), updatedBy: user.email } }, { upsert: true });
  await audit(db, user, "draft.discard", key);
}

export async function publish(keys, user, note = "") {
  const db = await getDb();
  const published = [];
  for (const key of keys.filter((k) => SECTION_KEYS.includes(k))) {
    const d = await db.collection(COL.content).findOne({ key });
    if (!d || same(d.draft, d.published)) continue;
    const version = (d.version || 0) + 1;
    await db.collection(COL.versions).insertOne({ key, version, data: d.draft, publishedAt: new Date(), publishedBy: user.email, note: String(note).slice(0, 200) });
    await db.collection(COL.content).updateOne({ key }, { $set: { published: d.draft, version, publishedAt: new Date(), publishedBy: user.email } });
    await audit(db, user, "publish", key, { version });
    published.push({ key, version });
  }
  if (published.length) { revalidateTag(TAG); revalidatePath("/", "layout"); }
  return published;
}

export async function listVersions(key, limit = 20) {
  const db = await getDb();
  return db.collection(COL.versions).find({ key }, { projection: { data: 0 } }).sort({ version: -1 }).limit(limit).toArray();
}

// Restore puts an old version into the draft, so it can be reviewed before publishing again.
export async function restoreVersion(key, version, user) {
  const db = await getDb();
  const v = await db.collection(COL.versions).findOne({ key, version: Number(version) });
  if (!v) return false;
  await db.collection(COL.content).updateOne({ key }, { $set: { draft: v.data, updatedAt: new Date(), updatedBy: user.email } });
  await audit(db, user, "draft.restore", key, { version: v.version });
  return true;
}

export async function recentAudit(limit = 25) {
  const db = await getDb();
  return db.collection(COL.audit).find({}).sort({ at: -1 }).limit(limit).toArray();
}
