import { TerminalShell } from "@/components/terminal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-lg text-center">
        <TerminalShell title="kaiships — zsh">
          <div className="text-left">
            <div className="text-terminal-fg">
              <span className="mr-2 text-accent">$</span>
              open {"<this page>"}
            </div>
            <div className="mt-1 text-[#ff5f57]">
              zsh: 404 — command not found
            </div>
            <div className="mt-1 text-terminal-muted">
              hint: the page moved, or it never shipped
            </div>
            <div className="mt-3 text-terminal-fg">
              <span className="mr-2 text-accent">$</span>
              <span className="cursor-blink ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-amber" />
            </div>
          </div>
        </TerminalShell>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" variant="accent">
            cd ~
          </Button>
          <Button href="/resources" variant="ghost">
            ls /resources
          </Button>
        </div>
      </div>
    </div>
  );
}
