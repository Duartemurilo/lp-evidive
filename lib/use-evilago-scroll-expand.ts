"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const EVI_LAGO_SECTION_HEIGHT_VH = 110;

const PADDING_DESKTOP = "1.5vw";
const PADDING_MOBILE = 16;
const RADIUS_MOBILE = 16;
const RADIUS_DESKTOP = 24;
const IMAGE_SCALE_START = 1.08;
const IMAGE_SCALE_END = 1;
const IMAGE_PARALLAX_Y = 18;
const CONTENT_PARALLAX_Y_START = 12;
const CONTENT_PARALLAX_Y_END = -16;

export type EviLagoScrollExpandSides = "left" | "both";

export type EviLagoScrollRefs = {
  sectionRef: RefObject<HTMLElement | null>;
  stickyRef: RefObject<HTMLDivElement | null>;
  mediaShellRef: RefObject<HTMLDivElement | null>;
  mediaRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  /** "left" = só padding esquerdo some (EviLago). "both" = expande dos dois lados. */
  expandSides?: EviLagoScrollExpandSides;
  /** Origem do scale do fundo durante o scroll. */
  mediaTransformOrigin?: "left center" | "right center" | "center center";
};

function getScrollRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-scroll-root]");
}

export function useEviLagoScrollExpand(refs: EviLagoScrollRefs): void {
  useEffect(() => {
    const section = refs.sectionRef.current;
    const sticky = refs.stickyRef.current;
    const mediaShell = refs.mediaShellRef.current;
    const media = refs.mediaRef.current;
    const content = refs.contentRef.current;
    const scrollWrapper = getScrollRoot();

    if (!section || !sticky || !scrollWrapper) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(sticky, { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 });
      if (mediaShell) {
        gsap.set(mediaShell, { borderRadius: 0 });
      }
      if (media) {
        gsap.set(media, { scale: 1, y: 0 });
      }
      if (content) {
        gsap.set(content, { y: 0 });
      }
      return;
    }

    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? RADIUS_MOBILE : RADIUS_DESKTOP;
    const paddingStart = isMobile ? PADDING_MOBILE : PADDING_DESKTOP;
    const expandBothSides = refs.expandSides === "both";

    const tl = gsap.timeline();

    // "left": margem só à esquerda some (full bleed pela direita). "both": simétrico.
    tl.fromTo(
      sticky,
      {
        paddingLeft: paddingStart,
        paddingRight: expandBothSides ? paddingStart : 0,
      },
      { paddingLeft: 0, paddingRight: 0, ease: "none" },
      0,
    );

    if (mediaShell) {
      tl.fromTo(
        mediaShell,
        { borderRadius: radius },
        { borderRadius: 0, ease: "none" },
        0,
      );
    }

    if (media) {
      const imgParallax = isMobile ? 10 : IMAGE_PARALLAX_Y;
      const mediaOrigin = refs.mediaTransformOrigin ?? "right center";
      gsap.set(media, { transformOrigin: mediaOrigin });
      tl.fromTo(
        media,
        { scale: IMAGE_SCALE_START, y: -imgParallax },
        { scale: IMAGE_SCALE_END, y: imgParallax, ease: "none" },
        0,
      );
    }

    const contentParallaxStart = isMobile ? 8 : CONTENT_PARALLAX_Y_START;
    const contentParallaxEnd = isMobile ? -10 : CONTENT_PARALLAX_Y_END;

    if (content) {
      tl.fromTo(
        content,
        { y: contentParallaxStart },
        { y: contentParallaxEnd, ease: "none" },
        0,
      );
    }

    const st = ScrollTrigger.create({
      scroller: scrollWrapper,
      trigger: section,
      start: "top bottom",
      end: "top top",
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
    };
  }, [
    refs.contentRef,
    refs.expandSides,
    refs.mediaRef,
    refs.mediaShellRef,
    refs.mediaTransformOrigin,
    refs.sectionRef,
    refs.stickyRef,
  ]);
}
