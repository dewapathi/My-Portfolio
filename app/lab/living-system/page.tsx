import type { Metadata } from "next";
import LivingSystemExperience from "@/components/living-system/LivingSystemExperience";

// Lab route — not linked from primary navigation, not indexed. This is a
// proof of concept (see EXPERIENCE_BIBLE.md / STORYBOARD.md / ARCHITECTURE.md
// at the repo root), reviewed in isolation before it replaces the live site.
export const metadata: Metadata = {
  title: "The Living System — Proof of Concept",
  robots: { index: false, follow: false },
};

export default function LivingSystemLabPage() {
  return <LivingSystemExperience />;
}
