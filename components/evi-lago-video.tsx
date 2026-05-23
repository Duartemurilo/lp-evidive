"use client";

import {
  eviLagoVideoConfig,
  getGoogleDriveVideoEmbedUrl,
  getGoogleDriveVideoStreamUrl,
} from "@/lib/config";
import { motion } from "motion/react";
import { useCallback, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type VideoSource = "drive" | "fallback" | "iframe";

export function EviLagoVideo(): ReactNode {
  const [source, setSource] = useState<VideoSource>("drive");
  const driveStreamUrl = getGoogleDriveVideoStreamUrl(eviLagoVideoConfig.driveFileId);
  const driveEmbedUrl = getGoogleDriveVideoEmbedUrl(eviLagoVideoConfig.driveFileId);

  const tryFallbackFile = useCallback(() => {
    setSource((current) => {
      if (current === "drive") {
        return "fallback";
      }
      if (current === "fallback") {
        return "iframe";
      }
      return current;
    });
  }, []);

  const videoSrc =
    source === "fallback" ? eviLagoVideoConfig.fallbackSrc : driveStreamUrl;

  return (
    <section
      id="evilago"
      data-depth-label="EviLago"
      data-depth="-18m"
      className="relative h-dvh min-h-dvh w-full overflow-hidden bg-[#0c3a4c]"
      aria-label="Vídeo do EviLago"
    >
      {source === "iframe" ? (
        <iframe
          src={driveEmbedUrl}
          title="Vídeo EviLago"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 object-cover"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video
          key={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={tryFallbackFile}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,52,68,0.55)_0%,rgba(12,52,68,0.42)_45%,rgba(12,52,68,0.62)_100%)]"
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-16 text-center">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            Feito para te passar 100% de confiança.
          </h2>
          <p className="font-display mt-6 text-[clamp(1.15rem,2.5vw,1.65rem)] font-semibold text-[#9af5ec]">
            O nosso EviLago
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/88 sm:text-base md:text-lg">
            Um lago biológico construído e projetado exclusivamente para a instrução
            humana. Águas puras, ecossistema natural e calmaria.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
