'use client';
import { ReactElement } from "react";
import ShinyText from "./ShinyText";

export interface ProjectCardProps{
    icon? : ReactElement;
    title : string;
    desc : string;
    link : string;
}

export function ProjectCard({ icon, title, desc, link } : ProjectCardProps){
    return(
        <div className="flex flex-col w-96 md:w-80 h-48 border-dashed border-2 border-gray-400 rounded-xl p-5 m-1 relative" style={{backgroundColor : 'rgba(0,0,0,0.3)'}}>
            <div className="pb-2 flex gap-2 items-center">
                {icon}
                <h1 className="font-semibold text-xl">{title}</h1>
            </div>
            <p>{desc}</p>
            <a href={link} className="absolute bottom-4 right-4 cursor-pointer">
                <ShinyText text="live 🔗" disabled={false} speed={3} className="custom-class" />
            </a>
        </div>
    )
}