import { useEffect, useMemo, useState } from "react";
import {
  BookOpenText,
  BrainCircuit,
  Calculator,
  ChevronDown,
  ChevronRight,
  Droplets,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuMeta,
  SidebarSubmenu,
  SidebarSubmenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const toNodeId = (...values) =>
  values
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const groupByLabel = (items, getGroupLabel) =>
  items.reduce((accumulator, item) => {
    const label = getGroupLabel(item) || "General";
    if (!accumulator[label]) {
      accumulator[label] = [];
    }
    accumulator[label].push(item);
    return accumulator;
  }, {});

const pageIconById = {
  dashboard: LayoutDashboard,
  algorithms: BrainCircuit,
  acute: HeartPulse,
  followup: FileText,
  scores: Calculator,
  guides: BookOpenText,
};

const pageMetaById = {
  dashboard: {
    subtitle: "Overview and key workspace signals",
  },
  algorithms: {
    subtitle: "Decision pathways and treatment flowcharts",
  },
  acute: {
    subtitle: "Urgent bedside pathways and escalation prompts",
  },
  followup: {
    subtitle: "Printable DOAC review checklist and documentation",
  },
  scores: {
    subtitle: "Risk scores and renal dosing tools",
  },
  guides: {
    subtitle: "Structured clinical guide library",
  },
};

const iconShellTone = {
  "tone-blue": "bg-blue-100 border-blue-200 text-blue-600",
  "tone-violet": "bg-violet-100 border-violet-200 text-violet-600",
  "tone-red": "bg-red-100 border-red-200 text-red-600",
  "tone-teal": "bg-teal-100 border-teal-200 text-teal-600",
  "tone-green": "bg-green-100 border-green-200 text-green-600",
  "tone-orange": "bg-amber-100 border-amber-200 text-amber-600",
};

const pageToneById = {
  dashboard: "tone-blue",
  algorithms: "tone-violet",
  acute: "tone-red",
  followup: "tone-teal",
  scores: "tone-green",
  guides: "tone-blue",
};

const countLeaves = (nodes) =>
  nodes.reduce((total, node) => {
    if (node.children?.length) {
      return total + countLeaves(node.children);
    }

    return total + 1;
  }, 0);

export function AppSidebar({
  currentPage,
  onNavigate,
  onSelectTool,
  onSelectGuide,
  onSelectAcute,
  onSelectFollowup,
  activeToolId,
  activeAcuteId,
  activeGuideId,
  algorithmItems,
  acuteItems,
  scoreItems,
  guideItems,
  siteName,
}) {
  const { setOpen } = useSidebar();
  const [expandedSection, setExpandedSection] = useState(currentPage);
  const [expandedFolders, setExpandedFolders] = useState({});

  useEffect(() => {
    setExpandedSection(currentPage);
  }, [currentPage]);

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    setOpen(false);
  };

  const sidebarSections = useMemo(
    () => {
      const scoreBuckets = {
        "Scoring tools": scoreItems.filter((tool) => tool.category === "score"),
        "Renal tools": scoreItems.filter((tool) => tool.category === "renal"),
      };
      const guideBuckets = groupByLabel(guideItems, (guide) => guide.category);
      const acuteBuckets = groupByLabel(acuteItems, (item) => item.category);

      return {
      dashboard: [
        {
          id: "dashboard-overview",
          label: "Command center",
          action: () => handleNavigate("dashboard"),
          active: currentPage === "dashboard",
        },
      ],
      algorithms: [
        {
          id: "algorithms-decision-pathways",
          label: "Decision pathways",
          children: algorithmItems.map((tool) => ({
            id: tool.id,
            label: tool.shortTitle,
            action: () => {
              onSelectTool(tool.id);
              setOpen(false);
            },
            active: activeToolId === tool.id && currentPage === "algorithms",
          })),
        },
      ],
      acute: Object.entries(acuteBuckets).map(([label, itemsInBucket]) => ({
        id: toNodeId("acute", label),
        label,
        children: itemsInBucket.map((item) => ({
          id: item.id,
          label: item.shortTitle,
          action: () => {
            onSelectAcute(item.id);
            setOpen(false);
          },
          active: activeAcuteId === item.id && currentPage === "acute",
        })),
      })),
      followup: [
        {
          id: "followup-doac-checklist",
          label: "Follow-up checklist",
          action: () => {
            onSelectFollowup();
            setOpen(false);
          },
          active: currentPage === "followup",
        },
      ],
      scores: Object.entries(scoreBuckets)
        .filter(([, toolsInBucket]) => toolsInBucket.length)
        .map(([label, toolsInBucket]) => ({
          id: toNodeId("scores", label),
          label,
          children: toolsInBucket.map((tool) => ({
            id: tool.id,
            label: tool.shortTitle,
            action: () => {
              onSelectTool(tool.id);
              setOpen(false);
            },
            active: activeToolId === tool.id && currentPage === "scores",
          })),
        })),
      guides: Object.entries(guideBuckets).map(([label, guidesInBucket]) => ({
        id: toNodeId("guides", label),
        label,
        children: guidesInBucket.map((guide) => ({
          id: guide.id,
          label: guide.title,
          action: () => {
            onSelectGuide(guide.id);
            setOpen(false);
          },
          active: activeGuideId === guide.id,
        })),
      })),
    };
    },
    [
      activeGuideId,
      activeAcuteId,
      activeToolId,
      acuteItems,
      algorithmItems,
      currentPage,
      guideItems,
      onSelectAcute,
      onSelectFollowup,
      onSelectGuide,
      onSelectTool,
      scoreItems,
      setOpen,
    ]
  );

  // Reset folder accordion when user switches page section
  useEffect(() => {
    setExpandedFolders({});
    // After state clears, open the first folder in the new section
    const timer = requestAnimationFrame(() => {
      const currentNodes = sidebarSections[currentPage] ?? [];
      const firstFolderId = currentNodes.find((n) => n.children?.length)?.id;
      if (firstFolderId) {
        setExpandedFolders({ [firstFolderId]: true });
      }
    });
    return () => cancelAnimationFrame(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePagePress = (pageId) => {
    setExpandedSection((prev) => (prev === pageId ? null : pageId));
    onNavigate(pageId);
  };

  const toggleFolder = (folderId, siblingIds = []) => {
    setExpandedFolders((current) => {
      const isOpening = !current[folderId];
      const next = { ...current, [folderId]: isOpening };
      if (isOpening) {
        siblingIds.forEach((id) => {
          if (id !== folderId) next[id] = false;
        });
      }
      return next;
    });
  };

  const renderSidebarNodes = (pageId, nodes, depth = 0) => {
    const siblingFolderIds = nodes
      .filter((n) => Array.isArray(n.children) && n.children.length > 0)
      .map((n) => n.id);

    return nodes.map((node) => {
      const isFolder = Array.isArray(node.children) && node.children.length > 0;
      const isExpanded = !!expandedFolders[node.id];

      if (isFolder) {
        return (
          <div key={`${pageId}-${node.id}`}>
            <SidebarSubmenuButton
              className={cn(
                "flex items-center justify-between w-full font-medium text-muted-foreground",
                depth > 0 && "pl-6"
              )}
              active={node.children.some((child) => child.active)}
              onClick={() => toggleFolder(node.id, siblingFolderIds)}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="truncate">{node.label}</span>
              </span>
              {isExpanded ? (
                <ChevronDown size={14} className="flex-shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight size={14} className="flex-shrink-0 text-muted-foreground" />
              )}
            </SidebarSubmenuButton>
            {isExpanded && (
              <SidebarSubmenu>
                {renderSidebarNodes(pageId, node.children, depth + 1)}
              </SidebarSubmenu>
            )}
          </div>
        );
      }

      return (
        <SidebarSubmenuButton
          key={`${pageId}-${node.id}`}
          className={cn(
            "text-sm text-muted-foreground",
            depth > 0 && "pl-6"
          )}
          active={node.active ?? false}
          onClick={node.action ?? (() => handleNavigate(pageId))}
        >
          <span className="truncate">{node.label}</span>
        </SidebarSubmenuButton>
      );
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-gradient-to-br from-accent to-card p-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Droplets />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              Blood🩸Doctor
            </span>
            <h1 className="text-sm font-semibold leading-tight text-foreground">{siteName}</h1>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Clear clinical navigation with actionable calculators and evidence-based guide library.
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Sparkles size={14} />
            Primary navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                {[
                  { id: "dashboard", label: "Dashboard" },
                  { id: "algorithms", label: "Interactive Algorithms" },
                  { id: "acute", label: "Acute Management" },
                  { id: "followup", label: "DOAC Follow-up" },
                  { id: "scores", label: "Scoring Calculators" },
                  { id: "guides", label: "Clinical Guides" },
                ].map((page) => {
                  const Icon = pageIconById[page.id];
                  const meta = pageMetaById[page.id];
                  const children = sidebarSections[page.id] ?? [];
                  const isExpanded = expandedSection === page.id;
                  const itemCount = countLeaves(children);
                  const tone = pageToneById[page.id] ?? "tone-blue";

                  return (
                    <SidebarMenuItem key={page.id}>
                      <SidebarMenuButton
                        className={cn(isExpanded && "bg-accent border-blue-200")}
                        active={currentPage === page.id}
                        onClick={() => handlePagePress(page.id)}
                      >
                          <span className="flex items-center gap-3 min-w-0 flex-1">
                          <span
                            className={cn(
                              "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border",
                              iconShellTone[tone]
                            )}
                          >
                            <Icon size={16} />
                          </span>
                          <span className="flex flex-col min-w-0">
                            <span className="text-sm font-medium leading-tight text-foreground truncate">
                              {page.label}
                            </span>
                            <span className="text-xs text-muted-foreground leading-snug truncate">
                              {meta.subtitle}
                            </span>
                          </span>
                        </span>
                        <SidebarMenuMeta>
                          <span className="flex items-center gap-1.5">
                            <span className="inline-flex items-center justify-center min-w-7 px-2 py-0.5 rounded-full border border-border text-xs font-bold bg-accent text-primary">
                              {itemCount}
                            </span>
                            {isExpanded ? (
                              <ChevronDown size={14} className="text-muted-foreground" />
                            ) : (
                              <ChevronRight size={14} className="text-muted-foreground" />
                            )}
                          </span>
                        </SidebarMenuMeta>
                      </SidebarMenuButton>
                      {isExpanded && (
                        <SidebarSubmenu>
                          {renderSidebarNodes(page.id, children)}
                        </SidebarSubmenu>
                      )}
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
