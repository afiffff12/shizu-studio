import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectIndex from "@/components/ProjectIndex";
import SpaceChips from "@/components/SpaceChips";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected interior design projects by Shizu: homes, cafés, restaurants and offices across Java and Bali.",
};

export default function WorkPage() {
  return (
    <>
      <section className="page-head">
        <div className="inner">
          <p className="label" data-reveal="load">— Selected work, 2024–2026</p>
          <h1 className="display" data-split="load" style={{ marginTop: 28 }}>Spaces we have <span className="italic clay">shaped.</span></h1>
          <div className="page-head__row">
            <p className="body-l" style={{ maxWidth: 520 }} data-reveal="load" data-delay="0.2">Homes, cafés, restaurants and offices across Java and Bali. Hover a project to preview it, or filter by the kind of space.</p>
            <SpaceChips active={null} />
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="inner"><ProjectIndex items={projects} /></div>
      </section>
    </>
  );
}
