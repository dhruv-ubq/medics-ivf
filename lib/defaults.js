// Shared (server + client): default content, section keys and small helpers. No browser or DB code here.
// Only IVF clients. Logos live in public/brand/clients.
const clientNames = [
  ["Nova IVF", "chains", "nova-ivf"], ["Baby Science IVF", "chains", "baby-science-ivf"], ["GarbhaGudi IVF", "chains", "garbhagudi-ivf"], ["Ferty9", "chains", "ferty9"],
  ["Neelkanth IVF", "chains", "neelkanth-ivf"], ["Hegde Fertility", "chains", "hegde-fertility"], ["Sunflower IVF", "chains", "sunflower-ivf"], ["IVF Access", "chains", "ivf-access"],
  ["Banker IVF", "clinics", "banker-ivf"], ["Femcare Fertility", "clinics", "femcare-fertility"], ["Manipal Fertility", "clinics", "manipal-fertility"], ["Crescenta Fertility", "clinics", "crescenta-fertility"],
  ["Momtree IVF", "clinics", "momtree-ivf"], ["Vasuki IVF", "clinics", "vasuki-ivf"], ["The Hive Fertility", "clinics", "the-hive-fertility"], ["Xenith Fertility", "clinics", "xenith-fertility"],
  ["esha IVF", "clinics", "esha-ivf"], ["Fertilite IVF", "clinics", "fertilite-ivf"], ["Jiva Fertility", "clinics", "jiva-fertility"], ["Ankuran", "clinics", "ankuran"],
  ["Aveya IVF", "clinics", "aveya-ivf"], ["Janya Fertility", "clinics", "janya-fertility"], ["Luma Fertility", "clinics", "luma-fertility"], ["Shishu IVF", "clinics", "shishu-ivf"],
  ["Janam IVF", "clinics", "janam-ivf"], ["Babynine Fertility", "clinics", "babynine-fertility"], ["Ovum Fertility", "clinics", "ovum-fertility"], ["Yaal Fertility", "clinics", "yaal-fertility"],
  ["Aanandha Fertility Center", "clinics", "aanandha-fertility-center"], ["PHS Fertility", "clinics", "phs-fertility"], ["OMA Womens Hospital", "clinics", "oma-womens-hospital"], ["Yellow Fertility", "clinics", "yellow-fertility"],
  ["Tathastu Fertility", "clinics", "tathastu-fertility"], ["PSFC", "clinics", "psfc"], ["Shanthi Gynec", "clinics", "shanthi-gynec"], ["Bharati Fertility", "clinics", "bharati-fertility"],
  ["Santasa", "clinics", "santasa"], ["Pramukh IVF", "clinics", "pramukh-ivf"], ["Her Health", "clinics", "her-health"], ["Zeeva Fertility", "clinics", "zeeva-fertility"],
  ["Oval Fertility", "clinics", "oval-fertility"],
];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const DEFAULTS = {
  brand: { name: "medics IVF", logo: "", logoHeight: 32, showWordmark: true },
  hero: { eyebrow: "Trusted by 500+ hospitals and clinics", headline: "Built for India’s Best IVF Centres.", highlight: "Trusted at scale. Compliant from day one.", subline: "The IVF platform behind India’s largest fertility network. Grow from one clinic to 120+ centres with ART compliance, consent and data security built into every workflow.", video: "", poster: "" },
  clients: clientNames.map(([name, category, file]) => ({ id: "c-" + slug(name), name, category, image: `/brand/clients/${file}.png` })),
  integrations: [
    { id: "i-zoho", name: "Zoho", image: "/brand/integrations/zoho.svg" },
    { id: "i-tally", name: "Tally", image: "/brand/integrations/tally.svg" },
    { id: "i-netsuite", name: "Oracle NetSuite", image: "/brand/integrations/oracle-netsuite.svg" },
    { id: "i-ofs", name: "Oracle Financial Services", image: "/brand/integrations/oracle-financial.svg" },
    { id: "i-sonocare", name: "SonoCare", image: "/brand/integrations/sonocare.svg" },
    { id: "i-whatsapp", name: "WhatsApp", image: "/brand/integrations/whatsapp.svg" },
    { id: "i-sap", name: "SAP", image: "/brand/integrations/sap.png" },
    { id: "i-pinelabs", name: "Pine Labs", image: "/brand/integrations/pine-labs.png" },
    { id: "i-neuberg", name: "Neuberg Anand", image: "/brand/integrations/neuberg-anand.png" },
  ],
  certifications: [
    { id: "cert-iso", title: "ISO 27001", subtitle: "Certified information security", badge: "iso", image: "/brand/certs/iso-27001.png" },
    { id: "cert-soc2", title: "SOC 2 Type II", subtitle: "Independently audited security controls", badge: "iso", image: "/brand/certs/soc-2.png" },
    { id: "cert-abdm", title: "ABDM compliant", subtitle: "Ayushman Bharat Digital Mission", badge: "abdm", image: "/brand/certs/abdm.png" },
    { id: "cert-dpdp", title: "DPDP Act ready", subtitle: "India's Digital Personal Data Protection Act, 2023", badge: "art", image: "/brand/certs/dpdp-act.png" },
    { id: "cert-art", title: "ART compliance built in", subtitle: "Checks built into every workflow", badge: "art", image: "" },
    { id: "cert-voh", title: "VOH 2025-26", subtitle: "Best tech solutions for IVF clinics and labs", badge: "award", image: "/brand/certs/voh-award.png" },
  ],

  testimonials: [
    { id: "t1", quote: "With over 130 centres, medics IVF has been instrumental in streamlining our operations. Its scalable clinical module and seamless centre integration make expansion effortless.", name: "Mani KN", role: "Head of IT", org: "Nova IVF", tag: "Enterprise network", photo: "", logo:"/brand/clients/nova-ivf.png" },
    { id: "t2", quote: "medics IVF has been a key partner in our growth, enabling efficient multi centre management with powerful reporting and real time dashboards.", name: "Shobhit Agarwal", role: "CEO", org: "Nova IVF", tag: "Leadership", photo: "", logo:"/brand/clients/nova-ivf.png" },
    { id: "t3", quote: "The medics team helped us implement the software at all our centres at the same time. We rolled out across every centre in one shot, without too much hassle.", name: "Harinath Chakravarthy", role: "Chief Technology and People Officer", org: "IVF Access", tag: "Chain rollout", photo: "", logo:"/brand/clients/ivf-access.png" },
    { id: "t4", quote: "It is intuitive, tailored for fertility workflows, and ensures full ART compliance. It has made our work smoother and more focused on patient care.", name: "Dr Rashmi Yogish", role: "Clinical Director", org: "Khushi Fertility and IVF Centre", tag: "Single clinic", photo: "", logo:"/brand/clients/khushi-fertility.png" },
    { id: "t5", quote: "medics IVF streamlined our inventory and billing and centralised our operations with the hub and spoke model. The counselling features have been invaluable.", name: "Vishwaroop", role: "General Manager, Purchase", org: "Ferty9 Fertility Center", tag: "Hub and spoke", photo: "", logo:"/brand/clients/ferty9.png" },
    { id: "t6", quote: "medics IVF has streamlined our entire treatment process, from consultation to follow up. We deliver more personalised care with better coordination.", name: "Dr Mamta Dighe", role: "Director", org: "Xenith Advanced Fertility Centre", tag: "Clinical care", photo: "", logo:"/brand/clients/xenith-fertility.png" },
    { id: "t7", quote: "Over three years, medics has streamlined appointments, prescriptions, IVF treatments and billing, and given us more time for patient care.", name: "Hari Srinivasan", role: "Director Marketing", org: "GarbhaGudi IVF Centre", tag: "Operations", photo: "", logo:"/brand/clients/garbhagudi-ivf.png" },
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
export const clientCategories = [["chains", "IVF chains"], ["clinics", "IVF clinics"]];
export const badgeKinds = [["iso", "ISO seal"], ["abdm", "ABDM"], ["art", "Compliance shield"], ["award", "Award"], ["years", "Years"]];


export const SECTION_KEYS = ["hero", "brand", "clients", "integrations", "certifications", "testimonials", "banners"];
export const SECTION_LABELS = { hero: "Hero headline", brand: "Brand logo", clients: "Client logos", integrations: "Integrations", certifications: "Certifications", testimonials: "Testimonials", banners: "Banners" };

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


// One click headline presets for the content studio (trust, scale, compliance).
export const HERO_PRESETS = [
  { headline: "Built for India’s Best IVF Centres.", highlight: "Trusted at scale. Compliant from day one." },
  { headline: "Trusted at scale.", highlight: "Compliant from day one." },
  { headline: "Proven at 140+ centres.", highlight: "ART compliant at every one." },
  { headline: "Trusted by 500+ clinics.", highlight: "Built to scale. Compliant by design." },
  { headline: "Grow every centre.", highlight: "Protect every record." },
  { headline: "The trusted, compliant IVF platform", highlight: "that grows with you." },
  { headline: "Scale with confidence.", highlight: "Stay compliant." },
];

// Growth stories shown on the home page (centre counts as shared by UBQ).
export const NETWORK = [
  { id: "n-nova", name: "Nova IVF", logo: "/brand/clients/nova-ivf.png", centres: "140+", note: "Scaled from 1 to 140+ centres", region: "across India" },
  { id: "n-bs", name: "Baby Science IVF Clinics", logo: "/brand/clients/baby-science-ivf.png", centres: "14", note: "14 centres", region: "across South India" },
  { id: "n-gg", name: "GarbhaGudi IVF Centre", logo: "/brand/clients/garbhagudi-ivf.png", centres: "11", note: "11 centres", region: "across Karnataka" },
  { id: "n-f9", name: "Ferty9 Fertility Centres", logo: "/brand/clients/ferty9.png", centres: "12", note: "12 centres", region: "across Telangana and Andhra Pradesh" },
  { id: "n-nk", name: "Neelkanth IVF", logo: "/brand/clients/neelkanth-ivf.png", centres: "9", note: "9 centres", region: "across North India" },
  { id: "n-hg", name: "Hegde Fertility", logo: "/brand/clients/hegde-fertility.png", centres: "7", note: "7 centres", region: "across Telangana" },
  { id: "n-pn", name: "PN IVF", logo: "", centres: "7", note: "7 centres", region: "across Maharashtra" },
  { id: "n-sf", name: "Sunflower IVF", logo: "/brand/clients/sunflower-ivf.png", centres: "5", note: "5 centres", region: "across Gujarat" },
];

