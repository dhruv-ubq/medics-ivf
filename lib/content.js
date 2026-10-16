// medics IVF v4 content. Sources: IVF 2026 deck, medics care decks, v9 training manual, medicsprime.com.
// Brand: always "medics IVF". Simple language. No em dashes. Benefits, not technicals.

export const site = {
  name: "medics IVF",
  tagline: "The Future of Focused Fertility Care",
  email: "info@ubq.in",
  phone: "+91 80-3756-4600",
  phoneHref: "+918037564600",
  address: "Ubq Technologies Pvt. Ltd., Fortune Summit, Sector 6, HSR Layout, Bengaluru 560068",
  hours: "Monday to Friday, 10 AM to 6 PM IST",
};

export const navMenus = [
  { label: "Platform", href: "/platform", columns: [
    { title: "One platform, four layers", links: [
      { label: "Clinical and lab", desc: "EMR, cycles, andrology, embryology", href: "/platform/clinical-lab", icon: "lab" },
      { label: "Business operations", desc: "Billing, pharmacy, purchase, stock", href: "/platform/operations", icon: "billing" },
      { label: "Patient engagement", desc: "medics care app and follow up journeys", href: "/patient-engagement", icon: "heart" },
      { label: "Network and insights", desc: "Chains, hub and spoke, analytics", href: "/platform/network-insights", icon: "branches" },
    ]},
    { title: "Built in", links: [
      { label: "Compliance and security", desc: "ART Act, ISO 27001, ABDM", href: "/trust", icon: "shield" },
      { label: "Integrations", desc: "Zoho, Tally, NetSuite, WhatsApp", href: "/platform#integrations", icon: "link" },
      { label: "Platform overview", desc: "See how it all connects", href: "/platform", icon: "network" },
    ]},
  ], feature: { eyebrow: "Patient engagement", title: "medics care", body: "Your clinic's own branded app and automated follow ups, synced with everything.", href: "/patient-engagement", cta: "See medics care" } },
  { label: "Solutions", href: "/solutions", columns: [
    { title: "By clinic", links: [
      { label: "Single IVF clinic", desc: "One centre, growing fast", href: "/solutions/clinics/single-clinic", icon: "home" },
      { label: "Growing chain", desc: "2 to 10 centres", href: "/solutions/clinics/growing-chain", icon: "branches" },
      { label: "Enterprise network", desc: "10+ centres", href: "/solutions/clinics/enterprise-network", icon: "globe" },
      { label: "Hospital IVF unit", desc: "Inside a multispeciality hospital", href: "/solutions/clinics/hospital-ivf", icon: "hospital" },
    ]},
    { title: "By role", links: [
      { label: "Owners and CXOs", href: "/solutions/roles/owner" },
      { label: "Fertility specialists", href: "/solutions/roles/specialist" },
      { label: "Embryologists", href: "/solutions/roles/embryologist" },
      { label: "Nurses and counsellors", href: "/solutions/roles/counsellor" },
      { label: "Front desk", href: "/solutions/roles/front-desk" },
      { label: "Centre managers", href: "/solutions/roles/centre-manager" },
      { label: "Finance and purchase", href: "/solutions/roles/finance" },
      { label: "IT heads", href: "/solutions/roles/it" },
    ]},
  ]},
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/about", columns: [
    { title: "Company", links: [
      { label: "About us", href: "/about" },
      { label: "Why medics IVF", href: "/why-medics-ivf" },
      { label: "Trust and security", href: "/trust" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/demo" },
    ]},
  ]},
];

/* ---------- Proof ---------- */
export const stats = [
  { value: 500, suffix: "+", label: "Hospitals and clinics" },
  { value: 350000, suffix: "+", label: "Treatment cycles run" },
  { value: 700000, suffix: "+", label: "Patients registered" },
  { value: 140, suffix: "+", label: "Centres at Nova IVF" },
];
export const labStats = [["1,00,000+", "OPUs performed"], ["1,00,000+", "Embryo transfers"], ["1,000+", "Fertility experts"], ["4,000+", "Daily users"]];
export const geo = ["India", "Oman", "Qatar", "Singapore", "Vietnam"];

