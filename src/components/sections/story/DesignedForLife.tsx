import { lifeScenes } from "@/lib/content";
import { d } from "./shared";
import styles from "./story.module.css";

/* ============ CHAPTER 03 — DESIGNED FOR LIFE ============ */
export function DesignedForLife() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.centerHead}>
          <p className="kicker reveal">CHAPTER 03 — DESIGNED FOR LIFE</p>
          <h2 className={`${styles.h2} reveal`} style={d(0.06)}>
            Technology should fit into your life.
          </h2>
          <p className={`${styles.italicSub} revealMid`} style={d(0.12)}>
            Not the other way around.
          </p>
        </div>
        <div className={styles.lifeGrid}>
          {lifeScenes.map((s, i) => (
            <div
              key={s.title}
              className={`${styles.lifeCard} ${s.wide ? styles.lifeCardWide : ""} revealSoon`}
              style={d(i * 0.06)}
            >
              <div className="stripes" />
              <div className={styles.lifeCardLabel}>
                <div
                  className={styles.lifeCardTitle}
                  style={{ fontSize: s.wide ? 19 : 17 }}
                >
                  {s.title}
                </div>
                <div className={styles.lifeCardCaption}>{s.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
