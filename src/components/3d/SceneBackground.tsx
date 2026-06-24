"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate random points for the floating background particles outside the render cycle to remain pure
const count = 120;
const initialPositions = new Float32Array(count * 3);
const initialSpeeds = new Float32Array(count);
for (let i = 0; i < count; i++) {
  initialPositions[i * 3] = (Math.random() - 0.5) * 15; // X
  initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
  initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // Z (mostly in background)
  initialSpeeds[i] = 0.02 + Math.random() * 0.05;
}

export default function SceneBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  const [positions, speeds] = useMemo(() => {
    // Return unique copies for this component instance
    return [new Float32Array(initialPositions), new Float32Array(initialSpeeds)];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate and move particles slowly
    if (pointsRef.current) {
      const currentPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Drift particles downwards
        currentPositions[i * 3 + 1] -= speeds[i] * 0.05;
        // Reset particle if it goes below screen
        if (currentPositions[i * 3 + 1] < -8) {
          currentPositions[i * 3 + 1] = 8;
        }
        
        // Add subtle wave effect on X
        currentPositions[i * 3] += Math.sin(time + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.01;
    }

    // Tilt the background grid based on time
    if (gridRef.current) {
      gridRef.current.position.y = -2.5 + Math.sin(time * 0.5) * 0.1;
      gridRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <>
      {/* Wireframe cyber grid floor */}
      <gridHelper
        ref={gridRef}
        args={[40, 40, "#00f0ff", "#13284f"]}
        position={[0, -2.5, -2]}
        rotation={[Math.PI / 12, 0, 0]}
      />

      {/* Floating neon particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00f0ff"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Additional purple particles for depth */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[12, 1, 1]} />
        <meshBasicMaterial wireframe color="#8a2be2" transparent opacity={0.05} />
      </mesh>
    </>
  );
}
