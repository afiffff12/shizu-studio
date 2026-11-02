"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.2 });
}

export const EASE = "expo.out";

declare global {
  interface Window {
    __lenis?: Lenis;
    __introDone?: boolean;
  }
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll to a hash target through Lenis (falls back to native). */
export function scrollToHash(hash: string, immediate = false) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const offset = -(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 80) + 1;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset, immediate, duration: 1.6 });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}

export { gsap, ScrollTrigger, SplitText };
