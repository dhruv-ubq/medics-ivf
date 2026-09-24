import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import Ecosystem from "@/components/Ecosystem";
import { BrowserFrame, PhoneFrame, WorklistScreen, AppHome, FloatChip } from "@/components/Mockups";
import { PainExplorer, PlatformTour, AppShowcase, RoleExplorer, ClinicPicker, TestimonialShowcase, LogoMarquee, IntegrationWall, CertStrip, Spotlight, Faq } from "@/components/Interactive";
import { SectionHead, StatBand, GeoLine, Steps, CtaBand } from "@/components/Blocks";
import { faqs, labStats, compliance } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.08fr] lg:pb-24">
          <div className="min-w-0">
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-pill border border-hairline bg-white px-3 py-1.5 text-[13px] font-medium text-ink"><span className="chip bg-orange px-2 py-0.5 text-white">v9</span>The complete fertility platform</p>
            <h1 className="display-hero mt-6 animate-fade-up" style={{ animationDelay: "60ms" }}>Run your entire fertility business on <span className="grad-text">one platform.</span></h1>
            <p className="body-lg mt-6 max-w-xl animate-fade-up text-body" style={{ animationDelay: "120ms" }}>Clinical care, the lab, billing, pharmacy, compliance and your patients' own app, connected across every centre. So no couple, no rupee and no record falls through the gaps.</p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
              <Link href="/demo" className="btn-primary">Book a demo</Link>
              <Link href="/platform" className="btn-outline">Explore the platform</Link>
            </div>
            <div className="mt-9 grid max-w-lg animate-fade-up grid-cols-3 gap-3 border-t border-hairline pt-6" style={{ animationDelay: "240ms" }}>
              {[["350+", "hospitals and clinics"], ["130+", "centres in one network"], ["ISO 27001", "and ABDM compliant"]].map(([a, b]) => <div key={b}><p className="font-display text-[20px] font-bold text-ink md:text-[22px]">{a}</p><p className="text-[12.5px] text-body-muted md:text-[13px]">{b}</p></div>)}
            </div>
          </div>
          <div className="relative min-w-0 animate-fade-up pb-8 sm:pr-24" style={{ animationDelay: "150ms" }}>
            <BrowserFrame><WorklistScreen /></BrowserFrame>
            <div className="absolute -bottom-2 right-0 hidden sm:block"><PhoneFrame scale={0.66}><AppHome /></PhoneFrame></div>
            <FloatChip icon="message" tone="green" title="Follow up booked" sub="Reminder sent on WhatsApp" className="-left-12 top-[30%] hidden xl:flex" />
            <FloatChip icon="billing" tone="orange" title="Package bill ₹85,500" sub="Discount within limit" className="-left-14 bottom-10 hidden xl:flex" delay={900} />
            <FloatChip icon="shield" tone="purple" title="ART checks passed" sub="Donor and age verified" className="-top-5 right-24 hidden lg:flex" delay={1600} />
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-white py-12"><div className="container-x"><LogoMarquee /></div></section>

      <section className="bg-lavender section-pad">
        <div className="container-x">
          <SectionHead eyebrow="The problem" title="Five problems every fertility business knows. One platform that fixes them." body="Most clinics solve each one with a different tool, or not at all. medics IVF solves them together, because they are connected." />
          <Reveal className="mt-12"><PainExplorer /></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead center eyebrow="The platform" title="Not IVF software. The platform an IVF business runs on." body="Four connected layers on one record and one login, with compliance and security built in underneath." />
          <Reveal className="mt-12"><Ecosystem /></Reveal>
        </div>
      </section>

      <section className="bg-white pb-20 md:pb-28">
        <div className="container-x">
          <SectionHead center eyebrow="Take the tour" title="See a day at a clinic running on medics IVF." className="mb-10" />
          <Reveal><PlatformTour /></Reveal>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="medics care · patient engagement" title="Your clinic, in every patient's pocket." body="A branded app and patient portal, synced with medics IVF, plus automated follow ups on WhatsApp, SMS, email and push. Patients stay informed. Your team stops chasing." />
            <Reveal><Link href="/patient-engagement" className="btn-dark">Explore medics care</Link></Reveal>
          </div>
          <Reveal className="mt-12"><AppShowcase /></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead eyebrow="For every stage of growth" title="Built for where you are today, and where you are going." />
          <Reveal className="mt-10"><ClinicPicker /></Reveal>
        </div>
      </section>

      <section className="bg-lavender section-pad">
        <div className="container-x">
          <SectionHead eyebrow="For every person on your team" title="A clear win for everyone who touches a cycle." body="Pick a role to see what changes, and the screen they would use." />
          <Reveal className="mt-10"><RoleExplorer /></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6"><SectionHead eyebrow="Proven at scale" title="Twenty years of medics. India's fertility leaders on board." /><Reveal><GeoLine /></Reveal></div>
          <div className="mt-12"><StatBand /></div>
          <Reveal className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">{labStats.map(([a, b]) => <div key={b} className="rounded-2xl bg-cream px-5 py-4"><p className="font-display text-[22px] font-bold text-ink">{a}</p><p className="text-[13.5px] text-body-muted">{b}</p></div>)}</Reveal>
          <div className="mt-14"><Reveal><Spotlight /></Reveal></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-pad text-white">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-purple/25 blur-3xl" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHead dark eyebrow="Trust" title="Certified secure. Compliant by design." body="ISO 27001 certified and ABDM compliant, with ART Act rules enforced inside the workflow, not on paper." />
            <Reveal className="grid gap-3 sm:grid-cols-2">{compliance.map(([t, b]) => <div key={t} className="flex gap-3 rounded-2xl bg-white/[0.06] p-4"><Icon name="shield" size={19} className="mt-0.5 shrink-0 text-orange" /><div><p className="font-display text-[15px] font-semibold text-white">{t}</p><p className="text-[13.5px] text-white/65">{b}</p></div></div>)}</Reveal>
          </div>
          <Reveal className="mt-12 rounded-3xl bg-white/[0.04] px-5 py-7"><CertStrip dark /></Reveal>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="container-x">
          <SectionHead eyebrow="Customer stories" title="In their own words." />
          <Reveal className="mt-10"><TestimonialShowcase /></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead center eyebrow="Open platform" title="Works with the tools you already run." body="Finance, lab and messaging integrations, plus medics grid to connect with labs, pharma, insurers and government portals." className="mb-10" />
          <Reveal><IntegrationWall /></Reveal>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="container-x">
          <SectionHead center eyebrow="Getting started" title="Live across your centres in three steps." className="mb-10" />
          <Steps />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3"><Link href="/demo" className="btn-primary">Get started</Link><Link href="/why-medics-ivf" className="btn-outline">Compare your options</Link></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="FAQ" title="Questions, answered." body="Anything else? Our team replies within a working day." />
          <Reveal><Faq items={faqs.slice(0, 5)} /></Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
