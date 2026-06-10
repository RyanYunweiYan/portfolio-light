/**
 * Home Page — Single page personal showcase
 * Design: Editorial Noir — Apple minimalism with cinematic motion
 * Structure: Hero -> About -> Projects -> [gradient] -> Creative -> AIStack -> Contact -> Footer
 */
import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollBackground from "@/components/ScrollBackground";
import { useLanguage } from "@/contexts/LanguageContext";


// Lazy-load below-the-fold sections for faster initial paint
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const BitepediaSection = lazy(() => import("@/components/BitepediaSection"));
const AthenaSection = lazy(() => import("@/components/AthenaSection"));
const ContentSection = lazy(() => import("@/components/Content"));
const AIStack = lazy(() => import("@/components/AIStack"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  // Invisible button must not capture clicks at the top of the page
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "auto" : "none"));
  const { lang } = useLanguage();

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        backgroundColor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        color: "#1D1D1F",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        opacity,
        pointerEvents,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={lang === "en" ? "Back to top" : "回到顶部"}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </motion.button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <BackToTop />
      <ScrollBackground />
      <Navbar />
      <Hero />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <About />
        <BitepediaSection />
        <AthenaSection />
        <Projects />
        <ContentSection />
        <AIStack />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
