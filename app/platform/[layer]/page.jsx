import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { HubSpoke } from "@/components/Mockups";
import { Screen, TestimonialShowcase } from "@/components/Interactive";
import { SectionHead, CheckList, CtaBand } from "@/components/Blocks";
import { layers, roles } from "@/lib/content";

const LAYERS = layers.filter((l) => l.groups.length);
export function generateStaticParams() { return LAYERS.map((l) => ({ layer: l.slug })); }
export function generateMetadata({ params }) { const l = LAYERS.find((x) => x.slug === params.layer); return l ? { title: l.name, description: l.lead } : {}; }

const cfg = {
  "clinical-lab": { hero: "emr", gallery: [["vitrification", "Vitrification contracts with what is stored, where, validity dates and freezing fee renewals."], ["embryo", "Embryology: OPU, culture, ET, vitrification and thaw on the cycle."], ["trust", "ART checks run before OPU and transfer: consent, age, donor and embryo limits."], ["worklist", "Each team works from its own worklist on the same patient record."]], roles: ["specialist", "embryologist", "counsellor"] },
  operations: { hero: "billing", gallery: [["billing", "Package bill with selected inclusions, a category discount within limit, and the advance on record."], ["appointments", "Doctor availability and bookings, including those made in the patient app."], ["stock", "Indents with approval, purchase orders sent to suppliers, goods receipts with a checklist, and the stock ledger."]], roles: ["front-desk", "finance", "centre-manager"] },
  "network-insights": { hero: "dashboard", gallery: [["hub", "Hub and spoke: consult and stimulation at spokes, OPU and ET at the hub."], ["worklist", "Every centre's worklist, on the same record."]], roles: ["owner", "it", "finance"] },
};
const tint = { sky: "bg-sky text-blue", mint: "bg-mint text-green", lavender: "bg-lavender text-purple", peach: "bg-peach text-orange" };

export default function LayerPage({ params }) {
  const l = LAYERS.find((x) => x.slug === params.layer);
  if (!l) notFound();
  const c = cfg[l.slug];
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <Link href="/platform" className="link-arrow text-[13.5px] text-body-muted"><Icon name="arrow" size={14} className="rotate-180" /> Platform</Link>
            <p className="eyebrow mt-6 flex items-center gap-2 text-orange"><Icon name={l.icon} size={16} />{l.name}</p>
            <h1 className="display-hero mt-4">{l.title}</h1>
            <p className="body-lg mt-5 max-w-xl text-body">{l.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/demo" className="btn-primary">Book a demo</Link><Link href="/patient-engagement" className="btn-outline">See medics care</Link></div>
          </div>
          <div className="min-w-0"><Screen k={c.hero} /></div>
        </div>
      </section>
      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead eyebrow="What is included" title="Everything this part of the clinic needs." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {l.groups.map((g, k) => (
              <Reveal key={g.t} delay={k * 80}><div className="card h-full p-6"><span className={`grid h-11 w-11 place-items-center rounded-2xl ${tint[l.tint]}`}><Icon name={g.i} size={21} /></span><h3 className="heading-sm mt-5">{g.t}</h3><ul className="mt-3 space-y-2">{g.items.map((it) => <li key={it} className="flex gap-2 text-[14.5px] text-body"><Icon name="check" size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-green" />{it}</li>)}</ul></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      {l.highlight && (
        <section className="bg-white pb-20 md:pb-28">
          <div className="container-x">
            <SectionHead eyebrow="From the product" title={l.highlight.title} />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {l.highlight.steps.map(([t, b], k) => (
                <Reveal key={t} delay={(k % 3) * 80}><li className="flex h-full gap-4 rounded-3xl border border-hairline p-6"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-peach font-display text-[15px] font-bold text-orange">{k + 1}</span><div><p className="font-display text-[16.5px] font-semibold text-ink">{t}</p><p className="mt-1.5 text-[14.5px] text-body">{b}</p></div></li></Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}
      <section className="bg-cream section-pad">
        <div className="container-x">
          <SectionHead eyebrow="In practice" title="What your team sees every day." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {c.gallery.map(([k, cap], i) => (
              <Reveal key={k} delay={i * 100} className="min-w-0">
                {k === "hub" ? <div className="rounded-2xl border border-hairline bg-white p-4 shadow-float"><HubSpoke /></div> : <Screen k={k} />}
                <p className="mt-4 text-[15px] text-body">{cap}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div><SectionHead eyebrow="What changes" title="The outcomes clinics tell us about." /><CheckList className="mt-8" items={l.outcomes} /></div>
          <div className="grid gap-4">
            {c.roles.map((s) => { const r = roles.find((x) => x.slug === s); return <Link key={s} href={`/solutions/roles/${s}`} className="card card-hover flex items-center gap-4 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-peach text-orange"><Icon name={r.icon} size={20} /></span><div className="min-w-0"><p className="font-display text-[16px] font-semibold text-ink">{r.title}</p><p className="text-[14px] text-body-muted">{r.promise}</p></div><Icon name="arrow" size={16} className="ml-auto shrink-0 text-body-muted" /></Link>; })}
          </div>
        </div>
      </section>
      <section className="bg-cream section-pad"><div className="container-x"><TestimonialShowcase /></div></section>
      <CtaBand />
    </>
  );
}
