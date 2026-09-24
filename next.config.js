/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const rawBase = (process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
const basePath = rawBase ? (rawBase.startsWith("/") ? rawBase.replace(/\/$/, "") : `/${rawBase.replace(/\/$/, "")}`) : "";

const nextConfig = {
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  optimizeFonts: false,
  images: { unoptimized: true },
  experimental: { serverComponentsExternalPackages: ["mongodb", "bcryptjs"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },
    ];
  },
};
module.exports = nextConfig;
