"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  GraduationCap,
} from "lucide-react";
import {
  aboutParagraphs,
  highlights,
  graduationDate,
  whatIDo,
  profile,
} from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const iconMap = {
  code: Code2,
  chart: BarChart3,
  search: Search,
} as const;

const accentStyles = {
  violet: {
    icon: "bg-primary/15 text-primary dark:text-primary-foreground ring-primary/30",
    title: "text-gradient-violet",
  },
  amber: {
    icon: "bg-accent/15 text-accent ring-accent/30",
    title: "text-gradient-amber",
  },
  emerald: {
    icon: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
    title: "text-emerald-400",
  },
} as const;

type Countdown = { days: number; hours: number; mins: number; secs: number; done: boolean };

function useCountdown(): Countdown | null {
  const [time, setTime] = useState<Countdown | null>(null);

  useEffect(() => {
    const target = new Date(
      graduationDate.year,
      graduationDate.month - 1,
      graduationDate.day,
      0,
      0,
      0
    ).getTime();
    const calc = (): Countdown => {
      const raw = target - Date.now();
      if (raw <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, done: true };
      return {
        days: Math.floor(raw / 86400000),
        hours: Math.floor((raw % 86400000) / 3600000),
        mins: Math.floor((raw % 3600000) / 60000),
        secs: Math.floor((raw % 60000) / 1000),
        done: false,
      };
    };
    // Defer first paint-tick update so state is never set synchronously in the effect body
    const tick = requestAnimationFrame(() => setTime(calc()));
    const id = setInterval(() => setTime(calc()), 1000);
    return () => {
      cancelAnimationFrame(tick);
      clearInterval(id);
    };
  }, []);

  return time;
}

/** Colorize a JSON-ish body line: key in violet, value in amber */
function JsonLine({ line }: { line: string }) {
  const match = line.match(/^(\s*)"([^"]+)":\s*(.+?),?$/);
  if (match) {
    const [, indent, key, value] = match;
    return (
      <>
        {indent}
        <span className="text-primary-foreground/90">&quot;{key}&quot;</span>
        <span className="text-muted-foreground">: </span>
        <span className="text-accent">{value}</span>
        {"\n"}
      </>
    );
  }
  return <span className="text-foreground/70">{line}{"\n"}</span>;
}

const terminalBody = `{
  "name": "Harsh Tripathi",
  "role": "CS Graduate · 2026",
  "location": "Noida, India",
  "degree": "B.Tech CSE",
  "stacks": ["React+Node", "FastAPI+Mongo", "SQL+PowerBI"],
  "also_into": ["Technical SEO", "Analytics"],
  "status": "open_to_opportunities"
}`;

export function About() {
  const countdown = useCountdown();

  return (
    <section id="about" className="relative py-20 sm:py-28" aria-label="About me">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="About Harsh Tripathi"
          title="Building Across the Full Stack —"
          highlight="Code, Data & Search"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left column: paragraphs + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            {aboutParagraphs.map((p, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {p}
              </p>
            ))}

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card/50 px-3.5 py-3 text-sm font-medium"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column: terminal + status + countdown */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Terminal card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-[#0b0b16] shadow-xl">
              <div className="flex items-center gap-2 border-b border-border/60 bg-card/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/90" />
                <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">harsh@portfolio ~ bash</span>
              </div>
              <div className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                <p className="text-emerald-400">$ cat harsh.json</p>
                <pre className="mt-3 whitespace-pre">
                  {terminalBody.split("\n").map((line, i) => (
                    <JsonLine key={i} line={line} />
                  ))}
                </pre>
              </div>
            </div>

            {/* Live status */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card/60 px-5 py-4">
              <div>
                <p className="font-display text-sm font-bold sm:text-base">Live Status</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
                  Online · {profile.openToWork}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary dark:text-primary-foreground ring-1 ring-primary/30">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            {/* Graduation countdown / graduated state */}
            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/70 to-accent/10 px-5 py-5">
              {countdown === null || !countdown.done ? (
                <>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary dark:text-primary-foreground">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    Graduating in
                  </p>
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                    {(["days", "hours", "mins", "secs"] as const).map((unit) => (
                      <div key={unit} className="rounded-xl border border-border bg-background/60 px-2 py-3 text-center">
                        <span className="block font-display text-xl font-extrabold sm:text-2xl">
                          {countdown ? String(countdown[unit]).padStart(2, "0") : "--"}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {graduationDate.label} · May 2026 · NITRA Technical Campus
                  </p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary dark:text-primary-foreground">
                    <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    Milestone unlocked
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-extrabold sm:text-xl">
                        B.Tech CSE — <span className="text-gradient-amber">Graduated 🎓</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        May 2026 · NITRA Technical Campus, Ghaziabad
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Class of 2026
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* What I do cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {whatIDo.map((card, i) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            const styles = accentStyles[card.accent];
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glow-hover rounded-2xl border border-border bg-card/60 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1", styles.icon)}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className={cn("font-display text-lg font-bold", styles.title)}>{card.title}</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
