import GitHubCalendar from "react-github-calendar";
import { AWSIcon, DockerIcon, ExpressIcon, FigmaIcon, GitIcon, JSIcon, JWTIcon, NextIcon, PostgresIcon, PrismaIcon, ReactIcon, TailwindIcon, TSIcon } from "./icons/SkillsIcons";

export default function SkillSection(){
    return(
        <div className="my-6">
            <h1 className="text-lg font-bold">Github Stats</h1>
            <GitHubCalendar username="watashiwaaniket" />
            <h1 className="text-lg font-bold mt-8">Skills</h1>
            <div className="flex space-x-3 space-y-3 py-1 flex-wrap">
                <ReactIcon />
                <NextIcon />
                <JSIcon />
                <TSIcon />
                <PrismaIcon />
                <PostgresIcon />
                <ExpressIcon />
                <JWTIcon />
                <DockerIcon />
                <TailwindIcon />
                <AWSIcon />
                <GitIcon />
                <FigmaIcon />
            </div>
        </div>
    )
}