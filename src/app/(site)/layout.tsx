import { siteConfig } from "@/lib/site.config";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExitIntent } from "@/components/exit-intent";
import "../globals.css";

// The old site (/pack, /blog, /resources, /get): paper and terminal, Tailwind.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav checkout={siteConfig.studio.checkout} cta={siteConfig.studio.cta} price={siteConfig.studio.price} />
      <main className="flex-1">{children}</main>
      <Footer footer={siteConfig.footer} />
      <ExitIntent />
    </>
  );
}
