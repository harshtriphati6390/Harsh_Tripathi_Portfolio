"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  highlight?: string;
  description?: string;
};

export function SectionHeading({ kicker, title, highlight, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent sm:text-sm">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
