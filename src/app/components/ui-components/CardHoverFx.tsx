"use client";

import type { CSSProperties, PointerEvent } from "react";

const glowBackground =
  "radial-gradient(ellipse 95% 90% at 50% 100%, color-mix(in srgb, var(--accent-sage) 58%, transparent) 0%, color-mix(in srgb, var(--accent-sage) 28%, transparent) 38%, color-mix(in srgb, var(--accent-sage) 10%, transparent) 62%, transparent 78%)";

const spotBorderStyle: CSSProperties = {
  padding: 1,
  background:
    "radial-gradient(180px circle at var(--spot-x, 50%) var(--spot-y, 100%), color-mix(in srgb, var(--accent-sage) 55%, white) 0%, color-mix(in srgb, var(--accent-sage) 70%, white) 22%, transparent 64%)",
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

export const cardHoverFxClassName =
  "[--spot-x:50%] [--spot-y:100%]";

export const cardHoverShadowClassName =
  "transition-[box-shadow] duration-150 ease-out hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_color-mix(in_srgb,var(--accent-sage)_10%,transparent)]";

export function updateCardSpot(
  event: PointerEvent<HTMLElement>,
) {
  const { currentTarget, clientX, clientY } = event;
  const rect = currentTarget.getBoundingClientRect();
  currentTarget.style.setProperty("--spot-x", `${clientX - rect.left}px`);
  currentTarget.style.setProperty("--spot-y", `${clientY - rect.top}px`);
}

export function cardSpotHandlers(enabled: boolean) {
  if (!enabled) return {};
  return {
    onPointerEnter: updateCardSpot,
    onPointerMove: updateCardSpot,
  };
}

export function CardHoverFx() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[170%] origin-bottom translate-y-[42%] opacity-[0.06] transition-[translate,opacity] duration-400 ease-[cubic-bezier(0.33,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-[0.42] group-hover:duration-[850ms] motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:group-hover:opacity-[0.06]"
        style={{ background: glowBackground }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 motion-reduce:group-hover:opacity-0"
        style={spotBorderStyle}
      />
    </>
  );
}
