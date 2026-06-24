"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import FloatingIcons from "@/components/3d/FloatingIcons";

interface Experience {
  company: string;
  position: string;
  status: string;
  location: string;
  period: string;
  description: string;
}

const EXPERIENCES: Experience[] = [
  {
    company: "Universitas Muhammadiyah Makassar",
    position: "Research Study",
    status: "Student",
    location: "Soppeng, RSUD Latemmamala",
    period: "Januari 2026 - Januari 2026",
    description: "Melakukan Penelitian Machine learning mendeteksi seberapa parah pasien mengalami penyakit ISPA"
  },
  {
    company: "BOSOWA TRANSPORTATION",
    position: "IT DIVISION",
    status: "Intern",
    location: "Makassar, Office",
    period: "Agustus 2025 - November 2025",
    description: "Membangun aplikasi web manajemen aset menggunakan fullstack CodeIgniter, serta mengembangkan sistem web scraping otomatis—menggunakan Java untuk proses scraping dan HTML/CSS untuk antarmuka—guna meningkatkan efisiensi bisnis."
  },
  {
    company: "MAS Muhammadiyah Enrekang",
    position: "Frontend Developer",
    status: "Kuliah Kerja Nyata - KKN",
    location: "Enrekang",
    period: "November 2025 - Desember 2025",
    description: "Berkolaborasi dengan tim dalam membangun website informasi sekolah secara komprehensif untuk meningkatkan eksistensi digital dan aksesibilitas informasi institusi menggunakan fullstack CodeIgniter."
  },
  {
    company: "Sistem Digital Koperasi Merah Putih (Sisdikop)",
    position: "Frontend Developer",
    status: "Remote",
    location: "Makassar",
    period: "November 2025 - Sekarang",
    description: "Merancang arsitektur frontend multi-tenant yang tangguh pada platform SaaS, memungkinkan penyediaan landing page mandiri bagi setiap koperasi daerah untuk manajemen operasional yang mandiri menggunakan Next.js dan Tailwind CSS."
  },
  {
    company: "Website Manajemen Toko & Point Of Sale (POS)",
    position: "Frontend Developer",
    status: "Academic Project",
    location: "Makassar",
    period: "Januari 2026 - April 2026",
    description: "Merancang dan mengembangkan aplikasi web Point of Sale (POS) khusus untuk toko Bangunan guna mengoptimalkan efisiensi pemrosesan transaksi Invoice dan manajemen inventaris dengan antarmuka UI/UX yang responsif dan berkinerja tinggi menggunakan Next.js dan Tailwind CSS."
  }
];

