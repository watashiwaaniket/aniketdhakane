import Link from "next/link";
import ExperienceCard from "./ui-components/ExperienceCard";

export default function Experience() {
  return (
    <div className="pb-8">
      <h1 className="text-lg font-bold pb-2">Experience</h1>
      <div className="flex flex-col gap-3.5">
        <ExperienceCard
          title=""
          role="Jr Software Engineer"
          timeFrom="Oct 2025"
          timeTo="Present"
        />
        <ExperienceCard
          title="XpedioLive pvt ltd."
          role="Software Developer Intern"
          timeFrom="Feb 2024"
          timeTo="Apr 2024"
        />
      </div>
      <h2 className="text-lg font-bold py-2">Freelance Experience</h2>
      <Link href={"https://apps.apple.com/in/app/myotrek/id6747103153"}>
        <ExperienceCard
          title="Myotrek Gym App"
          role="Mobile App Dev"
          timeFrom="Feb 2025"
          timeTo="June 2025"
        />
      </Link>
    </div>
  );
}
