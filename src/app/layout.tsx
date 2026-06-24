import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alvian Syah Burhani",
  description: "Portfolio website of Alvian Syah, Frontend Web Developer & Data Science Enthusiast. Created with Next.js, Three.js, React Three Fiber, GSAP, and Framer Motion.",
  keywords: ["Alvian Syah", "Frontend Developer", "Machine Learning", "React Three Fiber", "Three.js Portfolio", "Next.js 15", "Cyberpunk Web Design"],
  authors: [{ name: "Alvian" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      style={{ position: "relative" }}
    >
      <body
        className="min-h-full bg-[#030f26] text-white flex flex-col selection:bg-electric-cyan selection:text-cyber-dark"
        style={{ position: "relative" }}
      >
        {children}
      </body>
    </html>
  );
}
