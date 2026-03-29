/**
 * ScrollBackground — Handles the smooth light-to-dark background transition
 * Uses a fixed background layer that interpolates color based on scroll position
 * The transition happens gradually over ~200px of scrolling near the Creative section
 */
import { useEffect, useState } from "react";

export default function ScrollBackground() {
  const [bgColor, setBgColor] = useState("#FFFFFF");

  useEffect(() => {
    let rafId = 0;
    let cachedCreativeTop = 0;

    const updateCreativeTop = () => {
      const el = document.getElementById("creative");
      if (el) cachedCreativeTop = el.getBoundingClientRect().top + window.scrollY;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!cachedCreativeTop) return;

        const gradientStart = cachedCreativeTop - 200 - window.innerHeight * 0.5;
        const gradientEnd = cachedCreativeTop - 200;
        const scrollY = window.scrollY;

        if (scrollY < gradientStart) {
          setBgColor("#FFFFFF");
        } else if (scrollY > gradientEnd) {
          setBgColor("#2D2D2D");
        } else {
          const progress = (scrollY - gradientStart) / (gradientEnd - gradientStart);
          const eased = progress * progress * (3 - 2 * progress);
          const v = Math.round(255 - eased * (255 - 45));
          setBgColor(`rgb(${v},${v},${v})`);
        }
      });
    };

    updateCreativeTop();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCreativeTop);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCreativeTop);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: bgColor }}
    />
  );
}
