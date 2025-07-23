import GitHubCalendar from "react-github-calendar";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Socials } from "./components/Socials";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center bg-graph-paper">
      <div className="w-screen p-4 md:p-2 md:w-2xl h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Socials />
        <GitHubCalendar username="watashiwaaniket" />
      </div>
    </div>
  );
}
