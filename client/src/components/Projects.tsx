/**
 * Projects / AI Works Section
 * Design: Bento Grid with asymmetric card sizes, 3D flip-in wave entrance
 * Animation: cards fade+slide+scale+rotateY wave from left to right
 * Hover: lift -8px, shadow expands, thumbnail scales 1.03, blue border tint
 * Click: opens detail modal
 * Data: from siteData.ts PROJECTS
 */
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { PROJECTS } from "@/data/siteData";
import { EASE } from "@/const";
import type { Project } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

// Gradient colors for projects without cover images
const gradientPalette = [
  "linear-gradient(135deg, #0071E3 0%, #00B4D8 100%)",
  "linear-gradient(135deg, #5856D6 0%, #0071E3 100%)",
  "linear-gradient(135deg, #0071E3 0%, #34C759 100%)",
  "linear-gradient(135deg, #FF9500 0%, #FF2D55 100%)",
  "linear-gradient(135deg, #AF52DE 0%, #FF2D55 100%)",
];

function ProjectCard({
  project,
  index,
  isInView,
  onClick,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const { lang, t } = useLanguage();

  const statusLabels: Record<string, Record<string, string>> = {
    "in-progress": { en: "in-progress", zh: "开发中" },
    demo: { en: "demo", zh: "演示" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
      animate={
        isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}
      }
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.12,
        ease: EASE.smooth,
      }}
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl overflow-hidden transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.1),0_10px_24px_rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.04)] hover:border-[rgba(0,113,227,0.2)] active:scale-[0.98] ${
        project.size === "large"
          ? "md:col-span-2"
          : project.size === "medium"
          ? "md:col-span-1 md:row-span-1"
          : "md:col-span-1 md:row-span-1"
      }`}
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Thumbnail / Gradient placeholder */}
      <div className="overflow-hidden aspect-[4/3]" style={{ backgroundColor: "#F5F5F7" }}>
        {project.coverImage ? (
          <motion.img
            src={project.coverImage}
            alt={t(project.title)}
            className={`w-full h-full transition-transform duration-200 group-hover:scale-[1.03] ${project.size === "large" ? "object-cover" : "object-contain"}`}
            initial={{ filter: "blur(10px)" }}
            animate={isInView ? { filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.12 }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.03]"
            style={{
              background: gradientPalette[index % gradientPalette.length],
            }}
          >
            <p
              className="text-[20px] md:text-[24px] font-bold text-white/90 text-center px-6"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            >
              {t(project.title)}
            </p>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-[12px] font-medium uppercase tracking-[0.1em]"
            style={{ color: "#0071E3" }}
          >
            {project.tags[0]}
          </span>
          <span
            className="text-[12px] font-normal"
            style={{ color: "rgba(29,29,31,0.55)" }}
          >
            {project.year}
          </span>
          {project.status !== "live" && (
            <span
              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: project.status === "in-progress" ? "rgba(255,149,0,0.1)" : "rgba(0,113,227,0.1)",
                color: project.status === "in-progress" ? "#FF9500" : "#0071E3",
              }}
            >
              {statusLabels[project.status]?.[lang] || project.status}
            </span>
          )}
        </div>
        <h3
          className="text-[18px] md:text-[20px] font-semibold mb-2 leading-tight"
          style={{ color: "#1D1D1F" }}
        >
          {t(project.title)}
        </h3>
        <p
          className="text-[14px] md:text-[15px] font-normal leading-[1.6] line-clamp-3"
          style={{ color: "rgba(29,29,31,0.6)" }}
        >
          {t(project.description)}
        </p>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-medium transition-all duration-200 hover:gap-2.5"
            style={{ color: "#0071E3" }}
          >
            {lang === "en" ? "View Live" : "在线查看"}
            <span className="text-[11px]">↗</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { lang, t } = useLanguage();
  const projectIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const details = t(project.details);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: EASE.smooth }}
        className="relative w-[calc(100vw-32px)] sm:w-full max-w-[680px] max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-200 bg-black/[0.06] hover:bg-black/[0.12]"
        >
          <X size={16} style={{ color: "#1D1D1F" }} />
        </button>

        {/* Modal image or gradient */}
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={t(project.title)}
            className="w-full aspect-[16/9] object-contain"
            style={{ backgroundColor: "#F5F5F7" }}
          />
        ) : (
          <div
            className="w-full aspect-[16/9] flex items-center justify-center"
            style={{
              background: gradientPalette[projectIndex % gradientPalette.length],
            }}
          >
            <p
              className="text-[28px] md:text-[36px] font-bold text-white/90 text-center px-8"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            >
              {t(project.title)}
            </p>
          </div>
        )}

        {/* Modal content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[12px] font-medium uppercase tracking-[0.1em]"
              style={{ color: "#0071E3" }}
            >
              {t(project.subtitle)}
            </span>
            <span
              className="text-[12px] font-normal"
              style={{ color: "rgba(29,29,31,0.55)" }}
            >
              {project.year}
            </span>
          </div>
          <h2
            className="text-[28px] md:text-[32px] font-bold mb-4 leading-tight tracking-tight"
            style={{ color: "#1D1D1F" }}
          >
            {t(project.title)}
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.65] mb-6"
            style={{ color: "rgba(29,29,31,0.72)" }}
          >
            {t(project.description)}
          </p>

          {/* Details list */}
          <ul className="space-y-2 mb-6">
            {details.map((detail, i) => (
              <li
                key={`${lang}-${i}`}
                className="text-[15px] leading-[1.6] flex items-start gap-2"
                style={{ color: "rgba(29,29,31,0.6)" }}
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0071E3] flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-[12px] font-medium rounded-full"
                style={{
                  backgroundColor: "rgba(29,29,31,0.06)",
                  color: "rgba(29,29,31,0.6)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Live URL link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2.5 text-[14px] font-medium rounded-full transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04]"
              style={{
                backgroundColor: "#0071E3",
                color: "#FFFFFF",
              }}
            >
              {lang === "en" ? "View Live" : "在线查看"}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { lang } = useLanguage();

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 md:py-36"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Apple-style thin line separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px]" style={{ background: "rgba(29,29,31,0.15)" }} />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE.smooth }}
          className="text-[13px] font-medium uppercase tracking-[0.15em] mb-4"
          style={{ color: "rgba(29,29,31,0.55)" }}
        >
          {lang === "en" ? "Projects" : "作品集"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[36px] md:text-[44px] font-semibold leading-[1.15] tracking-tight mb-8 md:mb-14"
          style={{ color: "#1D1D1F" }}
        >
          {lang === "en" ? "Selected work" : "精选作品"}
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-auto">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
