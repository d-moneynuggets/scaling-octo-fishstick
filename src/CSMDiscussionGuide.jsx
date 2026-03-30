import React, { useMemo, useState } from "react";
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
    type: "single",
    title: "What type of work do you primarily produce?",
    icon: Workflow,
    options: [
      { value: "federal", label: "Federal / government proposals" },
      { value: "commercial", label: "Commercial / B2B proposals" },
      { value: "rfi_questionnaires", label: "RFIs / questionnaires / DDQs" },
      { value: "grants", label: "Grants / funding applications" },
      { value: "mixed", label: "A mix of the above" },
    ],
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
  const workType = answers.work_type;

  for (const q of questions) {
    if (!q.branch) {
      visible.push(q);
      continue;
    }

    if (q.branch === "content" && friction.some((x) => ROUTES.CONTENT.includes(x))) visible.push(q);
    if (q.branch === "sme" && friction.some((x) => ROUTES.SME.includes(x))) visible.push(q);
    if (q.branch === "review" && friction.some((x) => ROUTES.REVIEW.includes(x))) visible.push(q);
    if (q.branch === "compliance" && (friction.some((x) => ROUTES.COMPLIANCE.includes(x)) || ["federal", "grants", "mixed"].includes(workType))) visible.push(q);
    if (q.branch === "production" && (friction.some((x) => ROUTES.PRODUCTION.includes(x)) || answers.top_outcomes?.includes("speed"))) visible.push(q);
    if (q.branch === "rfi" && ["rfi_questionnaires", "mixed"].includes(workType)) visible.push(q);
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
    .map((q) => `${q.title}
${formatValue(q, answers)}`)
    .join("

");
}

export default function CSMDiscussionGuide() {
  const [answers, setAnswers] = useState({});
  const [guidedMode, setGuidedMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const visibleQuestions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const currentQuestion = visibleQuestions[currentIndex];
  const emailPreview = useMemo(() => getEmailPreview(visibleQuestions, answers), [visibleQuestions, answers]);

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

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F2F1F4] px-4 py-8 text-[#120F0D] md:px-8">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-[#D9D8DE] bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ECE8FF] px-3 py-1.5 text-xs font-semibold text-[#6D39F8]">
            <Sparkles className="h-3.5 w-3.5" />
            Diagnostic summary ready
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Generate Diagnostic Summary</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60606B]">
            In the live app, this raw response set can be emailed directly to you. For now, this screen shows the exact structured content that would be sent.
          </p>
          <div className="mt-6 rounded-3xl border border-[#D9D8DE] bg-[#FAFAFC] p-5">
            <pre className="whitespace-pre-wrap text-sm leading-7 text-[#27272F]">{emailPreview}</pre>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setCurrentIndex(0);
            }}
            className="mt-6 rounded-2xl bg-[#6D39F8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Review responses again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F1F4] text-[#120F0D]">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
        <div className="mb-8 rounded-[30px] border border-[#D9D8DE] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ECE8FF] px-3 py-1.5 text-xs font-semibold text-[#6D39F8]">
            <Sparkles className="h-3.5 w-3.5" />
            Pre-Workshop Diagnostic
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Help us tailor your session</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#60606B] md:text-base">
                This diagnostic is designed to work both as a self-assessment and as a guided discussion. Most responses are point-and-click, with optional type fields when you choose Other.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setGuidedMode((prev) => !prev)}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${guidedMode ? "border-[#6D39F8] bg-[#ECE8FF] text-[#6D39F8]" : "border-[#D9D8DE] bg-white text-[#60606B]"}`}
            >
              {guidedMode ? "Guided mode on" : "Switch to guided mode"}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
          <div>
            <ProgressBar current={currentIndex + 1} total={visibleQuestions.length} />
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
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">Session notes</div>
            <div className="rounded-2xl bg-[#FAFAFC] p-4 text-sm leading-6 text-[#60606B]">
              {guidedMode
                ? "Use this mode if a CSM is talking through the diagnostic live with the client. Keep the conversation natural and use optional Other fields only when needed."
                : "This version is optimized for self-assessment. The goal is to collect light, structured responses quickly before the session."}
            </div>

            <div className="mt-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B8B95]">Current response preview</div>
              <div className="max-h-[420px] overflow-auto rounded-2xl border border-[#E7E7EC] bg-[#FAFAFC] p-4 text-sm leading-6 text-[#27272F]">
                {visibleQuestions.slice(0, currentIndex + 1).map((q) => (
                  <div key={q.id} className="mb-4 last:mb-0">
                    <div className="font-semibold text-[#120F0D]">{q.title}</div>
                    <div className="mt-1 text-[#60606B]">{formatValue(q, answers)}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
