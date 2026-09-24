import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { PageHero, SectionHead, CtaBand } from "@/components/Blocks";
import { Faq } from "@/components/Interactive";
import { plans, faqs } from "@/lib/content";
export const metadata = { title: "Pricing", description: "medics IVF plans by clinic level: Clinic, Chain and Enterprise. medics care included." };
export default function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Plans that fit your clinic level." body="Priced by clinic level and number of centres. Every plan includes medics care, onboarding and India based support." primary={{ label: "Get a quote", href: "/demo" }} />
      <section className="bg-white section-pad"><div className="container-x grid gap-5 lg:grid-cols-3">
        {plans.map((p, k) => <Reveal key={p.name} delay={k * 90}><div className={`relative flex h-full flex-col rounded-3xl p-7 md:p-8 ${p.featured ? "bg-ink text-white shadow-float" : "border border-hairline bg-white"}`}>
          {p.featured && <span className="chip absolute right-6 top-6 bg-orange text-white">Recommended</span>}
          <p className={`eyebrow ${p.featured ? "text-orange" : "text-purple"}`}>{p.for}</p><h2 className={`mt-3 font-display text-[30px] font-bold ${p.featured ? "text-white" : "text-ink"}`}>{p.name}</h2><p className={`mt-2 text-[15px] ${p.featured ? "text-white/70" : "text-body"}`}>{p.body}</p>
          <ul className="mt-6 flex-1 space-y-3">{p.features.map((f) => <li key={f} className="flex gap-2.5 text-[15px]"><Icon name="check" size={18} strokeWidth={2.6} className="mt-0.5 shrink-0 text-green" /><span className={p.featured ? "text-white/90" : "text-ink"}>{f}</span></li>)}</ul>
          <Link href="/demo" className={`mt-8 w-full ${p.featured ? "btn-primary" : "btn-outline"}`}>Get a quote</Link></div></Reveal>)}
      </div></section>
      <section className="bg-cream section-pad"><div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><SectionHead eyebrow="Pricing questions" title="Clear, fair, no surprises." body="A cloud subscription, priced by clinic level and centres. We share a written quote after a short demo." /><Reveal><Faq items={faqs.filter((f) => /price|switch|secure|integrate|care/i.test(f.q))} /></Reveal></div></section>
      <CtaBand />
    </>
  );
}
