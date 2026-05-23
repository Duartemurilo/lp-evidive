/**
 * Som de mergulho para a splash.
 * Tenta `/sounds/mergulho.mp3` (opcional); se falhar, usa síntese Web Audio.
 */

import { splashConfig } from "@/lib/config";

function getSoundSrc(): string {
  return splashConfig.soundSrc;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function playProceduralDive(volume: number): () => void {
  const ctx = new AudioContext();
  const duration = 3.8;
  let cleaned = false;
  let started = false;
  let removeListeners: (() => void) | null = null;

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    removeListeners?.();
    removeListeners = null;
    void ctx.close();
  };

  const startSound = async () => {
    if (cleaned || started) return;

    try {
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
    } catch {
      // If autoplay is blocked, we'll retry on the next user gesture.
    }

    if (cleaned || started || ctx.state !== "running") {
      return;
    }

    started = true;

    const t0 = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, t0);
    master.gain.linearRampToValueAtTime(volume, t0 + 0.2);
    master.gain.setValueAtTime(volume * 0.85, t0 + duration - 0.6);
    master.gain.linearRampToValueAtTime(0, t0 + duration);
    master.connect(ctx.destination);

    // Ruído filtrado — sensação de água / profundidade
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.Q.value = 0.7;
    lowpass.frequency.setValueAtTime(900, t0);
    lowpass.frequency.exponentialRampToValueAtTime(180, t0 + duration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.07;
    noise.connect(lowpass);
    lowpass.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(t0);

    // Tom descendente — mergulho
    const dive = ctx.createOscillator();
    dive.type = "sine";
    dive.frequency.setValueAtTime(220, t0);
    dive.frequency.exponentialRampToValueAtTime(55, t0 + duration * 0.85);

    const diveGain = ctx.createGain();
    diveGain.gain.value = 0.045;
    dive.connect(diveGain);
    diveGain.connect(master);
    dive.start(t0);
    dive.stop(t0 + duration);

    // Bolhas
    const bubbleTimes = [0.25, 0.55, 0.95, 1.35, 1.85, 2.35, 2.9, 3.35];
    for (const bt of bubbleTimes) {
      const pop = ctx.createOscillator();
      pop.type = "sine";
      const f0 = 320 + Math.random() * 280;
      pop.frequency.setValueAtTime(f0, t0 + bt);
      pop.frequency.exponentialRampToValueAtTime(70, t0 + bt + 0.1);

      const popGain = ctx.createGain();
      popGain.gain.setValueAtTime(0, t0 + bt);
      popGain.gain.linearRampToValueAtTime(0.055, t0 + bt + 0.012);
      popGain.gain.exponentialRampToValueAtTime(0.001, t0 + bt + 0.14);

      pop.connect(popGain);
      popGain.connect(master);
      pop.start(t0 + bt);
      pop.stop(t0 + bt + 0.16);
    }
  };

  const retryOnGesture = () => {
    void startSound();
  };

  const attachListeners = () => {
    if (removeListeners || cleaned || started) return;

    const options = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", retryOnGesture, options);
    window.addEventListener("keydown", retryOnGesture, options);
    window.addEventListener("touchstart", retryOnGesture, options);
    window.addEventListener("click", retryOnGesture, options);

    removeListeners = () => {
      window.removeEventListener("pointerdown", retryOnGesture);
      window.removeEventListener("keydown", retryOnGesture);
      window.removeEventListener("touchstart", retryOnGesture);
      window.removeEventListener("click", retryOnGesture);
    };
  };

  void startSound().then(() => {
    if (!started && !cleaned) {
      attachListeners();
    }
  });

  return () => {
    cleanup();
  };
}

function playFileDive(volume: number): Promise<() => void> {
  return new Promise((resolve) => {
    const audio = new Audio(getSoundSrc());
    audio.volume = Math.min(1, Math.max(0, volume));
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");

    const cleanup = () => {
      audio.pause();
      audio.src = "";
    };

    audio.addEventListener(
      "ended",
      () => {
        cleanup();
      },
      { once: true }
    );

    audio.addEventListener(
      "error",
      () => {
        cleanup();
        resolve(playProceduralDive(volume));
      },
      { once: true }
    );

    void audio.play().then(
      () => resolve(cleanup),
      () => resolve(playProceduralDive(volume))
    );
  });
}

export async function playSplashDiveSound(volume = 0.55): Promise<() => void> {
  if (prefersReducedMotion()) {
    return () => undefined;
  }

  try {
    return await playFileDive(volume);
  } catch {
    return playProceduralDive(volume);
  }
}
