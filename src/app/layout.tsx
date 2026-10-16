import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Providers } from "@/components/providers/Providers";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "@/components/ui/Toaster";
import { profile, seo } from "@/data/portfolio";
import { publicFileExists } from "@/lib/publicFile";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
});

const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: seo.title, template: `%s · ${profile.name}` },
  description: seo.description,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: seo.title,
    description: seo.description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090a10" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

const lastUpdated = new Date().toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <div aria-hidden className="glow -top-40 -left-40 size-[36rem]" />
        <Providers>
          <ScrollProgress />
          <Navbar hasAvatar={publicFileExists(profile.avatar)} />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer lastUpdated={lastUpdated} />
          <CommandPalette />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
