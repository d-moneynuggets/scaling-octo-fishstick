const DIMENSIONS = {
  PROCESS: "process_clarity",
  CONTENT: "content_readiness",
  COLLAB: "collaboration_review",
  COMPLIANCE: "compliance_control",
  ENABLEMENT: "enablement_execution",
};

const DIMENSION_LABELS = {
  [DIMENSIONS.PROCESS]: "Process Clarity",
  [DIMENSIONS.CONTENT]: "Content Readiness",
  [DIMENSIONS.COLLAB]: "Collaboration and Review Flow",
  [DIMENSIONS.COMPLIANCE]: "Compliance and Control",
  [DIMENSIONS.ENABLEMENT]: "Enablement and Execution Readiness",
};

const FOCUS_AREA_LIBRARY = {
  [DIMENSIONS.PROCESS]: {
    key: "workflow_design",
    title: "Workflow definition and intake discipline",
    sessionType: "Projects & Collaboration",
    why: "Your responses suggest that variation in kickoff, ownership, or stage definition is creating downstream drag.",
  },
  [DIMENSIONS.CONTENT]: {
    key: "content_reuse",
    title: "Content organization and reuse workflow",
    sessionType: "Library Best Practices",
    why: "Your responses indicate that finding, trusting, or reusing content is taking more effort than it should.",
  },
  [DIMENSIONS.COLLAB]: {
    key: "review_handoffs",
    title: "SME contribution and review handoff design",
    sessionType: "Projects & Collaboration",
    why: "Your responses suggest that SME inputs, review cycles, or ownership visibility are shaping speed and consistency.",
  },
  [DIMENSIONS.COMPLIANCE]: {
    key: "requirements_traceability",
    title: "Requirements tracking and compliance confidence",
    sessionType: "Compliance Matrices & Requirements Traceability",
    why: "Your responses indicate that requirements identification or validation would benefit from more structure.",
  },
  [DIMENSIONS.ENABLEMENT]: {
    key: "enablement_guidance",
    title: "Role-based enablement, prompts, and execution support",
    sessionType: "Prompting Fundamentals",
    why: "Your responses suggest the team would benefit from more practical guidance, better prompts, or smoother adoption support.",
  },
};

