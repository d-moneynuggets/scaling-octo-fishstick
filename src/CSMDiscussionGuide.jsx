import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Workflow,
  Compass,
  Library,
  Users,
  Target,
} from "lucide-react";

const styles = {
  bg: "#F2F1F4",
  card: "#FFFFFF",
  ink: "#120F0D",
  muted: "#60606B",
  border: "#D9D8DE",
  purple: "#6D39F8",
  purpleSoft: "#ECE8FF",
  lime: "#D6EA8A",
  chipBg: "#FAFAFC",
};

<style>{`
  @media print {
    .no-print {
      display: none !important;
    }

    body {
      background: white !important;
    }

    .print-card {
      box-shadow: none !important;
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`}</style>

const ROUTES = {
  CONTENT: ["finding_content", "starting_from_scratch", "version_control"],
  SME: ["sme_delays"],
  REVIEW: ["review_comments", "ownership_coordination"],
  COMPLIANCE: ["requirement_tracking"],
  PRODUCTION: ["formatting_final_assembly"],
  RFI: ["rfi_questionnaires"],
};

function otherField(key, label = "Add detail (optional)") {
  return { key, label, placeholder: "Type here..." };
}

const questions = [
  {
    id: "company_name",
    type: "text",
    title: "What should we call your team or company?",
    helper: "Optional, but helpful for tailoring your session.",
    optional: true,
    placeholder: "Type your company or team name",
    icon: Sparkles,
  },
  {
    id: "work_type",
    type: "multi",
    title: "What type of work do you primarily produce?",
    helper: "Choose all that apply.",
    icon: Workflow,
    options: [
      { value: "federal", label: "Federal / government proposals" },
      { value: "commercial", label: "Commercial / B2B proposals" },
      { value: "rfi_questionnaires", label: "RFIs / questionnaires / DDQs" },
      { value: "grants", label: "Grants / funding applications" },
      { value: "other", label: "Other" },
    ],
    other: otherField("work_type_other"),
  },
  {
    id: "process_structure",
    type: "single",
    title: "How would you describe your current process?",
    icon: Workflow,
    options: [
      { value: "highly_structured", label: "Highly structured and repeatable" },
      { value: "somewhat_structured", label: "Somewhat structured, but varies" },
      { value: "mostly_adhoc", label: "Mostly ad hoc" },
      { value: "depends", label: "It depends on the opportunity" },
    ],
  },
  {
    id: "top_outcomes",
    type: "multi",
    title: "What matters most right now?",
    helper: "Choose up to 2.",
    icon: Target,
    max: 2,
    options: [
      { value: "speed", label: "Faster turnaround" },
      { value: "quality", label: "Better quality" },
      { value: "compliance", label: "Better compliance" },
      { value: "teamwork", label: "Better teamwork and review flow" },
      { value: "reuse", label: "Better reuse of content" },
      { value: "enablement", label: "Better onboarding / enablement" },
      { value: "other", label: "Other" },
    ],
    other: otherField("top_outcomes_other"),
  },
  {
    id: "writing_model",
    type: "single",
    title: "How does most of the writing happen today?",
    icon: Users,
    options: [
      { value: "dedicated_writers", label: "Dedicated writers draft most content" },
      { value: "smes_write_edit", label: "SMEs draft and someone edits" },
      { value: "distributed", label: "Writing is distributed across the team" },
      { value: "varies", label: "It varies" },
    ],
  },
  {
    id: "new_opportunity",
    type: "single",
    title: "What usually happens when a new opportunity comes in?",
    icon: Workflow,
    options: [
      { value: "formal_kickoff", label: "There is a formal intake or kickoff" },
      { value: "informal_coordination", label: "There is an informal review and someone starts organizing" },
      { value: "one_person_drives", label: "One person usually picks it up and gets going" },
      { value: "varies", label: "It varies case by case" },
    ],
  },
  {
    id: "workflow_defined",
    type: "multi",
    title: "Which parts of your workflow feel well defined?",
    helper: "Choose all that apply.",
    icon: Workflow,
    options: [
      { value: "intake", label: "Intake / kickoff" },
      { value: "requirements", label: "Requirement review" },
      { value: "drafting", label: "Drafting" },
      { value: "sme_input", label: "SME input" },
      { value: "review_cycles", label: "Review cycles" },
      { value: "final_production", label: "Final production" },
      { value: "post_submission", label: "Post-submission review" },
      { value: "other", label: "Other" },
    ],
    other: otherField("workflow_defined_other"),
  },
  {
    id: "friction_points",
    type: "multi",
    title: "Where do you feel the most friction today?",
    helper: "Choose up to 4.",
    icon: Compass,
    max: 4,
    options: [
      { value: "finding_content", label: "Finding the right content" },
      { value: "starting_from_scratch", label: "Starting from scratch" },
      { value: "sme_delays", label: "SME delays" },
      { value: "review_comments", label: "Review comments" },
      { value: "requirement_tracking", label: "Requirement tracking" },
      { value: "formatting_final_assembly", label: "Formatting / final assembly" },
      { value: "version_control", label: "Version control" },
      { value: "ownership_coordination", label: "Ownership / coordination" },
      { value: "training_onboarding", label: "Training / onboarding" },
      { value: "other", label: "Other" },
    ],
    other: otherField("friction_points_other"),
  },
  {
    id: "urgent_issue",
    type: "derived-single",
    title: "Which of these is the most urgent to improve?",
    icon: Compass,
    deriveFrom: "friction_points",
  },
  {
    id: "content_location",
    branch: "content",
    type: "single",
    title: "Where does your content live today?",
    icon: Library,
    options: [
      { value: "sharepoint", label: "SharePoint" },
      { value: "google_drive", label: "Google Drive" },
      { value: "shared_folders", label: "Shared folders" },
      { value: "multiple_places", label: "Multiple places" },
      { value: "no_clear_source", label: "No clear source of truth" },
      { value: "other", label: "Other" },
    ],
    other: otherField("content_location_other"),
  },
  {
    id: "content_findability",
    branch: "content",
    type: "single",
    title: "How easy is it to find the right version of content?",
    icon: Library,
    options: [
      { value: "easy", label: "Very easy" },
      { value: "manageable", label: "Usually manageable" },
      { value: "difficult", label: "Often difficult" },
      { value: "very_difficult", label: "Very difficult" },
    ],
  },
  {
    id: "sme_input_type",
    branch: "sme",
    type: "multi",
    title: "How do SMEs usually provide input?",
    helper: "Choose all that apply.",
    icon: Users,
    options: [
      { value: "draft_text", label: "Draft text" },
      { value: "comments", label: "Comments" },
      { value: "bullet_points", label: "Bullet points" },
      { value: "verbal", label: "Verbal explanation" },
      { value: "meetings", label: "Meetings / interviews" },
      { value: "inconsistent", label: "It varies widely" },
      { value: "other", label: "Other" },
    ],
    other: otherField("sme_input_type_other"),
  },
  {
    id: "sme_input_late",
    branch: "sme",
    type: "single",
    title: "What usually happens when SME input is late?",
    icon: Users,
    options: [
      { value: "delays_everything", label: "It delays the whole process" },
      { value: "someone_fills_gap", label: "Someone else fills the gap" },
      { value: "quality_drops", label: "Quality drops" },
      { value: "workarounds", label: "We work around it as best we can" },
      { value: "other", label: "Other" },
    ],
    other: otherField("sme_input_late_other"),
  },
  {
    id: "review_challenges",
    branch: "review",
    type: "multi",
    title: "What’s hardest about reviews?",
    helper: "Choose up to 2.",
    icon: Users,
    max: 2,
    options: [
      { value: "too_many_comments", label: "Too many comments" },
      { value: "conflicting_feedback", label: "Conflicting feedback" },
      { value: "slow_turnaround", label: "Slow reviewer turnaround" },
      { value: "hard_to_decide", label: "Hard to decide what to accept" },
      { value: "tracking_status", label: "Tracking status" },
      { value: "other", label: "Other" },
    ],
    other: otherField("review_challenges_other"),
  },
  {
    id: "requirement_method",
    branch: "compliance",
    type: "single",
    title: "How do you currently identify requirements that must be answered?",
    icon: Target,
    options: [
      { value: "formal_matrix", label: "Formal compliance matrix or equivalent" },
      { value: "manual_review", label: "Manual review of the source document" },
      { value: "mixed", label: "A mix of both" },
      { value: "no_consistent_method", label: "No consistent method" },
      { value: "other", label: "Other" },
    ],
    other: otherField("requirement_method_other"),
  },
  {
    id: "compliance_confidence",
    branch: "compliance",
    type: "single",
    title: "How confident are you that requirements are fully tracked today?",
    icon: Target,
    options: [
      { value: "very_confident", label: "Very confident" },
      { value: "mostly_confident", label: "Mostly confident" },
      { value: "somewhat_confident", label: "Somewhat confident" },
      { value: "not_confident", label: "Not confident" },
    ],
  },
  {
    id: "production_manual_steps",
    branch: "production",
    type: "multi",
    title: "Which final production steps feel more manual than they should?",
    helper: "Choose all that apply.",
    icon: Workflow,
    options: [
      { value: "template_setup", label: "Template setup" },
      { value: "formatting", label: "Formatting" },
      { value: "copy_paste", label: "Copy/paste into final docs" },
      { value: "portal_entry", label: "Portal entry" },
      { value: "packaging", label: "Final packaging" },
      { value: "other", label: "Other" },
    ],
    other: otherField("production_manual_steps_other"),
  },
  {
    id: "rfi_hardest",
    branch: "rfi",
    type: "multi",
    title: "What’s hardest about those workflows?",
    helper: "Choose up to 2.",
    icon: Workflow,
    max: 2,
    options: [
      { value: "finding_answers", label: "Finding answers quickly" },
      { value: "consistency", label: "Maintaining consistency across answers" },
      { value: "format_limits", label: "Character or format limits" },
      { value: "reviewer_delays", label: "Reviewer delays" },
      { value: "reuse", label: "Reuse of prior responses" },
      { value: "other", label: "Other" },
    ],
    other: otherField("rfi_hardest_other"),
  },
  {
    id: "support_needs",
    type: "multi",
    title: "What would help your team most right now?",
    helper: "Choose up to 2.",
    icon: Target,
    max: 2,
    options: [
      { value: "clearer_workflow", label: "A clearer overall workflow" },
      { value: "content_org", label: "Better content organization" },
      { value: "platform_usage", label: "Better use of the platform" },
      { value: "collaboration", label: "Better collaboration and review flow" },
      { value: "compliance_support", label: "Better compliance support" },
      { value: "prompts", label: "Better prompts or examples" },
      { value: "training", label: "Better training for different roles" },
      { value: "other", label: "Other" },
    ],
    other: otherField("support_needs_other"),
  },
  {
    id: "change_readiness",
    type: "single",
    title: "How ready is your team to adopt changes?",
    icon: Users,
    options: [
      { value: "very_ready", label: "Very ready" },
      { value: "cautious", label: "Open, but cautious" },
      { value: "mixed", label: "Mixed" },
      { value: "resistant", label: "Change-resistant" },
    ],
  },
  {
    id: "success_60_90",
    type: "text",
    title: "If this goes well, what should feel better in 60–90 days?",
    helper: "Optional.",
    optional: true,
    placeholder: "Add detail (optional)",
    icon: Sparkles,
  },
];