/* ---------- Pain to solution (home + why) ---------- */
export const pains = [
  { k: "art", icon: "shield", title: "ART Compliance", pain: "Support IVF centres in maintaining records required under ART guidelines.",
    fix: "The records ART guidelines ask for are captured as part of daily work, not compiled at audit time.",
    points: ["Couple and ovum donor registration", "OPU, embryo and transfer details on the cycle", "Donor to treatment cycle mapping", "ART summary report for every patient"] },
  { k: "consent", icon: "records", title: "Consent Management", pain: "Maintain required patient consent forms and treatment records.",
    fix: "Digital consent forms and every treatment record live on the same patient file.",
    points: ["Integrated digital consent sign off", "Cycle summary, active and past cycles", "Signed prescriptions and treatment advice", "Attachments on the patient record"] },
  { k: "vitrification", icon: "lab", title: "Vitrification Contract", pain: "Need to maintain vitrification contracts and validity dates.",
    fix: "Every vitrification contract is recorded with what is stored, where, and until when.",
    points: ["Contracts linked to stored embryos and samples", "Validity dates and freezing fee renewals", "Thaw and frozen embryo transfer on the same cycle", "Patients informed when a contract is created"] },
  { k: "security", icon: "lock", title: "Data Security", pain: "Concern about who can view or change sensitive patient information.",
    fix: "Each person sees and changes only what their role allows, on an ISO 27001 certified platform.",
    points: ["Staff and roles set in master management", "Clinical records signed by the doctor", "Discount and refund limits by role", "ISO 27001 certified and ABDM compliant"] },
  { k: "followup", icon: "bell", title: "Follow-ups", pain: "Need reminders so important patient follow-ups are not missed.",
    fix: "Follow ups set in the EMR turn into reminders patients actually see.",
    points: ["Follow up scheduled from the EMR or worklist", "Reminders on the app and WhatsApp", "Gentle re engagement if a follow up is not booked", "Appointment no show report"] },
];

