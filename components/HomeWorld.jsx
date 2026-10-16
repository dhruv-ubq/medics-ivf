"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { Reveal, Counter } from "./Motion";
import { ClientMark, CertBadge } from "./Brandkit";
import { BrowserFrame, PhoneFrame, DashboardScreen, AppHome, AppRecords, FloatChip } from "./Mockups";
import { useCms } from "@/lib/store";
import { NETWORK } from "@/lib/defaults";
import { AiEmrScreen } from "./Mockups";

/* ======================= HERO MEDIA: video when set, product screens otherwise ======================= */
function embedUrl(u) {
  try {
    const url = new URL(u);
    const host = url.hostname.replace(/^www\./, "");
    let id = "";
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (host.endsWith("youtube.com")) id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
    if (id) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&rel=0&modestbranding=1&playsinline=1`;
    if (host.endsWith("vimeo.com")) { const v = url.pathname.split("/").filter(Boolean).pop(); return `https://player.vimeo.com/video/${v}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`; }
  } catch {}
  return "";
}

function HeroVideo({ src, poster }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const embed = /^https:\/\//.test(src) && !/\.(mp4|webm)(\?|$)/i.test(src) ? embedUrl(src) : "";
  if (embed) return <div className="relative aspect-video w-full"><iframe src={embed} title="medics IVF product video" className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" /></div>;
  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); } };
  return (
    <div className="relative aspect-video w-full bg-ink">
      <video ref={ref} src={src} poster={poster || undefined} className="absolute inset-0 h-full w-full object-cover" autoPlay muted={muted} loop playsInline preload="metadata" />
      <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-4 sm:right-4">
        <button onClick={toggle} aria-label={playing ? "Pause video" : "Play video"} className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-float backdrop-blur transition hover:bg-white"><Icon name={playing ? "pause" : "play"} size={16} /></button>
        <button onClick={() => { setMuted((m) => !m); }} aria-label={muted ? "Turn sound on" : "Mute"} className="flex h-10 items-center gap-1.5 rounded-full bg-white/90 px-3.5 text-[13px] font-semibold text-ink shadow-float backdrop-blur transition hover:bg-white">{muted ? "Sound on" : "Mute"}</button>
      </div>
    </div>
  );
}

function HeroMedia({ video, poster }) {
  if (video) return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white shadow-float ring-1 ring-black/5 sm:rounded-3xl">
      <HeroVideo src={video} poster={poster} />
    </div>
  );
  return (
    <div className="relative">
      <BrowserFrame className="shadow-float" base={980}><DashboardScreen /></BrowserFrame>
      <div className="absolute -bottom-10 -right-10 hidden lg:block"><PhoneFrame scale={0.62}><AppHome /></PhoneFrame></div>
      <FloatChip icon="shield" tone="green" title="ART compliance passed" sub="Consent and donor verified" className="-bottom-6 left-6 hidden md:flex" />
    </div>
  );
}

