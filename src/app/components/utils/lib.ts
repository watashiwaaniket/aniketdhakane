interface Project {
  title: string;
  desc: string;
  link: string;
  image: string;
}

interface Projects {
  [key: number]: Project;
}

export const fullstackProjects: Projects = {
  1: {
    title: "PersonAi",
    desc: "Ditch the dull notes. Meet PersonAi: your smart, free second brain that remembers, summarizes, and thinks with you.",
    link: "https://personai-rho.vercel.app/",
    image: "/personAI.png",
  },
  2: {
    title: "osap",
    desc: "Platform catering to open source contributors to find the next interesting project to tinker around with",
    link: "https://osaplfm.vercel.app/",
    image: "/osap.png",
  },
  3: {
    title: "Aura ProTech Consulting",
    desc: "Website for a client, contains two landing pages and a CMS",
    link: "https://auraprotech.vercel.app/",
    image: "/auraprotech.png",
  },
  4: {
    title: "Alphatech Solutions",
    desc: "Landing page with realtime dashoard for a training institute",
    link: "https://preview-alphatechsolutions.vercel.app/",
    image: "/alphatech.png",
  },
};

export const frontendProjects: Projects = {
  1: {
    title: "wiredraw",
    desc: "WIP excalidraw clone",
    link: "https://wiredraw.vercel.app/",
    image: "/wiredraw.png",
  },
};

export const miscProjects: Projects = {
  1: {
    title: "CodeSeek-r1",
    desc: "A VSCode extension leveraging the power of deepseek-r1 running locally, while maintaining user privacy",
    link: "https://github.com/watashiwaaniket/codeseek",
    image: "/codeseek.png",
  },
};
