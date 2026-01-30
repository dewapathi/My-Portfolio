"use client";

import { useDriveMode } from "./DriveModeProvider";

export default function DriveAwareSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { enabled } = useDriveMode();

  // In normal mode, allow natural document flow (no forced full-screen sections).
  // In Drive mode, each section becomes a full-screen snap "slide".
  const modeClasses = enabled ? "snap-start min-h-screen" : "";

  // Use a div wrapper to avoid nesting semantic <section> tags (your content components already use <section id="...">).
  return <div className={[modeClasses, className].filter(Boolean).join(" ")}>{children}</div>;
}

