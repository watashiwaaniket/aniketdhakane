"use client";
import Link from "next/link";
import { GithubIcon } from "./icons/GithubIcon";
import { XIcon } from "./icons/XIcon";
import { LinIcon } from "./icons/LinIcon";
import { MailIcon } from "./icons/MailIcon";
import { m } from "motion/react";

export function Socials() {
  return (
    <div className="my-4">
      <h1 className="text-md font-bold">Socials</h1>
      <div className="flex py-1 space-x-3">
        <Link href={"https://x.com/astriknormal"}>
          <m.div
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
          >
            <XIcon />
          </m.div>
        </Link>
        <Link href={"https://github.com/watashiwaaniket"}>
          <m.div
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
          >
            <GithubIcon />
          </m.div>
        </Link>
        <Link href={"https://www.linkedin.com/in/aniket-dhakane-9b06a125b/"}>
          <m.div
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
          >
            <LinIcon />
          </m.div>
        </Link>
        <Link href={"mailto:aniketdhakane3@gmail.com"}>
          <m.div
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
          >
            <MailIcon />
          </m.div>
        </Link>
      </div>
    </div>
  );
}
