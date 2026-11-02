import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { spaces, spaceBySlug, projectsInSpace } from "@/lib/data";
import ProjectIndex from "@/components/ProjectIndex";
import SpaceChips from "@/components/SpaceChips";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return spaces.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = spaceBySlug((await params).slug);
  return s ? { title: s.name, description: s.description } : {};
}

export default async function SpacePage({ params }: Props) {
  const space = spaceBySlug((await params).slug);
  if (!space) notFound();
  const items = projectsInSpace(space.slug);
  return (
    <>
      <section className="page-head">
        <div className="inner">
          <p className="label" data-reveal="load"><span className="clay">{space.number}</span>&nbsp;&nbsp; Spaces we design</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginTop: 28 }}>
            <h1 className="display" data-split="load">{space.name}</h1>
            <span className="jp" style={{ fontSize: 28 }} data-reveal="load" data-delay="0.3">{space.jp}</span>
          </div>
          <div className="page-head__row">
            <p className="body-l" style={{ maxWidth: 520 }} data-reveal="load" data-delay="0.2">{space.description}</p>
            <SpaceChips active={space.slug} />
          </div>
        </div>
      </section>
      <div className="cover">
        <div className="inner cover__frame" style={{ height: "min(560px, 60vw)" }} data-img-reveal="load">
          <img src={space.cover} alt={`${space.name} interior`} data-parallax="0.16" />
        </div>
      </div>
      <section className="section">
        <div className="inner">
          <h2 className="h2" data-split="scroll" style={{ marginBottom: 40 }}>Projects in this space</h2>
          <ProjectIndex items={items} />
        </div>
      </section>
    </>
  );
}
