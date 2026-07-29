"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/motion/Preloader";
import MagneticCursor from "@/components/motion/MagneticCursor";
import GrainOverlay from "@/components/motion/GrainOverlay";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";

/**
 * `/lab/*` routes (e.g. the Living System proof of concept) own their own
 * full-bleed presentation, entry sequence, and skip-to-content link — the
 * main site's Header/Footer/Preloader/GrainOverlay/MagneticCursor must not
 * render on top of them. Lenis (SmoothScrollProvider) stays active
 * everywhere: lab routes' GSAP ScrollTrigger camera rigs already read
 * scroll position through the same Lenis↔ScrollTrigger sync, so it helps
 * rather than conflicts.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLab = pathname?.startsWith("/lab") ?? false;

  return (
    <SmoothScrollProvider>
      {!isLab && (
        <>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Preloader />
          <GrainOverlay />
          <MagneticCursor />
          <Header />
        </>
      )}
      <main id={isLab ? undefined : "main-content"}>{children}</main>
      {!isLab && <Footer />}
    </SmoothScrollProvider>
  );
}
