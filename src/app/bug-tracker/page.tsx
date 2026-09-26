"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBugTracker } from "@/hooks/use-bug-tracker";
import { StatsDashboard } from "@/components/bug-tracker/stats-dashboard";
import { LifecycleFlowchart } from "@/components/bug-tracker/lifecycle-flowchart";
import { CreateBugModal } from "@/components/bug-tracker/create-bug-modal";
import { BugDetailModal } from "@/components/bug-tracker/bug-detail-modal";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BugStatus,
  BugSeverity,
  BugItem,
  SEVERITY_DEFINITIONS,
  STATUS_CONFIG,
} from "@/types/bug";
import {
  Bug,
  PlusCircle,
  RotateCcw,
  Search,
  ArrowLeft,
  LayoutGrid,
  List,
  Sparkles,
  Flame,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  Code2,
  GitPullRequest,
  CheckSquare,
  Lock,
  Tag,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BugTrackerPage() {
  const {
    bugs,
    developers,
    selectedBug,
    selectedBugId,
    setSelectedBugId,
    metrics,
    createBug,
    assignDeveloper,
    startInvestigation,
    submitCodeFix,
    reviewCode,
    retestBug,
    closeBug,
    reopenBug,
    deleteBug,
    resetToSampleData,
  } = useBugTracker();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BugStatus | "All">("All");
  const [severityFilter, setSeverityFilter] = useState<BugSeverity | "All">("All");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filtered bugs
  const filteredBugs = useMemo(() => {
    return bugs.filter((bug) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.reporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.assignee?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "All" || bug.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All" || bug.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [bugs, searchQuery, statusFilter, severityFilter]);

  const handleOpenBug = (bug: BugItem) => {
    setSelectedBugId(bug.id);
    setIsDetailOpen(true);
  };

  const stages: BugStatus[] = [
    "Open",
    "Assigned",
    "In Progress",
    "Code Review",
    "Testing",
    "Resolved",
    "Closed",
    "Reopened",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
              <span>Portfolio</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/25">
                <Bug className="h-4 w-4" />
              </span>
              <div>
                <h1 className="text-sm font-bold tracking-tight sm:text-base flex items-center gap-1.5">
                  <span>BugFlow</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                    QA Lifecycle
                  </span>
                </h1>
                <p className="text-[10px] text-muted-foreground hidden sm:block">
                  Defect Tracking & SDLC Resolution Engine
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetToSampleData}
              title="Reset data to default demonstration cases"
              className="text-xs h-8 gap-1.5 hidden md:flex"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Demo</span>
            </Button>

            <ThemeToggle />

            <Button
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="bg-primary text-primary-foreground text-xs h-8 gap-1.5 shadow-sm shadow-primary/30"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Report Bug</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-8">
        {/* Project Header Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-sm">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                <span>Interactive Defect Lifecycle System</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Software Bug Lifecycle & QA Management
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Step through the end-to-end defect workflow:{" "}
                <span className="text-foreground font-medium">User/Tester Report</span> →{" "}
                <span className="text-foreground font-medium">Priority & Severity Triage</span> →{" "}
                <span className="text-foreground font-medium">Developer Assignment</span> →{" "}
                <span className="text-foreground font-medium">Root Cause & PR</span> →{" "}
                <span className="text-foreground font-medium">Code Review</span> →{" "}
                <span className="text-foreground font-medium">Tester Retest (Pass/Fail)</span> →{" "}
                <span className="text-foreground font-medium">Verified & Closed</span>.
              </p>
            </div>

            {/* Quick Walkthrough Launch Card */}
            <div className="shrink-0 rounded-xl border border-primary/20 bg-background/80 p-4 shadow-sm backdrop-blur-sm space-y-3 min-w-[280px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Featured Walkthrough</span>
                <span className="rounded bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold text-orange-500">
                  BUG-101
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground line-clamp-1">
                  Login button not working
                </p>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                  Follow the exact scenario through Triage, Fix, Code Review & Retest.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  const bug101 = bugs.find((b) => b.ticketNumber === "BUG-101") || bugs[0];
                  if (bug101) handleOpenBug(bug101);
                }}
                className="w-full text-xs h-8 gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30"
              >
                <span>Launch Walkthrough</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </section>

        {/* 1. Dashboard Metrics Row */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span>System Metrics & KPI Dashboard</span>
            </h3>
            {(statusFilter !== "All" || severityFilter !== "All") && (
              <button
                onClick={() => {
                  setStatusFilter("All");
                  setSeverityFilter("All");
                }}
                className="text-xs text-primary hover:underline font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
          <StatsDashboard
            metrics={metrics}
            onFilterStatus={setStatusFilter}
            onFilterSeverity={setSeverityFilter}
            activeStatusFilter={statusFilter}
            activeSeverityFilter={severityFilter}
          />
        </section>

        {/* 2. Interactive Lifecycle Flowchart */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span>Interactive Defect Lifecycle Flowchart</span>
            </h3>
            <span className="text-xs text-muted-foreground">
              Click any stage to filter bugs
            </span>
          </div>
          <LifecycleFlowchart
            bugs={bugs}
            selectedBug={selectedBug}
            activeFilterStatus={statusFilter}
            onSelectStatus={setStatusFilter}
            onOpenBug={handleOpenBug}
          />
        </section>

        {/* 3. Bug Explorer: Kanban & Table Views */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">Defect Triage Board</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
                {filteredBugs.length} {filteredBugs.length === 1 ? "Bug" : "Bugs"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search input */}
              <div className="relative min-w-[200px] max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search bug, PR, dev..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 text-xs rounded-lg"
                />
              </div>

              {/* Severity filter */}
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as BugSeverity | "All")}
                className="h-8 rounded-lg border border-input bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as BugStatus | "All")}
                className="h-8 rounded-lg border border-input bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="All">All Stages</option>
                {stages.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* View Switcher */}
              <div className="flex items-center rounded-lg border border-border p-0.5 bg-muted/40">
                <button
                  onClick={() => setViewMode("kanban")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md transition",
                    viewMode === "kanban"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Kanban Board View"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md transition",
                    viewMode === "table"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title="Table View"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Kanban Board View */}
          {viewMode === "kanban" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stages.map((stage) => {
                const stageBugs = filteredBugs.filter((b) => b.status === stage);
                const config = STATUS_CONFIG[stage];

                return (
                  <div
                    key={stage}
                    className="flex flex-col rounded-xl border border-border bg-card/50 p-3"
                  >
                    {/* Column Header */}
                    <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="text-xs font-bold">{stage}</span>
                      </div>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {stageBugs.length}
                      </span>
                    </div>

                    {/* Bug Cards Column */}
                    <div className="flex-1 space-y-2.5 overflow-y-auto min-h-[140px]">
                      {stageBugs.length === 0 ? (
                        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border/60 text-[11px] text-muted-foreground">
                          No bugs in this stage
                        </div>
                      ) : (
                        stageBugs.map((bug) => {
                          const sev = SEVERITY_DEFINITIONS[bug.severity];
                          return (
                            <motion.div
                              key={bug.id}
                              whileHover={{ y: -2 }}
                              onClick={() => handleOpenBug(bug)}
                              className="group cursor-pointer rounded-xl border border-border bg-card p-3 shadow-sm transition hover:border-primary/50 hover:shadow-md space-y-2.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[11px] font-mono font-bold text-primary">
                                  {bug.ticketNumber}
                                </span>
                                <span
                                  className={cn(
                                    "rounded px-1.5 py-0.5 text-[10px] font-bold border",
                                    sev.badgeClass
                                  )}
                                >
                                  {bug.severity}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                                {bug.title}
                              </h4>

                              <p className="text-[11px] text-muted-foreground line-clamp-2">
                                {bug.description}
                              </p>

                              {/* Assignee & Environment */}
                              <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[10px]">
                                <div className="flex items-center gap-1.5">
                                  {bug.assignee ? (
                                    <>
                                      <span className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
                                        {bug.assignee.name.charAt(0)}
                                      </span>
                                      <span className="text-foreground font-medium truncate max-w-[80px]">
                                        {bug.assignee.name.split(" ")[0]}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-muted-foreground italic">
                                      Unassigned
                                    </span>
                                  )}
                                </div>
                                <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                                  {bug.environment}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table / List View */
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-muted/40 text-muted-foreground font-medium">
                  <tr>
                    <th className="p-3">Ticket #</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Stage / Status</th>
                    <th className="p-3">Assignee</th>
                    <th className="p-3">Reporter</th>
                    <th className="p-3">Environment</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredBugs.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-muted-foreground">
                        No bugs match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBugs.map((bug) => {
                      const sev = SEVERITY_DEFINITIONS[bug.severity];
                      const st = STATUS_CONFIG[bug.status];
                      return (
                        <tr
                          key={bug.id}
                          onClick={() => handleOpenBug(bug)}
                          className="hover:bg-muted/30 cursor-pointer transition"
                        >
                          <td className="p-3 font-mono font-bold text-primary">
                            {bug.ticketNumber}
                          </td>
                          <td className="p-3 font-semibold text-foreground max-w-xs truncate">
                            {bug.title}
                          </td>
                          <td className="p-3">
                            <span
                              className={cn(
                                "rounded px-2 py-0.5 text-[10px] font-bold border",
                                sev.badgeClass
                              )}
                            >
                              {bug.severity}
                            </span>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {bug.priority}
                          </td>
                          <td className="p-3">
                            <span
                              className={cn(
                                "rounded px-2 py-0.5 text-[10px] font-bold border",
                                st.badgeClass
                              )}
                            >
                              {bug.status}
                            </span>
                          </td>
                          <td className="p-3 font-medium">
                            {bug.assignee?.name || (
                              <span className="text-muted-foreground italic">
                                Unassigned
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {bug.reporter.name}
                          </td>
                          <td className="p-3">
                            <span className="rounded bg-muted px-2 py-0.5 text-[10px]">
                              {bug.environment}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-primary hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenBug(bug);
                              }}
                            >
                              Open Hub →
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      <CreateBugModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreateBug={createBug}
      />

      <BugDetailModal
        bug={selectedBug}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        developers={developers}
        onAssignDeveloper={assignDeveloper}
        onStartInvestigation={startInvestigation}
        onSubmitCodeFix={submitCodeFix}
        onReviewCode={reviewCode}
        onRetestBug={retestBug}
        onCloseBug={closeBug}
        onReopenBug={reopenBug}
        onDeleteBug={deleteBug}
      />
    </div>
  );
}
