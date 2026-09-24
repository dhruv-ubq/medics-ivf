"use client";

import Logo from "./Logo";
import { useCms } from "@/lib/store";

/* Site logo: uploaded brand logo if set, else the medics mark + wordmark */
export function BrandLogo({ dark = false, className = "" }) {
  const b = useCms("brand");
  if (b.logo) {
    return (
      <span className={`flex items-center gap-2.5 ${className}`}>
        <img src={b.logo} alt={b.name || "medics IVF"} style={{ height: b.logoHeight || 32 }} className="w-auto object-contain" />
        {b.showWordmark && b.name && <span className={`font-display text-[20px] font-bold tracking-tight ${dark ? "text-white" : "text-ink"}`}>{b.name}</span>}
      </span>
    );
  }
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={30} />
      <span className={`font-display text-[20px] font-bold tracking-tight ${dark ? "text-white" : "text-ink"}`}>{b.name || "medics IVF"}</span>
    </span>
  );
}

/* Deterministic accent for wordmark tiles */
const accents = ["#002582", "#9800a8", "#ff6700", "#1f8a3b", "#0b6bcb", "#b0306a", "#5a3fc0", "#c25400"];
function accentFor(name) { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0; return accents[h % accents.length]; }

/* Client logo: uploaded image, else a clean wordmark tile */
export function ClientMark({ item, size = "md", mono = false }) {
  const h = size === "sm" ? 30 : 38;
  if (item.image) return <img src={item.image} alt={item.name} style={{ height: h }} className={`w-auto max-w-[150px] object-contain ${mono ? "opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" : ""}`} />;
  const a = accentFor(item.name);
  const words = item.name.split(/[ ,]+/).filter(Boolean);
  const initials = (words[0][0] + (words[1] ? words[1][0] : "")).toUpperCase();
  return (
    <span className={`flex items-center gap-2 whitespace-nowrap ${mono ? "opacity-60 transition hover:opacity-100" : ""}`}>
      <span className="grid shrink-0 place-items-center rounded-lg font-display font-bold text-white" style={{ width: h * 0.82, height: h * 0.82, background: a, fontSize: h * 0.3 }}>{initials}</span>
      <span className="font-display font-bold tracking-tight" style={{ color: mono ? "#0b1846" : a, fontSize: size === "sm" ? 14 : 16.5 }}>{item.name}</span>
    </span>
  );
}

/* Certification badges: uploaded official artwork, else a clean built in badge */
export function CertBadge({ item, size = 76 }) {
  if (item.image) return <img src={item.image} alt={item.title} style={{ height: size }} className="w-auto object-contain" />;
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 100 100" };
  switch (item.badge) {
    case "iso":
      return (
        <svg {...common} aria-label="ISO 27001">
          <defs><path id="isoc" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
          <circle cx="50" cy="50" r="48" fill="#0b1846" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#ffffff" strokeOpacity=".35" strokeDasharray="2 3" />
          <text fontSize="7.2" fill="#fff" fontFamily="Montserrat,Arial" fontWeight="600" letterSpacing="1.4"><textPath href="#isoc">INFORMATION SECURITY · CERTIFIED ·</textPath></text>
          <text x="50" y="50" textAnchor="middle" fontSize="19" fill="#fff" fontFamily="Montserrat,Arial" fontWeight="800">ISO</text>
          <text x="50" y="66" textAnchor="middle" fontSize="13" fill="#ff6700" fontFamily="Montserrat,Arial" fontWeight="700">27001</text>
        </svg>
      );
    case "abdm":
      return (
        <svg {...common} aria-label="ABDM compliant">
          <rect x="4" y="4" width="92" height="92" rx="22" fill="#fff" stroke="#e8e6ef" strokeWidth="2" />
          <rect x="4" y="74" width="92" height="7" fill="#ff9933" /><rect x="4" y="81" width="92" height="7" fill="#ffffff" /><rect x="4" y="88" width="92" height="8" rx="0" fill="#138808" />
          <path d="M50 20c9 6 13 14 13 22s-6 14-13 14-13-6-13-14 4-16 13-22Z" fill="#138808" opacity=".9" />
          <path d="M50 30v24" stroke="#fff" strokeWidth="2" />
          <text x="50" y="69" textAnchor="middle" fontSize="12.5" fill="#0b1846" fontFamily="Montserrat,Arial" fontWeight="800">ABDM</text>
        </svg>
      );
    case "art":
      return (
        <svg {...common} aria-label="ART Act ready">
          <path d="M50 6l36 14v26c0 22-15 39-36 48C29 85 14 68 14 46V20Z" fill="#9800a8" />
          <path d="M34 50l11 11 21-22" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="82" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Montserrat,Arial" fontWeight="800">ART ACT</text>
        </svg>
      );
    case "award":
      return (
        <svg {...common} aria-label="Award">
          <circle cx="50" cy="50" r="48" fill="#fff4e6" />
          <path d="M34 22h32v14a16 16 0 0 1-32 0Z" fill="#f2a900" />
          <path d="M34 26H24a10 10 0 0 0 12 14M66 26h10a10 10 0 0 1-12 14" fill="none" stroke="#f2a900" strokeWidth="3.5" />
          <rect x="46" y="51" width="8" height="12" fill="#d48f00" /><rect x="36" y="63" width="28" height="7" rx="2" fill="#0b1846" />
          <text x="50" y="84" textAnchor="middle" fontSize="11" fill="#0b1846" fontFamily="Montserrat,Arial" fontWeight="800">VOH</text>
        </svg>
      );
    default:
      return (
        <svg {...common} aria-label="20 years">
          <defs><linearGradient id="yg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ff6700" /><stop offset=".55" stopColor="#9800a8" /><stop offset="1" stopColor="#002582" /></linearGradient></defs>
          <circle cx="50" cy="50" r="48" fill="url(#yg)" />
          <text x="50" y="58" textAnchor="middle" fontSize="36" fill="#fff" fontFamily="Montserrat,Arial" fontWeight="800">20</text>
          <text x="50" y="75" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Montserrat,Arial" fontWeight="700" letterSpacing="1">YEARS</text>
        </svg>
      );
  }
}

/* Testimonial photo: uploaded photo, else a warm initials portrait */
export function PersonPhoto({ item, className = "", rounded = "rounded-2xl", size = "lg" }) {
  if (item.photo) return <img src={item.photo} alt={item.name} className={`object-cover ${rounded} ${className}`} />;
  const a = accentFor(item.name);
  const initials = item.name.replace(/^Dr\.? /, "").split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className={`relative grid place-items-center overflow-hidden ${rounded} ${className}`} style={{ background: `linear-gradient(145deg, ${a} 0%, #0b1846 100%)` }}>
      {size === "lg" && <><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" /><div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-orange/20" /></>}
      <span className={`relative font-display font-bold text-white ${size === "lg" ? "text-[52px] tracking-tight" : "text-[14px]"}`}>{initials}</span>
    </div>
  );
}