const ACADEMY_RESOURCES = [
  {
    key: "projects_drafts",
    title: "Projects and Drafts",
    url: "https://rise.articulate.com/share/QA-y5xk5NxaNYMH0PAAhDdNbcvVd3nDZ#/lessons/4tqTBrK3CBDSbfrsb3KBKoBPJ9F-Wy-t",
    dimensions: [DIMENSIONS.PROCESS, DIMENSIONS.COLLAB],
    level: "foundational",
    description: "Best for tightening project structure, team ownership, and shared working flow.",
  },
  {
    key: "private_project",
    title: "Setting Up a Private Project",
    url: "https://share.articulate.com/usT_tzPV9ihq0PYYaKUbD#/lessons/26w8YSBTsNU5-6yEFFBVdeMIHOQWKs2C",
    dimensions: [DIMENSIONS.PROCESS, DIMENSIONS.COLLAB],
    level: "foundational",
    description: "Useful when roles, contributors, or access boundaries need to be clearer.",
  },
  {
    key: "document_library",
    title: "Document Library",
    url: "https://rise.articulate.com/share/QA-y5xk5NxaNYMH0PAAhDdNbcvVd3nDZ#/lessons/EZJ22zJ7pjbcm9S1s5FEWAyA4tGWkDnq",
    dimensions: [DIMENSIONS.CONTENT],
    level: "foundational",
    description: "Best next step for improving content findability, source trust, and reuse.",
  },
  {
    key: "extract",
    title: "Interrogating Client Documents with Extract",
    url: "https://rise.articulate.com/share/IVZTAUM-E3jOmZcKQNZitftolS5vjdrD",
    dimensions: [DIMENSIONS.COMPLIANCE, DIMENSIONS.PROCESS],
    level: "intermediate",
    description: "Helpful for requirement extraction, document review, and compliance confidence.",
  },
  {
    key: "gamma",
    title: "Review a Bid with Gamma Review",
    url: "https://rise.articulate.com/share/0TiXrPF1sACW6blwH_c5MgLK4Xlj04yd",
    dimensions: [DIMENSIONS.COLLAB, DIMENSIONS.COMPLIANCE],
    level: "intermediate",
    description: "Useful for strengthening structured review, quality control, and validation discipline.",
  },
  {
    key: "editor",
    title: "Editor",
    url: "https://rise.articulate.com/share/QA-y5xk5NxaNYMH0PAAhDdNbcvVd3nDZ#/lessons/ft_J-Bz_Z0I8iVhtx9gpJOTBMfMMxkzz",
    dimensions: [DIMENSIONS.ENABLEMENT, DIMENSIONS.CONTENT],
    level: "foundational",
    description: "Good for teams that need smoother shaping, editing, and response refinement workflows.",
  },
  {
    key: "inputs",
    title: "Inputs",
    url: "https://rise.articulate.com/share/QA-y5xk5NxaNYMH0PAAhDdNbcvVd3nDZ#/lessons/S6cpd35Y03Uf_llEiZJ6O9DP-Os6SVgw",
    dimensions: [DIMENSIONS.ENABLEMENT, DIMENSIONS.CONTENT],
    level: "foundational",
    description: "Strong fit for teams that need better prompt structure, reusable instructions, or cleaner inputs.",
  },
  {
    key: "qa_workbooks",
    title: "Q&A Workbooks",
    url: "https://share.articulate.com/qx3PB6T2xwKNnlhhghLQC#/lessons/Ij_xTosfZKTHjTsWbK1gdFKXi0zUs_xC",
    dimensions: [DIMENSIONS.ENABLEMENT, DIMENSIONS.COMPLIANCE],
    level: "intermediate",
    description: "Useful when questionnaire-style workflows, form-filling, or repeatable answer generation are important.",
  },
  {
    key: "research",
    title: "Research",
    url: "https://share.articulate.com/qx3PB6T2xwKNnlhhghLQC#/lessons/G4WkUnRGYXRYWyeuanvPhcP8ZAUwN9L8",
    dimensions: [DIMENSIONS.PROCESS, DIMENSIONS.CONTENT],
    level: "intermediate",
    description: "Helpful when teams need better discovery, synthesis, or structured research support.",
  },
];

function createDimensionState() {
  return {
    [DIMENSIONS.PROCESS]: 0,
    [DIMENSIONS.CONTENT]: 0,
    [DIMENSIONS.COLLAB]: 0,
    [DIMENSIONS.COMPLIANCE]: 0,
    [DIMENSIONS.ENABLEMENT]: 0,
  };
}

function addScore(scores, dimension, amount) {
  scores[dimension] += amount;
}

