"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { testimonials } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "./Icons";

const DURATION = 7;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const quote = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);
  const t = testimonials[i];
  const go = (dir: number) => setI((v) => (v + dir + testimonials.length) % testimonials.length);

  // Animate the quote in and run the autoplay progress bar.
  useEffect(() => {
    if (quote.current) gsap.fromTo(quote.current.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: "expo.out" });
    timer.current?.kill();
    timer.current = gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: "none", onComplete: () => go(1) });
    return () => { timer.current?.kill(); };
  }, [i]);

  return (
    <div className="voices__main" onPointerEnter={() => timer.current?.pause()} onPointerLeave={() => timer.current?.resume()}>
      <p className="label">— What our clients feel</p>
      <div className="voices__quote" ref={quote} aria-live="polite">
        <p className="quote">“{t.quote}”</p>
      </div>
      <div>
        <div className="progress"><i ref={bar} /></div>
        <div className="voices__foot" style={{ borderTop: 0 }}>
          <div className="client">
            <img src={t.avatar} alt="" />
            <div><b>{t.name}</b><span className="body" style={{ fontSize: 14 }}>{t.project}</span></div>
          </div>
          <div className="pager">
            <span className="pager__count">0{i + 1} / 0{testimonials.length}</span>
            <button className="pager__btn" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowLeft /></button>
            <button className="pager__btn" onClick={() => go(1)} aria-label="Next testimonial" data-magnetic><ArrowRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
