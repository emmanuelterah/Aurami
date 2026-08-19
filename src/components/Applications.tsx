import { applications } from "@/lib/content";
import styles from "./Applications.module.css";

export default function Applications() {
  return (
    <section id="applications" className={styles.section}>
      <div className={styles.head}>
        <h2 className={`${styles.h2} reveal`}>
          One robot. Thousands of possibilities.
        </h2>
        <span className={styles.scrollHint}>scroll →</span>
      </div>
      <div className={styles.track}>
        {applications.map((a) => (
          <article key={a.tag} className={styles.card}>
            <div className={styles.cardStripes} />
            <div className={styles.cardGlow} />
            <div className={styles.cardBody}>
              <div className={styles.tag}>{a.tag}</div>
              <h3 className={styles.cardTitle}>{a.title}</h3>
              <p className={styles.cardDesc}>{a.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
