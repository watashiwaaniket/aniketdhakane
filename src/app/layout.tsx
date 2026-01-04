import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
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
        url: "https://www.aniketdhakane.xyz/canvas.png",
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
    images: ["https://www.aniketdhakane.xyz/canvas.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}