/* ---------- The four layers ---------- */
export const layers = [
  { slug: "clinical-lab", href: "/platform/clinical-lab", icon: "lab", tint: "sky", name: "Clinical and lab",
    title: "Every cycle, every embryo, one record.",
    lead: "A fertility EMR, andrology and embryology that work as one, from first consult to frozen embryo transfer.",
    groups: [
      { t: "Fertility EMR", i: "records", items: ["Consultation, diagnosis, history and examination", "Investigation advice and prescriptions", "Treatment advice and follow ups", "Cycle summary, active cycle and past cycles", "Attachments on the patient record"] },
      { t: "Consent and ART records", i: "shield", items: ["Digital consent forms on the patient record", "Couple and ovum donor registration", "Donor to treatment cycle mapping", "ART summary report for the patient", "Age, donor and embryo limit checks with Aadhaar verification"] },
      { t: "Embryology", i: "lab", items: ["Ovum pick up", "Fertilisation and embryo culture", "Embryo transfer", "Worklists for embryos to vitrify and thaw", "IVF oocyte, embryo and transfer data exports"] },
      { t: "Vitrification and contracts", i: "lock", items: ["Embryo vitrification and thaw", "Frozen embryo transfer", "Vitrification contracts with validity dates", "Freezing fee renewals", "Patients informed when a contract is created"] },
      { t: "Andrology", i: "patients", items: ["Semen collection and wash", "Donor semen received from agencies", "Freeze and split samples", "Issue or discard with a trail", "Semen sample inventory"] },
      { t: "Lab and radiology", i: "chart", items: ["Sample collection and acceptance", "Recollection with reasons", "Record and sign results", "Radiology findings and sign off", "Signed reports reach the patient app"] },
    ],
    outcomes: ["No re keying between the lab and the consult room", "Consent, contracts and ART records in one place", "A complete, auditable trail from OPU to frozen embryo transfer"] },
  { slug: "operations", href: "/platform/operations", icon: "billing", tint: "mint", name: "Business operations",
    title: "Run the front desk, the counter and the store room without leaks.",
    lead: "Appointments, couple registration, billing, day care, pharmacy, purchase and inventory, all tied to the patient and the cycle.",
    groups: [
      { t: "Front office", i: "calendar", items: ["Book, reschedule and cancel appointments", "Doctor availability and leave", "Individual and couple registration", "Ovum donor registration", "Multiple visits and follow up scheduling"] },
      { t: "OP billing and packages", i: "billing", items: ["Create, modify and cancel bills with remarks", "Package bills with selected inclusions", "Discount bills by category, in % or ₹", "Payment mode on every bill", "Payer and financial details per patient"] },
      { t: "Advances, receipts, refunds", i: "records", items: ["Record and view patient advances", "Pharmacy advances", "Create and cancel receipts with a reason", "Refunds within set refund limits", "Bill, receipt and refund updates to the patient"] },
      { t: "Day care, IP and discharge", i: "hospital", items: ["Day care admission and cancellation", "IP bills and IP package bills", "Mark as final bill", "Discharge clearance and summary", "Revoke discharge and patient release"] },
      { t: "Pharmacy", i: "desk", items: ["Retail sales and sales returns", "Patient issue and issue returns", "Drug formulary and drug groups", "Pharmacy dashboard and drug sales", "Sales reports with GST breakup"] },
      { t: "Purchase and inventory", i: "building", items: ["Purchase orders with approval", "Send to supplier and amend PO", "Goods receipts with batch, expiry and checklist", "Indents, transfers and stock adjustments", "Stocktaking and stock ledger"] },
    ],
    outcomes: ["Packages, discounts and refunds follow the limits you set", "Every bill, advance, receipt and refund traceable to a user", "Daily cash collection by unit and by user"],
    highlight: { title: "How billing and packages work", steps: [
      ["Open the patient", "Enter the UHID. The bill opens on the patient's record."],
      ["Add services or a package", "Pick the package and select its inclusions, or add services one by one."],
      ["Apply a discount", "Choose a discount category and enter it in % or ₹. Limits are set in masters."],
      ["Choose the payment mode", "Confirm the bill. Advances are recorded and viewed separately."],
      ["Receipts and refunds", "Receipts can be cancelled with a reason. Refunds stay within refund limits."],
      ["Change with a trail", "Modify or cancel a bill with remarks. Collection reports show who did what."],
    ] } },
  { slug: "patient-engagement", href: "/patient-engagement", icon: "heart", tint: "peach", name: "Patient engagement",
    title: "Your clinic in every patient's pocket.", lead: "medics care: a branded app and patient portal plus automated follow ups on the channels patients already use.",
    groups: [], outcomes: [] },
  { slug: "network-insights", href: "/platform/network-insights", icon: "branches", tint: "lavender", name: "Network and insights",
    title: "See the whole group. Control it from the centre.",
    lead: "Multi centre operations, hub and spoke workflows and more than 100 reports and dashboards across clinical, lab, finance and stock.",
    groups: [
      { t: "Multi centre control", i: "branches", items: ["Single medical record across centres", "Hub and spoke: consult at spokes, OPU and ET at the hub", "Centralised master data and prices", "Centralised controls for purchase and discounts", "Corporate and centre level analytics"] },
      { t: "Masters and controls", i: "shield", items: ["Service groups, services and hospital service prices", "Tax schemes and accounting nomenclature", "Drug formulary, materials and suppliers", "Staff and roles", "Discount categories, discount limits, refund limits"] },
      { t: "IVF analytics", i: "chart", items: ["IVF dashboard", "Couple, oocyte, embryo and transfer data", "Treatment advice and referral reports", "Donor to cycle mapping export", "Cumulative IVF data export"] },
      { t: "Operational analytics", i: "analytics", items: ["Daily and monthly KPI dashboards", "OP visits by doctor, speciality and area", "Appointment no show report", "Bill collection report", "Cash collection by unit and user"] },
      { t: "Lab and pharmacy reports", i: "lab", items: ["Lab service count", "Lab turnaround time by patient", "Investigation result TAT reports", "Pharmacy dashboard and drug sales", "Pharmacy sales by user"] },
      { t: "Purchase and GST", i: "billing", items: ["Purchase dashboard", "GRN versus PO, with GST", "Outstanding bills and stock ageing", "GST inward and outward reports", "Stock transactions export"] },
    ],
    outcomes: ["Corporate and centre numbers that finally match", "Protocols and prices set once, applied everywhere", "Decisions on live data, not month end reports"] },
];

