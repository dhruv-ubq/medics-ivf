"use client";
import { usePathname } from "next/navigation";
export default function PreviewBar() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const path = usePathname();
  return (
    <div className="sticky top-0 z-[60] flex flex-wrap items-center justify-center gap-3 bg-orange px-4 py-2 text-[13.5px] font-semibold text-white">
      <span>Draft preview: you are seeing unpublished changes.</span>
      <a href={`${base}/admin`} className="rounded-pill bg-white/20 px-3 py-1 hover:bg-white/30">Back to studio</a>
      <a href={`${base}/api/admin/preview?on=0&to=${encodeURIComponent(path)}`} className="rounded-pill bg-white px-3 py-1 text-orange">Exit preview</a>
    </div>
  );
}
