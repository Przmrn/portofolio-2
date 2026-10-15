import "./globals.css";
import Script from "next/script";
import { Inter, Raleway } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* ── Fonts ────────────────────────────────────────────────────────────
   Roobert substitute: Inter (weights 300 whisper → 600 anchor)
   Raleway: heading accent only, used sparingly
--------------------------------------------------------------------- */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
  display: "swap",
});

/* ── Metadata ───────────────────────────────────────────────────────── */
export const metadata = {
  title: "Ammar — Built, Unbound · Full-Stack & Computer Vision",
  description:
    "Portfolio of Ammar, full-stack developer and computer vision engineer based in Banda Aceh, Indonesia. Building systems that work — code that ships.",
};

/* ── Viewport ───────────────────────────────────────────────────────── */
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body suppressHydrationWarning>
        {children}
        {/* Vanta.js hero background — p5 first (head), topology effect after.
            Local files (npm registry unreachable): public/scripts/*. */}
        <Script src="/scripts/p5.min.js" strategy="beforeInteractive" />
        <Script src="/scripts/vanta.topology.v2.js" strategy="afterInteractive" />
        <SpeedInsights />
      </body>
    </html>
  );
}
