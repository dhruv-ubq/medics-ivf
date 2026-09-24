import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/auth";
import AdminStudio from "@/components/AdminStudio";

export const dynamic = "force-dynamic";
export const metadata = { title: "Content studio", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const session = await getSession().catch(() => null);
  if (!session) redirect("/admin/login");
  return <AdminStudio user={session.user} permissions={session.permissions} />;
}
