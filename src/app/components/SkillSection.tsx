"use client";
import GitHubCalendar from "react-github-calendar";
import {
  AWSIcon,
  DockerIcon,
  ExpressIcon,
  FigmaIcon,
  GitIcon,
  JSIcon,
  JWTIcon,
  NextIcon,
  PostgresIcon,
  PrismaIcon,
  ReactIcon,
  TailwindIcon,
  TSIcon,
} from "./icons/SkillsIcons";
import { motion } from "motion/react";

export default function SkillSection() {
  const icons = [
    ReactIcon,
    NextIcon,
    JSIcon,
    TSIcon,
    PrismaIcon,
    PostgresIcon,
    ExpressIcon,
    JWTIcon,
    DockerIcon,
    TailwindIcon,
    AWSIcon,
    GitIcon,
    FigmaIcon,
  ];
  return (
    <div className="my-6">
      <h1 className="text-md font-bold">Github Stats</h1>
      <GitHubCalendar
        username="watashiwaaniket"
        colorScheme="dark"
        theme={{
          dark: ["#333", "rgb(14, 214, 214)"],
        }}
        blockSize={8}
        fontSize={12}
      />
      <h1 className="text-md font-bold mt-8">Skills</h1>
      <div className="flex space-x-3 space-y-3 py-1 flex-wrap">
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
          >
            <Icon />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
