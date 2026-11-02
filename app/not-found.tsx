import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: "70vh" }}>
      <div className="inner" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <span className="jp" style={{ fontSize: 64 }}>空</span>
        <h1 className="display">This room is empty.</h1>
        <p className="body-l">The page you are looking for has moved or never existed.</p>
        <Link href="/" className="btn btn--dark" style={{ alignSelf: "flex-start" }}>Back to home <ArrowRight /></Link>
      </div>
    </section>
  );
}
