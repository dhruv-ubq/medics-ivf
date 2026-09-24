import Link from "next/link";
import { BrandLogo } from "./Brandkit";
import { CertStrip } from "./Interactive";
import { site, roles, clinicLevels } from "@/lib/content";

const cols = [
  { t: "Platform", l: [["Overview", "/platform"], ["Clinical and lab", "/platform/clinical-lab"], ["Business operations", "/platform/operations"], ["Network and insights", "/platform/network-insights"], ["Trust and security", "/trust"]] },
  { t: "medics care", l: [["Patient app", "/patient-engagement"], ["Follow up journeys", "/patient-engagement#journeys"], ["White labelled app", "/patient-engagement#brand"], ["Why not a standalone app", "/patient-engagement#standalone"]] },
  { t: "Solutions", l: [...clinicLevels.map((c) => [c.label, `/solutions/clinics/${c.slug}`]), ...roles.slice(0, 3).map((r) => [r.title, `/solutions/roles/${r.slug}`])] },
  { t: "Company", l: [["About", "/about"], ["Why medics IVF", "/why-medics-ivf"], ["Customers", "/customers"], ["Pricing", "/pricing"], ["FAQ", "/faq"], ["Content studio", "/admin"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-cream">
      <div className="container-x py-14">
        <div className="rounded-3xl border border-hairline bg-white px-5 py-6"><CertStrip /></div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_2.4fr]">
          <div>
            <Link href="/"><BrandLogo /></Link>
            <p className="mt-4 max-w-xs text-[14.5px] text-body-muted">The complete fertility platform for clinics, chains and hospital IVF units. Part of medics by UBQ Technologies.</p>
            <div className="mt-6 space-y-1 text-[14px]">
              <a href={`mailto:${site.email}`} className="block font-semibold text-ink hover:text-orange">{site.email}</a>
              <a href={`tel:${site.phoneHref}`} className="block font-semibold text-ink hover:text-orange">{site.phone}</a>
              <p className="text-body-muted">{site.hours}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.t}><p className="font-display text-[13px] font-semibold text-ink">{c.t}</p>
                <ul className="mt-4 space-y-2.5">{c.l.map(([label, href]) => <li key={label}><Link href={href} className="text-[14px] text-body-muted transition-colors hover:text-ink">{label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[13px] text-body-muted md:flex-row md:items-center md:justify-between">
          <p>{site.address}</p><p>Copyright medics IVF, UBQ Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