/* ---------- Patient engagement (medics care) ---------- */
export const careJourney = [
  { t: "Onboard", i: "patients", b: "Patients sign up on your branded app and fill your clinic's questionnaire before the first visit." },
  { t: "Educate", i: "spark", b: "An AI assistant and clinic curated articles answer questions about infertility and treatment." },
  { t: "Book and arrive", i: "calendar", b: "Online booking for clinic or video visits, and QR self check in on arrival. No queue." },
  { t: "Consult and pay", i: "billing", b: "Medical summary, prescriptions, lab reports and bills arrive in the app. Pay what is due, right there." },
  { t: "Track treatment", i: "route", b: "Treatment status, reminders during the cycle, pregnancy reporting reminder and the ART summary report." },
  { t: "Stay connected", i: "message", b: "Follow up reminders and messages from the doctor or counsellor, long after treatment." },
];
export const careFeatures = [
  { i: "calendar", t: "Book clinic and video visits", b: "Patients pick the doctor, visit type and slot themselves. Fewer calls to the front desk." },
  { i: "records", t: "Reports and prescriptions", b: "Medical summaries, lab reports, prescriptions and the ART summary report, ready to open and download." },
  { i: "billing", t: "Bills and payments", b: "Every bill in one place. Unpaid amounts can be paid in the app, and receipts are always there." },
  { i: "phone", t: "QR check in", b: "Pre booked and walk in patients check in by scanning a QR code. The front desk stays calm." },
  { i: "users", t: "One app for the whole family", b: "Both partners, and family members, managed from one login with separate profiles." },
  { i: "upload", t: "Upload old reports", b: "Patients upload past reports and they appear on the doctor's record before the visit." },
  { i: "spark", t: "AI assistant", b: "Answers common questions from global and clinic curated content, any time of day." },
  { i: "brush", t: "Fully white labelled", b: "Your name, your colours, your logo. Patients see your clinic, not ours." },
];
export const followupFlows = {
  booked: [
    { when: "At booking", ch: ["whatsapp", "push"], t: "Confirmation, what to expect and a short doctor profile" },
    { when: "1 day before", ch: ["whatsapp", "push"], t: "What to carry, clinic map and a gentle note of encouragement" },
    { when: "2 hours before", ch: ["whatsapp"], t: "Reminder with QR self check in" },
    { when: "After the visit", ch: ["whatsapp", "email"], t: "Thank you, updated plan and a feedback link" },
  ],
  notBooked: [
    { when: "Day 1", ch: ["push"], t: "Why follow ups matter, explained simply" },
    { when: "Day 6", ch: ["email", "push"], t: "Doctor led advice for their situation" },
    { when: "Day 9", ch: ["whatsapp", "push"], t: "Real stories and a hopeful message" },
    { when: "Then", ch: ["whatsapp", "email"], t: "Wellness tips, myths explained and new stories, until they return" },
  ],
};
export const standaloneFails = [
  { t: "Disconnected", b: "The app does not sync with billing, EMR, lab or pharmacy." },
  { t: "Broken experience", b: "Bookings do not show, reports do not open, refunds get stuck." },
  { t: "Costly to maintain", b: "Every update means rework, new bugs and a higher bill." },
  { t: "No healthcare context", b: "Agencies do not understand compliance or clinic workflows." },
  { t: "Hurts your brand", b: "When the app fails, patients blame the clinic, not the developer." },
];
export const careDifferent = [
  { t: "Synced with everything", b: "Appointments, bills, reports, pharmacy and lab come straight from medics IVF." },
  { t: "Healthcare native", b: "Built for clinics, with compliance and data security built in." },
  { t: "Ready on day one", b: "Designed around real clinic workflows, not a one off build." },
  { t: "Always improving", b: "Regular upgrades driven by feedback from clinics on the ground." },
];

