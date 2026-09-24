import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { HubSpoke, PhoneFrame, AppHome } from "@/components/Mockups";
import { Screen, LogoMarquee } from "@/components/Interactive";
import { SectionHead, CheckList, CtaBand } from "@/components/Blocks";
import { clinicLevels, plans, roles } from "@/lib/content";
export function generateStaticParams() { return clinicLevels.map((c) => ({ slug: c.slug })); }
export function generateMetadata({ params }) { const c = clinicLevels.find((x) => x.slug === params.slug); return c ? { title: `medics IVF for a ${c.label.toLowerCase()}`, description: `${c.headline} ${c.who}` } : {}; }
const rolesFor = { "single-clinic": ["owner", "specialist", "front-desk"], "growing-chain": ["owner", "centre-manager", "finance"], "enterprise-network": ["owner", "it", "finance"], "hospital-ivf": ["specialist", "embryologist", "it"] };
const careFor = { "single-clinic": "A branded app makes a single clinic feel as premium as a national chain, and automated follow ups replace the calls no one has time to make.", "growing-chain": "One app across every centre. Referrals between centres feel seamless to the patient, and follow up journeys run the same way everywhere.", "enterprise-network": "A consistent, branded patient experience across the network, with engagement journeys you can tune by centre and by segment.", "hospital-ivf": "Fertility patients get a dedicated journey in the same app the hospital uses, with one identity and one set of records." };
export default function ClinicPage({ params }) {
  const c = clinicLevels.find((x) => x.slug === params.slug); if (!c) notFound();
  const plan = plans.find((p) => p.name === c.plan); const chain = c.slug === "growing-chain" || c.slug === "enterprise-network";
  return (
    <>
      <section className="bg-cream"><div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0"><Link href="/solutions" className="link-arrow text-[13.5px] text-body-muted"><Icon name="arrow" size={14} className="rotate-180" /> All solutions</Link>
          <p className="eyebrow mt-6 flex items-center gap-2 text-orange"><Icon name={c.icon} size={16} />{c.label} · {c.size}</p>
          <h1 className="display-hero mt-4">{c.headline}</h1><p className="body-lg mt-5 max-w-xl text-body">{c.who}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/demo" className="btn-primary">Book a demo</Link><Link href="/pricing" className="btn-outline">The {c.plan} plan</Link></div></div>
        <div className="min-w-0">{chain ? <div className="rounded-3xl border border-hairline bg-white p-4 shadow-float"><HubSpoke /></div> : <Screen k={c.slug === "hospital-ivf" ? "emr" : "worklist"} />}</div>
      </div></section>
      <section className="bg-white section-pad"><div className="container-x grid gap-10 lg:grid-cols-2">
        <div><SectionHead eyebrow="What matters at your scale" title="Built around how you run today." /><CheckList className="mt-8" items={c.focus} /></div>
        <Reveal className="rounded-3xl bg-cream p-7"><p className="eyebrow text-body-muted">Recommended plan</p><p className="mt-2 font-display text-[28px] font-bold text-ink">{plan.name}</p><p className="mt-1 text-[15px] text-body">{plan.body}</p><ul className="mt-5 grid gap-2 sm:grid-cols-2">{plan.features.map((f) => <li key={f} className="rounded-2xl bg-white p-3.5 font-display text-[14px] font-semibold text-ink shadow-sm">{f}</li>)}</ul></Reveal>
      </div></section>
      <section className="bg-lavender section-pad"><div className="container-x grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal><p className="eyebrow text-purple">medics care at your scale</p><h2 className="display-lg mt-3">{careFor[c.slug]}</h2>
          <blockquote className="mt-10 border-l-2 border-orange pl-5"><p className="font-display text-[19px] font-medium text-ink">&ldquo;{c.proof[0]}&rdquo;</p><p className="mt-2 text-[14px] text-body-muted">{c.proof[1]}</p></blockquote></Reveal>
        <Reveal delay={120} className="flex justify-center"><PhoneFrame scale={0.9}><AppHome /></PhoneFrame></Reveal>
      </div></section>
      <section className="bg-white section-pad"><div className="container-x"><SectionHead eyebrow="Who benefits most" title="The roles that feel it first." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">{rolesFor[c.slug].map((s) => { const r = roles.find((x) => x.slug === s); return <Link key={s} href={`/solutions/roles/${s}`} className="card card-hover p-6"><Icon name={r.icon} size={22} className="text-orange" /><p className="mt-4 font-display text-[17px] font-semibold text-ink">{r.title}</p><p className="mt-1.5 text-[14.5px] text-body">{r.promise}</p></Link>; })}</div>
        <div className="mt-16"><LogoMarquee label="Clinics like yours already run on medics IVF" /></div></div></section>
      <CtaBand />
    </>
  );
}
