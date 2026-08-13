import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { DemoNotice } from "@/components/demo-notice";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ПОЛУТОН — specialty coffee в Калуге", template: "%s · ПОЛУТОН" },
  description: site.description,
  applicationName: "ПОЛУТОН",
  keywords: ["specialty coffee", "кофейня", "Калуга", "завтраки", "кофе навынос", "concept demo"],
  authors: [{ name: "Concept / Demo Project" }],
  openGraph: { title: "ПОЛУТОН — вкус между крайностями", description: site.description, type: "website", locale: "ru_RU", siteName: "ПОЛУТОН" },
  twitter: { card: "summary_large_image", title: "ПОЛУТОН", description: site.description },
};

export const viewport: Viewport = { themeColor: "#F3F0E8", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">К содержанию</a>
        <DemoNotice />
        <Providers>
          <SiteHeader />
          <main id="main-content" className="page-enter">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
