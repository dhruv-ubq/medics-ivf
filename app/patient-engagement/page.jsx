import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { PhoneFrame, AppHome, AppRecords, WhatsAppThread, AppCheckin, AppBill, FloatChip } from "@/components/Mockups";
import { AppShowcase, FollowupJourney, WhiteLabelDemo, TestimonialShowcase } from "@/components/Interactive";
import { SectionHead, CtaBand } from "@/components/Blocks";
import { careJourney, careFeatures, standaloneFails, careDifferent } from "@/lib/content";

export const metadata = { title: "medics care: patient app and engagement", description: "Your clinic's own branded patient app and portal, synced with medics IVF, plus automated follow ups on WhatsApp, SMS, email and push." };

const challenges = [["Patients expect convenience and transparency", "patients"], ["Missed follow ups and patient leakage", "route"], ["Little digital engagement between visits", "message"], ["Heavy admin load on the front desk", "desk"]];
const channels = [["WhatsApp", "#25d366", "message"], ["App push", "#7b3fe4", "bell"], ["Email", "#0b6bcb", "records"], ["SMS", "#c25400", "phone"]];

export default function Engagement() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="container-x relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0">
            <p className="eyebrow animate-fade-up text-orange">medics care · Patient engagement</p>
            <h1 className="display-hero mt-5 animate-fade-up">Your clinic's digital front door. <span className="grad-text">Open all day.</span></h1>
            <p className="body-lg mt-6 max-w-xl animate-fade-up text-body">A branded app and patient portal that books, checks in, shares reports, collects payments and follows up automatically. All synced with medics IVF, so everything patients see is real.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/demo" className="btn-primary">See it in a demo</Link><a href="#journeys" className="btn-outline">How follow ups work</a></div>
            <div className="mt-8 flex flex-wrap gap-2">{channels.map(([n, c, i]) => <span key={n} className="flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[13px] font-semibold text-white" style={{ background: c }}><Icon name={i} size={14} />{n}</span>)}</div>
          </div>
          <div className="relative flex min-w-0 justify-center gap-4">
            <PhoneFrame scale={0.86} className="mt-10 hidden sm:block"><WhatsAppThread /></PhoneFrame>
            <PhoneFrame scale={0.95}><AppHome /></PhoneFrame>
            <FloatChip icon="check" tone="green" title="Follow up booked" sub="From a WhatsApp reminder" className="bottom-16 left-0 hidden md:flex" />
          </div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead center eyebrow="The challenge" title="Most couples are lost between visits, not in them." body="Patients now expect the convenience of any good app. When they do not get it, follow ups are missed, patients drift, and the front desk carries the load." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{challenges.map(([t, i], k) => <Reveal key={t} delay={k * 80}><div className="card h-full p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-peach text-orange"><Icon name={i} size={21} /></span><p className="mt-5 font-display text-[16.5px] font-semibold text-ink">{t}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="container-x">
          <SectionHead center eyebrow="The app" title="Everything a patient needs, under your brand." className="mb-12" />
          <Reveal><AppShowcase /></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead eyebrow="The patient journey" title="From first sign up to long after treatment." />
          <div className="relative mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-orange via-purple to-blue lg:block" />
            {careJourney.map((s, k) => <Reveal key={s.t} delay={k * 80} className="relative"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-ink text-white shadow-card"><Icon name={s.i} size={19} /></span><p className="mt-4 font-display text-[16px] font-semibold text-ink">{s.t}</p><p className="mt-1 text-[14px] text-body">{s.b}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section id="journeys" className="scroll-mt-24 bg-lavender section-pad">
        <div className="container-x">
          <SectionHead eyebrow="Automated follow ups" title="Follow ups that happen on their own." body="After every consult, medics care reaches out on the right channel at the right time. If the couple books, they are prepared. If they do not, they are gently brought back." />
          <Reveal className="mt-10"><FollowupJourney /></Reveal>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <SectionHead eyebrow="Contactless visits" title="No queues at the desk. No queues at the counter." />
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto_auto]">
            <div className="grid gap-4">{[["phone", "QR self check in", "Patients scan a QR on arrival. Pre booked and walk in patients merge into one smooth flow."], ["billing", "Digital payments", "Bills arrive on the phone. Patients pay in the app or by QR, with no cash counter queue."], ["records", "Everything synced", "Every visit, bill and receipt appears in the app the moment it is created in medics IVF."]].map(([i, t, b], k) => <Reveal key={t} delay={k * 80}><div className="flex gap-4 rounded-2xl bg-cream p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-orange"><Icon name={i} size={20} /></span><div><p className="font-display text-[16.5px] font-semibold text-ink">{t}</p><p className="mt-1 text-[14.5px] text-body">{b}</p></div></div></Reveal>)}</div>
            <Reveal className="flex justify-center"><PhoneFrame scale={0.85}><AppCheckin /></PhoneFrame></Reveal>
            <Reveal delay={120} className="hidden justify-center xl:flex"><PhoneFrame scale={0.85}><AppBill /></PhoneFrame></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="container-x">
          <SectionHead eyebrow="Features" title="What your patients can do." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{careFeatures.map((f, k) => <Reveal key={f.t} delay={(k % 4) * 70}><div className="card card-hover h-full p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky text-blue"><Icon name={f.i} size={20} /></span><p className="mt-5 font-display text-[16px] font-semibold text-ink">{f.t}</p><p className="mt-1.5 text-[14.5px] text-body">{f.b}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section id="brand" className="scroll-mt-24 bg-white section-pad"><div className="container-x"><Reveal><WhiteLabelDemo /></Reveal></div></section>

      <section id="standalone" className="scroll-mt-24 relative overflow-hidden bg-ink section-pad text-white">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-orange/15 blur-3xl" />
        <div className="container-x relative">
          <SectionHead dark eyebrow="Why not build your own app?" title="Standalone apps break trust. medics care builds it." body="When a hospital app shows bookings that do not exist, reports that will not open or payments that do not reflect, patients blame the clinic, not the developer." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-white/[0.05] p-6 md:p-8"><p className="eyebrow text-white/60">A standalone app</p><ul className="mt-5 space-y-4">{standaloneFails.map((s) => <li key={s.t} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-white/70"><Icon name="x" size={12} strokeWidth={2.6} /></span><div><p className="font-display font-semibold text-white">{s.t}</p><p className="text-[14.5px] text-white/65">{s.b}</p></div></li>)}</ul></Reveal>
            <Reveal delay={100} className="rounded-3xl bg-white p-6 text-ink md:p-8"><p className="eyebrow text-orange">medics care</p><ul className="mt-5 space-y-4">{careDifferent.map((s) => <li key={s.t} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green text-white"><Icon name="check" size={13} strokeWidth={2.8} /></span><div><p className="font-display font-semibold text-ink">{s.t}</p><p className="text-[14.5px] text-body">{s.b}</p></div></li>)}</ul></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream section-pad"><div className="container-x"><SectionHead eyebrow="What clinics get" title="Fewer lost couples. A calmer front desk. A stronger brand." className="mb-10" /><div className="grid gap-4 md:grid-cols-4">{[["Follow ups booked", "Automated reminders and re engagement until the next visit is booked."], ["Less desk work", "Bookings, check in, reports and payments move to the app."], ["Faster collections", "Bills and dues on the phone, payable in a tap."], ["Your brand, everywhere", "A white labelled app and messages in your clinic's name."]].map(([t, b], k) => <Reveal key={t} delay={k * 80}><div className="h-full rounded-3xl bg-white p-6 shadow-card"><p className="font-display text-[17px] font-semibold text-ink">{t}</p><p className="mt-2 text-[14.5px] text-body">{b}</p></div></Reveal>)}</div></div></section>
      <CtaBand title="Give every patient your clinic in their pocket." body="See medics care with medics IVF, on your own workflows and in your own brand." />
    </>
  );
}
