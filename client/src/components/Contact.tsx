/**
 * Contact Section
 * Design: quiet closing section with restrained dark contrast
 * Content: email, social links, availability
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Video,
} from "lucide-react";
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
        className="flex h-11 w-11 items-center justify-center rounded-[8px] transition-all duration-200 ease-out"
        style={{
          backgroundColor: hovered
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.045)",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <Icon
          size={20}
          style={{ color: hovered ? color : "rgba(245,245,247,0.6)" }}
          className="transition-colors duration-200"
        />
      </div>
      <span
        className="min-w-[86px] text-center text-[12px] font-medium transition-colors duration-200"
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
        duration: 0.35,
        delay: 0.35 + index * 0.08,
        ease: EASE.smooth,
      }}
      className="flex w-[86px] flex-col items-center gap-2 transition-all duration-200 ease-out"
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
      className="relative overflow-hidden py-20 md:py-36"
      style={{ backgroundColor: "#161617" }}
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

        <div className="grid gap-10 md:grid-cols-[1fr_420px] md:items-end">
          <div>
            {/* Headline — word by word */}
            <h2 className="mb-8 md:mb-12">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`${lang}-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.2 + i * 0.15,
                    ease: EASE.smooth,
                  }}
                  className="mr-3 inline-block text-[42px] font-semibold leading-[1.08] md:text-[68px]"
                  style={{ color: "#F5F5F7" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Email — large, clickable */}
            <motion.a
              href={`mailto:${PROFILE.email}`}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE.smooth }}
              className="group mb-10 inline-flex max-w-full items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.055] px-4 py-3 transition-all duration-300 hover:border-[#0071E3]/40 hover:bg-white/[0.085] sm:px-5"
            >
              <Mail
                size={20}
                className="flex-shrink-0"
                style={{ color: "#0071E3" }}
              />
              <span
                className="min-w-0 break-all text-[15px] font-medium sm:text-[17px] md:text-[19px]"
                style={{ color: "#F5F5F7" }}
              >
                {PROFILE.email}
              </span>
              <ArrowRight
                size={18}
                className="hidden flex-shrink-0 text-[#0071E3] transition-transform duration-300 group-hover:translate-x-1 sm:block"
              />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65, ease: EASE.smooth }}
            className="rounded-[8px] border border-white/[0.1] bg-white/[0.045] p-5 md:p-6"
          >
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/42">
              {lang === "en" ? "Current signal" : "当前信号"}
            </p>
            <p className="text-[16px] leading-[1.7] text-white/72 md:text-[17px]">
              {t(PROFILE.availability)}
            </p>
          </motion.div>
        </div>

        {/* Social links — icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-12 flex flex-wrap gap-4 sm:gap-5 md:gap-6"
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
