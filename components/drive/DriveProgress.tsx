"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DRIVE_SECTION_IDS } from "./driveConfig";
import { useDriveMode } from "./DriveModeProvider";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DriveProgress() {
  const { enabled } = useDriveMode();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const el = document.getElementById("drive-container");
      if (!el) return;
      const h = el.clientHeight || 1;
      const idx = Math.round(el.scrollTop / h);
      setActiveIndex(clamp(idx, 0, DRIVE_SECTION_IDS.length - 1));
    };

    const el = document.getElementById("drive-container");
    el?.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el?.removeEventListener("scroll", onScroll as any);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[55] hidden md:flex flex-col items-center gap-3">
      {DRIVE_SECTION_IDS.map((id, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={id}
            type="button"
            className="relative w-4 h-4"
            aria-label={`Go to ${id}`}
            onClick={() => {
              const el = document.getElementById("drive-container");
              if (!el) return;
              const h = el.clientHeight || 1;
              el.scrollTo({ top: i * h, behavior: "smooth" });
            }}
          >
            <span
              className={`absolute inset-0 rounded-full transition-colors ${
                isActive ? "bg-primary-500" : "bg-gray-400/40 dark:bg-gray-600/50"
              }`}
            />
            {isActive && (
              <motion.span
                layoutId="driveDot"
                className="absolute -inset-1 rounded-full border border-primary-400/70"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

