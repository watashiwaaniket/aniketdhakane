"use client";

import GitHubCalendar from "react-github-calendar";

export default function GitHubStats() {
  return (
    <div className="my-4">
      <h1 className="text-md font-bold">Github Stats</h1>
      <GitHubCalendar
        username="watashiwaaniket"
        colorScheme="light"
        theme={{
          light: ["#d4dcd6", "var(--accent-blue)"],
        }}
        blockSize={8}
        fontSize={12}
      />
    </div>
  );
}
