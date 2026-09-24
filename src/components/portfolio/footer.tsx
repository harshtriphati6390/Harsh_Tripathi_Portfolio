"use client";

import { Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/40 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3" aria-label="Back to top of portfolio">
              <span className="relative grid h-10 w-10 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-lg bg-gradient-brand opacity-90" />
                <span className="relative font-display text-sm font-extrabold text-white">{profile.initials}</span>
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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Full-Stack Developer · Data Analyst · SEO Specialist. Building across the whole stack from Noida, India.
            </p>
            <div className="mt-4 flex gap-2.5">
              {[
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary dark:hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact summary */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-foreground">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phone.replace("-", "")}`} className="transition-colors hover:text-foreground">
                  {profile.phone}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
            <a
              href="#home"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/20 dark:text-primary-foreground"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Harsh Tripathi. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Designed & built with
            <Heart className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
