import { d } from "./shared";
import styles from "./story.module.css";

/* ============ CHAPTER 01 ============ */
export function Intro() {
  return (
    <section className={styles.sectionTall}>
      <p className="kicker reveal" style={{ marginBottom: 40 }}>
        CHAPTER 01 — A DIFFERENT KIND OF INTELLIGENCE
      </p>
      <h2 className={`${styles.introDim} reveal`}>
        We taught machines to think.
      </h2>
      <h2 className={`${styles.introBright} revealMid`} style={d(0.1)}>
        Now we&rsquo;re teaching them to help.
      </h2>
      <p className={`${styles.introLead} revealLate`}>
        Humanoid robotics brings intelligence out of the screen and into the
        physical world.
      </p>
    </section>
  );
}
