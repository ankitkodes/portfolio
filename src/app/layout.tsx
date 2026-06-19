import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ankit Kumar | Software Engineer & Full Stack Developer",
  description: "Portfolio of Ankit Kumar, a passionate Software Engineer, Full Stack Developer, Frontend Developer, and Backend Developer. View my projects, skills, and experience.",
  keywords: [
    "Ankit Kumar",
    "Ankit Kumar Portfolio",
    "Software Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer"
  ],
  authors: [{ name: "Ankit Kumar" }],
  creator: "Ankit Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankitkumar.dev", // Update this with your actual domain later
    siteName: "Ankit Kumar Portfolio",
    title: "Ankit Kumar | Software Engineer & Full Stack Developer",
    description: "Portfolio of Ankit Kumar, a passionate Software Engineer and Full Stack Developer.",
    images: [
      {
        url: "/images/og-image.png", // This will use the generated website thumbnail when shared
        width: 1200,
        height: 630,
        alt: "Ankit Kumar - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Kumar | Software Engineer & Full Stack Developer",
    description: "Portfolio of Ankit Kumar, a passionate Software Engineer and Full Stack Developer.",
    creator: "@itsankitkumar07",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} v2-root`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
