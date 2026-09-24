"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Loader2,
  MessageSquareText,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type FormState = { name: string; email: string; subject: string; message: string };
const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace("-", "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: "https://maps.google.com/?q=Noida,India",
  },
] as const;

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Message sent ✓",
          description: data.message,
        });
        setForm(initialForm);
      } else {
        toast({
          title: "Couldn't send message",
          description: data.error ?? "Please try again or email me directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28" aria-label="Contact">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Get In Touch"
          title="Let's Build Something"
          highlight="Together"
          description="Hiring for a developer, analyst or SEO role — or just want to talk tech? My inbox is always open."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glow-hover flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-[0_8px_20px_-6px_rgba(139,92,246,0.6)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
                  <span className="block truncate text-sm font-semibold sm:text-base">{value}</span>
                </span>
              </a>
            ))}

            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 p-5">
              <div className="flex items-center gap-2.5">
                <MessageSquareText className="h-5 w-5 text-primary dark:text-primary-foreground" aria-hidden="true" />
                <p className="font-display text-sm font-bold sm:text-base">Connect with me</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {profile.openToWork}. Response time is usually under 24 hours.
              </p>
              <div className="mt-4 flex gap-3">
                <Button asChild variant="outline" size="sm" className="rounded-full border-primary/35 hover:bg-primary/15 hover:text-primary dark:hover:text-primary-foreground">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full border-primary/35 hover:bg-primary/15 hover:text-primary dark:hover:text-primary-foreground">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  required
                  minLength={2}
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={update("name")}
                  className="rounded-xl border-input bg-background/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={update("email")}
                  className="rounded-xl border-input bg-background/60"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                required
                minLength={2}
                placeholder="Frontend Developer opportunity"
                value={form.subject}
                onChange={update("subject")}
                className="rounded-xl border-input bg-background/60"
              />
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                minLength={10}
                rows={6}
                placeholder="Hi Harsh, I came across your portfolio and…"
                value={form.message}
                onChange={update("message")}
                className="resize-none rounded-xl border-input bg-background/60"
              />
            </div>

            <Button
              type="submit"
              disabled={sending}
              size="lg"
              className="mt-6 w-full rounded-full bg-gradient-brand font-semibold text-white shadow-[0_12px_36px_-10px_rgba(139,92,246,0.7)] transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
