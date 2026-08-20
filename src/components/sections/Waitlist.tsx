"use client";

import { useState } from "react";
import styles from "./Waitlist.module.css";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.card}>
        {submitted ? (
          <div className={styles.success}>
            <div className={styles.check}>✓</div>
            <h3 className={styles.successTitle}>You&rsquo;re on the list.</h3>
            <p className={styles.successSub}>
              We&rsquo;ll reach out when Aria is ready to meet you.
            </p>
          </div>
        ) : (
          <div>
            <h3 className={styles.title}>Join the waitlist.</h3>
            <p className={styles.sub}>
              Be among the first to bring Aria home.
            </p>
            <form onSubmit={submit} className={styles.form}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                aria-label="Email address"
              />
              <button type="submit" className={styles.submit}>
                Request Access
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
