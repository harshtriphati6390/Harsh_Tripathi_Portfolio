"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Rocket,
  Sparkles,
  Award,
  GraduationCap,
  School,
  Languages as LanguagesIcon,
  BadgeCheck,
  Database,
  Code2,
} from "lucide-react";
import { certifications, education, experience, languages } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

const expIcons = { trophy: Trophy, rocket: Rocket, sparkles: Sparkles } as const;
const certIcons = { python: Code2, database: Database, code: BadgeCheck, award: Award } as const;

export function Journey() {
  return (
    <section id="journey" className="relative py-20 sm:py-28" aria-label="Journey, education and achievements">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="The Journey So Far"
          title="Achievements, Learning &"
          highlight="Milestones"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Experience timeline */}
          <div>
            <h3 className="font-display text-xl font-bold">Experience & Leadership</h3>
            <ol className="relative mt-6 space-y-8 border-l-2 border-primary/25 pl-6">
              {experience.map((item, i) => {
                const Icon = expIcons[item.icon as keyof typeof expIcons];
                return (
                  <motion.li
                    key={item.org}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -left-[35px] grid h-8 w-8 place-items-center rounded-full border border-primary/40 bg-background shadow-[0_0_16px_-2px_rgba(139,92,246,0.55)]">
                      <Icon className="h-4 w-4 text-primary dark:text-primary-foreground" aria-hidden="true" />
                    </span>
                    <div className="glow-hover rounded-2xl border border-border bg-card/60 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display text-base font-bold">{item.role}</h4>
                        <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-bold text-accent ring-1 ring-accent/30">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-primary dark:text-primary-foreground">{item.org}</p>
                      <ul className="mt-3 space-y-1.5">
                        {item.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Right column: certifications + education + languages */}
          <div className="space-y-10">
            <div>
              <h3 className="font-display text-xl font-bold">Certifications</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {certifications.map((cert, i) => {
                  const Icon = certIcons[cert.icon as keyof typeof certIcons];
                  return (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="glow-hover flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-4"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent ring-1 ring-accent/25">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-bold leading-snug">{cert.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold">Education</h3>
              <div className="mt-6 space-y-4">
                {education.map((edu) => (
                  <motion.div
                    key={edu.school}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45 }}
                    className="glow-hover flex items-start gap-3.5 rounded-2xl border border-border bg-card/60 p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary-foreground ring-1 ring-primary/30">
                      {edu.current ? (
                        <GraduationCap className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <School className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-display text-sm font-bold sm:text-base">{edu.school}</p>
                        {edu.current ? (
                          <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/30">
                            Class of 2026
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{edu.degree}</p>
                      <p className="mt-1.5 text-xs font-medium text-muted-foreground/80">
                        {edu.period} · {edu.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold">Languages</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-2.5"
                  >
                    <LanguagesIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span className="text-sm font-bold">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">· {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
