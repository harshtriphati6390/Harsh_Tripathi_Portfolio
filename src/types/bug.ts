export type BugStatus =
  | "Open"
  | "Assigned"
  | "In Progress"
  | "Code Review"
  | "Testing"
  | "Resolved"
  | "Closed"
  | "Reopened";

export type BugSeverity = "Critical" | "High" | "Medium" | "Low";

export type BugPriority = "P0 - Blocker" | "P1 - High" | "P2 - Medium" | "P3 - Low";

export interface BugActivityLog {
  id: string;
  timestamp: string;
  author: string;
  role: "Tester" | "Developer" | "Team Lead" | "Manager" | "System";
  action: string;
  fromStatus?: BugStatus;
  toStatus?: BugStatus;
  comment?: string;
}

export interface BugAttachment {
  name: string;
  url: string;
  type: "image" | "log" | "video";
}

export interface DeveloperFixDetails {
  rootCause?: string;
  codeFixSummary?: string;
  filePath?: string;
  gitBranch?: string;
  prNumber?: string;
  prUrl?: string;
  unitTestsPassed?: boolean;
  unitTestSummary?: string;
  reviewNotes?: string;
  reviewedBy?: string;
  retestNotes?: string;
  retestedBy?: string;
  retestEnvironment?: string;
}

export interface BugItem {
  id: string;
  ticketNumber: string; // e.g., BUG-101
  title: string;
  description: string;
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
  severity: BugSeverity;
  priority: BugPriority;
  status: BugStatus;
  browser: string;
  device: string;
  os: string;
  environment: "Production" | "Staging" | "QA" | "Development";
  reporter: {
    name: string;
    role: string;
    avatar: string;
  };
  assignee?: {
    name: string;
    role: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  attachments: BugAttachment[];
  fixDetails: DeveloperFixDetails;
  activityLogs: BugActivityLog[];
  tags: string[];
}

export interface DeveloperTeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  activeBugsCount: number;
  specialty: string;
}

export const SEVERITY_DEFINITIONS: Record<
  BugSeverity,
  {
    title: string;
    example: string;
    color: string;
    badgeClass: string;
    borderClass: string;
    bgClass: string;
    icon: string;
  }
> = {
  Critical: {
    title: "Critical",
    example: "Application completely down / system crash",
    color: "#ef4444",
    badgeClass: "bg-red-500/15 text-red-500 border-red-500/30",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/10",
    icon: "Flame",
  },
  High: {
    title: "High",
    example: "Payment/login not working",
    color: "#f97316",
    badgeClass: "bg-orange-500/15 text-orange-500 border-orange-500/30",
    borderClass: "border-orange-500/40",
    bgClass: "bg-orange-500/10",
    icon: "AlertTriangle",
  },
  Medium: {
    title: "Medium",
    example: "Important feature has an error",
    color: "#eab308",
    badgeClass: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    borderClass: "border-amber-500/40",
    bgClass: "bg-amber-500/10",
    icon: "AlertCircle",
  },
  Low: {
    title: "Low",
    example: "UI / text issue / minor visual glitch",
    color: "#3b82f6",
    badgeClass: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    borderClass: "border-blue-500/40",
    bgClass: "bg-blue-500/10",
    icon: "Bug",
  },
};

export const STATUS_CONFIG: Record<
  BugStatus,
  {
    label: string;
    color: string;
    badgeClass: string;
    stepNumber: number;
    stepTitle: string;
    description: string;
  }
> = {
  Open: {
    label: "Open",
    color: "#3b82f6",
    badgeClass: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    stepNumber: 1,
    stepTitle: "Bug Reported",
    description: "Tester created bug report. Details, priority & severity set. Awaiting assignment.",
  },
  Assigned: {
    label: "Assigned",
    color: "#8b5cf6",
    badgeClass: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    stepNumber: 2,
    stepTitle: "Developer Assigned",
    description: "Manager/Team Lead assigned developer to investigate and triage root cause.",
  },
  "In Progress": {
    label: "In Progress",
    color: "#ec4899",
    badgeClass: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    stepNumber: 3,
    stepTitle: "Developer Investigating & Fixing",
    description: "Developer reproduced the issue, identified root cause, and is fixing code.",
  },
  "Code Review": {
    label: "Code Review",
    color: "#a855f7",
    badgeClass: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    stepNumber: 4,
    stepTitle: "PR Created & Under Review",
    description: "Code fix committed, PR created and submitted. Lead/Peer reviewing code & tests.",
  },
  Testing: {
    label: "Testing",
    color: "#06b6d4",
    badgeClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    stepNumber: 5,
    stepTitle: "Tester Retesting",
    description: "Merged to staging build. Tester retesting against reproduction steps.",
  },
  Resolved: {
    label: "Resolved",
    color: "#10b981",
    badgeClass: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    stepNumber: 6,
    stepTitle: "QA Retest Passed",
    description: "Tester verified bug fix passed all checks. Ready for final production sign-off.",
  },
  Closed: {
    label: "Closed",
    color: "#64748b",
    badgeClass: "bg-slate-500/15 text-slate-400 border-slate-500/30",
    stepNumber: 7,
    stepTitle: "Verified & Closed",
    description: "Bug completely fixed, verified, and archived into release notes.",
  },
  Reopened: {
    label: "Reopened",
    color: "#f43f5e",
    badgeClass: "bg-rose-500/15 text-rose-500 border-rose-500/30",
    stepNumber: 0,
    stepTitle: "QA Retest Failed — Reopened",
    description: "Tester retest failed. Issue still persists or regressed. Returned to Developer fix.",
  },
};
