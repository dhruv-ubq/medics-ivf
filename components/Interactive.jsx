"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { BrowserFrame, PhoneFrame, DashboardScreen, WorklistScreen, AppointmentsScreen, EmrScreen, EmbryoScreen, BillingScreen, StockScreen, ComplianceScreen, VitrificationScreen, CounsellingScreen, AiEmrScreen, AppHome, AppQuick, AppBooking, AppRecords, AppBill, AppCheckin, AppAssistant, AppLogin, AppFamily, WhatsAppThread } from "./Mockups";
import { ClientMark, CertBadge, PersonPhoto } from "./Brandkit";
import { Reveal } from "./Motion";
import { roles, clinicLevels, pains, followupFlows } from "@/lib/content";
import { useCms, activeBanners, bannerThemes, clientCategories } from "@/lib/store";

export const screens = { dashboard: DashboardScreen, worklist: WorklistScreen, appointments: AppointmentsScreen, emr: EmrScreen, embryo: EmbryoScreen, billing: BillingScreen, stock: StockScreen, trust: ComplianceScreen, vitrification: VitrificationScreen, counselling: CounsellingScreen, aiemr: AiEmrScreen };
export function Screen({ k, url, compact }) { const S = screens[k] || DashboardScreen; return <BrowserFrame url={url}><S compact={compact} /></BrowserFrame>; }

/* ---------- Auto-advancing hook ---------- */
function useCycle(n, ms, paused) {
  const [i, setI] = useState(0);
  useEffect(() => { if (paused || n < 2) return; const t = setTimeout(() => setI((p) => (p + 1) % n), ms); return () => clearTimeout(t); }, [i, n, ms, paused]);
  return [i, setI];
}

