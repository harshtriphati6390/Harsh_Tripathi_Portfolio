"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, CalendarDays, FolderKanban } from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = ["All", "Full-Stack", "Data Analytics", "SEO & Marketing"] as const;

const accentRing = {
  violet: "ring-primary/40 text-primary-foreground bg-primary/12",
  amber: "ring-accent/40 text-accent bg-accent/12",
  emerald: "ring-emerald-500/40 text-emerald-400 bg-emerald-500/12",
} as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative py-20 sm:py-28" aria-label="Projects">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Featured Work"
          title="Projects With Real"
          highlight="End-to-End Depth"
          description="Every project here shipped — APIs, dashboards and campaigns built from scratch to working product."
        />

        {/* Filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                filter === cat
                  ? "bg-gradient-brand text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]"
                  : "border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="glow-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" aria-hidden="true" />
                  <span
                    className={cn(
                      "absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 backdrop-blur",
                      accentRing[project.accent]
                    )}
                  >
                    {project.category}
                  </span>
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {project.period}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold sm:text-xl">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                  <ul className="mt-4 space-y-2">
                    {project.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary-foreground"
                      >
                        {link.label === "GitHub" ? (
                          <Github className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary/30 bg-primary/5 px-6 font-semibold hover:bg-primary/15 hover:text-primary-foreground"
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <FolderKanban className="mr-2 h-4 w-4" aria-hidden="true" />
              See All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
