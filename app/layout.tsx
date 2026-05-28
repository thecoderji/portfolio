import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Kishlay Choudhary | AI Engineer | LLM & RAG Specialist",
  description:
    "AI Engineer specializing in RAG pipelines, LangChain, LangGraph, Agentic AI, and FastAPI. B.Tech CSE graduate actively seeking AI Engineer roles across India.",
  keywords:
    "AI Engineer, LLM Engineer, Python Developer, RAG, LangChain, LangGraph, FastAPI, Kishlay Choudhary",
  authors: [{ name: "Kishlay Choudhary" }],
  openGraph: {
    title: "Kishlay Choudhary | AI Engineer",
    description: "Building intelligent systems with LLMs, RAG, and Agentic AI.",
    url: "https://kishlay.vercel.app",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishlay Choudhary | AI Engineer",
    description: "Building intelligent systems with LLMs, RAG, and Agentic AI."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background font-sans text-textPrimary`}>
        {children}
      </body>
    </html>
  );
}
