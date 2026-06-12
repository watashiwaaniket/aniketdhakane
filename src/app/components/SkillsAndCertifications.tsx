"use client";
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
import CertificationCard from "./ui-components/CertificationCard";

export default function SkillsAndCertifications() {
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
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="my-6">
      <h1 className="text-md font-bold">Skills and Certifications</h1>

      <motion.div
        className="flex space-x-3 space-y-3 py-1 flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
          >
            <Icon />
          </motion.div>
        ))}
      </motion.div>

      <h2 className="text-sm font-semibold mt-5 mb-2">Certifications</h2>
      <CertificationCard
        title="Claude Certified Architect — Foundations (CCA-F)"
        issuer="Anthropic"
        issued="Jun 2026"
        expires="Dec 2026"
        credentialId="h5phb8iwbwrw"
        verifyUrl="https://verify.skilljar.com/c/h5phb8iwbwrw"
      />
    </div>
  );
}
