"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import SceneBackground from "@/components/3d/SceneBackground";

interface CanvasWrapperProps {
  children?: React.ReactNode;
  zIndex?: string; // Custom z-index class
  clearBackground?: boolean; // Set true to remove solid background and background meshes
}

export default function CanvasWrapper({ 
  children, 
  zIndex = "z-0", 
  clearBackground = false 
}: CanvasWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    // Only render solid background on loading if it's the main background canvas
    return (
      <div className={`fixed inset-0 ${zIndex} ${clearBackground ? "" : "bg-[#030f26]"} flex items-center justify-center`}>
        {!clearBackground && (
          <div className="text-electric-cyan font-mono animate-pulse">
            LOADING SYSTEM...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 ${zIndex} w-full h-full pointer-events-none ${clearBackground ? "" : "bg-[#030f26]"}`}>
      <Suspense fallback={
        !clearBackground ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#030f26]">
            <div className="text-electric-cyan font-mono animate-pulse">
              INITIALIZING 3D ENVIRONMENT...
            </div>
          </div>
        ) : undefined
      }>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ pointerEvents: "none" }} // Ensure 3D background doesn't intercept page scrolling/clicking
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00f0ff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8a2be2" />
          <pointLight position={[0, 0, 2]} intensity={0.8} color="#ffffff" />
          
          {/* Only render grid and particles on the main background canvas */}
          {!clearBackground && <SceneBackground />}
          
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
