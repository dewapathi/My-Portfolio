"use client";

import { useEffect, useState } from "react";
import CosmicScene from "./CosmicScene";
import { detectDeviceTier, type DeviceTier } from "@/lib/device-tier";

/**
 * Decides the WebGL quality tier once, before ever mounting a Canvas.
 * "lightweight" (coarse pointer, small viewport, or reduced-motion) never
 * loads Three.js at all — it gets a static/CSS constellation instead.
 */
export default function CosmicGate() {
  const [tier, setTier] = useState<DeviceTier | null>(null);

  useEffect(() => {
    setTier(detectDeviceTier());
  }, []);

  if (tier === null) return null;

  if (tier === "lightweight") {
    return (
      <div
        className="absolute inset-0 cosmic-fallback pointer-events-none"
        aria-hidden="true"
      />
    );
  }

  return <CosmicScene tier={tier} />;
}
