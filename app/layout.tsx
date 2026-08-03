import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scroll Morph Hero",
  description:
    "A scroll-driven morphing hero animation built with Next.js and Framer Motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
