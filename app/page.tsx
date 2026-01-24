import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import DriveContainer from "@/components/drive/DriveContainer";

export default function Home() {
  return (
    <DriveContainer>
      <section className="snap-start min-h-screen">
        <Hero />
      </section>
      <section className="snap-start min-h-screen">
        <About />
      </section>
      <section className="snap-start min-h-screen">
        <Skills />
      </section>
      <section className="snap-start min-h-screen">
        <Experience />
      </section>
      <section className="snap-start min-h-screen">
        <Projects />
      </section>
      <section className="snap-start min-h-screen">
        <Services />
      </section>
      <section className="snap-start min-h-screen">
        <Contact />
      </section>
    </DriveContainer>
  );
}
