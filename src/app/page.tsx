import Applications from "@/components/sections/Applications";
import Engineering from "@/components/sections/Engineering";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Nav from "@/components/layout/Nav";
import Showcase from "@/components/sections/Showcase";
import Waitlist from "@/components/sections/Waitlist";
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
} from "@/components/sections/story";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>

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
