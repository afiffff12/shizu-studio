"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Close, Menu } from "./Icons";

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "Spaces", href: "/#spaces" },
  { label: "Styles", href: "/#styles" },
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Studio", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu.current) return;
    const links = menu.current.querySelectorAll(".menu__link span");
    tl.current = gsap.timeline({ paused: true })
      .to(menu.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
      .from(links, { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "-=0.4")
      .from(menu.current.querySelector(".menu__foot"), { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.6");
    return () => { tl.current?.kill(); };
  }, []);

  useEffect(() => {
    if (open) { tl.current?.play(); window.__lenis?.stop(); }
    else { tl.current?.reverse(); window.__lenis?.start(); }
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/work" ? pathname.startsWith("/work") : false);

  return (
    <>
      <header className={`nav${hidden && !open ? " is-hidden" : ""}`}>
        <Link href="/" className="nav__logo" aria-label="Shizu home"><b>shizu</b><span>静</span></Link>
        <nav className="nav__links" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className={`nav__link${isActive(n.href) ? " is-active" : ""}`}>{n.label}</Link>
          ))}
        </nav>
        <Link href="/#contact" className="btn btn--outline nav__cta" data-magnetic>Book a consultation</Link>
        <button className="nav__menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">Menu <Menu /></button>
      </header>

      <div id="mobile-menu" className={`menu${open ? " is-open" : ""}`} ref={menu} aria-hidden={!open} style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
        <div className="menu__top">
          <Link href="/" className="nav__logo" onClick={() => setOpen(false)}><b>shizu</b><span>静</span></Link>
          <button className="menu__close" onClick={() => setOpen(false)} aria-label="Close menu"><Close /></button>
        </div>
        {NAV.map((n, i) => (
          <Link key={n.label} href={n.href} className="menu__link" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span>{n.label}</span><small>0{i + 1}</small>
          </Link>
        ))}
        <div className="menu__foot">
          <span className="label">Studio</span>
          <a href="mailto:hello@shizustudio.co" className="ui">hello@shizustudio.co</a>
          <span className="body">Jl. Pandanaran 42, Semarang</span>
          <Link href="/#contact" className="btn btn--dark" style={{ marginTop: 16, alignSelf: "flex-start" }} onClick={() => setOpen(false)}>Book a consultation <ArrowRight /></Link>
        </div>
      </div>
    </>
  );
}
