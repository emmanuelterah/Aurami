import {
  awarenessTags,
  learnedHabits,
  lifeScenes,
  peopleScenes,
  safetyFeatures,
} from "@/lib/content";
import styles from "./Sections.module.css";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/* ============ CHAPTER 01 ============ */
export function Intro() {
  return (
    <section className={styles.sectionTall}>
      <p className="kicker reveal" style={{ marginBottom: 40 }}>
        CHAPTER 01 — A DIFFERENT KIND OF INTELLIGENCE
      </p>
      <h2 className={`${styles.introDim} reveal`}>
        We taught machines to think.
      </h2>
      <h2 className={`${styles.introBright} revealMid`} style={d(0.1)}>
        Now we&rsquo;re teaching them to help.
      </h2>
      <p className={`${styles.introLead} revealLate`}>
        Humanoid robotics brings intelligence out of the screen and into the
        physical world.
      </p>
    </section>
  );
}

/* ============ CHAPTER 02 — AWARENESS ============ */
export function Awareness() {
  return (
    <section
      id="awareness"
      className={styles.section}
      style={{ scrollMarginTop: 80, padding: "clamp(80px,10vh,140px) var(--pad-x)" }}
    >
      <div className={styles.awarenessGrid}>
        <div className={`${styles.awarenessScene} revealFade`}>
          <div className="stripes" />
          <div className={styles.calloutAccent}>
            ◎ person · carrying groceries
          </div>
          <div className={styles.calloutNeutral}>bag · graspable · 2.1kg</div>
          <div className={styles.sceneCenterLabel}>
            <span className="placeholderLabel">
              [ scene render ]
              <br />
              Aria noticing a person enter a room
            </span>
          </div>
        </div>
        <div>
          <p className="kicker reveal">CHAPTER 02 — IT UNDERSTANDS THE WORLD</p>
          <h2 className={`${styles.awarenessH2} reveal`} style={d(0.06)}>
            Not just intelligent. Aware.
          </h2>
          <p
            className={`${styles.lead} ${styles.awarenessLead} revealMid`}
            style={d(0.12)}
          >
            A small moment from everyday life: someone walks in carrying
            groceries. Aria notices, approaches, takes a bag, and carries it to
            the kitchen — because it understood what was happening.
          </p>
          <div className={styles.tagRow}>
            {awarenessTags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CHAPTER 03 — DESIGNED FOR LIFE ============ */
export function DesignedForLife() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.centerHead}>
          <p className="kicker reveal">CHAPTER 03 — DESIGNED FOR LIFE</p>
          <h2 className={`${styles.h2} reveal`} style={d(0.06)}>
            Technology should fit into your life.
          </h2>
          <p className={`${styles.italicSub} revealMid`} style={d(0.12)}>
            Not the other way around.
          </p>
        </div>
        <div className={styles.lifeGrid}>
          {lifeScenes.map((s, i) => (
            <div
              key={s.title}
              className={`${styles.lifeCard} ${s.wide ? styles.lifeCardWide : ""} revealSoon`}
              style={d(i * 0.06)}
            >
              <div className="stripes" />
              <div className={styles.lifeCardLabel}>
                <div
                  className={styles.lifeCardTitle}
                  style={{ fontSize: s.wide ? 19 : 17 }}
                >
                  {s.title}
                </div>
                <div className={styles.lifeCardCaption}>{s.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <h2 className={`${styles.noScreenH2} revealLate`}>
        The next interface is physical.
      </h2>
    </section>
  );
}

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
            <div key={p} className={`${styles.peopleCard} revealSoon`} style={d(i * 0.06)}>
              <div className="stripes" />
              <div className={styles.peopleCardLabel}>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ IT LEARNS YOU ============ */
export function Learning() {
  return (
    <section className={styles.section}>
      <div className={styles.learnInner}>
        <h2 className={`${styles.learnH2} reveal`}>It learns how you live.</h2>
        <div className={styles.learnGrid}>
          {learnedHabits.map((h, i) => (
            <div key={h} className={`${styles.learnCard} revealSoon`} style={d(i * 0.05)}>
              {h}
            </div>
          ))}
        </div>
        <div className={`${styles.privacyPill} revealMid`}>
          <span className={styles.privacyDot} />
          Personal intelligence. Private by design.
        </div>
      </div>
    </section>
  );
}

/* ============ SAFETY ============ */
export function Safety() {
  return (
    <section className={styles.section}>
      <div className={styles.safetyInner}>
        <h2 className={`${styles.safetyH2} reveal`}>
          Powerful enough to help.
          <br />
          Safe enough to live with.
        </h2>
        <p className={`${styles.lead} ${styles.safetyLead} revealMid`} style={d(0.1)}>
          When a person steps into its path, Aria slows and yields. Trust is
          engineered into every movement.
        </p>
        <div className={styles.safetyGrid}>
          {safetyFeatures.map((f, i) => (
            <div key={f} className={`${styles.safetyCard} revealSoon`} style={d(i * 0.04)}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

/* ============ FINAL CINEMATIC ============ */
export function FinalCta() {
  return (
    <section className={styles.finalSection}>
      <p className={`${styles.finalCaption} reveal`}>
        [ a quiet home at night · Aria returns to its charging station · lights
        dim ]
      </p>
      <h2 className={`${styles.finalDim} reveal`} style={d(0.05)}>
        The future isn&rsquo;t coming.
      </h2>
      <h2 className={`${styles.finalBright} revealMid`} style={d(0.1)}>
        It&rsquo;s already here.
      </h2>
      <div className={`${styles.finalCtas} revealLate`}>
        <a href="#waitlist" data-magnet className={styles.finalPrimary}>
          Meet Your Future Assistant →
        </a>
        <a href="#waitlist" className={styles.finalSecondary}>
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}
