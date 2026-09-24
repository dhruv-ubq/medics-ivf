import "server-only";
import { MongoClient, GridFSBucket } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "medics-ivf";

// Reuse one client across hot reloads and requests.
const g = globalThis;
function clientPromise() {
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env");
  if (!g.__mivMongo) g.__mivMongo = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 4000 }).connect();
  return g.__mivMongo;
}

export async function getDb() {
  const client = await clientPromise();
  return client.db(dbName);
}

export async function getBucket() {
  return new GridFSBucket(await getDb(), { bucketName: "media" });
}

export const COL = {
  users: "users",
  roles: "roles",
  sessions: "sessions",
  content: "content",
  versions: "content_versions",
  audit: "audit_log",
};
