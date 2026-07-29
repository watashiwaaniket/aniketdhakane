import { projectsConfig } from "@/lib/projects/projects-config";

type NotesBackgroundProps = {
  children: React.ReactNode;
};

export function NotesBackground({ children }: NotesBackgroundProps) {
  const { backgroundImage, backgroundImageFallback, backgroundScrimOpacity } =
    projectsConfig;

  return (
    <div className="notes-canvas relative isolate h-dvh w-full overflow-hidden">
      <div
        aria-hidden
        className="notes-background-layer pointer-events-none fixed inset-0 -z-20"
      />

      {backgroundImage && (
        <picture className="pointer-events-none fixed inset-0 -z-[19] block h-full w-full">
          <source srcSet={backgroundImage} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative static export bg */}
          <img
            src={backgroundImageFallback}
            alt=""
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
      )}

      <div
        aria-hidden
        className="notes-background-scrim pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: backgroundScrimOpacity }}
      />
      <div className="relative z-0 flex h-dvh w-full overflow-hidden md:p-4">
        {children}
      </div>
    </div>
  );
}
