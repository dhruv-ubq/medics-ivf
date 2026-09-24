import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import Ecosystem from "@/components/Ecosystem";
import { Screen, IntegrationWall, PlatformTour } from "@/components/Interactive";
import { PageHero, SectionHead, CheckList, CtaBand } from "@/components/Blocks";
import { layers } from "@/lib/content";

export const metadata = { title: "Platform", description: "One platform, four connected layers: clinical and lab, business operations, patient engagement, and network and insights. Compliance and security built in." };
const shot = { "clinical-lab": "emr", operations: "billing", "patient-engagement": "appointments", "network-insights": "dashboard" };

export default function Platform() {
  return (
    <>
      <PageHero eyebrow="The medics IVF platform" title="One record. One login. Every part of the fertility business." body="medics IVF v9 connects the consult room, the lab, the counter, the store room, the patient's phone and the owner's dashboard." secondary={{ label: "See medics care", href: "/patient-engagement" }} visual={<Screen k="dashboard" />} />
      <section className="bg-white section-pad"><div className="container-x"><SectionHead center eyebrow="Four layers" title="Connected, so nothing is entered twice." className="mb-12" /><Reveal><Ecosystem /></Reveal></div></section>
      {layers.map((l, k) => (
        <section key={l.slug} className={`${k % 2 ? "bg-white" : "bg-cream"} py-16 md:py-24`}>
          <div className={`container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${k % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal className="min-w-0">
              <p className="eyebrow text-orange">{l.name}</p>
              <h2 className="display-lg mt-3">{l.title}</h2>
              <p className="body-lg mt-4 text-body">{l.lead}</p>
              {l.outcomes.length > 0 && <CheckList className="mt-6" items={l.outcomes} />}
              <Link href={l.href} className="btn-dark mt-8">Explore {l.name.toLowerCase()}</Link>
            </Reveal>
            <Reveal delay={120} className="min-w-0"><Screen k={shot[l.slug]} /></Reveal>
          </div>
        </section>
      ))}
      <section id="integrations" className="scroll-mt-28 bg-cream section-pad"><div className="container-x"><SectionHead center eyebrow="Integrations" title="An open platform that fits your stack." className="mb-10" /><Reveal><IntegrationWall /></Reveal></div></section>
      <CtaBand />
    </>
  );
}
