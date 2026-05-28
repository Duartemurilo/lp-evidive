"use client";

import { LenisContext } from "@/lib/lenis-context";
import { features } from "@/lib/config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    ScrollTrigger.defaults({ scroller: wrapper });

    const onScroll = () => ScrollTrigger.update();
    wrapper.addEventListener("scroll", onScroll, { passive: true });

    if (!features.smoothScroll) {
      setLenis(null);
      return () => {
        wrapper.removeEventListener("scroll", onScroll);
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.defaults({});
      };
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !contentRef.current) {
      setLenis(null);
      return () => {
        wrapper.removeEventListener("scroll", onScroll);
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.defaults({});
      };
    }

    const lenisInstance = new Lenis({
      wrapper,
      content: contentRef.current,
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    lenisInstance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: wrapper.style.transform ? "transform" : "fixed",
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const element = document.querySelector(href);
      if (!element) {
        return;
      }

      e.preventDefault();
      lenisInstance.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenisInstance.destroy();
      setLenis(null);
      wrapper.removeEventListener("scroll", onScroll);
      ScrollTrigger.scrollerProxy(wrapper);
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.defaults({});
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div
        ref={wrapperRef}
        data-scroll-root
        className="h-screen overflow-y-auto overflow-x-hidden"
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </LenisContext.Provider>
  );
}
