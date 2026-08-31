export interface IconProp {
  theme: "light" | "dark";
}

/** Shared icon-tile surface: light = white/black, dark = black/white. */
export function iconTileClass(
  theme: IconProp["theme"],
  padding = "p-1"
) {
  const surface =
    theme === "dark"
      ? "bg-black text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
      : "bg-white text-black shadow-[0_0_0_1px_rgba(0,0,0,0.08)]";

  return `rounded-lg size-10 ${padding} ${surface}`;
}
