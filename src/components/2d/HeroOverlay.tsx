"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import AvatarModel from "@/components/3d/AvatarModel";
import PhoneModel from "@/components/3d/PhoneModel";

interface HeroOverlayProps {
  mouse: { x: number; y: number };
}

export default function HeroOverlay({ mouse }: HeroOverlayProps) {
  return (
    <div className="relative w-full min-h-[50vh] flex flex-col justify-between py-8 px-6 md:px-12">
      {/* Top Right Archive Capsule (matching reference) */}
      <div className="absolute top-8 right-6 md:right-12 z-20">
        <div className="border-2 border-electric-cyan/80 px-6 py-1.5 rounded-full text-[11px] font-mono font-bold text-white tracking-widest uppercase bg-cyber-dark/60 backdrop-blur-md shadow-[0_0_10px_rgba(0,240,255,0.15)]">
          archive by alviansyah
        </div>
      </div>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full my-auto z-10 pt-12 md:pt-4">
        {/* Left Side: Avatar Space (Responsive 3D Canvas) */}
        <div className="md:col-span-4 h-[260px] md:h-[350px] flex items-center justify-center relative">
          {/* Cyber decoration lines around the photo */}
          <div className="absolute w-60 h-60 rounded-full border border-dashed border-electric-cyan/25 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
          <div className="absolute w-52 h-52 rounded-full border border-double border-neon-purple/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 2]} intensity={1.0} color="#00f0ff" />
              <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#8a2be2" />
              <AvatarModel mouse={mouse} isLocal={true} />
            </Canvas>
          </div>

          {/* Central Logo Capsule (Positioned responsively exactly on the column border) */}
          <div className="absolute left-1/2 md:left-auto md:right-[-48px] bottom-[-24px] md:bottom-auto md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 flex items-center justify-center w-24 h-12 rounded-full border-2 border-electric-cyan bg-[#030f26] shadow-[0_0_15px_rgba(0,240,255,0.4)] z-20">
            {/* Styled Double Curve Logo Gradient */}
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 50 C30 30, 70 30, 70 50 C70 70, 30 70, 30 50 Z" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" />
              <circle cx="35" cy="50" r="8" fill="#00f0ff" className="animate-pulse" />
              <circle cx="65" cy="50" r="8" fill="#8a2be2" className="animate-pulse" />
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#8a2be2" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Middle: Typography (matching reference, shifted to cols 5-9 on desktop to avoid phone overlap) */}
        <div className="md:col-span-5 flex flex-col items-start text-left space-y-6 pl-0 md:pl-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-1"
          >
            <h2 className="text-4xl md:text-5xl font-mono text-white tracking-widest lowercase">
              my
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight lowercase text-white font-sans leading-none">
              porto<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-white neon-text-cyan">folio</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="space-y-4 w-full"
          >
            <p className="max-w-lg text-sm md:text-base text-white/70 font-mono leading-relaxed uppercase tracking-wider">
              {"// frontend web developer"}
            </p>
            <p className="max-w-lg text-xs md:text-sm text-white/50 font-mono leading-relaxed">
              Membawa konsep visual futuristik ke dalam implementasi web interaktif berperforma tinggi. Menjembatani data science dengan frontend kreatif.
            </p>

            {/* Mobile-only Phone Canvas (rendered in layout flow below text and above buttons, responsive height) */}
            <div className="block md:hidden w-full h-[240px] sm:h-[320px] my-4 pointer-events-none relative z-20">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 2]} intensity={1.0} color="#00f0ff" />
                <PhoneModel mouse={mouse} isLocal={true} isMobile={true} />
              </Canvas>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className="px-6 py-2.5 bg-gradient-to-r from-electric-cyan to-electric-cyan/70 hover:from-electric-cyan hover:to-neon-purple text-cyber-dark font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:scale-105 border border-electric-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              [ EXPLORE PROJECTS ]
            </a>
            <a
              href="#about"
              className="px-6 py-2.5 bg-transparent hover:bg-white/5 border border-white/20 hover:border-electric-cyan text-white hover:text-electric-cyan font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300"
            >
              [ BIO.EXE ]
            </a>
          </motion.div>
        </div>

        {/* Right Side: Spacer for Desktop Phone Canvas Placement */}
        <div className="md:col-span-3 hidden md:block"></div>
      </div>

      {/* Bottom status line */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/5 pt-4 mt-6">
        <div>COORDINATES: 3.524N / 98.672E</div>
        <div className="animate-pulse">SCROLL DOWN TO DECODE [v]</div>
        <div>STABLE_SYS_v2.4</div>
      </div>

    </div>
  );
}
