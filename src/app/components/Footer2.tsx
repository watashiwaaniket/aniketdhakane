"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";

const GrainGradient = dynamic(
  () =>
    import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
  { ssr: false }
);

/** Matches page --background so the shader base blends with the site */
const COLOR_BACK = {
  light: "#f4f7f2",
  dark: "#000",
} as const;

function StaticFooterGradient({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="w-full h-[560px]"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #3d3428 0%, #1a3d38 45%, #0f1412 100%)"
          : "linear-gradient(135deg, #FFF0D9 0%, #a8e8dc 45%, #7AE2CF 100%)",
      }}
    />
  );
}

export default function Footer2() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [showShader, setShowShader] = useState(false);
  const { theme, mounted } = useTheme();
  const isDark = mounted ? theme === "dark" : false;
  const colorBack = isDark ? COLOR_BACK.dark : COLOR_BACK.light;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || isMobile) return;

    const node = footerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowShader(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={footerRef} className="w-full overflow-hidden relative">
      <div className="p-4 pb-4 font-bold absolute z-50 bottom-0 w-full flex justify-center">
        <p className="text-[var(--foreground)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl pb-4">
          © 2026 Aniket Dhakane
        </p>
      </div>
      <div className="w-full h-[580px] absolute z-40 bg-[var(--footer-veil)] md:backdrop-blur-sm transition-[background-color] duration-300" />
      {showShader ? (
        <GrainGradient
          key={colorBack}
          className="w-full h-[560px]"
          colors={["#FFF0D9", "#7AE2CF"]}
          colorBack={colorBack}
          softness={0.7}
          intensity={0.04}
          noise={0.25}
          shape="wave"
          speed={0.5}
        />
      ) : (
        <StaticFooterGradient isDark={isDark} />
      )}
    </div>
  );
}