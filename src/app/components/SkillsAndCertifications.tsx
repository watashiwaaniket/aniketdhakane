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
import { m, useReducedMotion } from "motion/react";
import CertificationCard from "./ui-components/CertificationCard";

export default function SkillsAndCertifications() {
  const prefersReducedMotion = useReducedMotion();
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

      <m.div
        className="flex space-x-3 space-y-3 py-1 flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {icons.map((Icon, index) => (
          <m.div
            key={index}
            variants={prefersReducedMotion ? undefined : itemVariants}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.15 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-md:transform-none"
          >
            <Icon />
          </m.div>
        ))}
      </m.div>

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
