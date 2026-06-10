/**
 * Hero Section — The key moment
 * Design: Editorial Noir — dramatic center-aligned entrance
 * Animation: white screen 0.3s -> name word-by-word fade+blur -> static title -> rotating tagline crossfade -> CTA
 * Exit: scroll-scrubbed parallax + fade driven by motion values (zero React re-renders)
 *
 * RECRUITER-FIRST: Value proposition visible in <3 seconds.
 * Static title ("AI Product Manager & Builder") shown immediately after name.
 * Key metrics hinted above the fold. Two CTAs: primary (Contact) + secondary (Work).
 */
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { PROFILE, METRICS } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

const nameWords = PROFILE.name.split(" ");

export default function Hero() {
  const { lang, t } = useLanguage();
  const [showContent, setShowContent] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Scroll-scrubbed exit — motion values run on the compositor, resize-safe
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

  // Reset rotation when language changes
  const prevLang = useRef(lang);
  useEffect(() => {
    if (prevLang.current !== lang) {
      prevLang.current = lang;
      setTaglineIndex(0);
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

  // Rotate taglines with a quiet crossfade (starts after name is complete)
  useEffect(() => {
    if (!nameComplete) return;
    const id = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % secondaryTaglines.length);
    }, 3800);
    return () => clearInterval(id);
  }, [nameComplete, secondaryTaglines.length]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,113,227,0.03) 0%, #FFFFFF 70%)", minHeight: "88dvh" }}
    >
      <motion.div
        className="text-center px-6 max-w-[900px] mx-auto"
        style={{ y: heroY, opacity: heroOpacity }}
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

              {/* Secondary tagline — full-line crossfade rotation (decorative, not gating anything) */}
              <div className="min-h-10 flex items-center justify-center mb-6 px-2">
                <AnimatePresence mode="wait">
                  {nameComplete && (
                    <motion.p
                      key={`${lang}-${taglineIndex}`}
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: EASE.smooth }}
                      className="text-[15px] md:text-[20px] font-normal tracking-wide"
                      style={{ color: "rgba(29,29,31,0.50)" }}
                    >
                      {secondaryTaglines[taglineIndex]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Key metrics strip — social proof above the fold, editorial stat strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease: EASE.smooth }}
                className="grid grid-cols-3 gap-x-1 md:gap-x-2 gap-y-5 max-w-[920px] mx-auto mb-8"
              >
                {METRICS.map((metric, i) => (
                  <div
                    key={i}
                    className={`text-center px-2 md:px-3 py-0.5 ${i > 0 ? "border-l" : ""}`}
                    style={{ borderColor: "rgba(29,29,31,0.10)" }}
                  >
                    <span
                      className="block text-[22px] sm:text-[24px] md:text-[26px] font-semibold tracking-tight"
                      style={{
                        color: "#1D1D1F",
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="block text-[10px] md:text-[11px] font-medium uppercase tracking-[0.05em] mt-1.5 md:whitespace-nowrap leading-tight"
                      style={{ color: "rgba(29,29,31,0.45)" }}
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
      </motion.div>
    </section>
  );
}
