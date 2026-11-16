"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  PiArrowRight,
  PiArrowUpRight,
  PiCaretDown,
  PiEnvelopeSimple,
  PiList,
  PiX,
} from "react-icons/pi";

import { navigation, site } from "@/lib/site";
import { pillars } from "@/lib/services";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const wasMobileOpen = useRef(false);

  const closeMenus = () => {
    setMegaOpen(false);
    setMobileOpen(false);
  };

  const closeMenusOnLink = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a[href]")) closeMenus();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Move focus into the dialog on open, trap Tab inside it, and restore focus
  // to the menu button when the dialog closes.
  useEffect(() => {
    if (mobileOpen) {
      const first = mobilePanelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      window.requestAnimationFrame(() => first?.focus());
    } else if (wasMobileOpen.current) {
      menuButtonRef.current?.focus();
    }
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const panel = mobilePanelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="glass sticky top-0 z-50">
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-baseline text-[17px] font-semibold tracking-[-0.045em] sm:text-[19px]"
        >
          <span className="sr-only">{site.name} home</span>
          <span aria-hidden="true" className="flex items-baseline gap-1">
            Scientific
            <span
              className="inline-block h-[7px] w-[7px] rounded-full bg-accent transition-transform group-hover:scale-125"
              aria-hidden="true"
            />
            Scribe
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-7"
          aria-label="Main navigation"
        >
          {navigation.map((item) =>
            item.mega ? (
              <button
                key={item.href}
                type="button"
                className={`flex items-center gap-1 py-2 text-[13px] transition-colors hover:text-accent-text ${
                  isActive(item.href) ? "text-ink" : "text-quiet"
                }`}
                aria-expanded={megaOpen}
                aria-controls="services-menu"
                onClick={() => setMegaOpen((open) => !open)}
              >
                {item.label}
                <PiCaretDown
                  className={`h-3 w-3 transition-transform ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={`inline-flex items-center py-2 text-[13px] transition-colors hover:text-accent-text ${
                  isActive(item.href) ? "text-ink" : "text-quiet"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn btn-primary btn-sm hidden md:inline-flex"
          >
            Request a scope check
            <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <PiX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <PiList className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {megaOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-x-0 top-[68px] bottom-0 z-40 hidden cursor-default lg:block"
              aria-label="Close services menu"
              tabIndex={-1}
              onClick={() => setMegaOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              id="services-menu"
              className="fixed inset-x-0 top-[68px] z-[45] hidden border-y border-line bg-page/95 shadow-[0_24px_60px_var(--color-shadow)] backdrop-blur-xl lg:block"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="shell grid gap-10 py-8 lg:grid-cols-[0.72fr_2fr]" onClick={closeMenusOnLink}>
                <div className="border-line pr-6 lg:border-r">
                  <p className="meta">Service index</p>
                  <p className="mt-4 max-w-[24ch] text-[1.35rem] font-medium leading-[1.1] tracking-[-0.035em]">
                    Four pillars. Fourteen focused services.
                  </p>
                  <p className="mt-3 max-w-[32ch] text-[12.5px] leading-relaxed text-quiet">
                    Start with the part of the research journey that is asking
                    for attention.
                  </p>
                  <div className="mt-5 flex flex-col items-start gap-3">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium hover:text-accent-text"
                    >
                      All services
                      <PiArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/match"
                      className="inline-flex items-center gap-1.5 text-[12.5px] text-quiet hover:text-accent-text"
                    >
                      Find your path
                      <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-7 xl:grid-cols-4">
                  {pillars.map((pillar) => (
                    <div key={pillar.slug}>
                      <div className="flex items-baseline justify-between gap-2 border-b border-line pb-2">
                        <Link
                          href={`/services/${pillar.slug}`}
                          className="text-[13px] font-medium leading-tight hover:text-accent-text"
                        >
                          {pillar.shortName}
                        </Link>
                        <span className="font-mono text-[9px] text-accent-text">
                          {pillar.number}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {pillar.services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${pillar.slug}/${service.slug}`}
                              className="block text-[11.5px] leading-snug text-quiet transition-colors hover:text-accent-text"
                            >
                              {service.shortTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-0 top-[68px] bottom-0 z-[45] overflow-y-auto border-t border-line bg-page lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex min-h-full flex-col py-6">
              <nav aria-label="Mobile navigation" onClick={closeMenusOnLink}>
                <Link
                  href="/services"
                  className="flex items-center justify-between border-b border-line py-4 text-[1.7rem] font-medium tracking-[-0.04em]"
                >
                  Services
                  <PiArrowUpRight className="h-4 w-4 text-accent-text" aria-hidden="true" />
                </Link>
                <div className="grid grid-cols-2 gap-x-5 border-b border-line py-4">
                  {pillars.map((pillar) => (
                    <Link
                      key={pillar.slug}
                      href={`/services/${pillar.slug}`}
                      className="py-1.5 text-[13px] text-quiet"
                    >
                      <span className="mr-2 font-mono text-[9px] text-accent-text">
                        {pillar.number}
                      </span>
                      {pillar.shortName}
                    </Link>
                  ))}
                </div>
                {navigation
                  .filter((item) => !item.mega)
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between border-b border-line py-4 text-[1.7rem] font-medium tracking-[-0.04em]"
                    >
                      {item.label}
                      <PiArrowUpRight className="h-4 w-4 text-accent-text" aria-hidden="true" />
                    </Link>
                  ))}
              </nav>

              <div className="mt-auto pt-8">
                <Link href="/contact" className="btn btn-primary w-full">
                  Request a scope check
                  <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 flex items-center gap-2 text-[12px] text-quiet"
                >
                  <PiEnvelopeSimple className="h-3.5 w-3.5" aria-hidden="true" />
                  {site.email}
                </a>
                <p className="mt-3 text-[11px] leading-relaxed text-quiet">
                  Documents and datasets are treated as confidential.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
