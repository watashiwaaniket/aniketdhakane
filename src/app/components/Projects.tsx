"use client";

import { ProjectCard } from "./ui-components/ProjectCard";
import { frontendProjects, fullstackProjects, miscProjects } from "./utils/lib";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function Projects() {
  return (
    <div className="my-4">
      <h1 className="text-md font-bold">Projects</h1>

      <h2 className="text-sm font-semibold p-1">Fullstack Projects</h2>
      <motion.div
        className="flex flex-wrap items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Object.keys(fullstackProjects).map((key) => {
          const project = fullstackProjects[Number(key)];
          return (
            <motion.div key={key} variants={cardVariants} transition={{ duration: 0.55, ease: [0.21, 0.92, 0.25, 1] }}>
              <ProjectCard
                image={project.image}
                title={project.title}
                desc={project.desc}
                link={project.link}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <h2 className="text-sm font-semibold p-1">Frontend Projects</h2>
      <motion.div
        className="flex flex-wrap items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Object.keys(frontendProjects).map((key) => {
          const project = frontendProjects[Number(key)];
          return (
            <motion.div key={key} variants={cardVariants} transition={{ duration: 0.55, ease: [0.21, 0.92, 0.25, 1] }}>
              <ProjectCard
                image={project.image}
                title={project.title}
                desc={project.desc}
                link={project.link}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <h2 className="text-sm font-semibold p-1">Misc Projects</h2>
      <motion.div
        className="flex flex-wrap items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Object.keys(miscProjects).map((key) => {
          const project = miscProjects[Number(key)];
          return (
            <motion.div key={key} variants={cardVariants} transition={{ duration: 0.55, ease: [0.21, 0.92, 0.25, 1] }}>
              <ProjectCard
                image={project.image}
                title={project.title}
                desc={project.desc}
                link={project.link}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
