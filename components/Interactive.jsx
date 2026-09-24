"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { BrowserFrame, PhoneFrame, DashboardScreen, WorklistScreen, AppointmentsScreen, EmrScreen, EmbryoScreen, BillingScreen, StockScreen, ComplianceScreen, AppHome, AppQuick, AppBooking, AppRecords, AppBill, AppCheckin, AppAssistant, AppLogin, AppFamily, WhatsAppThread } from "./Mockups";
import { ClientMark, CertBadge, PersonPhoto } from "./Brandkit";
import { roles, clinicLevels, pains, followupFlows } from "@/lib/content";
import { useCms, activeBanners, bannerThemes, clientCategories } from "@/lib/store";

export const screens = { dashboard: DashboardScreen, worklist: WorklistScreen, appointments: AppointmentsScreen, emr: EmrScreen, embryo: EmbryoScreen, billing: BillingScreen, stock: StockScreen, trust: ComplianceScreen };
export function Screen({ k, url, compact }) { const S = screens[k] || DashboardScreen; return <BrowserFrame url={url}><S compact={compact} /></BrowserFrame>; }

/* ---------- Auto-advancing hook ---------- */
function useCycle(n, ms, paused) {
  const [i, setI] = useState(0);
  useEffect(() => { if (paused || n < 2) return; const t = setTimeout(() => setI((p) => (p + 1) % n), ms); return () => clearTimeout(t); }, [i, n, ms, paused]);
  return [i, setI];
}

