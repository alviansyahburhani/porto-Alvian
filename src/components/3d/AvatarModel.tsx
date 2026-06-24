"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarModelProps {
  mouse: { x: number; y: number };
  isLocal?: boolean;
}

export default function AvatarModel({ mouse, isLocal = false }: AvatarModelProps) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { width, height } = useThree().viewport;
  const isMobile = width < 7; // Threshold for mobile viewport in 3D units

  // Responsive positions and scaling matching reference layout
  const initialY = isLocal ? 0.0 : (isMobile ? -3.0 : -0.25);
  const initialX = isLocal ? 0.0 : (isMobile ? 0 : -3.0);

  // Calculate dynamic scale factor based on viewport size when local
  const baseScale = isLocal ? 1.10 : (isMobile ? 0.9 : 1.55);
  const minSize = Math.min(width, height);
  const scale = isLocal ? baseScale * (minSize / 4.14) : baseScale;

  // Track scroll position using Ref to prevent re-renders
  const scrollRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Async texture loading with canvas fallback
  const [avatarTexture, setAvatarTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loader = new THREE.TextureLoader();
    loader.load(
      `/profile.webp?t=${Date.now()}`,
      (texture) => {
        setAvatarTexture(texture);
      },
      undefined,
      () => {
        // Fallback: draw a beautiful cyberpunk placeholder on a canvas
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Cyber circle background
          ctx.fillStyle = "#0a1b3a";
          ctx.fillRect(0, 0, 512, 512);

          // Outer ring
          ctx.strokeStyle = "#00f0ff";
          ctx.lineWidth = 12;
          ctx.beginPath();
          ctx.arc(256, 256, 220, 0, Math.PI * 2);
          ctx.stroke();

          // Draw a stylized cyber-user silhouette
          ctx.fillStyle = "#00f0ff";
          // Head
          ctx.beginPath();
          ctx.arc(256, 180, 80, 0, Math.PI * 2);
          ctx.fill();

          // Body
          ctx.beginPath();
          ctx.moveTo(136, 420);
          ctx.bezierCurveTo(136, 320, 376, 320, 376, 420);
          ctx.closePath();
          ctx.fill();

          // Text overlay
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 26px monospace";
          ctx.textAlign = "center";
          ctx.fillText("ADD PROFILE.WEBP", 256, 460);
        }

        const fallbackTex = new THREE.CanvasTexture(canvas);
        setAvatarTexture(fallbackTex);
      }
    );
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Scroll positioning: translate Y upwards as scroll goes down (only if not local)
    if (!isLocal && groupRef.current) {
      const scrollHeightPixels = typeof window !== "undefined" ? window.innerHeight : 800;
      const scrollOffset3D = (scrollRef.current / scrollHeightPixels) * height;
      groupRef.current.position.y = initialY + scrollOffset3D;
    }

    // Ambient floating and mouse parallax (flat, no heavy X/Y tilts)
    if (coreRef.current) {
      // Floating motion
      coreRef.current.position.y = Math.sin(time * 1.2) * 0.1;

      // Mouse tracking (slight translate and tilt)
      coreRef.current.position.x = mouse.x * 0.2;
      coreRef.current.rotation.y = mouse.x * 0.15;
      coreRef.current.rotation.x = -mouse.y * 0.15;
    }

    // Outer neon rings rotater (flat, z-rotation only for continuous spin)
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -time * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[initialX, initialY, 0]} scale={[scale, scale, scale]}>
      {/* BACKGROUND GRAPHICS (Renders behind the profile photo) */}

      {/* Large Cyan Ring (Flat, placed in the background) */}
      <mesh ref={outerRingRef} position={[0, 0, -0.2]}>
        <ringGeometry args={[1.7, 1.85, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Purple Ring (Flat, placed in the background) */}
      <mesh ref={innerRingRef} position={[0, 0, -0.15]}>
        <ringGeometry args={[1.3, 1.36, 64]} />
        <meshBasicMaterial
          color="#8a2be2"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Decorative dashed outer guide ring */}
      <mesh position={[0, 0, -0.25]}>
        <ringGeometry args={[2.1, 2.11, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* FOREGROUND PROFILE PHOTO (Large flat plane, borderless, sitting in front of the background rings) */}
      <group ref={coreRef}>
        {avatarTexture && (
          <mesh position={[0, 0, 0]}>
            {/* Using a large planeGeometry (aspect ratio 4:5) to display the cutout photo at maximum scale without circular clipping */}
            <planeGeometry args={[3.5, 6.1]} />
            <meshBasicMaterial
              map={avatarTexture}
              side={THREE.DoubleSide}
              transparent
            />
          </mesh>
        )}
      </group>
    </group>
  );
}
