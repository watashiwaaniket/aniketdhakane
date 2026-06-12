"use client";

import Link from "next/link";
import { motion } from "motion/react";
import GradientText from "./ui-components/GradientText";

export function Navbar() {
  return (
    <div className="flex space-x-4 py-4 md:p-6 justify-end w-full text-sm">
      <Link href={"/wall"}>
        <motion.p
          className="border px-4 border-[var(--border)] rounded-lg hover:bg-[#e6ede5] cursor-pointer"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          wall
        </motion.p>
      </Link>
      <Link href={"https://dev.to/hisukurifu"}>
        <motion.p
          className="border px-4 border-[var(--border)] rounded-lg hover:bg-[#e6ede5] cursor-pointer"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          blog
        </motion.p>
      </Link>
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        className="cursor-pointer"
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
          showBorder={true}
          className="custom-class"
        >
          <Link href={"/aniketdhakane.pdf"}>resume</Link>
        </GradientText>
      </motion.div>
    </div>
  );
}
