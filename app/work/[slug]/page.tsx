import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug, spaceBySlug } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  return p ? { title: p.name, description: p.summary, openGraph: { images: [p.cover] } } : {};
}

export default async function ProjectPage({ params }: Props) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const space = spaceBySlug(p.space);

  return (
    <>
      <section className="page-head">
        <div className="inner">
          <Link href="/work" className="back label" data-reveal="load"><ArrowLeft /> All projects</Link>
          <p className="label" data-reveal="load"><span className="clay">{p.number}</span>&nbsp;&nbsp; <Link href={`/spaces/${p.space}`}>{space?.name}</Link></p>
          <h1 className="display" data-split="load" style={{ marginTop: 28 }}>{p.name}</h1>
          <div className="page-head__row">
            <p className="body-l" style={{ maxWidth: 520 }} data-reveal="load" data-delay="0.25">{p.summary}</p>
            <dl className="meta" data-reveal="load" data-delay="0.35">
              {[["Location", p.location], ["Style", p.style], ["Area", p.area], ["Year", p.year]].map(([k, v]) => (
                <div key={k}><dt className="label">{k}</dt><dd className="ui" style={{ margin: 0 }}>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="cover">
        <div className="inner cover__frame" data-img-reveal="load">
          <img src={p.cover} alt={`${p.name} interior`} data-parallax="0.16" fetchPriority="high" />
        </div>
      </div>

      <section className="section">
        <div className="inner story">
          <div className="story__label">
            <p className="label">— The story</p>
            <span className="h4">{p.duration}</span>
            <p className="body">From first sketch to handover</p>
          </div>
          <div className="story__body">
            {p.story.map((para, i) => <p key={i} data-split="scroll">{para}</p>)}
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="inner next-project">
          <Link href={`/work/${next.slug}`} className="next-project__link" data-cursor="view">
            <span className="label">Next project — {next.number}</span>
            <span className="display" data-split="scroll">{next.name}</span>
          </Link>
          <a href="mailto:hello@shizustudio.co?subject=New%20project%20enquiry" className="btn btn--dark" data-magnetic>Book a consultation <ArrowRight /></a>
        </div>
      </section>
    </>
  );
}
