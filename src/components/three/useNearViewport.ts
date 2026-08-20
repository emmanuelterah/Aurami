import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element has come within `rootMargin` of the viewport.
 * Used to defer WebGL setup and model downloads for below-the-fold
 * sections until the user actually scrolls toward them.
 */
export function useNearViewport<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "600px",
) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near, rootMargin]);
  return near;
}
