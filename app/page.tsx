import Chat from "@/components/Chat";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Wisdomrule Agent</p>
          <h1 className={styles.title}>Bring Wisdomrule guidance into every conversation.</h1>
          <p className={styles.subtitle}>
            Explore our ethos, signature offerings, and engagement pathways through an interactive guide designed for
            teams seeking principled transformation.
          </p>
        </div>
        <div className={styles.card}>
          <Chat />
        </div>
      </section>
      <section className={styles.infoGrid}>
        <article className={styles.pillar}>
          <h2>Codified Wisdom</h2>
          <p>
            The agent distills Wisdomrule principles—integrity, curiosity, and regenerative leadership—into actionable
            insights for your context.
          </p>
        </article>
        <article className={styles.pillar}>
          <h2>Engagement Ready</h2>
          <p>
            Surface offerings from Wisdom Labs to residencies, complete with the rituals, metrics, and stewardship that
            power sustainable change.
          </p>
        </article>
        <article className={styles.pillar}>
          <h2>Community Anchored</h2>
          <p>
            Learn how Wisdomrule invests in communities and co-creates with movement builders, civic innovators, and
            culture-first founders.
          </p>
        </article>
      </section>
      <section className={styles.ctaBlock}>
        <div>
          <h2>Ready to activate Wisdomrule inside your organization?</h2>
          <p>
            Book a constellation session to map intentions, discover partner fit, and choose a pilot pathway tailored to
            your team.
          </p>
        </div>
        <a className={styles.ctaButton} href="mailto:hello@wisdomrule.com">
          Start the Constellation
        </a>
      </section>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Wisdomrule. All rights reserved.</p>
      </footer>
    </main>
  );
}