function getVisibleQuestions(answers) {
  const visible = [];
  const friction = answers.friction_points || [];
  const workType = answers.work_type || [];

  for (const q of questions) {
    if (!q.branch) {
      visible.push(q);
      continue;
    }

    if (q.branch === "content" && friction.some((x) => ROUTES.CONTENT.includes(x))) visible.push(q);
    if (q.branch === "sme" && friction.some((x) => ROUTES.SME.includes(x))) visible.push(q);
    if (q.branch === "review" && friction.some((x) => ROUTES.REVIEW.includes(x))) visible.push(q);
    if (q.branch === "compliance" && (friction.some((x) => ROUTES.COMPLIANCE.includes(x)) || workType.some((x) => ["federal", "grants"].includes(x)))) visible.push(q);
    if (q.branch === "production" && (friction.some((x) => ROUTES.PRODUCTION.includes(x)) || answers.top_outcomes?.includes("speed"))) visible.push(q);
    if (q.branch === "rfi" && workType.some((x) => ["rfi_questionnaires"].includes(x))) visible.push(q);
  }

  return visible;
}

function getUrgentOptions(answers) {
  const selected = answers.friction_points || [];
  const optionMap = Object.fromEntries(
    (questions.find((q) => q.id === "friction_points")?.options || []).map((opt) => [opt.value, opt.label])
  );
  return selected
    .filter((x) => x !== "other")
    .map((value) => ({ value, label: optionMap[value] || value }));
}

