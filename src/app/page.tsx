import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Socials } from "./components/Socials";
import { Projects } from "./components/Projects";
import SkillSection from "./components/SkillSection";
import Experience from "./components/Experience";
import Footer2 from "./components/Footer2";
import SnowfallView from "./components/SnowfallView";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <SnowfallView />
      <div className="w-screen p-4 md:p-2 md:w-2xl flex flex-col">
        <Navbar />
        <Hero />
        <Socials />
        <Projects />
        <SkillSection />
        <Experience />
      </div>
      <Footer2 />
    </div>
  );
}
