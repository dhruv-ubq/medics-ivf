"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { BrandLogo, ClientMark, CertBadge, PersonPhoto } from "./Brandkit";
import { uid, bannerThemes, clientCategories, badgeKinds, DEFAULTS, SECTION_KEYS, SECTION_LABELS, CmsProvider } from "@/lib/store";

const TABS = [["brand", "Brand logo"], ["clients", "Client logos"], ["integrations", "Integrations"], ["certifications", "Certifications"], ["testimonials", "Testimonials"], ["banners", "Banners"], ["review", "Review and publish"]];

const AdminCtx = createContext(null);
function useItem(key) { return useContext(AdminCtx).data[key] ?? DEFAULTS[key]; }

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

async function api(url, opts = {}) {
  const fullUrl = url.startsWith("/") && base ? `${base}${url}` : url;
  const r = await fetch(fullUrl, { ...opts, headers: { ...(opts.body && !(opts.body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...(opts.headers || {}) } });
  if (r.status === 401) { window.location.assign(`${base}/admin/login?next=${encodeURIComponent(`${base}/admin`)}`); throw new Error("Signed out"); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Request failed");
  return j;
}

// Resize large raster images in the browser, then upload to the media library.
async function toUploadBlob(file, maxW) {
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    if (img.width <= maxW) return file;
    const c = document.createElement("canvas"); c.width = maxW; c.height = Math.round(img.height * (maxW / img.width));
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    const type = file.type === "image/png" ? "image/png" : "image/webp";
    const blob = await new Promise((res) => c.toBlob(res, type, 0.88));
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + (type === "image/png" ? ".png" : ".webp"), { type });
  } finally { URL.revokeObjectURL(url); }
}

export default function AdminStudio({ user, permissions = [] }) {
  const [tab, setTab] = useState("clients");
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState({});
  const [status, setStatus] = useState({});
  const [toast, setToast] = useState("");
  const timers = useRef({});
  const canPublish = permissions.includes("content:publish");

  const flash = useCallback((m) => { setToast(m); clearTimeout(window.__mivT); window.__mivT = setTimeout(() => setToast(""), 2600); }, []);
  const load = useCallback(async (keepData) => {
    const j = await api("/api/admin/content");
    setMeta(Object.fromEntries(j.sections.map((x) => [x.key, x])));
    if (!keepData) setData(Object.fromEntries(j.sections.map((x) => [x.key, x.draft])));
  }, []);
  useEffect(() => { load().catch((e) => flash(e.message)); }, [load, flash]);
  useEffect(() => {
    const warn = (e) => { if (Object.values(status).some((v) => v === "saving" || v === "pending")) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn);
  }, [status]);

  // Autosave: every change is saved as a draft shortly after you stop editing.
  const save = useCallback((key, val) => {
    setData((d) => ({ ...d, [key]: val }));
    setStatus((s) => ({ ...s, [key]: "pending" }));
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(async () => {
      setStatus((s) => ({ ...s, [key]: "saving" }));
      try { await api(`/api/admin/content/${key}`, { method: "PUT", body: JSON.stringify({ data: val }) }); setStatus((s) => ({ ...s, [key]: "saved" })); load(true).catch(() => {}); }
      catch (e) { setStatus((s) => ({ ...s, [key]: "error" })); flash(e.message); }
    }, 700);
  }, [flash, load]);
  const reset = (key) => save(key, DEFAULTS[key]);
  const upload = useCallback(async (file, maxW = 1200) => {
    try {
      const fd = new FormData(); fd.append("file", await toUploadBlob(file, maxW));
      const j = await api("/api/admin/media", { method: "POST", body: fd });
      flash("Image uploaded"); return j.url;
    } catch (e) { flash(e.message); throw e; }
  }, [flash]);

  if (!data) return <div className="grid min-h-[60vh] place-items-center bg-lavender text-body-muted">Loading content...</div>;
  const pending = SECTION_KEYS.filter((k) => meta[k]?.hasChanges).length;
  const busy = Object.values(status).some((v) => v === "saving" || v === "pending");
  const hasError = Object.values(status).includes("error");
  const ctx = { save, flash, upload, reset };
  const signOut = async () => { await fetch(`${base}/api/auth/logout`, { method: "POST" }); window.location.assign(`${base}/admin/login`); };

  return (
    <AdminCtx.Provider value={{ data, meta, reload: load, canPublish }}>
      <div className="min-h-screen bg-lavender">
        <div className="container-x py-8 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-purple">Content studio</p>
              <h1 className="display-lg mt-2">Manage what the website shows</h1>
              <p className="mt-2 max-w-2xl text-[15px] text-body-muted">Changes save automatically as a draft. Preview the draft on the real site, then publish when it is ready. Visitors only ever see published content.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`chip ${hasError ? "bg-peach text-orange" : busy ? "bg-sky text-blue" : "bg-mint text-green"}`}>{hasError ? "Save failed" : busy ? "Saving..." : "All changes saved"}</span>
              <a href={`${base}/api/admin/preview?to=/`} target="_blank" rel="noopener" className="btn-outline px-4 py-2 text-[14px]">Preview draft</a>
              <button onClick={() => setTab("review")} className="btn-dark px-4 py-2 text-[14px]">Review and publish{pending ? ` (${pending})` : ""}</button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-body-muted">
            <span>Signed in as <b className="text-ink">{user?.name || user?.email}</b> · {user?.role}</span>
            <button onClick={signOut} className="font-semibold text-orange">Sign out</button>
            <a href={base || "/"} className="font-semibold text-ink">View live site</a>
          </div>

          <div className="no-scrollbar mt-6 flex gap-1 overflow-x-auto rounded-pill border border-hairline bg-white p-1.5">
            {TABS.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`relative shrink-0 rounded-pill px-4 py-2 font-display text-[14px] font-semibold transition ${tab === k ? "bg-ink text-white" : "text-ink hover:bg-cream"}`}>{l}{meta[k]?.hasChanges && <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-orange align-middle" title="Unpublished changes" />}</button>)}
          </div>

          <CmsProvider value={data}>
            <div className="mt-6">
              {tab === "brand" && <BrandTab {...ctx} />}
              {tab === "clients" && <ListTab {...ctx} storeKey="clients" title="Client logos" hint="PNG or SVG with a transparent background works best. Logos show in the home page marquee and on the Customers page. Without an image, a clean name tile is shown." categories={clientCategories} preview={(x) => <ClientMark item={x} size="sm" />} blank={() => ({ id: uid("c"), name: "New client", category: "clinics", image: "" })} bulk />}
              {tab === "integrations" && <ListTab {...ctx} storeKey="integrations" title="Integration logos" hint="Shown on the home page and Platform page." preview={(x) => x.image ? <img src={x.image} alt="" className="h-12 w-12 object-contain" /> : <span className="font-display text-[13px] font-bold text-ink">{x.name}</span>} blank={() => ({ id: uid("i"), name: "New integration", image: "" })} bulk />}
              {tab === "certifications" && <ListTab {...ctx} storeKey="certifications" title="Certifications and awards" hint="Shown in the footer, home page, Trust and About pages. Upload the official artwork, or keep the built in badge." badges preview={(x) => <CertBadge item={x} size={52} />} blank={() => ({ id: uid("cert"), title: "New certification", subtitle: "Short description", badge: "iso", image: "" })} />}
              {tab === "testimonials" && <TestimonialsTab {...ctx} />}
              {tab === "banners" && <BannersTab {...ctx} />}
              {tab === "review" && <ReviewTab flash={flash} />}
            </div>
          </CmsProvider>
        </div>
        {toast && <div role="status" className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-pill bg-ink px-5 py-3 text-[14px] font-semibold text-white shadow-float">{toast}</div>}
        <style jsx global>{`
          .in{width:100%;border-radius:10px;border:1px solid #e8e6ef;background:#fff;padding:9px 12px;font-size:14px;color:#0b1846}
          .in:focus{outline:none;border-color:#ff6700;box-shadow:0 0 0 3px rgba(255,103,0,.12)}
          .lab{display:block;margin-bottom:5px;font-size:12px;font-weight:600;color:#6b7088}
        `}</style>
      </div>
    </AdminCtx.Provider>
  );
}

/* ---------- shared bits ---------- */
function Upload({ label = "Upload", onFile, multiple = false, accept = "image/*", small = false }) {
  return (
    <span className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-pill border border-line-strong bg-white font-display font-semibold text-ink transition hover:border-ink ${small ? "px-3 py-1.5 text-[12.5px]" : "px-4 py-2 text-[13.5px]"}`}>
      <Icon name="upload" size={small ? 13 : 15} />{label}
      <input type="file" accept={accept} multiple={multiple} className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => { const fs = Array.from(e.target.files || []); e.target.value = ""; if (fs.length) Promise.resolve().then(() => onFile(multiple ? fs : fs[0])).catch(() => {}); }} />
    </span>
  );
}
function IconBtn({ icon, label, onClick, danger, rot = "" }) {
  return <button type="button" onClick={onClick} aria-label={label} title={label} className={`grid h-8 w-8 place-items-center rounded-lg border border-hairline bg-white transition ${danger ? "text-body-muted hover:border-orange hover:text-orange" : "text-ink hover:border-ink"}`}><Icon name={icon} size={14} className={rot} /></button>;
}
function Panel({ children, className = "" }) { return <div className={`rounded-3xl border border-hairline bg-white p-5 md:p-6 ${className}`}>{children}</div>; }
const move = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return arr; const c = [...arr]; [c[i], c[j]] = [c[j], c[i]]; return c; };

/* ---------- Brand ---------- */
function BrandTab({ save, flash, upload, reset }) {
  const b = useItem("brand");
  const set = (p) => save("brand", { ...b, ...p });
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <Panel>
        <p className="heading-sm">Website logo</p>
        <p className="mt-1 text-[14px] text-body-muted">Used in the header and footer on every page. SVG or a transparent PNG, at least 120 px tall, works best.</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Upload label={b.logo ? "Replace logo" : "Upload logo"} onFile={async (f) => { set({ logo: await upload(f, 600) }); flash("Logo updated"); }} />
          {b.logo && <button onClick={() => { set({ logo: "" }); flash("Default logo restored"); }} className="text-[13.5px] font-semibold text-orange">Use default mark</button>}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label><span className="lab">Name shown beside the logo</span><input className="in" value={b.name} onChange={(e) => set({ name: e.target.value })} /></label>
          <label><span className="lab">Logo height: {b.logoHeight}px</span><input type="range" min="20" max="56" value={b.logoHeight} onChange={(e) => set({ logoHeight: +e.target.value })} className="mt-3 w-full accent-orange" /></label>
        </div>
        <label className="mt-4 flex items-center gap-2 text-[14px] text-ink"><input type="checkbox" checked={b.showWordmark} onChange={(e) => set({ showWordmark: e.target.checked })} className="h-4 w-4 accent-orange" />Show the name next to an uploaded logo</label>
        <button onClick={() => { reset("brand"); flash("Brand reset to default (draft)"); }} className="mt-5 text-[13.5px] font-semibold text-body-muted hover:text-ink">Reset brand to default</button>
      </Panel>
      <Panel className="flex flex-col justify-center gap-6">
        <p className="eyebrow text-body-muted">Preview</p>
        <div className="rounded-2xl border border-hairline bg-white px-5 py-4"><BrandLogo /></div>
        <div className="rounded-2xl bg-ink px-5 py-4"><BrandLogo dark /></div>
      </Panel>
    </div>
  );
}

/* ---------- Generic list manager: clients, integrations, certifications ---------- */
function ListTab({ save, flash, upload, reset, storeKey, title, hint, categories, preview, blank, bulk, badges }) {
  const list = useItem(storeKey);
  const [q, setQ] = useState("");
  const put = (l) => save(storeKey, l);
  const patch = (id, p) => put(list.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const addFiles = async (files) => {
    const items = [];
    for (const f of files) items.push({ ...blank(), name: f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "), image: await upload(f, 480) });
    put([...list, ...items]); flash(`${items.length} logo${items.length > 1 ? "s" : ""} added`);
  };
  const shown = list.filter((x) => (x.name || x.title || "").toLowerCase().includes(q.toLowerCase()));
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto"><p className="heading-sm">{title} <span className="text-body-muted">({list.length})</span></p><p className="mt-1 max-w-xl text-[13.5px] text-body-muted">{hint}</p></div>
        {bulk && <Upload label="Upload logos" multiple onFile={addFiles} />}
        <button onClick={() => { put([...list, blank()]); flash("Added. Edit it below."); }} className="btn-primary px-4 py-2 text-[13.5px]"><Icon name="plus" size={15} />Add</button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input className="in max-w-xs" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => { if (confirm("Replace this list with the defaults? This becomes a draft you can review before publishing.")) { reset(storeKey); flash("Defaults restored as a draft"); } }} className="text-[13px] font-semibold text-body-muted hover:text-ink">Restore defaults</button>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((x) => { const i = list.indexOf(x); return (
          <div key={x.id} className="rounded-2xl border border-hairline p-4">
            <div className="grid h-20 place-items-center rounded-xl bg-cream px-3">{preview(x)}</div>
            <div className="mt-3 grid gap-2">
              {badges ? (<>
                <input className="in" value={x.title} onChange={(e) => patch(x.id, { title: e.target.value })} placeholder="Title" />
                <input className="in" value={x.subtitle} onChange={(e) => patch(x.id, { subtitle: e.target.value })} placeholder="Subtitle" />
                <select className="in" value={x.badge} onChange={(e) => patch(x.id, { badge: e.target.value })}>{badgeKinds.map(([k, l]) => <option key={k} value={k}>Built in badge: {l}</option>)}</select>
              </>) : <input className="in" value={x.name} onChange={(e) => patch(x.id, { name: e.target.value })} placeholder="Name" />}
              {categories && <select className="in" value={x.category} onChange={(e) => patch(x.id, { category: e.target.value })}>{categories.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Upload small label={x.image ? "Replace" : "Image"} onFile={async (f) => { patch(x.id, { image: await upload(f, 480) }); flash("Image updated"); }} />
              {x.image && <button onClick={() => patch(x.id, { image: "" })} className="px-1 text-[12.5px] font-semibold text-orange">Remove image</button>}
              <span className="ml-auto flex gap-1"><IconBtn icon="arrow" rot="-rotate-90" label="Move up" onClick={() => put(move(list, i, -1))} /><IconBtn icon="arrow" rot="rotate-90" label="Move down" onClick={() => put(move(list, i, 1))} /><IconBtn icon="trash" danger label="Delete" onClick={() => { put(list.filter((y) => y.id !== x.id)); flash("Deleted"); }} /></span>
            </div>
          </div>); })}
      </div>
    </Panel>
  );
}

/* ---------- Testimonials ---------- */
function TestimonialsTab({ save, flash, upload, reset }) {
  const list = useItem("testimonials");
  const put = (l) => save("testimonials", l);
  const patch = (id, p) => put(list.map((x) => (x.id === id ? { ...x, ...p } : x)));
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto"><p className="heading-sm">Picture testimonials <span className="text-body-muted">({list.length})</span></p><p className="mt-1 max-w-xl text-[13.5px] text-body-muted">Upload a portrait photo (square or 4:5, at least 600 px) and optionally the clinic's logo. The first testimonial is featured first.</p></div>
        <button onClick={() => { put([{ id: uid("t"), quote: "Write the customer's words here.", name: "Customer name", role: "Role", org: "Clinic name", tag: "Customer", photo: "", logo: "" }, ...list]); flash("Added at the top"); }} className="btn-primary px-4 py-2 text-[13.5px]"><Icon name="plus" size={15} />Add testimonial</button>
        <button onClick={() => { if (confirm("Replace testimonials with the defaults? This becomes a draft.")) { reset("testimonials"); flash("Defaults restored as a draft"); } }} className="text-[13px] font-semibold text-body-muted hover:text-ink">Restore defaults</button>
      </div>
      <div className="mt-5 space-y-4">
        {list.map((t, i) => (
          <div key={t.id} className="grid gap-4 rounded-2xl border border-hairline p-4 md:grid-cols-[150px_1fr]">
            <div>
              <PersonPhoto item={t} className="aspect-[4/5] w-full" />
              <div className="mt-2 flex flex-wrap gap-1.5"><Upload small label={t.photo ? "Replace photo" : "Photo"} onFile={async (f) => { patch(t.id, { photo: await upload(f, 700) }); flash("Photo updated"); }} />{t.photo && <button onClick={() => patch(t.id, { photo: "" })} className="text-[12.5px] font-semibold text-orange">Remove</button>}</div>
            </div>
            <div className="grid gap-2.5">
              <textarea rows={3} className="in resize-y" value={t.quote} onChange={(e) => patch(t.id, { quote: e.target.value })} />
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                <label><span className="lab">Name</span><input className="in" value={t.name} onChange={(e) => patch(t.id, { name: e.target.value })} /></label>
                <label><span className="lab">Role</span><input className="in" value={t.role} onChange={(e) => patch(t.id, { role: e.target.value })} /></label>
                <label><span className="lab">Clinic</span><input className="in" value={t.org} onChange={(e) => patch(t.id, { org: e.target.value })} /></label>
                <label><span className="lab">Tag</span><input className="in" value={t.tag} onChange={(e) => patch(t.id, { tag: e.target.value })} /></label>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12.5px] text-body-muted">Clinic logo:</span>{t.logo && <img src={t.logo} alt="" className="h-7 w-auto" />}
                <Upload small label={t.logo ? "Replace" : "Upload"} onFile={async (f) => { patch(t.id, { logo: await upload(f, 300) }); flash("Logo added"); }} />
                {t.logo && <button onClick={() => patch(t.id, { logo: "" })} className="text-[12.5px] font-semibold text-orange">Remove</button>}
                <span className="ml-auto flex gap-1"><IconBtn icon="arrow" rot="-rotate-90" label="Move up" onClick={() => put(move(list, i, -1))} /><IconBtn icon="arrow" rot="rotate-90" label="Move down" onClick={() => put(move(list, i, 1))} /><IconBtn icon="trash" danger label="Delete" onClick={() => { put(list.filter((y) => y.id !== t.id)); flash("Deleted"); }} /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ---------- Banners ---------- */
function BannersTab({ save, flash, upload, reset }) {
  const list = useItem("banners");
  const put = (l) => save("banners", l);
  const patch = (id, p) => put(list.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const now = Date.now();
  const status = (b) => !b.enabled ? ["Off", "bg-[#f1f0f5] text-body-muted"] : b.end && new Date(b.end).getTime() < now ? ["Expired", "bg-[#f1f0f5] text-body-muted"] : b.start && new Date(b.start).getTime() > now ? ["Scheduled", "bg-sky text-blue"] : b.mode === "artwork" && !b.image ? ["Needs image", "bg-peach text-orange"] : ["Live", "bg-mint text-green"];
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto"><p className="heading-sm">Home page banners</p><p className="mt-1 max-w-xl text-[13.5px] text-body-muted">Shown in the "Proven at scale" section. Designed artwork (desktop 1920 x 640, mobile 800 x 1000) or text on a brand background. Schedule start and end times, or leave empty to show always.</p></div>
        <button onClick={() => put([...list, { id: uid("b"), mode: "text", kicker: "New", title: "Your headline", subtitle: "A short supporting line.", theme: "hero", image: "", mobileImage: "", link: "", ctaLabel: "Book a demo", ctaHref: "/demo", cta2Label: "", cta2Href: "", start: "", end: "", enabled: true }])} className="btn-primary px-4 py-2 text-[13.5px]"><Icon name="plus" size={15} />Add banner</button>
      </div>
      <div className="mt-5 space-y-4">
        {list.map((b, i) => { const [st, sc] = status(b); const th = bannerThemes[b.theme] || bannerThemes.hero; return (
          <div key={b.id} className="rounded-2xl border border-hairline p-4">
            <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-3">
              <span className={`chip ${sc}`}>{st}</span><b className="font-display text-[14px] text-ink">Banner {i + 1}</b>
              <div className="ml-2 flex rounded-pill bg-cream p-0.5">{[["text", "Text"], ["artwork", "Artwork"]].map(([k, l]) => <button key={k} onClick={() => patch(b.id, { mode: k })} className={`rounded-pill px-3 py-1 text-[12.5px] font-semibold ${b.mode === k ? "bg-ink text-white" : "text-ink"}`}>{l}</button>)}</div>
              <span className="ml-auto flex items-center gap-1.5"><label className="flex items-center gap-1.5 text-[13px] text-ink"><input type="checkbox" checked={b.enabled} onChange={(e) => patch(b.id, { enabled: e.target.checked })} className="h-4 w-4 accent-orange" />On</label><IconBtn icon="arrow" rot="-rotate-90" label="Move up" onClick={() => put(move(list, i, -1))} /><IconBtn icon="arrow" rot="rotate-90" label="Move down" onClick={() => put(move(list, i, 1))} /><IconBtn icon="trash" danger label="Delete" onClick={() => put(list.filter((y) => y.id !== b.id))} /></span>
            </div>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
              <div className="grid content-start gap-2.5">
                {b.mode === "artwork" ? (<>
                  <div className="flex flex-wrap items-center gap-2"><span className="lab mb-0">Desktop artwork</span><Upload small label={b.image ? "Replace" : "Upload"} onFile={async (f) => patch(b.id, { image: await upload(f, 2000) })} />{b.image && <button onClick={() => patch(b.id, { image: "" })} className="text-[12.5px] font-semibold text-orange">Remove</button>}</div>
                  <div className="flex flex-wrap items-center gap-2"><span className="lab mb-0">Mobile artwork</span><Upload small label={b.mobileImage ? "Replace" : "Upload"} onFile={async (f) => patch(b.id, { mobileImage: await upload(f, 900) })} />{b.mobileImage && <button onClick={() => patch(b.id, { mobileImage: "" })} className="text-[12.5px] font-semibold text-orange">Remove</button>}</div>
                  <label><span className="lab">Alt text</span><input className="in" value={b.title} onChange={(e) => patch(b.id, { title: e.target.value })} /></label>
                  <label><span className="lab">Click through link</span><input className="in" value={b.link} onChange={(e) => patch(b.id, { link: e.target.value })} placeholder="/demo or https://" /></label>
                </>) : (<>
                  <div className="grid gap-2.5 sm:grid-cols-[0.6fr_1.4fr]"><label><span className="lab">Kicker</span><input className="in" value={b.kicker} onChange={(e) => patch(b.id, { kicker: e.target.value })} /></label><label><span className="lab">Title</span><input className="in" value={b.title} onChange={(e) => patch(b.id, { title: e.target.value })} /></label></div>
                  <label><span className="lab">Subtitle</span><input className="in" value={b.subtitle} onChange={(e) => patch(b.id, { subtitle: e.target.value })} /></label>
                  <div className="grid gap-2.5 sm:grid-cols-2"><label><span className="lab">Button</span><input className="in" value={b.ctaLabel} onChange={(e) => patch(b.id, { ctaLabel: e.target.value })} /></label><label><span className="lab">Button link</span><input className="in" value={b.ctaHref} onChange={(e) => patch(b.id, { ctaHref: e.target.value })} /></label></div>
                  <label><span className="lab">Theme</span><select className="in" value={b.theme} onChange={(e) => patch(b.id, { theme: e.target.value })}>{Object.entries(bannerThemes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></label>
                </>)}
                <div className="grid gap-2.5 sm:grid-cols-2"><label><span className="lab">Show from</span><input type="datetime-local" className="in" value={b.start} onChange={(e) => patch(b.id, { start: e.target.value })} /></label><label><span className="lab">Show until</span><input type="datetime-local" className="in" value={b.end} onChange={(e) => patch(b.id, { end: e.target.value })} /></label></div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-hairline">
                {b.mode === "artwork" ? (b.image ? <img src={b.image} alt="" className="block w-full" /> : <p className="grid h-full min-h-[140px] place-items-center p-6 text-center text-[13px] text-body-muted">Upload artwork to preview</p>) : (
                  <div className={`h-full p-5 ${th.className}`}><span className={`chip ${th.dark ? "bg-white/10 text-white" : "bg-white text-orange"}`}>{b.kicker}</span><p className={`mt-2 font-display text-[19px] font-semibold ${th.dark ? "text-white" : "text-ink"}`}>{b.title}</p><p className={`mt-1 text-[13px] ${th.dark ? "text-white/75" : "text-body"}`}>{b.subtitle}</p>{b.ctaLabel && <span className={`mt-3 inline-block rounded-pill px-3 py-1.5 text-[12.5px] font-semibold ${th.dark ? "bg-white text-ink" : "bg-ink text-white"}`}>{b.ctaLabel}</span>}</div>)}
              </div>
            </div>
          </div>); })}
      </div>
    </Panel>
  );
}

/* ---------- Review and publish ---------- */
function fmt(d) { return d ? new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Never"; }
function ReviewTab({ flash }) {
  const { meta, reload, canPublish } = useContext(AdminCtx);
  const changed = SECTION_KEYS.filter((k) => meta[k]?.hasChanges);
  const [sel, setSel] = useState(changed);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(null);
  const [versions, setVersions] = useState([]);
  const [log, setLog] = useState([]);
  useEffect(() => { setSel(SECTION_KEYS.filter((k) => meta[k]?.hasChanges)); }, [meta]);
  const loadLog = useCallback(() => api("/api/admin/audit").then((j) => setLog(j.entries)).catch(() => {}), []);
  useEffect(() => { loadLog(); }, [loadLog]);

  const publishNow = async () => {
    setBusy(true);
    try { const j = await api("/api/admin/publish", { method: "POST", body: JSON.stringify({ keys: sel, note }) }); flash(j.published.length ? `Published ${j.published.length} section${j.published.length > 1 ? "s" : ""}. The live site is updating.` : "Nothing to publish"); setNote(""); await reload(true); loadLog(); }
    catch (e) { flash(e.message); } finally { setBusy(false); }
  };
  const discard = async (k) => {
    if (!confirm(`Discard unpublished changes to ${SECTION_LABELS[k]}? The draft goes back to what is live.`)) return;
    try { await api(`/api/admin/content/${k}/discard`, { method: "POST" }); await reload(false); flash("Draft discarded"); loadLog(); } catch (e) { flash(e.message); }
  };
  const history = async (k) => {
    if (open === k) { setOpen(null); return; }
    setOpen(k); setVersions([]);
    try { const j = await api(`/api/admin/content/${k}/versions`); setVersions(j.versions); } catch (e) { flash(e.message); }
  };
  const restore = async (k, v) => {
    if (!confirm(`Load version ${v} of ${SECTION_LABELS[k]} into the draft? You can review it before publishing.`)) return;
    try { await api(`/api/admin/content/${k}/restore`, { method: "POST", body: JSON.stringify({ version: v }) }); await reload(false); flash(`Version ${v} loaded as a draft`); loadLog(); } catch (e) { flash(e.message); }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="heading-sm">Review and publish</p><p className="mt-1 max-w-xl text-[14px] text-body-muted">Drafts are private. Publishing makes the selected sections live for every visitor within seconds, and saves a version you can roll back to.</p></div>
          <a href={`${base}/api/admin/preview?to=/`} target="_blank" rel="noopener" className="btn-outline px-4 py-2 text-[13.5px]">Preview draft site</a>
        </div>
        <div className="mt-5 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline">
          {SECTION_KEYS.map((k) => { const m = meta[k] || {}; return (
            <div key={k} className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <input type="checkbox" disabled={!m.hasChanges || !canPublish} checked={sel.includes(k)} onChange={(e) => setSel((s) => e.target.checked ? [...s, k] : s.filter((x) => x !== k))} className="h-4 w-4 accent-orange" aria-label={`Select ${SECTION_LABELS[k]}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] font-semibold text-ink">{SECTION_LABELS[k]} <span className={`chip ml-2 ${m.hasChanges ? "bg-peach text-orange" : "bg-mint text-green"}`}>{m.hasChanges ? "Unpublished changes" : "Live"}</span></p>
                  <p className="mt-0.5 text-[12.5px] text-body-muted">Live version {m.version || 0} · published {fmt(m.publishedAt)}{m.publishedBy ? ` by ${m.publishedBy}` : ""} · last edit {fmt(m.updatedAt)}{m.updatedBy ? ` by ${m.updatedBy}` : ""}</p>
                </div>
                {m.hasChanges && <button onClick={() => discard(k)} className="text-[13px] font-semibold text-body-muted hover:text-orange">Discard draft</button>}
                <button onClick={() => history(k)} className="text-[13px] font-semibold text-ink">{open === k ? "Hide history" : "History"}</button>
              </div>
              {open === k && (
                <div className="mt-3 rounded-xl bg-cream p-3">
                  {versions.length ? versions.map((v) => (
                    <div key={v.version} className="flex flex-wrap items-center gap-3 border-b border-hairline py-2 text-[13px] last:border-0">
                      <b className="text-ink">v{v.version}</b><span className="text-body-muted">{fmt(v.publishedAt)} by {v.publishedBy}</span>{v.note && <span className="text-ink">"{v.note}"</span>}
                      <button onClick={() => restore(k, v.version)} className="ml-auto font-semibold text-orange">Load into draft</button>
                    </div>)) : <p className="text-[13px] text-body-muted">No published versions yet.</p>}
                </div>
              )}
            </div>); })}
        </div>
        {canPublish ? (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input className="in max-w-md flex-1" placeholder="What changed? (optional, saved with the version)" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} />
            <button disabled={!sel.length || busy} onClick={publishNow} className="btn-primary px-5 py-2.5 text-[14px] disabled:opacity-50">{busy ? "Publishing..." : `Publish ${sel.length || ""} section${sel.length === 1 ? "" : "s"}`}</button>
          </div>
        ) : <p className="mt-5 rounded-xl bg-sky px-4 py-3 text-[14px] text-blue">Your role can save drafts. Ask an administrator to publish.</p>}
      </Panel>
      <Panel>
        <p className="heading-sm">Recent activity</p>
        <ul className="mt-4 space-y-3">
          {log.length ? log.map((e) => (
            <li key={e._id} className="text-[13px]"><b className="text-ink">{e.user}</b> <span className="text-body">{({ "draft.save": "edited", "draft.discard": "discarded the draft of", "draft.restore": `loaded v${e.version} of`, publish: `published v${e.version} of`, seed: "set up the initial site content" })[e.action] || e.action} {e.action === "seed" ? "" : SECTION_LABELS[e.key] || e.key}</span><br /><span className="text-body-muted">{fmt(e.at)}</span></li>
          )) : <li className="text-[13px] text-body-muted">No activity yet.</li>}
        </ul>
      </Panel>
    </div>
  );
}
