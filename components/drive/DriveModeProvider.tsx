"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type DriveModeContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
};

const DriveModeContext = createContext<DriveModeContextValue | null>(null);

export function useDriveMode() {
  const ctx = useContext(DriveModeContext);
  if (!ctx) throw new Error("useDriveMode must be used within DriveModeProvider");
  return ctx;
}

export default function DriveModeProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("driveMode");
    if (stored === "1") setEnabled(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("driveMode", enabled ? "1" : "0");
    document.documentElement.classList.toggle("drive-mode", enabled);
  }, [enabled]);

  const value = useMemo<DriveModeContextValue>(
    () => ({
      enabled,
      setEnabled,
      toggle: () => setEnabled((v) => !v),
    }),
    [enabled]
  );

  return <DriveModeContext.Provider value={value}>{children}</DriveModeContext.Provider>;
}

