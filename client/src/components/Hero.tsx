/**
 * Hero Section
 * Direction: Apple-style professional credibility, led by Ryan's identity and proof.
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { PROFILE, METRICS } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

const nameWords = PROFILE.name.split(" ");

function EvidenceStrip({ t }: { t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0, ease: EASE.smooth }}
      className="mx-auto mt-8 grid w-full max-w-[940px] grid-cols-2 border-y border-black/[0.08] md:grid-cols-4"
    >
      {METRICS.map((metric, i) => (
        <div
          key={i}
          className="min-h-[92px] px-4 py-5 text-left md:min-h-[104px] md:px-6"
        >
          <span className="block text-[28px] font-semibold leading-none text-[#1D1D1F] md:text-[34px]">
            {metric.value}
          </span>
          <span className="mt-3 block text-[12px] font-medium leading-[1.35] text-black/50 md:text-[13px]">
            {t(metric.label)}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 180);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32"
      style={{ minHeight: "100dvh" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1180px] text-center">
        <AnimatePresence>
          {showContent && (
            <>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: EASE.smooth }}
                className="mx-auto mb-5 text-[13px] font-medium leading-none text-black/48"
              >
                {lang === "en"
                  ? "AI Product Manager / Builder"
                  : "AI 产品经理 / 独立开发者"}
              </motion.p>

              <h1 className="mb-4">
                {nameWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.58,
                      delay: 0.18 + i * 0.16,
                      ease: EASE.smooth,
                    }}
                    className="mr-3 inline-block text-[54px] font-semibold leading-[1.02] text-[#1D1D1F] last:mr-0 sm:mr-5 sm:text-[72px] md:text-[96px]"
                    style={{ letterSpacing: "0em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {lang === "zh" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.56, ease: EASE.smooth }}
                  className="mb-4 text-[16px] font-normal text-black/38 sm:text-[18px]"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {PROFILE.nameCN}
                </motion.p>
              )}

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.62, ease: EASE.smooth }}
                className="mx-auto max-w-[780px] text-[21px] font-semibold leading-[1.28] text-[#1D1D1F] md:text-[28px]"
              >
                {t(PROFILE.title)}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.74, ease: EASE.smooth }}
                className="mx-auto mt-4 max-w-[720px] text-[16px] font-normal leading-[1.7] text-black/58 md:text-[19px]"
              >
                {t(PROFILE.tagline)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.86, ease: EASE.smooth }}
                className="mt-7 flex flex-wrap justify-center gap-3"
              >
                <motion.a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium sm:px-7"
                  style={{
                    backgroundColor: "#0071E3",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 16px rgba(0,113,227,0.18)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 24px rgba(0,113,227,0.24)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  <Mail size={16} />
                  {lang === "en" ? "Get in touch" : "联系我"}
                </motion.a>
                <motion.a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-white px-6 py-3 text-[15px] font-medium text-[#1D1D1F] sm:px-7"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(0,113,227,0.35)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                >
                  {lang === "en" ? "View work" : "查看作品"}
                  <ArrowRight size={16} className="text-[#0071E3]" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.98, ease: EASE.smooth }}
                className="mx-auto mt-12 w-full max-w-[1040px] overflow-hidden rounded-[8px] border border-black/[0.06] bg-[#F5F5F7] shadow-[0_24px_70px_rgba(0,0,0,0.08)]"
              >
                <img
                  src="/images/ryan-speaking.png"
                  alt={
                    lang === "en"
                      ? "Ryan speaking at an event"
                      : "Ryan 在活动现场分享"
                  }
                  className="h-[230px] w-full object-cover object-[62%_38%] sm:h-[320px] md:h-[390px]"
                  loading="eager"
                />
              </motion.div>

              <EvidenceStrip t={t} />
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        className="absolute bottom-8 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        whileHover={{ opacity: 0.55 }}
        whileTap={{ scale: 0.96 }}
        aria-label={lang === "en" ? "Scroll down" : "向下滚动"}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-7 w-[1px] bg-[#1D1D1F]"
        />
      </motion.button>
    </section>
  );
}
