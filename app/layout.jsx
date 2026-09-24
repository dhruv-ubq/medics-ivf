import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PreviewBar from "@/components/PreviewBar";
import { draftMode } from "next/headers";
import { CmsProvider } from "@/lib/cms";
import { getPublishedContent, getDraftContent } from "@/lib/server/content";

// Pages are static and refreshed on publish (on-demand revalidation), with a 5 minute safety net.
export const revalidate = 300;

export const metadata = {
  metadataBase: new URL("https://www.medicsivf.in"),
  title: { default: "medics IVF | The complete IVF platform for clinics, chains and every patient", template: "%s | medics IVF" },
  description: "medics IVF runs clinical care, the lab, billing, compliance and every centre on one cloud platform, and gives each patient a companion app from first enquiry to follow up. Trusted by 350+ hospitals and clinics.",
  openGraph: { title: "medics IVF | The complete IVF platform", description: "One platform for your clinic, your chain and every couple you care for.", type: "website" },
};
export const viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }) {
  const preview = draftMode().isEnabled;
  let content = null;
  if (preview) content = await getDraftContent().catch(() => null);
  if (!content) content = await getPublishedContent();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CmsProvider value={content}>
          {preview && <PreviewBar />}
          <Nav />
          <main>{children}</main>
          <Footer />
        </CmsProvider>
      </body>
    </html>
  );
}
