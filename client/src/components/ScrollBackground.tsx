/**
 * ScrollBackground — Handles the smooth light-to-dark background transition
 * Uses a fixed background layer that interpolates color based on scroll position.
 * Projects AND the dark sections (Creative/Stack/Contact) are all transparent,
 * so this layer owns the page background end-to-end. That frees the transition
 * to happen late — in the gap after the project cards have mostly scrolled out —
 * instead of while white cards still fill the viewport (which read as a jarring
 * "sudden blackout"). It completes just before the Creative heading settles.
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
        const gradientStart = creativeTop - vh * 0.9;
        const gradientEnd = creativeTop - vh * 0.3;
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
