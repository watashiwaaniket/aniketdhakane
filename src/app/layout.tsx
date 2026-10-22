import type { Metadata } from "next";
import { Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./components/MotionProvider";
import {
  ThemeProvider,
  themeInitScript,
} from "./components/ThemeProvider";

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
  metadataBase: new URL("https://www.aniketdhakane.xyz"),
  title: "Aniket Dhakane",
  description:
    "Fullstack developer in Pune. Interfaces, and the systems behind them.",
  openGraph: {
    siteName: "Aniket Dhakane",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="icon" href="/favicon.webp" type="image/webp" sizes="192x192" />
      </head>
      <body
        className={`${geistMono.variable} ${rubik.variable} antialiased`}
      >
        <div className="isolate">
          <ThemeProvider>
            <MotionProvider>{children}</MotionProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}