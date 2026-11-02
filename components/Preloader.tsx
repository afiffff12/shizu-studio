"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

/** Short intro on the first visit of a session, then signals the motion layer. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      window.__introDone = true;
      window.dispatchEvent(new Event("shizu:intro"));
      setDone(true);
    };
    let seen = false;
    try { seen = sessionStorage.getItem("shizu:intro") === "1"; sessionStorage.setItem("shizu:intro", "1"); } catch {}
    if (seen || reducedMotion() || !ref.current) { finish(); return; }

    window.__lenis?.stop();
    const el = ref.current;
    const tl = gsap.timeline({ onComplete: () => { window.__lenis?.start(); finish(); } });
    tl.from(el.querySelector(".preloader__kanji"), { yPercent: 40, autoAlpha: 0, duration: 1.1 })
      .from(el.querySelector(".preloader__word"), { yPercent: 60, autoAlpha: 0, duration: 1 }, "-=0.7")
      .to(el.querySelector(".preloader__bar i"), { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "-=0.6")
      .to(el.querySelectorAll(".preloader__kanji, .preloader__word, .preloader__bar"), { autoAlpha: 0, y: -20, duration: 0.6, stagger: 0.05, ease: "power2.in" })
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.1")
      .add(() => { window.__introDone = true; window.dispatchEvent(new Event("shizu:intro")); }, "-=0.75");
    return () => { tl.kill(); };
  }, []);

  if (done) return null;
  return (
    <div className="preloader" ref={ref} aria-hidden="true" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      <div className="preloader__kanji">静</div>
      <div className="preloader__word">shizu</div>
      <div className="preloader__bar"><i /></div>
    </div>
  );
}
