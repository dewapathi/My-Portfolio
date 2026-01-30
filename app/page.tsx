import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import DriveContainer from "@/components/drive/DriveContainer";
import DriveAwareSection from "@/components/drive/DriveAwareSection";

export default function Home() {
  return (
    <DriveContainer>
      <DriveAwareSection>
        <Hero />
      </DriveAwareSection>
      <DriveAwareSection>
        <About />
      </DriveAwareSection>
      <DriveAwareSection>
        <Skills />
      </DriveAwareSection>
      <DriveAwareSection>
        <Experience />
      </DriveAwareSection>
      <DriveAwareSection>
        <Projects />
      </DriveAwareSection>
      <DriveAwareSection>
        <Services />
      </DriveAwareSection>
      <DriveAwareSection>
        <Contact />
      </DriveAwareSection>
    </DriveContainer>
  );
}