function getDimensionScores(answers) {
  const scores = createDimensionState();

  const workType = answers.work_type || [];
  const outcomes = answers.top_outcomes || [];
  const friction = answers.friction_points || [];
  const workflowDefined = answers.workflow_defined || [];
  const support = answers.support_needs || [];
  const reviewChallenges = answers.review_challenges || [];
  const productionManual = answers.production_manual_steps || [];
  const smeInputType = answers.sme_input_type || [];

  // Process Clarity
  if (answers.process_structure === "highly_structured") addScore(scores, DIMENSIONS.PROCESS, 3);
  if (answers.process_structure === "somewhat_structured") addScore(scores, DIMENSIONS.PROCESS, 1);
  if (answers.process_structure === "mostly_adhoc") addScore(scores, DIMENSIONS.PROCESS, -3);
  if (answers.process_structure === "depends") addScore(scores, DIMENSIONS.PROCESS, -2);

  if (answers.new_opportunity === "formal_kickoff") addScore(scores, DIMENSIONS.PROCESS, 2);
  if (answers.new_opportunity === "informal_coordination") addScore(scores, DIMENSIONS.PROCESS, 0);
  if (answers.new_opportunity === "one_person_drives") addScore(scores, DIMENSIONS.PROCESS, -2);
  if (answers.new_opportunity === "varies") addScore(scores, DIMENSIONS.PROCESS, -1);

  addScore(scores, DIMENSIONS.PROCESS, Math.min(workflowDefined.length, 4) * 0.5);
  if (support.includes("clearer_workflow")) addScore(scores, DIMENSIONS.PROCESS, -2);

  // Content Readiness
  if (friction.includes("finding_content")) addScore(scores, DIMENSIONS.CONTENT, -2);
  if (friction.includes("starting_from_scratch")) addScore(scores, DIMENSIONS.CONTENT, -2);
  if (friction.includes("version_control")) addScore(scores, DIMENSIONS.CONTENT, -2);

  if (answers.content_location === "sharepoint" || answers.content_location === "google_drive") {
    addScore(scores, DIMENSIONS.CONTENT, 1);
  }
  if (answers.content_location === "multiple_places") addScore(scores, DIMENSIONS.CONTENT, -1);
  if (answers.content_location === "no_clear_source") addScore(scores, DIMENSIONS.CONTENT, -3);

  if (answers.content_findability === "easy") addScore(scores, DIMENSIONS.CONTENT, 3);
  if (answers.content_findability === "manageable") addScore(scores, DIMENSIONS.CONTENT, 1);
  if (answers.content_findability === "difficult") addScore(scores, DIMENSIONS.CONTENT, -2);
  if (answers.content_findability === "very_difficult") addScore(scores, DIMENSIONS.CONTENT, -3);

  if (outcomes.includes("reuse")) addScore(scores, DIMENSIONS.CONTENT, -1);
  if (support.includes("content_org")) addScore(scores, DIMENSIONS.CONTENT, -2);

  // Collaboration / Review
  if (answers.writing_model === "dedicated_writers") addScore(scores, DIMENSIONS.COLLAB, 1);
  if (answers.writing_model === "smes_write_edit") addScore(scores, DIMENSIONS.COLLAB, -1);
  if (answers.writing_model === "distributed") addScore(scores, DIMENSIONS.COLLAB, -2);

  if (friction.includes("sme_delays")) addScore(scores, DIMENSIONS.COLLAB, -2);
  if (friction.includes("review_comments")) addScore(scores, DIMENSIONS.COLLAB, -2);
  if (friction.includes("ownership_coordination")) addScore(scores, DIMENSIONS.COLLAB, -2);

  if (answers.sme_input_late === "delays_everything") addScore(scores, DIMENSIONS.COLLAB, -2);
  if (answers.sme_input_late === "quality_drops") addScore(scores, DIMENSIONS.COLLAB, -2);
  if (answers.sme_input_late === "someone_fills_gap") addScore(scores, DIMENSIONS.COLLAB, -1);

  if (smeInputType.includes("inconsistent")) addScore(scores, DIMENSIONS.COLLAB, -1);

  addScore(scores, DIMENSIONS.COLLAB, reviewChallenges.length * -0.5);

  if (outcomes.includes("teamwork")) addScore(scores, DIMENSIONS.COLLAB, -1);
  if (support.includes("collaboration")) addScore(scores, DIMENSIONS.COLLAB, -2);

  // Compliance / Control
  if (workType.some((x) => ["federal", "grants"].includes(x))) addScore(scores, DIMENSIONS.COMPLIANCE, -1);
  if (friction.includes("requirement_tracking")) addScore(scores, DIMENSIONS.COMPLIANCE, -3);

  if (answers.requirement_method === "formal_matrix") addScore(scores, DIMENSIONS.COMPLIANCE, 3);
  if (answers.requirement_method === "mixed") addScore(scores, DIMENSIONS.COMPLIANCE, 1);
  if (answers.requirement_method === "manual_review") addScore(scores, DIMENSIONS.COMPLIANCE, -1);
  if (answers.requirement_method === "no_consistent_method") addScore(scores, DIMENSIONS.COMPLIANCE, -3);

  if (answers.compliance_confidence === "very_confident") addScore(scores, DIMENSIONS.COMPLIANCE, 3);
  if (answers.compliance_confidence === "mostly_confident") addScore(scores, DIMENSIONS.COMPLIANCE, 1);
  if (answers.compliance_confidence === "somewhat_confident") addScore(scores, DIMENSIONS.COMPLIANCE, -1);
  if (answers.compliance_confidence === "not_confident") addScore(scores, DIMENSIONS.COMPLIANCE, -3);

  if (outcomes.includes("compliance")) addScore(scores, DIMENSIONS.COMPLIANCE, -1);
  if (support.includes("compliance_support")) addScore(scores, DIMENSIONS.COMPLIANCE, -2);

  // Enablement / Execution
  if (friction.includes("training_onboarding")) addScore(scores, DIMENSIONS.ENABLEMENT, -3);
  if (friction.includes("formatting_final_assembly")) addScore(scores, DIMENSIONS.ENABLEMENT, -2);

  addScore(scores, DIMENSIONS.ENABLEMENT, productionManual.length * -0.5);

  if (support.includes("training")) addScore(scores, DIMENSIONS.ENABLEMENT, -2);
  if (support.includes("platform_usage")) addScore(scores, DIMENSIONS.ENABLEMENT, -2);
  if (support.includes("prompts")) addScore(scores, DIMENSIONS.ENABLEMENT, -1);

  if (outcomes.includes("speed")) addScore(scores, DIMENSIONS.ENABLEMENT, -1);
  if (outcomes.includes("enablement")) addScore(scores, DIMENSIONS.ENABLEMENT, -1);

  if (answers.change_readiness === "very_ready") addScore(scores, DIMENSIONS.ENABLEMENT, 2);
  if (answers.change_readiness === "cautious") addScore(scores, DIMENSIONS.ENABLEMENT, 0);
  if (answers.change_readiness === "mixed") addScore(scores, DIMENSIONS.ENABLEMENT, -1);
  if (answers.change_readiness === "resistant") addScore(scores, DIMENSIONS.ENABLEMENT, -3);

  return scores;
}

