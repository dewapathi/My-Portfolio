"use client";

import { useEffect, useRef } from "react";
import { useDriveMode } from "./DriveModeProvider";
import { DRIVE_SECTION_IDS } from "./driveConfig";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DriveContainer({ children }: { children: React.ReactNode }) {
  const { enabled } = useDriveMode();
  const ref = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const moveTo = (nextIndex: number) => {
      const h = el.clientHeight || 1;
      el.scrollTo({ top: nextIndex * h, behavior: "smooth" });
      lockRef.current = true;
      window.setTimeout(() => (lockRef.current = false), 650);
    };

    const onWheel = (e: WheelEvent) => {
      if (!enabled) return;
      if (!ref.current) return;
      // prevent "free scroll"
      e.preventDefault();
      if (lockRef.current) return;

      const delta = e.deltaY;
      const h = el.clientHeight || 1;
      const idx = Math.round(el.scrollTop / h);
      const next = clamp(idx + (delta > 0 ? 1 : -1), 0, DRIVE_SECTION_IDS.length - 1);
      if (next !== idx) moveTo(next);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!enabled) return;
      if (lockRef.current) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "PageDown" && e.key !== "PageUp") return;
      e.preventDefault();

      const h = el.clientHeight || 1;
      const idx = Math.round(el.scrollTop / h);
      const dir = e.key === "ArrowDown" || e.key === "PageDown" ? 1 : -1;
      const next = clamp(idx + dir, 0, DRIVE_SECTION_IDS.length - 1);
      if (next !== idx) moveTo(next);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false } as any);

    return () => {
      el.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("keydown", onKeyDown as any);
    };
  }, [enabled]);

  return (
    <div
      id="drive-container"
      ref={ref}
      className={enabled ? "h-screen overflow-y-auto snap-y snap-mandatory" : ""}
    >
      {children}
    </div>
  );
}

