"use client";

import { SocialLinksRow } from "@/components/social-links";
import { footerConfig } from "@/lib/config";
import { footerLegalLinks, footerNavGroups, isExternalNavHref } from "@/lib/nav-menu";
import { siteConfig } from "@/lib/metadata";
import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.8, ease: easeOut },
};

export function Footer(): ReactNode {
  return (
    <footer
      id="fundo"
      data-depth-label="Fundo"
      data-depth="-80m"
      className="rounded-tr-4xl rounded-tl-4xl bg-[#225d6d] px-6 py-20 text-background md:px-12 md:py-24 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <motion.div className="flex flex-col justify-center" {...fadeInUp}>
            <Link
              href={footerConfig.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display group inline-flex w-fit items-center gap-3 rounded-md bg-background py-3 pl-4 pr-3 font-medium text-foreground shadow-lg shadow-black/10 transition-all duration-500 ease-out hover:rounded-[50px] hover:bg-background/90 hover:shadow-xl hover:shadow-black/20"
            >
              <span>{footerConfig.cta.text}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 group-hover:scale-110">
                <ChevronRightIcon className="relative left-px h-4 w-4" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {footerNavGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.08 + groupIndex * 0.06 }}
              >
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/60">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => {
                    const external = link.external ?? isExternalNavHref(link.href);

                    return (
                      <li key={`${group.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="inline-block text-background/80 transition-all duration-300 hover:translate-x-1 hover:text-background"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="my-16 h-px bg-background/15" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeInUp}>
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} — início`}>
              <Image
                src="/logos/logo-white.png"
                alt={siteConfig.name}
                width={220}
                height={56}
                className="h-auto w-[min(100%,13.75rem)]"
              />
            </Link>
            <p className="mt-8 text-sm text-background/60">{footerConfig.copyright}</p>
            <nav
              aria-label="Documentos legais"
              className="mt-4 flex flex-wrap gap-x-5 gap-y-2"
            >
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/70 underline-offset-4 transition-colors hover:text-background hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-right">
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
              <a
                href={footerConfig.contactLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display inline-block text-lg font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {footerConfig.contactLink.text}
              </a>
            </motion.div>

            <motion.div
              className="flex lg:justify-end"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              <SocialLinksRow variant="footer" />
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
