import { PersonaIcon, CodeSeekIcon, OsapIcon, HikuIcon, ServoIcon, PoemsForHerIcon, AlphatechIcon } from "../icons/ProjectIcons";

interface Project {
  title: string;
  desc: string;
  link: string;
  icon: React.ComponentType; // Store the component itself, not JSX
}

interface Projects {
  [key: number]: Project;
}

export const fullstackProjects: Projects = {
  1: {
    title: 'PersonAi',
    desc: 'Ditch the dull notes. Meet PersonAi: your smart, free second brain that remembers, summarizes, and thinks with you.',
    link: 'https://personai-rho.vercel.app/',
    icon: PersonaIcon,
  },
  2: {
    title: 'osap',
    desc: 'Platform catering to open source contributors to find the next interesting project to tinker around with',
    link: 'https://osaplfm.vercel.app/',
    icon: OsapIcon,
  },
  3: {
    title: 'Hiku App',
    desc: 'A sample Hiku generating application which uses Cloudinary AI image generation for generating the cards',
    link: 'https://hiku-app.vercel.app/',
    icon: HikuIcon,
  },
  4: {
    title: 'Alphatech Solutions',
    desc: 'Landing page with realtime dashoard for a training institute',
    link: 'https://preview-alphatechsolutions.vercel.app/',
    icon: AlphatechIcon,
  }
};

export const frontendProjects: Projects = {
  1: {
    title: 'Servo UI',
    desc: 'Landing page of a UI component library made using shaders and motion',
    link: 'https://servoui.vercel.app/',
    icon: ServoIcon
  },
  2: {
    title: 'Poems For Her',
    desc: "Poems which I once wrote for her.",
    link: 'https://poemsforher.vercel.app/',
    icon: PoemsForHerIcon
  }
}

export const miscProjects: Projects = {
  1: {
    title: 'CodeSeek-r1',
    desc: 'A VSCode extension leveraging the power of deepseek-r1 running locally, while maintaining user privacy',
    link: 'https://github.com/watashiwaaniket/codeseek',
    icon: CodeSeekIcon,
  }
}


