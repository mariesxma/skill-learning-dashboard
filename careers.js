// ─────────────────────────────────────────────────────────────
//  Career paths from where you are now (AI consultant).
//  `skills` are Skill map concept ids with the level each role needs
//  (1 Aware, 2 Understand, 3 Apply, 4 Master); readiness is computed from
//  your levels. `creds` are certification template ids (cert:) or course
//  ids (course:). `steps` are Plan step ids that build the path.
//  Titles vary between companies; check real job postings to calibrate.
// ─────────────────────────────────────────────────────────────
window.CAREER_DATA = {
  now: "AI Consultant",
  horizon: ["Now", "Next · 1–2 years", "Later · 3–5 years", "Long term"],
  convergence: { title: "Head of AI / Chief AI Officer", note: "Most of these paths can converge here: it needs technical judgment, governance and the ability to lead change." },
  paths: [
    {
      id: "fde", name: "Forward Deployed Engineer", color: "#7c5cff",
      ladder: ["Forward Deployed Engineer", "Senior / Lead FDE", "Field CTO · Head of Solutions"],
      what: "Embed with customers to understand their problem, then design, build and ship AI solutions in their real environment, often agents connected to their systems.",
      fit: "Your consulting work already covers the customer side; this path adds hands-on building. It is the direct goal of your FDE course.",
      skills: { python: 3, fde: 3, "claude-code": 3, agents: 3, "tool-use": 3, mcp: 3, "agent-sdk": 2, rag: 3, evals: 3, apis: 3, git: 3, testing: 2, "stakeholder-interviews": 2, workshops: 2 },
      creds: ["course:c-cs50x", "course:c-cc-in-action", "course:d-mscs"],
      steps: ["s-fde", "s-cc", "s-mcp", "s-cs50-a", "s-cs50-b", "s-agents-project", "s-client-demo", "s-mscs-pathway"],
      prove: [
        "Ship one AI solution that a client or your team uses every week",
        "Build an agent connected to a real system through MCP or APIs",
        "Keep a public or internal portfolio: 3 projects with READMEs and short demo videos",
        "Read 10 FDE / solutions-engineer job postings and note the skills that repeat"
      ]
    },
    {
      id: "arch", name: "AI Solutions Architect", color: "#0369a1",
      ladder: ["AI Solutions Architect", "Principal AI Architect", "Head of AI Architecture"],
      what: "Design end-to-end AI systems for organizations: model and retrieval choices, integrations, security, cost and how the solution fits the existing landscape.",
      fit: "Builds on consulting plus your AI engineering track; TOGAF gives you the enterprise vocabulary architects are expected to speak.",
      skills: { "ai-architecture": 3, "system-design": 3, rag: 3, agents: 3, mcp: 2, "vector-db": 2, llmops: 2, evals: 2, guardrails: 2, apis: 3, "security-basics": 2, "application-arch": 2, "technology-arch": 2, "stakeholder-mgmt": 2 },
      creds: ["cert:togaf10", "course:c-cc-in-action", "course:d-mscs"],
      steps: ["s-fde", "s-mcp", "s-agents-project", "s-togaf-std", "s-togaf-1", "s-togaf-2", "s-client-demo"],
      prove: [
        "Write the architecture for one client AI solution: one page with views, risks and costs",
        "Lead a design review where you defend trade-offs (build vs. buy, RAG vs. fine-tuning)",
        "Estimate run cost and latency for a real workload and compare options",
        "Read 10 AI / solutions architect job postings and note the skills that repeat"
      ]
    },
    {
      id: "gov", name: "AI Governance & Responsible AI Lead", color: "#dc2626",
      ladder: ["AI Governance Consultant", "Responsible AI Lead", "Head of AI Governance · Chief AI Risk Officer"],
      what: "Set up how an organization uses AI safely and lawfully: policies, risk assessments, compliance with the EU AI Act and data protection, and fairness and transparency practices.",
      fit: "Your AIGP phase and readings map almost one-to-one onto this role, and clients already ask you these questions.",
      skills: { "ai-governance": 3, "nist-ai-rmf": 3, "iso-42001": 2, "eu-ai-act": 3, "ai-risk-assessment": 3, "ai-conformity": 2, gdpr: 2, dpia: 2, "adm-rights": 2, "algorithmic-bias": 3, "fairness-metrics": 2, explainability: 2, "transparency-docs": 2, evals: 2, "change-mgmt": 2 },
      creds: ["cert:aigp", "course:r-nist-ai-rmf", "course:r-eu-ai-act", "course:r-gdpr", "course:r-iso-42001"],
      steps: ["s-aigp-bok", "s-aigp-practice", "s-nist-rmf", "s-eu-ai-act", "s-gdpr", "s-iso", "s-nist-1270", "s-aigp-exam", "s-agents-project"],
      prove: [
        "Run one AI risk assessment end to end for a real use case (NIST AI RMF functions)",
        "Draft an AI policy or acceptable-use guideline that an organization adopts",
        "Map one AI system to its EU AI Act risk tier and list the obligations",
        "Read 10 AI governance / responsible AI job postings and note the skills that repeat"
      ]
    },
    {
      id: "ea", name: "Enterprise Architect (AI-enabled)", color: "#0e7490",
      ladder: ["Solution Architect", "Enterprise Architect", "Chief Architect"],
      what: "Shape how a whole organization's business, data, applications and technology evolve, and where AI fits into that roadmap.",
      fit: "TOGAF plus your AI depth is a rare combination: most enterprise architects are still learning AI.",
      skills: { togaf: 3, adm: 3, "business-arch": 3, "data-arch": 2, "application-arch": 3, "technology-arch": 2, "capability-mapping": 3, "migration-planning": 3, "arch-principles": 2, "arch-governance": 2, "ea-stakeholders": 3, archimate: 2, "ai-architecture": 2, "exec-presence": 2 },
      creds: ["cert:togaf10", "course:c-togaf-standard"],
      steps: ["s-togaf-std", "s-togaf-1", "s-togaf-2", "s-togaf-review", "s-client-demo"],
      prove: [
        "Build a capability map for one business area and mark where AI adds value",
        "Write a target architecture and a migration roadmap for one AI initiative",
        "Present an architecture decision to senior stakeholders",
        "Read 10 enterprise architect job postings and note the skills that repeat"
      ]
    },
    {
      id: "strategy", name: "AI Strategy Consulting Leader", color: "#db2777",
      ladder: ["Senior Consultant / Manager", "Principal / Director", "Partner · Head of AI Practice"],
      what: "Lead AI programs for clients and grow a practice: find the right use cases, build the business case, guide adoption, and sell the next engagement.",
      fit: "The most direct continuation of what you do today; your technical and governance depth sets you apart from generalist consultants.",
      skills: { "use-case-prioritization": 3, "business-case": 3, "change-mgmt": 3, "pyramid-principle": 3, storyline: 3, "exec-presence": 3, "hypothesis-driven": 3, "issue-tree": 3, "stakeholder-mgmt": 3, proposals: 3, workshops: 3, "ai-governance": 2, "ai-architecture": 2 },
      creds: ["course:c-emory-present", "course:c-emory-problem", "cert:aigp", "cert:togaf10"],
      steps: ["s-emory-1", "s-emory-2", "s-memos", "s-genai", "s-aigp-exam", "s-client-demo", "s-pitch"],
      prove: [
        "Own the proposal and scope for one AI engagement",
        "Facilitate an executive workshop that ends in a prioritized use-case list",
        "Build a business case with ROI that a client approves",
        "Read 10 AI strategy / consulting manager job postings and note the skills that repeat"
      ]
    },
    {
      id: "pm", name: "AI Product Manager", color: "#ca8a04",
      ladder: ["AI Product Manager", "Senior / Group PM (AI)", "Director / VP of Product (AI)"],
      what: "Decide what AI product to build and why, define quality with evals, and work with engineers to ship and improve it with real users.",
      fit: "Uses your client discovery and prioritization skills; your hands-on AI work makes you credible with engineers.",
      skills: { "use-case-prioritization": 3, "business-case": 2, evals: 3, prompting: 3, rag: 2, agents: 2, "stakeholder-interviews": 3, "data-storytelling": 2, "probability-stats": 2, "precision-recall": 2, "ai-governance": 2, "transparency-docs": 2 },
      creds: ["course:c-genai-everyone", "course:c-emory-present"],
      steps: ["s-genai", "s-emory-1", "s-emory-2", "s-agents-project", "s-mcp"],
      prove: [
        "Write a product spec with success metrics and an eval set for one AI feature",
        "Run user interviews and turn them into a prioritized roadmap",
        "Ship one improvement and show its effect with data",
        "Read 10 AI product manager job postings and note the skills that repeat"
      ]
    }
  ]
};
