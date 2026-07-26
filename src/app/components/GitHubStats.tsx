"use client";

import GitHubCalendar from "react-github-calendar";
import { useTheme } from "./ThemeProvider";

export default function GitHubStats() {
  const { theme, mounted } = useTheme();

  return (
    <div className="my-4">
      <h1 className="text-md font-bold">Github Stats</h1>
      {/* Wait until theme is resolved client-side so light/dark grid matches page */}
      {mounted ? (
        <GitHubCalendar
          username="watashiwaaniket"
          colorScheme={theme}
          theme={{
            light: ["#d4dcd6", "#6b8fa8"],
            dark: ["#2d3832", "#8aafc4"],
          }}
          blockSize={8}
          fontSize={12}
        />
      ) : (
        <div
          className="mt-2 h-[112px] w-full max-w-md animate-pulse rounded-lg bg-[var(--surface-muted)]"
          aria-hidden
        />
      )}
    </div>
  );
}
