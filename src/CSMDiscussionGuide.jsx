import React, { useMemo, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Search,
  RotateCcw,
  Layers3,
  MessageSquareMore,
  Sparkles,
  Compass,
  Workflow,
  Library,
  Users,
  Target,
  PanelLeft,
  Home,
  FolderKanban,
  CheckSquare,
  BookOpen,
  Settings,
} from "lucide-react";

const discussionTree = [
  {
    id: "opportunity-intake",
    title: "Opportunity Intake & Workflow Reality",
    eyebrow: "Section 01",
    icon: Workflow,
    blurb:
      "Start here to understand what really happens when a new opportunity appears, how work gets kicked off, and where the current process is structured versus improvised.",
    children: [
      {
        id: "intake-openers",
        title: "Primary opener",
        levelLabel: "Level 2",
        children: [
          {
            id: "intake-opener-main",
            title: "Core discussion question",
            levelLabel: "Level 3",
            questions: [
              "Walk me through what actually happens when a new opportunity comes in.",
            ],
          },
        ],
      },
      {
        id: "intake-process-path",
        title: "Process path and kickoff",
        levelLabel: "Level 2",
        children: [
          {
            id: "intake-process-who",
            title: "Who sees it first and what happens next",
            levelLabel: "Level 3",
            questions: [
              "Who usually becomes aware of the opportunity first, and what happens next?",
              "What are the first two or three steps your team takes once you decide it is worth pursuing?",
            ],
          },
          {
            id: "intake-process-structure",
            title: "Where the process is structured versus informal",
            levelLabel: "Level 3",
            questions: [
              "Where does the process feel well defined versus more informal or person-dependent?",
              "How much of the workflow is documented versus simply known by the team?",
            ],
          },
        ],
      },
      {
        id: "intake-variation",
        title: "Variation by bid type and timing",
        levelLabel: "Level 2",
        children: [
          {
            id: "intake-variation-types",
            title: "Different response types",
            levelLabel: "Level 3",
            questions: [
              "What kinds of responses are you producing most often right now: full proposals, RFIs, questionnaires, task orders, grants, or a mix?",
              "Which of those feel most repeatable, and which feel the most bespoke?",
            ],
          },
          {
            id: "intake-variation-timeline",
            title: "Timeline pressure",
            levelLabel: "Level 3",
            questions: [
              "What does a normal turnaround timeline look like for your team?",
              "When timelines get compressed, what gets skipped, rushed, or handled differently?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "friction-bottlenecks",
    title: "Friction, Bottlenecks & Manual Pain",
    eyebrow: "Section 02",
    icon: Compass,
    blurb:
      "Use this branch to identify where the process slows down, where the team gets stuck, and which manual steps create the most drag.",
    children: [
      {
        id: "friction-openers",
        title: "Primary opener",
        levelLabel: "Level 2",
        children: [
          {
            id: "friction-opener-main",
            title: "Core discussion question",
            levelLabel: "Level 3",
            questions: [
              "Where do things usually slow down or get frustrating for your team?",
            ],
          },
        ],
      },
      {
        id: "friction-general",
        title: "General friction signals",
        levelLabel: "Level 2",
        children: [
          {
            id: "friction-general-rework",
            title: "Rework and manual overhead",
            levelLabel: "Level 3",
            questions: [
              "Which step tends to create the most rework or repeated effort?",
              "What creates the most mental overhead for the people doing the work?",
              "Which part of the process feels heavier than it should be for the value it adds?",
            ],
          },
          {
            id: "friction-general-handoffs",
            title: "Broken handoffs",
            levelLabel: "Level 3",
            questions: [
              "Where do handoffs break down most often?",
              "What tends to get lost or delayed when work moves from one person or team to another?",
            ],
          },
        ],
      },
      {
        id: "friction-specific-areas",
        title: "Specific pain areas",
        levelLabel: "Level 2",
        children: [
          {
            id: "friction-review-cycles",
            title: "Review cycle friction",
            levelLabel: "Level 3",
            questions: [
              "How do review comments usually come back today?",
              "What is difficult about consolidating comments or deciding what to accept?",
              "How often do you end up with conflicting feedback from different reviewers?",
            ],
          },
          {
            id: "friction-sme-bottlenecks",
            title: "SME bottlenecks",
            levelLabel: "Level 3",
            questions: [
              "How easy or difficult is it to get timely input from SMEs?",
              "What kind of input do SMEs tend to provide: full drafts, rough notes, verbal guidance, or edits to existing content?",
              "If SME input arrives late, what downstream impact does that usually create?",
            ],
          },
          {
            id: "friction-compliance-tracking",
            title: "Compliance and requirement tracking",
            levelLabel: "Level 3",
            questions: [
              "How do you currently identify and track requirements that must be answered?",
              "Where does compliance checking feel strongest today, and where does it still feel risky?",
              "How much manual work goes into requirement extraction, matrices, or final checks?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "content-library",
    title: "Content Reuse, Library & Source of Truth",
    eyebrow: "Section 03",
    icon: Library,
    blurb:
      "Use this branch to understand how the team reuses prior material, how content is organised, and whether people trust what they find.",
    children: [
      {
        id: "content-openers",
        title: "Primary opener",
        levelLabel: "Level 2",
        children: [
          {
            id: "content-opener-main",
            title: "Core discussion question",
            levelLabel: "Level 3",
            questions: [
              "How are you currently reusing content from past proposals?",
            ],
          },
        ],
      },
      {
        id: "content-findability",
        title: "Finding and trusting source material",
        levelLabel: "Level 2",
        children: [
          {
            id: "content-findability-location",
            title: "Where content lives",
            levelLabel: "Level 3",
            questions: [
              "Where does your best source content live today?",
              "How easy is it for the team to find the right version of something when they need it?",
            ],
          },
          {
            id: "content-findability-confidence",
            title: "Confidence in what is found",
            levelLabel: "Level 3",
            questions: [
              "How much confidence do people have that the content they find is current and approved?",
              "How much of the team’s time goes into finding content versus tailoring it?",
            ],
          },
        ],
      },
      {
        id: "content-operations",
        title: "Content operations and maintenance",
        levelLabel: "Level 2",
        children: [
          {
            id: "content-operations-structure",
            title: "Organisation and maintenance",
            levelLabel: "Level 3",
            questions: [
              "Is your content organised mainly by folders, metadata, naming conventions, or a mix?",
              "Who maintains the content structure or decides what should be kept as source material?",
              "What kinds of duplicates, outdated material, or competing versions tend to build up over time?",
            ],
          },
          {
            id: "content-operations-evidence",
            title: "Evidence and past performance",
            levelLabel: "Level 3",
            questions: [
              "How are case studies, past performance examples, or proof points maintained today?",
              "What is the current process for updating those examples when new work is completed?",
              "Where do teams struggle most when trying to match the right example to the right opportunity?",
            ],
          },
          {
            id: "content-operations-templates",
            title: "Templates and outputs",
            levelLabel: "Level 3",
            questions: [
              "How are templates managed today for proposals, RFIs, or review artifacts?",
              "Where do formatting requirements create extra manual work?",
              "Which output or document production steps feel more manual than they should?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "roles-collaboration",
    title: "Roles, Collaboration & Review Handoffs",
    eyebrow: "Section 04",
    icon: Users,
    blurb:
      "Use this branch to understand who writes, who reviews, who approves, and how work moves between those people.",
    children: [
      {
        id: "roles-openers",
        title: "Primary opener",
        levelLabel: "Level 2",
        children: [
          {
            id: "roles-opener-main",
            title: "Core discussion question",
            levelLabel: "Level 3",
            questions: [
              "Who actually writes vs reviews vs approves, and how does that handoff work?",
            ],
          },
        ],
      },
      {
        id: "roles-ownership",
        title: "Ownership and working model",
        levelLabel: "Level 2",
        children: [
          {
            id: "roles-ownership-coordination",
            title: "Coordination and accountability",
            levelLabel: "Level 3",
            questions: [
              "Who is typically responsible for coordinating the overall response?",
              "How does the team know who owes what by when?",
              "What happens when one person becomes the bottleneck?",
            ],
          },
          {
            id: "roles-ownership-writing-model",
            title: "Writer-led versus SME-led model",
            levelLabel: "Level 3",
            questions: [
              "Would you describe your model as writer-led, SME-led, or more distributed?",
              "How much does final quality depend on a small number of individuals?",
              "If a key person were unavailable for a week, what part of the process would feel most exposed?",
            ],
          },
        ],
      },
      {
        id: "roles-reviews-adoption",
        title: "Review loops and adoption reality",
        levelLabel: "Level 2",
        children: [
          {
            id: "roles-reviews-design",
            title: "Review design",
            levelLabel: "Level 3",
            questions: [
              "Do you run structured review stages or more ad hoc review loops?",
              "How do you prepare reviewers so they know what they are meant to focus on?",
              "How do you close the loop after review and confirm what changed?",
            ],
          },
          {
            id: "roles-reviews-adoption-branch",
            title: "Change readiness",
            levelLabel: "Level 3",
            questions: [
              "Which parts of the team are most open to changing the current process, and which parts are more hesitant?",
              "Where would a new workflow need to fit around existing habits rather than replace them?",
              "What kind of support would make adoption feel realistic rather than burdensome?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "priorities-outcomes",
    title: "Priorities, Success Criteria & Next-Step Focus",
    eyebrow: "Section 05",
    icon: Target,
    blurb:
      "Use this branch to force prioritisation, identify the most valuable near-term improvement, and shape what the workshop or ALP should focus on first.",
    children: [
      {
        id: "priority-openers",
        title: "Primary opener",
        levelLabel: "Level 2",
        children: [
          {
            id: "priority-opener-main",
            title: "Core discussion question",
            levelLabel: "Level 3",
            questions: [
              "If we could fix one thing in the next 60 to 90 days, what would make the biggest difference?",
            ],
          },
        ],
      },
      {
        id: "priority-success",
        title: "What success would look like",
        levelLabel: "Level 2",
        children: [
          {
            id: "priority-success-definition",
            title: "Success definition",
            levelLabel: "Level 3",
            questions: [
              "Why is that the highest priority right now?",
              "What would success look like in practical terms for the team?",
              "How would you know this issue is actually improving?",
            ],
          },
          {
            id: "priority-success-boundaries",
            title: "What not to change yet",
            levelLabel: "Level 3",
            questions: [
              "If we focused there first, what downstream benefits would you expect to see?",
              "What should we not try to change yet because it is working well enough today?",
            ],
          },
        ],
      },
      {
        id: "priority-branches",
        title: "Priority-specific branches",
        levelLabel: "Level 2",
        children: [
          {
            id: "priority-branches-speed",
            title: "If the priority is speed",
            levelLabel: "Level 3",
            questions: [
              "Which specific part of the timeline do you most want to compress?",
              "What currently prevents you from getting to a strong first draft faster?",
              "Where would faster output help most: intake, drafting, review, or finalisation?",
            ],
          },
          {
            id: "priority-branches-quality",
            title: "If the priority is quality",
            levelLabel: "Level 3",
            questions: [
              "Where does quality feel inconsistent today?",
              "Is the bigger issue structure, tone, evidence, compliance, or review rigor?",
              "What kind of quality improvement would matter most to leadership or the bid team?",
            ],
          },
          {
            id: "priority-branches-enablement",
            title: "If the priority is adoption or enablement",
            levelLabel: "Level 3",
            questions: [
              "What does the team need more of right now: process clarity, hands-on training, better prompts, or better source material?",
              "Which user group would benefit most from targeted enablement first?",
              "What would make the next training or workshop feel immediately useful rather than theoretical?",
            ],
          },
        ],
      },
    ],
  },
];

const platformNav = [
  { id: "home", label: "Home", icon: Home, active: true },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "assigned", label: "Assigned", icon: CheckSquare },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings },
];

function collectIds(nodes) {
  const ids = [];
  for (const node of nodes) {
    ids.push(node.id);
    if (node.children) ids.push(...collectIds(node.children));
  }
  return ids;
}

function filterTree(nodes, query) {
  if (!query.trim()) return nodes;
  const q = query.toLowerCase();

  return nodes
    .map((node) => {
      const titleMatch = node.title.toLowerCase().includes(q);
      const eyebrowMatch = node.eyebrow?.toLowerCase().includes(q);
      const blurbMatch = node.blurb?.toLowerCase().includes(q);
      const levelLabelMatch = node.levelLabel?.toLowerCase().includes(q);
      const questionMatch = (node.questions || []).some((question) =>
        question.toLowerCase().includes(q)
      );
      const filteredChildren = node.children ? filterTree(node.children, query) : [];

      if (
        titleMatch ||
        eyebrowMatch ||
        blurbMatch ||
        levelLabelMatch ||
        questionMatch ||
        filteredChildren.length
      ) {
        return { ...node, children: filteredChildren };
      }

      return null;
    })
    .filter(Boolean);
}

function getQuestionCount(nodes) {
  let total = 0;
  for (const node of nodes) {
    total += (node.questions || []).length;
    if (node.children) total += getQuestionCount(node.children);
  }
  return total;
}

function getBranchCount(nodes) {
  let total = 0;
  for (const node of nodes) {
    if (node.children?.length) total += node.children.length;
    if (node.children) total += getBranchCount(node.children);
  }
  return total;
}

function classNames(...items) {
  return items.filter(Boolean).join(" ");
}

function TreeNode({ node, expanded, onToggle, depth = 0, activeId, setActiveId }) {
  const isExpanded = expanded.has(node.id);
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const hasQuestions = Boolean(node.questions && node.questions.length > 0);
  const isTopLevel = depth === 0;
  const Icon = node.icon;

  return (
    <div className="w-full">
      <div
        className={classNames(
          "group rounded-[22px] border transition-all duration-200",
          isTopLevel
            ? "border-[#D8D8DC] bg-white shadow-[0_14px_40px_-26px_rgba(18,15,13,0.4)]"
            : "border-[#E7E7EC] bg-white shadow-sm",
          activeId === node.id ? "ring-2 ring-[#6D39F8]/10" : ""
        )}
        style={{ marginLeft: depth * 16 }}
      >
        <div className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => {
                if (hasChildren) onToggle(node.id);
                setActiveId(node.id);
              }}
              className={classNames(
                "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition",
                hasChildren
                  ? "border-[#D8D8DC] bg-[#F7F7FA] text-[#5A5A63] hover:bg-[#EFEFF5]"
                  : "border-[#ECECF1] bg-[#FAFAFC] text-[#8B8B95]"
              )}
              aria-label={hasChildren ? (isExpanded ? "Collapse section" : "Expand section") : "Section"}
            >
              {hasChildren ? (
                isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              ) : (
                <MessageSquareMore className="h-4 w-4" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {node.eyebrow && (
                  <span className="rounded-full bg-[#ECE8FF] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6D39F8]">
                    {node.eyebrow}
                  </span>
                )}
                {node.levelLabel && (
                  <span className="rounded-full bg-[#F3F3F6] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#75757F]">
                    {node.levelLabel}
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-start gap-3">
                {Icon && isTopLevel ? (
                  <div className="mt-0.5 rounded-2xl bg-[#D6EA8A] p-2 text-[#120F0D] shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={classNames(
                        "tracking-tight text-[#120F0D]",
                        isTopLevel ? "text-lg font-semibold md:text-[1.28rem]" : "text-sm font-semibold md:text-base"
                      )}
                    >
                      {node.title}
                    </h3>
                    {hasQuestions && (
                      <span className="rounded-full bg-[#F3F3F6] px-2.5 py-1 text-xs text-[#60606B]">
                        {node.questions.length} question{node.questions.length > 1 ? "s" : ""}
                      </span>
                    )}
                    {hasChildren && (
                      <span className="rounded-full bg-[#F3F3F6] px-2.5 py-1 text-xs text-[#60606B]">
                        {node.children.length} branch{node.children.length > 1 ? "es" : ""}
                      </span>
                    )}
                  </div>

                  {node.blurb && (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#60606B] md:text-[15px]">
                      {node.blurb}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {hasQuestions && (
            <div className="mt-4 space-y-3">
              {node.questions.map((question, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E7E7EC] bg-[#FAFAFC] px-4 py-3 text-sm leading-6 text-[#27272F] shadow-sm"
                >
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B8B95]">
                    Discussion question
                  </div>
                  {question}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-3 space-y-3">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              expanded={expanded}
              onToggle={onToggle}
              depth={depth + 1}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CSMDiscussionGuide() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(discussionTree[0].id);
  const [expanded, setExpanded] = useState(() => new Set(discussionTree.map((section) => section.id)));

  const filteredTree = useMemo(() => filterTree(discussionTree, query), [query]);
  const allFilteredIds = useMemo(() => collectIds(filteredTree), [filteredTree]);
  const topLevelIds = useMemo(() => filteredTree.map((section) => section.id), [filteredTree]);

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(allFilteredIds));
  const collapseToTop = () => setExpanded(new Set(topLevelIds));
  const resetView = () => {
    setQuery("");
    setExpanded(new Set(discussionTree.map((section) => section.id)));
    setActiveId(discussionTree[0].id);
  };

  const branchCount = getBranchCount(filteredTree);
  const questionCount = getQuestionCount(filteredTree);

  return (
    <div className="min-h-screen bg-[#F2F1F4] text-[#120F0D]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[132px] shrink-0 flex-col border-r border-white/8 bg-[#232326] text-white lg:flex">
          <div className="flex h-24 items-center justify-center border-b border-white/8 px-4">
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-[#F4F4F5] text-sm font-semibold text-[#120F0D] shadow-sm">
              AutogenAI
            </div>
          </div>
          <div className="space-y-1 px-2 py-6">
            {platformNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={classNames(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition",
                    item.active
                      ? "bg-[#CCB6FF] text-[#120F0D]"
                      : "text-white/85 hover:bg-white/8"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-20 items-center justify-between bg-[#232326] px-5 text-white md:px-8">
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/90">
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="text-2xl font-medium tracking-tight">AutogenAI</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90">
              derek.gatlin@autogenai.com
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-[1500px] rounded-[30px] border border-[#D9D8DE] bg-[#F7F7F8] shadow-[0_24px_60px_-35px_rgba(18,15,13,0.35)]">
              <div className="grid gap-0 lg:grid-cols-[320px,1fr]">
                <aside className="border-b border-[#DDDCE2] bg-[#F3F3F6] p-5 lg:border-b-0 lg:border-r">
                  <div className="mb-5 flex items-center justify-between">
                    <button className="rounded-full border border-[#DDDCE2] bg-white px-4 py-2 text-sm font-medium text-[#3D3D46] shadow-sm">
                      New Session
                    </button>
                    <button className="rounded-xl p-2 text-[#4D4D57] hover:bg-white/60">
                      <PanelLeft className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#868691]" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search guide"
                      className="w-full rounded-2xl border border-[#D9D8DE] bg-white px-10 py-3 text-sm outline-none transition placeholder:text-[#9A9AA4] focus:border-[#6D39F8]"
                    />
                  </div>

                  <div className="mt-4 grid gap-2">
                    <button
                      type="button"
                      onClick={expandAll}
                      className="rounded-2xl border border-[#D9D8DE] bg-white px-4 py-3 text-sm font-medium text-[#3D3D46] transition hover:bg-[#FAFAFC]"
                    >
                      Expand all
                    </button>
                    <button
                      type="button"
                      onClick={collapseToTop}
                      className="rounded-2xl border border-[#D9D8DE] bg-white px-4 py-3 text-sm font-medium text-[#3D3D46] transition hover:bg-[#FAFAFC]"
                    >
                      Collapse to top level
                    </button>
                    <button
                      type="button"
                      onClick={resetView}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D9D8DE] bg-white px-4 py-3 text-sm font-medium text-[#6D39F8] transition hover:bg-[#FAFAFC]"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset view
                    </button>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B8B95]">
                      Discussion areas
                    </div>
                    {filteredTree.map((section) => {
                      const Icon = section.icon;
                      const selected = activeId === section.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => {
                            setActiveId(section.id);
                            setExpanded((prev) => new Set(prev).add(section.id));
                          }}
                          className={classNames(
                            "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition",
                            selected
                              ? "border-[#6D39F8] bg-[#6D39F8] text-white shadow-sm"
                              : "border-[#D9D8DE] bg-white text-[#3D3D46] hover:bg-[#FAFAFC]"
                          )}
                        >
                          <div
                            className={classNames(
                              "rounded-xl p-2",
                              selected ? "bg-white/10" : "bg-[#F0EEF8] text-[#6D39F8]"
                            )}
                          >
                            {Icon ? <Icon className="h-4 w-4" /> : <Layers3 className="h-4 w-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{section.title}</div>
                            <div className={classNames("mt-0.5 text-xs", selected ? "text-white/75" : "text-[#8B8B95]")}>
                              {section.eyebrow}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <section className="p-5 md:p-6 lg:p-8">
                  <div className="mb-8 rounded-[28px] border border-[#D9D8DE] bg-white px-6 py-7 shadow-sm">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ECE8FF] px-3 py-1.5 text-xs font-semibold text-[#6D39F8]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Interactive discussion guide
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-[#120F0D] md:text-5xl">
                      CSM Discovery Guide
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#60606B] md:text-base">
                      Aligned to the AutogenAI platform shell. Expand into deeper branches only when the client gives a signal worth exploring, then collapse back to the top-level outline and move to a different area. Use the transcript as the main input for the workshop and Advanced Learning Plan.
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-[#D9D8DE] bg-[#FAFAFC] p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B8B95]">Top-level sections</div>
                        <div className="mt-2 text-2xl font-semibold text-[#120F0D]">{filteredTree.length}</div>
                      </div>
                      <div className="rounded-2xl border border-[#D9D8DE] bg-[#FAFAFC] p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B8B95]">Expandable branches</div>
                        <div className="mt-2 text-2xl font-semibold text-[#120F0D]">{branchCount}</div>
                      </div>
                      <div className="rounded-2xl border border-[#D9D8DE] bg-[#FAFAFC] p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B8B95]">Discussion questions</div>
                        <div className="mt-2 text-2xl font-semibold text-[#120F0D]">{questionCount}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {filteredTree.map((node) => (
                      <TreeNode
                        key={node.id}
                        node={node}
                        expanded={expanded}
                        onToggle={toggle}
                        activeId={activeId}
                        setActiveId={setActiveId}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
