"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type Bubble = {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  wavePhase: number;
};

function createBubbles(count: number, width: number, height: number): Bubble[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 4 + 1.5,
    speed: Math.random() * 0.3 + 0.1,
    opacity: Math.random() * 0.4 + 0.2,
    wavePhase: Math.random() * Math.PI * 2,
  }));
}

function drawBubbles(
  ctx: CanvasRenderingContext2D,
  bubbles: Bubble[],
  width: number,
  height: number,
): void {
  for (const bubble of bubbles) {
    bubble.y -= bubble.speed;
    bubble.wavePhase += 0.02;

    if (bubble.y < -bubble.r) {
      bubble.y = height + bubble.r;
      bubble.x = Math.random() * width;
    }

    const wobble = Math.sin(bubble.wavePhase) * 3;
    ctx.beginPath();
    ctx.arc(bubble.x + wobble, bubble.y, bubble.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${bubble.opacity})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}

type RisingBubblesProps = {
  className?: string;
  bubbleCount?: number;
};

export function RisingBubbles({
  className,
  bubbleCount = 32,
}: RisingBubblesProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationId = 0;
    let bubbles: Bubble[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bubbles = createBubbles(bubbleCount, width, height);
    };

    const frame = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);
      drawBubbles(ctx, bubbles, width, height);
      animationId = window.requestAnimationFrame(frame);
    };

    resize();
    animationId = window.requestAnimationFrame(frame);

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [prefersReducedMotion, bubbleCount]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
