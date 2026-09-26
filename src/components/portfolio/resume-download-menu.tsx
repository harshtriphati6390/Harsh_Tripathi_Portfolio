"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ChevronDown,
  ExternalLink,
  BarChart3,
  Search,
  Sparkles,
  Code2,
  FileText,
  FileCheck2,
} from "lucide-react";
import { resumes, ResumeOption } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const iconMap = {
  chart: BarChart3,
  search: Search,
  sparkles: Sparkles,
  code: Code2,
  file: FileText,
} as const;

export function ResumeDownloadMenu() {
  const [open, setOpen] = useState(false);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 280);
  };

  const onDownloadTrigger = (resume: ResumeOption) => {
    setDownloadedId(resume.id);
    toast.success(`Downloading ${resume.title}`, {
      description: `Targeting: ${resume.subtitle}`,
    });
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <Button
        type="button"
        size="lg"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Download tailored resume options"
        className="group relative rounded-full border-primary/40 bg-primary/5 px-6 font-semibold text-foreground hover:bg-primary/15 hover:text-primary dark:hover:text-primary-foreground shadow-sm transition-all duration-200"
      >
        <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
        <span>Download Resume</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : "text-muted-foreground"
          }`}
          aria-hidden="true"
        />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full z-50 mt-2.5 w-[92vw] max-w-[420px] rounded-3xl border border-primary/25 bg-background/95 p-3 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.35)] backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary dark:text-primary-foreground">
                  <FileCheck2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-xs font-bold text-foreground">Select Resume Track</p>
                  <p className="text-[10px] text-muted-foreground">Tailored for specific job roles</p>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:text-primary-foreground">
                {resumes.length} Tracks
              </span>
            </div>

            {/* Resume options list */}
            <div className="mt-2 space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {resumes.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap] || FileText;
                const isDownloaded = downloadedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="group relative flex items-center justify-between gap-3 rounded-2xl border border-transparent p-2.5 transition-all duration-200 hover:border-primary/30 hover:bg-card/90 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card border border-border shadow-xs text-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors">
                        <IconComponent className="h-4 w-4 text-accent" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-display text-sm font-bold text-foreground truncate">
                            {item.title}
                          </span>
                          <span
                            className={`rounded-md border px-1.5 py-0.2 text-[9px] font-semibold tracking-wide uppercase ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    {/* Actions: Download & Preview */}
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-xl border border-border/80 bg-background/80 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground hover:bg-accent/15"
                        title={`Preview ${item.title} in new tab`}
                        aria-label={`Preview ${item.title}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={item.url}
                        download={item.filename}
                        onClick={() => onDownloadTrigger(item)}
                        className={`inline-flex h-8 items-center gap-1 rounded-xl px-2.5 text-xs font-semibold shadow-xs transition-all ${
                          isDownloaded
                            ? "bg-emerald-500 text-white"
                            : "bg-gradient-brand text-white hover:opacity-95 hover:scale-[1.03]"
                        }`}
                        title={`Download ${item.filename}`}
                        aria-label={`Download ${item.title}`}
                      >
                        <Download className="h-3 w-3" />
                        <span className="hidden sm:inline">Get</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer tip */}
            <div className="mt-2.5 border-t border-border/60 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">
                Hover or click any track to download the exact tailored PDF.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
