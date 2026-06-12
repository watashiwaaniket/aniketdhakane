"use client";

import GitHubCalendar from "react-github-calendar";

export default function GitHubStats() {
  return (
    <div className="my-4">
      <h1 className="text-md font-bold">Github Stats</h1>
      <GitHubCalendar
        username="watashiwaaniket"
        colorScheme="dark"
        theme={{
          dark: ["#333", "rgb(14, 214, 214)"],
        }}
        blockSize={8}
        fontSize={12}
      />
    </div>
  );
}
