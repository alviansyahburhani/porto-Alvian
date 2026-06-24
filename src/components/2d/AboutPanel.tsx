"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import PhoneModel from "@/components/3d/PhoneModel";

interface AboutPanelProps {
  mouse: { x: number; y: number };
}

export default function AboutPanel({ mouse }: AboutPanelProps) {
  return (
    <section id="about" className="relative w-full min-h-[30vh] py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-cyber-dark/50 md:-mt-32">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-electric-cyan/50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-purple/50"></div>

      {/* About Box - Full Width (Expanded to col-span-12, matching request for long right-stretch) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:col-span-12 relative p-6 md:p-8 md:pr-[30%] rounded-lg glassmorphism cyber-border-purple"
      >
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-neon-purple/20 text-[9px] font-mono text-neon-purple px-2 py-0.5 border-b border-l border-neon-purple/40 uppercase rounded-tr-md">
          core.bio
        </div>

        <h3 className="text-xs font-mono text-electric-cyan tracking-[0.2em] uppercase mb-2">
          [ about me ]
        </h3>
        <h2 className="text-xl md:text-2xl font-bold text-white uppercase mb-4 tracking-wide font-sans">
          ALVIAN SYAH BURHANI
        </h2>

        <p className="text-sm md:text-base text-white/80 leading-relaxed font-mono">
          Hello everyone... Nama panggilanku <strong className="text-electric-cyan">Alvian</strong>, Kelahiran 2004 dengan domisili Kota Makassar. Saya adalah <strong className="text-neon-purple">Fresh Graduate Teknik Informatika Universitas Muhammadiyah Makassar </strong> Berfokus Pada <strong className="text-neon-purple">Frontend Web Developer & Machine Learning</strong> Dengan Mengutamakan pada rekayasa antarmuka web modern yang bersih untuk pengguna, performan, dan memiliki estetika visual tinggi. Berpengalaman dalam menjembatani fungsionalitas kode dengan keindahan desain grafis.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-white/60">
          <span className="bg-white/5 border border-white/10 px-2 py-1">[ FRONTEND ]</span>
          <span className="bg-white/5 border border-white/10 px-2 py-1">[ MACHINE LEARNING ]</span>
          <span className="bg-white/5 border border-white/10 px-2 py-1">[ UI/UX ]</span>
        </div>

        {/* Desktop-only Absolutely Positioned Phone Canvas (locked inside the card container at bottom-0) */}
        <div className="hidden md:block absolute right-4 lg:right-8 xl:right-12 bottom-0 w-[280px] lg:w-[350px] xl:w-[420px] h-[500px] lg:h-[620px] xl:h-[750px] z-20 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00f0ff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8a2be2" />
            <PhoneModel mouse={mouse} isLocal={true} isMobile={false} />
          </Canvas>
        </div>
      </motion.div>
    </section>
  );
}
