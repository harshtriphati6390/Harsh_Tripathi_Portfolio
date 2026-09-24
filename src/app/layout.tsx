import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Harsh Tripathi | Full-Stack Developer · Data Analyst · SEO Specialist",
  description:
    "Portfolio of Harsh Tripathi — B.Tech CSE graduate (2026) from Noida, India. Building across the full stack: React, Node.js, FastAPI, SQL, Power BI and technical SEO.",
  keywords: [
    "Harsh Tripathi",
    "Full Stack Developer",
    "Data Analyst",
    "SEO Specialist",
    "B.Tech CSE",
    "React",
    "Node.js",
    "Power BI",
    "Portfolio",
    "Noida",
  ],
  authors: [{ name: "Harsh Tripathi" }],
  icons: {
    icon: "/images/harsh-photo.jpg",
  },
  openGraph: {
    title: "Harsh Tripathi | Portfolio",
    description:
      "CS graduate building across the whole stack — web apps, data analytics and SEO.",
    type: "website",
    images: [{ url: "/images/harsh-photo.jpg", width: 640, height: 640, alt: "Harsh Tripathi" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
