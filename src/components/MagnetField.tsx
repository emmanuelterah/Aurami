"use client";

import { useEffect } from "react";

/**
 * Global magnetic-button effect: any element with [data-magnet]
 * is gently pulled toward the cursor when it comes within range.
 */
export default function MagnetField() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let raf = 0;
    const move = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        document
          .querySelectorAll<HTMLElement>("[data-magnet]")
          .forEach((el) => {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            el.style.transform =
              dist < 160
                ? `translate(${dx * 0.18}px, ${dy * 0.18}px)`
                : "translate(0, 0)";
          });
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
