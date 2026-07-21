// app/layout.tsx
import type { Metadata } from "next";
import { Marcellus, Jost } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/layout/Nav";
import "./globals.css";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RAYA — Above the surf. Above the crowd.",
    template: "%s | RAYA",
  },
  description:
    "RAYA — a clifftop villa and managed pool-apartment collection on the Bingin clifftop above Uluwatu, Bali. The high ground of Uluwatu: stillness, surf, and a managed return.",
  openGraph: {
    siteName: "RAYA",
    title: "RAYA — Above the surf. Above the crowd.",
    description:
      "Quiet grandeur on the high ground of Uluwatu. A clifftop collection that lives like a private retreat and works like an asset.",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${jost.variable}`}
    >
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
