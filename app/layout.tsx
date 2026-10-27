import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Jost } from "next/font/google";
import "./globals.css";
import { site, fullName, education, experience } from "@/content/site";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/ui/Nav";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
// Futura-like geometric sans for the cut-out paper letters
const jost = Jost({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-cut", display: "swap" });

const description = `${fullName}: Carnegie Mellon Information Systems student working at the intersection of data analytics, product management, and technology.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${fullName} · Data, Product & Strategy`, template: `%s · ${fullName}` },
  description,
  keywords: ["Isha Swaminathan", "Carnegie Mellon", "Information Systems", "Data Analytics", "Product Management", "Portfolio"],
  authors: [{ name: fullName }],
  openGraph: {
    title: `${fullName} · Data, Product & Strategy`,
    description,
    url: site.url,
    siteName: fullName,
    images: [{ url: site.portrait, width: 2000, height: 1333, alt: fullName }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: fullName, description },
};

export const viewport: Viewport = {
  themeColor: "#f5efe3",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  url: site.url,
  email: `mailto:${site.contact.email}`,
  sameAs: [site.contact.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  jobTitle: experience[0]?.role,
};

// Runs before paint so returning visitors / reduced-motion users never see the intro flash.
const introScript = `try{if(sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches||location.pathname!=='/'){document.documentElement.classList.add('intro-skip');window.__introDone=true}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        {children}
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
