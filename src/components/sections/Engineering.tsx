"use client";

import { useState } from "react";
import { engineeringSpecs, layers } from "@/lib/content";
import styles from "./Engineering.module.css";

export default function Engineering() {
  const [active, setActive] = useState("exterior");
  const current = layers.find((l) => l.id === active) ?? layers[0];

  return (
    <section id="engineering" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className="kicker reveal" style={{ marginBottom: 20 }}>
            ENGINEERING
          </p>
          <h2 className={`${styles.h2} reveal`}>
            Underneath the intelligence is engineering.
          </h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.stage}>
            <div className={styles.gridLines} />
            <div className={styles.stageLabel}>
              <span>{current.cap}</span>
            </div>
          </div>
          <div>
            <div className={styles.tabs}>
              {layers.map((l) => (
                <button
                  key={l.id}
                  className={`${styles.tab} ${l.id === active ? styles.tabActive : ""}`}
                  aria-pressed={l.id === active}
                  onClick={() => setActive(l.id)}
                >
                  {l.title}
                </button>
              ))}
            </div>
            <h3 className={styles.layTitle}>{current.title}</h3>
            <p className={styles.layDesc}>{current.desc}</p>
            <div className={styles.specs}>
              {engineeringSpecs.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
