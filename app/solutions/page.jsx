import Link from "next/link";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { RoleExplorer, ClinicPicker } from "@/components/Interactive";
import { PageHero, SectionHead, CtaBand } from "@/components/Blocks";
import { roles } from "@/lib/content";
export const metadata = { title: "Solutions", description: "medics IVF value for every clinic level and every role." };
export default function Solutions() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="The right value for every scale and every role." body="Pick your clinic level or your role to see what changes, and the screens your team would use." secondary={{ label: "Compare plans", href: "/pricing" }} />
      <section className="bg-white section-pad"><div className="container-x"><SectionHead eyebrow="By clinic level" title="From one centre to a national network." /><Reveal className="mt-10"><ClinicPicker /></Reveal></div></section>
      <section className="bg-lavender section-pad"><div className="container-x"><SectionHead eyebrow="By role" title="A clear win for everyone who touches a cycle." /><Reveal className="mt-10"><RoleExplorer /></Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{roles.map((r) => <Link key={r.slug} href={`/solutions/roles/${r.slug}`} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 transition hover:bg-white"><Icon name={r.icon} size={18} className="text-orange" /><span className="font-display text-[14px] font-semibold text-ink">{r.title}</span><Icon name="arrow" size={14} className="ml-auto text-body-muted" /></Link>)}</div>
      </div></section>
      <CtaBand />
    </>
  );
}
