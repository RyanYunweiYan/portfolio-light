/**
 * Footer — minimal, on dark background
 */
import { PROFILE } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer
      className="py-8 border-t"
      style={{
        backgroundColor: "#252525",
        borderColor: "rgba(255,255,255,0.06)",
        paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p
          className="text-[13px] font-normal"
          style={{ color: "rgba(245,245,247,0.55)" }}
        >
          &copy; {new Date().getFullYear()} {PROFILE.name}
        </p>
        <p
          className="text-[13px] font-normal"
          style={{ color: "rgba(245,245,247,0.55)" }}
        >
          {lang === "en" ? "Built entirely with AI" : "完全由 AI 构建"}
        </p>
      </div>
    </footer>
  );
}
