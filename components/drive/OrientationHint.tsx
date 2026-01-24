"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDriveMode } from "./DriveModeProvider";

export default function OrientationHint() {
  const { enabled } = useDriveMode();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setShow(false);
      return;
    }

    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // show hint only for very short landscape screens
      setShow(w > h && h < 520);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [enabled]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div className="max-w-md text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-3">
              Tip
            </p>
            <h3 className="text-2xl font-bold mb-3">Rotate your device</h3>
            <p className="text-white/80">
              Drive Mode looks best in portrait orientation.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

