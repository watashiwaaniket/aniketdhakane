"use client";

import Link from "next/link";
import GradientText from "./ui-components/GradientText";

export function Navbar() {
  return (
    <div className="flex space-x-4 py-4 md:p-6 justify-end w-full text-sm">
      <Link href={"/wall"}>
        <p className="border px-4 border-neutral-800 rounded-lg hover:bg-neutral-900">wall</p>
      </Link>
      <Link href={"https://dev.to/hisukurifu"}>
        <p className="border px-4 border-neutral-800 rounded-lg hover:bg-neutral-900">blog</p>
      </Link>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
      >
        <Link href={"/aniket-dhakane-latest.pdf"}>resume</Link>
      </GradientText>
    </div>
  );
}
