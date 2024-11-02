import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  content: [
    "./pages/**/*.{js,ts,jsx,mdx}",
    "./app/**/*.{js,ts,jsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#000319'
        }
      }
    }
  }
};

export default nextConfig;
