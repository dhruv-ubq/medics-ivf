// Seeds MongoDB for medics IVF: indexes, roles, the first admin user, and default site content.
// Safe to run more than once. Usage:
//   npm run seed                                   (uses SEED_ADMIN_* from .env)
//   npm run seed -- --email you@ubq.in --password "S3cure!pass" --name "Mohit"
//   npm run seed -- --reset-password               (reset the admin's password to the one given)
//   npm run seed -- --reset-content                (overwrite site content with defaults, as a new version)
import fs from "node:fs";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { ensureIndexes, ROLES } from "../lib/server/indexes.mjs";
import { DEFAULTS, SECTION_KEYS } from "../lib/defaults.js";

// Load .env automatically if present on disk
if (fs.existsSync(".env") && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env");
  } catch {}
}

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "medics-ivf";
const email = (opt("email") || process.env.SEED_ADMIN_EMAIL || "").toLowerCase().trim();
const password = opt("password") || process.env.SEED_ADMIN_PASSWORD || "";
const name = opt("name") || process.env.SEED_ADMIN_NAME || "Administrator";

function fail(msg) { console.error("\n  x " + msg + "\n"); process.exit(1); }
if (!uri) fail("MONGODB_URI is missing. Add it to .env");
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fail("Provide a valid admin email (SEED_ADMIN_EMAIL or --email)");
if (password.length < 10 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) fail("Admin password must be at least 10 characters with letters and numbers");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
try {
  await client.connect();
  const db = client.db(dbName);
  console.log(`\n  Connected to ${uri.replace(/\/\/[^@]*@/, "//***@")} (${dbName})`);

  await ensureIndexes(db);
  console.log("  + Indexes ready");

  for (const r of ROLES) await db.collection("roles").updateOne({ name: r.name }, { $set: { label: r.label, permissions: r.permissions, updatedAt: new Date() }, $setOnInsert: { name: r.name, createdAt: new Date() } }, { upsert: true });
  console.log(`  + Roles: ${ROLES.map((r) => r.name).join(", ")}`);

  const users = db.collection("users");
  const existing = await users.findOne({ email });
  if (!existing) {
    await users.insertOne({ email, name, role: "admin", passwordHash: await bcrypt.hash(password, 12), active: true, failedAttempts: 0, createdAt: new Date(), passwordChangedAt: new Date() });
    console.log(`  + Admin user created: ${email}`);
  } else {
    const set = { role: "admin", active: true, name };
    if (flag("reset-password")) Object.assign(set, { passwordHash: await bcrypt.hash(password, 12), passwordChangedAt: new Date(), failedAttempts: 0 });
    await users.updateOne({ _id: existing._id }, { $set: set, ...(flag("reset-password") ? { $unset: { lockedUntil: "" } } : {}) });
    if (flag("reset-password")) {
      console.log(`  = Admin user exists: ${email} (password reset successfully & lockout cleared)`);
    } else {
      console.log(`  = Admin user exists: ${email} (password unchanged)`);
      console.log(`    Note: To update password or clear account lockout, run: npm run seed:reset (or npm run seed -- --reset-password)`);
    }
  }

  const content = db.collection("content"), versions = db.collection("content_versions");
  for (const key of SECTION_KEYS) {
    const doc = await content.findOne({ key });
    if (!doc || flag("reset-content")) {
      const version = (doc?.version || 0) + 1;
      await content.updateOne({ key }, { $set: { key, draft: DEFAULTS[key], published: DEFAULTS[key], version, publishedAt: new Date(), publishedBy: "seed", updatedAt: new Date(), updatedBy: "seed" } }, { upsert: true });
      await versions.insertOne({ key, version, data: DEFAULTS[key], publishedAt: new Date(), publishedBy: "seed", note: doc ? "Reset to defaults" : "Initial content" });
      console.log(`  + Content "${key}" ${doc ? "reset" : "seeded"} (v${version})`);
    } else console.log(`  = Content "${key}" kept (v${doc.version})`);
  }
  await db.collection("audit_log").insertOne({ at: new Date(), user: "seed", action: "seed", key: "all" });
  console.log("\n  Done. Start the app and sign in at /admin/login\n");
} catch (e) {
  fail(`Seeding failed: ${e.message}`);
} finally {
  await client.close();
}
