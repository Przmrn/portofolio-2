import "./globals.css";
import { IBM_Plex_Mono, Be_Vietnam_Pro, Inter, Archivo_Black } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* ── Fonts ──────────────────────────────────────────────────────────── */

/* Display — Archivo Black (FK Raster Grotesk substitute) */
const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo",
  display: "swap",
});

/* Mono — IBM Plex Mono for labels, tags, metadata */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/* Body — Be Vietnam Pro */
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-be-vietnam",
  display: "swap",
});

/* Button — Inter Medium */
const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
  display: "swap",
});

/* ── Metadata ───────────────────────────────────────────────────────── */
export const metadata = {
  title: "Ammar — Full-Stack Developer & Computer Vision Engineer",
  description:
    "Portfolio of Ammar, a full-stack developer and computer vision engineer based in Banda Aceh, Indonesia. Building systems that ship.",
};

/* ── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${ibmPlexMono.variable} ${beVietnam.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>{children}<SpeedInsights /></body>
    </html>
  );
}