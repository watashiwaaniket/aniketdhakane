import ExperienceCard from "./ui-components/ExperienceCard";

export default function Experience(){
    return(
        <div className="pb-8">
            <h1 className="text-lg font-bold pb-2">Experience</h1>
            <ExperienceCard 
                title="XpedioLive pvt ltd."
                role="Software Developer Intern"
                timeFrom="Feb 2024"
                timeTo="Apr 2024"
            />
        </div>
    )
}