import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../fonts/manrope-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../fonts/manrope-latin-ext-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA — Meet the Machine That Lives With You",
  description:
    "Humanoid intelligence designed to move through the world with you. AURA Robotics is building intelligent machines for a more human future.",
  openGraph: {
    title: "AURA — Meet the Machine That Lives With You",
    description:
      "Humanoid intelligence designed to move through the world with you.",
    siteName: "AURA Robotics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
