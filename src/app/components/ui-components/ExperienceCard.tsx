export interface ExperienceCardProps{
    title : string;
    role : string;
    timeFrom : string;
    timeTo : string;
}

export default function ExperienceCard({ title, role, timeFrom, timeTo } : ExperienceCardProps){
    return(
        <div className="flex justify-between items-center p-4 rounded-xl border-gray-400 border-dashed border-2">
            <div>
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="text-sm font-light">{role}</p>
            </div>
            <p className="text-sm font-light">{timeFrom} - {timeTo}</p>
        </div>
    )
}