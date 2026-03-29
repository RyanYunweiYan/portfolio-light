/**
 * AI Stack Section — Tools & investment showcase
 * Design: Dark background, minimal Apple aesthetic
 * Layout: 4-column grid (2-col on mobile) showing Think / Build / Create / Ship
 * Animation: staggered card entrance
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { AI_STACK } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

function AIStackCard({
  category,
  index,
  isInView,
  t,
}: {
  category: (typeof AI_STACK)[number];
  index: number;
  isInView: boolean;
  t: ReturnType<typeof useLanguage>["t"];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.12,
        ease: EASE.smooth,
      }}
      className="p-5 md:p-6 rounded-2xl transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1"
      style={{
        backgroundColor: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px) saturate(150%)",
        WebkitBackdropFilter: "blur(12px) saturate(150%)",
        border: hovered ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3
        className="text-[20px] md:text-[22px] font-semibold mb-1 tracking-tight"
        style={{ color: "#F5F5F7" }}
      >
        {category.category}
      </h3>
      <p
        className="text-[13px] font-normal leading-[1.5] mb-5"
        style={{ color: "rgba(245,245,247,0.55)" }}
      >
        {t(category.description)}
      </p>
      <ul className="space-y-2.5">
        {category.tools.map((tool) => (
          <li
            key={tool}
            className="text-[14px] md:text-[15px] font-normal"
            style={{ color: "rgba(245,245,247,0.65)" }}
          >
            {tool}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function AIStack() {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const { lang, t } = useLanguage();

  return (
    <section
      id="stack"
      ref={ref}
      className="py-14 md:py-24"
      style={{ backgroundColor: "#2D2D2D" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE.smooth }}
          className="text-[13px] font-medium uppercase tracking-[0.15em] mb-4"
          style={{ color: "rgba(245,245,247,0.55)" }}
        >
          {lang === "en" ? "Stack" : "工具栈"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[36px] md:text-[44px] font-semibold leading-[1.15] tracking-tight mb-3"
          style={{ color: "#F5F5F7" }}
        >
          AI Stack
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[17px] md:text-[19px] font-normal leading-[1.6] mb-8 md:mb-14"
          style={{ color: "rgba(245,245,247,0.58)" }}
        >
          {lang === "en" ? "$400+/month personal investment" : "每月 $400+ 个人投入"}
        </motion.p>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {AI_STACK.map((category, i) => (
            <AIStackCard
              key={category.category}
              category={category}
              index={i}
              isInView={isInView}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
