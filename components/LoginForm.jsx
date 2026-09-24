"use client";
import { useState } from "react";

export default function LoginForm({ next = "/admin" }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const r = await fetch(`${base}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(j.error || "Sign in failed"); setBusy(false); return; }
      const target = next.startsWith(base) ? next : `${base}${next.startsWith("/") ? next : `/${next}`}`;
      window.location.assign(target);
    } catch { setErr("Network error. Please try again."); setBusy(false); }
  };
  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block"><span className="mb-1.5 block font-display text-[13px] font-semibold text-ink">Email</span>
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3 text-[15px] focus:border-orange focus:outline-none" /></label>
      <label className="block"><span className="mb-1.5 block font-display text-[13px] font-semibold text-ink">Password</span>
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3 text-[15px] focus:border-orange focus:outline-none" /></label>
      {err && <p role="alert" className="rounded-xl bg-peach px-4 py-2.5 text-[14px] text-orange">{err}</p>}
      <button disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
