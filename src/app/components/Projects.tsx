"use client";

import { ProjectCard } from "./ui-components/ProjectCard";
import { frontendProjects, fullstackProjects, miscProjects } from "./utils/lib";

export function Projects() {
  console.log(fullstackProjects[1].desc);
  return (
    <div className="my-4">
      <h1 className="text-md font-bold">Projects</h1>
      <h2 className="text-sm font-semibold p-1">Fullstack Projects</h2>
      <div className="flex flex-wrap items-center">
        {Object.keys(fullstackProjects).map((key) => {
          const project = fullstackProjects[Number(key)];
          return (
            <ProjectCard
              key={key}
              image={project.image}
              title={project.title}
              desc={project.desc}
              link={project.link}
            />
          );
        })}
      </div>
      <h2 className="text-sm font-semibold p-1">Frontend Projects</h2>
      <div className="flex flex-wrap items-center">
        {Object.keys(frontendProjects).map((key) => {
          const project = frontendProjects[Number(key)];
          return (
            <ProjectCard
              key={key}
              image={project.image}
              title={project.title}
              desc={project.desc}
              link={project.link}
            />
          );
        })}
      </div>
      <h2 className="text-sm font-semibold p-1">Misc Projects</h2>
      <div className="flex flex-wrap items-center">
        {Object.keys(miscProjects).map((key) => {
          const project = miscProjects[Number(key)];
          return (
            <ProjectCard
              key={key}
              image={project.image}
              title={project.title}
              desc={project.desc}
              link={project.link}
            />
          );
        })}
      </div>
    </div>
  );
}
