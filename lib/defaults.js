// Shared (server + client): default content, section keys and small helpers. No browser or DB code here.
const clientNames = [
  ["Nova IVF", "chains"], ["GarbhaGudi IVF", "chains"], ["IVF Access", "chains"], ["Ferty9", "chains"], ["Xenith Fertility", "chains"],
  ["Sunflower IVF", "chains"], ["Baby Science", "chains"], ["Khushi Fertility", "clinics"], ["Banker IVF", "clinics"], ["esha IVF", "clinics"],
  ["Manipal Fertility", "clinics"], ["Sneh IVF", "clinics"], ["Femcare", "clinics"], ["Vriksh Fertility", "clinics"], ["Manipal Academy", "hospitals"],
  ["Star Hospitals", "hospitals"], ["Global Hospital", "hospitals"], ["Govt. of Haryana", "hospitals"], ["Sankara Eye", "hospitals"], ["KMC Hospital", "hospitals"],
  ["Unity Hospital", "hospitals"], ["Nirmal Hospital", "hospitals"], ["Sarji Hospital", "hospitals"], ["Haria L.G. Rotary", "hospitals"], ["Family Medical Practice", "international"],
  ["Al Safa, Doha", "international"], ["LAMA, Muscat", "international"],
];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const DEFAULTS = {
  brand: { name: "medics IVF", logo: "", logoHeight: 32, showWordmark: true },
  clients: clientNames.map(([name, category]) => ({ id: "c-" + slug(name), name, category, image: "" })),
  integrations: [
    { id: "i-zoho", name: "Zoho", image: "/brand/integrations/zoho.svg" },
    { id: "i-tally", name: "Tally", image: "/brand/integrations/tally.svg" },
    { id: "i-netsuite", name: "Oracle NetSuite", image: "/brand/integrations/oracle-netsuite.svg" },
    { id: "i-ofs", name: "Oracle Financial Services", image: "/brand/integrations/oracle-financial.svg" },
    { id: "i-sonocare", name: "SonoCare", image: "/brand/integrations/sonocare.svg" },
    { id: "i-whatsapp", name: "WhatsApp", image: "/brand/integrations/whatsapp.svg" },
    { id: "i-sap", name: "SAP", image: "" },
    { id: "i-pinelabs", name: "Pine Labs", image: "" },
    { id: "i-neuberg", name: "Neuberg Anand", image: "" },
  ],
  certifications: [
    { id: "cert-iso", title: "ISO 27001", subtitle: "Certified information security", badge: "iso", image: "" },
    { id: "cert-abdm", title: "ABDM compliant", subtitle: "Ayushman Bharat Digital Mission", badge: "abdm", image: "" },
    { id: "cert-art", title: "ART Act ready", subtitle: "Checks built into the workflow", badge: "art", image: "" },
    { id: "cert-voh", title: "VOH 2025-26", subtitle: "India's best tech for IVF clinics and labs", badge: "award", image: "" },
    { id: "cert-20", title: "20 years of medics", subtitle: "Pioneering healthtech on the cloud", badge: "years", image: "" },
  ],
  testimonials: [
    { id: "t1", quote: "With over 130 centres, medics IVF has been instrumental in streamlining our operations. Its scalable clinical module and seamless centre integration make expansion effortless.", name: "Mani KN", role: "Head of IT", org: "Nova IVF", tag: "Enterprise network", photo: "", logo: "" },
    { id: "t2", quote: "medics IVF has been a key partner in our growth, enabling efficient multi centre management with powerful reporting and real time dashboards.", name: "Shobhit Agarwal", role: "CEO", org: "Nova IVF", tag: "Leadership", photo: "", logo: "" },
    { id: "t3", quote: "The medics team helped us implement the software at all our centres at the same time. We rolled out across every centre in one shot, without too much hassle.", name: "Harinath Chakravarthy", role: "Chief Technology and People Officer", org: "IVF Access", tag: "Chain rollout", photo: "", logo: "" },
    { id: "t4", quote: "It is intuitive, tailored for fertility workflows, and ensures full ART compliance. It has made our work smoother and more focused on patient care.", name: "Dr Rashmi Yogish", role: "Clinical Director", org: "Khushi Fertility and IVF Centre", tag: "Single clinic", photo: "", logo: "" },
    { id: "t5", quote: "medics IVF streamlined our inventory and billing and centralised our operations with the hub and spoke model. The counselling features have been invaluable.", name: "Vishwaroop", role: "General Manager, Purchase", org: "Ferty9 Fertility Center", tag: "Hub and spoke", photo: "", logo: "" },
    { id: "t6", quote: "medics IVF has streamlined our entire treatment process, from consultation to follow up. We deliver more personalised care with better coordination.", name: "Dr Mamta Dighe", role: "Director", org: "Xenith Advanced Fertility Centre", tag: "Clinical care", photo: "", logo: "" },
    { id: "t7", quote: "Over three years, medics has streamlined appointments, prescriptions, IVF treatments and billing, and given us more time for patient care.", name: "Hari Srinivasan", role: "Director Marketing", org: "GarbhaGudi IVF Centre", tag: "Operations", photo: "", logo: "" },
  ],
  banners: [
    { id: "b-care", mode: "text", kicker: "New", title: "medics care: your clinic's own patient app", subtitle: "Bookings, QR check in, reports, bills and automated follow ups, all under your brand.", theme: "hero", image: "", mobileImage: "", link: "", ctaLabel: "See medics care", ctaHref: "/patient-engagement", cta2Label: "", cta2Href: "", start: "", end: "", enabled: true },
    { id: "b-iso", mode: "text", kicker: "Trust", title: "ISO 27001 certified. ABDM compliant.", subtitle: "Your patients' data is protected to global standards, on a platform built for India.", theme: "sky", image: "", mobileImage: "", link: "", ctaLabel: "Trust and security", ctaHref: "/trust", cta2Label: "", cta2Href: "", start: "", end: "", enabled: true },
    { id: "b-voh", mode: "text", kicker: "Award", title: "India's best tech solutions for IVF clinics and labs", subtitle: "UBQ Technologies, recognised by VOH for 2025-26.", theme: "peach", image: "", mobileImage: "", link: "", ctaLabel: "About us", ctaHref: "/about", cta2Label: "", cta2Href: "", start: "", end: "", enabled: true },
  ],
};

