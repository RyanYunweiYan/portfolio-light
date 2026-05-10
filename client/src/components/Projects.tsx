/**
 * Projects / AI Works Section
 * Design: quiet proof gallery with real project images and restrained motion
 * Click: opens detail modal
 * Data: from siteData.ts PROJECTS
 */
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS } from "@/data/siteData";
import { EASE } from "@/const";
import type { Project } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

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
      initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.12,
        ease: EASE.smooth,
      }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-[8px] border border-black/[0.06] bg-white transition-[transform,box-shadow,border-color] duration-300 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-black/[0.12] hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] active:scale-[0.99] ${
        project.size === "large"
          ? "md:col-span-2"
          : project.size === "medium"
            ? "md:col-span-1 md:row-span-1"
            : "md:col-span-1 md:row-span-1"
      }`}
    >
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-black/[0.06] bg-white/82 px-2.5 py-1 text-[11px] font-medium text-black/45 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Thumbnail / Gradient placeholder */}
      <div
        className="overflow-hidden aspect-[4/3]"
        style={{ backgroundColor: "#F5F5F7" }}
      >
        {project.coverImage ? (
          <motion.img
            src={project.coverImage}
            alt={t(project.title)}
            className={`h-full w-full transition-[filter,transform] duration-500 group-hover:scale-[1.035] group-hover:saturate-[1.04] ${project.size === "large" ? "object-cover" : "object-contain"}`}
            initial={{ filter: "blur(10px)" }}
            animate={isInView ? { filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.12 }}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#F5F5F7] px-6">
            <p className="text-center text-[20px] font-semibold text-black/72 md:text-[24px]">
              {t(project.title)}
            </p>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <span
            className="text-[11px] font-semibold uppercase"
            style={{ color: "rgba(29,29,31,0.48)", letterSpacing: "0.08em" }}
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
                backgroundColor:
                  project.status === "in-progress"
                    ? "rgba(255,149,0,0.1)"
                    : "rgba(0,113,227,0.1)",
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
          className="line-clamp-3 text-[14px] font-normal leading-[1.65] md:text-[15px]"
          style={{ color: "rgba(29,29,31,0.6)" }}
        >
          {t(project.description)}
        </p>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 hover:text-[#005BB5]"
            style={{ color: "#0071E3" }}
          >
            {lang === "en" ? "View Live" : "在线查看"}
            <ArrowUpRight size={14} />
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
  const details = t(project.details);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundColor: "rgba(0,0,0,0.36)",
        backdropFilter: "blur(18px)",
      }}
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
          boxShadow: "0 32px 88px rgba(0,0,0,0.16)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
        onClick={e => e.stopPropagation()}
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
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-[#F5F5F7] px-8">
            <p className="text-center text-[28px] font-semibold text-black/72 md:text-[36px]">
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
            {project.tags.map(tag => (
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
      className="relative overflow-hidden bg-white py-20 md:py-36"
    >
      {/* Apple-style thin line separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px]"
        style={{ background: "rgba(29,29,31,0.15)" }}
      />
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

        <div className="mb-8 grid gap-4 md:mb-14 md:grid-cols-[1fr_380px] md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[36px] font-semibold leading-[1.14] md:text-[52px]"
            style={{ color: "#1D1D1F" }}
          >
            {lang === "en"
              ? "Selected work, shipped into use."
              : "被真实使用的精选作品。"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-[15px] leading-[1.7] text-black/50 md:text-[16px]"
          >
            {lang === "en"
              ? "A small set of proof points where AI moved from idea to interface, user, and measurable outcome."
              : "少而明确的证据：AI 从想法走到界面、用户和可验证结果。"}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
