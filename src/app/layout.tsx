import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://conventional-commit-generator.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Conventional Commit Generator - Create Git Commit Messages",
    template: "%s | Conventional Commit Generator",
  },
  description: "Free online tool to generate conventional commit messages for Git. Follow the conventional commits specification with ease. Supports feat, fix, docs, test, refactor, style, perf, build, and ci commit types.",
  keywords: [
    "conventional commits",
    "git commit",
    "commit message generator",
    "semantic versioning",
    "git",
    "version control",
    "commit format",
    "angular commits",
    "feat",
    "fix",
    "docs",
    "refactor",
    "developer tools",
  ],
  authors: [{ name: "BOTOOM", url: "https://github.com/BOTOOM" }],
  creator: "BOTOOM",
  publisher: "BOTOOM",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Conventional Commit Generator - Create Git Commit Messages",
    description: "Free online tool to generate conventional commit messages for Git. Follow the conventional commits specification with ease.",
    siteName: "Conventional Commit Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conventional Commit Generator - Create Git Commit Messages",
    description: "Free online tool to generate conventional commit messages for Git. Follow the conventional commits specification with ease.",
    creator: "@BOTOOM",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Developer Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* LLMs.txt for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable content" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM-readable full documentation" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
