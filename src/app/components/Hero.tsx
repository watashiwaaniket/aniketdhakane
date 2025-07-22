import GradientText from "./ui-components/GradientText";
import ShinyText from "./ui-components/ShinyText";
import GitHubCalendar from "react-github-calendar";

export function Hero(){
    return(
        <div className="mt-4">
            <h1 className="text-3xl md:text-4xl font-semibold">Aniket Dhakane</h1>
            <div className="space-x-1 text-md">
                <ShinyText text="👨🏻‍💻 Engineer" disabled={false} speed={3} className="custom-class" />
                <ShinyText text="| Developer" disabled={false} speed={3} className="custom-class" />
            </div>
            <div className="mt-14 mb-12 text-sm md:text-base">
                Fullstack Developer based in :
                <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class"
                >
                    Pune
                </GradientText> 
                , with a love for .
                <GradientText
                    colors={["#EA5B6F", "#F7CFD8", "#EA5B6F", "#F7CFD8", "#EA5B6F"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class"
                >
                    User Centric Design
                </GradientText>
                , I write clean and scalable code, while building reusable components for smoother development experience.
            </div>
            <GitHubCalendar username="watashiwaaniket" />
        </div>
    )
}