/**
 * About Section
 * Design: Editorial Noir — left-aligned section label, staggered paragraph reveal
 * Animation: "ABOUT" slides from left, headline lines fade up individually,
 * paragraphs blur-clear, skill tags bounce in one by one
 * Background: light gray #F5F5F7
 * Includes: Bio, Skills, Impact Metrics, Credentials
 */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useScrollAnimation";
import { PROFILE, METRICS, CREDENTIALS, EXPERIENCE, AI_STACK } from "@/data/siteData";
import { EASE } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Animated count-up for metric values like "$20M+", "755%", "3,000+"
 */
function CountUp({ value, isInView }: { value: string; isInView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse: extract prefix, number, suffix
    const match = value.match(/^([^0-9]*)([0-9,]+(?:\.\d+)?)(.*)$/);
    if (!match) { setDisplayed(value); return; }

    const prefix = match[1];
    const target = parseFloat(match[2].replace(/,/g, ""));
    const suffix = match[3];
    const hasComma = match[2].includes(",");

    const duration = 1800;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      const formatted = hasComma ? current.toLocaleString() : String(current);
      setDisplayed(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{displayed}</span>;
}

function MetricCard({
  metric,
  index,
  isInView,
  lang,
  t,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  isInView: boolean;
  lang: string;
  t: ReturnType<typeof useLanguage>["t"];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={`${lang}-${index}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.1,
        ease: EASE.smooth,
      }}
      className="p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: hovered
          ? "0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "0 4px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className="text-[32px] md:text-[36px] font-bold tracking-tight leading-none mb-2"
        style={{ color: "#1D1D1F" }}
      >
        <CountUp value={metric.value} isInView={isInView} />
      </p>
      <p
        className="text-[14px] font-semibold mb-1"
        style={{ color: "rgba(29,29,31,0.8)" }}
      >
        {t(metric.label)}
      </p>
      <p
        className="text-[13px] font-normal leading-[1.55]"
        style={{ color: "rgba(29,29,31,0.55)" }}
      >
        {t(metric.description)}
      </p>
    </motion.div>
  );
}

// Extract tool names from AI_STACK + add general skills
const skills = [
  ...AI_STACK.flatMap((cat) => cat.tools.slice(0, 2)),
  "AI Product Strategy",
  "LLM Applications",
  "Prompt Engineering",
  "Cross-functional Leadership",
  "Full-Stack Development",
  "User Research",
];

export default function About() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.08 });
  const { ref: tagsRef, isInView: tagsInView } = useInView({ threshold: 0.3 });
  const { ref: expRef, isInView: expInView } = useInView({ threshold: 0.2 });
  const { ref: metricsRef, isInView: metricsInView } = useInView({ threshold: 0.3 });
  const { ref: credsRef, isInView: credsInView } = useInView({ threshold: 0.3 });
  const { lang, t } = useLanguage();

  const headlineLines = [t(PROFILE.tagline)];
  const bioLines = t(PROFILE.bio);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-36"
      style={{ backgroundColor: "#F5F5F7" }}
    >
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE.smooth }}
          className="text-[13px] font-medium uppercase tracking-[0.15em] mb-4"
          style={{ color: "rgba(29,29,31,0.55)" }}
        >
          {lang === "en" ? "About" : "关于"}
        </motion.p>

        {/* Headline — line by line */}
        <div className="mb-8 md:mb-14">
          {headlineLines.map((line, i) => (
            <motion.h2
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: EASE.smooth,
              }}
              className="text-[36px] md:text-[44px] font-semibold leading-[1.15] tracking-tight"
              style={{ color: "#1D1D1F" }}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Body paragraphs — blur clear */}
        <div className="max-w-[720px] space-y-4 md:space-y-6 mb-10 md:mb-14">
          {bioLines.map((p, i) => (
            <motion.p
              key={`${lang}-${i}`}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.2,
                ease: "easeOut",
              }}
              className="text-[17px] md:text-[19px] leading-[1.65] font-normal"
              style={{ color: "rgba(29,29,31,0.72)" }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Skill tags — bounce in, separate InView trigger */}
        <div ref={tagsRef} className="flex flex-wrap gap-3 mb-12 md:mb-20">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={tagsInView ? { opacity: 1, scale: [0, 1.05, 1.0] } : {}}
              transition={{
                duration: 0.35,
                delay: Math.min(i * 0.06, 0.6),
                ease: EASE.bounce,
              }}
              className="inline-block px-4 py-2 text-[13px] font-medium rounded-full"
              style={{
                backgroundColor: "rgba(29,29,31,0.06)",
                color: "rgba(29,29,31,0.7)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Work Experience — company names are key recruiter signals */}
        <div ref={expRef} className="mb-12 md:mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-medium uppercase tracking-[0.15em] mb-6"
            style={{ color: "rgba(29,29,31,0.55)" }}
          >
            {lang === "en" ? "Experience" : "工作经历"}
          </motion.h3>
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={expInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.12,
                  ease: EASE.smooth,
                }}
                className="p-5 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div>
                    <h4
                      className="text-[17px] md:text-[18px] font-semibold"
                      style={{ color: "#1D1D1F" }}
                    >
                      {exp.company}
                    </h4>
                    <p
                      className="text-[14px] font-medium"
                      style={{ color: "#0071E3" }}
                    >
                      {t(exp.role)}
                    </p>
                  </div>
                  <p
                    className="text-[13px] font-normal flex-shrink-0"
                    style={{ color: "rgba(29,29,31,0.55)" }}
                  >
                    {exp.period}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {t(exp.highlights).slice(0, 2).map((hl, j) => (
                    <li
                      key={`${lang}-${i}-${j}`}
                      className="text-[14px] leading-[1.55] flex items-start gap-2"
                      style={{ color: "rgba(29,29,31,0.65)" }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0071E3] flex-shrink-0" />
                      {hl}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div ref={metricsRef} className="mb-12 md:mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-medium uppercase tracking-[0.15em] mb-8"
            style={{ color: "rgba(29,29,31,0.55)" }}
          >
            {lang === "en" ? "Impact" : "影响力"}
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {METRICS.map((metric, i) => (
              <MetricCard
                key={`${lang}-${i}`}
                metric={metric}
                index={i}
                isInView={metricsInView}
                lang={lang}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div ref={credsRef}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={credsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-medium uppercase tracking-[0.15em] mb-6"
            style={{ color: "rgba(29,29,31,0.55)" }}
          >
            {lang === "en" ? "Education & Credentials" : "教育与资质"}
          </motion.h3>
          {/* Education — grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {CREDENTIALS.education.map((edu, i) => (
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={credsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-5 py-4 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(16px) saturate(170%)",
                  WebkitBackdropFilter: "blur(16px) saturate(170%)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: "#1D1D1F" }}
                >
                  {t(edu.school)}
                </p>
                <p
                  className="text-[13px] font-normal leading-[1.5]"
                  style={{ color: "rgba(29,29,31,0.6)" }}
                >
                  {t(edu.degree)}
                  {edu.gpa ? ` (${edu.gpa})` : ""}
                </p>
                {edu.period && (
                  <p
                    className="text-[12px] font-normal leading-[1.5]"
                    style={{ color: "rgba(29,29,31,0.55)" }}
                  >
                    {edu.period}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          {/* Certifications — pill badges */}
          <div className="flex flex-wrap gap-3">
            {CREDENTIALS.certifications.map((cert, i) => (
              <motion.span
                key={`${lang}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={credsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + i * 0.08,
                  ease: EASE.bounce,
                }}
                className="inline-block px-4 py-2 text-[13px] font-medium rounded-full"
                style={{
                  backgroundColor: "rgba(0,113,227,0.06)",
                  color: "rgba(0,113,227,0.8)",
                }}
              >
                {t(cert)}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
