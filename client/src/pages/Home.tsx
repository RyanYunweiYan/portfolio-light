/**
 * Home Page — Single page personal showcase
 * Design: Editorial Noir — Apple minimalism with cinematic motion
 * Structure: Hero -> About -> Projects -> [gradient] -> Creative -> AIStack -> Contact -> Footer
 */
import { lazy, Suspense } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollBackground from "@/components/ScrollBackground";
import { useLanguage } from "@/contexts/LanguageContext";


// Lazy-load below-the-fold sections for faster initial paint
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const ContentSection = lazy(() => import("@/components/Content"));
const AIStack = lazy(() => import("@/components/AIStack"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{ scaleX, backgroundColor: "#0071E3" }}
    />
  );
}

function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const { lang } = useLanguage();

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        backgroundColor: "rgba(0,113,227,0.9)",
        color: "#FFFFFF",
        boxShadow: "0 4px 14px rgba(0,113,227,0.3)",
        opacity,
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
      <ScrollProgressBar />
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
        <Projects />
        <ContentSection />
        <AIStack />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
