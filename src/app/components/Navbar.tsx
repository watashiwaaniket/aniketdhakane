"use client";

import Link from "next/link";
import { m } from "motion/react";
import GradientText from "./ui-components/GradientText";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <div className="flex space-x-4 py-4 md:p-6 justify-end w-full text-sm items-center">
      <Link href={"/wall"}>
        <m.p
          className="border px-4 border-[var(--border)] rounded-xl hover:bg-[var(--surface-hover)] cursor-pointer text-lg"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          wall
        </m.p>
      </Link>
      <Link href={"https://dev.to/hisukurifu"}>
        <m.p
          className="border px-4 border-[var(--border)] rounded-xl hover:bg-[var(--surface-hover)] cursor-pointer text-lg"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          blog
        </m.p>
      </Link>
      <m.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        className="cursor-pointer text-lg border border-[var(--border)] rounded-xl px-2 bg-[var(--nav-accent)]"
      >
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
          <Link href={"/aniketdhakane.pdf"}>resume</Link>
        </GradientText>
      </m.div>
      <ThemeToggle />
    </div>
  );
}
