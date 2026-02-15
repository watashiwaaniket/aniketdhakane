"use client";
import Snowfall from "react-snowfall";
import { useMemo } from "react";

export default function SnowfallView() {
  const snowflakeImage = useMemo(() => {
    if (typeof window === "undefined") return undefined;

    const img = new Image();
    img.src = "/snowflake.png";
    return img;
  }, []);

  return (
    <Snowfall
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 100,
      }}
      images={snowflakeImage ? [snowflakeImage] : undefined}
      snowflakeCount={200}
    />
  );
}
