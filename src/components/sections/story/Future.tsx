import styles from "./story.module.css";

/* ============ THE FUTURE ============ */
export function Future() {
  return (
    <section className={styles.futureSection}>
      <h2 className={`${styles.futureLine} ${styles.futureLine1} reveal`}>
        Today, it helps.
      </h2>
      <h2 className={`${styles.futureLine} ${styles.futureLine2} revealMid`}>
        Tomorrow, it learns.
      </h2>
      <h2 className={`${styles.futureLine} ${styles.futureLine3} revealLate`}>
        Eventually, it becomes part of how we live.
      </h2>
    </section>
  );
}
