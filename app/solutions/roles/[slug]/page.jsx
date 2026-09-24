import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { PhoneFrame, WhatsAppThread, FloatChip } from "@/components/Mockups";
import { Screen, TestimonialShowcase } from "@/components/Interactive";
import { SectionHead, CtaBand } from "@/components/Blocks";
import { roles } from "@/lib/content";
export function generateStaticParams() { return roles.map((r) => ({ slug: r.slug })); }
export function generateMetadata({ params }) { const r = roles.find((x) => x.slug === params.slug); return r ? { title: `medics IVF for ${r.title}`, description: `${r.short} ${r.promise}` } : {}; }
const careAngle = { owner: "Automated follow ups bring back couples who would otherwise drift, and your clinic's brand is in every patient's pocket.", specialist: "Medical summaries, reports and prescriptions reach the patient app, so fewer calls ask what a result means.", embryologist: "Patients see their ART summary report in the app, and reminders keep storage renewals on time.", counsellor: "Reminders, checklists and educational messages go out on their own, on WhatsApp and in the app.", "front-desk": "Patients book, check in with a QR code and pay in the app. The desk stays calm.", "centre-manager": "Bookings, check in and payments move to the app, freeing your team for real work.", finance: "Bills and dues reach the patient's phone and can be paid in a tap, with receipts synced back.", it: "A white labelled app synced by design, with encrypted sign in and no separate app to build or maintain." };
export default function RolePage({ params }) {
  const r = roles.find((x) => x.slug === params.slug); if (!r) notFound();
  const others = roles.filter((x) => x.slug !== r.slug).slice(0, 4);
  return (
    <>
      <section className="bg-cream"><div className="container-x grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0"><Link href="/solutions" className="link-arrow text-[13.5px] text-body-muted"><Icon name="arrow" size={14} className="rotate-180" /> All solutions</Link>
          <p className="eyebrow mt-6 flex items-center gap-2 text-orange"><Icon name={r.icon} size={16} />For {r.title.toLowerCase()}</p>
          <h1 className="display-hero mt-4">{r.short}</h1><p className="body-lg mt-5 max-w-xl text-body">{r.promise}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/demo" className="btn-primary">Book a demo for your team</Link><Link href="/platform" className="btn-outline">See the platform</Link></div></div>
        <div className="relative min-w-0">{r.screen === "whatsapp" ? <div className="flex justify-center"><PhoneFrame><WhatsAppThread /></PhoneFrame></div> : <Screen k={r.screen} />}<FloatChip icon="spark" tone="orange" title={r.metric[0]} sub={r.metric[1]} className="-bottom-5 left-2 hidden md:flex" /></div>
      </div></section>
      <section className="bg-white section-pad"><div className="container-x grid gap-5 md:grid-cols-2">
        <Reveal className="rounded-3xl bg-cream p-7 md:p-9"><p className="eyebrow text-body-muted">What gets in the way today</p><ul className="mt-5 space-y-4">{r.pains.map((p) => <li key={p} className="flex gap-3 text-[16px] text-body"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-body-muted"><Icon name="minus" size={14} /></span>{p}</li>)}</ul></Reveal>
        <Reveal delay={100} className="rounded-3xl bg-ink p-7 text-white md:p-9"><p className="eyebrow text-orange">With medics IVF</p><ul className="mt-5 space-y-4">{r.gains.map((p) => <li key={p} className="flex gap-3 text-[16px]"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green text-white"><Icon name="check" size={14} strokeWidth={2.8} /></span>{p}</li>)}</ul></Reveal>
      </div></section>
      <section className="bg-lavender section-pad"><div className="container-x grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal><p className="eyebrow text-purple">How medics care helps you</p><h2 className="display-lg mt-3">{careAngle[r.slug]}</h2><Link href="/patient-engagement" className="link-arrow mt-6 text-[15px] text-purple">Explore medics care <Icon name="arrow" size={16} /></Link></Reveal>
        <Reveal delay={120} className="flex justify-center"><PhoneFrame scale={0.9}><WhatsAppThread /></PhoneFrame></Reveal>
      </div></section>
      <section className="bg-cream section-pad"><div className="container-x"><TestimonialShowcase /></div></section>
      <section className="bg-white section-pad"><div className="container-x"><SectionHead eyebrow="Also on your team" title="See what changes for your colleagues." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{others.map((o) => <Link key={o.slug} href={`/solutions/roles/${o.slug}`} className="card card-hover p-6"><Icon name={o.icon} size={22} className="text-orange" /><p className="mt-4 font-display text-[16px] font-semibold text-ink">{o.title}</p><p className="mt-1 text-[14px] text-body-muted">{o.short}</p></Link>)}</div></div></section>
      <CtaBand />
    </>
  );
}
