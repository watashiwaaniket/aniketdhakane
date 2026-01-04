export interface ExperienceCardProps {
  title: string;
  role: string;
  timeFrom: string;
  timeTo: string;
}

export default function ExperienceCard({
  title,
  role,
  timeFrom,
  timeTo,
}: ExperienceCardProps) {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl border-gray-950 border">
      <div>
        <h1 className="text-sm font-bold">{title}</h1>
        <p className="text-xs font-light">{role}</p>
      </div>
      <p className="text-xs font-light">
        {timeFrom} - {timeTo}
      </p>
    </div>
  );
}
