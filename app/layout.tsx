import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";
import { SkipToContent } from "@/components/skip-to-content";
import { adminClerkAppearance } from "@/lib/admin/clerk-auth-appearance";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const garet = localFont({
  src: [
    {
      path: "./fonts/Garet-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Garet-Heavy.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-garet",
  display: "swap",
});

const todayShop = localFont({
  src: [
    {
      path: "./fonts/TodaySHOP-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TodaySHOP-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-todayshop",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#f7f2ec",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="pt-BR">
      <body
        className={`${garet.variable} ${todayShop.variable} relative min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ClerkProvider
          localization={ptBR}
          signInUrl="/admin/login"
          signInFallbackRedirectUrl="/admin/viagens"
          appearance={adminClerkAppearance}
        >
          <Providers>
            <SkipToContent />
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
