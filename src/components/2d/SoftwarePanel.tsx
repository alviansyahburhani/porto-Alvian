"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  const [windowHeight, setWindowHeight] = useState(800);

  // Monitor screen dimensions dynamically
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Widescreen landscape check: horizontal scroll is enabled on desktops/laptops with wide landscape ratios
  const isDesktop = windowWidth >= 1024 && windowHeight >= 600 && windowWidth > windowHeight;

  // Responsive start margin and step spacing between icons
  const start = isDesktop ? 120 : 80;
  const step = isDesktop
    ? Math.max(130, Math.min(180, windowWidth * 0.1))
    : Math.max(90, Math.min(130, windowWidth * 0.22));

  // Dynamic row track widths
  const w1 = 9 * step + 2 * start;
  const w2 = 2 * step + 2 * start;
  const w3 = 3 * step + 2 * start;

  const progressVal = useMotionValue(0);
  const horizontalProgress = useRef(0);
  const isLocked = useRef(false);

  // States to link 2D label hovers directly to their 3D counterpart icons
  const [hoveredFrontend, setHoveredFrontend] = useState<number | null>(null);
  const [hoveredMachineLearning, setHoveredMachineLearning] = useState<number | null>(null);
  const [hoveredTools, setHoveredTools] = useState<number | null>(null);

  // Smooth out the scroll value using spring physics
  const smoothProgress = useSpring(progressVal, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
    restDelta: 0.001
  });

  // Motion values to drive the scroll position and the idle slow sway
  const x1Val = useMotionValue(isDesktop ? -300 : -150);
  const x2Val = useMotionValue(isDesktop ? 50 : 10);
  const x3Val = useMotionValue(isDesktop ? -250 : -120);

  // Listen to wheel event on desktop to lock scroll and redirect to horizontal scroll
  useEffect(() => {
    if (!isDesktop) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();

      // Determine if the section is close to filling the viewport
      const inLockRange = rect.top <= 100 && rect.top >= -100;

      if (inLockRange) {
        if (!isLocked.current) {
          // Lock scroll if scrolling down and horizontal is not complete
          if (e.deltaY > 0 && horizontalProgress.current < 1) {
            isLocked.current = true;
            window.scrollTo({ top: window.scrollY + rect.top });
          }
          // Lock scroll if scrolling up and horizontal is not empty
          else if (e.deltaY < 0 && horizontalProgress.current > 0) {
            isLocked.current = true;
            window.scrollTo({ top: window.scrollY + rect.top });
          }
        }

        if (isLocked.current) {
          e.preventDefault();

          // Increase or decrease horizontal progress based on scroll delta
          const sensitivity = 0.0012;
          let newProgress = horizontalProgress.current + e.deltaY * sensitivity;
          newProgress = Math.max(0, Math.min(1, newProgress));

          horizontalProgress.current = newProgress;
          progressVal.set(newProgress);

          // Unlock once we reach boundaries and scroll further
          if (newProgress === 1 && e.deltaY > 0) {
            isLocked.current = false;
          } else if (newProgress === 0 && e.deltaY < 0) {
            isLocked.current = false;
          }
        }
      } else {
        isLocked.current = false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isDesktop, windowHeight]);

  useEffect(() => {
    let active = true;
    let frameId: number;
    const startTime = performance.now();

    const update = () => {
      if (!active) return;
      const elapsed = (performance.now() - startTime) / 1000;

      // Calculate scroll progress dynamically using bounding client rect
      let progress = 0;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (isDesktop) {
          if (isLocked.current) {
            progress = horizontalProgress.current;
          } else {
            progress = rect.top < 0 ? 1 : 0;
            horizontalProgress.current = progress;
          }
        } else {
          const startMobile = windowHeight;
          const currentScroll = startMobile - rect.top;
          const totalScroll = rect.height + windowHeight;
          progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
        }
      }
      progressVal.set(progress);

      const smoothed = smoothProgress.get();

      const containerWidth = isDesktop ? Math.min(1152, windowWidth - 96) : windowWidth - 32;

      let r1Base = 0;
      let r2Base = 0;
      let r3Base = 0;

      if (isDesktop) {
        // Desktop range: staggered ranges to create a 3D parallax scroll depth effect
        const r1Start = containerWidth - w1 - 100;
        const r1End = 100;
        r1Base = r1Start + smoothed * (r1End - r1Start);

        const r2Center = (containerWidth - w2) / 2;
        const r2Start = r2Center + 120;
        const r2End = r2Center - 120;
        r2Base = r2Start + smoothed * (r2End - r2Start);

        const r3Center = (containerWidth - w3) / 2;
        const r3Start = r3Center - 100;
        const r3End = r3Center + 100;
        r3Base = r3Start + smoothed * (r3End - r3Start);
      } else {
        // Mobile & Portrait range: dynamic layout depending on screen width (windowWidth)
        const pad = 40;

        // Row 1 (Frontend): 10 items.
        const r1Start = windowWidth - w1 - pad;
        const r1End = pad;
        r1Base = r1Start + smoothed * (r1End - r1Start);

        // Row 2 (Machine Learning): 3 items.
        const r2Start = pad;
        const r2End = windowWidth - w2 - pad;
        r2Base = r2Start + smoothed * (r2End - r2Start);

        // Row 3 (Tools): 4 items.
        const r3Start = windowWidth - w3 - pad;
        const r3End = pad;
        r3Base = r3Start + smoothed * (r3End - r3Start);
      }

      // Add a slow, gentle continuous idle movement (e.g. sine wave)
      // const idleOffset1 = Math.sin(elapsed * 1.0) * 50;
      // const idleOffset2 = Math.sin(elapsed * 1.0 + Math.PI / 2) * 50;
      // const idleOffset3 = Math.sin(elapsed * 1.0 + Math.PI) * 50;

      // x1Val.set(r1Base + idleOffset1);
      // x2Val.set(r2Base + idleOffset2);
      // x3Val.set(r3Base + idleOffset3);

      // frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [smoothProgress, progressVal, isDesktop, windowWidth, windowHeight, x1Val, x2Val, x3Val, start, step, w1, w2, w3]);

  return (
    <div className="w-full flex flex-col bg-transparent relative" style={{ position: "relative" }}>
      {/* Part 1: Tech Stack Section (Horizontal Scroll on Vertical Page Scroll, Alternating Rows) */}
      <section
        ref={sectionRef}
        className="relative w-full bg-transparent border-b border-electric-cyan/20 bg-cyber-dark/10"
        style={{
          position: "relative",
          height: isDesktop ? "100vh" : "auto"
        }}
      >
        {/* Full viewport container on desktop, normal container on mobile */}
        <div
          className="relative w-full overflow-hidden flex flex-col"
          style={{
            position: "relative",
            height: isDesktop ? "100vh" : "auto",
            justifyContent: isDesktop ? "space-around" : "center",
            gap: isDesktop ? "1.5rem" : "1.5rem",
            paddingTop: isDesktop ? "6vh" : "2.5rem",
            paddingBottom: isDesktop ? "6vh" : "2.5rem",
            paddingLeft: isDesktop ? "3rem" : "1rem",
            paddingRight: isDesktop ? "3rem" : "1rem"
          }}
        >

          {/* Row 1: Frontend (Left-aligned Title, scrolls Left to Right) */}
          <div
            className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-between"
            style={{
              flexDirection: isDesktop ? "row" : "column",
              height: isDesktop ? "110px" : "auto"
            }}
          >
            {/* On Mobile/Tablet: Title is stacked above the track */}
            {!isDesktop && (
              <div className="w-full flex flex-col font-mono px-4 mb-2">
                <span className="text-[8px] text-electric-cyan/45 tracking-widest uppercase">// 01</span>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                  Frontend
                </h3>
              </div>
            )}

            {/* On Desktop: Left overlay with title */}
            {isDesktop && (
              <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-4 pr-16 bg-gradient-to-r from-[#030f26] via-[#030f26] to-transparent font-mono">
                <div className="flex flex-col">
                  <span className="text-[8px] text-electric-cyan/45 tracking-widest uppercase">// 01</span>
                  <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                    Frontend
                  </h3>
                </div>
              </div>
            )}

            {/* Track container */}
            <div className="w-full relative overflow-hidden h-[110px] flex items-center">
              <motion.div style={{ x: x1Val, width: `${w1}px` }} className="absolute h-[110px]">
                {/* 2D Labels */}
                {["HTML", "CSS", "React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "PHP", "CodeIgniter"].map((tech, idx) => (
                  <span
                    key={tech}
                    onMouseEnter={() => setHoveredFrontend(idx)}
                    onMouseLeave={() => setHoveredFrontend(null)}
                    className="absolute text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-electric-cyan select-none transition-colors duration-250 cursor-pointer"
                    style={{
                      left: `${start + idx * step}px`,
                      transform: "translateX(-50%)",
                      top: "12px"
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {/* 3D Canvas Layer */}
                <div className="absolute inset-0 pt-[38px] pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 25], fov: 6.4 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[2, 2, 5]} intensity={1.2} color="#ffffff" />
                    <directionalLight position={[-2, -2, 2]} intensity={0.6} color="#00f0ff" />
                    <FloatingIcons category="frontend" progress={smoothProgress} hoveredIndex={hoveredFrontend} start={start} step={step} />
                  </Canvas>
                </div>
              </motion.div>
            </div>

            {/* On Desktop: Right overlay fade */}
            {isDesktop && (
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030f26] to-transparent pointer-events-none z-20" />
            )}
          </div>

          {/* Row 2: Machine Learning (Right-aligned Title, scrolls Right to Left) */}
          <div
            className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-between"
            style={{
              flexDirection: isDesktop ? "row" : "column",
              height: isDesktop ? "110px" : "auto"
            }}
          >
            {/* On Mobile/Tablet: Title is stacked above the track */}
            {!isDesktop && (
              <div className="w-full flex flex-col font-mono px-4 mb-2 text-right">
                <span className="text-[8px] text-emerald-400/45 tracking-widest uppercase">// 02</span>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                  Machine Learning
                </h3>
              </div>
            )}

            {/* On Desktop: Left overlay fade */}
            {isDesktop && (
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030f26] to-transparent pointer-events-none z-20" />
            )}

            {/* Track container */}
            <div className="w-full relative overflow-hidden h-[110px] flex items-center">
              <motion.div style={{ x: x2Val, width: `${w2}px` }} className="absolute h-[110px]">
                {/* 2D Labels */}
                {["Python", "Google Colab", "Scikit-Learn"].map((tech, idx) => (
                  <span
                    key={tech}
                    onMouseEnter={() => setHoveredMachineLearning(idx)}
                    onMouseLeave={() => setHoveredMachineLearning(null)}
                    className="absolute text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-emerald-400 select-none transition-colors duration-250 cursor-pointer"
                    style={{
                      left: `${start + idx * step}px`,
                      transform: "translateX(-50%)",
                      top: "12px"
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {/* 3D Canvas Layer */}
                <div className="absolute inset-0 pt-[38px] pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 25], fov: 6.4 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[2, 2, 5]} intensity={1.2} color="#ffffff" />
                    <directionalLight position={[-2, -2, 2]} intensity={0.6} color="#10b981" />
                    <FloatingIcons category="machine_learning" progress={smoothProgress} hoveredIndex={hoveredMachineLearning} start={start} step={step} />
                  </Canvas>
                </div>
              </motion.div>
            </div>

            {/* On Desktop: Right overlay with title */}
            {isDesktop && (
              <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pr-4 pl-16 bg-gradient-to-l from-[#030f26] via-[#030f26] to-transparent font-mono">
                <div className="flex flex-col text-right">
                  <span className="text-[8px] text-emerald-400/45 tracking-widest uppercase">// 02</span>
                  <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                    Machine Learning
                  </h3>
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Tools (Left-aligned Title, scrolls Left to Right) */}
          <div
            className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-between"
            style={{
              flexDirection: isDesktop ? "row" : "column",
              height: isDesktop ? "110px" : "auto"
            }}
          >
            {/* On Mobile/Tablet: Title is stacked above the track */}
            {!isDesktop && (
              <div className="w-full flex flex-col font-mono px-4 mb-2">
                <span className="text-[8px] text-white/30 tracking-widest uppercase">// 03</span>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                  Tools
                </h3>
              </div>
            )}

            {/* On Desktop: Left overlay with title */}
            {isDesktop && (
              <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-4 pr-16 bg-gradient-to-r from-[#030f26] via-[#030f26] to-transparent font-mono">
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/30 tracking-widest uppercase">// 03</span>
                  <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider mt-1 select-none">
                    Tools
                  </h3>
                </div>
              </div>
            )}

            {/* Track container */}
            <div className="w-full relative overflow-hidden h-[110px] flex items-center">
              <motion.div style={{ x: x3Val, width: `${w3}px` }} className="absolute h-[110px]">
                {/* 2D Labels */}
                {["Figma", "Canva", "VS Code", "Antigravity"].map((tech, idx) => (
                  <span
                    key={tech}
                    onMouseEnter={() => setHoveredTools(idx)}
                    onMouseLeave={() => setHoveredTools(null)}
                    className="absolute text-[10px] font-mono font-bold tracking-widest text-white/40 hover:text-white select-none transition-colors duration-250 cursor-pointer"
                    style={{
                      left: `${start + idx * step}px`,
                      transform: "translateX(-50%)",
                      top: "12px"
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {/* 3D Canvas Layer */}
                <div className="absolute inset-0 pt-[38px] pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 25], fov: 6.4 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[2, 2, 5]} intensity={1.2} color="#ffffff" />
                    <directionalLight position={[-2, -2, 2]} intensity={0.4} color="#ffffff" />
                    <FloatingIcons category="tools" progress={smoothProgress} hoveredIndex={hoveredTools} start={start} step={step} />
                  </Canvas>
                </div>
              </motion.div>
            </div>

            {/* On Desktop: Right overlay fade */}
            {isDesktop && (
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030f26] to-transparent pointer-events-none z-20" />
            )}
          </div>

          {/* Progress bar at the bottom */}
          <div className="w-full max-w-md mx-auto h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden relative z-10">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
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
