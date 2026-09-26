"use client";

import { motion } from "framer-motion";
import {
  Flame,
  AlertTriangle,
  AlertCircle,
  Bug,
  FolderOpen,
  PlayCircle,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { BugSeverity, BugStatus } from "@/types/bug";
import { cn } from "@/lib/utils";

interface StatsDashboardProps {
  metrics: {
    total: number;
    open: number;
    assigned: number;
    inProgress: number;
    codeReview: number;
    testing: number;
    resolved: number;
    closed: number;
    reopened: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    activeIssues: number;
    resolutionRate: number;
  };
  onFilterStatus?: (status: BugStatus | "All") => void;
  onFilterSeverity?: (severity: BugSeverity | "All") => void;
  activeStatusFilter?: BugStatus | "All";
  activeSeverityFilter?: BugSeverity | "All";
}

export function StatsDashboard({
  metrics,
  onFilterStatus,
  onFilterSeverity,
  activeStatusFilter = "All",
  activeSeverityFilter = "All",
}: StatsDashboardProps) {
  return (
    <div className="space-y-4">
      {/* Primary KPI Row: Total, Open, In Progress, Resolved, Closed */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* Total Bugs */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onFilterStatus?.("All")}
          className={cn(
            "cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all shadow-sm",
            activeStatusFilter === "All" && activeSeverityFilter === "All"
              ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(139,92,246,0.25)]"
              : "border-border bg-card/70 hover:border-primary/40"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Bugs
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Layers className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold tracking-tight">
              {metrics.total}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">in system</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Active: {metrics.activeIssues}</span>
            <span className="text-emerald-500 font-semibold">{metrics.resolutionRate}% closed</span>
          </div>
        </motion.div>

        {/* Open */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onFilterStatus?.("Open")}
          className={cn(
            "cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all shadow-sm",
            activeStatusFilter === "Open"
              ? "border-blue-500 bg-blue-500/15 shadow-[0_0_24px_rgba(59,130,246,0.25)]"
              : "border-border bg-card/70 hover:border-blue-500/40"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Open
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
              <FolderOpen className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-blue-500">
              {metrics.open}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">awaiting dev</span>
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            Assigned: <strong className="text-foreground">{metrics.assigned}</strong>
          </div>
        </motion.div>

        {/* In Progress */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onFilterStatus?.("In Progress")}
          className={cn(
            "cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all shadow-sm",
            activeStatusFilter === "In Progress"
              ? "border-pink-500 bg-pink-500/15 shadow-[0_0_24px_rgba(236,72,153,0.25)]"
              : "border-border bg-card/70 hover:border-pink-500/40"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              In Progress
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-500/15 text-pink-500">
              <PlayCircle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-pink-500">
              {metrics.inProgress}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">being fixed</span>
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            PR / Review: <strong className="text-foreground">{metrics.codeReview}</strong>
          </div>
        </motion.div>

        {/* Resolved */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onFilterStatus?.("Resolved")}
          className={cn(
            "cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all shadow-sm",
            activeStatusFilter === "Resolved"
              ? "border-emerald-500 bg-emerald-500/15 shadow-[0_0_24px_rgba(16,185,129,0.25)]"
              : "border-border bg-card/70 hover:border-emerald-500/40"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Resolved
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-emerald-500">
              {metrics.resolved}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">QA passed</span>
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">
            Retesting: <strong className="text-foreground">{metrics.testing}</strong>
          </div>
        </motion.div>

        {/* Closed */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onFilterStatus?.("Closed")}
          className={cn(
            "cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all shadow-sm col-span-2 sm:col-span-1",
            activeStatusFilter === "Closed"
              ? "border-slate-500 bg-slate-500/15 shadow-[0_0_24px_rgba(100,116,139,0.25)]"
              : "border-border bg-card/70 hover:border-slate-500/40"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Closed
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-500/15 text-slate-400">
              <Lock className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-slate-400">
              {metrics.closed}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">archived</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Reopened:</span>
            <span className={cn("font-bold", metrics.reopened > 0 ? "text-rose-500" : "text-muted-foreground")}>
              {metrics.reopened}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Secondary KPI Row: Critical | High | Medium | Low (Severity breakdown as requested) */}
      <div className="rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-xl shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Defect Severity Distribution
            </h4>
          </div>
          <span className="text-xs text-muted-foreground">
            Click any severity badge to filter board
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Critical */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterSeverity?.(activeSeverityFilter === "Critical" ? "All" : "Critical")}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
              activeSeverityFilter === "Critical"
                ? "border-red-500 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] ring-1 ring-red-500"
                : "border-red-500/30 bg-red-500/5 hover:bg-red-500/10"
            )}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-red-500 text-xs">
                <Flame className="h-3.5 w-3.5" />
                <span>Critical</span>
              </div>
              <p className="text-[10px] text-muted-foreground">App completely down</p>
            </div>
            <span className="font-display text-2xl font-black text-red-500">
              {metrics.critical}
            </span>
          </motion.button>

          {/* High */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterSeverity?.(activeSeverityFilter === "High" ? "All" : "High")}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
              activeSeverityFilter === "High"
                ? "border-orange-500 bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.3)] ring-1 ring-orange-500"
                : "border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10"
            )}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-orange-500 text-xs">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>High</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Payment/login broken</p>
            </div>
            <span className="font-display text-2xl font-black text-orange-500">
              {metrics.high}
            </span>
          </motion.button>

          {/* Medium */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterSeverity?.(activeSeverityFilter === "Medium" ? "All" : "Medium")}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
              activeSeverityFilter === "Medium"
                ? "border-amber-500 bg-amber-500/20 shadow-[0_0_20px_rgba(234,179,8,0.3)] ring-1 ring-amber-500"
                : "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10"
            )}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-500 text-xs">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Medium</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Important feature error</p>
            </div>
            <span className="font-display text-2xl font-black text-amber-500">
              {metrics.medium}
            </span>
          </motion.button>

          {/* Low */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterSeverity?.(activeSeverityFilter === "Low" ? "All" : "Low")}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
              activeSeverityFilter === "Low"
                ? "border-blue-500 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-1 ring-blue-500"
                : "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
            )}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-500 text-xs">
                <Bug className="h-3.5 w-3.5" />
                <span>Low</span>
              </div>
              <p className="text-[10px] text-muted-foreground">UI / text issue</p>
            </div>
            <span className="font-display text-2xl font-black text-blue-500">
              {metrics.low}
            </span>
          </motion.button>
        </div>

        {/* Proportional visual progress bar */}
        <div className="mt-3">
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/60">
            {metrics.critical > 0 && (
              <div
                style={{ width: `${(metrics.critical / metrics.total) * 100}%` }}
                className="bg-red-500 transition-all duration-500"
                title={`Critical: ${metrics.critical}`}
              />
            )}
            {metrics.high > 0 && (
              <div
                style={{ width: `${(metrics.high / metrics.total) * 100}%` }}
                className="bg-orange-500 transition-all duration-500"
                title={`High: ${metrics.high}`}
              />
            )}
            {metrics.medium > 0 && (
              <div
                style={{ width: `${(metrics.medium / metrics.total) * 100}%` }}
                className="bg-amber-500 transition-all duration-500"
                title={`Medium: ${metrics.medium}`}
              />
            )}
            {metrics.low > 0 && (
              <div
                style={{ width: `${(metrics.low / metrics.total) * 100}%` }}
                className="bg-blue-500 transition-all duration-500"
                title={`Low: ${metrics.low}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