/* ---------- Problems and how medics IVF answers them (scroll revealed, no clicking needed) ---------- */
const Tick = ({ d, children, tone = "green" }) => (
  <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[12.5px] text-ink opacity-0 shadow-sm group-[.in]:animate-fade-up" style={{ animationDelay: `${d}ms` }}>
    <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-white ${tone === "orange" ? "bg-orange" : "bg-green"}`}><Icon name={tone === "orange" ? "clock" : "check"} size={9} strokeWidth={3} /></span>{children}
  </div>
);
function ProblemVisual({ k }) {
  const base = 500;
  if (k === "art") return (<div className="space-y-1.5">{["Couple registered · UHID 2291", "Donor D-1182 mapped to cycle", "OPU 12 · ET 2 recorded"].map((t, i) => <Tick key={t} d={base + i * 220}>{t}</Tick>)}<div className="flex items-center justify-between rounded-lg bg-ink px-2.5 py-2 text-[12.5px] font-semibold text-white opacity-0 group-[.in]:animate-fade-up" style={{ animationDelay: `${base + 700}ms` }}>ART summary report<Icon name="down" size={14} /></div></div>);
  if (k === "consent") return (<div className="rounded-xl bg-white p-3 shadow-sm"><p className="text-[12px] font-semibold text-ink">Consent · IVF with ICSI</p><p className="text-[11.5px] text-body-muted">Ananya R. and Rohit R. · 12 Aug</p><div className="mt-2 h-8 rounded-md border border-dashed border-line-strong"><svg viewBox="0 0 120 30" className="h-full w-32"><path d="M5 22c10-14 18-14 22-4s10 6 16-6 10-8 14 2 12 6 20-6 14-6 30 4" fill="none" stroke="#0b1846" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200" className="group-[.in]:[animation:sign_1.4s_.5s_ease-out_forwards]" /></svg></div><div className="mt-2 opacity-0 group-[.in]:animate-fade-up" style={{ animationDelay: "1700ms" }}><span className="chip bg-mint text-green">Signed · on the patient record</span></div></div>);
  if (k === "vitrification") return (<div className="rounded-xl bg-white p-3 shadow-sm"><div className="flex items-center justify-between"><p className="text-[12px] font-semibold text-ink">Contract VC-1874</p><span className="chip bg-peach text-orange opacity-0 group-[.in]:animate-fade-up" style={{ animationDelay: "1200ms" }}>Renewal due</span></div><p className="text-[11.5px] text-body-muted">3 embryos · tank C1-08</p><div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#f1f0f7]"><div className="h-full w-0 rounded-full bg-brand-gradient group-[.in]:[animation:fill_1.2s_.5s_ease-out_forwards]" /></div><div className="mt-1 flex justify-between text-[11px] text-body-muted"><span>30 Oct 2025</span><span>Valid till 30 Oct 2026</span></div></div>);
  if (k === "security") return (<div className="space-y-1.5">{[["Doctor", "View and sign records", true], ["Front desk", "Billing, not clinical notes", true], ["Discounts", "Only within your limit", true]].map(([r, t], i) => <div key={r} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[12.5px] opacity-0 shadow-sm group-[.in]:animate-fade-up" style={{ animationDelay: `${base + i * 220}ms` }}><Icon name="lock" size={13} className="shrink-0 text-purple" /><b className="text-ink">{r}</b><span className="truncate text-body-muted">{t}</span></div>)}<div className="flex items-center gap-2 px-1 pt-1 text-[12px] font-semibold text-ink opacity-0 group-[.in]:animate-fade-up" style={{ animationDelay: "1300ms" }}><Icon name="shield" size={14} className="text-green" />ISO 27001 · ABDM compliant</div></div>);
  return (<div className="space-y-1.5"><Tick d={base} tone="orange">Follow up set in EMR · Fri 10:30</Tick><div className="max-w-[92%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12.5px] text-ink opacity-0 shadow-sm group-[.in]:animate-fade-up" style={{ animationDelay: "800ms" }}><span className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-[#128c7e]"><Icon name="message" size={11} />WhatsApp</span>Hi Ananya, your follow up with Dr. Nair is on Fri at 10:30 AM.</div><Tick d={1300}>Booked from the reminder</Tick></div>);
}
const probTint = { art: "bg-sky", consent: "bg-lavender", vitrification: "bg-peach", security: "bg-mint", followup: "bg-cream" };
export function ProblemCards({ lean = false }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {pains.map((p, i) => (
        <Reveal key={p.k} delay={(i % 3) * 90} className={`group flex flex-col overflow-hidden rounded-3xl border border-hairline bg-white ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === 4 ? "md:col-span-2 lg:col-span-2" : ""}`}>
          <div className="p-6 md:p-7">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white"><Icon name={p.icon} size={19} /></span><span className="font-display text-[13px] font-semibold text-body-muted">0{i + 1}</span></div>
            <h3 className="mt-4 font-display text-[20px] font-bold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-[14.5px] text-body-muted">{p.pain}</p>
            <div className="mt-5 border-t border-hairline pt-5">
              <p className="eyebrow text-orange">How medics IVF helps</p>
              <p className="mt-2 text-[15.5px] font-medium text-ink">{p.fix}</p>
              {!lean && <ul className="mt-3 space-y-1.5">{p.points.map((x) => <li key={x} className="flex gap-2 text-[14px] text-body"><Icon name="check" size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-green" />{x}</li>)}</ul>}
            </div>
          </div>
          <div className={`mt-auto p-5 ${probTint[p.k]}`}><ProblemVisual k={p.k} /></div>
        </Reveal>
      ))}
      <style>{`@keyframes sign{to{stroke-dashoffset:0}}@keyframes fill{to{width:78%}}`}</style>
    </div>
  );
}
export const PainExplorer = ProblemCards;

/* ---------- Platform tour tabs ---------- */
const tour = [
  { k: "clinic", icon: "stethoscope", label: "Clinical care", title: "AI EMR built for fertility", body: "The full cycle on one record, with an AI summary of every past visit, cycle and report. Doctors finish a patient assessment in about two minutes.", points: ["AI summary of past records and clinical history", "Cycle summary, scans and hormone values on one screen", "Treatment advice and summaries sent to the patient app"], v: "aiemr", href: "/platform/clinical-lab" },
  { k: "lab", icon: "lab", label: "Embryology", title: "A traceable lab, OPU to FET", body: "OPU, culture, transfer, vitrification and thaw on the same cycle, with limits enforced and nothing copied twice.", points: ["OPU, culture and ET records", "Vitrification contracts with validity dates", "Andrology, cryostorage and thaw on one record"], v: "embryo", href: "/platform/clinical-lab" },
  { k: "ops", icon: "billing", label: "Billing and stock", title: "No leaks at the counter or the store", body: "Package bills with selected inclusions, discounts by category within limits, advances, receipts and refunds, plus pharmacy, purchase and inventory.", points: ["Package bills with selected inclusions", "Discount and refund limits set in masters", "PO, GRN, indents and GST reports"], v: "billing", href: "/platform/operations" },
  { k: "counsel", icon: "users", label: "Counsellor flow", title: "Counselling that keeps couples moving", body: "Counsellors see where every couple stands, explain packages and consent clearly, and never miss a follow up between consult and cycle start.", points: ["Couple stage from enquiry to cycle start", "Packages, inclusions and payment plans explained", "Consent status and follow up tasks in one place"], v: "counselling", href: "/platform/operations" },
  { k: "app", icon: "phone", label: "Patient app", title: "Engagement across the full IVF journey", body: "medics care stays with the couple end to end, from first enquiry and booking to every scan, transfer and follow up, under your clinic's brand.", points: ["Booking, QR check in, reports and bills", "Treatment status and reminders at every stage", "Automated follow ups on WhatsApp, SMS and app"], v: "app", href: "/patient-engagement" },
  { k: "insight", icon: "analytics", label: "Insights", title: "Every centre, one dashboard", body: "IVF, lab, pharmacy, purchase and collection reports, for the group and for each centre.", points: ["IVF dashboard and data exports", "KPI dashboards and no show reports", "Cash collection by unit and user"], v: "dashboard", href: "/platform/network-insights" },
];
export function PlatformTour() {
  const [paused, setPaused] = useState(false);
  const [i, setI] = useCycle(tour.length, 7000, paused);
  const t = tour[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="Platform areas" className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {tour.map((x, k) => (
          <button key={x.k} role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl border px-3 py-3 font-display text-[14px] font-semibold transition-colors duration-base ${k === i ? "border-ink bg-ink text-white" : "border-hairline bg-white text-body hover:border-ink hover:text-ink"}`}>
            <Icon name={x.icon} size={16} className={k === i ? "text-orange" : "text-body-muted"} />{x.label}
            {k === i && !paused && <span key={i} className="absolute bottom-0 left-0 h-[3px] bg-orange" style={{ animation: "prog 7s linear forwards" }} />}
          </button>
        ))}
      </div>
      <div className="mt-6 grid items-center gap-8 rounded-3xl bg-cream p-5 sm:mt-8 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div key={t.k} className="animate-fade-up">
          <h3 className="display-lg">{t.title}</h3>
          <p className="body-lg mt-4 text-body">{t.body}</p>
          <ul className="mt-6 space-y-3">{t.points.map((p) => <li key={p} className="flex items-start gap-3 text-[15.5px] text-ink"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-white"><Icon name="check" size={12} strokeWidth={3} /></span>{p}</li>)}</ul>
          <Link href={t.href} className="link-arrow mt-7 text-[15px] text-orange">Explore <Icon name="arrow" size={16} /></Link>
        </div>
        <div key={t.k + "v"} className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          {t.v === "app" ? <JourneyVisual /> : <Screen k={t.v} />}
        </div>
      </div>
      <style>{`@keyframes prog{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}

/* ---------- Full IVF journey on the patient app ---------- */
const journey = [["Enquiry", "Brochure and first consult booked", "message"], ["First visit", "QR check in, couple registration", "calendar"], ["Counselling", "Package and consent explained", "users"], ["Stimulation", "Scan and injection reminders", "bell"], ["OPU and transfer", "Day by day updates and instructions", "heart"], ["Pregnancy test", "Results and next steps in the app", "records"], ["Beyond", "Follow ups, FET and family care", "spark"]];
function JourneyVisual() {
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[auto_1fr]">
      <div className="mx-auto"><PhoneFrame scale={0.7}><AppHome /></PhoneFrame></div>
      <ol className="relative space-y-2 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-[2px] before:bg-gradient-to-b before:from-orange before:via-purple before:to-blue">
        {journey.map(([t, d, i]) => (
          <li key={t} className="relative flex items-center gap-3 rounded-xl bg-white px-2 py-2 shadow-sm">
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-white"><Icon name={i} size={14} /></span>
            <span className="min-w-0"><b className="block font-display text-[13.5px] text-ink">{t}</b><span className="text-[12.5px] text-body-muted">{d}</span></span>
          </li>
        ))}
      </ol>
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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-col">
        {roles.map((x, k) => (
          <button key={x.slug} onClick={() => setI(k)} className={`flex min-w-0 items-center gap-2.5 rounded-2xl px-3 py-3 text-left transition-all duration-base sm:gap-3 sm:px-4 ${k === i ? "bg-white shadow-card ring-1 ring-orange/40" : "bg-white/50 hover:bg-white/80"}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${k === i ? "bg-orange text-white" : "bg-white text-ink"}`}><Icon name={x.icon} size={18} /></span>
            <span className="font-display text-[13.5px] font-semibold leading-tight text-ink sm:text-[14.5px]">{x.title}</span>
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
  const [i, setI] = useCycle(items.length || 1, 8000, paused);
  if (!items.length) return null;
  const t = items[Math.min(i, items.length - 1)];
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mx-auto max-w-5xl">
      <figure key={t.id} className="grid animate-fade-up overflow-hidden rounded-3xl border border-hairline bg-white shadow-card md:grid-cols-[0.78fr_1.22fr]">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-peach via-cream to-lavender md:aspect-auto md:min-h-[420px]">
          {t.photo ? <img src={t.photo} alt={t.name} className="absolute inset-0 h-full w-full object-cover" /> : (
            <div className="absolute inset-0 grid place-items-center p-8">
              <div className="text-center">
                <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-orange to-purple font-display text-[30px] font-bold text-white shadow-float sm:h-28 sm:w-28">{initials(t.name)}</span>
                {t.logo && <span className="mx-auto mt-5 inline-flex rounded-2xl bg-white px-4 py-3 shadow-sm"><img src={t.logo} alt={t.org} className="h-9 w-auto max-w-[180px] object-contain" /></span>}
              </div>
            </div>
          )}
          {t.photo && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-white"><p className="font-display text-[17px] font-semibold">{t.name}</p><p className="text-[13px] text-white/85">{t.role}, {t.org}</p></div>}
        </div>
        <div className="relative flex flex-col justify-between p-6 sm:p-10">
          <svg aria-hidden viewBox="0 0 48 48" className="absolute right-6 top-6 h-12 w-12 text-peach sm:h-14 sm:w-14"><path fill="currentColor" d="M20 10H8v14h8c0 6-3 10-8 12l2 4c9-3 14-10 14-20V10Zm24 0H32v14h8c0 6-3 10-8 12l2 4c9-3 14-10 14-20V10Z" /></svg>
          <div>
            <div className="flex min-h-[40px] items-center">{t.photo && t.logo ? <img src={t.logo} alt={t.org} className="h-9 w-auto max-w-[170px] object-contain" /> : <span className="chip bg-peach text-orange">{t.tag}</span>}</div>
            <blockquote className="relative mt-5 font-display text-[19px] font-medium leading-snug text-ink sm:text-[23px]">&ldquo;{t.quote}&rdquo;</blockquote>
          </div>
          <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <span><b className="block font-display text-[15.5px] text-ink">{t.name}</b><span className="text-[13.5px] text-body-muted">{t.role}, {t.org}</span></span>
            <div className="flex items-center gap-2">
              <button onClick={() => setI((i - 1 + items.length) % items.length)} aria-label="Previous story" className="grid h-11 w-11 place-items-center rounded-full border border-hairline transition hover:border-ink"><Icon name="arrow" size={16} className="rotate-180" /></button>
              <span className="min-w-[44px] text-center text-[13px] text-body-muted">{i + 1} / {items.length}</span>
              <button onClick={() => setI((i + 1) % items.length)} aria-label="Next story" className="grid h-11 w-11 place-items-center rounded-full border border-hairline transition hover:border-ink"><Icon name="arrow" size={16} /></button>
            </div>
          </figcaption>
        </div>
      </figure>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {items.map((x, k) => <button key={x.id} onClick={() => setI(k)} aria-label={`Story from ${x.org}`} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-orange" : "w-2.5 bg-line-strong hover:bg-body-muted"}`} />)}
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

