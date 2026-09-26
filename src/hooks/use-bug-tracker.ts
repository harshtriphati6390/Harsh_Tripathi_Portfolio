"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { BugItem, BugStatus, BugSeverity, BugPriority, DeveloperTeamMember, BugActivityLog } from "@/types/bug";
import { initialBugs, initialDevelopers } from "@/data/bug-sample-data";
import { toast } from "sonner";

const STORAGE_KEY = "bugflow_bugs_store_v1";

export function useBugTracker() {
  const [bugs, setBugs] = useState<BugItem[]>(initialBugs);
  const [developers] = useState<DeveloperTeamMember[]>(initialDevelopers);
  const [selectedBugId, setSelectedBugId] = useState<string | null>("bug-101");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBugs(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load bugs from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage
  const saveBugs = useCallback((newBugs: BugItem[]) => {
    setBugs(newBugs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBugs));
    } catch (e) {
      console.error("Failed to persist bugs", e);
    }
  }, []);

  const selectedBug = useMemo(() => {
    return bugs.find((b) => b.id === selectedBugId) || bugs[0] || null;
  }, [bugs, selectedBugId]);

  // 1. Create Bug (Tester / User finds a bug -> Create Bug Report)
  const createBug = useCallback(
    (data: {
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
    }) => {
      const nextNum = 100 + bugs.length + 1;
      const ticketNumber = `BUG-${nextNum}`;
      const id = `bug-${Date.now()}`;
      const now = new Date().toISOString();

      const newBug: BugItem = {
        id,
        ticketNumber,
        title: data.title,
        description: data.description,
        stepsToReproduce: data.stepsToReproduce.length > 0 ? data.stepsToReproduce : ["1. Steps to reproduce pending."],
        expectedResult: data.expectedResult,
        actualResult: data.actualResult,
        severity: data.severity,
        priority: data.priority,
        status: "Open",
        browser: data.browser || "Chrome 124",
        device: data.device || "Desktop",
        os: data.os || "Windows 11",
        environment: data.environment,
        reporter: {
          name: data.reporterName || "QA Tester",
          role: data.reporterRole || "Quality Assurance",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        },
        createdAt: now,
        updatedAt: now,
        attachments: data.attachmentUrl
          ? [
              {
                name: "bug_evidence.png",
                url: data.attachmentUrl,
                type: "image",
              },
            ]
          : [],
        fixDetails: {},
        activityLogs: [
          {
            id: `act-${Date.now()}`,
            timestamp: now,
            author: data.reporterName || "QA Tester",
            role: "Tester",
            action: "Created Bug Report",
            toStatus: "Open",
            comment: `Reported with ${data.severity} severity and ${data.priority} priority.`,
          },
        ],
        tags: data.tags.length > 0 ? data.tags : ["New-Report"],
      };

      const updated = [newBug, ...bugs];
      saveBugs(updated);
      setSelectedBugId(newBug.id);
      toast.success(`Bug ticket ${ticketNumber} created!`, {
        description: `Severity: ${data.severity} · Priority: ${data.priority}`,
      });
      return newBug;
    },
    [bugs, saveBugs]
  );

  // 3. Assign Developer (Manager/Lead assigns developer -> Status: Open -> Assigned)
  const assignDeveloper = useCallback(
    (bugId: string, devId: string, notes?: string) => {
      const dev = developers.find((d) => d.id === devId);
      if (!dev) return;

      const now = new Date().toISOString();
      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: "Engineering Lead",
          role: "Manager",
          action: `Assigned to ${dev.name}`,
          fromStatus: bug.status,
          toStatus: "Assigned",
          comment: notes || `Assigned to ${dev.name} (${dev.role}) for triage and investigation.`,
        };

        return {
          ...bug,
          assignee: {
            name: dev.name,
            role: dev.role,
            avatar: dev.avatar,
          },
          status: "Assigned" as BugStatus,
          updatedAt: now,
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      toast.info(`Assigned to ${dev.name}`, {
        description: `Status changed to Assigned`,
      });
    },
    [bugs, developers, saveBugs]
  );

  // 4. Developer Investigates (Bug -> In Progress)
  const startInvestigation = useCallback(
    (bugId: string, devName?: string, notes?: string) => {
      const now = new Date().toISOString();
      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: devName || bug.assignee?.name || "Developer",
          role: "Developer",
          action: "Started Investigation & Reproduction",
          fromStatus: bug.status,
          toStatus: "In Progress",
          comment: notes || "Developer successfully reproduced bug locally and started analyzing root cause.",
        };

        return {
          ...bug,
          status: "In Progress" as BugStatus,
          updatedAt: now,
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      toast.info("Status: In Progress", {
        description: "Developer is actively reproducing and fixing the bug.",
      });
    },
    [bugs, saveBugs]
  );

  // 4. Developer Code Fix & PR (Push Code / Create Pull Request -> Code Review)
  const submitCodeFix = useCallback(
    (
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
    ) => {
      const now = new Date().toISOString();
      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: bug.assignee?.name || "Developer",
          role: "Developer",
          action: `Submitted Code Fix & Pull Request #${details.prNumber}`,
          fromStatus: bug.status,
          toStatus: "Code Review",
          comment: `Branch: ${details.gitBranch}. Unit tests: ${details.unitTestsPassed ? "Passed" : "Pending"}. Ready for peer review.`,
        };

        return {
          ...bug,
          status: "Code Review" as BugStatus,
          updatedAt: now,
          fixDetails: {
            ...bug.fixDetails,
            ...details,
          },
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      toast.success("Code Fix & PR Submitted!", {
        description: "Status moved to Code Review for team inspection.",
      });
    },
    [bugs, saveBugs]
  );

  // 5. Code Review (Team member/lead reviews code: Approved -> Merge -> Testing OR Request Changes -> In Progress)
  const reviewCode = useCallback(
    (bugId: string, approved: boolean, notes: string, reviewerName = "Harsh Tripathi") => {
      const now = new Date().toISOString();
      const targetStatus: BugStatus = approved ? "Testing" : "In Progress";

      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: reviewerName,
          role: "Team Lead",
          action: approved ? "Approved & Merged Pull Request" : "Requested Changes on Pull Request",
          fromStatus: bug.status,
          toStatus: targetStatus,
          comment: notes,
        };

        return {
          ...bug,
          status: targetStatus,
          updatedAt: now,
          fixDetails: {
            ...bug.fixDetails,
            reviewedBy: reviewerName,
            reviewNotes: notes,
          },
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      if (approved) {
        toast.success("Pull Request Merged!", {
          description: "Status moved to Testing. Tester can now retest the build.",
        });
      } else {
        toast.warning("Changes Requested", {
          description: "Returned to In Progress for developer updates.",
        });
      }
    },
    [bugs, saveBugs]
  );

  // 6. Tester Retests (Tester Retests: Passed -> Resolved OR Failed -> Reopen Bug)
  const retestBug = useCallback(
    (
      bugId: string,
      passed: boolean,
      notes: string,
      testerName = "Rohit Verma",
      environment = "Staging v2.4"
    ) => {
      const now = new Date().toISOString();
      const targetStatus: BugStatus = passed ? "Resolved" : "Reopened";

      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: testerName,
          role: "Tester",
          action: passed ? "QA Retest PASSED" : "QA Retest FAILED — Reopened",
          fromStatus: bug.status,
          toStatus: targetStatus,
          comment: `[Environment: ${environment}] ${notes}`,
        };

        return {
          ...bug,
          status: targetStatus,
          updatedAt: now,
          resolvedAt: passed ? now : bug.resolvedAt,
          fixDetails: {
            ...bug.fixDetails,
            retestedBy: testerName,
            retestNotes: notes,
            retestEnvironment: environment,
          },
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      if (passed) {
        toast.success("Retest Passed!", {
          description: "Status changed to Resolved. Ready for final closure.",
        });
      } else {
        toast.error("Retest Failed — Bug Reopened!", {
          description: "Sent back to Developer for fix and second cycle.",
        });
      }
    },
    [bugs, saveBugs]
  );

  // 7. Close Bug (Agar tester confirm karta hai ki bug completely fixed hai: Resolved -> Closed)
  const closeBug = useCallback(
    (bugId: string, notes?: string, closerName = "Rohit Verma") => {
      const now = new Date().toISOString();
      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: closerName,
          role: "Tester",
          action: "Verified in Production & Closed Ticket",
          fromStatus: bug.status,
          toStatus: "Closed",
          comment: notes || "Verified fix in production release. Defect verified completely fixed.",
        };

        return {
          ...bug,
          status: "Closed" as BugStatus,
          updatedAt: now,
          closedAt: now,
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      toast.success("Bug Ticket Closed!", {
        description: "Verified completely fixed and archived.",
      });
    },
    [bugs, saveBugs]
  );

  // Reopen anytime (if regression observed in future)
  const reopenBug = useCallback(
    (bugId: string, reason: string, author = "QA Tester") => {
      const now = new Date().toISOString();
      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author,
          role: "Tester",
          action: "Reopened Bug Ticket",
          fromStatus: bug.status,
          toStatus: "Reopened",
          comment: reason || "Regression or failure observed.",
        };

        return {
          ...bug,
          status: "Reopened" as BugStatus,
          updatedAt: now,
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      toast.warning("Bug Reopened", {
        description: "Returned to triage pipeline for immediate developer attention.",
      });
    },
    [bugs, saveBugs]
  );

  // Direct status move for Kanban
  const updateStatus = useCallback(
    (bugId: string, newStatus: BugStatus, note?: string) => {
      const now = new Date().toISOString();
      const updated = bugs.map((bug) => {
        if (bug.id !== bugId) return bug;

        const newLog: BugActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: "User",
          role: "System",
          action: `Moved stage to ${newStatus}`,
          fromStatus: bug.status,
          toStatus: newStatus,
          comment: note || `Manual stage update to ${newStatus}`,
        };

        return {
          ...bug,
          status: newStatus,
          updatedAt: now,
          activityLogs: [newLog, ...bug.activityLogs],
        };
      });

      saveBugs(updated);
      toast.info(`Moved to ${newStatus}`);
    },
    [bugs, saveBugs]
  );

  const deleteBug = useCallback(
    (bugId: string) => {
      const updated = bugs.filter((b) => b.id !== bugId);
      saveBugs(updated);
      if (selectedBugId === bugId) {
        setSelectedBugId(updated[0]?.id || null);
      }
      toast.success("Bug removed from board");
    },
    [bugs, selectedBugId, saveBugs]
  );

  const resetToSampleData = useCallback(() => {
    saveBugs(initialBugs);
    setSelectedBugId("bug-101");
    toast.success("Reset to sample bug data!");
  }, [saveBugs]);

  // Dynamic Dashboard Metrics
  const metrics = useMemo(() => {
    const total = bugs.length;
    const open = bugs.filter((b) => b.status === "Open").length;
    const assigned = bugs.filter((b) => b.status === "Assigned").length;
    const inProgress = bugs.filter((b) => b.status === "In Progress").length;
    const codeReview = bugs.filter((b) => b.status === "Code Review").length;
    const testing = bugs.filter((b) => b.status === "Testing").length;
    const resolved = bugs.filter((b) => b.status === "Resolved").length;
    const closed = bugs.filter((b) => b.status === "Closed").length;
    const reopened = bugs.filter((b) => b.status === "Reopened").length;

    const critical = bugs.filter((b) => b.severity === "Critical").length;
    const high = bugs.filter((b) => b.severity === "High").length;
    const medium = bugs.filter((b) => b.severity === "Medium").length;
    const low = bugs.filter((b) => b.severity === "Low").length;

    const activeIssues = total - closed;
    const resolutionRate = total > 0 ? Math.round(((resolved + closed) / total) * 100) : 0;

    return {
      total,
      open,
      assigned,
      inProgress,
      codeReview,
      testing,
      resolved,
      closed,
      reopened,
      critical,
      high,
      medium,
      low,
      activeIssues,
      resolutionRate,
    };
  }, [bugs]);

  return {
    bugs,
    developers,
    selectedBug,
    selectedBugId,
    setSelectedBugId,
    metrics,
    isLoaded,
    createBug,
    assignDeveloper,
    startInvestigation,
    submitCodeFix,
    reviewCode,
    retestBug,
    closeBug,
    reopenBug,
    updateStatus,
    deleteBug,
    resetToSampleData,
  };
}
