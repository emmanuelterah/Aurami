import { awarenessTags } from "@/lib/content";
import { d } from "./shared";
import styles from "./story.module.css";

/* ============ CHAPTER 02 — AWARENESS ============ */
export function Awareness() {
  return (
    <section
      id="awareness"
      className={styles.section}
      style={{ scrollMarginTop: 80, padding: "clamp(80px,10vh,140px) var(--pad-x)" }}
    >
      <div className={styles.awarenessGrid}>
        <div className={`${styles.awarenessScene} revealFade`}>
          <video
            className={styles.awarenessVideo}
            src="/video/aria-groceries.mp4"
            poster="/video/aria-groceries-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Aria approaches a person carrying groceries, takes a bag, and carries it to the kitchen"
          />
        </div>
        <div>
          <p className="kicker reveal">CHAPTER 02 — IT UNDERSTANDS THE WORLD</p>
          <h2 className={`${styles.awarenessH2} reveal`} style={d(0.06)}>
            Not just intelligent. Aware.
          </h2>
          <p
            className={`${styles.lead} ${styles.awarenessLead} revealMid`}
            style={d(0.12)}
          >
            A small moment from everyday life: someone walks in carrying
            groceries. Aria notices, approaches, takes a bag, and carries it to
            the kitchen — because it understood what was happening.
          </p>
          <div className={styles.tagRow}>
            {awarenessTags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
