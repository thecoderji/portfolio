import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import MagneticCursor from "@/components/MagneticCursor";
import ContactShortcut from "@/components/ContactShortcut";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HireMeButton from "@/components/HireMeButton";
import Chatbot from "@/components/Chatbot";
import { MotionConfig } from "framer-motion";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kishlay Choudhary — AI Engineer",
    template: "%s | Kishlay Choudhary",
  },
  description:
    "AI engineer who evaluates how AI reasons, then builds the systems that put it to work. RLHF/HITL evaluation on a frontier LLM by day, hybrid-RAG and multi-LLM systems by night.",
};

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body className="font-body text-ink antialiased">
        <MotionConfig reducedMotion="user">
          <Grain />
          <MagneticCursor />
          <ContactShortcut />
          <Nav />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <HireMeButton />
          <Chatbot />
        </MotionConfig>
      </body>
    </html>
  );
}
