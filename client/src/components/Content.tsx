/**
 * Creative Showcase Section — Dark background
 * Design: Editorial Noir — the "night chapter"
 * Animation: background color shifts with scroll, cards slide from right
 * Each card has subtle blue bottom-border glow
 * Sections: Videos, Music, Articles from CREATIVE_WORKS
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { ArrowUpRight, Play, Music, FileText } from "lucide-react";
import { CREATIVE_WORKS } from "@/data/siteData";
import type { CreativeWork } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

function CreativeCard({
  work,
  index,
  isInView,
}: {
  work: CreativeWork;
  index: number;
  isInView: boolean;
}) {
  const { lang, t } = useLanguage();

  const typeIcons: Record<CreativeWork["type"], typeof Play> = {
    video: Play,
    music: Music,
    article: FileText,
  };

  const typeLabels: Record<CreativeWork["type"], string> = {
    video: lang === "en" ? "Video" : "视频",
    music: lang === "en" ? "Music" : "音乐",
    article: lang === "en" ? "Article" : "文章",
  };

  const Icon = typeIcons[work.type];
  const hasInlineEmbed = work.embedUrl && (work.type === "music" || work.embedUrl.endsWith('.mp4'));
  const hasLink = !hasInlineEmbed && (work.externalUrl || work.embedUrl);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.15,
        ease: EASE.smooth,
      }}
      className="group block p-4 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px) saturate(150%)",
        WebkitBackdropFilter: "blur(12px) saturate(150%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)";
        e.currentTarget.style.borderColor = "rgba(0,113,227,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Blue bottom glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,113,227,0.2) 50%, transparent 100%)",
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-3">
            <Icon
              size={16}
              style={{ color: "rgba(0,113,227,0.7)" }}
            />
            <span
              className="text-[12px] font-medium uppercase tracking-[0.1em]"
              style={{ color: "rgba(0,113,227,0.7)" }}
            >
              {typeLabels[work.type]}
            </span>
            <span
              className="text-[13px] font-normal"
              style={{ color: "rgba(245,245,247,0.45)" }}
            >
              {work.date}
            </span>
            {work.platform && (
              <span
                className="text-[12px] font-normal"
                style={{ color: "rgba(245,245,247,0.45)" }}
              >
                {work.platform}
              </span>
            )}
          </div>
          <h3
            className="text-[18px] md:text-[20px] font-semibold mb-3 leading-tight"
            style={{ color: "#F5F5F7" }}
          >
            {t(work.title)}
          </h3>
          <p
            className="text-[14px] md:text-[15px] font-normal leading-[1.6] line-clamp-2 mb-2"
            style={{ color: "rgba(245,245,247,0.62)" }}
          >
            {t(work.description)}
          </p>
          {work.stats && (
            <p
              className="text-[13px] font-medium"
              style={{ color: "rgba(0,113,227,0.6)" }}
            >
              {work.stats}
            </p>
          )}
          {/* Video embed for local .mp4 files */}
          {work.embedUrl && work.type === "video" && work.embedUrl.endsWith('.mp4') && (
            <div className="mt-4 aspect-video">
              <video
                src={work.embedUrl}
                controls
                preload="metadata"
                className="w-full h-full rounded-xl object-cover"
                style={{ backgroundColor: "#000" }}
              />
            </div>
          )}
          {/* Suno / music embed player */}
          {work.embedUrl && work.type === "music" && (
            <div className="mt-4">
              <iframe
                src={work.embedUrl}
                className="w-full rounded-xl border-0"
                style={{ height: "200px" }}
                allow="autoplay; clipboard-write; encrypted-media"
                loading="lazy"
              />
            </div>
          )}
          {/* Placeholder state for works without embed */}
          {!work.embedUrl && !work.externalUrl && (
            <p
              className="text-[12px] mt-2 italic"
              style={{ color: "rgba(245,245,247,0.5)" }}
            >
              {lang === "en" ? "Coming soon" : "即将上线"}
            </p>
          )}
        </div>
        {hasLink && (
          <ArrowUpRight
            size={20}
            className="flex-shrink-0 mt-1 transition-all duration-150 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ color: "rgba(245,245,247,0.45)" }}
          />
        )}
      </div>
    </motion.div>
  );

  if (hasLink) {
    return (
      <a
        href={work.externalUrl || work.embedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

function SubSection({
  title,
  works,
  isInView,
  startIndex,
}: {
  title: string;
  works: CreativeWork[];
  isInView: boolean;
  startIndex: number;
}) {
  if (works.length === 0) return null;

  return (
    <div className="mb-12 last:mb-0">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-[13px] font-medium uppercase tracking-[0.15em] mb-6"
        style={{ color: "rgba(245,245,247,0.55)" }}
      >
        {title}
      </motion.h3>
      <div className="space-y-5">
        {works.map((work, i) => (
          <CreativeCard
            key={work.id}
            work={work}
            index={startIndex + i}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

export default function ContentSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { lang } = useLanguage();

  const videos = CREATIVE_WORKS.filter((w) => w.type === "video");
  const music = CREATIVE_WORKS.filter((w) => w.type === "music");
  const articles = CREATIVE_WORKS.filter((w) => w.type === "article");

  const subSectionLabels = {
    videos: lang === "en" ? "Videos" : "视频",
    music: lang === "en" ? "Music" : "音乐",
    articles: lang === "en" ? "Articles" : "文章",
  };

  return (
    <>
      {/* Gradient transition zone — sits between Projects and Content */}
      <div
        className="h-[160px]"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF 0%, #2D2D2D 100%)",
        }}
      />

      <section
        id="creative"
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
            {lang === "en" ? "Creative" : "AI 创作"}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[36px] md:text-[44px] font-semibold leading-[1.15] tracking-tight mb-8 md:mb-14"
            style={{ color: "#F5F5F7" }}
          >
            {lang === "en" ? "AI Creative Works" : "AI 创意作品"}
          </motion.h2>

          {/* Sub-sections */}
          <SubSection title={subSectionLabels.videos} works={videos} isInView={isInView} startIndex={0} />
          <SubSection title={subSectionLabels.music} works={music} isInView={isInView} startIndex={videos.length} />
          <SubSection title={subSectionLabels.articles} works={articles} isInView={isInView} startIndex={videos.length + music.length} />
        </div>
      </section>
    </>
  );
}
