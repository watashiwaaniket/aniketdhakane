'use client';

import { MailIcon } from "./icons/MailIcon";
import { ProjectCard } from "./ui-components/ProjectCard";
import projects from "./utils/lib";

export function Projects(){
    console.log(projects[1].desc)
    return(
        <div className="my-4">
            <h1 className="text-lg font-bold">Projects</h1>
            <div className="flex flex-wrap justify-center items-center">
                {Object.keys(projects).map((key) => {
                    const project = projects[Number(key)];
                    const IconComponent = project.icon;
                    return(
                        <ProjectCard
                            key={key}
                            icon={<IconComponent />}
                            title={project.title}
                            desc={project.desc}
                            link={project.link}
                        />
                    )
                })}
            </div>
        </div>
    )
}