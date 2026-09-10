import "./globals.css";
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
        <SpeedInsights />
      </body>
    </html>
  );
}
