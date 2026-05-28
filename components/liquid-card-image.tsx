"use client";

import {
  liquidImageFragmentShader,
  liquidImageVertexShader,
} from "@/lib/liquid-image-shaders";
import { useReducedMotion } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import Image from "next/image";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import * as THREE from "three";

const SPLAT_COUNT = 24;
const SPLAT_ROTATIONS = Array.from({ length: SPLAT_COUNT }, (_, i) => (i / SPLAT_COUNT) * Math.PI * 2);

const EVIDIVE_DUOTONE_SHADOW = new THREE.Vector3(0.02, 0.1, 0.14);
const EVIDIVE_DUOTONE_HIGHLIGHT = new THREE.Vector3(0.45, 0.88, 0.82);

type LiquidShaderUniforms = {
  uTexture: THREE.IUniform<THREE.Texture>;
  uDisplacement: THREE.IUniform<THREE.Texture | null>;
  uResolution: THREE.IUniform<THREE.Vector2>;
  uTextureSize: THREE.IUniform<THREE.Vector2>;
  uTime: THREE.IUniform<number>;
  uDistortStrength: THREE.IUniform<number>;
  uDuotone: THREE.IUniform<number>;
  uDuotoneShadow: THREE.IUniform<THREE.Vector3>;
  uDuotoneHighlight: THREE.IUniform<THREE.Vector3>;
};

function createSplatTexture(): THREE.CanvasTexture {
  const canvas = Object.assign(document.createElement("canvas"), {
    width: 128,
    height: 128,
  });
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.5)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

type LiquidImagePlaneProps = {
  src: string;
  distortStrength: number;
  duotone: boolean;
  isActiveRef: RefObject<boolean>;
};

