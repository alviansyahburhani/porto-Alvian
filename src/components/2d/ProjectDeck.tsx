"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  status: string;
  image?: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Website Manajemen Toko & POS",
    category: "FULLSTACK WEB APP",
    description: "Aplikasi web Point of Sale (POS) khusus untuk toko Bangunan guna mengoptimalkan efisiensi pemrosesan transaksi Invoice dan manajemen inventaris.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    status: "COMPLETED",
    image: "/pos.webp"
  },
  {
    id: 2,
    title: "Sistem Web Scraping Otomatis",
    category: "AUTOMATION / DATA EXTRACTION",
    description: "Sistem web scraping otomatis guna meningkatkan efisiensi bisnis dalam mengumpulkan dan memproses data dari berbagai sumber.",
    tech: ["Java", "HTML", "CSS"],
    status: "COMPLETED",
    image: "/scraping.webp"
  },
  {
    id: 3,
    title: "Sisdikop (Sistem Digital Koperasi)",
    category: "FRONTEND / SAAS SYSTEM",
    description: "Platform SaaS Multi-Tenant untuk digitalisasi manajemen, administrasi, dan pembukuan unit koperasi secara real-time dan terenkripsi.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "ACTIVE",
    image: "/pos.webp" // Placeholder, can be changed later
  }
];

