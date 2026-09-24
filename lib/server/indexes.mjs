// Shared by the app and the seed script. Plain ESM, no Next.js imports.
export async function ensureIndexes(db) {
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("roles").createIndex({ name: 1 }, { unique: true });
  await db.collection("sessions").createIndex({ tokenHash: 1 }, { unique: true });
  await db.collection("sessions").createIndex({ userId: 1 });
  try { await db.collection("sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }); }
  catch (e) { await db.collection("sessions").createIndex({ expiresAt: 1 }); } // servers without TTL support
  await db.collection("content").createIndex({ key: 1 }, { unique: true });
  await db.collection("content_versions").createIndex({ key: 1, version: -1 });
  await db.collection("audit_log").createIndex({ at: -1 });
}

export const ROLES = [
  { name: "admin", label: "Administrator", permissions: ["content:read", "content:write", "content:publish", "media:upload", "users:manage"] },
  { name: "editor", label: "Editor", permissions: ["content:read", "content:write", "media:upload"] },
];
