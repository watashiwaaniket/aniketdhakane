"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import GradientText from "./ui-components/GradientText";
import ShinyText from "./ui-components/ShinyText";

const AVATAR_SRC = "/avatar.webp";
/** Degrees from center to edge. The point under the cursor recedes. */
const MAX_TILT = 14;
const tiltSpring = { stiffness: 320, damping: 28, mass: 0.4 };

export function Hero() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3.5 md:gap-4">
        <HeroAvatar />
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-balance md:text-3xl">
            Aniket Dhakane 𓅓
          </h1>
          <div className="space-x-1 text-sm">
            <ShinyText
              text="👨🏻‍💻 Software Engineer"
              disabled={false}
              speed={3}
              className="custom-class"
            />
            <ShinyText
              text="| UI Developer"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 mb-4 text-sm">
        Fullstack Developer based in
        <GradientText
          colors={[
            "var(--accent-sage)",
            "var(--accent-blue)",
            "var(--accent-sage)",
            "var(--accent-blue)",
            "var(--accent-sage)",
          ]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          Pune,
        </GradientText>
        with a love for
        <GradientText
          colors={["#7a8f7a", "#6b8fa8", "#7a8f7a", "#6b8fa8", "#7a8f7a"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          User Centric Design,
        </GradientText>
        I write clean and scalable code, while building
        <GradientText
          colors={[
            "var(--accent-sage)",
            "var(--accent-blue)",
            "var(--accent-sage)",
            "var(--accent-blue)",
            "var(--accent-sage)",
          ]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          <Link
            href={
              "https://github.com/watashiwaaniket/personai/tree/master/personai-frontend/src/components"
            }
          >
            Reusable Components
          </Link>
        </GradientText>
        for smoother development experience.
      </div>
      <div></div>
    </div>
  );
}

function HeroAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const lift = useSpring(0, tiltSpring);
  const shade = useSpring(0, tiltSpring);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const dent = useTransform(
    [spotX, spotY, shade],
    ([x, y, amount]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(0,0,0,${0.2 * Number(amount)}), transparent 62%)`,
  );
  const scale = useTransform(lift, [0, 1], [1, 1.04]);
  const floatY = useTransform(lift, [0, 1], [0, -2]);
  const shadow = useTransform(
    lift,
    (amount) =>
      `0 ${8 + amount * 6}px ${16 + amount * 8}px -12px rgba(0,0,0,${0.28 + amount * 0.2})`,
  );

  function tiltTo(clientX: number, clientY: number) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    // Positive rotateX sends the top edge back. Negative rotateY sends the left edge back.
    rotateX.set((0.5 - y) * MAX_TILT);
    rotateY.set((x - 0.5) * MAX_TILT);
    spotX.set(x * 100);
    spotY.set(y * 100);
    lift.set(1);
    shade.set(1);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    shade.set(0);
  }

  return (
    <div className="shrink-0 [perspective:480px]">
      <m.div
        ref={ref}
        className="relative size-14 overflow-hidden rounded-2xl bg-[var(--surface-muted)] outline outline-1 -outline-offset-1 outline-[var(--image-outline)] md:size-16"
        style={{
          rotateX,
          rotateY,
          scale,
          y: floatY,
          boxShadow: shadow,
        }}
        onPointerMove={(event) => {
          if (reduce || event.pointerType !== "mouse") return;
          tiltTo(event.clientX, event.clientY);
        }}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <img src={AVATAR_SRC} alt="" className="size-full object-cover" />
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: dent }}
        />
      </m.div>
    </div>
  );
}
