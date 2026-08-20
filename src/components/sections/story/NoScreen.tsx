import RobotWalk from "@/components/three/RobotWalk";
import { d } from "./shared";
import styles from "./story.module.css";

/* ============ CHAPTER 04 — NO SCREEN REQUIRED ============ */
export function NoScreen() {
  return (
    <section className={`${styles.sectionTall} ${styles.noScreen}`}>
      <p className="kicker reveal" style={{ marginBottom: 40 }}>
        CHAPTER 04 — NO SCREEN REQUIRED
      </p>
      <div className={styles.dialogue}>
        <p className={`${styles.lineHuman} reveal`}>
          &ldquo;Could you bring me the package from the door?&rdquo;
        </p>
        <p className={`${styles.lineAction} revealMid`}>
          It walks away. The camera follows. It returns.
        </p>
        <p className={`${styles.lineHuman} revealMid`} style={d(0.08)}>
          &ldquo;Thank you.&rdquo;
        </p>
        <p className={`${styles.lineAria} revealLate`}>
          &ldquo;Of course.&rdquo;
        </p>
      </div>
      <RobotWalk variant="strip" />
      <h2 className={`${styles.noScreenH2} revealLate`}>
        The next interface is physical.
      </h2>
    </section>
  );
}
