import type { Metadata } from "next";
import { Montserrat, Syne } from "next/font/google";
import { site } from "@/lib/site-data";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Meralux Garage | Car Wrapping & PPF Madrid",
  description: site.description,
  openGraph: {
    title: "Meralux Garage",
    description: "Car Wrapping & PPF Madrid",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${syne.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#050505] font-sans antialiased">{children}</body>
    </html>
  );
}
