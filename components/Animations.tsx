"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, reducedMotion } from "@/lib/gsap";

/**
 * Declarative motion layer. Elements opt in with data attributes:
 *  data-split="load|scroll"  masked line-by-line heading reveal
 *  data-reveal               fade + rise on scroll (data-delay="0.1")
 *  data-img-reveal           clip-path wipe with inner image settle
 *  data-parallax="0.12"      image drifts against scroll inside its frame
 *  data-count                number counts up when in view
 *  data-magnetic             element follows the pointer slightly
 */
export default function Animations() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (reducedMotion()) return;

    let cleanupMagnets: (() => void)[] = [];
    let ctx: gsap.Context | null = null;

    const start = () => {
      ctx = gsap.context(() => {
        // Split headings
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const onLoad = el.dataset.split === "load";
          const delay = parseFloat(el.dataset.delay || "0");
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line-inner",
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 115,
                rotate: 2,
                duration: 1.4,
                stagger: 0.09,
                delay: onLoad ? 0.15 + delay : delay,
                ease: "expo.out",
                scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        // Fade / rise
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const delay = parseFloat(el.dataset.delay || "0");
          const onLoad = el.dataset.reveal === "load";
          gsap.fromTo(el, { autoAlpha: 0, y: 40 }, {
            autoAlpha: 1, y: 0, duration: 1.3, delay: onLoad ? 0.4 + delay : delay,
            scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 90%", once: true },
          });
        });

        // Image wipes
        gsap.utils.toArray<HTMLElement>("[data-img-reveal]").forEach((el) => {
          const img = el.querySelector("img");
          const onLoad = el.dataset.imgReveal === "load";
          const tl = gsap.timeline({
            delay: onLoad ? 0.35 : 0,
            scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 85%", once: true },
          });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
          if (img) tl.from(img, { scale: 1.25, duration: 2.2, ease: "expo.out" }, 0.2);
        });

        // Parallax
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
          const amt = parseFloat(img.dataset.parallax || "0.1") * 100;
          gsap.fromTo(img, { yPercent: -amt / 2 }, {
            yPercent: amt / 2, ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        // Counters
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const raw = el.textContent || "";
          const num = parseFloat(raw.replace(/[^\d.]/g, ""));
          const suffix = raw.replace(/[\d.]/g, "");
          if (Number.isNaN(num)) return;
          const o = { v: 0 };
          gsap.to(o, {
            v: num, duration: 2.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => { el.textContent = Math.round(o.v) + suffix; },
          });
        });
      });

      // Magnetic buttons (desktop pointers only)
      if (window.matchMedia("(hover: hover)").matches) {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanupMagnets.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // On first load wait for the preloader; on later navigations start right away.
    let waiting = false;
    if (window.__introDone) start();
    else { waiting = true; window.addEventListener("shizu:intro", start, { once: true }); }

    return () => {
      if (waiting) window.removeEventListener("shizu:intro", start);
      ctx?.revert();
      cleanupMagnets.forEach((f) => f());
      cleanupMagnets = [];
    };
  }, [pathname]);

  return null;
}
