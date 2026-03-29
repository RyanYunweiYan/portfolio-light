import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in the viewport on mount
    // (handles fast scrollers, programmatic scroll, and SSR/prerender scenarios)
    const rect = el.getBoundingClientRect();
    const threshold = (options?.threshold as number) || 0.1;
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    if (visibleHeight > rect.height * threshold && rect.height > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        // Trigger 100px before the element enters the viewport for smoother reveal
        rootMargin: "100px 0px",
        ...options,
      }
    );

    observer.observe(el);

    // Safety fallback: if element is already visible or above viewport on mount,
    // mark it as in-view so content is never permanently hidden.
    // Fires after a short delay to handle lazy-loaded / Suspense components.
    const fallbackTimer = setTimeout(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      // If the element's bottom is above the viewport (scrolled past),
      // or if any part of it is within the viewport
      if (r.bottom < window.innerHeight * 1.5) {
        setIsInView(true);
      }
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return { ref, isInView };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}