function getSortedDimensions(scores) {
  return Object.entries(scores)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.value - b.value);
}

function getMaturityLabel(scores) {
  const avg =
    Object.values(scores).reduce((sum, n) => sum + n, 0) /
    Object.values(scores).length;

  if (avg >= 1.75) return "Operational";
  if (avg >= 0.5) return "Developing";
  if (avg >= -0.75) return "Mixed";
  return "Early";
}

function humanizeUrgentIssue(answers) {
  const urgent = answers.urgent_issue || "";
  if (!urgent) return "workflow consistency";
  return urgent.replaceAll("_", " ");
}

function getSnapshotSummary(answers, scores) {
  const ranked = getSortedDimensions(scores);
  const weakest = ranked[0];
  const strongest = ranked[ranked.length - 1];

  return {
    maturity: getMaturityLabel(scores),
    biggestOpportunity: DIMENSION_LABELS[weakest.key],
    nextStep: FOCUS_AREA_LIBRARY[weakest.key].title,
    strongestArea: DIMENSION_LABELS[strongest.key],
  };
}

function getInstantInsights(answers) {
  const scores = getDimensionScores(answers);
  const ranked = getSortedDimensions(scores);
  const weakest = ranked[0];
  const secondWeakest = ranked[1];
  const strongest = ranked[ranked.length - 1];

  const insights = [];

  if (weakest.key === DIMENSIONS.PROCESS) {
    insights.push({
      title: "Your biggest drag likely starts upstream",
      body: "Your responses suggest that process clarity is creating the most friction. When intake, kickoff, or stage ownership varies by opportunity, drafting and review work become harder to scale.",
    });
  }

  if (weakest.key === DIMENSIONS.CONTENT) {
    insights.push({
      title: "The issue may be content retrieval, not content scarcity",
      body: "Your responses suggest that existing knowledge may be harder to find, trust, or reuse than it should be. Improving source clarity could reduce unnecessary rebuilding.",
    });
  }

  if (weakest.key === DIMENSIONS.COLLAB) {
    insights.push({
      title: "Collaboration flow appears to be shaping delivery speed",
      body: "Your responses suggest that SME input, review cycles, or ownership handoffs may be slowing progress more than the writing itself.",
    });
  }

  if (weakest.key === DIMENSIONS.COMPLIANCE) {
    insights.push({
      title: "Confidence may depend on stronger requirements traceability",
      body: "Your responses suggest that requirement identification or validation could benefit from a more structured method, especially for compliance-heavy work.",
    });
  }

  if (weakest.key === DIMENSIONS.ENABLEMENT) {
    insights.push({
      title: "Execution support may be the unlock",
      body: "Your responses suggest that the team may not need a full reset so much as clearer guidance, better prompts, and more practical role-based enablement.",
    });
  }

  // Dependency / imbalance insight
  if (
    weakest.key === DIMENSIONS.PROCESS &&
    secondWeakest.key === DIMENSIONS.COLLAB
  ) {
    insights.push({
      title: "Review friction may be a symptom, not the root cause",
      body: "The pattern in your responses suggests that review and coordination issues may be driven partly by inconsistent workflow structure upstream.",
    });
  } else if (
    weakest.key === DIMENSIONS.CONTENT &&
    secondWeakest.key === DIMENSIONS.ENABLEMENT
  ) {
    insights.push({
      title: "Better reuse may require better working habits",
      body: "Your responses suggest that content issues are not only about storage. Prompting habits, source selection, and practical guidance may also be affecting reuse.",
    });
  } else if (
    weakest.key === DIMENSIONS.COMPLIANCE &&
    secondWeakest.key === DIMENSIONS.PROCESS
  ) {
    insights.push({
      title: "Compliance risk may be tied to workflow discipline",
      body: "Your responses suggest that stronger requirement control will likely depend on clearer steps earlier in the process, not just better checking at the end.",
    });
  } else {
    insights.push({
      title: "The pattern looks operational, not isolated",
      body: `Your responses suggest that ${DIMENSION_LABELS[weakest.key].toLowerCase()} is the clearest gap, but it also appears connected to ${DIMENSION_LABELS[secondWeakest.key].toLowerCase()}.`,
    });
  }

  // Strength-based insight
  if (strongest.key === DIMENSIONS.PROCESS) {
    insights.push({
      title: "There is a strong foundation to build from",
      body: "Your responses suggest there is already some process discipline in place. That makes targeted improvements easier to implement without broad disruption.",
    });
  } else if (strongest.key === DIMENSIONS.CONTENT) {
    insights.push({
      title: "Existing content may be a hidden asset",
      body: "Your responses suggest the team likely has useful content foundations. Better retrieval and application could create value quickly.",
    });
  } else if (strongest.key === DIMENSIONS.COLLAB) {
    insights.push({
      title: "Team coordination may be an asset you can leverage",
      body: "Your responses suggest there is already a workable level of collaboration in place, which should make focused workflow improvements easier to land.",
    });
  } else if (strongest.key === DIMENSIONS.COMPLIANCE) {
    insights.push({
      title: "Control discipline appears to be a relative strength",
      body: "Your responses suggest that compliance awareness is more established than some other areas, which is a strong base for broader optimisation.",
    });
  } else {
    insights.push({
      title: "The team appears open to improvement",
      body: "Your responses suggest there is enough readiness to support practical changes without requiring a major transformation programme.",
    });
  }

  return insights.slice(0, 3);
}

