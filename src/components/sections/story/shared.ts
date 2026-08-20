import type { CSSProperties } from "react";

/** Stagger helper: sets the --d animation-delay custom property. */
export const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
