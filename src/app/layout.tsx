import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        url: "/images/profile.jpg", // This will use your profile image when shared
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
    images: ["/images/profile.jpg"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
