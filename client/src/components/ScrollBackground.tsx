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

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Read live each frame — the Creative section is lazy-loaded, so a
        // mount-time cached offset is stale (it doesn't exist yet) and layout
        // shifts as other sections hydrate. Same per-frame cost as Navbar.
        const el = document.getElementById("creative");
        if (!el) return;
        const creativeTop = el.getBoundingClientRect().top + window.scrollY;

        const vh = window.innerHeight;
        const gradientStart = creativeTop - vh * 1.6;
        const gradientEnd = creativeTop - vh;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
