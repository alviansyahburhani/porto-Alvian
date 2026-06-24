"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

// Import 3D Components
import CanvasWrapper from "@/components/3d/CanvasWrapper";

// Import 2D Components
import HeroOverlay from "@/components/2d/HeroOverlay";
import AboutPanel from "@/components/2d/AboutPanel";
import SoftwarePanel from "@/components/2d/SoftwarePanel";
import ProjectDeck from "@/components/2d/ProjectDeck";

export default function Home() {
  const mouse = useMousePosition();

  return (
    <div className="relative min-h-screen text-white font-sans">
      {/* 3D Background Canvas Layer (z-0) - now only renders SceneBackground grid and stars */}
      <CanvasWrapper zIndex="z-0" />

      {/* 2D Content Layer (Grid & Scrolling Content) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col min-h-screen">
        {/* Row 1: Hero Section */}
        <HeroOverlay mouse={mouse} />

        {/* Row 2: About Me & Quote */}
        <AboutPanel mouse={mouse} />

        {/* Row 3: Affiliations & Tech Stack */}
        <SoftwarePanel />

        {/* Row 4: Projects Showcase Deck */}
        <ProjectDeck />

        {/* Footer */}
        <footer className="w-full py-6 px-6 text-center border-t border-electric-cyan/15 text-[10px] font-mono text-white/30 tracking-widest uppercase bg-[#030f26]/80 backdrop-blur-md">
          © {new Date().getFullYear()} {"// ALVIAN SYAH BURHANI // ALL RIGHTS RESERVED"}
        </footer>
      </main>
    </div>
  );
}
