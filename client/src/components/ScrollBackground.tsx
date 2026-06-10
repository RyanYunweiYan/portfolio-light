/**
 * ScrollBackground — Handles the smooth light-to-dark background transition
 * Uses a fixed background layer that interpolates color based on scroll position.
 * The transition plays out over ~0.6 viewport heights of scrolling and completes
 * exactly when the Creative section's top reaches the viewport bottom, so the
 * fixed layer hands off seamlessly to the section's own opaque #161617.
 * (Projects has a transparent background so the fade shows through its tail.)
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

        const vh = window.innerHeight;
        const gradientStart = cachedCreativeTop - vh * 1.6;
        const gradientEnd = cachedCreativeTop - vh;
        const scrollY = window.scrollY;

        if (scrollY < gradientStart) {
          setBgColor("#FFFFFF");
        } else if (scrollY > gradientEnd) {
          setBgColor("#161617");
        } else {
          const progress = (scrollY - gradientStart) / (gradientEnd - gradientStart);
          const eased = progress * progress * (3 - 2 * progress);
          const v = Math.round(255 - eased * (255 - 22));
          setBgColor(`rgb(${v},${v},${v})`);
        }
      });
    };

    const handleResize = () => {
      updateCreativeTop();
      handleScroll();
    };

    updateCreativeTop();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