/* ---------- Endless horizontal marquee (repeats items so the loop never shows a gap) ---------- */
export function Marquee({ items, render, reverse = false, secsPerItem = 3.2, gap = 40, className = "" }) {
  if (!items?.length) return null;
  const base = []; while (base.length < 14) base.push(...items);
  const dur = Math.max(20, base.length * secsPerItem);
  return (
    <div className={`marquee-wrap mask-x overflow-hidden ${className}`}>
      <div className="marquee-track items-center" style={{ animationDuration: `${dur}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {[...base, ...base].map((x, k) => <div key={k} className="shrink-0" style={{ paddingRight: gap }} aria-hidden={k >= base.length || undefined}>{render(x)}</div>)}
      </div>
    </div>
  );
}

export function LogoMarquee({ label = "Trusted by India's leading fertility chains, clinics and hospitals" }) {
  const items = useCms("clients");
  const half = Math.ceil(items.length / 2);
  return (
    <div>
      {label && <p className="text-center text-[14px] text-body-muted">{label}</p>}
      <div className="mt-7 space-y-5">
        <Marquee items={items.slice(0, half)} gap={56} render={(x) => <div className="flex h-12 items-center"><ClientMark item={x} /></div>} />
        <Marquee items={items.slice(half)} gap={56} reverse render={(x) => <div className="flex h-12 items-center"><ClientMark item={x} /></div>} />
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

export function IntegrationWall() {
  const items = useCms("integrations");
  return (
    <Marquee items={items} gap={16} secsPerItem={2.6} render={(x) => (
      <div className="grid h-24 w-24 place-items-center rounded-2xl border border-hairline bg-white p-3 sm:h-28 sm:w-28" title={x.name}>
        {x.image ? <img src={x.image} alt={x.name} className="max-h-full max-w-full object-contain" /> : <span className="text-center font-display text-[13px] font-bold text-ink">{x.name}</span>}
      </div>
    )} />
  );
}

export function CertStrip({ layout = "row" }) {
  const items = useCms("certifications");
  if (layout === "cards") return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((c) => <div key={c.id} className="flex flex-col items-center rounded-3xl border border-hairline bg-white p-6 text-center"><CertBadge item={c} size={84} /><p className="mt-4 font-display text-[16px] font-semibold text-ink">{c.title}</p><p className="mt-1 text-[13.5px] text-body-muted">{c.subtitle}</p></div>)}
    </div>
  );
  // Always on a white surface so badges never blend into dark sections.
  return (
    <div className="rounded-2xl bg-white py-5">
      <Marquee items={items} gap={48} secsPerItem={4} render={(c) => (
        <div className="flex items-center gap-3"><CertBadge item={c} size={50} /><div className="whitespace-nowrap"><p className="font-display text-[14.5px] font-semibold text-ink">{c.title}</p><p className="text-[12.5px] text-body-muted">{c.subtitle}</p></div></div>
      )} />
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
