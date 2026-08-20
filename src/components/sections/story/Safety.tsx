import { safetyFeatures } from "@/lib/content";
import { d } from "./shared";
import styles from "./story.module.css";

/* ============ SAFETY ============ */
export function Safety() {
  return (
    <section className={styles.section}>
      <div className={styles.safetyInner}>
        <h2 className={`${styles.safetyH2} reveal`}>
          Powerful enough to help.
          <br />
          Safe enough to live with.
        </h2>
        <p className={`${styles.lead} ${styles.safetyLead} revealMid`} style={d(0.1)}>
          When a person steps into its path, Aria slows and yields. Trust is
          engineered into every movement.
        </p>
        <div className={styles.safetyGrid}>
          {safetyFeatures.map((f, i) => (
            <div key={f} className={`${styles.safetyCard} revealSoon`} style={d(i * 0.04)}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
