"use client";

import { SocialLinksRow } from "@/components/social-links";
import {
  headerMenuCards,
  headerMenuContact,
  isExternalNavHref,
  type NavMenuCard,
  type NavMenuLink,
} from "@/lib/nav-menu";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState, useSyncExternalStore, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const easeInOut = [0.65, 0, 0.35, 1] as const;
const spring = { type: "spring", stiffness: 100, damping: 20, mass: 1 } as const;
const DESKTOP_BREAKPOINT = 700;

function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches,
    () => true
  );
}

const menuCards = headerMenuCards;

function MenuNavLink({
  link,
  onNavigate,
  compact = false,
}: {
  link: NavMenuLink;
  onNavigate: () => void;
  compact?: boolean;
}): ReactNode {
  const external = link.external ?? isExternalNavHref(link.href);

  return (
    <Link
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
      className={
        compact
          ? "group text-background/90 hover:text-background flex items-center justify-between py-2.5 pl-1 text-base font-medium transition-all duration-300 md:text-lg"
          : "group text-background hover:text-background/70 flex items-center justify-between py-3.5 text-lg font-semibold transition-all duration-300 md:py-4 md:text-xl"
      }
    >
      <span className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
        {link.label}
        {link.badge ? (
          <span className="bg-accent rounded px-2 py-0.5 text-xs font-medium text-accent-foreground uppercase">
            {link.badge}
          </span>
        ) : null}
      </span>
      <ArrowUpRight className="h-5 w-5 opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </Link>
  );
}

function MenuLinkDivider(): ReactNode {
  return <div className="bg-background/10 h-px" />;
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }): ReactNode {
  return (
    <div className="relative flex h-2.5 w-7 cursor-pointer flex-col justify-between">
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full bg-current"
        animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
      />
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full bg-current"
        animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
      />
    </div>
  );
}

function MenuCard({
  card,
  onNavigate,
}: {
  card: NavMenuCard;
  onNavigate: () => void;
}): ReactNode {
  const topLinks = card.links ?? [];
  const groups = card.groups ?? [];
  const isContact = card.variant === "contact";

  return (
    <motion.div
      className="bg-menu-card min-h-50 rounded-2xl p-6 min-[1080px]:min-h-80"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: easeOut },
        },
      }}
    >
      <span className="text-background/50 font-display text-xs font-medium tracking-widest uppercase">
        {card.title}
      </span>

      {(topLinks.length > 0 || groups.length > 0) && (
        <ul className="mt-6">
          {topLinks.map((link, index) => (
            <li key={link.label}>
              <MenuNavLink link={link} onNavigate={onNavigate} />
              {(index < topLinks.length - 1 || groups.length > 0) && (
                <MenuLinkDivider />
              )}
            </li>
          ))}

          {groups.map((group, groupIndex) => (
            <li key={group.label} className={groupIndex === 0 && topLinks.length > 0 ? "pt-1" : undefined}>
              <p className="text-background/45 pb-2 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
                {group.label}
              </p>
              <ul>
                {group.links.map((link, linkIndex) => (
                  <li key={link.label}>
                    <MenuNavLink
                      link={link}
                      onNavigate={onNavigate}
                      compact
                    />
                    {linkIndex < group.links.length - 1 && <MenuLinkDivider />}
                  </li>
                ))}
              </ul>
              {groupIndex < groups.length - 1 && <MenuLinkDivider />}
            </li>
          ))}
        </ul>
      )}

      {isContact && (
        <div className="mt-6 flex flex-col gap-4 border-t border-background/10 pt-6">
          <Link
            href={headerMenuContact.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="text-background hover:text-background/70 text-lg font-semibold transition-colors md:text-xl"
          >
            {headerMenuContact.ctaLabel}
          </Link>
          <SocialLinksRow variant="menu" />
        </div>
      )}
    </motion.div>
  );
}

