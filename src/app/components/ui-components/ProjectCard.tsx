"use client";
import { ReactElement } from "react";
import ShinyText from "./ShinyText";

export interface ProjectCardProps {
  icon?: ReactElement;
  title: string;
  desc: string;
  link: string;
}

export function ProjectCard({ icon, title, desc, link }: ProjectCardProps) {
  return (
    <div
      className="flex flex-col w-96 md:w-80 h-36 border border-gray-950 rounded-xl p-5 m-1 relative"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <div className="pb-2 flex gap-2 items-center">
        {/* {icon} */}
        <h1 className="font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-t from-green-300 to-indigo-400">
          {title}
        </h1>
      </div>
      <hr className="text-neutral-900 pb-2" />
      <p className="text-xs text-neutral-400">{desc}</p>
      <a href={link} className="absolute bottom-4 right-4 cursor-pointer text-xs">
        <ShinyText
          text="live 🔗"
          disabled={false}
          speed={3}
          className="custom-class"
        />
      </a>
    </div>
  );
}
