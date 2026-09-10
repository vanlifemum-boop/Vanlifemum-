import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Vanlifemum — Reisen mit Kind",
  description:
    "Reisen mit Kind, ehrlich erzählt: Reiseziele in Europa mit Stellplatz, bester Reisezeit und Beiträgen aus dem Van.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
