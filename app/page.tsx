import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CodeLifeWithHarsh from "@/components/CodeLifeWithHarsh";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <CodeLifeWithHarsh />
        <About />
        <Projects />
        <Skills />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
