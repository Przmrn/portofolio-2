import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import CornerLabels from "@/components/CornerLabels";
import Nav from "@/components/Nav";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Ammar — Developer & Engineer",
  description: "Full-Stack Developer & Computer Vision Engineer, Banda Aceh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <CustomCursor />
          <CornerLabels />
          <Nav />
          {children}
          <SpeedInsights />
        </LenisProvider>
      </body>
    </html>
  );
}