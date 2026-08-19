"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import styles from "./Nav.module.css";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      >
        <a href="#top" className={styles.brand}>
          <span className={styles.mark} />
          <span className={styles.wordmark}>AURAMI</span>
        </a>
        <div className={`${styles.links} desktopOnly`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className={styles.actions}>
          <a
            href="#showcase"
            data-magnet
            className={`${styles.cta} desktopOnly`}
          >
            Meet the Robot <span style={{ fontSize: 15 }}>→</span>
          </a>
          <button
            className={`${styles.burger} mobileOnly`}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            ≡
          </button>
        </div>
      </nav>

      {open && (
        <div className={styles.overlay}>
          <button
            className={styles.close}
            aria-label="Close menu"
            onClick={close}
          >
            ×
          </button>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.overlayLink}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
