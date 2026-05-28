"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ECOSYSTEM_SCROLL_SCRUB = "75%";

const PADDING_DESKTOP = "1.25vw";
const PADDING_MOBILE = 16;
const RADIUS_MOBILE = 16;
const RADIUS_DESKTOP = 24;

export type EcosystemScrollRefs = {
  sectionRef: RefObject<HTMLElement | null>;
  shellRef: RefObject<HTMLDivElement | null>;
  bgRef: RefObject<HTMLDivElement | null>;
};

function getScrollRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-scroll-root]");
}

export function useEcosystemScrollExpand(refs: EcosystemScrollRefs): void {
  useEffect(() => {
    const section = refs.sectionRef.current;
    const shell = refs.shellRef.current;
    const bg = refs.bgRef.current;
    const scrollWrapper = getScrollRoot();

    if (!section || !shell || !bg || !scrollWrapper) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? RADIUS_MOBILE : RADIUS_DESKTOP;
    const paddingStart = isMobile ? PADDING_MOBILE : PADDING_DESKTOP;

    const tl = gsap.timeline();

    tl.fromTo(
      shell,
      {
        paddingLeft: paddingStart,
        paddingRight: paddingStart,
        immediateRender: false,
      },
      {
        paddingLeft: 0,
        paddingRight: 0,
        ease: "none",
      },
      0,
    );

    tl.fromTo(
      bg,
      {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        immediateRender: false,
      },
      {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        ease: "none",
      },
      0,
    );

    const st = ScrollTrigger.create({
      scroller: scrollWrapper,
      trigger: section,
      start: "bottom bottom",
      end: `+=${ECOSYSTEM_SCROLL_SCRUB}`,
      scrub: true,
      animation: tl,
      invalidateOnRefresh: true,
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      st.kill();
      tl.kill();
      gsap.set(shell, { clearProps: "padding" });
      gsap.set(bg, { clearProps: "borderRadius" });
    };
  }, [refs.sectionRef, refs.shellRef, refs.bgRef]);
}
