import Applications from "@/components/Applications";
import Engineering from "@/components/Engineering";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MagnetField from "@/components/MagnetField";
import Nav from "@/components/Nav";
import Showcase from "@/components/Showcase";
import Waitlist from "@/components/Waitlist";
import {
  Awareness,
  DesignedForLife,
  FinalCta,
  Future,
  Intro,
  Learning,
  NoScreen,
  People,
  Safety,
} from "@/components/Story";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <MagnetField />

      {/* film grain + vignette overlays */}
      <div className={styles.grain} aria-hidden data-anim />
      <div className={styles.vignette} aria-hidden />

      <Nav />
      <Hero />
      <Intro />
      <Awareness />
      <DesignedForLife />
      <Showcase />
      <NoScreen />
      <People />
      <Applications />
      <Learning />
      <Engineering />
      <Safety />
      <Future />
      <FinalCta />
      <Waitlist />
      <Footer />
    </main>
  );
}
