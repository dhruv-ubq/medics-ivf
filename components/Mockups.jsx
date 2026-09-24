"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/* ================= Frames ================= */
export function BrowserFrame({ children, url = "app.medicsivf.in", className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-hairline bg-white shadow-float ${className}`}>
      <div className="flex items-center gap-2 border-b border-hairline bg-[#f7f6fb] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-[11px] text-body-muted"><Icon name="lock" size={11} />{url}</span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className = "", scale = 1 }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: 272 * scale, height: 560 * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
        <div className="relative w-[272px] rounded-[44px] bg-[#16192b] p-[9px] shadow-float ring-1 ring-black/10">
          <div className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-[#16192b]" /><div className="absolute -right-[3px] top-24 h-16 w-[3px] rounded-r bg-[#16192b]" />
          <div className="relative h-[542px] overflow-hidden rounded-[36px] bg-[#f5f8fc]">
            <div className="absolute left-1/2 top-2.5 z-30 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-[#16192b]" />
            <div className="relative z-20 flex items-center justify-between bg-white px-6 pt-3 text-[10px] font-semibold text-ink"><span>9:41</span><span className="flex items-center gap-1"><span className="flex h-2 items-end gap-[1.5px]">{[3, 5, 7, 9].map((h) => <i key={h} className="w-[2px] rounded bg-ink" style={{ height: h * 0.9 }} />)}</span><span className="ml-1 h-2.5 w-5 rounded-[3px] border border-ink p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-ink" /></span></span></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatChip({ icon = "check", tone = "green", title, sub, className = "", delay = 0 }) {
  const tones = { green: "bg-mint text-green", orange: "bg-peach text-orange", purple: "bg-lavender text-purple", blue: "bg-sky text-blue" };
  return (
    <div className={`absolute z-20 flex animate-float items-center gap-3 rounded-2xl border border-hairline bg-white/95 px-3.5 py-2.5 shadow-float backdrop-blur ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <span className={`grid h-8 w-8 place-items-center rounded-xl ${tones[tone]}`}><Icon name={icon} size={16} strokeWidth={2} /></span>
      <div className="leading-tight"><p className="font-display text-[12.5px] font-semibold text-ink">{title}</p>{sub && <p className="text-[11px] text-body-muted">{sub}</p>}</div>
    </div>
  );
}

const Pill = ({ tone = "mint", children }) => {
  const t = { mint: "bg-mint text-green", peach: "bg-peach text-orange", sky: "bg-sky text-blue", lav: "bg-lavender text-purple", gray: "bg-[#f1f0f5] text-body-muted" }[tone];
  return <span className={`inline-flex items-center whitespace-nowrap rounded-pill px-2 py-0.5 text-[9.5px] font-semibold ${t}`}>{children}</span>;
};

/* ================= medics IVF v9 clinic shell ================= */
const navItems = [["Worklist", "records"], ["Appointments", "calendar"], ["IVF", "heart"], ["EMR", "stethoscope"], ["Embryology", "lab"], ["Billing", "billing"], ["Pharmacy", "desk"], ["Inventory", "building"], ["Analytics", "chart"]];

export function ClinicShell({ active = "Worklist", children, compact = false }) {
  return (
    <div className="text-[11px]">
      <div className="flex items-center gap-3 border-b border-hairline bg-white px-3 py-2">
        <span className="flex items-center gap-1.5 font-display text-[12px] font-bold text-ink"><span className="grid h-5 w-5 place-items-center rounded-md bg-brand-gradient text-[9px] text-white">m</span>medics IVF</span>
        <span className="hidden flex-1 items-center gap-1.5 rounded-lg bg-[#f4f3f8] px-2.5 py-1.5 text-body-muted sm:flex"><Icon name="spark" size={11} />Search patient, UHID or bill</span>
        <span className="ml-auto flex items-center gap-1 rounded-lg border border-hairline px-2 py-1 font-semibold text-ink">Andheri <Icon name="down" size={11} /></span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-lavender font-bold text-purple">MN</span>
      </div>
      <div className="flex">
        {!compact && (
          <aside className="hidden w-[122px] shrink-0 border-r border-hairline bg-[#fbfaff] p-2 sm:block">
            {navItems.map(([n, i]) => (
              <p key={n} className={`mb-0.5 flex items-center gap-1.5 rounded-md px-2 py-1.5 ${n === active ? "bg-white font-semibold text-ink shadow-sm" : "text-body-muted"}`}><Icon name={i} size={12} />{n}</p>
            ))}
          </aside>
        )}
        <div className="min-w-0 flex-1 bg-white p-3.5">{children}</div>
      </div>
    </div>
  );
}

