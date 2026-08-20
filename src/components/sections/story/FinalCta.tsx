import { d } from "./shared";
import styles from "./story.module.css";

/* ============ FINAL CINEMATIC ============ */
export function FinalCta() {
  return (
    <section className={styles.finalSection}>
      <p className={`${styles.finalCaption} reveal`}>
        [ a quiet home at night · Aria returns to its charging station · lights
        dim ]
      </p>
      <h2 className={`${styles.finalDim} reveal`} style={d(0.05)}>
        The future isn&rsquo;t coming.
      </h2>
      <h2 className={`${styles.finalBright} revealMid`} style={d(0.1)}>
        It&rsquo;s already here.
      </h2>
      <div className={`${styles.finalCtas} revealLate`}>
        <a href="#waitlist" className={styles.finalPrimary}>
          Meet Your Future Assistant →
        </a>
        <a href="#waitlist" className={styles.finalSecondary}>
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}
