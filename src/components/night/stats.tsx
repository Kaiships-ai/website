import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { studio } = siteConfig;

/* 2 · Real numbers, no others. Sources under the row. */
export function Stats() {
  return (
    <div className={s.wrap}>
      <ul className={s.stats} aria-label="My numbers">
        {studio.stats.map((x) => (
          <li key={x.l}>
            <b>{x.n}</b>
            <span>{x.l}</span>
          </li>
        ))}
      </ul>
      <p className={s.src}>{studio.statsSource}</p>
    </div>
  );
}
