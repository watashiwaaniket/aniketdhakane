export const projectsConfig = {
  /** Background behind the notes window. Set null for gradient only. */
  backgroundImage: "/pBackground.webp" as string | null,
  backgroundImageFallback: "/pBackground.jpg",
  /** Keep light so liquid glass can read the photo behind it */
  backgroundScrimOpacity: 0.02,
} as const;
