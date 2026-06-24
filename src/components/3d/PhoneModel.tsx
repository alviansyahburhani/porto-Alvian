"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface PhoneModelProps {
  mouse: { x: number; y: number };
  isLocal?: boolean;
  isMobile?: boolean;
}

export default function PhoneModel({ mouse, isLocal = false, isMobile: isMobileProp }: PhoneModelProps) {
  const phoneRef = useRef<THREE.Group>(null);
  const { width, height } = useThree().viewport;
  const isMobile = isMobileProp !== undefined ? isMobileProp : width < 7;

  const initialY = isLocal ? (isMobile ? 0.0 : -height * 0.08) : (isMobile ? 0.0 : -2.6);
  const initialX = isLocal ? 0.25 : (isMobile ? 0 : 0.0);

  // Calculate dynamic scale factor based on viewport height when local (desktop only)
  const baseScale = isLocal ? (isMobile ? 1.0 : 1.3) : (isMobile ? 0.9 : 1.75);
  const baselineHeight = isMobile ? 6.0 : 6.63;
  const scale = isLocal ? (isMobile ? baseScale : baseScale * (height / baselineHeight)) : baseScale;

  // Track scroll position using Ref to prevent re-renders
  const scrollRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Async texture loading for Phone.webp
  const [phoneTexture, setPhoneTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loader = new THREE.TextureLoader();
    loader.load(
      `/Phone.webp?t=${Date.now()}`,
      (texture) => {
        setPhoneTexture(texture);
      },
      undefined,
      () => {
        // Fallback: draw a beautiful cyberpunk placeholder phone on a canvas
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Phone Body
          ctx.fillStyle = "#0a1b3a";
          ctx.fillRect(40, 40, 432, 944);

          // Screen Bezel
          ctx.strokeStyle = "#00f0ff";
          ctx.lineWidth = 16;
          ctx.strokeRect(40, 40, 432, 944);

          // Text / Status
          ctx.fillStyle = "#00f0ff";
          ctx.font = "bold 36px monospace";
          ctx.textAlign = "center";
          ctx.fillText("Phone.webp", 256, 480);
          ctx.font = "24px monospace";
          ctx.fillText("PLACE PHONE.WEBP IN PUBLIC", 256, 540);
        }

        const fallbackTex = new THREE.CanvasTexture(canvas);
        setPhoneTexture(fallbackTex);
      }
    );
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Scroll-based Rotation (360 degrees rotation over page scroll height)
    if (phoneRef.current) {
      const scrollHeight = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1000;
      const scrollPercent = scrollHeight > 0 ? scrollRef.current / scrollHeight : 0;

      // Continuous base rotation
      const baseRotationY = scrollPercent * Math.PI * 2;

      // Merge scroll rotation + mouse parallax tilt + reference angles
      const targetRotationX = 0.3 - mouse.y * 0.2;
      const targetRotationY = baseRotationY - 0.4 + mouse.x * 0.2;
      const targetRotationZ = -0.15 + mouse.x * 0.05;

      // Dampened interpolation for smooth look
      phoneRef.current.rotation.x = THREE.MathUtils.lerp(phoneRef.current.rotation.x, targetRotationX, 0.1);
      phoneRef.current.rotation.y = THREE.MathUtils.lerp(phoneRef.current.rotation.y, targetRotationY, 0.1);
      phoneRef.current.rotation.z = THREE.MathUtils.lerp(phoneRef.current.rotation.z, targetRotationZ, 0.1);

      // Floating motion + scroll sync
      if (!isLocal) {
        const scrollHeightPixels = typeof window !== "undefined" ? window.innerHeight : 800;
        const scrollOffset3D = (scrollRef.current / scrollHeightPixels) * height;
        phoneRef.current.position.y = initialY + scrollOffset3D + Math.sin(time * 1.2) * 0.1;
      } else {
        phoneRef.current.position.y = initialY + Math.sin(time * 1.2) * 0.1;
      }
    }
  });

  return (
    <group ref={phoneRef} position={[initialX, initialY, 0]} scale={[scale, scale, scale]}>
      {phoneTexture && (
        <mesh>
          {/* Flat 3D Plane to render the phone mockup screenshot cutout directly */}
          <planeGeometry args={[2.0, 4.3]} />
          <meshBasicMaterial
            map={phoneTexture}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      )}
    </group>
  );
}
