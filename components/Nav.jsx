"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "./Brandkit";
import Icon from "./Icon";
import { navMenus } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(null);      // desktop mega menu index
  const [mobile, setMobile] = useState(false);
  const [mOpen, setMOpen] = useState(null);    // mobile accordion
  const [scrolled, setScrolled] = useState(false);
  const closeT = useRef(null);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 6);
    f(); window.addEventListener("scroll", f, { passive: true });
    const esc = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("keydown", esc); };
  }, []);

  const enter = (i) => { clearTimeout(closeT.current); setOpen(i); };
  const leave = () => { closeT.current = setTimeout(() => setOpen(null), 140); };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-base ${scrolled || open !== null ? "border-b border-hairline bg-white/90 backdrop-blur-md" : "border-b border-transparent bg-cream"}`}>
      <div className="container-x flex h-[72px] items-center gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="medics IVF home">
          <BrandLogo />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex" onMouseLeave={leave}>
          {navMenus.map((m, i) => (
            <div key={m.label} className="relative" onMouseEnter={() => m.columns ? enter(i) : setOpen(null)}>
              <Link href={m.href} onClick={() => setOpen(null)} aria-expanded={m.columns ? open === i : undefined}
                className={`flex items-center gap-1 rounded-pill px-3.5 py-2 font-display text-[14.5px] font-medium transition-colors duration-fast ${open === i ? "bg-lavender text-ink" : "text-body hover:text-ink"}`}>
                {m.label}{m.columns && <Icon name="down" size={14} className={`transition-transform duration-base ${open === i ? "rotate-180" : ""}`} />}
              </Link>
              {m.columns && open === i && (
                <div onMouseEnter={() => enter(i)} onMouseLeave={leave}
                  className="absolute left-0 top-full z-50 mt-2 flex animate-fade-up overflow-hidden rounded-2xl border border-hairline bg-white shadow-float" style={{ animationDuration: ".35s" }}>
                  <div className="flex gap-2 p-3">
                    {m.columns.map((col) => (
                      <div key={col.title} className="w-[260px]">
                        <p className="eyebrow px-3 pb-2 pt-2 text-body-muted">{col.title}</p>
                        {col.links.map((l) => (
                          <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(null)} className="group block rounded-xl px-3 py-2 transition-colors hover:bg-cream">
                            <span className="flex items-center gap-2 font-display text-[14px] font-semibold text-ink">{l.icon && <span className="grid h-7 w-7 place-items-center rounded-lg bg-cream text-orange"><Icon name={l.icon} size={15} /></span>}{l.label}<Icon name="arrow" size={14} className="ml-auto -translate-x-1 opacity-0 transition-all duration-base group-hover:translate-x-0 group-hover:opacity-100" /></span>
                            {l.desc && <span className={`block text-[12.5px] text-body-muted ${l.icon ? "pl-9" : ""}`}>{l.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  {m.feature && (
                    <Link href={m.feature.href} onClick={() => setOpen(null)} className="group m-3 ml-0 flex w-[240px] flex-col justify-between rounded-xl bg-ink p-5 text-white">
                      <div>
                        <span className="chip bg-orange text-white">{m.feature.eyebrow}</span>
                        <p className="mt-3 font-display text-[17px] font-semibold text-white">{m.feature.title}</p>
                        <p className="mt-1.5 text-[13px] text-white/70">{m.feature.body}</p>
                      </div>
                      <span className="link-arrow mt-4 text-[13px] text-white">{m.feature.cta} <Icon name="arrow" size={14} /></span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link href="/patient-engagement" className="btn px-4 py-2.5 text-[14px] text-ink hover:bg-lavender">medics care</Link>
          <Link href="/demo" className="btn-primary px-5 py-2.5 text-[14px]">Book a demo</Link>
        </div>

        <button type="button" onClick={() => setMobile((v) => !v)} aria-label="Menu" aria-expanded={mobile} className="ml-auto grid h-11 w-11 place-items-center rounded-pill lg:hidden">
          <Icon name={mobile ? "x" : "menu"} size={24} />
        </button>
      </div>

      {mobile && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-hairline bg-white lg:hidden">
          <div className="container-x py-3">
            {navMenus.map((m, i) => (
              <div key={m.label} className="border-b border-hairline">
                {m.columns ? (
                  <>
                    <button onClick={() => setMOpen(mOpen === i ? null : i)} className="flex w-full items-center justify-between py-4 font-display text-[16px] font-semibold text-ink">
                      {m.label}<Icon name="down" size={18} className={`transition-transform ${mOpen === i ? "rotate-180" : ""}`} />
                    </button>
                    {mOpen === i && (
                      <div className="pb-3">
                        {m.columns.flatMap((c) => c.links).map((l) => (
                          <Link key={l.href + l.label} href={l.href} onClick={() => setMobile(false)} className="block rounded-lg px-2 py-2 text-[15px] text-body hover:bg-cream">{l.label}</Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={m.href} onClick={() => setMobile(false)} className="block py-4 font-display text-[16px] font-semibold text-ink">{m.label}</Link>
                )}
              </div>
            ))}
            <div className="grid gap-2 py-4">
              <Link href="/demo" onClick={() => setMobile(false)} className="btn-primary w-full">Book a demo</Link>
              <Link href="/patient-engagement" onClick={() => setMobile(false)} className="btn-outline w-full">See medics care</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