function getALPPreview(answers) {
  const scores = getDimensionScores(answers);
  const ranked = getSortedDimensions(scores);
  const weakestThree = ranked.slice(0, 3).map((item) => item.key);

  const focusAreas = weakestThree.map((dimensionKey, index) => {
    const config = FOCUS_AREA_LIBRARY[dimensionKey];
    return {
      priority: index + 1,
      title: config.title,
      sessionType: config.sessionType,
      why: config.why,
      urgency: index === 0 ? "Now" : index === 1 ? "Next" : "Later",
    };
  });

  const outcomes = answers.top_outcomes || [];

  const objectives = [
    `Address the most urgent issue identified: ${humanizeUrgentIssue(answers)}.`,
    outcomes.includes("speed")
      ? "Reduce cycle time by identifying where work can be standardised or accelerated."
      : "Reduce workflow drag by clarifying where repeatable structure would help most.",
    outcomes.includes("quality") || outcomes.includes("compliance")
      ? "Improve confidence in quality, consistency, and response rigor."
      : "Improve consistency and make it easier for the team to apply best practice under pressure.",
  ];

  const recommendations = [
    `Start with ${focusAreas[0]?.title.toLowerCase() || "the primary friction point surfaced in the diagnostic"}.`,
    "Use one or two recent live examples to anchor the discussion in real work.",
    "Convert the discussion into a practical next-step plan with visible ownership.",
  ];

  return {
    title: answers.company_name
      ? `Draft Advanced Learning Plan for ${answers.company_name}`
      : "Draft Advanced Learning Plan",
    objectives,
    focusAreas,
    recommendations,
  };
}