export default function SoftwarePanel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Monitor screen width dynamically for client-side pixel conversion
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  // Track progress of the scroll container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Motion values to drive the scroll position and the idle slow sway
  const x1Val = useMotionValue(isDesktop ? -300 : -150);
  const x2Val = useMotionValue(isDesktop ? 50 : 10);
  const x3Val = useMotionValue(isDesktop ? -250 : -120);

  useEffect(() => {
    let active = true;
    let frameId: number;
    const startTime = performance.now();

    const update = () => {
      if (!active) return;
      const elapsed = (performance.now() - startTime) / 1000;

      // Current scroll progress mapped to base X values
      const progress = scrollYProgress.get();

      let r1Base = 0;
      let r2Base = 0;
      let r3Base = 0;

      if (isDesktop) {
        // Desktop range: covers movement while keeping titles covered by absolute gradients
        r1Base = -350 + progress * 500; // -350 to +150
        r2Base = 150 - progress * 500; // +150 to -350
        r3Base = -350 + progress * 500; // -350 to +150
      } else {
        // Mobile range: dynamic layout depending on screen width (windowWidth)
        const pad = 40;
        
        // Row 1 (Frontend): 6 items. Spacing starts at 120, steps 160. Total width = 920.
        const r1Start = windowWidth - 920 - pad;
        const r1End = pad;
        r1Base = r1Start + progress * (r1End - r1Start);

        // Row 2 (Backend & ML): 5 items. Spacing starts at 120, steps 160. Total width = 760.
        const r2Start = pad;
        const r2End = windowWidth - 760 - pad;
        r2Base = r2Start + progress * (r2End - r2Start);

        // Row 3 (Tools): 4 items. Spacing starts at 120, steps 160. Total width = 600.
        const r3Start = windowWidth - 600 - pad;
        const r3End = pad;
        r3Base = r3Start + progress * (r3End - r3Start);
      }

      // Add a slow, gentle continuous idle movement (e.g. sine wave)
      const idleOffset1 = Math.sin(elapsed * 0.5) * 25;
      const idleOffset2 = Math.sin(elapsed * 0.5 + Math.PI / 2) * 25;
      const idleOffset3 = Math.sin(elapsed * 0.5 + Math.PI) * 25;

      x1Val.set(r1Base + idleOffset1);
      x2Val.set(r2Base + idleOffset2);
      x3Val.set(r3Base + idleOffset3);

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [scrollYProgress, isDesktop, windowWidth, x1Val, x2Val, x3Val]);

  return (
    <div className="w-full flex flex-col bg-transparent relative" style={{ position: "relative" }}>
      
      {/* Part 1: Tech Stack Section (Horizontal Scroll on Vertical Page Scroll, Alternating Rows) */}
      <section
        ref={sectionRef}
        className="relative w-full h-[220vh] bg-transparent"
        style={{ position: "relative" }}
      >
        {/* Sticky container wraps viewport */}
        <div className="sticky top-0 w-full h-screen flex flex-col justify-center gap-4 md:gap-6 py-6 px-6 md:px-12 overflow-hidden">
          
          {/* Row 1: Frontend (Left-aligned Title, scrolls Left to Right) */}
          <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between -skew-y-2 md:h-[110px]">
            {/* On Mobile: Title is stacked above the track */}
            <div className="w-full md:hidden flex flex-col font-mono px-4 mb-2 skew-y-2">
              <span className="text-[8px] text-electric-cyan/45 tracking-widest uppercase">// 01</span>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                Frontend
              </h3>
            </div>

            {/* On Desktop: Left overlay with title */}
            <div className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 items-center pl-4 pr-16 bg-gradient-to-r from-[#030f26] via-[#030f26] to-transparent font-mono skew-y-2">
              <div className="flex flex-col">
                <span className="text-[8px] text-electric-cyan/45 tracking-widest uppercase">// 01</span>
                <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                  Frontend
                </h3>
              </div>
            </div>

            {/* Track container */}
            <div className="w-full relative overflow-hidden h-[110px] flex items-center">
              <motion.div style={{ x: x1Val }} className="absolute w-[1000px] h-[110px] skew-y-2">
                {/* 2D Labels */}
                {["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS"].map((tech, idx) => (
                  <span
                    key={tech}
                    className="absolute text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-electric-cyan select-none transition-colors duration-250"
                    style={{
                      left: `${120 + idx * 160}px`,
                      transform: "translateX(-50%)",
                      top: "12px"
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {/* 3D Canvas Layer */}
                <div className="absolute inset-0 pt-[38px] pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 5], fov: 32 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[2, 2, 5]} intensity={1.1} color="#00f0ff" />
                    <FloatingIcons category="frontend" />
                  </Canvas>
                </div>
              </motion.div>
            </div>

            {/* On Desktop: Right overlay fade */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030f26] to-transparent pointer-events-none z-20" />
          </div>

          {/* Row 2: Backend & Machine Learning (Right-aligned Title, scrolls Right to Left) */}
          <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between -skew-y-2 md:h-[110px]">
            {/* On Mobile: Title is stacked above the track */}
            <div className="w-full md:hidden flex flex-col font-mono px-4 mb-2 skew-y-2 text-right">
              <span className="text-[8px] text-neon-purple/45 tracking-widest uppercase">// 02</span>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                Backend & Machine Learning
              </h3>
            </div>

            {/* On Desktop: Left overlay fade */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030f26] to-transparent pointer-events-none z-20" />

            {/* Track container */}
            <div className="w-full relative overflow-hidden h-[110px] flex items-center">
              <motion.div style={{ x: x2Val }} className="absolute w-[900px] h-[110px] skew-y-2">
                {/* 2D Labels */}
                {["PHP", "CodeIgniter", "Python", "Google Colab", "Scikit-Learn"].map((tech, idx) => (
                  <span
                    key={tech}
                    className="absolute text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-neon-purple select-none transition-colors duration-250"
                    style={{
                      left: `${120 + idx * 160}px`,
                      transform: "translateX(-50%)",
                      top: "12px"
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {/* 3D Canvas Layer */}
                <div className="absolute inset-0 pt-[38px] pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 5], fov: 32 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[2, 2, 5]} intensity={1.1} color="#8a2be2" />
                    <FloatingIcons category="backend_ml" />
                  </Canvas>
                </div>
              </motion.div>
            </div>

            {/* On Desktop: Right overlay with title */}
            <div className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 items-center pr-4 pl-16 bg-gradient-to-l from-[#030f26] via-[#030f26] to-transparent font-mono skew-y-2">
              <div className="flex flex-col text-right">
                <span className="text-[8px] text-neon-purple/45 tracking-widest uppercase">// 02</span>
                <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                  Backend & Machine Learning
                </h3>
              </div>
            </div>
          </div>

          {/* Row 3: Tools (Left-aligned Title, scrolls Left to Right) */}
          <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between -skew-y-2 md:h-[110px]">
            {/* On Mobile: Title is stacked above the track */}
            <div className="w-full md:hidden flex flex-col font-mono px-4 mb-2 skew-y-2">
              <span className="text-[8px] text-white/30 tracking-widest uppercase">// 03</span>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                Tools
              </h3>
            </div>

            {/* On Desktop: Left overlay with title */}
            <div className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 items-center pl-4 pr-16 bg-gradient-to-r from-[#030f26] via-[#030f26] to-transparent font-mono skew-y-2">
              <div className="flex flex-col">
                <span className="text-[8px] text-white/30 tracking-widest uppercase">// 03</span>
                <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                  Tools
                </h3>
              </div>
            </div>

            {/* Track container */}
            <div className="w-full relative overflow-hidden h-[110px] flex items-center">
              <motion.div style={{ x: x3Val }} className="absolute w-[800px] h-[110px] skew-y-2">
                {/* 2D Labels */}
                {["Figma", "Canva", "VS Code", "Antigravity"].map((tech, idx) => (
                  <span
                    key={tech}
                    className="absolute text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-white select-none transition-colors duration-250"
                    style={{
                      left: `${120 + idx * 160}px`,
                      transform: "translateX(-50%)",
                      top: "12px"
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {/* 3D Canvas Layer */}
                <div className="absolute inset-0 pt-[38px] pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 5], fov: 32 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[2, 2, 5]} intensity={1.1} color="#ffffff" />
                    <FloatingIcons category="tools" />
                  </Canvas>
                </div>
              </motion.div>
            </div>

            {/* On Desktop: Right overlay fade */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030f26] to-transparent pointer-events-none z-20" />
          </div>

          {/* Progress bar at the bottom */}
          <div className="w-full max-w-md mx-auto h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden relative z-10">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="w-full h-full bg-gradient-to-r from-electric-cyan to-neon-purple"
            />
          </div>

        </div>
      </section>

      {/* Part 2: Experience Section (Vertical Timeline) */}
      <section className="relative w-full py-16 px-6 md:px-12 border-b border-electric-cyan/20 bg-cyber-dark/20 backdrop-blur-sm">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-mono text-neon-purple tracking-[0.2em] uppercase">
              [ career path ]
            </h3>
            <span className="text-[9px] font-mono text-neon-purple/50">SECURE_FEED.01</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-8">
            EXPERIENCE
          </h2>

          <div className="flex flex-col space-y-6 overflow-hidden">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-6 bg-cyber-light/20 border border-white/5 border-l-2 border-l-neon-purple hover:border-l-electric-cyan rounded-r-xl relative group hover:bg-cyber-light/40 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_0_12px_rgba(0,240,255,0.1)]"
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-neon-purple/40 group-hover:bg-electric-cyan transition-colors duration-300"></div>

                {/* Duration & Status */}
                <div className="flex justify-between items-center mb-2 text-[10px] font-mono">
                  <span className="text-white/40 group-hover:text-white/60 transition-colors duration-300">{exp.period}</span>
                  <span className="px-2.5 py-0.5 rounded bg-neon-purple/10 text-neon-purple border border-neon-purple/20 group-hover:bg-electric-cyan/10 group-hover:text-electric-cyan group-hover:border-electric-cyan/20 transition-all duration-300 uppercase scale-90 origin-right">
                    {exp.status}
                  </span>
                </div>

                {/* Position & Company */}
                <h4 className="text-base font-bold text-white tracking-wide leading-tight group-hover:text-neon-purple transition-colors duration-300">
                  {exp.position}
                </h4>
                <div className="text-xs font-mono text-white/60 mt-1 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-white/80">{exp.company}</span>
                  <span className="text-white/30">•</span>
                  <span>{exp.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs font-mono text-white/70 leading-relaxed mt-3 pt-3 border-t border-white/5">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