// Interactive Telemetry panels for each project
const SaasVisual = () => (
  <div className="w-full h-full bg-black/45 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-white/70 flex flex-col justify-between shadow-inner">
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <span className="text-electric-cyan font-bold tracking-wider">// SAAS_NODE_01</span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </div>
    <div className="flex items-end justify-between h-20 px-2 py-4">
      {[60, 85, 45, 95, 70].map((val, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1.5 w-4">
          <div className="w-full bg-white/5 rounded-t h-16 relative overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ duration: 1.5, delay: idx * 0.1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-0 w-full bg-gradient-to-t from-neon-purple to-electric-cyan"
            />
          </div>
          <span className="text-[8px] text-white/40">{val}%</span>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2 text-[8px] text-white/40 border-t border-white/5 pt-2">
      <div>SYNC_RATE: 99.8%</div>
      <div>TPS_CAP: 4.8K/s</div>
    </div>
  </div>
);

const MlVisual = () => (
  <div className="w-full h-full bg-black/45 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-white/70 flex flex-col justify-between shadow-inner">
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <span className="text-neon-purple font-bold tracking-wider">// ML_MODEL_RISK</span>
      <span className="text-neon-purple bg-neon-purple/10 px-1.5 py-0.5 rounded text-[8px] border border-neon-purple/20">ACTIVE</span>
    </div>
    <div className="flex items-center justify-center h-20 relative">
      <svg className="w-full h-12" viewBox="0 0 200 60">
        <motion.path
          d="M 0 30 L 40 30 L 50 10 L 60 50 L 70 30 L 110 30 L 120 10 L 130 50 L 140 30 L 200 30"
          fill="none"
          stroke="#8a2be2"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute top-2 right-2 text-[8px] text-white/30 text-right leading-relaxed">
        SYS_VAL: 84.12<br />
        RISK: ACCURATE
      </div>
    </div>
    <div className="text-[8px] text-white/30 border-t border-white/5 pt-2 flex justify-between">
      <span>CONFIDENCE: 96.4%</span>
      <span>ENSEMBLE: RF_XGB</span>
    </div>
  </div>
);

const WebGlVisual = () => (
  <div className="w-full h-full bg-black/45 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-white/70 flex flex-col justify-between shadow-inner">
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <span className="text-white/60 font-bold tracking-wider">// WEBGL_MATRIX</span>
      <span className="text-electric-cyan animate-pulse">RENDER_OK</span>
    </div>
    <div className="grid grid-cols-5 gap-1.5 p-2 h-20 items-center justify-center">
      {Array.from({ length: 15 }).map((_, idx) => (
        <motion.div
          key={idx}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 2 + (idx % 3) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.1
          }}
          className={`h-2.5 w-2.5 rounded-sm ${idx % 3 === 0
            ? "bg-electric-cyan"
            : idx % 2 === 0
              ? "bg-neon-purple"
              : "bg-white/10"
            }`}
        />
      ))}
    </div>
    <div className="text-[8px] text-white/30 border-t border-white/5 pt-2 flex justify-between">
      <span>FPS: 60.00</span>
      <span>SHADERS: COMPILED</span>
    </div>
  </div>
);

export default function ProjectDeck() {
  const visuals = useMemo(() => [
    <SaasVisual key="saas" />,
    <MlVisual key="ml" />,
    <WebGlVisual key="webgl" />
  ], []);

  return (
    <section
      id="projects"
      className="relative w-full py-20 px-6 md:px-12 border-b border-electric-cyan/20 bg-cyber-dark/30 cyber-grid-bg"
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-purple/50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-electric-cyan/50"></div>

      <div className="w-full max-w-4xl mx-auto text-center md:text-left mb-16">
        <h3 className="text-xs font-mono text-electric-cyan tracking-[0.2em] uppercase mb-1">
          [ project showcase ]
        </h3>
        <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
          CORE PROJECTS DECK
        </h2>
        <p className="text-xs font-mono text-white/50 mt-1 uppercase">
          SCROLL DOWN TO REVEAL AND STACK PROJECTS // PORTFOLIO_SYS
        </p>
      </div>

      {/* Cards container: stacked vertically on mobile, sticky stacking on desktop */}
      <div className="w-full max-w-4xl mx-auto flex flex-col pb-[10vh]">
        {INITIAL_PROJECTS.map((project, index) => {
          // CSS sticky offsets: each card sticks at 80px interval to match the height of Row 1 (Top Padding + Number + Title)
          const stickyTopClass = index === 0
            ? "md:top-[100px]"
            : index === 1
              ? "md:top-[180px]"
              : "md:top-[260px]";

          const zIndex = (index + 1) * 10;
          const isLast = index === INITIAL_PROJECTS.length - 1;

          return (
            <div
              key={project.id}
              className={`w-full md:sticky ${stickyTopClass} ${!isLast ? "mb-[30vh]" : ""} rounded-2xl border border-white/10 glassmorphism cyber-border-purple pt-6 pb-8 px-6 md:px-8 flex flex-col justify-between shadow-[0_-15px_40px_rgba(0,0,0,0.6)]`}
              style={{ zIndex }}
            >
              {/* Corner Tag/Decoration */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-electric-cyan/35 border-b border-l border-electric-cyan"></div>

              {/* Row 1: Huge Number & Project Title. 
                  This row is exactly 56px tall and, combined with the pt-6 padding (24px), 
                  takes up 80px. Since the next card sticks at +80px offset, 
                  ONLY this row remains visible when covered. */}
              <div className="flex items-center gap-4 h-[56px] relative z-10">
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-neon-purple tracking-tighter opacity-80 select-none">
                  0{project.id}
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-white uppercase tracking-wider leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Row 2: Category. 
                  This and all elements below will be covered by the next sticky card. */}
              <div className="flex flex-col justify-start border-t border-b border-white/5 py-4 my-4 relative z-10">
                <span className="text-[9px] font-mono text-electric-cyan/70 tracking-widest uppercase">
                  // {project.category}
                </span>
              </div>

              {/* Card Body & Visuals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch relative z-10">
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <p className="text-xs md:text-sm text-white/80 font-mono leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md hover:border-electric-cyan/30 hover:text-white transition-colors duration-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cyberpunk Live Visual Panel / Image Panel */}
                <div className="md:col-span-5 min-h-[220px] md:min-h-auto relative perspective-1000 flex flex-col justify-end">
                  {project.image ? (
                    <div className="w-full h-full relative md:absolute md:w-[140%] md:h-[250%] md:bottom-7 md:-right-19 transform hover:scale-105 md:rotate-y-[-5deg] md:rotate-x-[5deg] hover:rotate-0 transition-all duration-500 z-20 group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index === 0}
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-lg overflow-hidden border border-white/10 relative">
                      {visuals[index]}
                    </div>
                  )}

                  {/* Status & Live Link (Moved to bottom right) */}
                  <div className="flex items-center justify-start md:justify-end gap-3 pt-6 mt-auto relative z-30">
                    <span className="flex items-center space-x-1 text-[8px] font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-neon-purple" />
                      <span>{project.status}</span>
                    </span>
                    <a
                      href="#"
                      className="flex items-center space-x-1 text-[9px] font-mono text-electric-cyan/80 bg-electric-cyan/5 hover:bg-electric-cyan/15 border border-electric-cyan/20 px-3 py-1 rounded-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>LIVE PROJECT</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
