import type { Metadata } from "next";
import { Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./components/MotionProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aniket Dhakane",
  description: "Personal Portfolio of Aniket Dhakane, showcasing his craft and skills",
  openGraph: {
    title: "Aniket Dhakane - Portfolio",
    description: "Explore the personal portfolio of Aniket Dhakane, highlighting his skills and projects.",
    url: "https://www.aniketdhakane.xyz",
    siteName: "Aniket Dhakane",
    images: [
      {
        url: "https://www.aniketdhakane.xyz/canvas.webp",
        width: 1200,
        height: 630,
        alt: "Aniket Dhakane Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Dhakane - Portfolio",
    description: "Explore the personal portfolio of Aniket Dhakane, highlighting his skills and projects.",
    images: ["https://www.aniketdhakane.xyz/canvas.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" data-theme="light">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" sizes="192x192" />
      </head>
      <body
        className={`${geistMono.variable} ${rubik.variable} antialiased`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}