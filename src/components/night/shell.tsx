import { siteConfig } from "@/lib/site.config";
import { NightNav } from "./nav";
import { NightFooter } from "./footer";
import "@/app/night.css";
import s from "./night.module.css";
import p from "./shell.module.css";

const { studio } = siteConfig;

/**
 * The Night frame for pages other than the sales page (Terms, Privacy, the
 * 404): the same nav and footer, no section links, no phone buy bar.
 */
export function NightShell({
  current,
  inPageBuy,
  children,
}: {
  current?: string;
  inPageBuy: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`${s.night} ${p.shell}`} data-night="">
      <div className={s.grain} aria-hidden />
      <NightNav
        name={studio.name}
        cta={studio.cta}
        price={studio.price}
        checkout={studio.checkout}
        variant="page"
        inPageBuy={inPageBuy}
      />
      <main id="main" tabIndex={-1} className={`${s.wrap} ${p.main}`}>
        {children}
      </main>
      <NightFooter current={current} />
    </div>
  );
}