/* ======================= HERO (centred, media below) ======================= */
export function HeroWorld() {
  const h = useCms("hero");
  const certs = useCms("certifications");
  const badges = ["cert-iso", "cert-soc2", "cert-abdm", "cert-dpdp"].map((id) => certs.find((c) => c.id === id)).filter(Boolean);
  return (
    <section className="hero-light relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hl-blob hl-a" /><div className="hl-blob hl-b" /><div className="hl-blob hl-c" />
        <div className="hl-grid absolute inset-0" />
        <svg className="absolute left-1/2 top-[-30%] hidden h-[120%] -translate-x-1/2 md:block" viewBox="0 0 800 800" fill="none">
          {[150, 230, 310, 390].map((r, i) => <circle key={r} cx="400" cy="400" r={r} stroke="#0b1846" strokeOpacity={0.06 - i * 0.01} strokeDasharray={i % 2 ? "4 8" : "0"} />)}
          <circle cx="400" cy="10" r="5" fill="#ff6700" className="hl-orbit" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>
      <div className="container-x relative pb-14 pt-10 text-center sm:pb-20 sm:pt-16 lg:pt-20">
        <p className="inline-flex animate-fade-up items-center gap-2 rounded-pill border border-hairline bg-white/80 px-3.5 py-1.5 text-[12.5px] font-medium text-body shadow-sm backdrop-blur sm:text-[13px]">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />{h.eyebrow}
        </p>
        <h1 className="mx-auto mt-6 max-w-5xl animate-fade-up font-display font-bold tracking-[-0.03em] text-ink [text-wrap:balance]" style={{ animationDelay: "80ms" }}>
          <span className="block text-[36px] leading-[1.06] min-[400px]:text-[40px] sm:text-[58px] lg:text-[74px]">{h.headline}</span>
          <span className="mt-2 block bg-gradient-to-r from-orange via-[#e5398f] to-purple bg-clip-text pb-1 text-[28px] leading-[1.12] text-transparent min-[400px]:text-[31px] sm:text-[44px] lg:text-[56px]">{h.highlight}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-[16px] leading-relaxed text-body sm:text-[18px]" style={{ animationDelay: "160ms" }}>{h.subline}</p>
        <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:justify-center" style={{ animationDelay: "240ms" }}>
          <Link href="/demo" className="btn-primary px-7 py-3.5 text-[15.5px]">Book a demo <Icon name="arrow" size={17} /></Link>
          <Link href="/platform" className="btn-outline px-7 py-3.5 text-[15.5px]">Explore the platform</Link>
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl animate-fade-up flex-wrap items-center justify-center gap-2 sm:gap-2.5" style={{ animationDelay: "320ms" }}>
          {badges.map((c) => (
            <span key={c.id} className="flex items-center gap-2 rounded-pill border border-hairline bg-white py-1 pl-1 pr-3 shadow-sm">
              <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white sm:h-8 sm:w-8"><CertBadge item={c} size={28} /></span>
              <span className="whitespace-nowrap text-[12px] font-semibold text-ink sm:text-[12.5px]">{c.title}</span>
            </span>
          ))}
          <span className="flex items-center gap-2 rounded-pill border border-hairline bg-white py-1 pl-1 pr-3 shadow-sm">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-green text-white sm:h-8 sm:w-8"><Icon name="check" size={13} strokeWidth={3} /></span>
            <span className="whitespace-nowrap text-[12px] font-semibold text-ink sm:text-[12.5px]">ART compliance built in</span>
          </span>
        </div>
        <div className="relative mx-auto mt-12 max-w-5xl animate-fade-up text-left sm:mt-14" style={{ animationDelay: "380ms" }}>
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-peach via-lavender to-sky opacity-90 blur-2xl sm:-inset-8" />
          <HeroMedia video={h.video} poster={h.poster} />
        </div>
      </div>
    </section>
  );
}

/* ======================= KEY NUMBERS STRIP ======================= */
const strip = [[500, "+", "Hospitals and clinics"], [140, "+", "Centres at Nova IVF, one record"], [350000, "+", "Treatment cycles managed"], [20, "+", "Years in healthcare software"]];
export function StatStrip() {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-hairline bg-white lg:grid-cols-4">
      {strip.map(([v, s, l], k) => (
        <div key={l} className={`p-5 sm:p-7 ${k % 2 ? "border-l border-hairline" : ""} ${k > 1 ? "border-t border-hairline lg:border-t-0" : ""} ${k === 2 ? "lg:border-l" : ""}`}>
          <p className="font-display text-[28px] font-bold leading-none tracking-tight text-ink sm:text-[36px]"><Counter value={v} suffix={s} /></p>
          <p className="mt-2 text-[13.5px] text-body-muted sm:text-[14.5px]">{l}</p>
        </div>
      ))}
    </div>
  );
}

/* ======================= TRUST · SCALE · COMPLIANCE ======================= */
function NetworkViz() {
  const nodes = [[50, 14], [84, 30], [86, 68], [62, 90], [30, 88], [12, 64], [18, 28]];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Centres connected to one hub">
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <path id={`sp${i}`} d={`M50 52 L${x} ${y}`} stroke="#d5d2e2" strokeWidth=".6" fill="none" />
          <circle r="1" fill="#ff6700"><animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite"><mpath href={`#sp${i}`} /></animateMotion></circle>
          <circle cx={x} cy={y} r="4.4" fill="#fff" stroke="#d5d2e2" strokeWidth=".6" />
          <circle cx={x} cy={y} r="1.6" fill="#0b1846" />
        </g>
      ))}
      <circle cx="50" cy="52" r="9" fill="#0b1846" />
      <text x="50" y="53.3" textAnchor="middle" fontSize="3.6" fontFamily="Montserrat,Arial" fontWeight="700" fill="#fff">HUB</text>
    </svg>
  );
}

