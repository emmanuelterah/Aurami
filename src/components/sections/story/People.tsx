import Image from "next/image";
import { peopleScenes } from "@/lib/content";
import { d } from "./shared";
import styles from "./story.module.css";

/* ============ BUILT AROUND PEOPLE ============ */
export function People() {
  return (
    <section id="people" className={styles.section} style={{ scrollMarginTop: 80 }}>
      <div className={styles.inner}>
        <div className={styles.centerHead} style={{ marginBottom: 52 }}>
          <h2 className={`${styles.peopleH2} reveal`}>Built around people.</h2>
          <p className={`${styles.lead} ${styles.peopleLead} revealMid`} style={d(0.1)}>
            We believe the most meaningful technology doesn&rsquo;t replace
            human connection. It gives people more time for it.
          </p>
        </div>
        <div className={styles.peopleGrid}>
          {peopleScenes.map((p, i) => (
            <div
              key={p.label}
              className={`${styles.peopleCard} revealSoon`}
              style={d(i * 0.06)}
            >
              {p.image ? (
                <>
                  <Image
                    src={p.image}
                    alt={p.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className={styles.peopleCardImage}
                  />
                  <div className={styles.peopleCardScrim} />
                </>
              ) : (
                <div className="stripes" />
              )}
              <div className={styles.peopleCardLabel}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
