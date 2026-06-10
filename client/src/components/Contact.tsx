/**
 * Contact Section
 * Design: Dark background, editorial feel
 * Animation: headline words fade in one at a time
 * Content: email, social links, availability
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { Mail, Linkedin, Github, MessageCircle, Video } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";
import { useState } from "react";

// Map icon names from data to Lucide components
const iconMap: Record<string, typeof Mail> = {
  linkedin: Linkedin,
  github: Github,
  "message-circle": MessageCircle,
  video: Video,
};

const platformColors: Record<string, string> = {
  LinkedIn: "#0A66C2",
  GitHub: "#F5F5F7",
  "WeChat Official": "#07C160",
  Douyin: "#FF0050",
};

function SocialIcon({
  link,
  index,
  isInView,
}: {
  link: (typeof SOCIAL_LINKS)[number];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[link.icon] || Mail;
  const color = platformColors[link.platform] || "#F5F5F7";

  const content = (
    <>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          backgroundColor: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        <Icon
          size={20}
          style={{ color: hovered ? color : "rgba(245,245,247,0.6)" }}
          className="transition-colors duration-200"
        />
      </div>
      <span
        className="text-[12px] font-medium transition-colors duration-200"
        style={{ color: hovered ? "#F5F5F7" : "rgba(245,245,247,0.55)" }}
      >
        {link.platform}
      </span>
    </>
  );

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: 0.6 + index * 0.08,
        ease: EASE.smooth,
      }}
      className="flex flex-col items-center gap-2 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </motion.a>
  );
}

export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const { lang, t } = useLanguage();

  return (
    <section
      id="contact"
      ref={ref}
      className="pt-12 md:pt-16 pb-16 md:pb-24"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section label — chapter style (dark, acts as section heading) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE.smooth }}
          className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10"
        >
          <span
            aria-hidden
            className="h-px w-10 md:w-14 flex-shrink-0"
            style={{ background: "rgba(245,245,247,0.3)" }}
          />
          <span
            className={`font-medium ${lang === "en" ? "uppercase tracking-[0.1em] text-[18px] md:text-[22px]" : "tracking-[0.05em] text-[20px] md:text-[24px]"}`}
            style={{ color: "rgba(245,245,247,0.62)" }}
          >
            {lang === "en" ? "Let's connect" : "保持联系"}
          </span>
        </motion.div>

        {/* Availability — minimal status dot, no glow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-2.5 mb-8"
        >
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "#30D158" }}
          />
          <span
            className="text-[13px] md:text-[14px] font-normal"
            style={{ color: "rgba(245,245,247,0.7)" }}
          >
            {t(PROFILE.availability)}
          </span>
        </motion.div>

        {/* Email — large, clickable, with underline-from-left on hover */}
        <motion.a
          href={`mailto:${PROFILE.email}`}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="group inline-flex items-center gap-3 mb-10 relative"
        >
          <Mail size={22} className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" style={{ color: "#0071E3" }} />
          <span
            className="text-[15px] sm:text-[17px] md:text-[19px] font-medium tracking-tight break-all relative pb-0.5"
            style={{ color: "#0071E3" }}
          >
            {PROFILE.email}
            <span
              aria-hidden
              className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{
                background: "linear-gradient(90deg, #0071E3 0%, rgba(0,113,227,0.2) 100%)",
                transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            />
          </span>
        </motion.a>

        {/* Social links — icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-4 sm:gap-5 md:gap-6"
        >
          {SOCIAL_LINKS.map((link, i) => (
            <SocialIcon
              key={link.platform}
              link={link}
              index={i}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
