import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { Screen, CertStrip } from "@/components/Interactive";
import { PageHero, SectionHead, CtaBand } from "@/components/Blocks";
import { compliance } from "@/lib/content";

export const metadata = { title: "Trust and security", description: "medics IVF is ISO 27001 certified and ABDM compliant, with ART Act checks enforced inside the workflow." };
const security = [["lock", "ISO 27001 certified", "Information security managed to the global standard, audited and continuously improved."], ["shield", "Role based access", "Every user sees only what their role allows, with discount, refund and approval limits by role."], ["globe", "ABDM compliant", "Built to Ayushman Bharat Digital Mission standards for secure, interoperable health data."], ["records", "Complete audit trail", "Consents, signatures, bills and lab results are recorded with who did what and when."], ["network", "Cloud since 2008", "A multi tenant cloud platform with backups and business continuity, no servers at your centres."], ["users", "Patient data, protected", "Encrypted patient app sign in, with each family member's profile kept separate."]];

export default function Trust() {
  return (
    <>
      <PageHero eyebrow="Trust and security" title="Certified secure. Compliant by design." body="Fertility data is among the most sensitive data a clinic holds. medics IVF protects it to global standards and enforces Indian law inside every workflow." visual={<Screen k="trust" />} />
      <section className="bg-white section-pad"><div className="container-x"><SectionHead center eyebrow="Certifications and recognition" title="Independently certified. Recognised by the industry." className="mb-10" /><Reveal><CertStrip layout="cards" /></Reveal></div></section>
      <section className="bg-cream section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead eyebrow="ART Act" title="The rules, enforced by the system." body="medics IVF blocks what the law does not allow and records what it requires, so audits stop being a scramble." />
          <div className="grid gap-3 sm:grid-cols-2">{compliance.map(([t, b], k) => <Reveal key={t} delay={k * 60}><div className="flex h-full gap-3 rounded-2xl bg-white p-5 shadow-card"><Icon name="check" size={19} strokeWidth={2.6} className="mt-0.5 shrink-0 text-green" /><div><p className="font-display text-[15.5px] font-semibold text-ink">{t}</p><p className="text-[14px] text-body-muted">{b}</p></div></div></Reveal>)}</div>
        </div>
      </section>
      <section className="bg-white section-pad">
        <div className="container-x"><SectionHead eyebrow="Security" title="How we protect your clinic and your patients." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{security.map(([i, t, b], k) => <Reveal key={t} delay={(k % 3) * 80}><div className="card h-full p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-lavender text-purple"><Icon name={i} size={20} /></span><p className="mt-5 font-display text-[16.5px] font-semibold text-ink">{t}</p><p className="mt-1.5 text-[14.5px] text-body">{b}</p></div></Reveal>)}</div>
        </div>
      </section>
      <CtaBand title="Talk to us about security and compliance." body="We will walk your IT and compliance teams through certifications, access controls and data handling." />
    </>
  );
}
