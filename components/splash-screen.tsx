"use client";

import { splashConfig } from "@/lib/config";
import { playSplashDiveSound } from "@/lib/splash-sound";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

const SPLASH_BG = "/backgrounds/splash-bg.png";
const DIVER_IMG = "/diver/diver-frame-1.png";
const STORAGE_KEY = "diver-splash-seen";
const TOTAL_DURATION = 5200;
const FADE_MS = 400;
const PARALLAX_INTENSITY = 20;
const PARALLAX_SPRING = 0.14;
const PARALLAX_SCALE_DESKTOP = 1.05;
const PARALLAX_MIN_WIDTH = 850;

type SplashScreenProps = {
  showOncePerSession?: boolean;
};

function shouldSkipSplash(showOncePerSession: boolean): boolean {
  if (!showOncePerSession) return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function drawCoverImage(
  c: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
) {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = w / h;
  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;

  if (imgAspect > canvasAspect) {
    dh = h * scale;
    dw = dh * imgAspect;
    dx = (w - dw) / 2 + offsetX;
    dy = (h - dh) / 2 + offsetY;
  } else {
    dw = w * scale;
    dh = dw / imgAspect;
    dx = (w - dw) / 2 + offsetX;
    dy = (h - dh) / 2 + offsetY;
  }

  c.drawImage(img, dx, dy, dw, dh);
}

export function SplashScreen({
  showOncePerSession = splashConfig.showOncePerSession,
}: SplashScreenProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const animFrameRef = useRef(0);
  const stopSoundRef = useRef<(() => void) | null>(null);
  const parallaxTargetRef = useRef({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef({ x: 0, y: 0 });
  /** null = aguardando mount (SSR e 1º paint iguais); evita hydration mismatch */
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const skip =
      showOncePerSession && shouldSkipSplash(showOncePerSession);
    queueMicrotask(() => setEnabled(!skip));
  }, [showOncePerSession]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < PARALLAX_MIN_WIDTH) {
      parallaxTargetRef.current = { x: 0, y: 0 };
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    parallaxTargetRef.current = {
      x: offsetX * PARALLAX_INTENSITY,
      y: offsetY * PARALLAX_INTENSITY,
    };
  };

  const handleMouseLeave = () => {
    parallaxTargetRef.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    if (enabled !== true) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawCtx = canvas.getContext("2d");
    if (!drawCtx) return;

    const cnv = canvas;

    const finishSplash = () => {
      stopSoundRef.current?.();
      stopSoundRef.current = null;
      cancelAnimationFrame(animFrameRef.current);
      document.documentElement.style.overflow = "";

      if (showOncePerSession) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      }

      setVisible(false);
      window.setTimeout(() => setEnabled(false), FADE_MS);
    };

    document.documentElement.style.overflow = "hidden";

    const diverImg = new window.Image();
    diverImg.src = DIVER_IMG;

    const bgImg = new window.Image();
    bgImg.src = SPLASH_BG;

    let cancelled = false;

    const resize = () => {
      cnv.width = window.innerWidth;
      cnv.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    type Bubble = {
      x: number;
      y: number;
      r: number;
      speed: number;
      opacity: number;
      wavePhase: number;
    };

    const bubbles: Bubble[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 4 + 1.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.2,
      wavePhase: Math.random() * Math.PI * 2,
    }));

    function drawWaterSurface(
      c: CanvasRenderingContext2D,
      y: number,
      w: number,
      time: number
    ) {
      c.beginPath();
      const segments = 120;
      const segW = w / segments;

      for (let i = 0; i <= segments; i++) {
        const x = i * segW;
        const wave1 = Math.sin(i * 0.3 + time * 0.002) * 8;
        const wave2 = Math.sin(i * 0.65 + time * 0.0035) * 4;
        const wave3 = Math.cos(i * 0.15 + time * 0.001) * 3;
        const totalWave = wave1 + wave2 + wave3;

        if (i === 0) c.moveTo(x, y + totalWave);
        else c.lineTo(x, y + totalWave);
      }

      c.lineTo(w, 0);
      c.lineTo(0, 0);
      c.closePath();
    }

    function drawDiverImage(
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      img: HTMLImageElement,
      drawHeight: number,
      rotation: number
    ) {
      const aspect = img.naturalWidth / img.naturalHeight;
      const h = drawHeight;
      const w = h * aspect;
      c.save();
      c.translate(cx, cy);
      c.rotate(rotation);
      c.drawImage(img, -w / 2, -h / 2, w, h);
      c.restore();
    }

    function startAnimation(
      ctx: CanvasRenderingContext2D,
      surface: HTMLCanvasElement
    ) {
      const diverHeight = Math.min(window.innerHeight * 0.55, 520);
      const startY = -diverHeight * 1.5;
      const endY = window.innerHeight + diverHeight * 1.5;

      let startTime: number | null = null;

      function frame(ts: number) {
        if (cancelled) return;

        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const rawProgress = Math.min(elapsed / TOTAL_DURATION, 1);
        const progress = easeInOutQuad(rawProgress);

        const W = surface.width;
        const H = surface.height;
        const labelRect = percentRef.current?.getBoundingClientRect();
        const labelCenterY = labelRect
          ? labelRect.top + labelRect.height / 2
          : H - 64;
        const diverCenterStartY = startY + diverHeight / 2;
        const diverY = startY + (endY - startY) * progress;
        const diverCenterY = diverY + diverHeight / 2;
        const percentDenominator = Math.max(
          1,
          labelCenterY - diverCenterStartY
        );
        const percent = Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((diverCenterY - diverCenterStartY) / percentDenominator) * 100
            )
          )
        );
        if (percentRef.current) {
          percentRef.current.textContent = `${percent}%`;
          percentRef.current.style.opacity = percent >= 100 ? "0" : "1";
        }
        const waveLine = diverY - diverHeight / 2 + diverHeight * 0.1;

        ctx.clearRect(0, 0, W, H);

        if (bgImg.naturalWidth > 0) {
          const target = parallaxTargetRef.current;
          const current = parallaxCurrentRef.current;
          current.x += (target.x - current.x) * PARALLAX_SPRING;
          current.y += (target.y - current.y) * PARALLAX_SPRING;

          const bgScale =
            W >= PARALLAX_MIN_WIDTH ? PARALLAX_SCALE_DESKTOP : 1;
          drawCoverImage(
            ctx,
            bgImg,
            W,
            H,
            current.x,
            current.y,
            bgScale,
          );
        }

        if (waveLine > 0) {
          ctx.save();
          drawWaterSurface(ctx, waveLine, W, ts);
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.restore();
        }

        if (waveLine > 0 && waveLine < H) {
          const grad = ctx.createLinearGradient(
            0,
            waveLine - 16,
            0,
            waveLine + 24
          );
          grad.addColorStop(0, "rgba(255,255,255,0)");
          grad.addColorStop(0.25, "rgba(255,255,255,0.25)");
          grad.addColorStop(0.75, "rgba(33,192,173,0.15)");
          grad.addColorStop(1, "rgba(33,192,173,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, waveLine - 16, W, 40);
        }

        for (const b of bubbles) {
          b.y -= b.speed;
          b.wavePhase += 0.02;

          if (b.y < waveLine) {
            b.y = H;
            b.x = Math.random() * W;
          }

          if (b.y > waveLine) {
            const wobble = Math.sin(b.wavePhase) * 3;
            ctx.beginPath();
            ctx.arc(b.x + wobble, b.y, b.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,255,255,${b.opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        if (diverY > waveLine && diverY < H + diverHeight) {
          ctx.save();
          ctx.globalAlpha = 0.12;
          ctx.filter = "blur(16px)";
          const shadowW = diverHeight * 0.22;
          const shadowH = diverHeight * 0.38;
          ctx.beginPath();
          ctx.ellipse(
            W / 2,
            diverY + diverHeight * 0.15,
            shadowW,
            shadowH,
            0,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#000";
          ctx.fill();
          ctx.filter = "none";
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        const rotation = Math.sin(ts * 0.003) * 0.026;
        drawDiverImage(ctx, W / 2, diverY, diverImg, diverHeight, rotation);

        if (rawProgress > 0.08 && rawProgress < 0.92) {
          const bx = W / 2;
          const by = diverY + diverHeight * 0.35;
          for (let i = 0; i < 4; i++) {
            const offset = i * 22 + ((ts * 0.05) % 22);
            const bAlpha = 0.45 - i * 0.1;
            ctx.beginPath();
            ctx.arc(
              bx + Math.sin(ts * 0.004 + i) * 8,
              by + offset,
              4 - i * 0.9,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = `rgba(255,255,255,${bAlpha})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(frame);
        } else {
          if (percentRef.current) {
            percentRef.current.textContent = "100%";
            percentRef.current.style.opacity = "0";
          }

          window.setTimeout(() => {
            if (!cancelled) finishSplash();
          }, 200);
        }
      }

      animFrameRef.current = requestAnimationFrame(frame);
    }

    let diverReady = false;
    let bgReady = false;

    const onAssetsReady = () => {
      if (cancelled || !diverReady || !bgReady) return;

      if (splashConfig.sound) {
        void playSplashDiveSound(splashConfig.soundVolume).then((stop) => {
          if (!cancelled) stopSoundRef.current = stop;
          else stop();
        });
      }

      startAnimation(drawCtx, cnv);
    };

    const markDiverReady = () => {
      diverReady = true;
      onAssetsReady();
    };

    const markBgReady = () => {
      bgReady = true;
      onAssetsReady();
    };

    if (diverImg.complete) markDiverReady();
    else {
      diverImg.onload = markDiverReady;
      diverImg.onerror = markDiverReady;
    }

    if (bgImg.complete) markBgReady();
    else {
      bgImg.onload = markBgReady;
      bgImg.onerror = markBgReady;
    }

    return () => {
      cancelled = true;
      stopSoundRef.current?.();
      stopSoundRef.current = null;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      document.documentElement.style.overflow = "";
    };
  }, [showOncePerSession, enabled]);

  if (enabled !== true) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando"
      className="fixed inset-0 z-[10000]"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: visible ? "all" : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute top-0 left-0 z-10 p-5 sm:p-8">
        <Image
          src="/logos/logo-white.png"
          alt=""
          width={140}
          height={40}
          className="h-8 w-auto sm:h-10"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-12 sm:pb-16">
        <span
          ref={percentRef}
          className="text-4xl font-semibold tracking-[0.2em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-opacity duration-200 select-none sm:text-5xl"
        >
          0%
        </span>
      </div>
    </div>
  );
}
