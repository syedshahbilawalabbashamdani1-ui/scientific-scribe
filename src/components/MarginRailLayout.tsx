import type { ReactNode } from "react";

interface MarginRailLayoutProps {
  title: ReactNode;
  lede?: ReactNode;
  rail: ReactNode;
  children: ReactNode;
}

export function MarginRailLayout({ title, lede, rail, children }: MarginRailLayoutProps) {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <header className="max-w-[68ch]">
          {title}
          {lede ? <div className="mt-4">{lede}</div> : null}
        </header>
        <div className="mt-12 flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <article className="max-w-[68ch] flex-1 text-body leading-relaxed text-muted-foreground">
            {children}
          </article>
          <aside className="w-full shrink-0 lg:w-[28%]">
            <div className="lg:sticky lg:top-24">{rail}</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
