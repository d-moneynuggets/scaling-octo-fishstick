import React, { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Search, RotateCcw, Layers3, MessageSquareMore } from "lucide-react";

const discussionTree = [
  {
    id: "opportunity-intake",
    title: "1. Opportunity Intake & Workflow Reality",
    blurb:
      "Start here to understand what really happens when a new opportunity appears, how work gets kicked off, and where the current process is structured versus improvised.",
    children: [
      {
        id: "intake-top",
        title: "Top-level opener",
        questions: [
          "Walk me through what actually happens when a new opportunity comes in.",
        ],
      },
      {
        id: "intake-followups",
        title: "Follow-up questions",
        questions: [
          "Who usually becomes aware of the opportunity first, and what happens next?",
          "What are the first two or three steps your team takes once you decide it is worth pursuing?",
          "Where does the process feel well defined versus more informal or person-dependent?",
          "How different is the process for a quick-turn request versus a more strategic bid?",
          "Do different proposal types follow meaningfully different paths, or is it mostly one shared process?",
        ],
      },
      {
        id: "intake-branch-types",
        title: "Branch: Proposal / response types",
        questions: [
          "What kinds of responses are you producing most often right now: full proposals, RFIs, questionnaires, task orders, grants, or a mix?",
          "Which of those feel most repeatable, and which feel the most bespoke?",
          "Which type causes the most operational friction for your team?",
        ],
      },
      {
        id: "intake-branch-timing",
        title: "Branch: Timing and pressure",
        questions: [
          "What does a normal turnaround timeline look like for your team?",
          "At what point does time pressure start to change how the team works?",
          "When timelines get compressed, what gets skipped, rushed, or handled differently?",
        ],
      },
    ],
  },
  {
    id: "pain-friction",
    title: "2. Friction, Bottlenecks & Manual Pain",
    blurb:
      "Use this branch to identify where the process slows down, where the team gets stuck, and which manual steps create the most drag.",
    children: [
      {
        id: "pain-top",
        title: "Top-level opener",
        questions: [
          "Where do things usually slow down or get frustrating for your team?",
        ],
      },
      {
        id: "pain-followups",
        title: "Follow-up questions",
        questions: [
          "Which step tends to create the most rework or repeated effort?",
          "Where do handoffs break down most often?",
          "What creates the most mental overhead for the people doing the work?",
          "What do people on the team complain about most often when they are under deadline pressure?",
          "Which part of the process feels heavier than it should be for the value it adds?",
        ],
      },
      {
        id: "pain-branch-review",
        title: "Branch: Review cycle friction",
        questions: [
          "How do review comments usually come back today?",
          "What is difficult about consolidating comments or deciding what to accept?",
          "Where do review cycles add value, and where do they add delay without much benefit?",
          "How often do you end up with conflicting feedback from different reviewers?",
        ],
      },
      {
        id: "pain-branch-sme",
        title: "Branch: SME bottlenecks",
        questions: [
          "How easy or difficult is it to get timely input from SMEs?",
          "What kind of input do SMEs tend to provide: full drafts, rough notes, verbal guidance, or edits to existing content?",
          "If SME input arrives late, what downstream impact does that usually create?",
        ],
      },
      {
        id: "pain-branch-compliance",
        title: "Branch: Compliance / requirement tracking",
        questions: [
          "How do you currently identify and track requirements that must be answered?",
          "Where does compliance checking feel strongest today, and where does it still feel risky?",
          "How much manual work goes into requirement extraction, matrices, or final checks?",
        ],
      },
    ],
  },
  {
    id: "content-library",
    title: "3. Content Reuse, Library & Source-of-Truth",
    blurb:
      "Use this branch to understand how the team reuses prior material, how content is organised, and whether people trust what they find.",
    children: [
      {
        id: "content-top",
        title: "Top-level opener",
        questions: [
          "How are you currently reusing content from past proposals?",
        ],
      },
      {
        id: "content-followups",
        title: "Follow-up questions",
        questions: [
          "Where does your best source content live today?",
          "How easy is it for the team to find the right version of something when they need it?",
          "How much confidence do people have that the content they find is current and approved?",
          "What types of content are easiest to reuse, and which types still get rebuilt from scratch?",
          "How much of the team’s time goes into finding content versus tailoring it?",
        ],
      },
      {
        id: "content-branch-structure",
        title: "Branch: Content organisation",
        questions: [
          "Is your content organised mainly by folders, metadata, naming conventions, or a mix?",
          "Who maintains the content structure or decides what should be kept as source material?",
          "What kinds of duplicates, outdated material, or competing versions tend to build up over time?",
        ],
      },
      {
        id: "content-branch-proof",
        title: "Branch: Evidence and past performance",
        questions: [
          "How are case studies, past performance examples, or proof points maintained today?",
          "What is the current process for updating those examples when new work is completed?",
          "Where do teams struggle most when trying to match the right example to the right opportunity?",
        ],
      },
      {
        id: "content-branch-template",
        title: "Branch: Templates and outputs",
        questions: [
          "How are templates managed today for proposals, RFIs, or review artifacts?",
          "Where do formatting requirements create extra manual work?",
          "Which output or document production steps feel more manual than they should?",
        ],
      },
    ],
  },
  {
    id: "roles-collaboration",
    title: "4. Roles, Collaboration & Review Handoffs",
    blurb:
      "Use this branch to understand who writes, who reviews, who approves, and how work moves between those people.",
    children: [
      {
        id: "roles-top",
        title: "Top-level opener",
        questions: [
          "Who actually writes vs reviews vs approves, and how does that handoff work?",
        ],
      },
      {
        id: "roles-followups",
        title: "Follow-up questions",
        questions: [
          "Who is typically responsible for coordinating the overall response?",
          "Who is responsible for drafting core content, and who is responsible for refining or editing it?",
          "Where are responsibilities clear, and where do they blur together?",
          "How does the team know who owes what by when?",
          "What happens when one person becomes the bottleneck?",
        ],
      },
      {
        id: "roles-branch-model",
        title: "Branch: Writing model",
        questions: [
          "Would you describe your model as writer-led, SME-led, or more distributed?",
          "How much does final quality depend on a small number of individuals?",
          "If a key person were unavailable for a week, what part of the process would feel most exposed?",
        ],
      },
      {
        id: "roles-branch-reviews",
        title: "Branch: Review design",
        questions: [
          "Do you run structured review stages or more ad hoc review loops?",
          "How do you prepare reviewers so they know what they are meant to focus on?",
          "How do you close the loop after review and confirm what changed?",
        ],
      },
      {
        id: "roles-branch-adoption",
        title: "Branch: Working style and adoption",
        questions: [
          "Which parts of the team are most open to changing the current process, and which parts are more hesitant?",
          "Where would a new workflow need to fit around existing habits rather than replace them?",
          "What kind of support would make adoption feel realistic rather than burdensome?",
        ],
      },
    ],
  },
  {
    id: "priorities-outcomes",
    title: "5. Priorities, Success Criteria & Next-Step Focus",
    blurb:
      "Use this branch to force prioritisation, identify the most valuable near-term improvement, and shape what the workshop or ALP should focus on first.",
    children: [
      {
        id: "priority-top",
        title: "Top-level opener",
        questions: [
          "If we could fix one thing in the next 60 to 90 days, what would make the biggest difference?",
        ],
      },
      {
        id: "priority-followups",
        title: "Follow-up questions",
        questions: [
          "Why is that the highest priority right now?",
          "What would success look like in practical terms for the team?",
          "How would you know this issue is actually improving?",
          "If we focused there first, what downstream benefits would you expect to see?",
          "What should we not try to change yet because it is working well enough today?",
        ],
      },
      {
        id: "priority-branch-speed",
        title: "Branch: If the priority is speed",
        questions: [
          "Which specific part of the timeline do you most want to compress?",
          "What currently prevents you from getting to a strong first draft faster?",
          "Where would faster output help most: intake, drafting, review, or finalisation?",
        ],
      },
      {
        id: "priority-branch-quality",
        title: "Branch: If the priority is quality",
        questions: [
          "Where does quality feel inconsistent today?",
          "Is the bigger issue structure, tone, evidence, compliance, or review rigor?",
          "What kind of quality improvement would matter most to leadership or the bid team?",
        ],
      },
      {
        id: "priority-branch-training",
        title: "Branch: If the priority is adoption or enablement",
        questions: [
          "What does the team need more of right now: process clarity, hands-on training, better prompts, or better source material?",
          "Which user group would benefit most from targeted enablement first?",
          "What would make the next training or workshop feel immediately useful rather than theoretical?",
        ],
      },
    ],
  },
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
      const blurbMatch = node.blurb?.toLowerCase().includes(q);
      const questionMatch = (node.questions || []).some((x) => x.toLowerCase().includes(q));
      const filteredChildren = node.children ? filterTree(node.children, query) : [];

      if (titleMatch || blurbMatch || questionMatch || filteredChildren.length) {
        return {
          ...node,
          children: filteredChildren,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function NodeCard({ node, depth = 0, expanded, onToggle, highlight }) {
  const isExpanded = expanded.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={`rounded-2xl border bg-white shadow-sm transition-all ${
          highlight ? "border-slate-900 shadow-md" : "border-slate-200"
        }`}
        style={{ marginLeft: depth * 16 }}
      >
        <div className="flex items-start gap-3 p-4 md:p-5">
          {hasChildren ? (
            <button
              onClick={() => onToggle(node.id)}
              className="mt-0.5 rounded-xl border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div className="mt-0.5 rounded-xl border border-transparent p-1.5 text-slate-300">
              <MessageSquareMore className="h-4 w-4" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 md:text-base">{node.title}</h3>
              {node.questions && node.questions.length > 0 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {node.questions.length} question{node.questions.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {node.blurb && <p className="mt-2 text-sm leading-6 text-slate-600">{node.blurb}</p>}

            {node.questions && node.questions.length > 0 && (
              <div className="mt-3 space-y-2">
                {node.questions.map((question, idx) => (
                  <div key={idx} className="rounded-xl bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-800">
                    {question}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-3 space-y-3">
          {node.children.map((child) => (
            <NodeCard
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              highlight={highlight}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CSMDiscussionGuide() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(() => new Set(discussionTree.map((x) => x.id)));

  const filtered = useMemo(() => filterTree(discussionTree, query), [query]);
  const allFilteredIds = useMemo(() => collectIds(filtered), [filtered]);

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(allFilteredIds));
  const collapseToTop = () => {
    setExpanded(new Set());
  };
  const resetSearch = () => setQuery("");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-6 p-6 md:grid-cols-[1.4fr,0.9fr] md:p-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                <Layers3 className="h-3.5 w-3.5" />
                Interactive CSM Discussion Guide
              </div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
                Proposal Workflow Diagnostic Question Tree
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
                Use this as a live conversation guide during discovery calls. Expand one area, probe as needed,
                then collapse back to the top-level outline and move to a different topic. The goal is to surface
                workflow reality, pain points, collaboration patterns, and priorities that can later inform a
                workshop design and Advanced Learning Plan.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">How to use this in the meeting</div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <p>Start with a top-level opener, then expand only the branches that feel relevant.</p>
                <p>Do not try to ask everything. Follow the client’s signal and capture the transcript.</p>
                <p>Use the search bar to jump quickly to topics like review, SMEs, compliance, or library.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics or questions"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={expandAll}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Expand all
            </button>
            <button
              onClick={collapseToTop}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Collapse to top level
            </button>
            <button
              onClick={resetSearch}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              expanded={expanded}
              onToggle={toggle}
              highlight={!!query.trim()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
