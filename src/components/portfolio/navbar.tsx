"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sparkle } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_8px_32px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3" aria-label="Harsh Tripathi — home">
          <span className="relative grid h-10 w-10 place-items-center">
            <span className="absolute inset-0 rotate-45 rounded-lg bg-gradient-brand opacity-90 transition-transform duration-300 group-hover:rotate-[135deg]" />
            <span className="relative font-display text-sm font-extrabold tracking-wide text-white">
              {profile.initials}
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold">
              Harsh <span className="text-gradient-amber">Tripathi</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Portfolio
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === link.href.slice(1)
                    ? "bg-primary/15 text-primary ring-1 ring-primary/40 dark:text-primary-foreground"
                    : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Dark / light theme toggle */}
          <ThemeToggle />

          <Button
            asChild
            className="hidden rounded-full bg-gradient-brand font-semibold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] transition-transform hover:scale-[1.04] sm:inline-flex"
          >
            <a href="#contact">
              <Sparkle className="mr-1 h-4 w-4" aria-hidden="true" />
              Hire Me
            </a>
          </Button>

          {/* Mobile toggle */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-border bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          open ? "max-h-96 border-b" : "max-h-0"
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 text-sm font-medium",
                  active === link.href.slice(1)
                    ? "bg-primary/15 text-primary dark:text-primary-foreground"
                    : "text-foreground/80 hover:bg-secondary"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-gradient-brand px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
