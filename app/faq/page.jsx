import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { PageHero } from "@/components/Blocks";
import { Faq } from "@/components/Interactive";
import { faqs, site } from "@/lib/content";
export const metadata = { title: "FAQ", description: "Answers about medics IVF, medics care, compliance, security, multi centre use, switching, integrations and pricing." };
export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Everything you need to know." body="Cannot find your question? Our team replies within a working day." primary={null} />
      <section className="bg-white section-pad"><div className="container-x grid gap-10 lg:grid-cols-[1.4fr_0.6fr]"><Reveal><Faq items={faqs} /></Reveal>
        <Reveal delay={100}><div className="sticky top-28 rounded-3xl bg-cream p-7"><p className="heading-md">Still have questions?</p><p className="mt-2 text-[15px] text-body">{site.hours}</p><Link href="/demo" className="btn-primary mt-6 w-full">Book a demo</Link><a href={`tel:${site.phoneHref}`} className="btn-outline mt-3 w-full">Call {site.phone}</a></div></Reveal></div></section>
    </>
  );
}
