"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { sectionTitleBase, sectionTitleDisplay, sectionTitleSans } from "@/lib/typography";
import { WaveDivider } from "@/components/wave-divider";
import {
  eviLagoVideoConfig,
  getGoogleDriveVideoEmbedUrl,
  getGoogleDriveVideoStreamUrl,
} from "@/lib/config";
import {
  EVI_LAGO_SECTION_HEIGHT_VH,
  useEviLagoScrollExpand,
} from "@/lib/use-evilago-scroll-expand";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const IMAGE_SCALE_START = 1.08;
const CONTENT_PARALLAX_Y_START = 12;

type VideoSource = "remote" | "local" | "drive" | "iframe";

export function EviLagoVideo(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mediaShellRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<VideoSource>("local");

  useEviLagoScrollExpand({
    sectionRef,
    stickyRef,
    mediaShellRef,
    mediaRef,
    contentRef,
  });

  useEffect(() => {
    if (eviLagoVideoConfig.remoteSrc) {
      setSource("remote");
    }
  }, []);

  const driveStreamUrl = getGoogleDriveVideoStreamUrl(
    eviLagoVideoConfig.driveFileId,
  );
  const driveEmbedUrl = getGoogleDriveVideoEmbedUrl(eviLagoVideoConfig.driveFileId);

  const videoSrc =
    source === "remote"
      ? eviLagoVideoConfig.remoteSrc!
      : source === "local"
        ? eviLagoVideoConfig.fallbackSrc
        : source === "drive"
          ? driveStreamUrl
          : null;

  const advanceSource = useCallback(() => {
    setSource((current) => {
      if (current === "remote") {
        return "local";
      }
      if (current === "local") {
        return "drive";
      }
      if (current === "drive") {
        return "iframe";
      }
      return current;
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || source === "iframe") {
      return;
    }

    const play = () => {
      void video.play().catch(() => {
        /* autoplay bloqueado — ignora */
      });
    };

    video.load();
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      play();
      return;
    }

    video.addEventListener("loadeddata", play, { once: true });
    return () => video.removeEventListener("loadeddata", play);
  }, [source, videoSrc]);

  return (
    <section
      ref={sectionRef}
      id="evilago"
      data-depth-label="O nosso EviLago"
      data-depth="-40m"
      className="relative z-[1] w-full overflow-hidden bg-background"
      style={{ height: `${EVI_LAGO_SECTION_HEIGHT_VH}vh` }}
      aria-label="Vídeo do EviLago"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-dvh w-full flex-col overflow-hidden pl-4 pr-0 md:pl-[1.5vw] md:pr-0"
      >
        <div
          ref={mediaShellRef}
          className="relative min-h-0 flex-1 overflow-hidden rounded-2xl md:rounded-3xl"
        >
          <div
            ref={mediaRef}
            className="absolute inset-0 origin-right will-change-transform"
            style={{ scale: IMAGE_SCALE_START }}
          >
            {source === "iframe" ? (
              <iframe
                src={driveEmbedUrl}
                title="Vídeo EviLago"
                className="pointer-events-none h-full w-full border-0 object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                key={videoSrc ?? "empty"}
                src={videoSrc ?? undefined}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={advanceSource}
              />
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,52,68,0.55)_0%,rgba(12,52,68,0.42)_45%,rgba(12,52,68,0.62)_100%)]"
            />
          </div>
        </div>

        <div
          ref={contentRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-16 text-center will-change-transform md:py-24"
          style={{ transform: `translateY(${CONTENT_PARALLAX_Y_START}px)` }}
        >
          <motion.div
            className="pointer-events-auto max-w-2xl md:max-w-[min(100%,56rem)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <SectionEyebrow className="text-white/70">O nosso EviLago</SectionEyebrow>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.04, ease: easeOut }}
              className="mb-6 mt-4 flex justify-center text-white/70 sm:mb-7 sm:mt-5"
            >
              <WaveDivider className="text-white/70" />
            </motion.div>
            <h2
              className={`text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:whitespace-nowrap ${sectionTitleBase}`}
            >
              <span className={`block ${sectionTitleSans} text-white`}>
                Feito para te passar
              </span>
              <span className={`mt-1 block ${sectionTitleDisplay} text-white`}>
                <span className="text-[#159690]">100%</span> de confiança.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/88 sm:text-base md:text-lg">
              Um lago biológico construído e projetado exclusivamente para a
              instrução humana. Águas puras, ecossistema natural e calmaria.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
