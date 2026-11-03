import { siteConfig } from "@/lib/site.config";
import s from "./night.module.css";

const { footer } = siteConfig;

export function NightFooter() {
  return (
    <footer className={s.foot} data-bar-off="">
      <div className={`${s.wrap} ${s.footIn}`}>
        <div>
          <p>© 2026 Kaiships</p>
          <p>{footer.clawd}</p>
        </div>
        <nav aria-label="Footer">
          {footer.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a key={l.href} href={l.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
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