export function DashboardScreen({ compact = false }) {
  const bars = [["Andheri", 62], ["Thane", 48], ["Pune", 71], ["Vashi", 39], ["Nashik", 28]];
  const mix = [["IVF", 121, "#002582"], ["IUI", 38, "#9800a8"], ["FET", 15, "#ff6700"], ["Donor", 14, "#39b54a"]];
  const tot = 188, C = 2 * Math.PI * 34; let off = 0;
  return (
    <ClinicShell active="Analytics" compact={compact}>
      <div className="flex items-center justify-between"><div><p className="font-display text-[13px] font-semibold text-ink">IVF dashboard</p><p className="text-body-muted">All centres · This month</p></div><Pill tone="mint">Live</Pill></div>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {[["Consults", "31", "+8%"], ["Active cycles", "189", ""], ["OPUs", "24", "+3"], ["Collections", "₹4.8L", "+12%"]].map(([k, v, d]) => (
          <div key={k} className="rounded-xl border border-hairline p-2"><p className="truncate text-body-muted">{k}</p><p className="font-display text-[15px] font-bold text-ink">{v}</p>{d ? <p className="text-[9.5px] font-semibold text-green">{d}</p> : <p className="text-[9.5px] text-body-muted">5 centres</p>}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1fr_1.2fr] gap-2">
        <div className="rounded-xl border border-hairline p-2.5">
          <p className="font-semibold text-ink">Cycles by type</p>
          <div className="mt-1 flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-[64px] w-[64px] shrink-0 -rotate-90">{mix.map(([l, v, c]) => { const d = (v / tot) * C; const el = <circle key={l} cx="50" cy="50" r="34" fill="none" stroke={c} strokeWidth="13" strokeDasharray={`${d} ${C - d}`} strokeDashoffset={-off} />; off += d; return el; })}</svg>
            <ul className="space-y-0.5">{mix.map(([l, v, c]) => <li key={l} className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />{l} <b className="text-ink">{v}</b></li>)}</ul>
          </div>
        </div>
        <div className="rounded-xl border border-hairline p-2.5">
          <p className="font-semibold text-ink">Consult to treatment, by centre</p>
          <div className="mt-2 space-y-1">{bars.map(([n, v]) => <div key={n} className="flex items-center gap-2"><span className="w-12 text-body-muted">{n}</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-[#f1f0f7]"><span className="block h-full rounded-full bg-brand-gradient" style={{ width: v + "%" }} /></span><b className="w-7 text-right text-ink">{v}%</b></div>)}</div>
        </div>
      </div>
    </ClinicShell>
  );
}

export function WorklistScreen({ compact = false }) {
  const rows = [["Ananya R. + Rohit R.", "IVF · Stim D6", "Scan 10:30", "sky", "Consult"], ["Sana K.", "FET · Prep D6", "Lining check", "mint", "Consult"], ["Meera P.", "IVF · OPU", "Hub OT 2", "lav", "Embryology"], ["Divya S.", "Egg freezing", "AMH ready", "peach", "Follow up"], ["Neha T. + Arjun T.", "First visit", "Couple reg.", "gray", "Front desk"]];
  return (
    <ClinicShell active="Worklist" compact={compact}>
      <div className="flex items-center justify-between"><div><p className="font-display text-[13px] font-semibold text-ink">Good morning, Dr. Nair</p><p className="text-body-muted">Patients to consult · 12</p></div><Pill tone="mint">ART checks clear</Pill></div>
      <div className="mt-2.5 overflow-hidden rounded-xl border border-hairline">
        {rows.map(([n, c, s, t, q], k) => (
          <div key={n} className={`flex items-center gap-2 px-2.5 py-2 ${k ? "border-t border-hairline" : ""}`}>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lavender text-[9px] font-bold text-purple">{n[0]}</span>
            <span className="min-w-0 flex-1"><b className="block truncate text-ink">{n}</b><span className="text-body-muted">{c}</span></span>
            <span className="hidden text-body-muted md:inline">{s}</span><Pill tone={t}>{q}</Pill>
          </div>
        ))}
      </div>
    </ClinicShell>
  );
}

export function AppointmentsScreen({ compact = false }) {
  const docs = ["Dr. Nair", "Dr. Shah", "Dr. Rao"];
  const slots = ["09:00", "09:30", "10:00", "10:30", "11:00"];
  const booked = { "0-0": ["Couple", "lav"], "0-2": ["Scan", "sky"], "1-1": ["Follow up", "mint"], "1-3": ["Video", "peach"], "2-0": ["IUI", "lav"], "2-2": ["Couple", "lav"], "0-4": ["Donor", "mint"], "2-4": ["Scan", "sky"] };
  const cells = [];
  slots.forEach((s, r) => { cells.push(<span key={"t" + s} className="py-1.5 text-body-muted">{s}</span>); docs.forEach((d, c) => { const b = booked[`${c}-${r}`]; cells.push(<span key={d + s} className={`rounded-md px-1.5 py-1.5 ${b ? "bg-[#fbfaff]" : "border border-dashed border-hairline"}`}>{b ? <Pill tone={b[1]}>{b[0]}</Pill> : <span className="text-[9.5px] text-body-muted/60">Open</span>}</span>); }); });
  return (
    <ClinicShell active="Appointments" compact={compact}>
      <div className="flex items-center justify-between"><p className="font-display text-[13px] font-semibold text-ink">Doctor appointments · Today</p><span className="rounded-lg bg-ink px-2 py-1 font-semibold text-white">+ Book</span></div>
      <div className="mt-2.5 grid grid-cols-[40px_repeat(3,1fr)] gap-1">
        <span />{docs.map((d) => <span key={d} className="rounded-md bg-[#faf9fd] py-1 text-center font-semibold text-ink">{d}</span>)}
        {cells}
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-body-muted"><Icon name="phone" size={12} className="text-orange" />3 booked from the patient app today</p>
    </ClinicShell>
  );
}

export function EmrScreen({ compact = false }) {
  const e2 = [45, 90, 140, 180, 210, 320], days = [1, 3, 5, 6, 8, 10], fol = ["-", "8", "11,10", "13,12", "16,15", "18,17"];
  const pts = e2.map((v, i) => [18 + i * 52, 70 - (v / 340) * 60]);
  return (
    <ClinicShell active="EMR" compact={compact}>
      <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-peach font-bold text-orange">AR</span><div className="min-w-0 flex-1"><p className="truncate font-display text-[12.5px] font-semibold text-ink">Ananya R. + Rohit R.</p><p className="text-body-muted">UHID 2291 · Couple · Dr. Nair</p></div><Pill tone="sky">IVF-ICSI</Pill></div>
      <div className="mt-2 flex gap-1 overflow-hidden border-b border-hairline">{["Cycle summary", "Active cycle", "Past cycles", "Treatment advice"].map((t, k) => <span key={t} className={`whitespace-nowrap px-2 py-1.5 ${k === 1 ? "border-b-2 border-orange font-semibold text-ink" : "text-body-muted"}`}>{t}</span>)}</div>
      <svg viewBox="0 0 300 76" className="mt-2 w-full"><path d={"M" + pts.map((p) => p.join(" ")).join(" L")} fill="none" stroke="#9800a8" strokeWidth="2.2" />{pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#fff" stroke="#9800a8" strokeWidth="2" />)}</svg>
      <div className="grid grid-cols-6 gap-1 text-center">{days.map((d, i) => <div key={d} className="rounded-lg bg-[#faf9fd] py-1"><p className="font-semibold text-ink">D{d}</p><p className="text-[9.5px] text-purple">E2 {e2[i]}</p><p className="text-[9.5px] text-body-muted">{fol[i]}</p></div>)}</div>
      <div className="mt-2 grid grid-cols-2 gap-1.5"><div className="rounded-lg border border-hairline p-2"><p className="text-body-muted">Prescription</p><p className="font-semibold text-ink">Gonal-F 225 IU · Cetrotide 0.25 mg</p></div><div className="rounded-lg border border-hairline p-2"><p className="text-body-muted">Follow up</p><p className="font-semibold text-ink">Scan in 2 days · sent to app</p></div></div>
    </ClinicShell>
  );
}

export function EmbryoScreen({ compact = false }) {
  const rows = [["E1", "2PN", "8c G1", "4AA", "Transfer", "peach"], ["E2", "2PN", "8c G2", "4AB", "Vitrified C2-14", "sky"], ["E3", "2PN", "6c G2", "3BB", "Vitrified C2-15", "sky"], ["E4", "2PN", "7c G3", "Arrested", "Discarded", "gray"]];
  return (
    <ClinicShell active="Embryology" compact={compact}>
      <div className="flex items-center justify-between"><p className="font-display text-[13px] font-semibold text-ink">Cycle IVF-2291 · Embryology</p><Pill tone="mint">Limits checked</Pill></div>
      <div className="mt-2 flex gap-1">{["OPU", "Culture", "ET", "Vitrification", "Thaw"].map((t, k) => <span key={t} className={`rounded-md px-2 py-1 ${k === 1 ? "bg-ink font-semibold text-white" : "bg-[#f4f3f8] text-body-muted"}`}>{t}</span>)}</div>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">{[["Oocytes", "12"], ["MII", "10"], ["Fertilised", "8"]].map(([k, v]) => <div key={k} className="rounded-lg border border-hairline py-1.5"><p className="text-body-muted">{k}</p><p className="font-display text-[14px] font-bold text-ink">{v}</p></div>)}</div>
      <div className="mt-2 overflow-hidden rounded-xl border border-hairline">
        <div className="grid grid-cols-[30px_1fr_1fr_1fr_1.7fr] bg-[#faf9fd] px-2 py-1 font-semibold text-body-muted"><span /><span>D1</span><span>D3</span><span>D5</span><span>Outcome</span></div>
        {rows.map((r) => <div key={r[0]} className="grid grid-cols-[30px_1fr_1fr_1fr_1.7fr] items-center border-t border-hairline px-2 py-1.5"><b className="text-ink">{r[0]}</b><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span><Pill tone={r[5]}>{r[4]}</Pill></span></div>)}
      </div>
    </ClinicShell>
  );
}

export function BillingScreen({ compact = false }) {
  const inc = [["Consultation and baseline tests", true], ["Stimulation monitoring", true], ["OPU and ICSI", true], ["Embryo transfer", false], ["Vitrification, 1 year", false]];
  return (
    <ClinicShell active="Billing" compact={compact}>
      <div className="flex items-center justify-between"><p className="font-display text-[13px] font-semibold text-ink">Create bill · Package</p><span className="text-body-muted">UHID 2291</span></div>
      <div className="mt-2 rounded-xl border border-hairline p-2.5">
        <p className="flex justify-between font-semibold text-ink">IVF-ICSI package <span>₹1,85,000</span></p>
        <div className="mt-1.5 space-y-1">{inc.map(([n, d]) => <p key={n} className="flex items-center gap-1.5"><span className={`grid h-3.5 w-3.5 place-items-center rounded ${d ? "bg-green text-white" : "border border-line-strong"}`}>{d && <Icon name="check" size={9} strokeWidth={3} />}</span><span className={d ? "text-ink" : "text-body-muted"}>{n}</span>{d && <span className="ml-auto text-[9.5px] text-green">Billed</span>}</p>)}</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <div className="rounded-lg border border-hairline p-2"><p className="text-body-muted">Discount category</p><p className="font-semibold text-ink">Corporate · 5%</p><p className="text-[9.5px] text-green">Within your limit</p></div>
        <div className="rounded-lg border border-hairline p-2"><p className="text-body-muted">Advance</p><p className="font-semibold text-ink">₹50,000 adjusted</p><p className="text-[9.5px] text-body-muted">Receipt R-8812</p></div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">{["UPI", "Card", "Cash", "App link"].map((m, k) => <span key={m} className={`rounded-md px-2 py-1 ${k === 3 ? "bg-ink font-semibold text-white" : "border border-hairline text-body"}`}>{m}</span>)}<span className="ml-auto font-display text-[13px] font-bold text-ink">₹85,500</span></div>
    </ClinicShell>
  );
}

export function StockScreen({ compact = false }) {
  return (
    <ClinicShell active="Inventory" compact={compact}>
      <div className="flex items-center justify-between"><p className="font-display text-[13px] font-semibold text-ink">Stock and indents</p><Pill tone="peach">2 reorder alerts</Pill></div>
      <div className="mt-2 overflow-hidden rounded-xl border border-hairline">
        {[["Gonal-F 75 IU", "Pharmacy", "18", "peach", "Reorder"], ["Cetrotide 0.25 mg", "Pharmacy", "42", "mint", "OK"], ["Culture media", "Embryo lab", "6", "peach", "Indent raised"], ["Vitrification kit", "Embryo lab", "14", "mint", "OK"]].map(([n, s, q, t, st], k) => (
          <div key={n} className={`grid grid-cols-[1.6fr_1.1fr_0.5fr_1.1fr] items-center gap-1 px-2.5 py-1.5 ${k ? "border-t border-hairline" : ""}`}><b className="truncate text-ink">{n}</b><span className="truncate text-body-muted">{s}</span><span className="text-ink">{q}</span><span><Pill tone={t}>{st}</Pill></span></div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">{[["PO", "Approved"], ["GRN", "Matched"], ["GST report", "Ready"]].map(([a, b]) => <div key={a} className="rounded-lg bg-[#faf9fd] py-1.5"><p className="text-body-muted">{a}</p><p className="font-semibold text-ink">{b}</p></div>)}</div>
    </ClinicShell>
  );
}

export function ComplianceScreen({ compact = false }) {
  const checks = [["Consent: IVF with ICSI", "Signed"], ["Recipient age 32", "Within limit"], ["Donor D-1182 Aadhaar", "Verified"], ["Donor history", "First donation"], ["Embryos for transfer: 2", "Within limit"]];
  return (
    <ClinicShell active="IVF" compact={compact}>
      <div className="flex items-center justify-between"><p className="font-display text-[13px] font-semibold text-ink">Pre OPU compliance check</p><Pill tone="mint">5 of 5 passed</Pill></div>
      <div className="mt-2 space-y-1">{checks.map(([a, b]) => <div key={a} className="flex items-center gap-2 rounded-lg border border-hairline px-2.5 py-1.5"><span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-green text-white"><Icon name="check" size={9} strokeWidth={3} /></span><span className="flex-1 text-ink">{a}</span><b className="text-green">{b}</b></div>)}</div>
      <p className="mt-2 rounded-lg bg-peach px-2.5 py-1.5 text-orange"><b>Blocked:</b> donor D-0957 has donated before. Allocation stopped.</p>
    </ClinicShell>
  );
}

export function HubSpoke() {
  const sp = [["Andheri", 17, 18], ["Thane", 83, 18], ["Pune", 86, 80], ["Nashik", 15, 82], ["Vashi", 50, 94]];
  return (
    <div className="relative aspect-[4/3] w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">{sp.map(([n, x, y]) => <line key={n} x1="50" y1="50" x2={x} y2={y} stroke="#c9c4e4" strokeWidth=".5" strokeDasharray="1.5 1.5" />)}</svg>
      {sp.map(([n, x, y], k) => <div key={n} className="absolute -translate-x-1/2 -translate-y-1/2 animate-float rounded-2xl border border-hairline bg-white px-3 py-2 text-center shadow-card" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${k * 400}ms` }}><p className="font-display text-[12px] font-semibold text-ink">{n}</p><p className="text-[10px] text-body-muted">Consult · Stim</p></div>)}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-ink px-5 py-4 text-center text-white shadow-float"><p className="eyebrow text-orange">Hub</p><p className="font-display text-[14px] font-semibold">Mumbai Central</p><p className="text-[10.5px] text-white/65">OPU · ET · Fertilisation</p></div>
    </div>
  );
}

/* ================= medics care app (from the deck) ================= */
function AppTop({ clinic = "Sunrise Fertility", who = "Ananya" }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#e8edf5] bg-white px-4 pb-2 pt-2.5 text-[10.5px]">
      <span className="flex items-center gap-1.5 rounded-pill bg-[#eef2fb] py-0.5 pl-0.5 pr-2 font-semibold text-ink"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#1a3f8f] text-[8.5px] text-white">{who.slice(0, 2).toUpperCase()}</span>{who}<Icon name="down" size={10} /></span>
      <span className="ml-auto truncate text-[9.5px] font-semibold text-[#1a3f8f]">{clinic}</span>
      <Icon name="bell" size={15} className="shrink-0 text-ink" /><Icon name="phone" size={15} className="shrink-0 text-[#e5484d]" />
    </div>
  );
}
function AppTabs({ active = "Home" }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-around border-t border-[#e8edf5] bg-white px-2 pb-5 pt-2 text-[9.5px] text-body-muted">
      {[["home", "Home"], ["users", "Family"], ["records", "Records"], ["patients", "Profile"]].map(([i, l]) => <span key={l} className={`flex flex-col items-center gap-0.5 ${l === active ? "font-semibold text-[#1a3f8f]" : ""}`}><Icon name={i} size={16} />{l}</span>)}
    </div>
  );
}

export function AppHome() {
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-3">
        <p className="font-display text-[15px] font-semibold text-ink">Hi, Ananya <span className="inline-block origin-bottom-right" style={{ animation: "wave 2.4s ease-in-out infinite" }}>👋</span></p>
        <p className="text-body-muted">Here is your health summary</p>
        <div className="relative mt-2.5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3f8f] to-[#6b2fb5] p-3 text-white">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70">Sunrise Fertility</p>
          <p className="mt-0.5 font-display text-[13px] font-semibold leading-tight">Free AMH test with<br />your first consult</p>
          <span className="mt-2 inline-block rounded-pill bg-white px-2.5 py-1 text-[9.5px] font-semibold text-[#1a3f8f]">Book now</span>
          <div className="absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-white/10" /><div className="absolute -right-2 top-2 h-12 w-12 rounded-full bg-orange/40" />
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">{[1, 0, 0].map((a, i) => <i key={i} className={`h-1 rounded-full ${a ? "w-3 bg-white" : "w-1 bg-white/50"}`} />)}</div>
        </div>
        <div className="mt-2.5 rounded-2xl border-l-4 border-[#1a3f8f] bg-[#eef2fb] p-3">
          <div className="flex items-center justify-between"><span className="rounded-pill bg-[#fff3c4] px-2 py-0.5 text-[9.5px] font-semibold text-[#8a6d00]">Today</span><span className="rounded-pill bg-mint px-2 py-0.5 text-[9.5px] font-bold text-green">SCHEDULED</span></div>
          <p className="mt-1.5 flex items-center gap-1.5 font-semibold text-ink"><Icon name="calendar" size={12} />Dr. Meera Nair<Icon name="chevron" size={11} className="ml-auto" /></p>
          <p className="mt-0.5 text-body-muted">10:30 AM · Fertility · Scan and review</p>
        </div>
        <div className="mt-2.5 rounded-2xl bg-white p-3 shadow-sm">
          <p className="flex items-center justify-between font-semibold text-ink">Treatment status<Pill tone="lav">IVF</Pill></p>
          <div className="mt-2 flex items-center gap-1">{["Consult", "Stim", "OPU", "ET", "Test"].map((s, i) => <div key={s} className="flex flex-1 flex-col items-center gap-1"><span className={`h-1.5 w-full rounded-full ${i < 2 ? "bg-[#1a3f8f]" : "bg-[#e3e8f2]"}`} /><span className={`text-[8.5px] ${i === 1 ? "font-bold text-ink" : "text-body-muted"}`}>{s}</span></div>)}</div>
        </div>
      </div>
      <AppTabs />
      <style>{`@keyframes wave{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(14deg)}20%{transform:rotate(-8deg)}}`}</style>
    </div>
  );
}

export function AppQuick() {
  const items = [["calendar", "My appointments", "#1a3f8f"], ["records", "Medical records", "#0f8a5f"], ["stethoscope", "Prescriptions", "#c25400"], ["billing", "Bills", "#2f6ee0"], ["upload", "Attachments", "#d6336c"], ["spark", "AI assistant", "#7b3fe4"]];
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-3">
        <p className="font-semibold text-ink">Quick actions</p>
        <div className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-[#1a3f8f] py-2.5 font-semibold text-white"><Icon name="plus" size={13} />BOOK APPOINTMENT</div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {items.map(([i, l, c]) => <div key={l} className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#e8edf5] bg-white py-3.5"><span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: c }}><Icon name={i} size={17} /></span><span className="text-center text-ink">{l}</span></div>)}
        </div>
      </div>
      <AppTabs />
    </div>
  );
}

export function AppBooking() {
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-3">
        <div className="rounded-xl bg-[#eef2fb] py-1.5 text-center"><p className="text-[9.5px] text-body-muted">Booking for</p><p className="font-semibold text-ink">Ananya</p></div>
        <div className="mt-3 flex items-center">{["Patient", "Type", "Doctor", "Time"].map((s, i) => <div key={s} className={`flex items-center ${i < 3 ? "flex-1" : ""}`}><div className="flex flex-col items-center gap-0.5"><span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white ${i < 3 ? "bg-green" : "bg-[#1a3f8f] ring-4 ring-[#1a3f8f]/15"}`}>{i < 3 ? <Icon name="check" size={11} strokeWidth={3} /> : 4}</span><span className="text-[8.5px] text-body-muted">{s}</span></div>{i < 3 && <span className="mx-0.5 mb-3 h-0.5 flex-1 bg-green" />}</div>)}</div>
        <div className="mt-3 rounded-2xl border border-[#e8edf5] bg-white p-3">
          <div className="flex gap-1.5">{["In clinic", "Video"].map((t, k) => <span key={t} className={`flex-1 rounded-lg py-1.5 text-center font-semibold ${k === 0 ? "bg-[#1a3f8f] text-white" : "border border-[#e8edf5] text-ink"}`}>{t}</span>)}</div>
          <p className="mt-2.5 text-body-muted">Dr. Meera Nair · Fertility</p>
          <p className="mt-1 flex items-center justify-between rounded-lg border border-[#e8edf5] px-2.5 py-1.5 text-ink">Fri, 21 Aug <Icon name="calendar" size={12} /></p>
          <p className="mt-2.5 text-body-muted">Select time slot</p>
          <div className="mt-1 grid grid-cols-3 gap-1.5">{[["Morning", 8, 1], ["Afternoon", 16, 0], ["Evening", 10, 0]].map(([n, c, a]) => <span key={n} className={`rounded-lg py-1.5 text-center text-[9.5px] ${a ? "bg-[#1a3f8f] font-semibold text-white" : "border border-[#e8edf5] text-ink"}`}>{n}<br />({c})</span>)}</div>
          <div className="mt-2 grid grid-cols-4 gap-1">{["09:00", "09:30", "10:30", "11:00"].map((t, k) => <span key={t} className={`rounded-md py-1 text-center text-[9.5px] ${k === 2 ? "bg-orange font-semibold text-white" : "bg-[#f3f5fa] text-ink"}`}>{t}</span>)}</div>
        </div>
      </div>
      <AppTabs />
    </div>
  );
}

export function AppRecords() {
  const docs = [["Medical summary", "Dr. Meera Nair · 12 Aug", "records", "#1a3f8f"], ["AMH blood test", "Lab report · signed", "lab", "#0f8a5f"], ["Semen analysis", "Andrology · Rohit", "lab", "#0f8a5f"], ["ART summary report", "Cycle IVF-2291", "shield", "#7b3fe4"]];
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-3">
        <p className="font-semibold text-ink">Medical records</p>
        <div className="mt-2 flex gap-1.5">{["All", "Reports", "Prescriptions", "Bills"].map((t, k) => <span key={t} className={`rounded-pill px-2.5 py-1 text-[9.5px] ${k === 0 ? "bg-[#1a3f8f] text-white" : "bg-white text-ink"}`}>{t}</span>)}</div>
        <div className="mt-2.5 space-y-1.5">{docs.map(([t, s, i, c]) => <div key={t} className="flex items-center gap-2.5 rounded-2xl border border-[#e8edf5] bg-white p-2.5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-white" style={{ background: c }}><Icon name={i} size={15} /></span><span className="min-w-0 flex-1"><b className="block truncate text-ink">{t}</b><span className="text-[9.5px] text-body-muted">{s}</span></span><Icon name="down" size={14} className="text-[#1a3f8f]" /></div>)}</div>
        <div className="mt-2.5 rounded-2xl bg-gradient-to-br from-[#eef2fb] to-white p-2.5">
          <p className="flex items-center justify-between font-semibold text-ink">Prescription details<Pill tone="mint">SIGNED</Pill></p>
          <p className="mt-1 text-[9.5px] text-body-muted">Progynova 2 mg · 1-0-1 · 14 days</p>
        </div>
      </div>
      <AppTabs active="Records" />
    </div>
  );
}

export function AppBill() {
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-3">
        <p className="font-semibold text-ink">Bill details</p>
        <div className="mt-2 rounded-2xl border border-[#e8edf5] bg-white p-3">
          <p className="text-[9.5px] text-body-muted">Bill ID: 20340927</p><span className="mt-1 inline-block rounded-pill bg-peach px-2 py-0.5 text-[9.5px] font-bold text-orange">PARTLY PAID</span>
          <div className="mt-2 space-y-1 text-ink"><p className="flex gap-2"><Icon name="patients" size={12} />Ananya R.</p><p className="flex gap-2"><Icon name="building" size={12} />Sunrise Fertility, Andheri</p><p className="flex gap-2"><Icon name="calendar" size={12} />20/08/2026</p></div>
        </div>
        <div className="mt-2 overflow-hidden rounded-2xl border border-[#e8edf5] bg-white">
          <div className="flex justify-between bg-[#1a3f8f] px-3 py-1.5 text-[9.5px] font-semibold text-white"><span>DESCRIPTION</span><span>AMOUNT</span></div>
          {[["IVF-ICSI package, stage 2", "₹85,500"], ["Pharmacy, stimulation", "₹14,200"]].map(([a, b]) => <p key={a} className="flex justify-between border-t border-[#e8edf5] px-3 py-1.5"><span className="text-ink">{a}</span><b className="text-ink">{b}</b></p>)}
          <p className="flex justify-between border-t border-[#e8edf5] px-3 py-1.5"><span className="text-body-muted">Paid</span><span className="text-green">₹50,000</span></p>
          <p className="flex justify-between border-t border-[#e8edf5] px-3 py-2 font-bold text-ink"><span>Due now</span><span>₹49,700</span></p>
        </div>
        <div className="mt-2.5 rounded-xl bg-orange py-2.5 text-center font-semibold text-white">Pay ₹49,700 with UPI</div>
      </div>
      <AppTabs />
    </div>
  );
}

export function AppCheckin() {
  const cells = [];
  for (let i = 0; i < 441; i++) {
    const x = i % 21, y = Math.floor(i / 21);
    const f = (a, b) => x >= a && x < a + 7 && y >= b && y < b + 7;
    const finder = f(0, 0) || f(14, 0) || f(0, 14);
    const on = finder ? (x % 7 === 0 || x % 7 === 6 || y % 7 === 0 || y % 7 === 6 || (x % 7 > 1 && x % 7 < 5 && y % 7 > 1 && y % 7 < 5)) : ((x * 7 + y * 13 + x * y) % 3 === 0);
    if (on) cells.push(<rect key={i} x={x} y={y} width="1" height="1" fill="#0b1846" />);
  }
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-4 text-center">
        <p className="font-display text-[14px] font-semibold text-ink">Self check in</p>
        <p className="text-body-muted">Scan at the clinic entrance</p>
        <div className="relative mx-auto mt-4 grid h-40 w-40 place-items-center overflow-hidden rounded-3xl bg-white shadow-card">
          <svg viewBox="0 0 21 21" className="h-28 w-28" shapeRendering="crispEdges">{cells}</svg>
          <span className="absolute inset-x-6 top-1/2 h-0.5 rounded bg-orange shadow-[0_0_12px_#ff6700]" style={{ animation: "qrscan 2.2s ease-in-out infinite" }} />
        </div>
        <div className="mx-auto mt-4 max-w-[210px] rounded-2xl bg-mint p-2.5 text-left"><p className="font-semibold text-green">Checked in · 10:18 AM</p><p className="text-ink">Token 14 · Dr. Meera Nair, Room 3</p></div>
      </div>
      <AppTabs />
      <style>{`@keyframes qrscan{0%,100%{transform:translateY(-52px)}50%{transform:translateY(52px)}}`}</style>
    </div>
  );
}

export function AppAssistant() {
  const ref = useRef(null); const [s, setS] = useState(0);
  useEffect(() => { const el = ref.current; if (!el) return; let t = []; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { t = [setTimeout(() => setS(1), 400), setTimeout(() => setS(2), 1300), setTimeout(() => setS(3), 2500)]; io.disconnect(); } }, { threshold: 0.3 }); io.observe(el); return () => { io.disconnect(); t.forEach(clearTimeout); }; }, []);
  return (
    <div ref={ref} className="flex h-[510px] flex-col text-[11px]">
      <div className="flex items-center gap-2 bg-[#1a3f8f] px-4 pb-2.5 pt-2 text-white"><Icon name="arrow" size={13} className="rotate-180" /><b>AI assistant</b><span className="ml-auto text-[9px] text-white/70">Sunrise Fertility</span></div>
      <div className="flex-1 space-y-2 bg-[#f1f3f8] px-3 pt-3">
        <div className="mx-auto w-40 rounded-xl bg-white p-2 text-center shadow-sm"><span className="mx-auto grid h-7 w-7 place-items-center rounded-lg bg-[#7b3fe4] text-white"><Icon name="patients" size={14} /></span><p className="mt-1 font-semibold text-ink">Ananya R.</p></div>
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-ink shadow-sm">Hello! How can I help you with your treatment today?</div>
        {s >= 1 && <div className="ml-auto max-w-[70%] animate-fade-up rounded-2xl rounded-tr-sm bg-[#7b3fe4] px-3 py-2 text-white">What is an embryo transfer?</div>}
        {s === 2 && <div className="flex w-12 gap-1 rounded-2xl bg-white px-3 py-2.5 shadow-sm">{[0, 1, 2].map((i) => <i key={i} className="h-1.5 w-1.5 rounded-full bg-body-muted" style={{ animation: `tdot 1.2s ${i * 0.2}s infinite` }} />)}</div>}
        {s >= 3 && <div className="max-w-[88%] animate-fade-up rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-ink shadow-sm">It is a short, usually painless procedure where a selected embryo is placed in the uterus. Your clinic's guide to transfer day is in Records.<span className="mt-1.5 block text-[9.5px] font-semibold text-[#1a3f8f]">From Sunrise Fertility's library</span></div>}
      </div>
      <div className="flex items-center gap-2 bg-white px-3 pb-6 pt-2"><span className="flex-1 rounded-pill bg-[#f1f3f8] px-3 py-2 text-body-muted">Ask anything...</span><span className="grid h-8 w-8 place-items-center rounded-full bg-[#1a3f8f] text-white"><Icon name="arrow" size={13} /></span></div>
      <style>{`@keyframes tdot{0%,80%,100%{opacity:.25}40%{opacity:1}}`}</style>
    </div>
  );
}

export function AppLogin({ clinic = "Sunrise Fertility", color = "#1a3f8f" }) {
  return (
    <div className="h-full bg-gradient-to-b from-[#eef2fb] to-white px-5 pt-10 text-[11px]">
      <div className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl text-white transition-colors duration-500" style={{ background: color }}><Icon name="heart" size={22} /></span><p className="mt-2 font-display text-[15px] font-bold transition-colors duration-500" style={{ color }}>{clinic}</p></div>
      <p className="mx-auto mt-4 w-max rounded-pill bg-white px-3 py-1 text-[9.5px] text-body-muted shadow-sm">Step 1 of 2 · Verify your number</p>
      <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
        <p className="text-center font-display text-[14px] font-semibold text-ink">Welcome back</p><p className="text-center text-body-muted">Sign in to see your health records</p>
        <p className="mt-3 font-semibold text-ink">Mobile number</p><p className="mt-1 rounded-lg border border-[#e3e8f2] px-2.5 py-2 text-body-muted">98xxxx 4521</p>
        <p className="mt-3 rounded-lg py-2 text-center font-semibold text-white transition-colors duration-500" style={{ background: color }}>CONTINUE</p>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1 text-[9.5px] text-body-muted"><Icon name="lock" size={11} />Your data stays encrypted and secure</p>
    </div>
  );
}

export function AppFamily() {
  return (
    <div className="h-full text-[11px]">
      <AppTop />
      <div className="px-4 pt-3">
        <p className="font-semibold text-ink">Family members</p><p className="text-body-muted">Manage your family's health profiles</p>
        <div className="mt-2 rounded-lg bg-[#1a3f8f] py-2 text-center font-semibold text-white">+ Add family member</div>
        {[["Ananya R.", "32 years · Self", "Female"], ["Rohit R.", "35 years · Spouse", "Male"]].map(([n, s, g]) => <div key={n} className="mt-2 flex items-center gap-2.5 rounded-xl border border-[#e8edf5] bg-white p-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-peach font-bold text-orange">{n[0]}</span><span className="flex-1"><b className="block text-ink">{n}</b><span className="text-[9.5px] text-body-muted">{s}</span></span><span className="rounded border border-hairline px-1.5 text-[9px]">{g}</span></div>)}
      </div>
      <AppTabs active="Family" />
    </div>
  );
}

/* ================= WhatsApp follow up thread ================= */
export function WhatsAppThread() {
  const msgs = [
    ["Hi Ananya, your follow up with Dr. Meera Nair is confirmed for Fri, 21 Aug at 10:30 AM. Here is what to expect.", "Mon 9:02 AM"],
    ["For tomorrow: please carry your previous scan reports and arrive 15 minutes early. The clinic map is in the app.", "Thu 6:00 PM"],
    ["See you in 2 hours. Tap Check in when you arrive.", "Fri 8:30 AM"],
  ];
  return (
    <div className="h-full bg-[#efe7dd] text-[11px]">
      <div className="flex items-center gap-2 bg-[#075e54] px-4 pb-2.5 pt-2 text-white"><span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#075e54]"><Icon name="heart" size={14} /></span><span><b className="block">Sunrise Fertility</b><span className="text-[9px] text-white/75">Business account</span></span></div>
      <div className="space-y-2 px-3 pt-3">
        {msgs.map(([m, t], k) => <div key={k} className="max-w-[90%] animate-fade-up rounded-xl rounded-tl-sm bg-white px-2.5 py-2 text-ink shadow-sm" style={{ animationDelay: `${k * 250}ms` }}>{m}<p className="mt-1 text-right text-[8.5px] text-body-muted">{t}</p></div>)}
        <div className="flex gap-1.5"><span className="rounded-lg bg-white px-2.5 py-1.5 font-semibold text-[#0b6bcb] shadow-sm">Check in</span><span className="rounded-lg bg-white px-2.5 py-1.5 font-semibold text-[#0b6bcb] shadow-sm">Reschedule</span></div>
      </div>
    </div>
  );
}
