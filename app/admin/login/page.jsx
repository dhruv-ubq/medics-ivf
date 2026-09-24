import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/auth";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default async function Login({ searchParams }) {
  const next = typeof searchParams?.next === "string" && searchParams.next.startsWith("/") ? searchParams.next : "/admin";
  const s = await getSession().catch(() => null);
  if (s) redirect(next);
  return (
    <section className="bg-lavender">
      <div className="container-x grid min-h-[70vh] place-items-center py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-float md:p-10">
          <p className="eyebrow text-purple">Content studio</p>
          <h1 className="display-lg mt-2">Sign in</h1>
          <p className="mt-2 text-[14.5px] text-body-muted">For the medics IVF marketing team.</p>
          <LoginForm next={next} />
        </div>
      </div>
    </section>
  );
}
