"use client";

import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Server,
  Database,
  BarChart3,
  TrendingUp,
  TerminalSquare,
} from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

const iconMap = {
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  barChart: BarChart3,
  trendingUp: TrendingUp,
  terminal: TerminalSquare,
} as const;

const accents = [
  "text-primary dark:text-primary-foreground bg-primary/15 ring-primary/30",
  "text-accent bg-accent/15 ring-accent/30",
  "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 ring-emerald-500/30",
  "text-primary dark:text-primary-foreground bg-primary/15 ring-primary/30",
  "text-accent bg-accent/15 ring-accent/30",
  "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 ring-emerald-500/30",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28" aria-label="Skills">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Skills & Expertise"
          title="A Toolkit That Spans"
          highlight="Three Disciplines"
          description="Depth in development, analytics and SEO — the overlap is where I do my best work."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (gi % 3) * 0.08 }}
                className="glow-hover flex flex-col rounded-2xl border border-border bg-card/60 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ${accents[gi % accents.length]}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold sm:text-lg">{group.title}</h3>
                    <p className="text-xs text-muted-foreground">{group.blurb}</p>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-3.5">
                  {group.skills.map((skill, si) => (
                    <li key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                        <span className="text-foreground/90">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-secondary"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={skill.name}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.9, delay: 0.15 + si * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-brand"
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
