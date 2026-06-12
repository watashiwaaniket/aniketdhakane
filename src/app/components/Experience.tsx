"use client";

import ExperienceCard from "./ui-components/ExperienceCard";
import { motion } from "motion/react";

export default function Experience() {
  return (
    <div className="pb-8">
      <h1 className="text-md font-bold pb-2">Experience</h1>

      <div className="flex flex-col gap-3.5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.92, 0.25, 1] }}
        >
          <ExperienceCard
            title="Zensar Technologies"
            role="Jr Software Engineer"
            timeFrom="Oct 2025"
            timeTo="Present"
            visualVideo="/ascii-butterfly.mp4"
            visualSide="right"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.21, 0.92, 0.25, 1],
          }}
        >
          <ExperienceCard
            title="XpedioLive pvt ltd."
            role="Software Developer Intern"
            timeFrom="Feb 2024"
            timeTo="Apr 2024"
            visualVideo="/ascii-jellyfish.mp4"
            visualSide="left"
          />
        </motion.div>
      </div>

      <h2 className="text-md font-bold py-2">Freelance Experience</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.92, 0.25, 1] }}
      >
        <ExperienceCard
          title="Myotrek Gym App"
          role="Mobile App Dev"
          timeFrom="Feb 2025"
          timeTo="June 2025"
          visualVideo="/ascii-flower-blooming.mp4"
          visualSide="right"
        />
      </motion.div>
    </div>
  );
}
