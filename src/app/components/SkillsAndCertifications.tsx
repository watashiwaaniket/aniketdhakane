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

  return (
    <div className="my-6">
      <h1 className="text-md font-bold">Skills and Certifications</h1>

      {/*
        Inset + overflow-visible so scale(1.2) has room (content-visibility /
        page overflow-x otherwise clip edge icons).
      */}
      <div className="flex flex-wrap gap-x-3 gap-y-3 overflow-visible px-2 py-2">
        {icons.map((Icon, index) => (
          <m.div
            key={index}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.2 }}
            whileTap={
              prefersReducedMotion
                ? undefined
                : { scale: 0.8, transition: { duration: 0.1 } }
            }
            transition={{ duration: 0.3 }}
            className="origin-center overflow-visible"
          >
            <Icon />
          </m.div>
        ))}
      </div>

      <h2 className="text-sm font-semibold mt-5 mb-2">Certifications</h2>
      {/* Inset so Motion hover scale has room (same as Experience cards) */}
      <div className="px-2 py-1.5">
        <CertificationCard
          title="Claude Certified Architect — Foundations (CCA-F)"
          issuer="Anthropic"
          issued="Jun 2026"
          expires="Dec 2026"
          credentialId="h5phb8iwbwrw"
          verifyUrl="https://verify.skilljar.com/c/h5phb8iwbwrw"
        />
      </div>
    </div>
  );
}