/* ---------- Roles ---------- */
export const roles = [
  { slug: "owner", icon: "chart", title: "Owners and CXOs", short: "Grow the group with clarity and control.",
    promise: "Every centre, every rupee and every patient, visible in one place.",
    pains: ["Numbers arrive late and differ by centre", "Couples consult once and do not return", "A compliance miss can cost the licence", "Each new centre works its own way"],
    gains: ["Corporate and centre dashboards, live", "Automated follow ups that bring patients back", "ART Act checks enforced by the system", "Prices, discounts and protocols set centrally"],
    screen: "dashboard", metric: ["140+", "centres on one platform at Nova IVF"] },
  { slug: "specialist", icon: "stethoscope", title: "Fertility specialists", short: "More time with patients, less time on paperwork.",
    promise: "The full cycle on one screen, and advice that reaches the patient.",
    pains: ["Scans, labs and notes in different places", "Writing the same advice for every couple", "Patients calling to ask what a report means"],
    gains: ["Cycle summary, active and past cycles in one view", "Treatment advice and prescriptions as templates", "Medical summary and reports sent to the patient app", "Follow ups scheduled in two clicks"],
    screen: "emr", metric: ["1 view", "from consult to outcome"] },
  { slug: "embryologist", icon: "lab", title: "Embryologists and lab heads", short: "A lab record you can trust at any hour.",
    promise: "OPU, culture, transfer, vitrification and thaw, traceable and linked to the cycle.",
    pains: ["Double entry between lab sheets and the EMR", "Cryo and semen storage tracked on paper", "Limits checked from memory"],
    gains: ["OPU, culture and ET tabs on the cycle", "Vitrification and thaw worklists", "Semen collection, wash, freeze and inventory", "Embryo and egg limits enforced"],
    screen: "embryo", metric: ["1,00,000+", "embryo transfers recorded"] },
  { slug: "counsellor", icon: "heart", title: "Nurses and counsellors", short: "Patients who already know what to do next.",
    promise: "Reminders, education and follow ups that run themselves.",
    pains: ["Evenings spent on reminder calls", "Patients unsure what to carry or when to come", "No way to reach couples who stopped responding"],
    gains: ["Automated reminders before every visit", "Educational messages sent at the right moment", "Re engagement journeys for couples who drift", "Two way communication through the app"],
    screen: "whatsapp", metric: ["4", "channels: app, WhatsApp, SMS, email"] },
  { slug: "front-desk", icon: "desk", title: "Front desk", short: "No queues, no chasing, no confusion.",
    promise: "Appointments, registration, check in and bills that flow.",
    pains: ["Long queues at check in and billing", "Phones ringing for bookings and reports", "Couples registered twice"],
    gains: ["Online booking and QR self check in", "Couple and donor registration in one flow", "Digital bills paid in the app", "Reports patients can open themselves"],
    screen: "appointments", metric: ["\u201cEasiest\u201d", "IVF software a Nova IVF front desk has used"] },
  { slug: "centre-manager", icon: "building", title: "Centre managers", short: "A calm centre and a full diary.",
    promise: "Worklists, stock and KPIs for your centre at a glance.",
    pains: ["Critical drugs running out", "Tasks tracked in notebooks", "No clear view of no shows"],
    gains: ["Worklists for every team", "Indents with approval and stock transfers", "Appointment no show and KPI reports", "Discounts within set limits"],
    screen: "dashboard", metric: ["1 worklist", "for the whole centre day"] },
  { slug: "finance", icon: "billing", title: "Finance and purchase", short: "Clean billing and controlled buying.",
    promise: "Packages, discounts, refunds, purchase and GST under one set of rules.",
    pains: ["Package inclusions tracked by hand", "Discounts and refunds without limits", "Manual GST and ERP work"],
    gains: ["Package bills with selected inclusions", "Discount and refund limits set in masters", "PO, GRN and approvals with checklists", "GST reports and ERP integration"],
    screen: "billing", metric: ["Hub and spoke", "purchase centralised at Ferty9"] },
  { slug: "it", icon: "shield", title: "IT heads", short: "Secure, cloud based and live in one shot.",
    promise: "A platform your auditors and your users both trust.",
    pains: ["Migrations that stall for months", "Servers at every centre", "Patient apps that never sync"],
    gains: ["Cloud platform, ISO 27001 certified", "ABDM compliant, role based access", "White labelled app, synced by design", "Open integrations with Zoho, Tally, NetSuite and more"],
    screen: "trust", metric: ["One shot", "rollout across all IVF Access centres"] },
];

