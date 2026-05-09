// ── Animation Constants ──────────────────────────────────────
// Unified easing curves — Apple-inspired smooth deceleration
export const EASE = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,     // Default for most animations
  bounce: [0.34, 1.56, 0.64, 1] as const,          // Overshoot for tags/badges
  snappy: [0.4, 0, 0.2, 1] as const,               // Quick interactions
  apple: [0.32, 0.72, 0, 1] as const,              // Apple system spring — for hovers
};

// CSS string equivalents for transition timing functions
export const EASE_CSS = {
  apple: "cubic-bezier(0.32, 0.72, 0, 1)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// Re-export all shared data from siteData
export {
  PROFILE,
  METRICS,
  PROJECTS,
  CREATIVE_WORKS,
  AI_STACK,
  EXPERIENCE,
  CREDENTIALS,
  SOCIAL_LINKS,
  SITE_META,
} from "@/data/siteData";

export type { Project, CreativeWork } from "@/data/siteData";
