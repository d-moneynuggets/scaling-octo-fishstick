import React, { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Search } from "lucide-react";

const discussionTree = [
  {
    id: "opportunity-intake",
    title: "1. Opportunity Intake & Workflow Reality",
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
          "Who usually becomes aware of the opportunity first?",
          "What are the first steps once you decide to pursue?",
          "Where is the process structured vs informal?",
        ],
      },
    ],
  },
  {
    id: "pain",
    title: "2. Friction & Bottlenecks",
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
          "Where do handoffs break down?",
          "What creates the most rework?",
          "What do people complain about most?",
        ],
      },
    ],
  },
  {
    id: "content",
    title: "3. Content & Library",
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
          "Where does your best content live?",
          "How easy is it to find?",
          "How confident are people in it?",
        ],
      },
    ],
  },
  {
    id: "roles",
    title: "4. Roles & Collaboration",
    children: [
      {
        id: "roles-top",
        title: "Top-level opener",
        questions: [
          "Who writes vs reviews vs approves, and how does that handoff work?",
        ],
      },
      {
        id: "roles-followups",
        title: "Follow-up questions",
        questions: [
          "Where are responsibilities unclear?",
          "Who becomes the bottleneck?",
          "How are deadlines tracked?",
        ],
      },
    ],
  },
  {
    id: "priority",
    title: "5. Priorities",
    children: [
      {
        id: "priority-top",
        title: "Top-level opener",
        questions: [
          "If we could fix one thing in the next 60–90 days, what would matter most?",
        ],
      },
    ],
  },
];

function Node({ node, expanded, toggle }) {
  const isExpanded = expanded.has(node.id);

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        onClick={() => toggle(node.id)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {node.children && (isExpanded ? "▼ " : "▶ ")}
        {node.title}
      </div>

      {node.questions &&
        node.questions.map((q, i) => (
          <div key={i} style={{ marginLeft: 20, marginTop: 5 }}>
            • {q}
          </div>
        ))}

      {node.children &&
        isExpanded &&
        node.children.map((child) => (
          <Node
            key={child.id}
            node={child}
            expanded={expanded}
            toggle={toggle}
          />
        ))}
    </div>
  );
}

export default function CSMDiscussionGuide() {
  const [expanded, setExpanded] = useState(new Set());

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const collapseAll = () => {
    setExpanded(new Set());
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>CSM Discussion Guide</h1>

      <button onClick={collapseAll} style={{ marginBottom: 20 }}>
        Collapse to top level
      </button>

      {discussionTree.map((node) => (
        <Node
          key={node.id}
          node={node}
          expanded={expanded}
          toggle={toggle}
        />
      ))}
    </div>
  );
}
