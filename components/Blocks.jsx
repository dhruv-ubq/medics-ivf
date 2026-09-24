import Link from "next/link";
import Icon from "./Icon";
import { Reveal, Counter } from "./Motion";
import { stats, steps, compareCols, compareRows, geo } from "@/lib/content";

export function SectionHead({ eyebrow, title, body, center = false, className = "", dark = false }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow text-orange">{eyebrow}</p>}
      <h2 className={`display-xl mt-4 ${dark ? "text-white" : ""}`}>{title}</h2>
      {body && <p className={`body-lg mt-5 max-w-2xl ${center ? "mx-auto" : ""} ${dark ? "text-white/75" : "text-body"}`}>{body}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, body, primary = { label: "Book a demo", href: "/demo" }, secondary, visual, tint = "bg-cream" }) {
  return (
    <section className={`relative overflow-hidden ${tint}`}>
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className={`container-x relative grid items-center gap-10 py-14 md:py-20 ${visual ? "lg:grid-cols-[1fr_1fr] lg:gap-14" : ""}`}>
        <div className={visual ? "min-w-0" : "max-w-3xl"}>
          {eyebrow && <p className="eyebrow animate-fade-up text-orange">{eyebrow}</p>}
          <h1 className="display-hero mt-5 animate-fade-up" style={{ animationDelay: "60ms" }}>{title}</h1>
          {body && <p className="body-lg mt-6 max-w-xl animate-fade-up text-body" style={{ animationDelay: "120ms" }}>{body}</p>}
          {(primary || secondary) && <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3" style={{ animationDelay: "180ms" }}>
            {primary && <Link href={primary.href} className="btn-primary">{primary.label}</Link>}
            {secondary && <Link href={secondary.href} className="btn-outline">{secondary.label}</Link>}
          </div>}
        </div>
        {visual && <div className="min-w-0 animate-fade-up" style={{ animationDelay: "200ms" }}>{visual}</div>}
      </div>
    </section>
  );
}

export function StatBand({ dark = false }) {
  return (
    <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
      {stats.map((s, k) => (
        <Reveal key={s.label} delay={k * 80} className={`px-2 lg:px-6 ${k ? "lg:border-l" : ""} ${dark ? "border-white/15" : "border-hairline"}`}>
          <p className={`font-display text-[32px] font-bold tracking-tight sm:text-[38px] md:text-[44px] ${dark ? "text-white" : "text-ink"}`}><Counter value={s.value} suffix={s.suffix} /></p>
          <p className={`mt-1 text-[14px] ${dark ? "text-white/65" : "text-body-muted"}`}>{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function GeoLine({ dark = false }) {
  return <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] ${dark ? "text-white/65" : "text-body-muted"}`}><Icon name="globe" size={16} />Live in {geo.map((g) => <span key={g} className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{g}</span>)}</p>;
}

export function Steps() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {steps.map((s, k) => (
        <Reveal key={s.t} delay={k * 100}>
          <div className="h-full rounded-3xl border border-hairline bg-white p-7">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-peach font-display text-[16px] font-bold text-orange">{k + 1}</span>
            <h3 className="heading-md mt-5">{s.t}</h3><p className="mt-2 text-[15px] text-body">{s.b}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function CtaBand({ title = "See your whole fertility business on one platform.", body = "A 30 minute demo shaped around your clinic, your teams and the system you use today. No obligation." }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-12 md:px-16 md:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-purple/30 blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1.4fr_auto]">
            <div><h2 className="display-xl text-white">{title}</h2><p className="body-lg mt-4 max-w-2xl text-white/75">{body}</p></div>
            <div className="flex flex-wrap gap-3"><Link href="/demo" className="btn-primary">Book a demo</Link><Link href="/patient-engagement" className="btn-ghost-invert">See medics care</Link></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const mark = {
  yes: <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-mint text-green"><Icon name="check" size={15} strokeWidth={2.6} /></span>,
  partial: <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-sand text-body-muted"><Icon name="minus" size={15} strokeWidth={2.6} /></span>,
  no: <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-[#f6f5f8] text-[#c3c1cd]"><Icon name="x" size={13} strokeWidth={2.6} /></span>,
};
export function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-hairline bg-white">
      <table className="w-full min-w-[760px] text-left">
        <thead><tr><th className="p-5" />{compareCols.map((c, k) => <th key={c} className={`p-5 text-center font-display text-[14px] font-semibold ${k === 0 ? "bg-ink text-white" : "text-ink"}`}>{c}</th>)}</tr></thead>
        <tbody>{compareRows.map(([l, v]) => <tr key={l} className="border-t border-hairline"><td className="p-5 text-[15px] text-ink">{l}</td>{v.map((x, k) => <td key={k} className={`p-4 text-center ${k === 0 ? "bg-lavender/60" : ""}`}>{mark[x]}</td>)}</tr>)}</tbody>
      </table>
      <p className="border-t border-hairline px-5 py-3 text-[12.5px] text-body-muted">Category comparison based on typical capabilities. A dash means it varies by vendor or needs add ons.</p>
    </div>
  );
}

export function CheckList({ items, className = "", dark = false }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it) => <li key={it} className={`flex items-start gap-3 text-[15.5px] ${dark ? "text-white/90" : "text-ink"}`}><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-green"><Icon name="check" size={12} strokeWidth={3} /></span>{it}</li>)}
    </ul>
  );
}
