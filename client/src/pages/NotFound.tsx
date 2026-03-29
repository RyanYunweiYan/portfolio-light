import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * 404 Not Found — Editorial Noir aesthetic
 * Matches the Apple-style site palette: #1D1D1F / #F5F5F7 / #0071E3
 * Minimal layout: large "404", subtle message, clean "Go Home" button
 */
export default function NotFound() {
  const [, setLocation] = useLocation();
  const { lang } = useLanguage();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="text-center max-w-md">
        {/* Section label */}
        <p
          className="text-[13px] font-medium uppercase tracking-[0.15em] mb-8"
          style={{ color: "rgba(29,29,31,0.55)" }}
        >
          {lang === "en" ? "Not Found" : "未找到"}
        </p>

        {/* 404 number */}
        <h1
          className="font-bold leading-none mb-4"
          style={{
            fontSize: "clamp(96px, 20vw, 160px)",
            letterSpacing: "-0.04em",
            color: "rgba(29,29,31,0.08)",
          }}
        >
          404
        </h1>

        {/* Message */}
        <p
          className="text-[17px] md:text-[19px] font-normal leading-[1.6] mb-10"
          style={{ color: "rgba(29,29,31,0.6)" }}
        >
          {lang === "en"
            ? "The page you\u2019re looking for doesn\u2019t exist or has been moved."
            : "\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u79FB\u52A8\u3002"}
        </p>

        {/* Go Home button */}
        <button
          onClick={() => setLocation("/")}
          className="inline-block px-8 py-3.5 text-[15px] font-medium rounded-full transition-all duration-200"
          style={{
            backgroundColor: "#0071E3",
            color: "#FFFFFF",
            boxShadow: "0 2px 12px rgba(0,113,227,0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,113,227,0.4)";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,113,227,0.25)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {lang === "en" ? "Go Home" : "\u8FD4\u56DE\u9996\u9875"}
        </button>
      </div>
    </div>
  );
}
