import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Socials } from "./components/Socials";
import { Projects } from "./components/Projects";
import SkillSection from "./components/SkillSection";

export default function Home() {
  return (
    <div className="w-screen flex justify-center">
      <div className="w-screen p-4 md:p-2 md:w-2xl h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Socials />
        <Projects />
        <SkillSection />
      </div>
    </div>
  );
}
