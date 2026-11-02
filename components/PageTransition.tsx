"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, scrollToHash, ScrollTrigger } from "@/lib/gsap";

/**
 * Intercepts internal link clicks: a dark curtain rises, the route changes,
 * the page resets to the top (or to its #hash), and the curtain lifts away.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      const samePage = url.pathname === location.pathname;
      if (samePage) {
        if (url.hash) scrollToHash(url.hash);
        else window.__lenis?.scrollTo(0, { duration: 1.4 });
        return;
      }
      if (busy.current) return;
      busy.current = true;
      pendingHash.current = url.hash || null;
      window.__lenis?.stop();
      gsap.timeline()
        .set(curtain.current, { yPercent: 100, visibility: "visible" })
        .to(curtain.current, { yPercent: 0, duration: 0.8, ease: "expo.inOut" })
        .to(curtain.current!.querySelector("span"), { autoAlpha: 1, duration: 0.3 }, "-=0.3")
        .add(() => router.push(url.pathname + url.search));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const lenis = window.__lenis;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    lenis?.start();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (pendingHash.current) { scrollToHash(pendingHash.current, true); pendingHash.current = null; }
    });
    gsap.timeline({ onComplete: () => { busy.current = false; } })
      .to(curtain.current!.querySelector("span"), { autoAlpha: 0, duration: 0.25 })
      .to(curtain.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
      .set(curtain.current, { yPercent: 100, visibility: "hidden" });
  }, [pathname]);

  return (
    <div className="curtain" ref={curtain} aria-hidden="true"><span>静</span></div>
  );
}
