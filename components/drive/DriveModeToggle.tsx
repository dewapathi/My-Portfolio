"use client";

import { motion } from "framer-motion";
import { useDriveMode } from "./DriveModeProvider";
import { Gauge, X } from "lucide-react";

export default function DriveModeToggle() {
  const { enabled, toggle } = useDriveMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-5 right-5 z-[60]"
    >
      <button
        type="button"
        onClick={toggle}
        className="glass-effect rounded-2xl px-4 py-3 shadow-xl border border-white/20 dark:border-gray-800/50 hover:bg-white/90 dark:hover:bg-gray-900/90 transition-colors flex items-center gap-3"
        aria-pressed={enabled}
        aria-label={enabled ? "Back to scroll" : "Tap to lock (Drive mode)"}
      >
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 text-white shadow-lg">
          {enabled ? <X className="w-5 h-5" /> : <Gauge className="w-5 h-5" />}
        </span>
        <div className="text-left leading-tight">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {enabled ? "Back to scroll" : "Tap to lock"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {enabled ? "Drive mode is on" : "Enable snap scroll"}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