const checks = ["ART compliance", "Consent forms", "Vitrification contracts", "Role based access"];

export function PillarsBento() {
  const clients = useCms("clients");
  const card = "flex flex-col rounded-2xl border border-hairline bg-white p-6 sm:p-7";
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Reveal className={card}>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-peach text-orange"><Icon name="heart" size={20} /></span>
        <h3 className="mt-5 font-display text-[21px] font-bold text-ink">Trusted</h3>
        <p className="mt-2 text-[15px] text-body">500+ hospitals and fertility clinics, including India's largest IVF chain, run on medics.</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {clients.slice(0, 6).map((c) => <span key={c.id} className="rounded-lg border border-hairline bg-white px-2.5 py-1.5"><ClientMark item={c} size="sm" /></span>)}
        </div>
      </Reveal>
      <Reveal delay={90} className={card}>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-lavender text-purple"><Icon name="branches" size={20} /></span>
        <h3 className="mt-5 font-display text-[21px] font-bold text-ink">Scalable</h3>
        <p className="mt-2 text-[15px] text-body">Add centres without new systems. 140+ centres share one patient record with hub and spoke built in.</p>
        <div className="mx-auto mt-auto aspect-square w-full max-w-[190px] pt-4"><NetworkViz /></div>
      </Reveal>
      <Reveal delay={180} className={card}>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-green"><Icon name="shield" size={20} /></span>
        <h3 className="mt-5 font-display text-[21px] font-bold text-ink">Compliant</h3>
        <p className="mt-2 text-[15px] text-body">ART guideline records, consent and data security are part of every workflow, not an add on.</p>
        <ul className="mt-auto space-y-2 pt-6">
          {checks.map((t) => <li key={t} className="flex items-center gap-2.5 rounded-lg bg-cream px-3 py-2.5 text-[14px] font-medium text-ink"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green text-white"><Icon name="check" size={11} strokeWidth={3} /></span>{t}</li>)}
        </ul>
      </Reveal>
    </div>
  );
}

/* ======================= NUMBERS (dark band) ======================= */
const nums = [[500, "+", "Hospitals and clinics"], [350000, "+", "Treatment cycles"], [700000, "+", "Patients registered"], [100000, "+", "Embryo transfers"]];
export function NumbersBand() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {nums.map(([v, s, l], k) => (
        <Reveal key={l} delay={k * 80} className="border-l-2 border-orange pl-4 sm:pl-5">
          <p className="font-display text-[30px] font-bold leading-none tracking-tight text-white sm:text-[44px]"><Counter value={v} suffix={s} /></p>
          <p className="mt-2 text-[14px] text-white/65">{l}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ======================= medics care visual ======================= */
export function CareOrbit() {
  return (
    <div className="relative mx-auto max-w-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-peach via-cream to-lavender px-4 pt-5 sm:pt-12">
      <div className="relative z-10 mx-auto mb-4 flex w-max items-center gap-2 rounded-2xl border border-hairline bg-white/95 px-3 py-2 shadow-float sm:absolute sm:left-4 sm:top-4 sm:mb-0">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-mint text-green"><Icon name="message" size={14} /></span>
        <span className="text-left"><b className="block font-display text-[12.5px] text-ink">Follow up reminder sent</b><span className="text-[11.5px] text-body-muted">WhatsApp · Fri 10:30</span></span>
      </div>
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        <div className="hidden translate-y-6 min-[480px]:block"><PhoneFrame scale={0.66}><AppRecords /></PhoneFrame></div>
        <PhoneFrame scale={0.78}><AppHome /></PhoneFrame>
      </div>
    </div>
  );
}

/* ======================= CHAINS THAT GREW ON medics IVF ======================= */
export function NetworkGrowth() {
  const [lead, ...rest] = NETWORK;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <Reveal className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-9 lg:row-span-2">
        <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/30 blur-3xl" />
        <div className="relative inline-flex w-max rounded-2xl bg-white px-4 py-3"><img src={lead.logo} alt={lead.name} className="h-9 w-auto" /></div>
        <div className="relative mt-10">
          <p className="font-display text-[15px] font-semibold text-white/70">Scaled from</p>
          <p className="mt-1 flex items-end gap-3 font-display font-bold leading-none tracking-tight"><span className="text-[56px] text-white/50">1</span><Icon name="arrow" size={30} className="mb-3 text-orange" /><span className="text-[72px] sm:text-[84px]">140+</span></p>
          <p className="mt-3 text-[16px] text-white/75">centres {lead.region}, all on one medics IVF record.</p>
        </div>
      </Reveal>
      {rest.map((n, k) => (
          <Reveal key={n.id} delay={(k % 3) * 70} className={`flex flex-col justify-between rounded-2xl border border-hairline bg-white p-4 sm:p-5 ${k === rest.length - 1 ? "col-span-2 lg:col-span-2" : ""}`}>
            <div className="flex h-12 items-center">{n.logo ? <img src={n.logo} alt={n.name} className="max-h-11 w-auto max-w-full object-contain" loading="lazy" /> : <span className="font-display text-[22px] font-bold tracking-tight text-ink">{n.name}</span>}</div>
            <div className="mt-4">
              <p className="font-display text-[34px] font-bold leading-none tracking-tight text-ink sm:text-[40px]">{n.centres}<span className="ml-1.5 text-[14px] font-semibold text-body-muted">centres</span></p>
              <p className="mt-1.5 text-[13px] leading-snug text-body-muted">{n.region}</p>
            </div>
          </Reveal>
        ))}
    </div>
  );
}

/* ======================= AI EMR ======================= */
export function AiEmrBand() {
  const pts = [["spark", "Reads the whole history", "Past visits, cycles, scans and reports summarised in seconds."], ["clock", "Two minute assessments", "Doctors walk into every consult already briefed."], ["shield", "Flags what matters", "Allergies, falling AMH or failed cycles surface on their own."]];
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div>
        <Reveal><span className="inline-flex items-center gap-1.5 rounded-pill bg-gradient-to-r from-orange to-purple px-3 py-1 text-[12.5px] font-semibold text-white"><Icon name="spark" size={13} />New: AI EMR</span></Reveal>
        <Reveal><h2 className="mt-4 font-display text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[38px] lg:text-[44px]">Every patient assessed in two minutes.</h2></Reveal>
        <Reveal><p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-body sm:text-[18px]">medics IVF reads the full clinical history and gives the doctor a summary at the point of care, so more time goes to the couple.</p></Reveal>
        <div className="mt-8 space-y-4">
          {pts.map(([i, t, d], k) => (
            <Reveal key={t} delay={k * 80} className="flex gap-3.5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lavender text-purple"><Icon name={i} size={18} /></span><div><p className="font-display text-[16px] font-semibold text-ink">{t}</p><p className="mt-0.5 text-[14.5px] text-body-muted">{d}</p></div></Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={120} className="relative">
        <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-lavender via-peach to-sky opacity-90 blur-2xl" />
        <BrowserFrame><AiEmrScreen /></BrowserFrame>
      </Reveal>
    </div>
  );
}

/* ======================= MODULE MAP: hub and four spokes ======================= */
const modules = [
  { t: "Patient management", c: "#4fb8ff", g: "from-[#7b5cff] to-[#4fd1e8]", icon: "patients", items: [["Treatment cycle management", "heart"], ["Patient relationship management", "users"], ["Couple registration", "patients"], ["Patient counselling", "message"], ["Ovum and semen donor", "spark"], ["Referral management", "route"]] },
  { t: "Clinical", c: "#e15bd0", g: "from-[#5b6cff] to-[#ee4fb0]", icon: "stethoscope", items: [["AI EMR", "spark"], ["Embryology", "lab"], ["Andrology", "lab"], ["Cryostorage", "shield"], ["Pathology", "records"], ["Consent and ART records", "check"]] },
  { t: "Financial", c: "#ffb35c", g: "from-[#ff5fa2] to-[#ffc65c]", icon: "billing", items: [["Billing and packages", "billing"], ["Accounting interface", "link"], ["Financial reports", "chart"], ["Pharmacy", "desk"], ["Purchase and inventory", "building"]] },
  { t: "Administrative", c: "#8f87ff", g: "from-[#3b2fc9] to-[#8f87ff]", icon: "shield", items: [["Workflow and task management", "route"], ["Master data management", "network"], ["Operational reports", "analytics"], ["Security and user management", "lock"]] },
];
function ModuleCard({ m, k }) {
  return (
    <Reveal delay={k * 90} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-colors duration-300 hover:bg-white/[0.09] sm:p-6">
      <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl" style={{ background: m.c }} />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${m.g} text-white shadow-lg`}><Icon name={m.icon} size={20} /></span><p className="font-display text-[18px] font-bold text-white sm:text-[19px]">{m.t}</p></div>
        <span className="shrink-0 rounded-pill bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white/80">{m.items.length} modules</span>
      </div>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {m.items.map(([x, i]) => (
          <span key={x} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.07] px-2.5 py-1.5 text-[13.5px] font-medium text-white/90">
            <Icon name={i} size={13} style={{ color: m.c }} />{x}{x === "AI EMR" && <span className="ml-0.5 rounded-pill bg-orange px-1.5 text-[10px] font-bold text-white">NEW</span>}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
function Hub() {
  return (
    <div className="relative mx-auto grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
      <svg aria-hidden viewBox="0 0 200 200" className="orbit-spin absolute inset-0 h-full w-full"><circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,.18)" strokeDasharray="3 7" /><circle cx="100" cy="4" r="4" fill="#ff6700" /></svg>
      <svg aria-hidden viewBox="0 0 200 200" className="orbit-spin-rev absolute inset-[14%] h-[72%] w-[72%]"><circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,.12)" /><circle cx="196" cy="100" r="4" fill="#c46bff" /></svg>
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-orange via-[#c026d3] to-[#4338ca] opacity-60 blur-2xl" />
      <div className="relative grid h-[58%] w-[58%] place-items-center rounded-full bg-white shadow-float ring-4 ring-white/20">
        <div className="text-center"><img src="/brand/medics-icon.png" alt="" className="mx-auto h-10 w-10 object-contain sm:h-12 sm:w-12" /><p className="mt-1 font-display text-[12.5px] font-bold text-ink sm:text-[13.5px]">medics IVF</p></div>
      </div>
    </div>
  );
}
export function ModuleMap() {
  const total = modules.reduce((n, m) => n + m.items.length, 0);
  return (
    <div className="relative">
      {/* connectors (desktop) */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs><linearGradient id="mmg" x1="0" x2="1"><stop offset="0" stopColor="#ff6700" /><stop offset="1" stopColor="#c46bff" /></linearGradient></defs>
        {[[38, 25], [38, 75], [62, 25], [62, 75]].map(([x, y], k) => (
          <g key={k}>
            <path d={`M50 50 C ${x < 50 ? 44 : 56} 50, ${x < 50 ? 44 : 56} ${y}, ${x} ${y}`} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d={`M50 50 C ${x < 50 ? 44 : 56} 50, ${x < 50 ? 44 : 56} ${y}, ${x} ${y}`} fill="none" stroke="url(#mmg)" strokeWidth="2" strokeDasharray="6 14" vectorEffect="non-scaling-stroke" className="mm-flow" />
          </g>
        ))}
      </svg>
      <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_250px_1fr] lg:items-center lg:gap-x-10 lg:gap-y-6">
        <div className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Hub />
          <p className="mt-4 text-center text-[13.5px] text-white/70"><b className="font-display text-[20px] text-white">{total}</b> modules on one record</p>
        </div>
        <div className="lg:col-start-1 lg:row-start-1"><ModuleCard m={modules[0]} k={0} /></div>
        <div className="lg:col-start-3 lg:row-start-1"><ModuleCard m={modules[1]} k={1} /></div>
        <div className="lg:col-start-1 lg:row-start-2"><ModuleCard m={modules[2]} k={2} /></div>
        <div className="lg:col-start-3 lg:row-start-2"><ModuleCard m={modules[3]} k={3} /></div>
      </div>
    </div>
  );
}

/* ======================= medics care: the full IVF journey, end to end ======================= */
const careStages = [
  { p: "Before treatment", t: "Enquiry", d: "Clinic brochure, doctor profiles and a first consult booked in the app.", i: "message", ch: ["WhatsApp", "App"] },
  { p: "Before treatment", t: "First visit", d: "Online booking, QR self check in and couple registration. No queue.", i: "calendar", ch: ["App", "SMS"] },
  { p: "Before treatment", t: "Counselling", d: "Package, inclusions and consent explained, with the plan saved in the app.", i: "users", ch: ["App"] },
  { p: "During treatment", t: "Stimulation", d: "Daily injection and scan reminders, with reports the moment they are signed.", i: "bell", ch: ["Push", "WhatsApp"] },
  { p: "During treatment", t: "OPU and transfer", d: "Instructions before, updates after, and bills paid in the app.", i: "heart", ch: ["App", "SMS"] },
  { p: "After treatment", t: "Pregnancy test", d: "Results and the next step from the doctor, without a call to the desk.", i: "records", ch: ["App", "Email"] },
  { p: "After treatment", t: "Follow ups and FET", d: "Automated follow ups, frozen embryo transfer plans and contract renewals.", i: "route", ch: ["WhatsApp", "Push"] },
  { p: "After treatment", t: "Family care", d: "Both partners and family on one login, long after treatment ends.", i: "patients", ch: ["App"] },
];
const phaseTone = { "Before treatment": "bg-peach text-[#c25400]", "During treatment": "bg-lavender text-purple", "After treatment": "bg-mint text-green" };
const chColor = { WhatsApp: "bg-[#e7f9ee] text-[#128c7e]", App: "bg-lavender text-purple", SMS: "bg-peach text-[#c25400]", Push: "bg-lavender text-purple", Email: "bg-sky text-blue" };
export function CareJourney() {
  return (
    <div>
      <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-gradient-to-b from-orange via-purple to-blue sm:hidden" />
        {careStages.map((s, k) => (
          <Reveal as="li" key={s.t} delay={(k % 4) * 80} className="relative pl-12 sm:pl-0">
            <span className="absolute left-0 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange to-purple font-display text-[13px] font-bold text-white shadow-float ring-4 ring-white sm:hidden">{k + 1}</span>
            <div className="h-full rounded-2xl border border-hairline bg-white p-3.5 shadow-sm transition-shadow hover:shadow-card sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="hidden h-10 w-10 place-items-center rounded-xl bg-ink text-white sm:grid"><Icon name={s.i} size={18} /></span>
                <span className={`rounded-pill px-2.5 py-1 text-[11.5px] font-semibold ${phaseTone[s.p]}`}>{s.p}</span>
                <span className="hidden font-display text-[28px] font-bold leading-none text-[#ece9f6] sm:block">{String(k + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-2.5 font-display text-[16.5px] font-bold text-ink sm:mt-3">{s.t}</p>
              <p className="mt-1.5 text-[14px] leading-snug text-body">{s.d}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{s.ch.map((c) => <span key={c} className={`rounded-pill px-2 py-0.5 text-[11.5px] font-semibold ${chColor[c]}`}>{c}</span>)}</div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ======================= MOBILE STICKY CTA ======================= */
export function MobileCta() {
  const path = usePathname() || "/";
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > 640 && !nearEnd);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (path.startsWith("/admin") || path.startsWith("/demo")) return null;
  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white/95 px-4 pt-3 backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div className="flex gap-2">
        <Link href="/demo" className="btn-primary flex-1 py-3.5 text-[15px]">Book a demo</Link>
        <a href="tel:+918037564600" aria-label="Call us" className="grid w-14 place-items-center rounded-pill border border-hairline text-ink"><Icon name="phone" size={19} /></a>
      </div>
    </div>
  );
}
