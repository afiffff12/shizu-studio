"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Soft dot cursor; grows into a "View" disc over [data-cursor="view"] items. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (min-width: 1200px)").matches || !ref.current) return;
    const el = ref.current;
    gsap.set(el, { autoAlpha: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      gsap.to(el, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX); yTo(e.clientY);
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view']");
      const link = !view && t.closest("a, button");
      el.classList.toggle("is-view", !!view);
      el.classList.toggle("is-link", !!link);
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, []);
  return <div className="cursor" ref={ref} aria-hidden="true"><span>View</span></div>;
}
