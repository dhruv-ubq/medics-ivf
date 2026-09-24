import Link from "next/link";
import Icon from "./Icon";
import { layers } from "@/lib/content";

const tint = { sky: "bg-sky text-blue", mint: "bg-mint text-green", peach: "bg-peach text-orange", lavender: "bg-lavender text-purple" };
const blurb = { "clinical-lab": ["EMR and cycles", "Andrology", "Embryology", "Lab and radiology"], operations: ["Appointments", "Billing and packages", "Pharmacy", "Purchase and stock"], "patient-engagement": ["Branded app", "QR check in", "Reports and bills", "Automated follow ups"], "network-insights": ["Multi centre", "Hub and spoke", "100+ reports", "Integrations"] };

export default function Ecosystem() {
  return (
    <div className="relative">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="grid gap-4">{layers.slice(0, 2).map((l) => <LayerCard key={l.slug} l={l} />)}</div>
        <div className="order-first mx-auto flex flex-col items-center md:col-span-2 lg:order-none lg:col-span-1">
          <div className="relative grid h-48 w-48 place-items-center">
            <div className="absolute inset-0 animate-spinslow rounded-full border-2 border-dashed border-line-strong" />
            <div className="absolute inset-5 rounded-full bg-gradient-to-br from-orange/15 via-purple/15 to-blue/15 blur-md" />
            <div className="relative grid h-32 w-32 place-items-center rounded-full bg-ink text-center text-white shadow-float">
              <div><p className="font-display text-[17px] font-bold">medics IVF</p><p className="text-[11px] text-white/65">One record · One login</p></div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">{layers.slice(2).map((l) => <LayerCard key={l.slug} l={l} />)}</div>
      </div>
      <Link href="/trust" className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl bg-ink px-6 py-4 text-[14px] text-white/85 transition hover:bg-[#13205a]">
        <span className="flex items-center gap-2 font-display font-semibold text-white"><Icon name="shield" size={17} className="text-orange" />Built in underneath:</span>
        <span>ART Act checks</span><span>ISO 27001</span><span>ABDM compliant</span><span>Role based access</span><span>Cloud, since 2008</span>
      </Link>
    </div>
  );
}
function LayerCard({ l }) {
  return (
    <Link href={l.href} className="card card-hover group block p-6">
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${tint[l.tint]}`}><Icon name={l.icon} size={22} /></span>
        <p className="font-display text-[18px] font-semibold text-ink">{l.name}</p>
        <Icon name="arrow" size={17} className="ml-auto text-body-muted transition-transform duration-base group-hover:translate-x-1 group-hover:text-orange" />
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">{blurb[l.slug].map((b) => <span key={b} className="rounded-pill bg-cream px-2.5 py-1 text-[12.5px] text-ink">{b}</span>)}</div>
    </Link>
  );
}
