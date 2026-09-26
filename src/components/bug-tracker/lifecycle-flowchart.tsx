"use client";

import { motion } from "framer-motion";
import {
  FileText,
  AlertTriangle,
  UserCheck,
  Search,
  Code2,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowDown,
  ArrowRight,
  ShieldAlert,
  Flame,
  Check,
  CheckSquare,
  Lock,
} from "lucide-react";
import { BugItem, BugStatus } from "@/types/bug";
import { cn } from "@/lib/utils";

interface LifecycleFlowchartProps {
  bugs: BugItem[];
  selectedBug?: BugItem | null;
  activeFilterStatus?: BugStatus | "All";
  onSelectStatus?: (status: BugStatus | "All") => void;
  onOpenBug?: (bug: BugItem) => void;
}

export function LifecycleFlowchart({
  bugs,
  selectedBug,
  activeFilterStatus = "All",
  onSelectStatus,
}: LifecycleFlowchartProps) {
  // Counts by status
  const counts = {
    open: bugs.filter((b) => b.status === "Open").length,
    assigned: bugs.filter((b) => b.status === "Assigned").length,
    inProgress: bugs.filter((b) => b.status === "In Progress").length,
    codeReview: bugs.filter((b) => b.status === "Code Review").length,
    testing: bugs.filter((b) => b.status === "Testing").length,
    resolved: bugs.filter((b) => b.status === "Resolved").length,
    closed: bugs.filter((b) => b.status === "Closed").length,
    reopened: bugs.filter((b) => b.status === "Reopened").length,
  };

  const isCurrentStage = (stageStatus: BugStatus) => {
    return selectedBug?.status === stageStatus;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="font-display text-base font-bold sm:text-lg">
              Interactive Bug Lifecycle Workflow
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Complete defect pipeline from User/Tester discovery to Production Closure. Click any stage to filter bugs.
          </p>
        </div>

        {selectedBug && (
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
            <span>
              Active Bug: <strong>{selectedBug.ticketNumber}</strong> ({selectedBug.status})
            </span>
          </div>
        )}
      </div>

      {/* Main Flowchart Graph */}
      <div className="relative mt-6 overflow-x-auto py-2">
        <div className="min-w-[820px] max-w-4xl mx-auto flex flex-col items-center gap-4 text-xs font-medium">

          {/* Step 0: Trigger */}
          <div className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-4 py-1.5 text-muted-foreground shadow-sm">
            <Search className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-foreground">User / Tester finds a bug</span>
            <span className="rounded bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">Trigger</span>
          </div>

          <ArrowDown className="h-4 w-4 text-muted-foreground/60 animate-bounce" />

          {/* Step 1: Create Bug Report & Details */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectStatus?.("Open")}
            className={cn(
              "group relative flex w-full max-w-md items-center justify-between rounded-xl border p-3.5 text-left transition-all",
              activeFilterStatus === "Open"
                ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                : isCurrentStage("Open")
                ? "border-blue-500/80 bg-blue-500/5 ring-2 ring-blue-500/30"
                : "border-border bg-card hover:border-blue-500/40 hover:bg-muted/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-500">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">1. Create Bug Report</span>
                  <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    Status: Open
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Title, Description, Steps to Reproduce, Expected vs Actual, Attachments, Browser & Device
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-bold text-blue-500">
                {counts.open} Bugs
              </span>
            </div>
          </motion.button>

          <ArrowDown className="h-4 w-4 text-muted-foreground/60" />

          {/* Step 2: Priority & Severity Matrix */}
          <div className="grid w-full max-w-md grid-cols-4 gap-2 rounded-xl border border-border bg-muted/40 p-2.5 text-center text-[11px]">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-1.5">
              <div className="flex items-center justify-center gap-1 font-bold text-red-500">
                <Flame className="h-3 w-3" /> Critical
              </div>
              <span className="text-[9px] text-muted-foreground leading-tight block mt-0.5">App down</span>
            </div>
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-1.5">
              <div className="flex items-center justify-center gap-1 font-bold text-orange-500">
                <AlertTriangle className="h-3 w-3" /> High
              </div>
              <span className="text-[9px] text-muted-foreground leading-tight block mt-0.5">Payment/Login</span>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-1.5">
              <div className="flex items-center justify-center gap-1 font-bold text-amber-500">
                <ShieldAlert className="h-3 w-3" /> Medium
              </div>
              <span className="text-[9px] text-muted-foreground leading-tight block mt-0.5">Feature error</span>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-1.5">
              <div className="flex items-center justify-center gap-1 font-bold text-blue-500">
                <FileText className="h-3 w-3" /> Low
              </div>
              <span className="text-[9px] text-muted-foreground leading-tight block mt-0.5">UI / Text issue</span>
            </div>
          </div>

          <ArrowDown className="h-4 w-4 text-muted-foreground/60" />

          {/* Step 3: Developer Assigned */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectStatus?.("Assigned")}
            className={cn(
              "group relative flex w-full max-w-md items-center justify-between rounded-xl border p-3.5 text-left transition-all",
              activeFilterStatus === "Assigned"
                ? "border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                : isCurrentStage("Assigned")
                ? "border-violet-500/80 bg-violet-500/5 ring-2 ring-violet-500/30"
                : "border-border bg-card hover:border-violet-500/40 hover:bg-muted/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-500">
                <UserCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">2. Developer Assigned</span>
                  <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-400">
                    Status: Assigned
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Manager/Team Lead delegates ticket to developer based on domain expertise & sprint workload
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-xs font-bold text-violet-500">
                {counts.assigned} Bugs
              </span>
            </div>
          </motion.button>

          <ArrowDown className="h-4 w-4 text-muted-foreground/60" />

          {/* Step 4: Developer Investigates -> In Progress */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectStatus?.("In Progress")}
            className={cn(
              "group relative flex w-full max-w-md items-center justify-between rounded-xl border p-3.5 text-left transition-all",
              activeFilterStatus === "In Progress"
                ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                : isCurrentStage("In Progress")
                ? "border-pink-500/80 bg-pink-500/5 ring-2 ring-pink-500/30"
                : "border-border bg-card hover:border-pink-500/40 hover:bg-muted/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/15 text-pink-500">
                <Code2 className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">3. Developer Investigates & Fixes</span>
                  <span className="rounded bg-pink-500/20 px-2 py-0.5 text-[10px] font-bold text-pink-400">
                    Status: In Progress
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Reproduce bug locally → identify root cause → write code fix → run unit test suite
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="rounded-full bg-pink-500/15 px-2.5 py-1 text-xs font-bold text-pink-500">
                {counts.inProgress} Bugs
              </span>
            </div>
          </motion.button>

          <ArrowDown className="h-4 w-4 text-muted-foreground/60" />

          {/* Step 5: Push Code / PR / Code Review */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectStatus?.("Code Review")}
            className={cn(
              "group relative flex w-full max-w-md items-center justify-between rounded-xl border p-3.5 text-left transition-all",
              activeFilterStatus === "Code Review"
                ? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                : isCurrentStage("Code Review")
                ? "border-purple-500/80 bg-purple-500/5 ring-2 ring-purple-500/30"
                : "border-border bg-card hover:border-purple-500/40 hover:bg-muted/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-500">
                <GitPullRequest className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">4. Pull Request & Code Review</span>
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-400">
                    Status: Code Review
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Team member/lead reviews PR diff & tests → Approved & Merged into Staging branch
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="rounded-full bg-purple-500/15 px-2.5 py-1 text-xs font-bold text-purple-500">
                {counts.codeReview} Bugs
              </span>
            </div>
          </motion.button>

          <ArrowDown className="h-4 w-4 text-muted-foreground/60" />

          {/* Step 6: Retest Node */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectStatus?.("Testing")}
            className={cn(
              "group relative flex w-full max-w-md items-center justify-between rounded-xl border p-3.5 text-left transition-all",
              activeFilterStatus === "Testing"
                ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : isCurrentStage("Testing")
                ? "border-cyan-500/80 bg-cyan-500/5 ring-2 ring-cyan-500/30"
                : "border-border bg-card hover:border-cyan-500/40 hover:bg-muted/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-500">
                <CheckSquare className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">5. Tester Retests Fix</span>
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                    Status: Testing
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  QA verifies fix on test devices & browsers. Decides Pass or Fail branch!
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-500">
                {counts.testing} Bugs
              </span>
            </div>
          </motion.button>

          {/* Branching decision: Failed vs Passed */}
          <div className="grid w-full max-w-2xl grid-cols-1 md:grid-cols-2 gap-4 mt-2">

            {/* Left Branch: Retest FAILED */}
            <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500">
                <XCircle className="h-4 w-4" />
                <span>Retest FAILED ↙</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectStatus?.("Reopened")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all",
                  activeFilterStatus === "Reopened"
                    ? "border-rose-500 bg-rose-500/20 shadow-lg"
                    : isCurrentStage("Reopened")
                    ? "border-rose-500/80 bg-rose-500/10 ring-2 ring-rose-500/30"
                    : "border-rose-500/30 bg-card hover:bg-rose-500/10"
                )}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-rose-500">
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reopen Bug Ticket</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Tester adds regression notes & reopens.
                  </p>
                </div>
                <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-500">
                  {counts.reopened} Bugs
                </span>
              </motion.button>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                <ArrowDown className="h-3 w-3" /> Returns to Developer Fix loop
              </div>
            </div>

            {/* Right Branch: Retest PASSED */}
            <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                <span>Retest PASSED ↘</span>
              </div>

              {/* Resolved Stage */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectStatus?.("Resolved")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all",
                  activeFilterStatus === "Resolved"
                    ? "border-emerald-500 bg-emerald-500/20 shadow-lg"
                    : isCurrentStage("Resolved")
                    ? "border-emerald-500/80 bg-emerald-500/10 ring-2 ring-emerald-500/30"
                    : "border-emerald-500/30 bg-card hover:bg-emerald-500/10"
                )}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <Check className="h-3.5 w-3.5" />
                    <span>6. Bug Resolved</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Tester confirms fix verified in Staging/QA.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                  {counts.resolved} Bugs
                </span>
              </motion.button>

              <ArrowDown className="h-3 w-3 text-emerald-500" />

              {/* Closed Stage */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectStatus?.("Closed")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all",
                  activeFilterStatus === "Closed"
                    ? "border-slate-500 bg-slate-500/20 shadow-lg"
                    : isCurrentStage("Closed")
                    ? "border-slate-500/80 bg-slate-500/10 ring-2 ring-slate-500/30"
                    : "border-slate-500/30 bg-card hover:bg-slate-500/10"
                )}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-400">
                    <Lock className="h-3.5 w-3.5" />
                    <span>7. Bug Closed</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Verified in Production. Ticket archived!
                  </p>
                </div>
                <span className="rounded-full bg-slate-500/15 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                  {counts.closed} Bugs
                </span>
              </motion.button>
            </div>

          </div>

          {/* Filter Reset */}
          {activeFilterStatus !== "All" && (
            <button
              onClick={() => onSelectStatus?.("All")}
              className="mt-2 text-xs font-semibold text-primary hover:underline"
            >
              Clear Stage Filter (Show All Bugs)
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