function getAcademyRecommendations(answers) {
  const scores = getDimensionScores(answers);
  const ranked = getSortedDimensions(scores);
  const priorities = ranked.slice(0, 3).map((item) => item.key);

  const scoredResources = ACADEMY_RESOURCES.map((resource) => {
    let score = 0;

    priorities.forEach((priority, index) => {
      if (resource.dimensions.includes(priority)) {
        score += index === 0 ? 5 : index === 1 ? 3 : 2;
      }
    });

    if (resource.level === "foundational") score += 1;

    return { ...resource, matchScore: score };
  });

  const selected = scoredResources
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter((resource, index, arr) => arr.findIndex((x) => x.key === resource.key) === index)
    .slice(0, 3)
    .map((resource, index) => ({
      ...resource,
      tag:
        index === 0
          ? "Best next step"
          : index === 1
            ? "Strong gap match"
            : "Builds momentum",
    }));

  return selected;
}

function getDiagnosticSummaryText(visibleQuestions, answers) {
  const scores = getDimensionScores(answers);
  const snapshot = getSnapshotSummary(answers, scores);
  const insights = getInstantInsights(answers);
  const alp = getALPPreview(answers);
  const resources = getAcademyRecommendations(answers);

  const qaBlock = visibleQuestions
    .map((q) => `${q.title}\n${formatValue(q, answers)}`)
    .join("\n\n");

  const scoreBlock = Object.entries(scores)
    .map(([key, value]) => `${DIMENSION_LABELS[key]}: ${value}`)
    .join("\n");

  const insightsBlock = insights
    .map((item, idx) => `${idx + 1}. ${item.title}\n${item.body}`)
    .join("\n\n");

  const alpBlock = alp.focusAreas
    .map(
      (item) =>
        `${item.priority}. ${item.title} (${item.urgency})\nSession type: ${item.sessionType}\nWhy selected: ${item.why}`
    )
    .join("\n\n");

  const resourcesBlock = resources
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.title} [${item.tag}]\n${item.description}\n${item.url}`
    )
    .join("\n\n");

  return `Diagnostic Summary

Company: ${answers.company_name || "N/A"}
Maturity Signal: ${snapshot.maturity}
Biggest Opportunity Area: ${snapshot.biggestOpportunity}
Recommended Next Step: ${snapshot.nextStep}

Dimension Scores
${scoreBlock}

3 Instant Insights
${insightsBlock}

Draft Advanced Learning Plan
${alpBlock}

Top 3 Recommended Academy Resources
${resourcesBlock}

Questionnaire Responses
${qaBlock}`;
}
