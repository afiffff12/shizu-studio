"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { projects as all, spaceBySlug, type Project } from "@/lib/data";

/** Editorial project index with a floating image preview that trails the cursor. */
export default function ProjectIndex({ items = all, showHead = true }: { items?: Project[]; showHead?: boolean }) {
  const preview = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.9, ease: "power3.out" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 32); yTo(e.clientY - 90);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4)); lastX = e.clientX;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const show = (slug: string) => {
    setCurrent(slug);
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
  };
  const hide = () => gsap.to(preview.current, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "power3.out", overwrite: "auto" });

  return (
    <div>
      {showHead && (
        <div className="index__head">
          <span className="label">No.</span><span className="label">Project</span><span className="label">Space</span>
          <span className="label col-style">Style</span><span className="label col-loc">Location</span><span className="label">Year</span>
        </div>
      )}
      <div className="rows" onPointerLeave={hide}>
        {items.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="row" data-reveal data-cursor="view" onPointerEnter={() => show(p.slug)}>
            <span className="row__num">{p.number}</span>
            <span className="row__name">{p.name}</span>
            <span className="row__space">{spaceBySlug(p.space)?.name}</span>
            <span className="row__muted col-style">{p.style}</span>
            <span className="row__muted col-loc">{p.location}</span>
            <span className="row__muted row__year">{p.year}</span>
          </Link>
        ))}
        {items.length === 0 && <p className="h4" style={{ padding: "64px 0" }}>New projects in this space are on the way.</p>}
      </div>
      <div className="preview" ref={preview} aria-hidden="true">
        {items.map((p) => (
          <img key={p.slug} src={p.cover.replace("w=2000", "w=600")} alt="" style={{ opacity: current === p.slug ? 1 : 0, transition: "opacity .45s" }} />
        ))}
      </div>
    </div>
  );
}
