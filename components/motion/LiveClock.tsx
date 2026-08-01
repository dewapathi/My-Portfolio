"use client";

import { useEffect, useState } from "react";

/** A real, verifiable detail rather than decoration — the current time in
 *  Colombo, computed client-side, not a static "Available now" claim.
 *  Mounts blank on the server and fills in after hydration to avoid any
 *  timezone/SSR mismatch flash. */
export default function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Colombo",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className={className}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--available)] animate-pulse-slow" />
      Colombo — {time}
    </span>
  );
}
