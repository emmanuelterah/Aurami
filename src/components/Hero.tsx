import Hero3D from "./Hero3D";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} data-anim />
      <div className={styles.copy}>
        <div className={`${styles.badge} enterUp`}>
          <span className={styles.badgeDot} />
          INTRODUCING ARIA
        </div>
        <h1
          className={`${styles.title} enterUp`}
          style={{ "--d": "0.08s" } as React.CSSProperties}
        >
          Meet the Machine
          <br />
          That Lives
          <br />
          With You.
        </h1>
        <p
          className={`${styles.sub} enterUp`}
          style={{ "--d": "0.16s" } as React.CSSProperties}
        >
          Humanoid intelligence designed to move through the world with you.
        </p>
        <div
          className={`${styles.ctas} enterUp`}
          style={{ "--d": "0.24s" } as React.CSSProperties}
        >
          <a href="#showcase" data-magnet className={styles.primary}>
            Meet the Robot <span>→</span>
          </a>
          <a href="#awareness" className={styles.secondary}>
            See What It Can Do
          </a>
        </div>
      </div>

      <div
        className={`${styles.stage} enterFade`}
        style={{ "--d": "0.1s" } as React.CSSProperties}
      >
        <div className={styles.stageGlow} />
        <div className="stripes" />
        <div className={styles.sweep} data-anim />
        <Hero3D />
        <div className={styles.stageCaption}>
          ARIA · V1 <span className={styles.stageCaptionDot} /> IDLE
        </div>
      </div>

      <div className={styles.scrollHint} data-anim>
        SCROLL TO BEGIN
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
