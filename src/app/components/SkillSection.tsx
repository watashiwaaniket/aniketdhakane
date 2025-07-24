import GitHubCalendar from "react-github-calendar";

export default function SkillSection(){
    return(
        <div className="my-6">
            <h1 className="text-lg font-bold">Github Stats</h1>
            <GitHubCalendar username="watashiwaaniket" />
            <h1 className="text-lg font-bold mt-8">Skills</h1>
        </div>
    )
}