/* ---------- Clinic levels ---------- */
export const clinicLevels = [
  { slug: "single-clinic", icon: "home", label: "Single IVF clinic", size: "1 centre", plan: "Clinic",
    headline: "Look premium. Stay compliant. Grow without extra staff.",
    who: "Founder led clinics where a small team does everything.",
    focus: ["Complete EMR, lab, billing and pharmacy from day one", "Your own branded patient app", "Automated follow ups so no couple is forgotten", "ART Act checks that protect your licence"],
    proof: ["It is intuitive, tailored for fertility workflows, and ensures full ART compliance.", "Dr Rashmi Yogish, Khushi Fertility and IVF Centre"] },
  { slug: "growing-chain", icon: "branches", label: "Growing chain", size: "2 to 10 centres", plan: "Chain",
    headline: "Add centres without adding chaos.",
    who: "Groups opening new centres where standards and data start to drift.",
    focus: ["One patient record across every centre", "Hub and spoke workflows", "Central prices, discounts and purchase", "Group and centre dashboards"],
    proof: ["medics IVF streamlined our inventory and billing and centralised our operations with the hub and spoke model.", "Vishwaroop, Ferty9 Fertility Center"] },
  { slug: "enterprise-network", icon: "globe", label: "Enterprise network", size: "10+ centres", plan: "Enterprise",
    headline: "Proven at the scale of India's largest IVF network.",
    who: "National and international networks that need governance and a partner who can roll out fast.",
    focus: ["Runs 140+ centres at Nova IVF", "Centralised master data and roles", "One shot rollout with migration and training", "ERP and lab integrations"],
    proof: ["With over 130 centres, medics IVF has been instrumental in streamlining our operations.", "Mani KN, Nova IVF"] },
  { slug: "hospital-ivf", icon: "hospital", label: "Hospital IVF unit", size: "Inside a hospital", plan: "Enterprise",
    headline: "Fertility depth, inside your hospital system.",
    who: "Multispeciality and teaching hospitals running an IVF department.",
    focus: ["IVF cycles, andrology and embryology built in", "Day care, IP billing and discharge", "Connected to medics prime for the wider hospital", "One patient identity, one app"],
    proof: ["Twenty years of medics across 500+ hospitals and clinics.", "medics platform"] },
];

/* ---------- Comparison ---------- */
export const compareCols = ["medics IVF", "IVF record software", "Generic hospital software", "Standalone patient apps"];
export const compareRows = [
  ["Built for fertility workflows", ["yes", "yes", "no", "no"]],
  ["Full business operations: billing, pharmacy, purchase, GST", ["yes", "partial", "yes", "no"]],
  ["Branded patient app synced with EMR, lab and billing", ["yes", "partial", "partial", "partial"]],
  ["Automated follow ups on WhatsApp, SMS, email and app", ["yes", "partial", "no", "partial"]],
  ["ART Act checks enforced by the system", ["yes", "partial", "no", "no"]],
  ["One record across centres, hub and spoke", ["yes", "partial", "partial", "no"]],
  ["Proven at 100+ centres in India", ["yes", "no", "partial", "no"]],
  ["ISO 27001 certified and ABDM compliant", ["yes", "partial", "partial", "no"]],
];

