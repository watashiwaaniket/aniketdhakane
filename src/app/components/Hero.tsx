import Link from "next/link";
import GradientText from "./ui-components/GradientText";
import ShinyText from "./ui-components/ShinyText";

const AVATAR_SRC = "/avatar.webp";

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
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-[var(--surface-muted)] outline outline-1 -outline-offset-1 outline-[var(--image-outline)] md:size-16">
      <img
        src={AVATAR_SRC}
        alt=""
        className="size-full object-cover"
      />
    </div>
  );
}
