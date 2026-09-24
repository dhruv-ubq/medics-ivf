import "server-only";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb, COL } from "./db";

export const SESSION_COOKIE = "miv_session";
const TTL_H = Number(process.env.SESSION_TTL_HOURS || 8);
const MAX_FAILS = 5, LOCK_MIN = 15;

const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);
const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");

export async function verifyLogin(email, password) {
  const db = await getDb();
  const users = db.collection(COL.users);
  const u = await users.findOne({ email: String(email || "").toLowerCase().trim() });
  // Same response and similar timing whether or not the user exists.
  const hash = u?.passwordHash || DUMMY_HASH;
  if (u?.lockedUntil && u.lockedUntil > new Date()) { await bcrypt.compare(String(password || ""), hash); return { ok: false, locked: true }; }
  const match = await bcrypt.compare(String(password || ""), hash);
  if (!u || !u.active || !match) {
    if (u) {
      const fails = (u.failedAttempts || 0) + 1;
      await users.updateOne({ _id: u._id }, { $set: { failedAttempts: fails >= MAX_FAILS ? 0 : fails, ...(fails >= MAX_FAILS ? { lockedUntil: new Date(Date.now() + LOCK_MIN * 60000) } : {}) } });
    }
    return { ok: false };
  }
  await users.updateOne({ _id: u._id }, { $set: { failedAttempts: 0, lastLoginAt: new Date() }, $unset: { lockedUntil: "" } });
  return { ok: true, user: u };
}

export async function createSession(user, meta = {}) {
  const db = await getDb();
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + TTL_H * 3600 * 1000);
  await db.collection(COL.sessions).insertOne({ tokenHash: sha256(token), userId: user._id, createdAt: new Date(), expiresAt, ip: meta.ip || "", ua: (meta.ua || "").slice(0, 200) });
  cookies().set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: expiresAt });
}

export async function destroySession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) { const db = await getDb(); await db.collection(COL.sessions).deleteOne({ tokenHash: sha256(token) }); }
  cookies().delete(SESSION_COOKIE);
}

// Returns { user, role, permissions } or null.
export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await getDb();
  const s = await db.collection(COL.sessions).findOne({ tokenHash: sha256(token), expiresAt: { $gt: new Date() } });
  if (!s) return null;
  const user = await db.collection(COL.users).findOne({ _id: new ObjectId(s.userId), active: true }, { projection: { passwordHash: 0 } });
  if (!user) return null;
  const role = await db.collection(COL.roles).findOne({ name: user.role });
  return { user: { id: String(user._id), email: user.email, name: user.name, role: user.role }, permissions: role?.permissions || [] };
}

export async function hashPassword(pw) { return bcrypt.hash(pw, 12); }
