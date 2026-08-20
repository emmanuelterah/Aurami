"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { applications } from "@/lib/content";
import styles from "./Applications.module.css";

const HOVER_SCROLL_SPEED = 4.5; // px per frame

export default function Applications() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startHoverScroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el || rafRef.current !== null) return;
    // let the row glide freely while hovering
    el.style.scrollSnapType = "none";
    const step = () => {
      el.scrollLeft += dir * HOVER_SCROLL_SPEED;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const stopHoverScroll = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = trackRef.current;
    if (el) el.style.scrollSnapType = "";
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + 18 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="applications" className={styles.section}>
      <div className={styles.head}>
        <h2 className={`${styles.h2} reveal`}>
          One robot. Thousands of possibilities.
        </h2>
      </div>
      <div className={styles.slider}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label="Scroll cards left"
          onMouseEnter={() => startHoverScroll(-1)}
          onMouseLeave={stopHoverScroll}
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
        >
          <span className={styles.arrowGlyph}>←</span>
        </button>
        <div className={styles.track} ref={trackRef}>
          {applications.map((a) => (
            <article key={a.tag} className={styles.card}>
              {a.image ? (
                <>
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 720px) 66vw, 400px"
                    className={styles.cardImage}
                  />
                  <div className={styles.cardScrim} />
                </>
              ) : (
                <>
                  <div className={styles.cardStripes} />
                  <div className={styles.cardGlow} />
                </>
              )}
              <div className={styles.cardBody}>
                <div className={styles.tag}>{a.tag}</div>
                <h3 className={styles.cardTitle}>{a.title}</h3>
                <p className={styles.cardDesc}>{a.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label="Scroll cards right"
          onMouseEnter={() => startHoverScroll(1)}
          onMouseLeave={stopHoverScroll}
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
        >
          <span className={styles.arrowGlyph}>→</span>
        </button>
      </div>
    </section>
  );
}
