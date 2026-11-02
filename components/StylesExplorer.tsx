"use client";

import { useState } from "react";
import Link from "next/link";
import { styles } from "@/lib/data";
import { ArrowUpRight, Plus } from "./Icons";

export default function StylesExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className="styles__body">
      <div className="styles__media" data-img-reveal>
        {styles.map((s, i) => (
          <img key={s.name} src={s.image} alt={`${s.name} interior`} className={i === active ? "is-active" : ""} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </div>
      <div className="styles__list" data-reveal>
        {styles.map((s, i) => {
          const open = i === active;
          return (
            <div key={s.name} className={`style-item${open ? " is-open" : ""}`}>
              <button className="style-item__head" onClick={() => setActive(i)} aria-expanded={open} aria-controls={`style-${i}`}>
                <span className="style-item__name">
                  <span className="style-item__idx">{s.index}</span>
                  <span className="h3">{s.name}</span>
                </span>
                <Plus className="style-item__icon" />
              </button>
              <div className="style-item__panel" id={`style-${i}`} role="region">
                <div>
                  <div className="style-item__content">
                    <p className="body">{s.description}</p>
                    <div className="tags">{s.materials.map((m) => <span key={m} className="tag">{m}</span>)}</div>
                    <Link href="/work" className="text-link">See {s.count} {s.short} projects <ArrowUpRight className="" /></Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
