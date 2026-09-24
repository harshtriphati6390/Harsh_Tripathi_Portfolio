"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  BarChart3,
  Braces,
  Search,
} from "lucide-react";
import { profile, stats, tickerItems } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

type TypeState = { index: number; text: string; deleting: boolean };

function useTypewriter(words: readonly string[], speed = 75, pause = 1600) {
  const [state, setState] = useState<TypeState>({ index: 0, text: "", deleting: false });

  useEffect(() => {
    const { index, text, deleting } = state;
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text === word) {
      // Finished typing — pause, then start deleting
      timeout = setTimeout(() => setState((s) => ({ ...s, deleting: true })), pause);
    } else if (deleting && text === "") {
      // Finished deleting — move to the next word
      timeout = setTimeout(
        () => setState((s) => ({ ...s, deleting: false, index: (s.index + 1) % words.length })),
        speed
      );
    } else {
      timeout = setTimeout(
        () =>
          setState((s) => ({
            ...s,
            text: words[s.index % words.length].slice(0, s.text.length + (s.deleting ? -1 : 1)),
          })),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [state, words, speed, pause]);

  return state.text;
}

const floatBadges = [
  { icon: Braces, label: "React + Node", className: "-left-4 top-8 sm:-left-8", delay: "animate-float" },
  { icon: BarChart3, label: "Power BI + DAX", className: "-right-3 top-1/3 sm:-right-8", delay: "animate-float-delayed" },
  { icon: Search, label: "Technical SEO", className: "-left-4 bottom-16", delay: "animate-float" },
];

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32" aria-label="Introduction">
      {/* Backdrop decorations */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-8rem] top-40 h-72 w-72 rounded-full bg-accent/10 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-foreground sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
              Open to opportunities · Class of 2026
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m <span className="text-gradient">Harsh Tripathi</span>
            </h1>

            <p className="mt-4 flex h-8 items-center justify-center font-display text-lg font-semibold text-foreground/90 sm:text-2xl lg:justify-start">
              <span className="mr-2 text-muted-foreground font-sans font-normal">I&apos;m a</span>
              <span className="text-gradient-amber">{typed}</span>
              <span className="ml-1 inline-block h-6 w-[2px] animate-pulse rounded bg-accent sm:h-7" aria-hidden="true" />
            </p>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-brand px-6 font-semibold text-white shadow-[0_12px_36px_-10px_rgba(139,92,246,0.7)] transition-transform hover:scale-[1.04]"
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary/40 bg-primary/5 px-6 font-semibold text-foreground hover:bg-primary/15 hover:text-primary-foreground"
              >
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Socials */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {[
                { icon: Github, href: profile.github, label: "GitHub profile" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn profile" },
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email Harsh" },
                { icon: Phone, href: `tel:${profile.phone.replace("-", "")}`, label: "Call Harsh" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-foreground/80 transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary-foreground hover:shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                {profile.location}
              </span>
            </div>
          </motion.div>

          {/* Right: avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm"
          >
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-brand opacity-25 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card shadow-[0_24px_80px_-24px_rgba(139,92,246,0.5)]">
              <Image
                src={profile.avatar}
                alt="Photo of Harsh Tripathi — B.Tech CSE graduate"
                width={640}
                height={640}
                priority
                className="aspect-[3/4] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-4 pt-10">
                <p className="font-display text-sm font-bold sm:text-base">{profile.name}</p>
                <p className="text-xs text-muted-foreground">B.Tech CSE · NITRA Technical Campus</p>
              </div>
            </div>

            {floatBadges.map(({ icon: Icon, label, className, delay }) => (
              <div
                key={label}
                className={`absolute ${className} ${delay} flex items-center gap-2 rounded-2xl border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur`}
              >
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="whitespace-nowrap text-xs font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card/50 p-5 backdrop-blur sm:gap-4 sm:p-6 md:grid-cols-4"
          aria-label="Quick stats"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Marquee ticker */}
      <div className="relative mt-12 border-y border-border bg-card/30 py-3" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-4">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
