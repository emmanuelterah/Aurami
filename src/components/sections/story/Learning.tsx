import { learnedHabits } from "@/lib/content";
import { d } from "./shared";
import styles from "./story.module.css";

/* ============ IT LEARNS YOU ============ */
export function Learning() {
  return (
    <section className={styles.section}>
      <div className={styles.learnInner}>
        <h2 className={`${styles.learnH2} reveal`}>It learns how you live.</h2>
        <div className={styles.learnGrid}>
          {learnedHabits.map((h, i) => (
            <div key={h} className={`${styles.learnCard} revealSoon`} style={d(i * 0.05)}>
              {h}
            </div>
          ))}
        </div>
        <div className={`${styles.privacyPill} revealMid`}>
          <span className={styles.privacyDot} />
          Personal intelligence. Private by design.
        </div>
      </div>
    </section>
  );
}
