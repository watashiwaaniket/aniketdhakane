"use client";

export interface ProjectCardProps {
  image: string;
  title: string;
  desc: string;
  link: string;
}

export function ProjectCard({ image, title, desc, link }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block flex flex-col w-96 md:w-80 h-auto border border-gray-800 rounded-xl overflow-hidden hover:scale-101 transition-transform duration-300 m-1 relative group"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h1 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-t from-green-300 to-indigo-400">
          {title}
        </h1>
        <p className="text-xs text-neutral-400">{desc}</p>
      </div>
    </a>
  );
}
