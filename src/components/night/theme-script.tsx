/**
 * Sets <html data-theme> before first paint: the visitor's stored pick
 * (localStorage "ks-theme"), else the system scheme, which it keeps following
 * until the visitor picks. Render it in <head>, with suppressHydrationWarning
 * on <html>.
 */
const code =
  'try{var t=localStorage.getItem("ks-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}' +
  'try{var m=matchMedia("(prefers-color-scheme: light)");m.addEventListener("change",function(){var t=localStorage.getItem("ks-theme");if(t!=="light"&&t!=="dark")document.documentElement.dataset.theme=m.matches?"light":"dark"})}catch(e){}';

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
