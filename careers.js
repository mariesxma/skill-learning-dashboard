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
  markets: { us: "United States", au: "Australia", nz: "New Zealand" },
  payNote: "Planning ranges from salary aggregators, recruiter guides and job postings (checked Nov 2026). Base salary unless marked total comp; local currency. Sources disagree a lot, so verify against current postings. Employers listed hire for this kind of role; they are examples, not a ranking.",
  paySources: [
    { label: "Levels.fyi: Forward Deployed Engineer", url: "https://www.levels.fyi/t/software-engineer/title/forward-deployed-engineer" },
    { label: "Recruiting from Scratch: FDE salaries in postings", url: "https://www.recruitingfromscratch.com/blog/forward-deployed-engineer-salary-guide-what-ai-startups-pay-in-2026" },
    { label: "Orbyt: AI solutions architect", url: "https://www.orbytjobs.ai/salaries/ai-solutions-architect" },
    { label: "Orbyt: Responsible AI lead", url: "https://www.orbytjobs.ai/salaries/responsible-ai-lead" },
    { label: "Axial Search: AI governance salaries", url: "https://axialsearch.com/insights/ai-governance-salaries" },
    { label: "Kore1: Enterprise architect salary guide", url: "https://www.kore1.com/enterprise-architect-salary-guide/" },
    { label: "Salary.com: Enterprise architect, principal", url: "https://www.salary.com/research/salary/listing/enterprise-architect-principal-salary" },
    { label: "Axial Search: AI strategy salaries", url: "https://axialsearch.com/insights/ai-strategy-salaries" },
    { label: "Orbyt: AI product manager", url: "https://www.orbytjobs.ai/salaries/ai-product-manager" },
    { label: "Employment Hero: Solution architect (AU)", url: "https://employmenthero.com/career-advice/solution-architect/salary/" },
    { label: "PayScale: Enterprise architect (AU)", url: "https://www.payscale.com/research/AU/Job=Enterprise_Architect%2C_IT/Salary" },
    { label: "Morgan McKinley: Enterprise architect, Sydney", url: "https://www.morganmckinley.com/au/salary-guide/data/enterprise-architect/sydney" },
    { label: "Vic. Government: Manager, AI Governance (job ad)", url: "https://www.careers.vic.gov.au/job/manager-ai-governance-and-enablement-69973" },
    { label: "Jobmentis: AI product manager (AU)", url: "https://www.jobmentis.com/en/salaries/ai-product-manager/australia" },
    { label: "PayScale: Consulting director (AU)", url: "https://www.payscale.com/research/AU/Job=Consulting_Director/Salary/8aa4c00b/Consulting-Management" },
    { label: "Talent International: top tech jobs NZ 2026", url: "https://www.talentinternational.com/blog/highest-paying-tech-jobs-new-zealand/" },
    { label: "Hays NZ: highest paying IT jobs", url: "https://www.hays.net.nz/it/career-advice/the-highest-paying-it-jobs-new-zealand" },
    { label: "Levels.fyi: Solution architect, Auckland", url: "https://www.levels.fyi/t/solution-architect/locations/auckland-nzl" }
  ],
  paths: [
    {
      id: "fde", name: "Forward Deployed Engineer", color: "#7c5cff",
      ladder: ["Forward Deployed Engineer", "Senior / Lead FDE", "Field CTO · Head of Solutions"],
      what: "Embed with customers to understand their problem, then design, build and ship AI solutions in their real environment, often agents connected to their systems.",
      fit: "Your consulting work already covers the customer side; this path adds hands-on building. It is the direct goal of your FDE course.",
      skills: { python: 3, fde: 3, "claude-code": 3, agents: 3, "tool-use": 3, mcp: 3, "agent-sdk": 2, rag: 3, evals: 3, apis: 3, git: 3, testing: 2, "stakeholder-interviews": 2, workshops: 2 },
      creds: ["course:c-cs50x", "course:c-cc-in-action", "course:d-mscs"],
      steps: ["s-fde", "s-cc", "s-mcp", "s-cs50-a", "s-cs50-b", "s-agents-project", "s-client-demo", "s-mscs-pathway"],
      pay: {
        us: { ranges: [["Forward Deployed Engineer", "US$160K–220K base", "median ≈ US$190K–205K"], ["Frontier AI labs", "up to ≈ US$280K–320K base", "advertised bands, plus equity"], ["Senior / Lead FDE", "US$250K–300K+ total comp", "top-paying locations"]],
          employers: ["Palantir (where the role began)", "OpenAI", "Anthropic", "Scale AI", "Databricks", "Google Cloud", "C3 AI"] },
        au: { ranges: [["FDE (mid)", "A$118K–135K", "estimate from job ads"], ["Senior / Staff FDE", "A$150K–180K", "estimate from job ads"]],
          employers: ["OpenAI (Sydney)", "Google Cloud (Sydney)", "Relevance AI", "Deloitte (Sydney)", "Assignar", "Lorikeet (solutions engineering)"] },
        nz: { ranges: [], employers: [], note: "No reliable NZ figures found; this title is still rare there." }
      },
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
      pay: {
        us: { ranges: [["AI Solutions Architect", "US$130K–200K base", "national"], ["New York", "median ≈ US$245K", "high-cost metros pay more"], ["Principal level", "US$200K–250K+ total comp", "big tech, incl. equity"]],
          employers: ["AWS", "Microsoft", "Google Cloud", "Databricks", "Snowflake", "NVIDIA", "Accenture"] },
        au: { ranges: [["Solution Architect", "A$148K–225K", "base, median ≈ A$174K"], ["Sydney", "average ≈ A$190K", "recruiter data"], ["Senior AI Solutions Architect", "≈ A$170K–180K", "estimate from job ads"]],
          employers: ["AWS", "Microsoft", "Google Cloud", "Databricks", "Accenture", "Deloitte", "Big four banks (CBA, Westpac, ANZ, NAB)", "Telstra"] },
        nz: { ranges: [["Solution Architect (senior)", "NZ$150K–190K", "base"], ["Auckland", "median ≈ NZ$200K total comp", "Levels.fyi"]],
          employers: ["Banks (ANZ, ASB, BNZ, Westpac NZ)", "Government agencies", "Spark", "Xero"] }
      },
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
      pay: {
        us: { ranges: [["AI Governance Lead / Manager", "US$120K–200K", "median ≈ US$158K–170K"], ["Responsible AI Lead", "US$145K–252K", "median ≈ US$192K"], ["San Francisco", "median ≈ US$264K", "responsible AI lead"]],
          employers: ["Microsoft (Responsible AI)", "Google", "IBM", "JPMorgan Chase", "Deloitte", "PwC", "EY", "KPMG", "Credo AI"] },
        au: { ranges: [["Manager, AI Governance (Vic. Govt)", "A$154K–181K", "posted range"], ["AI Governance Lead (Sydney)", "A$170K–185K", "posted range"], ["Responsible AI Lead", "average ≈ A$175K", "recruiter estimate"]],
          employers: ["Westpac (Responsible AI)", "Macquarie", "KPMG", "CSIRO", "Victorian Government", "AFCA", "Big four banks"] },
        nz: { ranges: [], employers: [], note: "No reliable NZ figures found; roles are mostly in government and banks." }
      },
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
      pay: {
        us: { ranges: [["Enterprise Architect", "US$130K–185K base", "most roles"], ["Principal / Executive Architect", "average ≈ US$280K–290K", "Salary.com"]],
          employers: ["Large banks and insurers", "Healthcare systems", "Federal and state government", "Accenture", "Deloitte", "IBM"] },
        au: { ranges: [["Enterprise Architect", "A$150K–246K base", "average ≈ A$191K"], ["Sydney", "average ≈ A$200K–220K", "recruiter data / PayScale"]],
          employers: ["Big four banks", "Telstra", "Government departments", "Insurers", "Deloitte", "Accenture"] },
        nz: { ranges: [["Enterprise Architect", "up to ≈ NZ$215K–220K", "Hays / Talent International"]],
          employers: ["Banks", "Government agencies", "Spark", "Fonterra"] }
      },
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
      pay: {
        us: { ranges: [["Manager (AI strategy)", "up to ≈ US$231K", "typical top of posted band"], ["Director", "up to ≈ US$278K (strong offers ≈ US$343K)", "posted bands"], ["MBB / Big 4 Manager", "US$280K–420K total comp", "incl. bonus"], ["Partner / Managing Director", "US$500K–1M+", "firm-level guides"]],
          employers: ["McKinsey (QuantumBlack)", "BCG (BCG X)", "Bain", "Accenture", "Deloitte", "PwC", "EY", "KPMG", "IBM Consulting"] },
        au: { ranges: [["Manager", "A$98K–186K", "average ≈ A$145K"], ["Director", "average ≈ A$205K", "Sydney ≈ A$210K"], ["Managing Director", "average ≈ A$213K", "very wide range up to ≈ A$397K"]],
          employers: ["McKinsey", "BCG", "Bain", "Accenture", "Deloitte", "PwC", "EY", "KPMG"] },
        nz: { ranges: [], employers: ["Deloitte", "PwC", "EY", "KPMG", "Accenture"], note: "No reliable NZ pay figures found." }
      },
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
      pay: {
        us: { ranges: [["AI Product Manager", "US$130K–220K base", "median ≈ US$170K–195K"], ["Large tech firms", "median ≈ US$305K total comp", "incl. equity"], ["Entry level", "US$85K–110K", ""]],
          employers: ["OpenAI", "Anthropic", "Google", "Microsoft", "Meta", "Salesforce", "Databricks"] },
        au: { ranges: [["AI Product Manager", "A$115K–278K", "median ≈ A$156K"], ["Senior PM", "≈ A$160K base", ""], ["Head / Director of Product", "≈ A$215K base", ""]],
          employers: ["Atlassian", "Canva", "SEEK", "Xero", "Big four banks", "Telstra"] },
        nz: { ranges: [["Product Manager", "up to ≈ NZ$220K", "Hays"]],
          employers: ["Xero", "Banks", "Spark", "Trade Me"] }
      },
      prove: [
        "Write a product spec with success metrics and an eval set for one AI feature",
        "Run user interviews and turn them into a prioritized roadmap",
        "Ship one improvement and show its effect with data",
        "Read 10 AI product manager job postings and note the skills that repeat"
      ]
    }
  ]
};
