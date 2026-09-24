import { z } from "zod";

// Images must be uploaded media (/api/media/...), bundled assets (/brand/...) or https URLs. No inline data.
const img = z.string().max(500).refine((v) => v === "" || v.startsWith("/api/media/") || v.startsWith("/brand/") || v.startsWith("https://"), "Upload the image instead of pasting it");
const txt = (n) => z.string().max(n);
const id = z.string().min(1).max(80);
const link = z.string().max(300).refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://") || v.startsWith("#"), "Links must start with / or https://");
const dt = z.string().max(40).refine((v) => v === "" || !Number.isNaN(Date.parse(v)), "Invalid date");

export const SCHEMAS = {
  brand: z.object({ name: txt(60), logo: img, logoHeight: z.number().int().min(16).max(80), showWordmark: z.boolean() }).strict(),
  clients: z.array(z.object({ id, name: txt(80), category: z.enum(["chains", "clinics", "hospitals", "international"]), image: img }).strict()).max(200),
  integrations: z.array(z.object({ id, name: txt(80), image: img }).strict()).max(100),
  certifications: z.array(z.object({ id, title: txt(80), subtitle: txt(140), badge: z.enum(["iso", "abdm", "art", "award", "years"]), image: img }).strict()).max(30),
  testimonials: z.array(z.object({ id, quote: txt(700), name: txt(80), role: txt(100), org: txt(120), tag: txt(40), photo: img, logo: img }).strict()).max(60),
  banners: z.array(z.object({
    id, mode: z.enum(["text", "artwork"]), kicker: txt(40), title: txt(140), subtitle: txt(240), theme: z.enum(["hero", "cream", "lavender", "peach", "sky", "mint"]),
    image: img, mobileImage: img, link, ctaLabel: txt(40), ctaHref: link, cta2Label: txt(40), cta2Href: link, start: dt, end: dt, enabled: z.boolean(),
  }).strict()).max(20),
};

export function validateSection(key, data) {
  const schema = SCHEMAS[key];
  if (!schema) return { ok: false, error: "Unknown section" };
  const r = schema.safeParse(data);
  if (!r.success) {
    const i = r.error.issues[0];
    return { ok: false, error: `${i.path.join(".") || key}: ${i.message}` };
  }
  return { ok: true, data: r.data };
}
