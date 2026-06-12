import Link from "next/link";
import GradientText from "./ui-components/GradientText";
import ShinyText from "./ui-components/ShinyText";

export function Hero() {
  return (
    <div className="mt-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Aniket Dhakane 𓅓</h1>
      <div className="space-x-1 text-sm">
        <ShinyText
          text="👨🏻‍💻 Jr Software Engineer"
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
