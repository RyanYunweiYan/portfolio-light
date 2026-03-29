/**
 * Hero Section — The key moment
 * Design: Editorial Noir — dramatic center-aligned entrance
 * Animation: white screen 0.3s -> name word-by-word fade+blur -> static title -> typewriter secondary -> CTA
 * Parallax: hero text moves at 0.9x scroll speed
 *
 * RECRUITER-FIRST: Value proposition visible in <3 seconds.
 * Static title ("AI Product Manager & Builder") shown immediately after name.
 * Key metrics hinted above the fold. Two CTAs: primary (Contact) + secondary (Work).
 * CTA buttons appear on a timed delay, NOT gated on typewriter completion.
 */
import { useEffect, useState, useRef } from "react";
import { useScrollY } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE, METRICS } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

const nameWords = PROFILE.name.split(" ");

export default function Hero() {
  const scrollY = useScrollY();
  const { lang, t } = useLanguage();
  const [showContent, setShowContent] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);

  // Typewriter state for cycling secondary taglines
  const [typedText, setTypedText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const secondaryTaglines =
    lang === "en"
      ? [
          "Turning AI capability into real-world product impact",
          "Shipping real products, powered by AI",
          "From concept to code to customer — with AI",
        ]
      : [
          "用 AI 能力创造真实的产品价值",
          "用 AI 做出真正能用的产品",
          "从想法到代码到用户——全程 AI 驱动",
        ];

  // Reset typewriter when language changes
  const prevLang = useRef(lang);
  useEffect(() => {
    if (prevLang.current !== lang) {
      prevLang.current = lang;
      setTypedText("");
      setTaglineIndex(0);
      setIsDeleting(false);
    }
  }, [lang]);

  // Initial white screen delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Trigger name complete after stagger delay
  useEffect(() => {
    if (!showContent) return;
    const timer = setTimeout(() => setNameComplete(true), 300 + nameWords.length * 200 + 400);
    return () => clearTimeout(timer);
  }, [showContent]);

  // Typewriter cycling effect (starts after name is complete)
  useEffect(() => {
    if (!nameComplete) return;

    const target = secondaryTaglines[taglineIndex];

    if (isDeleting) {
      if (typedText === "") {
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % secondaryTaglines.length);
        return;
      }
      const timer = setTimeout(() => {
        setTypedText((prev) => prev.slice(0, -1));
      }, 30);
      return () => clearTimeout(timer);
    }

    if (typedText === target) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      setTypedText(target.slice(0, typedText.length + 1));
    }, 50);
    return () => clearTimeout(timer);
  }, [nameComplete, typedText, isDeleting, taglineIndex, secondaryTaglines]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.03) 0%, #FFFFFF 70%)", minHeight: "100dvh" }}
    >
      <div
        className="text-center px-6 max-w-[900px] mx-auto"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          opacity: Math.max(0, 1 - scrollY / (window.innerHeight * 0.7)),
          filter: `blur(${Math.min(scrollY / 250, 6)}px)`,
          willChange: "transform, opacity, filter",
        }}
      >
        <AnimatePresence>
          {showContent && (
            <>
              {/* Name — word by word */}
              <h1 className={lang === "zh" ? "mb-2" : "mb-4"}>
                {nameWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.2,
                      ease: EASE.smooth,
                    }}
                    className="inline-block mr-3 sm:mr-5 last:mr-0"
                    style={{
                      fontSize: lang === "zh" ? "clamp(40px, 8vw, 72px)" : "clamp(48px, 10vw, 88px)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      color: "#1D1D1F",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Chinese name — separate line below, subtle */}
              {lang === "zh" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-[16px] sm:text-[18px] font-normal tracking-[0.2em]"
                  style={{ color: "rgba(29,29,31,0.35)" }}
                >
                  {PROFILE.nameCN}
                </motion.p>
              )}

              {/* Static title */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: EASE.smooth }}
                className={`font-semibold tracking-tight ${lang === "zh" ? "text-[18px] md:text-[22px] mb-4 mt-2" : "text-[22px] md:text-[28px] mb-3"}`}
                style={{ color: "#1D1D1F" }}
              >
                {t(PROFILE.title)}
              </motion.p>

              {/* Secondary tagline — typewriter cycling (decorative, not gating anything) */}
              <div className="min-h-10 flex items-center justify-center mb-6 px-2">
                <p
                  className="text-[15px] md:text-[20px] font-normal tracking-wide"
                  style={{ color: "rgba(29,29,31,0.50)" }}
                >
                  {typedText}
                  <span
                    className="typing-cursor inline-block ml-0.5"
                    style={{
                      width: "2px",
                      height: "1.1em",
                      backgroundColor: "#0071E3",
                      verticalAlign: "text-bottom",
                    }}
                  />
                </p>
              </div>

              {/* Key metrics strip — social proof above the fold */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease: EASE.smooth }}
                className="flex flex-wrap justify-center gap-x-8 gap-y-3 sm:gap-x-10 md:gap-x-12 mb-8"
              >
                {METRICS.map((metric, i) => (
                  <div key={i} className="text-center">
                    <span
                      className="text-[20px] sm:text-[24px] font-bold tracking-tight"
                      style={{ color: "#1D1D1F" }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="block text-[12px] sm:text-[13px] font-medium tracking-wide mt-0.5"
                      style={{ color: "rgba(29,29,31,0.50)" }}
                    >
                      {t(metric.label)}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons — appear on timed delay, NOT gated on typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2, ease: EASE.smooth }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4"
              >
                <motion.a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[15px] font-medium rounded-full"
                  style={{
                    backgroundColor: "#0071E3",
                    color: "#FFFFFF",
                    boxShadow: "0 2px 12px rgba(0,113,227,0.25)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 30px rgba(0,113,227,0.45)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {lang === "en" ? "Get in Touch" : "联系我"}
                </motion.a>
                <motion.a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[15px] font-medium rounded-full"
                  style={{
                    backgroundColor: "transparent",
                    color: "#0071E3",
                    border: "1.5px solid rgba(0,113,227,0.3)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: "rgba(0,113,227,0.06)",
                    borderColor: "rgba(0,113,227,0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {lang === "en" ? "View my work" : "查看我的作品"}
                </motion.a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle scroll indicator */}
      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex items-center justify-center w-11 h-11"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        whileHover={{ opacity: 0.7, scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label={lang === "en" ? "Scroll down" : "向下滚动"}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8"
          style={{ backgroundColor: "#1D1D1F" }}
        />
      </motion.button>
    </section>
  );
}
