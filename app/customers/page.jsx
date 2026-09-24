import { Reveal } from "@/components/Motion";
import { LogoWall, TestimonialShowcase, TestimonialGrid } from "@/components/Interactive";
import { PageHero, SectionHead, StatBand, GeoLine, CtaBand } from "@/components/Blocks";
export const metadata = { title: "Customers", description: "Nova IVF, GarbhaGudi, IVF Access, Ferty9, Khushi Fertility, Xenith and more run on medics IVF." };
export default function Customers() {
  return (
    <>
      <PageHero eyebrow="Customers" title="Trusted by the clinics setting the standard in fertility care." body="From single clinics to India's largest IVF network, and hospitals across India and the Gulf." />
      <section className="bg-white section-pad"><div className="container-x"><StatBand /><div className="mt-8"><GeoLine /></div></div></section>
      <section className="bg-cream section-pad"><div className="container-x"><SectionHead eyebrow="Who we serve" title="Chains, clinics, hospitals and international groups." /><Reveal className="mt-10"><LogoWall /></Reveal></div></section>
      <section className="bg-white section-pad"><div className="container-x"><SectionHead eyebrow="In their words" title="Featured stories." /><Reveal className="mt-10"><TestimonialShowcase /></Reveal></div></section>
      <section className="bg-cream section-pad"><div className="container-x"><SectionHead eyebrow="More voices" title="What teams say about medics IVF." className="mb-10" /><TestimonialGrid /></div></section>
      <CtaBand title="Join the clinics growing with medics IVF." />
    </>
  );
}
