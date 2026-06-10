/**
 * Athena Section — Live Demo
 * Design: mirrors BitepediaSection's "Live Demo" treatment. Athena is a
 * full-screen voice-agent app, so instead of cramming it into an iframe we
 * show a full-width preview that opens the real demo full screen, plus a link
 * to its automated evaluation report (the "build + test" story).
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

const DEMO_URL = "https://athena.ryanyunwei.com/showcase";
const EVAL_URL = "https://athena.ryanyunwei.com/eval";

export default function AthenaSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { lang } = useLanguage();

  // Scroll-scrubbed entrance for the preview frame
  const frameRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "start 0.35"],
  });
  const frameScale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const frameY = useTransform(scrollYProgress, [0, 1], [28, 0]);

  const sub =
    lang === "en"
      ? "A voice agent for clinic front desks — watch it handle real calls"
      : "诊所前台的语音坐席 — 看它处理真实来电";
  const hint =
    lang === "en"
      ? "Pick a call: book a visit, reschedule by confirmation code, or watch it stay in its lane"
      : "选一通电话：预约就诊、凭确认码改期，或看它守住自己的边界";

  return (
    <section
      ref={ref}
      className="relative pt-8 md:pt-10 pb-14 md:pb-20"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Text column — padding inside the container so the left edge matches
          every other section's 1200 grid exactly */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
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
            Athena
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
      </div>

      {/* Media frame — bleeds out to 1400 for showcase presence */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <motion.a
          ref={frameRef}
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE.smooth }}
          className="group block rounded-2xl overflow-hidden relative cursor-pointer"
          style={{
            scale: frameScale,
            y: frameY,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow:
              "0 18px 60px rgba(31,41,90,0.14), 0 4px 14px rgba(0,0,0,0.04)",
          }}
        >
          <img
            src="/images/projects/athena-hero.png"
            alt="Athena voice agent — a live call replay showing the agent pipeline and reasoning trace"
            width={3200}
            height={1800}
            className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            style={{ aspectRatio: "3200 / 1800" }}
            loading="lazy"
          />
          {/* Hover scrim — desktop only by nature */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "rgba(15,16,26,0.14)" }}
          />
          {/* Play affordance — always visible so touch users know it's tappable */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px) saturate(160%)",
                WebkitBackdropFilter: "blur(12px) saturate(160%)",
                color: "#1d1d1f",
                boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
              }}
            >
              ▶ {lang === "en" ? "Play a live call" : "播放一通电话"}
            </span>
          </div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center justify-start md:justify-end gap-x-5 gap-y-2"
        >
          <a
            href={EVAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium hover:underline"
            style={{ color: "rgba(29,29,31,0.78)" }}
          >
            {lang === "en"
              ? "And it tests itself — a fully automated AI eval agent ↗"
              : "连测试都是全自动 — 一个 AI 评测 Agent 自动拷打它 ↗"}
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium hover:underline"
            style={{ color: "#0071E3" }}
          >
            {lang === "en" ? "Open the live demo ↗" : "全屏打开 demo ↗"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
