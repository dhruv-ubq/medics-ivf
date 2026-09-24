import { Reveal } from "@/components/Motion";
import { CertStrip } from "@/components/Interactive";
import { PageHero, SectionHead, StatBand, CtaBand } from "@/components/Blocks";
import { timeline } from "@/lib/content";
export const metadata = { title: "About", description: "medics IVF is built by UBQ Technologies: 20 years of cloud healthtech, 350+ hospitals and clinics, ISO 27001 certified." };
const beliefs = [["Fertility deserves its own platform.", "IVF is not general medicine and should not run on general medicine's tools."], ["Compliance should be built in.", "The rules protect patients. Following them should be easy."], ["Care continues between visits.", "Couples need their clinic in their pocket, not only at the desk."], ["Technology should feel human.", "Simple, even when it is advanced. That has been UBQ's promise since 2006."]];
export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="We build the platform that helps families begin." body="Behind every record on medics IVF is a couple hoping for a child. That is why we care so much about getting it right." primary={{ label: "Work with us", href: "/demo" }} />
      <section className="bg-white section-pad"><div className="container-x"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><SectionHead eyebrow="Our story" title="Twenty years of medics." />
        <Reveal className="space-y-5 text-[17px] text-body"><p>UBQ Technologies started in 2006 with nine people from Siemens and a belief that healthcare software belonged on the cloud, and that it should feel human. By 2008, medics was live as a multi tenant cloud platform.</p><p>Since then medics has run 55 government hospitals in Haryana, Manipal's teaching hospitals and hospitals across the GCC. Fertility clinics needed something built only for them, so we built medics IVF. Today it runs India's largest fertility network, and with medics care it reaches every patient too.</p></Reveal></div>
        <div className="mt-14"><StatBand /></div></div></section>
      <section className="bg-cream section-pad"><div className="container-x"><SectionHead eyebrow="Our journey" title="A complete platform, use case by use case." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{timeline.map(([y, b], k) => <Reveal key={y} delay={(k % 5) * 60}><div className="h-full rounded-2xl bg-white p-5 shadow-card"><p className="font-display text-[22px] font-bold text-orange">{y}</p><p className="mt-2 text-[14.5px] text-ink">{b}</p></div></Reveal>)}</div></div></section>
      <section className="bg-white section-pad"><div className="container-x"><SectionHead center eyebrow="Recognition" title="Certified and recognised." className="mb-10" /><Reveal><CertStrip layout="cards" /></Reveal></div></section>
      <section className="bg-cream section-pad"><div className="container-x"><SectionHead eyebrow="What we believe" title="Four beliefs behind every release." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">{beliefs.map(([t, b], k) => <Reveal key={t} delay={(k % 2) * 80}><div className="h-full rounded-3xl bg-white p-7"><p className="heading-md">{t}</p><p className="mt-2 text-[15.5px] text-body">{b}</p></div></Reveal>)}</div></div></section>
      <CtaBand title="Looking for a partner for the long run?" />
    </>
  );
}
