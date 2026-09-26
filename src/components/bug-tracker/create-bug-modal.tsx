"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BugSeverity, BugPriority } from "@/types/bug";
import { bugPresets } from "@/data/bug-sample-data";
import {
  PlusCircle,
  Flame,
  AlertTriangle,
  AlertCircle,
  Bug,
  Sparkles,
  Laptop,
  Globe,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateBugModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateBug: (data: {
    title: string;
    description: string;
    stepsToReproduce: string[];
    expectedResult: string;
    actualResult: string;
    severity: BugSeverity;
    priority: BugPriority;
    browser: string;
    device: string;
    os: string;
    environment: "Production" | "Staging" | "QA" | "Development";
    reporterName: string;
    reporterRole: string;
    tags: string[];
    attachmentUrl?: string;
  }) => void;
}

export function CreateBugModal({
  open,
  onOpenChange,
  onCreateBug,
}: CreateBugModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stepsText, setStepsText] = useState(
    "1. Navigate to page\n2. Enter credentials\n3. Click Submit\n4. Observe error response"
  );
  const [expectedResult, setExpectedResult] = useState("");
  const [actualResult, setActualResult] = useState("");
  const [severity, setSeverity] = useState<BugSeverity>("High");
  const [priority, setPriority] = useState<BugPriority>("P1 - High");
  const [browser, setBrowser] = useState("Chrome 124.0");
  const [device, setDevice] = useState("Desktop PC");
  const [os, setOs] = useState("Windows 11");
  const [environment, setEnvironment] = useState<"Production" | "Staging" | "QA" | "Development">("Production");
  const [reporterName, setReporterName] = useState("Rohit Verma (QA)");
  const [reporterRole, setReporterRole] = useState("Tester");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("Auth, UI, High-Priority");

  const loadPreset = (preset: (typeof bugPresets)[number]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setStepsText(preset.stepsToReproduce.join("\n"));
    setExpectedResult(preset.expectedResult);
    setActualResult(preset.actualResult);
    setSeverity(preset.severity);
    setPriority(preset.priority);
    setBrowser(preset.browser);
    setDevice(preset.device);
    setTagsInput(preset.tags.join(", "));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const steps = stepsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onCreateBug({
      title: title.trim(),
      description: description.trim(),
      stepsToReproduce: steps,
      expectedResult: expectedResult.trim(),
      actualResult: actualResult.trim(),
      severity,
      priority,
      browser,
      device,
      os,
      environment,
      reporterName,
      reporterRole,
      tags,
      attachmentUrl: attachmentUrl.trim() || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-6 sm:p-7">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <PlusCircle className="h-5 w-5" />
            <DialogTitle className="font-display text-xl font-bold">
              1. 📝 Create New Bug Report
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Tester or user enters defect details, reproduction steps, environment info, and sets Priority & Severity.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Template Presets */}
        <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Quick-Fill Real Bug Templates:</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {bugPresets.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() => loadPreset(preset)}
                className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground/90 transition-colors hover:border-primary hover:text-primary"
              >
                {preset.title.slice(0, 32)}...
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Bug Title */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Bug Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Login button not working"
              required
              className="mt-1 font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., User cannot log in after entering valid credentials"
              rows={2}
              required
              className="mt-1"
            />
          </div>

          {/* Steps to Reproduce */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Steps to Reproduce (one per line)
            </label>
            <Textarea
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              placeholder="1. Go to /login&#10;2. Enter valid email&#10;3. Click Login"
              rows={3}
              className="mt-1 font-mono text-xs"
            />
          </div>

          {/* Expected vs Actual Result */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Expected Result
              </label>
              <Textarea
                value={expectedResult}
                onChange={(e) => setExpectedResult(e.target.value)}
                placeholder="User credentials authenticate and dashboard loads"
                rows={2}
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Actual Result
              </label>
              <Textarea
                value={actualResult}
                onChange={(e) => setActualResult(e.target.value)}
                placeholder="Button spins indefinitely, console gives 500 API error"
                rows={2}
                className="mt-1 text-xs"
              />
            </div>
          </div>

          {/* 2. Priority & Severity (Exact prompt specification) */}
          <div className="rounded-xl border border-border bg-muted/30 p-3.5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
              2. 🔴 Priority & Severity Setting
            </span>

            {/* Severity Radio/Selector */}
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5">
                Severity Level:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    id: "Critical",
                    label: "Critical",
                    desc: "Application completely down",
                    icon: Flame,
                    color: "border-red-500 text-red-500 bg-red-500/10",
                  },
                  {
                    id: "High",
                    label: "High",
                    desc: "Payment/login not working",
                    icon: AlertTriangle,
                    color: "border-orange-500 text-orange-500 bg-orange-500/10",
                  },
                  {
                    id: "Medium",
                    label: "Medium",
                    desc: "Important feature error",
                    icon: AlertCircle,
                    color: "border-amber-500 text-amber-500 bg-amber-500/10",
                  },
                  {
                    id: "Low",
                    label: "Low",
                    desc: "UI / text issue",
                    icon: Bug,
                    color: "border-blue-500 text-blue-500 bg-blue-500/10",
                  },
                ].map((sev) => {
                  const Icon = sev.icon;
                  const isSelected = severity === sev.id;
                  return (
                    <button
                      key={sev.id}
                      type="button"
                      onClick={() => setSeverity(sev.id as BugSeverity)}
                      className={cn(
                        "flex flex-col items-start rounded-lg border p-2.5 text-left transition-all",
                        isSelected
                          ? cn("ring-2 ring-primary", sev.color)
                          : "border-border bg-card/60 hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Icon className="h-3.5 w-3.5" />
                        <span>{sev.label}</span>
                      </div>
                      <span className="mt-1 text-[10px] text-muted-foreground leading-tight">
                        {sev.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Priority Selector */}
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5">
                Priority:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "P0 - Blocker", label: "P0 - Blocker" },
                  { id: "P1 - High", label: "P1 - High" },
                  { id: "P2 - Medium", label: "P2 - Medium" },
                  { id: "P3 - Low", label: "P3 - Low" },
                ].map((pri) => (
                  <button
                    key={pri.id}
                    type="button"
                    onClick={() => setPriority(pri.id as BugPriority)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-semibold text-center transition-all",
                      priority === pri.id
                        ? "border-primary bg-primary text-primary-foreground shadow"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {pri.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Environment, Browser & Device */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value as any)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="QA">QA Testbed</option>
                <option value="Development">Development</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Browser
              </label>
              <Input
                value={browser}
                onChange={(e) => setBrowser(e.target.value)}
                placeholder="Chrome 124 / Safari 17"
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Device / OS
              </label>
              <Input
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                placeholder="Desktop / Windows 11"
                className="mt-1 text-xs"
              />
            </div>
          </div>

          {/* Screenshot / Video Link */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Screenshot / Video Attachment URL (Optional)
            </label>
            <Input
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or paste image URL"
              className="mt-1 text-xs"
            />
          </div>

          {/* Reporter & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Reporter (Tester / User)
              </label>
              <Input
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tags (comma separated)
              </label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Auth, Payments, CSS"
                className="mt-1 text-xs"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-brand text-white font-bold shadow-md hover:opacity-95"
            >
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              Submit Bug Report (Status: Open)
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
