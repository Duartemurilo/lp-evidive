"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppFloatButton } from "@/components/whatsapp-float-button";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const MINIMAL_CHROME_PREFIXES = ["/admin", "/sign-in", "/sign-up"];

function isMinimalChromeRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return MINIMAL_CHROME_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function SiteChrome({ children }: { children: ReactNode }): ReactNode {
  const pathname = usePathname();

  if (isMinimalChromeRoute(pathname)) {
    return children;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}
