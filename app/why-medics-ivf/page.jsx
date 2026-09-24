import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { PainExplorer } from "@/components/Interactive";
import { PageHero, SectionHead, CompareTable, CtaBand } from "@/components/Blocks";
export const metadata = { title: "Why medics IVF", description: "How medics IVF compares with IVF record software, generic hospital software and standalone patient apps." };
const reasons = [["network", "One platform, not ten tools", "Clinical, lab, billing, pharmacy, purchase, patient app and analytics on one record."], ["heart", "Patients who stay", "A branded app and automated follow ups turn one time consults into treatment."], ["billing", "Control of every rupee", "Package billing, discount and refund limits, purchase to pharmacy, GST ready."], ["shield", "Compliance by design", "ART Act checks enforced, ISO 27001 certified, ABDM compliant."], ["branches", "Built to scale", "One record across centres and hub and spoke. Proven at 130+ centres."], ["users", "A partner for 20 years", "India based rollout and support, from the team behind medics prime."]];
const switchers = [["From IVF record software", "Keep the clinical depth and add billing, pharmacy, purchase, a branded patient app and chain controls."], ["From generic hospital software", "Your team stops forcing IVF into general fields. Cycles, lab and ART checks finally fit."], ["From a standalone patient app", "Replace an app that never synced with one that is connected to every bill, report and booking."], ["From spreadsheets and paper", "Go live quickly with masters, templates, data migration and role by role training."]];
export default function Why() {
  return (
    <>
      <PageHero eyebrow="Why medics IVF" title="The only platform that runs the clinic, the business and the patient relationship." body="IVF record software stops at the clinic. Hospital systems were never built for IVF. Standalone apps never sync. medics IVF does all of it, on one record." secondary={{ label: "Customer stories", href: "/customers" }} />
      <section className="bg-white section-pad"><div className="container-x"><SectionHead eyebrow="Six reasons" title="What sets medics IVF apart." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{reasons.map(([i, t, b], k) => <Reveal key={t} delay={(k % 3) * 80}><div className="card h-full p-7"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-peach text-orange"><Icon name={i} size={21} /></span><h3 className="heading-md mt-5">{t}</h3><p className="mt-2 text-[15px] text-body">{b}</p></div></Reveal>)}</div></div></section>
      <section className="bg-cream section-pad"><div className="container-x"><SectionHead eyebrow="Compare your options" title="How medics IVF compares." body="The four kinds of systems fertility clinics in India choose between." /><Reveal className="mt-10"><CompareTable /></Reveal></div></section>
      <section className="bg-lavender section-pad"><div className="container-x"><SectionHead eyebrow="Problem by problem" title="What each gap costs, and how it closes." /><Reveal className="mt-10"><PainExplorer /></Reveal></div></section>
      <section className="bg-white section-pad"><div className="container-x"><SectionHead eyebrow="Switching" title="Whatever you use today, the move is simpler than you think." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">{switchers.map(([t, b], k) => <Reveal key={t} delay={(k % 2) * 80}><div className="flex h-full gap-4 rounded-3xl border border-hairline p-7"><Icon name="route" size={24} className="shrink-0 text-purple" /><div><p className="font-display text-[17px] font-semibold text-ink">{t}</p><p className="mt-2 text-[15px] text-body">{b}</p></div></div></Reveal>)}</div>
        <Reveal className="mx-auto mt-14 max-w-3xl text-center"><p className="font-display text-[22px] font-medium leading-snug text-ink md:text-[27px]">&ldquo;The last time we moved from one system to another it was stressful. With medics, we rolled out across all our centres in one shot.&rdquo;</p><p className="mt-4 text-[15px] text-body-muted"><b className="text-ink">Harinath Chakravarthy</b>, IVF Access</p></Reveal></div></section>
      <CtaBand title="Make the switch your team will thank you for." />
    </>
  );
}
