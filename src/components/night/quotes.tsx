import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { studio, earlyUsers } = siteConfig;

/* 5 · What people told me. Wording exact, handles real. */
export function Quotes() {
  return (
    <section className={s.sec} id="users" aria-labelledby="users-title">
      <div className={s.wrap}>
        <div className={s.center}>
          <span className={s.eyebrow}>
            <i aria-hidden />
            What people told me
          </span>
          <h2 id="users-title" className={`${s.h2} ${s.grad}`}>
            {studio.users.title}
          </h2>
          <p className={s.lead}>{studio.users.lead}</p>
        </div>
        <div className={s.users}>
          {earlyUsers.map((u) => (
            <figure key={u.handle} className={s.quote}>
              <blockquote>“{u.text}”</blockquote>
              <figcaption>
                <Image src={`/night-full/users/${u.img}.jpg`} alt="" width={38} height={38} />
                <span className={s.who}>
                  <b>{u.name}</b>
                  <a href={`https://instagram.com/${u.handle}`} target="_blank" rel="noopener noreferrer">
                    @{u.handle}
                    <span className={s.srOnly}> on Instagram (opens in a new tab)</span>
                  </a>
                </span>
                {u.label ? <em>{u.label}</em> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
