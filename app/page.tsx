import Link from "next/link";
import { IMG, projects, spaces, projectsInSpace } from "@/lib/data";
import StylesExplorer from "@/components/StylesExplorer";
import ProjectIndex from "@/components/ProjectIndex";
import Testimonials from "@/components/Testimonials";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="inner">
          <div className="hero__top">
            <div className="hero__text">
              <p className="label eyebrow" data-reveal="load">Japanese Interior Design Studio — Semarang</p>
              <h1 className="display" data-split="load">We design comfort <span className="italic clay">you can feel.</span></h1>
            </div>
            <div className="hero__side" data-reveal="load" data-delay="0.4">
              <p className="body-l">Homes, cafés, restaurants and offices shaped around atmosphere, balance and the way a room makes you feel.</p>
              <Link href="/work" className="btn btn--dark" data-magnetic style={{ alignSelf: "flex-start" }}>Explore our work <ArrowRight /></Link>
            </div>
          </div>
          <div className="hero__media" data-img-reveal="load">
            <img src={IMG.hero} alt="Calm living room with paper lantern and walnut sideboard" data-parallax="0.16" fetchPriority="high" />
            <div className="hero__caption">
              <span className="jp">静寂と調和の美</span>
              <span className="body" style={{ fontSize: 13 }}>Beauty of tranquility and harmony — Residence Hartono, Semarang</span>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section" id="philosophy">
        <div className="inner philo">
          <div className="philo__label">
            <p className="label">— Our Philosophy</p>
            <span className="philo__kanji" data-reveal>間</span>
            <p className="body">Ma — the meaningful space between things.</p>
          </div>
          <div className="philo__main">
            <h2 className="statement" data-split="scroll">Comfort begins with atmosphere, balance, and the quiet space a room leaves for you to <span className="italic">simply be.</span></h2>
            <div className="pillars">
              {[["静寂", "Tranquility", "Light, texture and silence before decoration."], ["簡素", "Simplicity", "Only what serves daily life, made beautifully."], ["調和", "Harmony", "Natural materials that age gracefully with you."]].map(([jp, t, d], i) => (
                <div className="pillar" key={t} data-reveal data-delay={String(i * 0.12)}>
                  <span className="jp" style={{ fontSize: 15 }}>{jp}</span>
                  <h3 className="h4">{t}</h3>
                  <p className="body">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPACES */}
      <section className="section bg-paper" id="spaces">
        <div className="inner">
          <div className="head">
            <p className="label">— Spaces we design</p>
            <h2 className="h2" data-split="scroll">Four kinds of space, one feeling.</h2>
          </div>
          <div className="chapters">
            {spaces.map((s, i) => (
              <Link href={`/spaces/${s.slug}`} className="chapter" key={s.slug} data-cursor="view">
                <div className="chapter__media" data-img-reveal>
                  <img src={s.cover} alt={`${s.name} interior by Shizu`} loading="lazy" />
                </div>
                <div className="chapter__meta" data-reveal data-delay={String((i % 2) * 0.12)}>
                  <div className="chapter__left">
                    <span className="chapter__num">{s.number}</span>
                    <div>
                      <div className="chapter__title"><h3 className="h3">{s.name}</h3><span className="jp" style={{ fontSize: 14, color: "var(--sumi-soft)" }}>{s.jp}</span></div>
                      <p className="body">{s.description}</p>
                    </div>
                  </div>
                  <span className="chapter__count">{projectsInSpace(s.slug).length} projects <ArrowUpRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STYLES */}
      <section className="section bg-sand" id="styles">
        <div className="inner">
          <div className="head head--row" style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
              <p className="label">— Shizu Styles</p>
              <h2 className="h2" data-split="scroll">Three styles. One Japanese philosophy.</h2>
            </div>
            <p className="body" style={{ maxWidth: 380 }} data-reveal>Each direction is a different answer to the same question: what does calm look like for the people who live here?</p>
          </div>
          <StylesExplorer />
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="work">
        <div className="inner">
          <div className="head head--row" style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p className="label">— Selected work</p>
              <h2 className="h2" data-split="scroll">Every space tells a different story.</h2>
            </div>
            <Link href="/work" className="btn btn--outline" data-magnetic>View all projects <ArrowRight /></Link>
          </div>
          <ProjectIndex items={projects.slice(0, 6)} />
        </div>
      </section>

      {/* TESTIMONIALS + STATS */}
      <section className="section bg-paper" id="studio">
        <div className="inner voices">
          <Testimonials />
          <div className="stats">
            {[["52", "Completed spaces across Java and Bali"], ["2M+", "People reached through our work"], ["4", "Kinds of space, from homes to offices"]].map(([v, l], i) => (
              <div key={l} data-reveal data-delay={String(i * 0.12)}>
                <div className="stat__value" data-count>{v}</div>
                <p className="body">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <img className="cta__img" src={IMG.cta} alt="" data-parallax="0.18" loading="lazy" />
        <div className="cta__shade" />
        <div className="cta__content">
          <span className="jp" data-reveal>心が整う住まい</span>
          <h2 className="display" data-split="scroll">Inspired by Japan. <span className="italic">Designed for you.</span></h2>
          <p className="body-l" data-reveal>Tell us about your space. We reply within two working days with a first conversation, not a sales pitch.</p>
          <a href="mailto:hello@shizustudio.co?subject=New%20project%20enquiry" className="btn btn--light" data-magnetic style={{ alignSelf: "flex-start" }} data-reveal>Book a consultation <ArrowRight /></a>
        </div>
      </section>
    </>
  );
}
