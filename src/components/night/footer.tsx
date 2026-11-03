import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { footer, socials } = siteConfig;

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={s.srOnly}> (opens in a new tab)</span>
    </a>
  );
}

/** `current`: the page this footer sits on, marked in its links. */
export function NightFooter({ current }: { current?: string } = {}) {
  return (
    <footer className={s.foot} data-bar-off="">
      <div className={`${s.wrap} ${s.footIn}`}>
        <div>
          <p className={s.footMaker}>
            Made by Kai. Questions? <Out href={socials.instagram}>@kaiships.ai on Instagram</Out> or{" "}
            <Out href={socials.discord}>the Discord</Out>.
          </p>
          <p>© 2026 Kaiships</p>
          <p>{footer.clawd}</p>
        </div>
        <nav aria-label="Footer">
          {footer.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={l.href === current ? "page" : undefined}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
                {external ? " ↗" : ""}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
