import Link from "next/link";
export default function NotFound() {
  return (
    <section className="bg-cream"><div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow text-orange">404</p><h1 className="display-xl mt-4">This page is not here.</h1>
      <p className="body-lg mt-4 text-body">Let us get you back on track.</p>
      <div className="mt-8 flex gap-3"><Link href="/" className="btn-primary">Home</Link><Link href="/demo" className="btn-outline">Book a demo</Link></div>
    </div></section>
  );
}
