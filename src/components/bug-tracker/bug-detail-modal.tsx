"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BugItem,
  BugStatus,
  DeveloperTeamMember,
  SEVERITY_DEFINITIONS,
  STATUS_CONFIG,
} from "@/types/bug";
import {
  UserCheck,
  Code2,
  GitPullRequest,
  CheckSquare,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lock,
  Flame,
  AlertTriangle,
  AlertCircle,
  Bug,
  Laptop,
  Globe,
  Clock,
  ExternalLink,
  GitCommit,
  Check,
  FileCode,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BugDetailModalProps {
  bug: BugItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developers: DeveloperTeamMember[];
  onAssignDeveloper: (bugId: string, devId: string, notes?: string) => void;
  onStartInvestigation: (bugId: string, devName?: string, notes?: string) => void;
  onSubmitCodeFix: (
    bugId: string,
    details: {
      rootCause: string;
      codeFixSummary: string;
      filePath: string;
      gitBranch: string;
      prNumber: string;
      prUrl: string;
      unitTestsPassed: boolean;
      unitTestSummary: string;
    }
  ) => void;
  onReviewCode: (
    bugId: string,
    approved: boolean,
    notes: string,
    reviewerName?: string
  ) => void;
  onRetestBug: (
    bugId: string,
    passed: boolean,
    notes: string,
    testerName?: string,
    environment?: string
  ) => void;
  onCloseBug: (bugId: string, notes?: string, closerName?: string) => void;
  onReopenBug: (bugId: string, reason: string) => void;
  onDeleteBug?: (bugId: string) => void;
}

export function BugDetailModal({
  bug,
  open,
  onOpenChange,
  developers,
  onAssignDeveloper,
  onStartInvestigation,
  onSubmitCodeFix,
  onReviewCode,
  onRetestBug,
  onCloseBug,
  onReopenBug,
  onDeleteBug,
}: BugDetailModalProps) {
  // Action form state
  const [selectedDevId, setSelectedDevId] = useState(developers[0]?.id || "dev-harsh");
  const [assignNotes, setAssignNotes] = useState("");

  // Fix form state
  const [rootCause, setRootCause] = useState("");
  const [codeFixSummary, setCodeFixSummary] = useState("");
  const [filePath, setFilePath] = useState("src/api/auth/login/route.ts");
  const [gitBranch, setGitBranch] = useState("fix/login-button-handler");
  const [prNumber, setPrNumber] = useState("PR-310");
  const [unitTestsPassed, setUnitTestsPassed] = useState(true);
  const [unitTestSummary, setUnitTestSummary] = useState("14/14 unit tests passing");

  // Review form state
  const [reviewNotes, setReviewNotes] = useState("Code approved. Unit and regression tests passed. Merging to staging.");
  const [reviewerName, setReviewerName] = useState("Harsh Tripathi");

  // Retest form state
  const [retestNotes, setRetestNotes] = useState("");
  const [testerName, setTesterName] = useState("Rohit Verma (QA)");
  const [retestEnv, setRetestEnv] = useState("Staging v2.4.2");

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<"overview" | "lifecycle" | "code" | "activity">("overview");

  if (!bug) return null;

  const sevInfo = SEVERITY_DEFINITIONS[bug.severity];
  const statusInfo = STATUS_CONFIG[bug.status];

  // Lifecycle stepper steps
  const stepperSteps = [
    { key: "Open", label: "Reported" },
    { key: "Assigned", label: "Assigned" },
    { key: "In Progress", label: "Fixing" },
    { key: "Code Review", label: "Review" },
    { key: "Testing", label: "Testing" },
    { key: "Resolved", label: "Resolved" },
    { key: "Closed", label: "Closed" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] max-w-4xl overflow-y-auto p-6 sm:p-7">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary">
                {bug.ticketNumber}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-bold border",
                  statusInfo.badgeClass
                )}
              >
                {bug.status}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-bold border",
                  sevInfo.badgeClass
                )}
              >
                {bug.severity}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {bug.priority}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onDeleteBug && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm("Delete this bug ticket?")) {
                      onDeleteBug(bug.id);
                      onOpenChange(false);
                    }
                  }}
                  className="h-8 text-xs text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              )}
            </div>
          </div>

          <DialogTitle className="mt-2 text-xl font-bold font-display text-foreground leading-snug">
            {bug.title}
          </DialogTitle>
        </DialogHeader>

        {/* Dynamic Interactive Stage Controller Bar */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                ⚡
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Current Lifecycle Action Required: {bug.status}
              </h4>
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">
              Execute stage transition below
            </span>
          </div>

          {/* Action Panels per status */}
          <div className="mt-3">
            {/* 1. Status == Open -> Assign Developer */}
            {bug.status === "Open" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-400">
                  <UserCheck className="h-4 w-4" />
                  <span>Step 3: 👨💻 Manager / Lead Assigns Developer</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Select Developer Assignee:
                    </label>
                    <select
                      value={selectedDevId}
                      onChange={(e) => setSelectedDevId(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary"
                    >
                      {developers.map((dev) => (
                        <option key={dev.id} value={dev.id}>
                          {dev.name} ({dev.role}) — {dev.activeBugsCount} active
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Triage Notes (Optional):
                    </label>
                    <Input
                      value={assignNotes}
                      onChange={(e) => setAssignNotes(e.target.value)}
                      placeholder="e.g., Priority fix needed for next release."
                      className="text-xs h-8"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => onAssignDeveloper(bug.id, selectedDevId, assignNotes)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs"
                >
                  <UserCheck className="h-4 w-4 mr-1.5" />
                  Confirm Assignment (Move to Assigned)
                </Button>
              </div>
            )}

            {/* 2. Status == Assigned -> Start Investigation */}
            {bug.status === "Assigned" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
                  <Code2 className="h-4 w-4" />
                  <span>Step 4: 🔧 Developer Begins Investigation & Root Cause Reproduction</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Assigned Developer <strong>{bug.assignee?.name || "Developer"}</strong> reproduces the bug on local branch, inspects runtime error logs, and begins code fix.
                </p>
                <Button
                  onClick={() => onStartInvestigation(bug.id, bug.assignee?.name)}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs"
                >
                  <Code2 className="h-4 w-4 mr-1.5" />
                  Start Investigation (Move to In Progress)
                </Button>
              </div>
            )}

            {/* 3. Status == In Progress -> Submit Code Fix & PR */}
            {bug.status === "In Progress" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                  <GitPullRequest className="h-4 w-4" />
                  <span>Step 4: 🔧 Submit Code Fix & Create Pull Request</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Root Cause Identified:
                    </label>
                    <Input
                      value={rootCause}
                      onChange={(e) => setRootCause(e.target.value)}
                      placeholder="e.g., Missing null check on login button click handler"
                      className="text-xs h-8"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Code Fix Summary:
                    </label>
                    <Input
                      value={codeFixSummary}
                      onChange={(e) => setCodeFixSummary(e.target.value)}
                      placeholder="e.g., Wrapped in try/catch and added retry fallback"
                      className="text-xs h-8"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      File Modified:
                    </label>
                    <Input
                      value={filePath}
                      onChange={(e) => setFilePath(e.target.value)}
                      className="text-xs h-8 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Git Branch / PR #:
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={gitBranch}
                        onChange={(e) => setGitBranch(e.target.value)}
                        className="text-xs h-8 font-mono flex-1"
                      />
                      <Input
                        value={prNumber}
                        onChange={(e) => setPrNumber(e.target.value)}
                        className="text-xs h-8 font-mono w-24"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    id="unitTestsCheck"
                    checked={unitTestsPassed}
                    onChange={(e) => setUnitTestsPassed(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                  />
                  <label htmlFor="unitTestsCheck" className="text-foreground font-semibold">
                    Unit tests passed & verified locally ({unitTestSummary})
                  </label>
                </div>

                <Button
                  onClick={() =>
                    onSubmitCodeFix(bug.id, {
                      rootCause: rootCause || "Root cause identified and patched.",
                      codeFixSummary: codeFixSummary || "Implemented defensive error handler and test suite.",
                      filePath,
                      gitBranch,
                      prNumber,
                      prUrl: `https://github.com/company/repo/pull/${prNumber}`,
                      unitTestsPassed,
                      unitTestSummary,
                    })
                  }
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                >
                  <GitPullRequest className="h-4 w-4 mr-1.5" />
                  Push Code & Create PR (Move to Code Review)
                </Button>
              </div>
            )}

            {/* 4. Status == Code Review -> Approve & Merge OR Request Changes */}
            {bug.status === "Code Review" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Step 5: 🔍 Peer Code Review & Lead Approval</span>
                </div>
                <div className="rounded-lg border border-border bg-card/60 p-2.5 text-xs space-y-1">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>PR: <strong>{bug.fixDetails?.prNumber || "PR-308"}</strong> ({bug.fixDetails?.gitBranch || "fix/branch"})</span>
                    <span>File: <code className="text-primary">{bug.fixDetails?.filePath || "src/api/..."}</code></span>
                  </div>
                  <p className="text-[11px] text-foreground/80">
                    Fix: {bug.fixDetails?.codeFixSummary || "Code fix ready for review"}
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    Reviewer Notes / Approval Sign-Off:
                  </label>
                  <Input
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Review notes..."
                    className="text-xs h-8"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button
                    onClick={() => onReviewCode(bug.id, true, reviewNotes, reviewerName)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Approve & Merge to Staging (Move to Testing)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onReviewCode(bug.id, false, "Requested revisions on PR", reviewerName)}
                    className="border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-xs font-bold"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Request Changes (Return to In Progress)
                  </Button>
                </div>
              </div>
            )}

            {/* 5. Status == Testing -> Retest Passed OR Failed (BRANCHING PATH) */}
            {bug.status === "Testing" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <CheckSquare className="h-4 w-4" />
                  <span>Step 6: 🧪 Tester Retests Fix (Passed vs Failed Branch)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Tester Name:
                    </label>
                    <Input
                      value={testerName}
                      onChange={(e) => setTesterName(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Retest Environment:
                    </label>
                    <Input
                      value={retestEnv}
                      onChange={(e) => setRetestEnv(e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                    Retest Observations / Verification Notes:
                  </label>
                  <Input
                    value={retestNotes}
                    onChange={(e) => setRetestNotes(e.target.value)}
                    placeholder="e.g., Verified button click works smoothly on Chrome and Safari."
                    className="text-xs h-8"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <Button
                    onClick={() =>
                      onRetestBug(
                        bug.id,
                        true,
                        retestNotes || "Verified fix in staging. All reproduction steps passed.",
                        testerName,
                        retestEnv
                      )
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Retest PASSED ↘ (Move to Resolved)
                  </Button>
                  <Button
                    onClick={() =>
                      onRetestBug(
                        bug.id,
                        false,
                        retestNotes || "Issue still reproduces under specific conditions.",
                        testerName,
                        retestEnv
                      )
                    }
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                  >
                    <XCircle className="h-4 w-4 mr-1.5" />
                    Retest FAILED ↙ (Reopen Bug)
                  </Button>
                </div>
              </div>
            )}

            {/* 6. Status == Resolved -> Close Bug */}
            {bug.status === "Resolved" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Step 7: ✅ Tester Confirms Fix & Closes Ticket</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tester confirms that the bug is completely resolved and verified in staging/production release.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button
                    onClick={() => onCloseBug(bug.id, "Verified completely fixed in production.")}
                    className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    <Lock className="h-4 w-4 mr-1.5" />
                    Confirm & Close Ticket (Resolved → Closed)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onReopenBug(bug.id, "Regression observed after resolution")}
                    className="border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-xs font-bold"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Reopen Ticket (If Regression)
                  </Button>
                </div>
              </div>
            )}

            {/* 7. Status == Closed */}
            {bug.status === "Closed" && (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Lock className="h-4 w-4" />
                    <span>Ticket Closed & Archived</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    This defect has been verified fixed and archived.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReopenBug(bug.id, "Reopened for post-release regression")}
                  className="text-xs text-rose-500 border-rose-500/30 hover:bg-rose-500/10"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reopen Bug
                </Button>
              </div>
            )}

            {/* 8. Status == Reopened */}
            {bug.status === "Reopened" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-500">
                  <RotateCcw className="h-4 w-4" />
                  <span>QA Retest Failed: Reopened for Developer Fix</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  The bug has failed QA verification. It has been returned to the developer fix cycle.
                </p>
                <Button
                  onClick={() => onStartInvestigation(bug.id, bug.assignee?.name, "Started second fix cycle for reopened bug")}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs"
                >
                  <Code2 className="h-4 w-4 mr-1.5" />
                  Resume Developer Fix (Move to In Progress)
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Stepper Visualizer */}
        <div className="mt-4 overflow-x-auto py-2">
          <div className="min-w-[620px] flex items-center justify-between gap-1 text-[11px]">
            {stepperSteps.map((step, idx) => {
              const isCurrent = bug.status === step.key;
              const isPast =
                bug.status === "Closed" ||
                (bug.status === "Resolved" && idx <= 5) ||
                (bug.status === "Testing" && idx <= 4) ||
                (bug.status === "Code Review" && idx <= 3) ||
                (bug.status === "In Progress" && idx <= 2) ||
                (bug.status === "Assigned" && idx <= 1);

              return (
                <div key={step.key} className="flex-1 flex items-center">
                  <div
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all",
                      isCurrent
                        ? "bg-primary text-primary-foreground font-bold shadow-md ring-2 ring-primary/40"
                        : isPast
                        ? "bg-emerald-500/15 text-emerald-500 font-semibold"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-background/50 text-[10px]">
                      {isPast ? <Check className="h-2.5 w-2.5" /> : idx + 1}
                    </span>
                    <span>{step.label}</span>
                  </div>
                  {idx < stepperSteps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-1",
                        isPast ? "bg-emerald-500/40" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-tabs: Overview, Code/Fix, Activity Audit Log */}
        <div className="mt-4 flex border-b border-border">
          {[
            { id: "overview", label: "Overview & Reproduction" },
            { id: "code", label: "Developer Fix & PR" },
            { id: "activity", label: `Activity Audit Trail (${bug.activityLogs.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2 text-xs font-bold border-b-2 transition-all",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub-tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="mt-4 space-y-4 text-xs">
            {/* Description */}
            <div>
              <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Description:
              </span>
              <p className="rounded-xl border border-border bg-card/60 p-3 leading-relaxed text-foreground">
                {bug.description}
              </p>
            </div>

            {/* Steps to Reproduce */}
            <div>
              <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Steps to Reproduce:
              </span>
              <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-1.5">
                {bug.stepsToReproduce.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-primary font-bold">{i + 1}.</span>
                    <span className="text-foreground">{step.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected vs Actual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                <span className="font-bold text-emerald-500 uppercase tracking-wider block mb-1">
                  Expected Result:
                </span>
                <p className="text-foreground/90">{bug.expectedResult}</p>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
                <span className="font-bold text-rose-500 uppercase tracking-wider block mb-1">
                  Actual Result:
                </span>
                <p className="text-foreground/90 font-mono text-[11px]">{bug.actualResult}</p>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-border bg-card/60 p-3 text-[11px]">
              <div>
                <span className="text-muted-foreground block">Browser</span>
                <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                  <Globe className="h-3 w-3 text-primary" /> {bug.browser}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Device / OS</span>
                <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                  <Laptop className="h-3 w-3 text-primary" /> {bug.device} ({bug.os})
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Reporter</span>
                <span className="font-semibold text-foreground mt-0.5 block">
                  {bug.reporter.name}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Assignee</span>
                <span className="font-semibold text-foreground mt-0.5 block">
                  {bug.assignee ? bug.assignee.name : "Unassigned"}
                </span>
              </div>
            </div>

            {/* Attachment preview if any */}
            {bug.attachments.length > 0 && (
              <div>
                <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Screenshot / Evidence:
                </span>
                <div className="relative aspect-[16/8] max-h-56 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={bug.attachments[0].url}
                    alt="Bug Screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-tab 2: Code Fix & PR Details */}
        {activeTab === "code" && (
          <div className="mt-4 space-y-4 text-xs">
            {bug.fixDetails?.rootCause ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Root Cause Analysis:
                  </span>
                  <p className="text-foreground">{bug.fixDetails.rootCause}</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Code Fix Implemented:
                  </span>
                  <p className="text-foreground">{bug.fixDetails.codeFixSummary}</p>
                </div>

                {/* Git & PR specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-xl border border-border bg-muted/40 p-3">
                    <span className="text-muted-foreground block">Git Branch</span>
                    <span className="font-mono font-bold text-foreground mt-0.5 flex items-center gap-1">
                      <GitCommit className="h-3 w-3 text-primary" /> {bug.fixDetails.gitBranch || "main"}
                    </span>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/40 p-3">
                    <span className="text-muted-foreground block">Pull Request</span>
                    <span className="font-mono font-bold text-primary mt-0.5 flex items-center gap-1">
                      <GitPullRequest className="h-3 w-3" /> {bug.fixDetails.prNumber || "PR-Pending"}
                    </span>
                  </div>
                </div>

                {/* Simulated Diff Box */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    File Diff: <code className="text-primary">{bug.fixDetails.filePath || "src/api/auth/login.ts"}</code>
                  </span>
                  <div className="rounded-xl border border-border bg-black/90 p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
                    <div className="text-slate-500">{"// Code Fix Patch"}</div>
                    <div className="text-red-400 bg-red-950/40 px-1 py-0.5 rounded">
                      {"- const token = request.body.sessionToken; // Throws unhandled TypeError"}
                    </div>
                    <div className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded mt-1">
                      {"+ const token = request.body?.sessionToken ?? generateGuestFallback();"}
                    </div>
                    <div className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded">
                      + if (!token) return NextResponse.json(&#123; error: &quot;Missing token&quot; &#125;, &#123; status: 400 &#125;);
                    </div>
                  </div>
                </div>

                {/* Review & Retest Notes */}
                {bug.fixDetails.reviewNotes && (
                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
                    <span className="font-bold text-purple-400 uppercase tracking-wider block mb-1">
                      Code Review Sign-off by {bug.fixDetails.reviewedBy || "Team Lead"}:
                    </span>
                    <p className="text-foreground">{bug.fixDetails.reviewNotes}</p>
                  </div>
                )}

                {bug.fixDetails.retestNotes && (
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      Retest Notes by {bug.fixDetails.retestedBy || "QA Tester"} ({bug.fixDetails.retestEnvironment}):
                    </span>
                    <p className="text-foreground">{bug.fixDetails.retestNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
                <FileCode className="h-8 w-8 mx-auto text-muted-foreground/60 mb-2" />
                <p>No code fix submitted yet.</p>
                <p className="text-[11px] mt-1">
                  Once developer starts investigation and submits a PR, the code diff and analysis will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sub-tab 3: Activity Audit Trail */}
        {activeTab === "activity" && (
          <div className="mt-4 space-y-3">
            {bug.activityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-3 text-xs"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                  {log.role[0]}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">
                      {log.author}{" "}
                      <span className="text-[10px] font-normal text-muted-foreground">
                        ({log.role})
                      </span>
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="font-medium text-foreground/90">{log.action}</p>
                  {log.comment && (
                    <p className="text-[11px] text-muted-foreground italic">
                      &ldquo;{log.comment}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
