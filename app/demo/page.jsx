"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { site, roles, clinicLevels } from "@/lib/content";

const gets = ["A 30 minute demo on your own workflows", "The clinic platform and medics care, together", "A migration and rollout plan for your centres", "A clear, written quote"];

export default function Demo() {
  const [sent, setSent] = useState(false);
  const [level, setLevel] = useState(clinicLevels[0].label);
  const [interest, setInterest] = useState("Both");
  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());
    const body = [`Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`, `Clinic: ${d.clinic}`, `Clinic level: ${level}`, `Role: ${d.role}`, `Interested in: ${interest}`, "", d.message || ""].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("medics IVF demo: " + d.clinic)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section className="bg-cream">
      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow text-orange">Book a demo</p>
          <h1 className="display-hero mt-5">See medics IVF on your workflows.</h1>
          <p className="body-lg mt-5 text-body">Tell us a little about your clinic. We will shape the demo around your level, your roles and the system you use today.</p>
          <ul className="mt-8 space-y-3">{gets.map((g) => <li key={g} className="flex gap-3 text-[16px] text-ink"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-green"><Icon name="check" size={13} strokeWidth={3} /></span>{g}</li>)}</ul>
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-card">
            <p className="flex items-center gap-2 font-display font-semibold text-ink"><Icon name="clock" size={18} className="text-orange" /> We reply within one working day</p>
            <p className="mt-2 text-[14.5px] text-body">Prefer to talk now? <a href={`tel:${site.phoneHref}`} className="font-semibold text-ink hover:text-orange">{site.phone}</a> or <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-orange">{site.email}</a></p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-float md:p-10">
          {sent ? (
            <div className="flex min-h-[460px] flex-col justify-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-green text-white"><Icon name="check" size={28} strokeWidth={2.6} /></span>
              <h2 className="display-lg mt-6">Thank you.</h2>
              <p className="body-lg mt-3 text-body">Your email app should have opened with your details. Send it and we will be in touch within a working day.</p>
              <button onClick={() => setSent(false)} className="btn-outline mt-8 self-start">Edit details</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <p className="lbl">Your clinic level</p>
                <div className="grid grid-cols-2 gap-2">
                  {clinicLevels.map((c) => (
                    <button type="button" key={c.slug} onClick={() => setLevel(c.label)} className={`rounded-2xl border p-3 text-left transition ${level === c.label ? "border-ink bg-ink text-white" : "border-hairline hover:border-line-strong"}`}>
                      <p className={`font-display text-[14px] font-semibold ${level === c.label ? "text-white" : "text-ink"}`}>{c.label}</p>
                      <p className={`text-[12px] ${level === c.label ? "text-white/65" : "text-body-muted"}`}>{c.size}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label><span className="lbl">Full name</span><input name="name" required className="fld" /></label>
                <label><span className="lbl">Work email</span><input name="email" type="email" required className="fld" /></label>
                <label><span className="lbl">Phone</span><input name="phone" type="tel" required className="fld" /></label>
                <label><span className="lbl">Clinic or group name</span><input name="clinic" required className="fld" /></label>
              </div>
              <label className="block"><span className="lbl">Your role</span>
                <select name="role" required defaultValue="" className="fld"><option value="" disabled>Select your role</option>{roles.map((r) => <option key={r.slug}>{r.title}</option>)}<option>Other</option></select>
              </label>
              <div>
                <p className="lbl">Interested in</p>
                <div className="flex flex-wrap gap-2">{["Clinic platform", "medics care app", "Both"].map((x) => <button type="button" key={x} onClick={() => setInterest(x)} className={`rounded-pill border px-4 py-2 text-[14px] font-semibold transition ${interest === x ? "border-orange bg-peach text-orange" : "border-hairline text-ink"}`}>{x}</button>)}</div>
              </div>
              <label className="block"><span className="lbl">Anything we should know? (optional)</span><textarea name="message" rows={3} className="fld resize-none" /></label>
              <button type="submit" className="btn-primary w-full">Book my demo</button>
              <p className="text-[12.5px] text-body-muted">By submitting, you agree to be contacted about medics IVF. We never share your details.</p>
            </form>
          )}
        </div>
      </div>
      <style jsx global>{`
        .lbl{display:block;margin-bottom:8px;font-family:var(--font-display);font-size:13px;font-weight:600;color:#0b1846}
        .fld{width:100%;border:1px solid #e8e6ef;border-radius:12px;padding:12px 14px;font-size:15px;color:#0b1846;background:#fff;transition:border-color .2s,box-shadow .2s}
        .fld:focus{outline:none;border-color:#ff6700;box-shadow:0 0 0 4px rgba(255,103,0,.12)}
      `}</style>
    </section>
  );
}
