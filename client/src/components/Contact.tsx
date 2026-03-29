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
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: [0, 1.1, 1.0] } : {}}
      transition={{
        duration: 0.4,
        delay: 0.8 + index * 0.1,
        ease: EASE.bounce,
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

  const headlineWords = lang === "en" ? ["Let's", "connect."] : ["保持联系。"];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-36"
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
          {lang === "en" ? "Contact" : "联系"}
        </motion.p>

        {/* Headline — word by word */}
        <h2 className="mb-8 md:mb-14">
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${lang}-${i}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
              className="inline-block mr-3 text-[36px] md:text-[44px] font-semibold leading-[1.15] tracking-tight"
              style={{ color: "#F5F5F7" }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Email — large, clickable */}
        <motion.a
          href={`mailto:${PROFILE.email}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-3 mb-10 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:opacity-80"
        >
          <Mail size={22} className="flex-shrink-0" style={{ color: "#0071E3" }} />
          <span
            className="text-[15px] sm:text-[17px] md:text-[19px] font-medium tracking-tight break-all"
            style={{ color: "#0071E3" }}
          >
            {PROFILE.email}
          </span>
        </motion.a>

        {/* Social links — icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 mb-12"
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

        {/* Availability */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-[15px] font-normal leading-[1.6]"
          style={{ color: "rgba(245,245,247,0.55)" }}
        >
          {t(PROFILE.availability)}
        </motion.p>
      </div>
    </section>
  );
}
