import Link from "next/link";
import { PiCaretRight } from "react-icons/pi";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
        <li>
          <Link
            href="/"
            className="inline-flex items-center py-1.5 transition-colors hover:text-ink"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <PiCaretRight className="h-2.5 w-2.5 opacity-50" aria-hidden="true" />
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex items-center py-1.5 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="inline-flex items-center py-1.5 text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
