/**
 * Navbar — Fixed top navigation
 * Design: Apple minimalist, transparent at top, frosted glass after 100px scroll
 * Left: initials "R.", Right: section links with underline-from-left hover + language toggle
 * Dark mode: switches to dark glass when scrolled past the content section
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE } from "@/const";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrollY(y);

        // Hide on scroll down (past 200px), show on scroll up
        if (y > 200) {
          setIsHidden(y > lastScrollY.current && y - lastScrollY.current > 5);
        } else {
          setIsHidden(false);
        }
        lastScrollY.current = y;

        // Detect dark section
        const creativeEl = document.getElementById("creative");
        if (creativeEl) {
          const creativeTop = creativeEl.getBoundingClientRect().top + y;
          setIsDark(y > creativeTop - 300);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isScrolled = scrollY > 100;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        backgroundColor: isScrolled
          ? isDark
            ? "rgba(45, 45, 45, 0.82)"
            : "rgba(255, 255, 255, 0.82)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: isScrolled
          ? isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-14">
        <a
          href="#hero"
          className="text-[18px] font-bold tracking-tight transition-colors duration-500"
          style={{ color: isDark ? "#F5F5F7" : "#1D1D1F" }}
        >
          R.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link relative text-[14px] font-medium tracking-wide transition-opacity duration-200 opacity-60 hover:opacity-100 group"
              style={{ color: isDark ? "#F5F5F7" : "#1D1D1F" }}
            >
              {t(link.label)}
              <span
                className="absolute left-0 -bottom-1 h-[1.5px] w-0 group-hover:w-full transition-all duration-200"
                style={{ backgroundColor: "#0071E3" }}
              />
            </a>
          ))}

          {/* Language toggle — separated by a subtle divider */}
          <div
            className="w-[1px] h-4"
            style={{
              backgroundColor: isDark
                ? "rgba(245,245,247,0.15)"
                : "rgba(29,29,31,0.12)",
            }}
          />
          <button
            onClick={toggleLang}
            aria-label={lang === "en" ? "Switch to Chinese" : "切换到英文"}
            className="text-[14px] font-medium tracking-wide transition-opacity duration-200 opacity-45 hover:opacity-100 active:scale-90"
            style={{ color: isDark ? "#F5F5F7" : "#1D1D1F" }}
          >
            {lang === "en" ? "中" : "EN"}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 transition-transform active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: isDark ? "#F5F5F7" : "#1D1D1F" }}
          aria-label={mobileOpen ? (lang === "en" ? "Close menu" : "关闭菜单") : (lang === "en" ? "Open menu" : "打开菜单")}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE.smooth }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: isDark ? "rgba(45,45,45,0.95)" : "rgba(255,255,255,0.95)",
            }}
          >
            <div className="px-6 pb-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * i }}
                  className="text-[15px] font-medium min-h-[44px] flex items-center transition-colors duration-200"
                  style={{ color: isDark ? "#F5F5F7" : "#1D1D1F" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(link.label)}
                </motion.a>
              ))}
              {/* Mobile language toggle */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.05 * NAV_LINKS.length }}
                onClick={() => {
                  toggleLang();
                  setMobileOpen(false);
                }}
                className="text-[15px] font-medium min-h-[44px] flex items-center text-left transition-colors duration-200"
                style={{ color: isDark ? "rgba(245,245,247,0.5)" : "rgba(29,29,31,0.45)" }}
              >
                {lang === "en" ? "切换到中文" : "Switch to English"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
