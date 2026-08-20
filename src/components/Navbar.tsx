"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — left */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-accent">Scientific</span>{" "}
            <span className="text-foreground">Scribe</span>
          </span>
        </Link>

        {/* Desktop nav — centered via absolute positioning, visible lg+ */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions — right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/quote"
            className="hidden lg:inline-flex items-center px-5 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Get a Quote
          </Link>
          {/* Mobile/tablet hamburger — below lg */}
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger asChild>
              <button
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted lg:hidden"
                aria-label="Open navigation"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content
                className="fixed inset-y-0 right-0 z-50 w-full bg-background border-l border-border shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-300 data-[state=open]:duration-200"
                aria-label="Navigation"
              >
                <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight">
                      <span className="text-accent">Scientific</span>{" "}
                      <span className="text-foreground">Scribe</span>
                    </span>
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                      aria-label="Close navigation"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Dialog.Close>
                </div>
                <div className="flex flex-col p-4 space-y-1">
                  {navLinks.map((link) => (
                    <Dialog.Close asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                          pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                            ? "bg-accent text-white"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Dialog.Close asChild>
                    <Link
                      href="/quote"
                      className="flex items-center justify-center w-full px-5 py-3 rounded-lg bg-accent text-white text-base font-medium hover:bg-accent-hover transition-colors min-h-[44px]"
                    >
                      Get a Quote
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
