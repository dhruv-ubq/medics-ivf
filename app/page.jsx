import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { HeroWorld, StatStrip, PillarsBento, NumbersBand, CareOrbit, NetworkGrowth, AiEmrBand, ModuleMap, CareJourney } from "@/components/HomeWorld";
import { ProblemCards, PlatformTour, ClinicPicker, TestimonialShowcase, LogoMarquee, IntegrationWall, CertStrip } from "@/components/Interactive";

function Head({ eyebrow, title, sub, center = false, dark = false, className = "" }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className="eyebrow text-orange">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-[30px] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[38px] lg:text-[44px] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-[16.5px] leading-relaxed sm:text-[18px] ${center ? "mx-auto" : ""} max-w-2xl ${dark ? "text-white/70" : "text-body"}`}>{sub}</p>}
    </Reveal>
  );
}

const care = [
  ["calendar", "Booking and QR check in", "Patients book clinic or video visits and skip the queue."],
  ["records", "Reports and ART summary", "Lab reports, prescriptions and summaries in one place."],
  ["billing", "Bills and payments", "Every bill visible, dues paid in the app."],
  ["brush", "Your brand", "The app carries your clinic's name, logo and colours."],
];

export default function Home() {
  return (
    <>
      <HeroWorld />

      <section className="bg-white pb-16 pt-4">
        <div className="container-x space-y-12">
          <StatStrip />
          <LogoMarquee label="Trusted by India's leading fertility chains, clinics and hospitals" />
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Head center eyebrow="Why medics IVF" title="Trusted, scalable and compliant." sub="Everything a fertility business needs before it can grow with confidence." className="mb-12" />
          <PillarsBento />
        </div>
      </section>

      <section className="bg-lavender py-20 md:py-28">
        <div className="container-x">
          <Head eyebrow="Concerns we solve" title="The five concerns IVF centres raise most." sub="Each one is handled inside the software, so your team does not have to track it by hand." className="mb-12" />
          <ProblemCards lean />
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Head eyebrow="Built for growth" title="India's leading IVF chains grew on medics IVF." sub="From a single centre to a national network, on one record, one login and one set of rules." className="mb-10" />
          <NetworkGrowth />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Head center eyebrow="The platform" title="One platform for every team in your clinic." sub="Clinical care, embryology, billing, pharmacy, patients and reports, connected on one record." className="mb-10" />
          <PlatformTour />
        </div>
      </section>

      <section className="overflow-hidden bg-cream py-20 md:py-28">
        <div className="container-x"><AiEmrBand /></div>
      </section>

      <section className="relative overflow-hidden bg-[#070f33] py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0"><div className="hl-blob hl-a" style={{ opacity: 0.18 }} /><div className="hl-blob hl-b" style={{ opacity: 0.22 }} /><div className="hero-grid absolute inset-0" /></div>
        <div className="container-x relative">
          <Head dark center eyebrow="Everything in one place" title="Every module an IVF centre runs on." sub="Patient management, clinical, financial and administrative, all connected to one patient record." className="mb-12 lg:mb-16" />
          <ModuleMap />
        </div>
      </section>

      <section className="overflow-hidden bg-white py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Head eyebrow="medics care patient app" title="Your clinic in every patient's pocket." sub="Patients stay informed and on schedule. Your team spends less time on calls." />
            <Reveal className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {care.map(([i, t, d]) => (
                <div key={t} className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-peach text-orange"><Icon name={i} size={19} /></span>
                  <div><p className="font-display text-[15.5px] font-semibold text-ink">{t}</p><p className="mt-1 text-[14.5px] leading-snug text-body-muted">{d}</p></div>
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-9"><Link href="/patient-engagement" className="link-arrow text-[15.5px] text-orange">Explore medics care <Icon name="arrow" size={16} /></Link></Reveal>
          </div>
          <Reveal delay={120}><CareOrbit /></Reveal>
        </div>
        <div className="container-x mt-16 md:mt-20">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow text-orange">End to end patient journey</p><h3 className="mt-2 max-w-2xl font-display text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-[32px]">One app with the couple at every step of IVF.</h3></div>
            <p className="max-w-sm text-[15px] text-body-muted">From the first enquiry to family care after treatment, every touchpoint runs on medics care and stays synced with medics IVF.</p>
          </Reveal>
          <CareJourney />
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Head center eyebrow="For every stage" title="From a single clinic to a national network." className="mb-10" />
          <ClinicPicker />
        </div>
      </section>

      <section className="bg-ink py-20 text-white md:py-24">
        <div className="container-x">
          <Head dark eyebrow="Proven at scale" title="20 years. 500+ clinics. One platform." className="mb-12" />
          <NumbersBand />
          <Reveal className="mt-14"><CertStrip /></Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Head center eyebrow="Customer stories" title="What fertility leaders say." className="mb-10" />
          <TestimonialShowcase />
        </div>
      </section>

      <section className="border-t border-hairline bg-white py-16">
        <div className="container-x"><p className="mb-8 text-center text-[15px] font-medium text-body-muted">Works with the tools you already use</p><IntegrationWall /></div>
      </section>

      <section className="bg-white px-4 pb-20 sm:px-6">
        <Reveal className="relative mx-auto max-w-container overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-12 md:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple/30 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[44px]">See medics IVF running for a clinic like yours.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[16.5px] text-white/70">A 30 minute walkthrough with our team, built around your workflows.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3.5 text-[15.5px]">Book a demo <Icon name="arrow" size={17} /></Link>
              <Link href="/customers" className="btn-ghost-invert px-8 py-3.5 text-[15.5px]">Read customer stories</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
