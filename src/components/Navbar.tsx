"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./brand/LogoMark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-lg">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-heading-xs tracking-tight">
          <LogoMark variant="node" size={28} />
          <span className="text-brass-600 dark:text-brass-500">Scientific</span>{" "}
          <span className="text-foreground">Scribe</span>
        </Link>

        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              data-active={isActive(pathname, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/quote"
            className="btn btn-outline hidden px-5 py-2 text-caption min-h-[44px] lg:inline-flex"
          >
            Get a quote
          </Link>
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger asChild>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-none text-muted-foreground hover:text-foreground lg:hidden"
                aria-label="Open navigation"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm" />
              <Dialog.Content
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-background shadow-xl"
                aria-label="Navigation"
              >
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                  <Link href="/" className="flex items-center gap-2 font-display text-heading-xs tracking-tight">
                    <LogoMark variant="node" size={28} />
                    <span className="text-brass-600 dark:text-brass-500">Scientific</span>{" "}
                    <span className="text-foreground">Scribe</span>
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      className="flex h-11 w-11 items-center justify-center rounded-none text-muted-foreground hover:text-foreground"
                      aria-label="Close navigation"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Dialog.Close>
                </div>
                <div className="flex flex-col p-4">
                  {navLinks.map((link) => (
                    <Dialog.Close asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="nav-link w-full justify-start text-body"
                        data-active={isActive(pathname, link.href)}
                      >
                        {link.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </div>
                <div className="border-t border-border p-4">
                  <Dialog.Close asChild>
                    <Link href="/quote" className="btn btn-solid w-full">
                      Get a quote
                    </Link>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
