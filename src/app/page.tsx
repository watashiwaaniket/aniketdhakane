import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Socials } from "./components/Socials";
import { Projects } from "./components/Projects";
import SkillSection from "./components/SkillSection";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="w-screen flex justify-center overflow-x-hidden">
      <div className="w-screen p-4 md:p-2 md:w-2xl h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Socials />
        <Projects />
        <SkillSection />
        <Experience />
        <Footer />
      </div>
    </div>
  );
}
