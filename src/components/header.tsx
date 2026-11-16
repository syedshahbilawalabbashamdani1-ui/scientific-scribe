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
} from "react-icons/pi";
import { MagneticButton } from "@/components/magnetic-button";
import { Logo } from "@/components/logo";

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
  const headerRef = useRef<HTMLDivElement>(null);
  const wasMobileOpen = useRef(false);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelMegaClose = () => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
  };

  const openMega = () => {
    cancelMegaClose();
    setMegaOpen(true);
  };

  // Small delay so moving the pointer from the trigger down into the panel
  // does not close the menu in the gap between the two.
  const scheduleMegaClose = () => {
    cancelMegaClose();
    megaCloseTimer.current = setTimeout(() => {
      megaCloseTimer.current = null;
      setMegaOpen(false);
    }, 140);
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  const closeMenus = () => {
    cancelMegaClose();
    setMegaOpen(false);
    setMobileOpen(false);
  };

  const closeMenusOnLink = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a[href]")) closeMenus();
  };

  useEffect(() => {
    return () => {
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: globalThis.MouseEvent) {
      if (!mobileOpen) return;
      if (headerRef.current && headerRef.current.contains(e.target as Node)) return;
      setMobileOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelMegaClose();
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
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="glass relative">
        <div className="shell flex h-[68px] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="group flex shrink-0 items-center text-[17px] font-semibold tracking-[-0.045em] sm:text-[19px]"
          >
            <Logo />
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
                  aria-haspopup="true"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleMegaClose}
                  onFocus={openMega}
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
            <MagneticButton
              href="/contact"
              className="btn btn-primary btn-sm hidden md:inline-flex"
              wrapperClassName="hidden md:inline-flex"
            >
              Request a scope check
              <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </MagneticButton>
            <button
              ref={menuButtonRef}
              type="button"
              className={`nav-toggle text-ink lg:hidden ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="hm"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ width: "22px", height: "22px" }}
              >
                <circle cx="4" cy="4" r="2" />
                <circle cx="12" cy="4" r="2" />
                <circle cx="20" cy="4" r="2" />
                <circle cx="4" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="20" cy="12" r="2" />
                <circle cx="4" cy="20" r="2" />
                <circle cx="12" cy="20" r="2" />
                <circle cx="20" cy="20" r="2" />
              </svg>
            </button>
          </div>
        </div>

        {/* ALPHA-style Floating Sub-Menu */}
        <div
          ref={mobilePanelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`sub-menu lg:hidden ${mobileOpen ? "open" : ""}`}
        >
          <div className="sub-menu-shell" onClick={closeMenusOnLink}>
            <div className="sub-menu-section">
              <Link
                href="/services"
                className={`menu-item ${isActive("/services") ? "menu-item-active" : ""}`}
                onClick={closeMenus}
              >
                <span>Services</span>
                <PiArrowUpRight className="h-4 w-4 text-accent-text" aria-hidden="true" />
              </Link>
              {navigation
                .filter((item) => !item.mega)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`menu-item ${isActive(item.href) ? "menu-item-active" : ""}`}
                    onClick={closeMenus}
                  >
                    <span>{item.label}</span>
                    <PiArrowUpRight className="h-4 w-4 text-accent-text opacity-70" aria-hidden="true" />
                  </Link>
                ))}
            </div>

            <div className="sub-menu-divider" />

            <div className="sub-menu-section">
              <div className="sub-menu-label">Pillars</div>
              <div className="grid grid-cols-2 gap-0.5 pt-1">
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.slug}
                    href={`/services/${pillar.slug}`}
                    className="menu-item menu-item-secondary"
                    onClick={closeMenus}
                  >
                    <span className="mr-1.5 font-mono text-[9px] text-accent-text">
                      {pillar.number}
                    </span>
                    <span className="truncate">{pillar.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sub-menu-divider" />

            <div className="sub-menu-section pt-1">
              <MagneticButton
                href="/contact"
                onClick={closeMenus}
                className="btn btn-primary btn-sm w-full"
                wrapperClassName="flex w-full"
              >
                Request a scope check
                <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </MagneticButton>
              <a
                href={`mailto:${site.email}`}
                onClick={closeMenus}
                className="mt-2 flex items-center justify-center gap-1.5 py-1 text-[11.5px] text-quiet transition-colors hover:text-ink"
              >
                <PiEnvelopeSimple className="h-3.5 w-3.5" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>
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
              onMouseEnter={openMega}
              onMouseLeave={scheduleMegaClose}
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

    </header>
  );
}
