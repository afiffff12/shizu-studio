import Link from "next/link";
import { spaces } from "@/lib/data";

export default function SpaceChips({ active }: { active: string | null }) {
  return (
    <nav className="chips" aria-label="Filter by space" data-reveal="load" data-delay="0.3">
      <Link href="/work" className={`chip${active === null ? " is-active" : ""}`} aria-current={active === null ? "page" : undefined}>All spaces</Link>
      {spaces.map((s) => (
        <Link key={s.slug} href={`/spaces/${s.slug}`} className={`chip${active === s.slug ? " is-active" : ""}`} aria-current={active === s.slug ? "page" : undefined}>{s.name}</Link>
      ))}
    </nav>
  );
}
