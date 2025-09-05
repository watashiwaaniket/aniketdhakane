import { PersonaIcon, CodeSeekIcon, OsapIcon, HikuIcon } from "../icons/ProjectIcons";

interface Project {
  title: string;
  desc: string;
  link: string;
  icon: React.ComponentType; // Store the component itself, not JSX
}

interface Projects {
  [key: number]: Project;
}

const projects: Projects = {
  1: {
    title: 'PersonAi',
    desc: 'Ditch the dull notes. Meet PersonAi: your smart, free second brain that remembers, summarizes, and thinks with you.',
    link: 'https://personai-rho.vercel.app/',
    icon: PersonaIcon,
  },
  2: {
    title: 'CodeSeek-r1',
    desc: 'A VSCode extension leveraging the power of deepseek-r1 running locally, while maintaining user privacy',
    link: 'https://github.com/watashiwaaniket/codeseek',
    icon: CodeSeekIcon,
  },
  3: {
    title: 'osap',
    desc: 'Platform catering to open source contributors to find the next interesting project to tinker around with',
    link: 'https://osaplfm.vercel.app/',
    icon: OsapIcon,
  },
  4: {
    title: 'Hiku App',
    desc: 'A sample Hiku generating application which uses Cloudinary AI image generation for generating the cards',
    link: 'https://hiku-app.vercel.app/',
    icon: HikuIcon,
  }
};

export default projects;