function isAnswered(question, answers) {
  const value = answers[question.id];
  if (question.type === "text") return question.optional ? true : Boolean(value?.trim());
  if (question.type === "single") return Boolean(value);
  if (question.type === "derived-single") return Boolean(value);
  if (question.type === "multi") return Array.isArray(value) && value.length > 0;
  return false;
}

function shouldShowOtherField(question, answers) {
  if (!question.other) return false;
  const value = answers[question.id];
  if (Array.isArray(value)) return value.includes("other");
  return value === "other";
}

function cardClass(selected) {
  return selected
    ? "border-[#6D39F8] bg-[#ECE8FF] text-[#120F0D] shadow-sm"
    : "border-[#D9D8DE] bg-white text-[#120F0D] hover:border-[#BDBBC7] hover:bg-[#FAFAFC]";
}

function ProgressBar({ current, total }) {
  const pct = Math.max(6, Math.round((current / total) * 100));
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#60606B]">
        <span>Progress</span>
        <span>{current} of {total}</span>
      </div>
      <div className="h-2 rounded-full bg-[#E7E7EC]">
        <div
          className="h-2 rounded-full bg-[#6D39F8] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OptionCard({ label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${cardClass(selected)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-medium leading-6">{label}</div>
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            selected ? "border-[#6D39F8] bg-[#6D39F8] text-white" : "border-[#C9C8D1] bg-white text-transparent"
          }`}
        >
          <Check className="h-3 w-3" />
        </div>
      </div>
      <div className="mt-2 text-xs text-[#60606B]">{multi ? "Tap to add or remove" : "Tap to select"}</div>
    </button>
  );
}

function QuestionRenderer({ question, answers, setAnswer }) {
  const Icon = question.icon || Sparkles;

  const options = useMemo(() => {
    if (question.type === "derived-single") return getUrgentOptions(answers);
    return question.options || [];
  }, [question, answers]);

  const value = answers[question.id] || (question.type === "multi" ? [] : "");

  return (
    <div className="rounded-[28px] border border-[#D9D8DE] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ECE8FF] px-3 py-1.5 text-xs font-semibold text-[#6D39F8]">
        <Icon className="h-3.5 w-3.5" />
        Pre-Workshop Diagnostic
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-[#120F0D] md:text-[2rem]">{question.title}</h2>
      {question.helper && <p className="mt-3 text-sm leading-6 text-[#60606B]">{question.helper}</p>}

      {question.type === "text" && (
        <div className="mt-6">
          <input
            value={value}
            onChange={(e) => setAnswer(question.id, e.target.value)}
            placeholder={question.placeholder || "Type here..."}
            className="w-full rounded-2xl border border-[#D9D8DE] bg-[#FAFAFC] px-4 py-4 text-sm outline-none transition placeholder:text-[#9A9AA4] focus:border-[#6D39F8]"
          />
        </div>
      )}

      {(question.type === "single" || question.type === "derived-single") && (
        <div className="mt-6 grid gap-3">
          {options.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={value === option.value}
              onClick={() => setAnswer(question.id, option.value)}
              multi={false}
            />
          ))}
          {shouldShowOtherField(question, answers) && (
            <input
              value={answers[question.other.key] || ""}
              onChange={(e) => setAnswer(question.other.key, e.target.value)}
              placeholder={question.other.placeholder}
              className="rounded-2xl border border-[#D9D8DE] bg-[#FAFAFC] px-4 py-4 text-sm outline-none transition placeholder:text-[#9A9AA4] focus:border-[#6D39F8]"
            />
          )}
        </div>
      )}

      {question.type === "multi" && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {options.map((option) => {
            const selected = value.includes(option.value);
            const atLimit = question.max && value.length >= question.max && !selected;
            return (
              <button
                key={option.value}
                type="button"
                disabled={atLimit}
                onClick={() => {
                  const next = selected
                    ? value.filter((x) => x !== option.value)
                    : [...value, option.value];
                  setAnswer(question.id, next);
                }}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${cardClass(selected)} ${atLimit ? "cursor-not-allowed opacity-45" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-medium leading-6">{option.label}</div>
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected ? "border-[#6D39F8] bg-[#6D39F8] text-white" : "border-[#C9C8D1] bg-white text-transparent"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                </div>
              </button>
            );
          })}
          {shouldShowOtherField(question, answers) && (
            <div className="md:col-span-2">
              <input
                value={answers[question.other.key] || ""}
                onChange={(e) => setAnswer(question.other.key, e.target.value)}
                placeholder={question.other.placeholder}
                className="w-full rounded-2xl border border-[#D9D8DE] bg-[#FAFAFC] px-4 py-4 text-sm outline-none transition placeholder:text-[#9A9AA4] focus:border-[#6D39F8]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatValue(question, answers) {
  const value = answers[question.id];
  if (!value || (Array.isArray(value) && value.length === 0)) return "—";

  const optionMap = Object.fromEntries((question.options || []).map((opt) => [opt.value, opt.label]));

  if (Array.isArray(value)) {
    const labels = value.map((v) => {
      if (v === "other" && question.other) {
        const otherText = answers[question.other.key]?.trim();
        return otherText ? `Other: ${otherText}` : "Other";
      }
      return optionMap[v] || v;
    });
    return labels.join(", ");
  }

  if (value === "other" && question.other) {
    const otherText = answers[question.other.key]?.trim();
    return otherText ? `Other: ${otherText}` : "Other";
  }

  return optionMap[value] || value;
}

function getEmailPreview(visibleQuestions, answers) {
  return visibleQuestions
    .map((q) => `${q.title}\n${formatValue(q, answers)}`)
    .join("\n\n");
}

function getInstantInsights(answers) {
  const insights = [];
  const workType = answers.work_type || [];
  const friction = answers.friction_points || [];
  const outcomes = answers.top_outcomes || [];
  const process = answers.process_structure || "";
  const writingModel = answers.writing_model || "";
  const readiness = answers.change_readiness || "";

  if (process === "mostly_adhoc" || process === "depends") {
    insights.push({
      title: "Process clarity may need attention",
      body: "The workflow appears to vary meaningfully by opportunity. A session that maps the current process and identifies where structure would help most is likely to add value quickly.",
    });
  }

  if (friction.includes("finding_content") || friction.includes("starting_from_scratch") || friction.includes("version_control")) {
    insights.push({
      title: "Content reuse looks like a meaningful opportunity",
      body: "There are signs the team may be spending more time than necessary finding, validating, or rebuilding source content.",
    });
  }

  if (friction.includes("sme_delays") || writingModel === "smes_write_edit" || writingModel === "distributed") {
    insights.push({
      title: "SME collaboration may be shaping delivery speed",
      body: "Subject matter expert input likely has a major impact on pace and consistency. Clarifying contribution methods and handoffs may reduce drag.",
    });
  }

  if (friction.includes("review_comments") || friction.includes("ownership_coordination")) {
    insights.push({
      title: "Review flow may be creating avoidable friction",
      body: "Review cycles, comment consolidation, or ownership visibility may be slowing the process more than necessary.",
    });
  }

  if (workType.some((x) => ["federal", "grants"].includes(x)) || friction.includes("requirement_tracking") || outcomes.includes("compliance")) {
    insights.push({
      title: "Compliance support may be a priority area",
      body: "Requirements tracking, compliance confidence, or structured validation appear important enough to emphasize in follow-up planning.",
    });
  }

  if (outcomes.includes("speed") || friction.includes("formatting_final_assembly")) {
    insights.push({
      title: "Turnaround time likely matters",
      body: "There may be an opportunity to reduce cycle time by improving drafting, handoff, or final production steps.",
    });
  }

  if (readiness === "cautious" || readiness === "mixed" || readiness === "resistant") {
    insights.push({
      title: "Adoption may need a pragmatic approach",
      body: "The team may benefit from practical, role-specific changes rather than a large process reset.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      title: "Your responses provide a strong starting point",
      body: "The diagnostic suggests a relatively stable baseline, which will help focus the session on targeted improvements rather than broad discovery.",
    });
  }

  return insights.slice(0, 3);
}

function getALPPreview(answers) {
  const workType = answers.work_type || [];
  const friction = answers.friction_points || [];
  const outcomes = answers.top_outcomes || [];
  const support = answers.support_needs || [];
  const urgent = answers.urgent_issue || "";

  const focusAreas = [];

  if (friction.includes("finding_content") || friction.includes("starting_from_scratch") || friction.includes("version_control")) {
    focusAreas.push("Content organization and reuse workflow");
  }
  if (friction.includes("sme_delays")) {
    focusAreas.push("SME contribution model and handoff design");
  }
  if (friction.includes("review_comments") || friction.includes("ownership_coordination")) {
    focusAreas.push("Review cycle structure and ownership clarity");
  }
  if (friction.includes("requirement_tracking") || workType.some((x) => ["federal", "grants"].includes(x))) {
    focusAreas.push("Requirements tracking and compliance confidence");
  }
  if (friction.includes("formatting_final_assembly") || outcomes.includes("speed")) {
    focusAreas.push("Production efficiency and turnaround reduction");
  }
  if (support.includes("training") || support.includes("platform_usage") || support.includes("prompts")) {
    focusAreas.push("Targeted enablement, prompts, and role-based guidance");
  }

  const uniqueFocusAreas = [...new Set(focusAreas)].slice(0, 4);

  const objectives = [
    urgent ? `Address the most urgent issue identified: ${urgent.replaceAll("_", " ")}.` : "Prioritize the highest-friction area surfaced in the diagnostic.",
    outcomes.includes("speed") ? "Reduce cycle time by identifying where work can be standardized or accelerated." : "Clarify where workflow improvements can reduce drag.",
    outcomes.includes("quality") || outcomes.includes("compliance") ? "Improve confidence in quality, consistency, and response rigor." : "Increase consistency across the response process.",
  ];

  const recommendations = [
    uniqueFocusAreas[0] ? `Start the session with a focused discussion on ${uniqueFocusAreas[0].toLowerCase()}.` : "Start with a focused discussion on the most time-consuming step in the current workflow.",
    "Use one or two recent live examples to ground the discussion in real work.",
    "Translate findings into a practical follow-up plan with specific owners or next steps.",
  ];

  return {
    title: answers.company_name ? `Draft ALP for ${answers.company_name}` : "Draft Advanced Learning Plan",
    objectives,
    focusAreas: uniqueFocusAreas.length ? uniqueFocusAreas : ["Workflow mapping", "Role-based enablement", "Targeted process improvements"],
    recommendations,
  };
}

export default function CSMDiscussionGuide() {
  const CONTACT_EMAIL = "derek.gatlin@autogenai.com";
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [maxStepsSeen, setMaxStepsSeen] = useState(questions.length);

  const visibleQuestions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const currentQuestion = visibleQuestions[currentIndex];
  const emailPreview = useMemo(() => getEmailPreview(visibleQuestions, answers), [visibleQuestions, answers]);
  const instantInsights = useMemo(() => getInstantInsights(answers), [answers]);
  const alpPreview = useMemo(() => getALPPreview(answers), [answers]);

  useEffect(() => {
    setMaxStepsSeen((prev) => Math.max(prev, visibleQuestions.length));
  }, [visibleQuestions.length]);

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const canContinue = currentQuestion ? isAnswered(currentQuestion, answers) : false;
  const isLast = currentIndex === visibleQuestions.length - 1;

  const next = () => {
    if (isLast) {
      setSubmitted(true);
      return;
    }
    setCurrentIndex((prev) => Math.min(prev + 1, visibleQuestions.length - 1));
  };

  const back = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handlePrint = () => {
  window.print();
  };
  if (submitted) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] px-4 py-10">
      <style>{`
  @media print {
    .no-print {
      display: none !important;
    }

    body {
      background: white !important;
    }

    .print-card {
      box-shadow: none !important;
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`}</style>

          .print-card {
            box-shadow: none !important;
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="mx-auto max-w-4xl rounded-[30px] border border-[#D9D8DE] bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ECE8FF] px-3 py-1.5 text-xs font-semibold text-[#6D39F8]">
          <Sparkles className="h-3.5 w-3.5" />
          Diagnostic summary ready
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Your diagnostic{answers.company_name ? ` for ${answers.company_name}` : ""} is ready
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60606B]">
          This summary captures your inputs and highlights key themes to support a focused follow-up discussion.
        </p>

        {/* IMPORTANT: NOT STORED NOTE */}
        <div className="mt-6 rounded-3xl border border-[#D9D8DE] bg-[#FAFAFC] p-5 print-card">
          <div className="mb-2 text-sm font-semibold text-[#120F0D]">Save and send your results</div>

          <p className="text-sm leading-6 text-[#60606B]">
            Your responses are not stored in this tool. To keep a copy of your results, please save this page as a PDF and then open the pre-filled email draft below to send the summary to <span className="font-semibold text-[#120F0D]">{CONTACT_EMAIL}</span>.
          </p>

          <p className="mt-3 text-sm leading-6 text-[#60606B]">
            If you leave or refresh this page before saving or emailing, your responses will be cleared.
          </p>
        </div>

        {/* INSIGHTS */}
        <div className="mt-6 rounded-3xl border border-[#D9D8DE] bg-[#FAFAFC] p-5 print-card">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">
            3 instant insights
          </div>

          <div className="space-y-3">
            {instantInsights.map((insight, index) => (
              <div key={index} className="rounded-2xl border border-[#E7E7EC] bg-white p-4">
                <div className="text-sm font-semibold text-[#120F0D]">
                  {index + 1}. {insight.title}
                </div>
                <div className="mt-1 text-sm leading-6 text-[#60606B]">
                  {insight.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALP */}
        <div className="mt-6 rounded-3xl border border-[#D9D8DE] bg-[#FAFAFC] p-5 print-card">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">
            Draft Advanced Learning Plan
          </div>

          <div className="rounded-2xl border border-[#E7E7EC] bg-white p-4">
            <div className="text-sm font-semibold text-[#120F0D]">{alpPreview.title}</div>

            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">
              Objectives
            </div>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#60606B]">
              {alpPreview.objectives.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>

            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">
              Focus areas
            </div>
            <div className="mt-2 space-y-3">
              {alpPreview.focusAreas.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#E7E7EC] bg-[#FAFAFC] p-4">
                  <div className="text-sm font-semibold text-[#120F0D]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-[#60606B]">
                    <span className="font-medium text-[#120F0D]">Session type:</span> {item.sessionType}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[#60606B]">{item.why}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">
              Recommendations
            </div>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-[#60606B]">
              {alpPreview.recommendations.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center gap-3 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-2xl bg-[#6D39F8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Save as PDF
          </button>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Pre-Workshop Diagnostic - ${answers.company_name || "New Client"}`)}&body=${encodeURIComponent(`Pre-Workshop Diagnostic Submission

Company: ${answers.company_name || "N/A"}

----------------------------------------

${emailPreview}`)}`}
            className="rounded-2xl border border-[#D9D8DE] bg-white px-5 py-3 text-sm font-semibold text-[#120F0D] transition hover:bg-[#FAFAFC]"
          >
            Open email draft
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="rounded-2xl border border-[#D9D8DE] bg-white px-5 py-3 text-sm font-semibold text-[#120F0D] transition hover:bg-[#FAFAFC]"
          >
            {copied ? "Copied ✓" : "Copy summary"}
          </button>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setCurrentIndex(0);
            }}
            className="rounded-2xl border border-[#D9D8DE] bg-white px-5 py-3 text-sm font-semibold text-[#120F0D] transition hover:bg-[#FAFAFC]"
          >
            Review responses
          </button>
        </div>

        {/* RAW SUMMARY */}
        <div className="mt-6 rounded-3xl border border-[#D9D8DE] bg-white p-5 print-card">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">
            Diagnostic summary
          </div>
          <pre className="whitespace-pre-wrap text-sm leading-7 text-[#27272F]">
            {emailPreview}
          </pre>
        </div>
      </div>
    </div>
  );
}
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F1F4] text-[#120F0D]">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8 rounded-[30px] border border-[#D9D8DE] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ECE8FF] px-3 py-1.5 text-xs font-semibold text-[#6D39F8]">
            <Sparkles className="h-3.5 w-3.5" />
            Pre-Workshop Diagnostic
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Help us tailor your session</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#60606B] md:text-base">
            This short diagnostic is designed to gather light, structured input before your session. Most responses are point-and-click, with optional type fields when you choose Other.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#60606B]">
            Responses are not stored in this tool. If you want to keep a copy at the end, please save the final summary as a PDF and email it before closing or refreshing the page.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
          <div>
            <ProgressBar current={currentIndex + 1} total={maxStepsSeen} />
            {currentQuestion && (
              <QuestionRenderer question={currentQuestion} answers={answers} setAnswer={setAnswer} />
            )}

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={back}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#D9D8DE] bg-white px-4 py-3 text-sm font-medium text-[#60606B] transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <button
                type="button"
                onClick={next}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#6D39F8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLast ? "Generate Diagnostic Summary" : "Continue"}
                {!isLast && <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#D9D8DE] bg-white p-5 shadow-sm">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">Current response preview</div>
            <div className="max-h-[520px] overflow-auto rounded-2xl border border-[#E7E7EC] bg-[#FAFAFC] p-4 text-sm leading-6 text-[#27272F]">
              {visibleQuestions.slice(0, currentIndex + 1).map((q) => (
                <div key={q.id} className="mb-4 last:mb-0">
                  <div className="font-semibold text-[#120F0D]">{q.title}</div>
                  <div className="mt-1 text-[#60606B]">{formatValue(q, answers)}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