export const bannerThemes = {
  hero: { label: "Deep navy", className: "bg-hero-gradient text-white", dark: true },
  cream: { label: "Warm cream", className: "bg-sand text-ink", dark: false },
  lavender: { label: "Soft lavender", className: "bg-lavender text-ink", dark: false },
  peach: { label: "Soft peach", className: "bg-peach text-ink", dark: false },
  sky: { label: "Soft blue", className: "bg-sky text-ink", dark: false },
  mint: { label: "Soft green", className: "bg-mint text-ink", dark: false },
};
export const clientCategories = [["chains", "IVF chains"], ["clinics", "IVF clinics"], ["hospitals", "Hospitals"], ["international", "International"]];
export const badgeKinds = [["iso", "ISO seal"], ["abdm", "ABDM"], ["art", "Compliance shield"], ["award", "Award"], ["years", "Years"]];


export const SECTION_KEYS = ["brand", "clients", "integrations", "certifications", "testimonials", "banners"];
export const SECTION_LABELS = { brand: "Brand logo", clients: "Client logos", integrations: "Integrations", certifications: "Certifications", testimonials: "Testimonials", banners: "Banners" };

export function activeBanners(list, now = Date.now()) {
  return (list || []).filter((b) => {
    if (!b.enabled) return false;
    if (b.mode === "artwork" && !b.image) return false;
    const s = b.start ? new Date(b.start).getTime() : -Infinity;
    const e = b.end ? new Date(b.end).getTime() : Infinity;
    return now >= s && now <= e;
  });
}

export const uid = (p = "id") => p + "-" + Math.random().toString(36).slice(2, 9);