function LiquidImagePlane({
  src,
  distortStrength,
  duotone,
  isActiveRef,
}: LiquidImagePlaneProps): ReactNode {
  const texture = useTexture(src);
  const { size, gl, invalidate } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const splatTexture = useMemo(() => createSplatTexture(), []);
  const displacementTarget = useRef<THREE.WebGLRenderTarget | null>(null);
  const splatScene = useRef<THREE.Scene | null>(null);
  const splatCamera = useRef<THREE.OrthographicCamera | null>(null);
  const splats = useRef<
    Array<{
      mesh: THREE.Mesh;
      material: THREE.MeshBasicMaterial;
    }>
  >([]);
  const splatIndex = useRef(0);
  const initialized = useRef(false);
  const clock = useRef(0);
  const pointer = useRef(new THREE.Vector2());
  const lastPointer = useRef(new THREE.Vector2());
  const textureRef = useRef(texture);
  const sizeRef = useRef(size);
  const distortRef = useRef(distortStrength);
  const duotoneRef = useRef(duotone);

  useEffect(() => {
    textureRef.current = texture;
  }, [texture]);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    distortRef.current = distortStrength;
  }, [distortStrength]);

  useEffect(() => {
    duotoneRef.current = duotone;
  }, [duotone]);

  useEffect(() => {
    if (size.width < 8 || size.height < 8) {
      initialized.current = false;
      return;
    }
    if (initialized.current) return;

    initialized.current = true;

    const w = Math.max(1, Math.floor((size.width || 1) * 0.5));
    const h = Math.max(1, Math.floor((size.height || 1) * 0.5));

    displacementTarget.current = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    splatScene.current = new THREE.Scene();

    const halfW = (size.width || 1) / 2;
    const halfH = (size.height || 1) / 2;
    splatCamera.current = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, 0, 10);

    const geometry = new THREE.PlaneGeometry(100, 100);
    splats.current = Array.from({ length: SPLAT_COUNT }, (_, index) => {
      const material = new THREE.MeshBasicMaterial({
        map: splatTexture,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.rotation.z = SPLAT_ROTATIONS[index] ?? 0;
      splatScene.current?.add(mesh);
      return { mesh, material };
    });

    return () => {
      displacementTarget.current?.dispose();
      geometry.dispose();
      splats.current.forEach(({ material }) => material.dispose());
      initialized.current = false;
    };
  }, [size.height, size.width, splatTexture]);

  useEffect(() => {
    const target = displacementTarget.current;
    if (!target) return;
    const w = Math.max(1, Math.floor((size.width || 1) * 0.5));
    const h = Math.max(1, Math.floor((size.height || 1) * 0.5));
    target.setSize(w, h);

    const cam = splatCamera.current;
    if (cam) {
      const halfW = (size.width || 1) / 2;
      const halfH = (size.height || 1) / 2;
      cam.left = -halfW;
      cam.right = halfW;
      cam.top = halfH;
      cam.bottom = -halfH;
      cam.updateProjectionMatrix();
    }
  }, [size.width, size.height]);

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = -(event.clientY - rect.top - rect.height / 2);

      if (
        Math.abs(x - lastPointer.current.x) > 3 ||
        Math.abs(y - lastPointer.current.y) > 3
      ) {
        splatIndex.current = (splatIndex.current + 1) % SPLAT_COUNT;
        const splat = splats.current[splatIndex.current];
        if (splat) {
          splat.mesh.position.set(x, y, 0);
          splat.mesh.visible = true;
          splat.material.opacity = 1;
          splat.mesh.scale.setScalar(1.35);
        }
        lastPointer.current.set(x, y);
        isActiveRef.current = true;
      }

      pointer.current.set(x, y);
      invalidate();
    };

    const onPointerLeave = () => {
      isActiveRef.current = false;
      invalidate();
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [gl, invalidate, isActiveRef]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uDisplacement: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTextureSize: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uDistortStrength: { value: distortStrength },
      uDuotone: { value: duotone ? 1 : 0 },
      uDuotoneShadow: { value: EVIDIVE_DUOTONE_SHADOW.clone() },
      uDuotoneHighlight: { value: EVIDIVE_DUOTONE_HIGHLIGHT.clone() },
    }),
    [texture, size.width, size.height, distortStrength, duotone],
  );

  useFrame((_, delta) => {
    const target = displacementTarget.current;
    const scene = splatScene.current;
    const camera = splatCamera.current;
    if (!target || !scene || !camera) return;

    clock.current += delta;
    let needsFrame = isActiveRef.current;

    const decay = Math.pow(0.96, delta * 60);
    const grow = 0.982 ** (delta * 60);

    splats.current.forEach(({ mesh, material }) => {
      if (!mesh.visible) return;
      needsFrame = true;
      mesh.rotation.z += 0.02 * delta * 60;
      material.opacity *= decay;
      mesh.scale.x = mesh.scale.x * grow + 0.1;
      mesh.scale.y = mesh.scale.y * grow + 0.1;
      if (material.opacity < 0.002) {
        mesh.visible = false;
      }
    });

    const previousTarget = gl.getRenderTarget();
    gl.setRenderTarget(target);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(previousTarget);

    const uniforms = materialRef.current?.uniforms as LiquidShaderUniforms | undefined;
    if (!uniforms) return;

    uniforms.uDisplacement.value = target.texture;
    uniforms.uTexture.value = textureRef.current;
    uniforms.uResolution.value.set(sizeRef.current.width, sizeRef.current.height);

    const image = textureRef.current.image as HTMLImageElement | undefined;
    if (image?.width && image?.height) {
      uniforms.uTextureSize.value.set(image.width, image.height);
    }

    uniforms.uDistortStrength.value = distortRef.current;
    uniforms.uDuotone.value = duotoneRef.current ? 1 : 0;
    uniforms.uTime.value = clock.current;

    if (needsFrame) {
      invalidate();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={liquidImageVertexShader}
        fragmentShader={liquidImageFragmentShader}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  );
}

type LiquidCardImageProps = {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  duotone?: boolean;
  distortStrength?: number;
};

export function LiquidCardImage({
  src,
  alt = "",
  className,
  sizes = "100vw",
  duotone = true,
  distortStrength = 0.045,
}: LiquidCardImageProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const isActiveRef = useRef(false);
  const [useWebGL, setUseWebGL] = useState(false);
  const [containerReady, setContainerReady] = useState(false);
  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);
  const scaleTo = useRef<gsap.QuickToFunc | null>(null);
  const showCanvas = hydrated && useWebGL && containerReady;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateReady = () => {
      const { width, height } = container.getBoundingClientRect();
      setContainerReady(width >= 48 && height >= 48);
    };

    updateReady();
    const observer = new ResizeObserver(updateReady);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!showCanvas) {
      moveX.current = null;
      moveY.current = null;
      scaleTo.current = null;
      return;
    }

    const el = transformRef.current;
    if (!el || prefersReducedMotion) return;

    moveX.current = gsap.quickTo(el, "x", { duration: 0.75, ease: "power3.out" });
    moveY.current = gsap.quickTo(el, "y", { duration: 0.75, ease: "power3.out" });
    scaleTo.current = gsap.quickTo(el, "scale", { duration: 0.55, ease: "power2.out" });
    gsap.set(el, { x: 0, y: 0, scale: 1.08 });
    scaleTo.current(1.08);
  }, [prefersReducedMotion, showCanvas]);

  useEffect(() => {
    if (!hydrated) return;

    const touchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setUseWebGL(!prefersReducedMotion && !touchOnly);
  }, [hydrated, prefersReducedMotion]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!showCanvas || !transformRef.current || prefersReducedMotion) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      moveX.current?.(-offsetX * 28);
      moveY.current?.(-offsetY * 28);
    },
    [prefersReducedMotion, showCanvas],
  );

  const handlePointerEnter = useCallback(() => {
    if (!showCanvas || prefersReducedMotion) return;
    scaleTo.current?.(1.14);
  }, [prefersReducedMotion, showCanvas]);

  const handlePointerLeave = useCallback(() => {
    isActiveRef.current = false;
    moveX.current?.(0);
    moveY.current?.(0);
    if (!showCanvas || prefersReducedMotion) return;
    scaleTo.current?.(1.08);
  }, [prefersReducedMotion, showCanvas]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {showCanvas ? (
        <>
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            aria-hidden
            className="object-cover"
          />
          <div
            ref={transformRef}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ transform: "scale(1.08)" }}
          >
            <Canvas
              dpr={[1, 1.5]}
              gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: false,
              }}
              style={{ width: "100%", height: "100%" }}
              frameloop="always"
              onCreated={({ invalidate }) => invalidate()}
            >
              <Suspense fallback={null}>
                <LiquidImagePlane
                  src={src}
                  distortStrength={distortStrength}
                  duotone={duotone}
                  isActiveRef={isActiveRef}
                />
              </Suspense>
            </Canvas>
          </div>
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-700",
            !prefersReducedMotion && "group-hover/card:scale-[1.06]",
          )}
        />
      )}
    </div>
  );
}