function MobileMenuActions({ onNavigate }: { onNavigate: () => void }): ReactNode {
  return (
    <motion.div
      className="col-span-full flex flex-col items-stretch justify-center gap-2 pt-2 sm:flex-row sm:items-center sm:justify-center"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut },
        },
      }}
    >
      <Link
        href={headerMenuContact.bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="font-display text-background rounded-[3.5px] bg-background/10 px-6 py-3 text-center text-lg font-medium tracking-tight transition-colors sm:text-xl"
      >
        {headerMenuContact.bookingLabel}
      </Link>
      <Link
        href={headerMenuContact.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="font-display bg-accent rounded-[3.5px] px-6 py-3 text-center text-lg font-medium tracking-tight text-accent-foreground transition-all duration-500 hover:rounded-[50px] sm:text-xl"
      >
        {headerMenuContact.ctaLabel}
      </Link>
    </motion.div>
  );
}

export function Header(): ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const isDesktop = useIsDesktop();
  const heightDelay = isDesktop ? 0.2 : 0;
  const cardsDelay = isDesktop ? 0.7 : 0.2;

  const closeMenu = () => setIsMenuOpen(false);

  React.useEffect(() => {
    const wrapper = document.querySelector('.h-screen.overflow-y-auto') as HTMLElement;
    if (wrapper) {
      setScrollbarWidth(wrapper.offsetWidth - wrapper.clientWidth);
    }

    const handleScroll = () => {
      const scrollY = wrapper ? wrapper.scrollTop : window.scrollY;
      setHasScrolled(scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    wrapper?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      wrapper?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        className="fixed top-0 left-0 z-50 flex w-full justify-center px-4 pt-4"
        style={{ 
          paddingRight: `calc(1rem + ${scrollbarWidth}px)`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: easeOut,
        }}
      >
        <motion.nav
          className="bg-menu-card shadow-2xl/20 border border-white/10 flex max-w-6xl flex-col overflow-hidden rounded-md"
          initial={false}
          animate={{ 
            width: isMenuOpen ? "100%" : hasScrolled ? "56rem" : "42rem",
          }}
          transition={{ ...spring, delay: isMenuOpen ? 0 : 0.15 }}
        >
          <div className="flex w-full items-center justify-between py-2 pr-2 pl-4">
            <Link href="/" className="flex shrink-0 items-center py-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/logo-white.png"
                alt="Evidive"
                width={185}
                height={39}
                className="block h-9 w-[10.625rem] max-w-none object-contain object-left"
                decoding="async"
                fetchPriority="high"
              />
            </Link>

            <button
              className="text-background/80 hover:text-background flex h-full cursor-pointer items-center gap-2 rounded-[3.5px] px-2 transition-colors hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HamburgerIcon isOpen={isMenuOpen} />
              <span className="font-sans text-xl font-medium tracking-tight">Menu</span>
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="overflow-hidden"
                style={{ maxHeight: "calc(100vh - 6rem)" }}
                initial={{ height: 0 }}
                animate={{
                  height: "auto",
                  transition: {
                    duration: 0.5,
                    ease: easeInOut,
                    delay: heightDelay,
                  },
                }}
                exit={{
                  height: 0,
                  transition: { duration: 0.4, ease: easeInOut },
                }}
              >
                <div
                  className="scrollbar-hide max-h-[calc(100vh-6rem)] overflow-y-auto"
                  data-lenis-prevent
                >
                  <motion.div
                    className="grid grid-cols-1 gap-6 p-6 min-[900px]:grid-cols-2 min-[1200px]:grid-cols-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {
                        transition: {
                          staggerChildren: 0.05,
                          staggerDirection: -1,
                        },
                      },
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: cardsDelay,
                        },
                      },
                    }}
                  >
                    {menuCards.map((card) => (
                      <MenuCard
                        key={card.id}
                        card={card}
                        onNavigate={closeMenu}
                      />
                    ))}
                    <MobileMenuActions onNavigate={closeMenu} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>
    </>
  );
}
