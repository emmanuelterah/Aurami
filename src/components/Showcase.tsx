"use client";

import { useState } from "react";
import { capabilities } from "@/lib/content";
import styles from "./Showcase.module.css";

export default function Showcase() {
  const [active, setActive] = useState("vision");
  const current =
    capabilities.find((c) => c.id === active) ?? capabilities[0];

  return (
    <section id="showcase" className={styles.section}>
      <div className={styles.head}>
        <p className="kicker reveal" style={{ marginBottom: 20 }}>
          THE ROBOT
        </p>
        <h2 className={`${styles.h2} reveal`}>One machine. Every capability.</h2>
      </div>
      <div className={styles.grid}>
        <div className={styles.stage}>
          <div className="stripes" />
          <div className={styles.stageLabel}>
            <span className="placeholderLabel">
              [ full-body render ]
              <br />
              Aria · front view · click a point
            </span>
          </div>
          {capabilities.map((c) => (
            <button
              key={c.id}
              title={c.title}
              aria-label={c.title}
              aria-pressed={c.id === active}
              className={`${styles.hotspot} ${c.id === active ? styles.hotspotActive : ""}`}
              style={{ left: c.x, top: c.y }}
              onClick={() => setActive(c.id)}
            />
          ))}
        </div>
        <div>
          <div className={styles.badge}>CAPABILITY</div>
          <h3 className={styles.capTitle}>{current.title}</h3>
          <p className={styles.capDesc}>{current.desc}</p>
          <div className={styles.legend}>
            {capabilities.map((c) => (
              <button
                key={c.id}
                className={`${styles.legendBtn} ${c.id === active ? styles.legendBtnActive : ""}`}
                onClick={() => setActive(c.id)}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
