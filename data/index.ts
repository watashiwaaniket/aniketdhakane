import { title } from "process";

export const gridItems = [
  {
    id: 1,
    title: "Read My Article on dev.to",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/devto.jpeg",
    spareImg: "",
  },
  {
    id: 2,
    title: "In a boat surfing the world of code",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Always Eager to learn how a technology works",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently working on a Second Brain App.",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Checkout my new VSCode Extension, codeseek-r1!",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "PersonAI",
    des: "A second brain note taking app leveraging the power of AI to store and understand your notes.",
    img: "/p0.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/ejs-w.svg"],
    link: "https://personai-rho.vercel.app/",
  },
  {
    id: 2,
    title: "Hiku-App",
    des: "A Next.js Web Application to build and customize your own hikus, powered by cloudinary AI and Mongo Atlas",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://hiku-app.vercel.app",
  },
  {
    id: 3,
    title: "Component Cloud",
    des: "An opensource UI components library where users can submit their own code or use others code for their websites. Made with Next.js, database by supabase, secured by nextAuth and powered by vercel",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg"],
    link: "https://github.com/watashiwaaniket/component-cloud",
  },
  {
    id: 4,
    title: "FauSol",
    des: "Solana devnet faucet for you!",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg"],
    link: "https://ingrelicious.vercel.app/",
  },
  {
    id: 5,
    title: "Slingpack",
    des: "A crypto wallet mockup which generates solana chain public and private keys",
    img: "/p4.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://slingpack.vercel.app/",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Software Developer Intern",
    desc: "Worked at XpedioLive Technologies pvt. ltd. as a fullstack web developer, working with Svelte Framework",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    src: "https://github.com/watashiwaaniket",
  },
  {
    id: 2,
    img: "/twit.svg",
    src: "https://x.com/AniketDhak6470",
  },
  {
    id: 3,
    img: "/link.svg",
    src: "https://www.linkedin.com/in/aniket-dhakane-9b06a125b/",
  },
];
