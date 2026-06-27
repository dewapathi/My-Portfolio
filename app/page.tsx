import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TechStack from "@/components/sections/TechStack";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Services from "@/components/sections/Services";
import Proof from "@/components/sections/Proof";
import WorkStyle from "@/components/sections/WorkStyle";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Identity />
      <FeaturedProjects />
      <TechStack />
      <ExperienceTimeline />
      <Services />
      <Proof />
      <WorkStyle />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
