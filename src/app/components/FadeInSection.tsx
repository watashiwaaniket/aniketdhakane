"use client";

import { m, useReducedMotion } from "motion/react";

interface FadeInSectionProps {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
}

export function FadeInSection({
  children,
  y = 30,
  delay = 0,
  duration = 0.7,
}: FadeInSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="below-fold-section">{children}</div>;
  }

  return (
    <m.div
      className="below-fold-section"
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.92, 0.25, 1],
      }}
    >
      {children}
    </m.div>
  );
}