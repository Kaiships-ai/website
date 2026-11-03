import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { studio, earlyUsers } = siteConfig;
type User = (typeof earlyUsers)[number];

function Quote({ u, big = false }: { u: User; big?: boolean }) {
  return (
    <figure className={`${s.quote} ${big ? s.quoteBig : ""}`}>
      {u.label ? <em className={s.quoteTag}>{u.label}</em> : null}
      <blockquote>
        <span className={s.hang}>“</span>
        {u.text}”
      </blockquote>
      <figcaption>
        <Image src={`/night-full/users/${u.img}.jpg`} alt="" width={40} height={40} />
        <span className={s.who}>
          <b>{u.name}</b>
          <a href={`https://instagram.com/${u.handle}`} target="_blank" rel="noopener noreferrer">
            @{u.handle}
            <span className={s.srOnly}> on Instagram (opens in a new tab)</span>
          </a>
        </span>
      </figcaption>
    </figure>
  );
}

/*
 * 5 · What people told me. Wording exact, handles real and tappable.
 * The paying buyer leads, big; the rest are about making videos. Every
 * card: its tag on top, the words, the author at the foot.
 */
export function Quotes() {
  const featured = earlyUsers.find((u) => u.handle === studio.users.featured)!;
  const rest = studio.users.show.map((h) => earlyUsers.find((u) => u.handle === h)!);
  return (
    <section className={s.sec} id="users" aria-labelledby="users-title">
      <div className={s.wrap}>
        <span className={`${s.eyebrow} ${s.arrive}`}>
          <i aria-hidden />
          What people told me
        </span>
        <h2 id="users-title" className={`${s.h2} ${s.grad} ${s.arrive}`}>
          {studio.users.title}
        </h2>
        <p className={`${s.lead} ${s.arrive}`}>{studio.users.lead}</p>
        <div className={s.users}>
          <Quote u={featured} big />
          <div className={s.usersRest}>
            {rest.map((u) => (
              <Quote key={u.handle} u={u} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
