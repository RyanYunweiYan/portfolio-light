/**
 * Bitepedia Section
 * Design: Live interactive demo embedded inline, vintage paper tone framed by site neutral
 * Animation: section fade-up + iframe scale-in
 * Behavior: iframe loads /bitepedia/ static site; user clicks/taps inside to drill
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

export default function BitepediaSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { lang } = useLanguage();

  const headline = lang === "en" ? "Bitepedia" : "Bitepedia";
  const sub =
    lang === "en"
      ? "A bite-sized encyclopedia of food — try it below"
      : "食物的另一种打开方式 — 试试看";
  const hint =
    lang === "en"
      ? "Tap any food in the anatomy to drill into its components"
      : "点食物主图任意位置 · 钻入它的组成";

  return (
    <section
      ref={ref}
      className="relative pt-14 md:pt-20 pb-8 md:pb-10 px-6 md:px-10"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.smooth }}
          className="mb-8 md:mb-12"
        >
          <p
            className="text-[12px] md:text-[13px] font-medium uppercase tracking-[0.3em] mb-4"
            style={{ color: "#0071E3" }}
          >
            Live Demo
          </p>
          <h2
            className="text-[44px] md:text-[64px] font-semibold tracking-tight mb-3"
            style={{ color: "#1d1d1f", lineHeight: 1.05 }}
          >
            {headline}
          </h2>
          <p
            className="text-[18px] md:text-[22px]"
            style={{ color: "rgba(29,29,31,0.55)" }}
          >
            {sub}
          </p>
          <p
            className="mt-4 text-[13px] md:text-[14px]"
            style={{ color: "rgba(29,29,31,0.45)" }}
          >
            {hint}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE.smooth }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow:
              "0 18px 60px rgba(58,46,31,0.12), 0 4px 14px rgba(0,0,0,0.04)",
          }}
        >
          <iframe
            src="/bitepedia/index.html"
            title="Bitepedia Demo"
            className="block w-full"
            style={{
              height: "min(86vh, 820px)",
              border: "none",
              backgroundColor: "#f3eadb",
            }}
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 flex items-center justify-end"
        >
          <a
            href="/bitepedia/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium hover:underline"
            style={{ color: "#0071E3" }}
          >
            {lang === "en" ? "Open full screen ↗" : "全屏打开 ↗"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
