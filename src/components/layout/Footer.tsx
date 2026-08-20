import Image from "next/image";
import { navLinks } from "@/lib/content";
import styles from "./Footer.module.css";

const exploreLabels: Record<string, string> = {
  "#engineering": "Technology",
  "#showcase": "The Robot",
  "#applications": "Applications",
  "#people": "Company",
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <Image src="/logo/aurami-mark-color.svg" alt="" width={24} height={24} className={styles.mark} />
            <span className={styles.wordmark}>AURAMI</span>
          </div>
          <p className={styles.tagline}>
            Building intelligent machines for a more human future.
          </p>
        </div>
        <div className={styles.col}>
          <span className={styles.colTitle}>EXPLORE</span>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {exploreLabels[l.href] ?? l.label}
            </a>
          ))}
        </div>
        <div className={styles.col}>
          <span className={styles.colTitle}>COMPANY</span>
          <a href="#">Safety</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#waitlist">Waitlist</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 AURAMI Robotics. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">X</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
