import About from "@/components/About";
import Certifications from "@/components/Certifications";
import ChatWidget from "@/components/ChatWidget";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Projects from "@/components/Projects";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="relative bg-background/70">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
