import Hero from "@/components/sections/Hero";
import ScrollIntro from "@/components/sections/ScrollIntro";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import AIAutomationLab from "@/components/sections/AIAutomationLab";
import EngineeringDepth from "@/components/sections/EngineeringDepth";
import TechStack from "@/components/sections/TechStack";
import ExperienceOrbit from "@/components/sections/ExperienceOrbit";
import Services from "@/components/sections/Services";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import HowIWork from "@/components/sections/HowIWork";
import ContactFinale from "@/components/sections/ContactFinale";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollIntro />
      <About />
      <Work />
      <AIAutomationLab />
      <EngineeringDepth />
      <TechStack />
      <ExperienceOrbit />
      <Services />
      <ImpactMetrics />
      <HowIWork />
      <ContactFinale />
    </>
  );
}
