"use client";
import { GrainGradient } from "@paper-design/shaders-react";
import ShinyText from "./ui-components/ShinyText";

export default function Footer2() {
  return (
    <div className="w-full overflow-hidden relative">
      <div className="p-4 pb-4 font-bold absolute z-50 bottom-0 w-full flex justify-center">
        <p className="text-neutral-200 text-3xl sm:text-5xl md:text-6xl lg:text-7xl pb-4">
          © 2026 Aniket Dhakane
        </p>
      </div>
      <div className="w-full h-[580px] absolute backdrop-blur-lg z-40"></div>
      <GrainGradient
        className="w-full h-[560px]"
        colors={["#A8FBD3", "#d7cbc6"]}
        colorBack="#000"
        softness={0.7}
        intensity={0.05}
        noise={0.3}
        shape="wave"
        speed={0.6}
      />
    </div>
  );
}
