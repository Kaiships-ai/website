import Link from "next/link";
import { NightShell } from "./shell";
import { TalkingBean } from "./bean";
import { BuyButton } from "./buy-button";
import s from "./night.module.css";
import p from "./shell.module.css";

/** The Night 404. Only app/not-found.tsx loads it, through lost.tsx. */
export default function LostPage() {
  return (
    <NightShell inPageBuy>
      <div className={p.lost}>
        <span className={`${s.bean} ${p.lostBean}`}>
          <TalkingBean
            say={["hi", "I looked. Nothing here."]}
            label="Bean, the Studio mascot. Click to hear from Bean."
            pose="curious"
            poses={["curious"]}
            eager={["curious"]}
          />
        </span>
        <p className={`${s.eyebrow} ${p.lostEyebrow}`}>
          <i aria-hidden />
          404
        </p>
        <h1>This page isn&apos;t here.</h1>
        <p className={p.line}>The link may be old, or the page never shipped.</p>
        <div className={p.acts}>
          <BuyButton spot="404" />
          <Link className={`${s.btn} ${s.ghost}`} href="/">
            Back to Kaiships Studio
          </Link>
        </div>
      </div>
    </NightShell>
  );
}