export const plans = [
  { name: "Clinic", for: "Single IVF clinic", body: "The complete platform for one centre.", features: ["Clinical, lab and embryology", "Billing, pharmacy and inventory", "medics care branded app", "Automated follow ups", "Onboarding and support"] },
  { name: "Chain", for: "2 to 10 centres", featured: true, body: "Everything in Clinic, plus multi centre control.", features: ["One record across centres", "Hub and spoke workflows", "Central prices, discounts, purchase", "Group and centre analytics", "Centre wise engagement journeys"] },
  { name: "Enterprise", for: "10+ centres and hospitals", body: "Everything in Chain, plus scale and governance.", features: ["Master data governance", "ERP and lab integrations", "One shot rollout programme", "Dedicated success team", "medics prime connectivity"] },
];

export const steps = [
  { t: "See it on your workflows", b: "A 30 minute demo shaped around your clinic level and your current system." },
  { t: "Go live in one shot", b: "We migrate data, set up masters, protocols and your branded app, and train every role." },
  { t: "Grow with your patients", b: "Switch on follow up journeys, watch the dashboards, and add centres when ready." },
];

export const compliance = [
  ["Consent forms", "Digital consent at every configured stage."],
  ["Age checks", "Patient and donor age verified automatically."],
  ["Donor rules", "Donors can donate only once."],
  ["Embryo and egg limits", "Transfers, egg generation and ovum collection limited."],
  ["Aadhaar verification", "Built in, for compliant identification."],
];

export const timeline = [
  ["2006", "UBQ founded by a team of 9 from Siemens."],
  ["2008", "medics goes live on the cloud, multi tenant."],
  ["2011", "First GCC customers: LAMA Muscat and Al Safa Doha."],
  ["2014", "55 Haryana government hospitals, 17,400 beds."],
  ["2015", "Manipal Group teaching hospitals, around 4,000 beds."],
  ["2018", "medics grid connects hospitals to every service provider."],
  ["2020", "medics Data Exchange and open APIs."],
  ["2023", "medics IVF becomes a market leader. medics easy launches."],
  ["2025", "ISO 27001, ABDM compliance and the VOH award for best IVF tech."],
  ["2026", "The new medics IVF and medics care bring the patient into the platform."],
];

export const faqs = [
  { q: "Is medics IVF only an EMR?", a: "No. It runs the whole fertility business: clinical and lab, billing, pharmacy, purchase and inventory, patient engagement through medics care, and multi centre analytics." },
  { q: "What is medics care?", a: "Your clinic's own branded patient app and portal, plus automated follow ups on WhatsApp, SMS, email and push. Patients book, check in, pay, see reports and stay in touch with the care team." },
  { q: "Why not build our own patient app?", a: "Standalone apps rarely sync with billing, EMR, lab and pharmacy, and patients blame the clinic when they fail. medics care is connected to medics IVF from day one and is white labelled with your brand." },
  { q: "Is medics IVF compliant and secure?", a: "Yes. ART Act checks are built into the workflow. The platform is ISO 27001 certified and ABDM compliant, with role based access." },
  { q: "Can it run multiple centres?", a: "Yes. One record moves across centres, prices and limits are set centrally, and it runs 140+ centres at Nova IVF today." },
  { q: "How hard is it to switch?", a: "Our team migrates data, sets up masters and trains every role. IVF Access went live across all its centres in one shot." },
  { q: "Does it integrate with our systems?", a: "Yes. Zoho, Tally, Oracle NetSuite, Oracle Financial Services, SAP, SonoCare, Pine Labs, Neuberg Anand and WhatsApp, plus open APIs." },
  { q: "How is it priced?", a: "By clinic level and centres: Clinic, Chain and Enterprise. Book a demo for a clear written quote." },
];
