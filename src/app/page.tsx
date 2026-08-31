import dynamic from "next/dynamic";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Socials } from "./components/Socials";
import { FadeInSection } from "./components/FadeInSection";

const LastFmWidget = dynamic(() => import("./components/LastFmWidget"));
const GitHubStats = dynamic(() => import("./components/GitHubStats"));
const FeaturedProjects = dynamic(() => import("./components/FeaturedProjects"));
const Experience = dynamic(() => import("./components/Experience"));
const SkillsAndCertifications = dynamic(
  () => import("./components/SkillsAndCertifications")
);
const AskAI = dynamic(() => import("./components/AskAI"));
const Footer2 = dynamic(() => import("./components/Footer2"));

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <div className="w-screen p-4 md:p-2 md:w-2xl flex flex-col">
        <Navbar />
        <Hero />
        <LastFmWidget />
        <Socials />

        <FadeInSection>
          <GitHubStats />
        </FadeInSection>

        <FadeInSection y={0} duration={0.25}>
          <FeaturedProjects />
        </FadeInSection>

        <FadeInSection y={40} duration={0.8}>
          <Experience />
        </FadeInSection>

        <FadeInSection y={35} duration={0.75}>
          <SkillsAndCertifications />
        </FadeInSection>

        <FadeInSection y={24} duration={0.6}>
          <AskAI />
        </FadeInSection>
      </div>

      <Footer2 />
    </div>
  );
}