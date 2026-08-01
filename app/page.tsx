import LivingSystemExperience from "@/components/living-system/LivingSystemExperience";
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

// Chapter One: System Awakening replaces the conventional hero. Everything
// below it is the existing, still-accurate content — kept reachable as
// plain scrollable sections (and via the entry gate's skip control) so
// nothing is lost while later chapters replace them one at a time.
export default function Home() {
  return (
    <>
      <LivingSystemExperience />
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
