"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingIconsProps {
  category: "frontend" | "backend_ml" | "tools";
}

const SKILLS_BY_CATEGORY = {
  frontend: ["react", "nextjs", "vue", "typescript", "javascript", "tailwind"],
  backend_ml: ["php", "codeigniter", "python", "colab", "scikit"],
  tools: ["figma", "canva", "vscode", "antigravity"]
};

export default function FloatingIcons({ category }: FloatingIconsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const iconRefs = useRef<Array<THREE.Group | null>>([]);
  const { size, viewport } = useThree();

  // Canvas drawing helper for all 15 logos
  const createLogoTexture = (type: string) => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Circle background
      ctx.fillStyle = "#0a1b3a";
      ctx.beginPath();
      ctx.arc(128, 128, 120, 0, Math.PI * 2);
      ctx.fill();

      // Outer Glowing Ring
      const purpleIcons = ["python", "php", "figma", "codeigniter", "colab", "scikit"];
      ctx.strokeStyle = purpleIcons.includes(type) ? "#8a2be2" : "#00f0ff";
      ctx.lineWidth = 8;
      ctx.stroke();

      if (type === "nextjs") {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(128, 128, 90, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(75, 180); ctx.lineTo(75, 76); ctx.lineTo(95, 76);
        ctx.lineTo(168, 168); ctx.lineTo(168, 76); ctx.lineTo(185, 76);
        ctx.lineTo(185, 180); ctx.lineTo(165, 180); ctx.lineTo(92, 88);
        ctx.lineTo(92, 180); ctx.closePath(); ctx.fill();
      } else if (type === "react") {
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.ellipse(128, 128, 90, 30, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(128, 128, 90, 30, Math.PI / 3, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(128, 128, 90, 30, (2 * Math.PI) / 3, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath(); ctx.arc(128, 128, 15, 0, Math.PI * 2); ctx.fill();
      } else if (type === "vue") {
        ctx.fillStyle = "#41B883";
        ctx.beginPath();
        ctx.moveTo(128 - 60, 80); ctx.lineTo(128, 180); ctx.lineTo(128 + 60, 80);
        ctx.lineTo(128 + 30, 80); ctx.lineTo(128, 130); ctx.lineTo(128 - 30, 80);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#35495E";
        ctx.beginPath();
        ctx.moveTo(128 - 30, 80); ctx.lineTo(128, 130); ctx.lineTo(128 + 30, 80);
        ctx.lineTo(128 + 10, 80); ctx.lineTo(128, 95); ctx.lineTo(128 - 10, 80);
        ctx.closePath(); ctx.fill();
      } else if (type === "typescript") {
        ctx.fillStyle = "#3178C6"; ctx.fillRect(50, 50, 156, 156);
        ctx.fillStyle = "#ffffff"; ctx.font = "bold 80px sans-serif";
        ctx.textAlign = "right"; ctx.textBaseline = "bottom";
        ctx.fillText("TS", 190, 190);
      } else if (type === "javascript") {
        ctx.fillStyle = "#F7DF1E"; ctx.fillRect(50, 50, 156, 156);
        ctx.fillStyle = "#000000"; ctx.font = "bold 80px sans-serif";
        ctx.textAlign = "right"; ctx.textBaseline = "bottom";
        ctx.fillText("JS", 190, 190);
      } else if (type === "tailwind") {
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.moveTo(128, 85); ctx.bezierCurveTo(158, 85, 168, 115, 198, 115);
        ctx.bezierCurveTo(178, 145, 148, 145, 128, 115); ctx.bezierCurveTo(98, 115, 88, 85, 58, 85);
        ctx.bezierCurveTo(78, 55, 108, 55, 128, 85); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(128, 141); ctx.bezierCurveTo(158, 141, 168, 171, 198, 171);
        ctx.bezierCurveTo(178, 201, 148, 201, 128, 171); ctx.bezierCurveTo(98, 171, 88, 141, 58, 141);
        ctx.bezierCurveTo(78, 111, 108, 111, 128, 141); ctx.fill();
      } else if (type === "php") {
        ctx.fillStyle = "#777BB4"; ctx.beginPath(); ctx.ellipse(128, 128, 75, 45, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.font = "bold 46px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("php", 128, 128);
      } else if (type === "codeigniter") {
        ctx.fillStyle = "#EE4326";
        ctx.beginPath();
        ctx.moveTo(128, 60); ctx.bezierCurveTo(165, 105, 185, 155, 128, 195);
        ctx.bezierCurveTo(71, 155, 91, 105, 128, 60); ctx.fill();
      } else if (type === "python") {
        ctx.fillStyle = "#306998"; ctx.beginPath();
        ctx.arc(110, 110, 32, Math.PI, Math.PI * 1.5); ctx.lineTo(146, 78);
        ctx.arc(146, 110, 32, Math.PI * 1.5, 0); ctx.lineTo(178, 128); ctx.lineTo(152, 128);
        ctx.arc(128, 128, 24, 0, Math.PI * 0.5); ctx.lineTo(95, 142);
        ctx.arc(95, 110, 15, Math.PI * 0.5, Math.PI); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(115, 92, 5, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#ffd43b"; ctx.beginPath();
        ctx.arc(146, 146, 32, 0, Math.PI * 0.5); ctx.lineTo(110, 178);
        ctx.arc(110, 146, 32, Math.PI * 0.5, Math.PI); ctx.lineTo(78, 128); ctx.lineTo(104, 128);
        ctx.arc(128, 128, 24, Math.PI, Math.PI * 1.5); ctx.lineTo(161, 114);
        ctx.arc(161, 146, 15, Math.PI * 1.5, 0); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(141, 164, 5, 0, Math.PI * 2); ctx.fill();
      } else if (type === "colab") {
        ctx.strokeStyle = "#F9AB00"; ctx.lineWidth = 10; ctx.beginPath();
        ctx.arc(105, 128, 25, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke();
        ctx.strokeStyle = "#E37400"; ctx.lineWidth = 10; ctx.beginPath();
        ctx.arc(151, 128, 25, Math.PI * 1.5, Math.PI * 0.5); ctx.stroke();
      } else if (type === "scikit") {
        ctx.fillStyle = "#3498DB"; ctx.beginPath(); ctx.arc(105, 128, 32, Math.PI * 0.5, Math.PI * 1.5); ctx.fill();
        ctx.fillStyle = "#F1C40F"; ctx.beginPath(); ctx.arc(151, 128, 32, Math.PI * 1.5, Math.PI * 0.5); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.font = "bold 32px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("sk", 128, 128);
      } else if (type === "figma") {
        ctx.fillStyle = "#F24E1E"; ctx.beginPath(); ctx.arc(105, 92, 20, Math.PI * 0.5, Math.PI * 1.5); ctx.rect(105, 72, 20, 40); ctx.fill();
        ctx.fillStyle = "#FF7262"; ctx.beginPath(); ctx.arc(151, 92, 20, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#A259FF"; ctx.beginPath(); ctx.arc(105, 132, 20, Math.PI * 0.5, Math.PI * 1.5); ctx.rect(105, 112, 20, 40); ctx.fill();
        ctx.fillStyle = "#1ABC9C"; ctx.beginPath(); ctx.arc(151, 132, 20, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#0ACF83"; ctx.beginPath(); ctx.arc(105, 172, 20, 0, Math.PI * 2); ctx.fill();
      } else if (type === "canva") {
        ctx.fillStyle = "#00C4CC"; ctx.beginPath(); ctx.arc(128, 128, 80, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.font = "bold 96px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("C", 128, 122);
      } else if (type === "vscode") {
        ctx.fillStyle = "#007ACC"; ctx.font = "bold 72px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("VS", 128, 128);
      } else if (type === "antigravity") {
        ctx.strokeStyle = "#39FF14"; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.moveTo(128, 65); ctx.lineTo(65, 140); ctx.lineTo(191, 140); ctx.closePath(); ctx.stroke();
        ctx.fillStyle = "#39FF14";
        ctx.beginPath(); ctx.moveTo(128, 92); ctx.lineTo(88, 140); ctx.lineTo(168, 140); ctx.closePath(); ctx.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  };

  // State to store textures client-side
  const [textures, setTextures] = useState<Record<string, THREE.Texture | null>>({});

  useEffect(() => {
    setTextures({
      react: createLogoTexture("react"),
      nextjs: createLogoTexture("nextjs"),
      vue: createLogoTexture("vue"),
      typescript: createLogoTexture("typescript"),
      javascript: createLogoTexture("javascript"),
      tailwind: createLogoTexture("tailwind"),
      php: createLogoTexture("php"),
      codeigniter: createLogoTexture("codeigniter"),
      python: createLogoTexture("python"),
      colab: createLogoTexture("colab"),
      scikit: createLogoTexture("scikit"),
      figma: createLogoTexture("figma"),
      canva: createLogoTexture("canva"),
      vscode: createLogoTexture("vscode"),
      antigravity: createLogoTexture("antigravity"),
    });
  }, []);

  const list = SKILLS_BY_CATEGORY[category] || [];

  const layout = useMemo(() => {
    return { start: 120, step: 160 };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gently float each element independently
    iconRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.position.y = Math.sin(time * 1.5 + index * 0.5) * 0.12;
      }
    });
  });

  // Scale of 3D coin badge inside the row canvas (enlarged by 20%)
  const scale = 1.8;
  const pixelsPerUnit = size.width / viewport.width;

  return (
    <group ref={groupRef}>
      {list.map((type, index) => {
        // Pixel coordinate of coin center
        const coinCenterPixels = layout.start + index * layout.step;
        // Convert to Three.js coordinates
        const x_3d = -viewport.width / 2 + coinCenterPixels / pixelsPerUnit;

        return (
          <group
            key={type}
            ref={(el) => {
              iconRefs.current[index] = el;
            }}
            position={[x_3d, 0, 0]}
            scale={[scale, scale, scale]}
          >
            {/* Cylinder acts as coin badge oriented facing the camera */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.44, 0.44, 0.06, 32]} />
              <meshStandardMaterial color="#0b1a30" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Logo plane rendered directly on the front flat face */}
            {textures[type] && (
              <mesh position={[0, 0, 0.031]}>
                <planeGeometry args={[0.82, 0.82]} />
                <meshBasicMaterial map={textures[type]} transparent side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
