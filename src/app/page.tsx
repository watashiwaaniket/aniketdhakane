"use client";

import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Socials } from "./components/Socials";
import GitHubStats from "./components/GitHubStats";
import Experience from "./components/Experience";
import SkillsAndCertifications from "./components/SkillsAndCertifications";
import { Projects } from "./components/Projects";
import Footer2 from "./components/Footer2";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <div className="w-screen p-4 md:p-2 md:w-2xl flex flex-col">
        <Navbar />
        <Hero />

        <Socials />

        {/* Cinematic scrollytelling: GitHub as early credibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.92, 0.25, 1] }}
        >
          <GitHubStats />
        </motion.div>

        {/* Premium motion cinema: Experience arrives with presence */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.92, 0.25, 1] }}
        >
          <Experience />
        </motion.div>

        {/* Skills & Certifications with staggered inner motion */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.75, ease: [0.21, 0.92, 0.25, 1] }}
        >
          <SkillsAndCertifications />
        </motion.div>

        {/* Projects at the bottom — cinematic reveal as final showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.21, 0.92, 0.25, 1] }}
        >
          <Projects />
        </motion.div>
      </div>

      <Footer2 />
    </div>
  );
}