/* ---------- Pain to solution explorer ---------- */
const painScreen = { care: "emr", leak: "phone", money: "billing", risk: "trust", scale: "dashboard" };
export function PainExplorer() {
  const [paused, setPaused] = useState(false);
  const [i, setI] = useCycle(pains.length, 8000, paused);
  const p = pains[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="space-y-2">
        {pains.map((x, k) => (
          <button key={x.k} onClick={() => setI(k)} className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-base ${k === i ? "border-ink bg-white shadow-card" : "border-transparent bg-white/50 hover:bg-white"}`}>
            <div className="flex items-start gap-4">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${k === i ? "bg-orange text-white" : "bg-white text-ink"}`}><Icon name={x.icon} size={20} /></span>
              <div>
                <p className="font-display text-[16px] font-semibold text-ink">{x.pain}</p>
                <div className={`grid transition-all duration-base ${k === i ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><p className="overflow-hidden text-[14.5px] text-body-muted">{x.feel}</p></div>
              </div>
            </div>
            {k === i && !paused && <span key={i} className="absolute bottom-0 left-0 h-[3px] bg-orange" style={{ animation: "prog 8s linear forwards" }} />}
          </button>
        ))}
      </div>
      <div key={p.k} className="flex animate-fade-up flex-col rounded-3xl bg-ink p-6 text-white md:p-8">
        <p className="eyebrow text-orange">How medics IVF solves it</p>
        <p className="mt-3 font-display text-[22px] font-semibold leading-snug md:text-[26px]">{p.fix}</p>
        <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl bg-white/[0.04] p-3">
          {painScreen[p.k] === "phone" ? <div className="flex gap-3"><PhoneFrame scale={0.62}><WhatsAppThread /></PhoneFrame><PhoneFrame scale={0.62} className="hidden sm:block"><AppHome /></PhoneFrame></div> : <div className="w-full"><Screen k={painScreen[p.k]} /></div>}
        </div>
        <Link href={p.href} className="link-arrow mt-6 text-[15px] text-white">See how <Icon name="arrow" size={16} /></Link>
      </div>
      <style>{`@keyframes prog{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}

/* ---------- Platform tour tabs ---------- */
const tour = [
  { k: "clinic", label: "Clinical care", title: "The full cycle on one record", body: "Consultation, diagnosis, prescriptions, treatment advice and the active cycle with every scan and hormone value.", points: ["Cycle summary, active and past cycles", "Treatment advice and follow ups", "Summaries sent to the patient app"], v: "emr", href: "/platform/clinical-lab" },
  { k: "lab", label: "Embryology", title: "A traceable lab, OPU to FET", body: "OPU, culture, transfer, vitrification and thaw on the same cycle, with limits enforced and nothing copied twice.", points: ["OPU, culture and ET tabs", "Vitrification and thaw worklists", "Semen samples and storage"], v: "embryo", href: "/platform/clinical-lab" },
  { k: "ops", label: "Billing and stock", title: "No leaks at the counter or the store", body: "Package bills with inclusions, discounts within limits, advances and refunds, pharmacy, purchase and inventory.", points: ["Package and milestone billing", "Discount and refund limits", "PO, GRN, indents and GST"], v: "billing", href: "/platform/operations" },
  { k: "app", label: "Patient app", title: "Your clinic in every pocket", body: "medics care gives patients booking, QR check in, reports, bills and reminders, under your own brand.", points: ["Book clinic or video visits", "Reports, prescriptions and bills", "Automated follow ups"], v: "app", href: "/patient-engagement" },
  { k: "insight", label: "Insights", title: "Every centre, one dashboard", body: "IVF, lab, pharmacy, purchase and collection reports, for the group and for each centre.", points: ["IVF dashboard and data exports", "KPI dashboards and no show reports", "Cash collection by unit and user"], v: "dashboard", href: "/platform/network-insights" },
];
export function PlatformTour() {
  const [paused, setPaused] = useState(false);
  const [i, setI] = useCycle(tour.length, 7000, paused);
  const t = tour[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" className="no-scrollbar mx-auto flex max-w-full gap-1 overflow-x-auto rounded-pill border border-hairline bg-white p-1.5 md:w-max">
        {tour.map((x, k) => (
          <button key={x.k} role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`relative shrink-0 overflow-hidden rounded-pill px-4 py-2.5 font-display text-[14px] font-semibold transition-colors duration-base md:px-5 ${k === i ? "bg-ink text-white" : "text-body hover:text-ink"}`}>
            {x.label}{k === i && !paused && <span key={i} className="absolute bottom-0 left-0 h-[2px] bg-orange" style={{ animation: "prog 7s linear forwards" }} />}
          </button>
        ))}
      </div>
      <div className="mt-8 grid items-center gap-8 rounded-3xl bg-cream p-5 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div key={t.k} className="animate-fade-up">
          <h3 className="display-lg">{t.title}</h3>
          <p className="body-lg mt-4 text-body">{t.body}</p>
          <ul className="mt-6 space-y-3">{t.points.map((p) => <li key={p} className="flex items-start gap-3 text-[15.5px] text-ink"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-white"><Icon name="check" size={12} strokeWidth={3} /></span>{p}</li>)}</ul>
          <Link href={t.href} className="link-arrow mt-7 text-[15px] text-orange">Explore <Icon name="arrow" size={16} /></Link>
        </div>
        <div key={t.k + "v"} className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          {t.v === "app" ? <div className="flex justify-center gap-4"><PhoneFrame scale={0.9}><AppHome /></PhoneFrame><PhoneFrame scale={0.9} className="hidden md:block"><AppRecords /></PhoneFrame></div> : <Screen k={t.v} />}
        </div>
      </div>
      <style>{`@keyframes prog{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}

/* ---------- medics care screen carousel ---------- */
const appScreens = [
  ["Home", AppHome, "A personal summary with today's visit, treatment status and your clinic's offers."],
  ["Quick actions", AppQuick, "Appointments, records, prescriptions, bills, attachments and the AI assistant, one tap away."],
  ["Book", AppBooking, "Clinic or video visits. Patients pick the doctor, date and slot."],
  ["Check in", AppCheckin, "QR self check in. Pre booked and walk in patients skip the queue."],
  ["Records", AppRecords, "Medical summary, lab reports, prescriptions and the ART summary report."],
  ["Pay", AppBill, "Every bill in one place, and what is due can be paid in the app."],
  ["Ask", AppAssistant, "An AI assistant that answers from global and clinic curated content."],
  ["Family", AppFamily, "Both partners and family members on one login."],
];
export function AppShowcase() {
  const [paused, setPaused] = useState(false);
  const [i, setI] = useCycle(appScreens.length, 4500, paused);
  const [label, S, desc] = appScreens[i];
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="order-2 space-y-1.5 lg:order-1">
        {appScreens.slice(0, 4).map(([l, , d], k) => <AppStep key={l} on={k === i} l={l} d={d} onClick={() => setI(k)} />)}
      </div>
      <div className="order-1 flex justify-center lg:order-2">
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-orange/20 via-purple/15 to-blue/20 blur-3xl" />
          <PhoneFrame className="relative"><div key={label} className="h-full animate-fade-up"><S /></div></PhoneFrame>
        </div>
      </div>
      <div className="order-3 space-y-1.5">
        {appScreens.slice(4).map(([l, , d], k) => <AppStep key={l} on={k + 4 === i} l={l} d={d} onClick={() => setI(k + 4)} />)}
      </div>
    </div>
  );
}
function AppStep({ on, l, d, onClick }) {
  return (
    <button onClick={onClick} className={`w-full rounded-2xl px-5 py-4 text-left transition-all duration-base ${on ? "bg-white shadow-card" : "hover:bg-white/60"}`}>
      <p className={`font-display text-[16px] font-semibold ${on ? "text-orange" : "text-ink"}`}>{l}</p>
      <p className="mt-1 text-[14px] text-body-muted">{d}</p>
    </button>
  );
}

/* ---------- White label demo ---------- */
const brands = [["Sunrise Fertility", "#1a3f8f"], ["Bloom IVF", "#b0306a"], ["Aarogya Fertility", "#0f8a5f"], ["Your clinic", "#ff6700"]];
export function WhiteLabelDemo() {
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
      <PhoneFrame scale={0.9}><AppLogin clinic={brands[i][0]} color={brands[i][1]} /></PhoneFrame>
      <div className="max-w-sm">
        <p className="eyebrow text-orange">Fully white labelled</p>
        <p className="display-lg mt-3">Your name. Your colours. Your app.</p>
        <p className="mt-3 text-[15.5px] text-body">Patients download your clinic's app, not ours. Try a brand:</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {brands.map(([n, c], k) => <button key={n} onClick={() => setI(k)} className={`flex items-center gap-2 rounded-pill border px-3.5 py-2 text-[14px] font-semibold transition ${k === i ? "border-ink bg-white shadow-card" : "border-hairline bg-white/60"}`}><i className="h-3.5 w-3.5 rounded-full" style={{ background: c }} />{n}</button>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- Follow up journey simulator ---------- */
const chIcon = { whatsapp: ["message", "#25d366", "WhatsApp"], push: ["bell", "#7b3fe4", "App push"], email: ["records", "#0b6bcb", "Email"], sms: ["phone", "#c25400", "SMS"] };
export function FollowupJourney() {
  const [mode, setMode] = useState("booked");
  const [step, setStep] = useState(0);
  const flow = followupFlows[mode];
  useEffect(() => { setStep(0); }, [mode]);
  useEffect(() => { const t = setTimeout(() => setStep((s) => (s + 1) % (flow.length + 1)), 1800); return () => clearTimeout(t); }, [step, flow.length]);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="inline-flex rounded-pill border border-hairline bg-white p-1">
          {[["booked", "Follow up booked"], ["notBooked", "Follow up not booked"]].map(([k, l]) => <button key={k} onClick={() => setMode(k)} className={`rounded-pill px-4 py-2 font-display text-[14px] font-semibold transition ${mode === k ? "bg-ink text-white" : "text-body"}`}>{l}</button>)}
        </div>
        <div className="mt-6 rounded-3xl bg-white p-5 shadow-card md:p-7">
          <p className="flex items-center gap-2 text-[14px] text-body-muted"><span className="grid h-7 w-7 place-items-center rounded-full bg-peach text-orange"><Icon name="stethoscope" size={14} /></span>Consultation completed. Follow up recommended.</p>
          <div className="relative mt-4 space-y-3 border-l-2 border-dashed border-line-strong pl-6">
            {flow.map((f, k) => (
              <div key={mode + k} className={`relative rounded-2xl border p-4 transition-all duration-500 ${k < step ? "border-hairline bg-white opacity-100" : "border-transparent bg-cream opacity-45"}`}>
                <span className={`absolute -left-[33px] top-5 grid h-4 w-4 place-items-center rounded-full ring-4 ring-white transition-colors ${k < step ? "bg-orange" : "bg-line-strong"}`} />
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="eyebrow text-orange">{f.when}</p><div className="flex gap-1">{f.ch.map((c) => <span key={c} className="flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11.5px] font-semibold text-white" style={{ background: chIcon[c][1] }}><Icon name={chIcon[c][0]} size={11} />{chIcon[c][2]}</span>)}</div></div>
                <p className="mt-1.5 text-[15px] text-ink">{f.t}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 rounded-2xl bg-mint px-4 py-3 text-[14px] text-ink"><Icon name="check" size={16} strokeWidth={2.6} className="text-green" />{mode === "booked" ? "Visit completed. Thank you note, updated plan and feedback link sent." : "Couple returns and books. The journey switches to booked automatically."}</p>
        </div>
      </div>
      <div className="flex justify-center"><PhoneFrame><WhatsAppThread /></PhoneFrame></div>
    </div>
  );
}

/* ---------- Role explorer ---------- */
export function RoleExplorer() {
  const [i, setI] = useState(0);
  const r = roles[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {roles.map((x, k) => (
          <button key={x.slug} onClick={() => setI(k)} className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-base ${k === i ? "bg-white shadow-card" : "hover:bg-white/60"}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${k === i ? "bg-orange text-white" : "bg-white text-ink"}`}><Icon name={x.icon} size={18} /></span>
            <span className="whitespace-nowrap font-display text-[14.5px] font-semibold text-ink lg:whitespace-normal">{x.title}</span>
          </button>
        ))}
      </div>
      <div key={r.slug} className="grid animate-fade-up gap-6 rounded-3xl bg-white p-6 shadow-card md:p-9 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow text-orange">For {r.title.toLowerCase()}</p>
          <h3 className="mt-3 font-display text-[24px] font-bold leading-tight tracking-tight text-ink md:text-[28px]">{r.promise}</h3>
          <p className="mt-6 font-display text-[13px] font-semibold text-body-muted">Today</p>
          <ul className="mt-2 space-y-2">{r.pains.map((p) => <li key={p} className="flex gap-2.5 text-[14.5px] text-body"><Icon name="minus" size={17} className="mt-0.5 shrink-0 text-body-muted" />{p}</li>)}</ul>
          <p className="mt-5 font-display text-[13px] font-semibold text-body-muted">With medics IVF</p>
          <ul className="mt-2 space-y-2">{r.gains.map((p) => <li key={p} className="flex gap-2.5 text-[14.5px] text-ink"><Icon name="check" size={17} strokeWidth={2.4} className="mt-0.5 shrink-0 text-green" />{p}</li>)}</ul>
          <Link href={`/solutions/roles/${r.slug}`} className="link-arrow mt-6 text-[15px] text-orange">Full view for {r.title.toLowerCase()} <Icon name="arrow" size={16} /></Link>
        </div>
        <div className="flex flex-col justify-center gap-4">
          {r.screen === "whatsapp" ? <div className="flex justify-center"><PhoneFrame scale={0.8}><WhatsAppThread /></PhoneFrame></div> : <Screen k={r.screen} compact />}
          <p className="rounded-2xl bg-cream px-4 py-3 text-[14px] text-body-muted"><b className="font-display text-[18px] text-ink">{r.metric[0]}</b> &nbsp;{r.metric[1]}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Clinic level picker ---------- */
export function ClinicPicker() {
  const [i, setI] = useState(1);
  const c = clinicLevels[i];
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {clinicLevels.map((x, k) => (
          <button key={x.slug} onClick={() => setI(k)} className={`rounded-2xl border p-4 text-left transition-all duration-base md:p-5 ${k === i ? "border-ink bg-ink text-white shadow-float" : "border-hairline bg-white hover:-translate-y-0.5 hover:border-line-strong"}`}>
            <Icon name={x.icon} size={22} className={k === i ? "text-orange" : "text-purple"} />
            <p className={`mt-3 font-display text-[15px] font-semibold md:text-[16px] ${k === i ? "text-white" : "text-ink"}`}>{x.label}</p>
            <p className={`text-[13px] ${k === i ? "text-white/65" : "text-body-muted"}`}>{x.size}</p>
          </button>
        ))}
      </div>
      <div key={c.slug} className="mt-5 grid animate-fade-up gap-6 rounded-3xl bg-white p-6 shadow-card md:p-9 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h3 className="display-lg">{c.headline}</h3>
          <p className="mt-3 text-[15.5px] text-body-muted">{c.who}</p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">{c.focus.map((f) => <li key={f} className="flex gap-2.5 rounded-xl bg-cream p-3.5 text-[14.5px] text-ink"><Icon name="check" size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-green" />{f}</li>)}</ul>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-lavender p-6">
          <blockquote className="border-l-2 border-orange pl-4"><p className="font-display text-[16px] font-medium text-ink">&ldquo;{c.proof[0]}&rdquo;</p><p className="mt-2 text-[13px] text-body-muted">{c.proof[1]}</p></blockquote>
          <div className="mt-6 flex flex-wrap items-center gap-3"><Link href={`/solutions/clinics/${c.slug}`} className="btn-dark">Explore</Link><span className="text-[13.5px] text-body-muted">Recommended plan: <b className="text-ink">{c.plan}</b></span></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Picture testimonials ---------- */
export function TestimonialShowcase() {
  const items = useCms("testimonials");
  const [paused, setPaused] = useState(false);
  const [i, setI] = useCycle(items.length || 1, 7000, paused);
  if (!items.length) return null;
  const t = items[Math.min(i, items.length - 1)];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div key={t.id} className="grid animate-fade-up overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-[260px] md:min-h-[380px]">
          <PersonPhoto item={t} rounded="" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
            <p className="font-display text-[18px] font-semibold">{t.name}</p><p className="text-[13.5px] text-white/80">{t.role}, {t.org}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-7 md:p-12">
          <div>
            <div className="flex items-center justify-between gap-3"><span className="chip bg-peach text-orange">{t.tag}</span>{t.logo && <img src={t.logo} alt={t.org} className="h-8 w-auto object-contain" />}</div>
            <p className="mt-6 font-display text-[20px] font-medium leading-snug text-ink md:text-[25px]">&ldquo;{t.quote}&rdquo;</p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={() => setI((i - 1 + items.length) % items.length)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-hairline transition hover:border-ink"><Icon name="arrow" size={16} className="rotate-180" /></button>
            <button onClick={() => setI((i + 1) % items.length)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-hairline transition hover:border-ink"><Icon name="arrow" size={16} /></button>
            <span className="ml-2 text-[13px] text-body-muted">{i + 1} / {items.length}</span>
          </div>
        </div>
      </div>
      <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-2">
        {items.map((x, k) => (
          <button key={x.id} onClick={() => setI(k)} className={`flex shrink-0 items-center gap-3 rounded-2xl p-2 pr-4 transition ${k === i ? "bg-white shadow-card" : "opacity-70 hover:opacity-100"}`}>
            <PersonPhoto item={x} size="sm" rounded="rounded-xl" className="h-11 w-11" />
            <span className="text-left"><b className="block font-display text-[13.5px] text-ink">{x.name}</b><span className="text-[12px] text-body-muted">{x.org}</span></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TestimonialGrid() {
  const items = useCms("testimonials");
  return (
    <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
      {items.map((t) => (
        <figure key={t.id} className="card mb-5 break-inside-avoid p-6">
          <div className="flex items-center gap-3"><PersonPhoto item={t} size="sm" rounded="rounded-full" className="h-14 w-14 shrink-0" /><figcaption><b className="block font-display text-[15px] text-ink">{t.name}</b><span className="text-[13px] text-body-muted">{t.role}, {t.org}</span></figcaption></div>
          <blockquote className="mt-4 text-[15.5px] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
        </figure>
      ))}
    </div>
  );
}

/* ---------- Logos ---------- */
export function LogoMarquee({ label = "Trusted by India's leading fertility chains, clinics and hospitals" }) {
  const items = useCms("clients");
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  return (
    <div>
      {label && <p className="text-center text-[14px] text-body-muted">{label}</p>}
      <div className="mt-7 space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="marquee-wrap mask-x overflow-hidden">
            <div className="marquee-track items-center gap-12" style={{ animationDirection: r ? "reverse" : "normal", animationDuration: "55s" }}>
              {[...row, ...row].map((x, k) => <div key={x.id + k} className="flex h-10 shrink-0 items-center"><ClientMark item={x} mono /></div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoWall() {
  const items = useCms("clients");
  const [cat, setCat] = useState("all");
  const shown = cat === "all" ? items : items.filter((x) => x.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[["all", "All"], ...clientCategories].map(([k, l]) => <button key={k} onClick={() => setCat(k)} className={`rounded-pill px-4 py-2 font-display text-[14px] font-semibold transition ${cat === k ? "bg-ink text-white" : "border border-hairline bg-white text-ink"}`}>{l} <span className="opacity-60">{k === "all" ? items.length : items.filter((x) => x.category === k).length}</span></button>)}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {shown.map((x) => <div key={x.id} className="grid h-24 animate-fade-up place-items-center rounded-2xl border border-hairline bg-white px-3 transition hover:-translate-y-0.5 hover:shadow-card"><ClientMark item={x} size="sm" /></div>)}
      </div>
    </div>
  );
}

export function IntegrationWall({ compact = false }) {
  const items = useCms("integrations");
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-3 sm:grid-cols-5 lg:grid-cols-9"}`}>
      {items.map((x) => (
        <div key={x.id} className="grid aspect-square place-items-center rounded-2xl border border-hairline bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-card" title={x.name}>
          {x.image ? <img src={x.image} alt={x.name} className="max-h-full max-w-full object-contain" /> : <span className="text-center font-display text-[13px] font-bold text-ink">{x.name}</span>}
        </div>
      ))}
    </div>
  );
}

export function CertStrip({ dark = false, layout = "row" }) {
  const items = useCms("certifications");
  if (layout === "cards") return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((c) => <div key={c.id} className="flex flex-col items-center rounded-3xl border border-hairline bg-white p-6 text-center"><CertBadge item={c} size={84} /><p className="mt-4 font-display text-[16px] font-semibold text-ink">{c.title}</p><p className="mt-1 text-[13.5px] text-body-muted">{c.subtitle}</p></div>)}
    </div>
  );
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
      {items.map((c) => <div key={c.id} className="flex items-center gap-3"><CertBadge item={c} size={52} /><div><p className={`font-display text-[14.5px] font-semibold ${dark ? "text-white" : "text-ink"}`}>{c.title}</p><p className={`text-[12.5px] ${dark ? "text-white/60" : "text-body-muted"}`}>{c.subtitle}</p></div></div>)}
    </div>
  );
}

/* ---------- Scheduled banners ---------- */
export function Spotlight() {
  const all = useCms("banners");
  const list = activeBanners(all);
  const [paused, setPaused] = useState(false);
  const [i, setI] = useCycle(list.length || 1, 6000, paused);
  const touch = useRef(null);
  const [, force] = useState(0);
  useEffect(() => { const iv = setInterval(() => force((n) => n + 1), 60000); return () => clearInterval(iv); }, []);
  if (!list.length) return null;
  const n = list.length, go = (k) => setI((k + n) % n);
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); touch.current = null; }}>
      <div className="grid overflow-hidden rounded-3xl">
        {list.map((b, k) => {
          const th = bannerThemes[b.theme] || bannerThemes.hero; const act = k === Math.min(i, n - 1);
          return (
            <div key={b.id} style={{ gridArea: "1/1" }} aria-hidden={!act} className={`transition-opacity duration-slow ${act ? "z-[1] opacity-100" : "pointer-events-none opacity-0"}`}>
              {b.mode === "artwork" ? (
                <a href={b.link || undefined} className="block"><picture>{b.mobileImage && <source media="(max-width: 767px)" srcSet={b.mobileImage} />}<img src={b.image} alt={b.title || "Banner"} className="block h-auto w-full" /></picture></a>
              ) : (
                <div className={`relative flex min-h-[200px] flex-col justify-between gap-6 overflow-hidden p-7 md:flex-row md:items-center md:p-12 ${th.className}`}>
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
                  <div className="relative max-w-2xl">
                    {b.kicker && <span className={`chip ${th.dark ? "bg-white/10 text-white" : "bg-white text-orange"}`}>{b.kicker}</span>}
                    <p className={`mt-3 font-display text-[24px] font-semibold leading-tight md:text-[30px] ${th.dark ? "text-white" : "text-ink"}`}>{b.title}</p>
                    {b.subtitle && <p className={`mt-2 text-[15.5px] ${th.dark ? "text-white/75" : "text-body"}`}>{b.subtitle}</p>}
                  </div>
                  <div className="relative flex shrink-0 flex-wrap gap-3">
                    {b.ctaLabel && <Link href={b.ctaHref || "/demo"} className={th.dark ? "btn-invert" : "btn-dark"}>{b.ctaLabel}</Link>}
                    {b.cta2Label && <Link href={b.cta2Href || "/demo"} className={th.dark ? "btn-ghost-invert" : "btn-outline"}>{b.cta2Label}</Link>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {n > 1 && <div className="mt-4 flex justify-center gap-2">{list.map((b, k) => <button key={b.id} aria-label={`Banner ${k + 1}`} onClick={() => go(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-ink" : "w-2 bg-line-strong"}`} />)}</div>}
    </div>
  );
}

/* ---------- FAQ ---------- */
export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-hairline rounded-3xl border border-hairline bg-white px-5 md:px-8">
      {items.map((f, k) => { const o = open === k; return (
        <div key={f.q}>
          <button onClick={() => setOpen(o ? -1 : k)} aria-expanded={o} className="flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="font-display text-[16px] font-semibold text-ink md:text-[16.5px]">{f.q}</span>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-base ${o ? "rotate-45 bg-orange text-white" : "bg-cream text-ink"}`}><Icon name="plus" size={16} strokeWidth={2.2} /></span>
          </button>
          <div className={`grid transition-all duration-base ${o ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="max-w-3xl pb-6 text-[15.5px] text-body">{f.a}</p></div></div>
        </div>); })}
    </div>
  );
}
