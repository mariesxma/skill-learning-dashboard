// ─────────────────────────────────────────────────────────────
//  Knowledge graph data: edit this file to grow your map.
//
//  domains   big hubs (AI, Finance, …). `anchor` = rough position.
//  topics    sub-areas inside a domain.
//  concepts  terminology nodes. `topic` (or `domain`) attaches them;
//            `related` draws cross-links, including across domains.
//  courses   best course links; `covers` lists concept ids. When a
//            course is marked Completed, its concepts light up as
//            skills gained.
//  Ids must be unique; they are used to save your progress.
// ─────────────────────────────────────────────────────────────
window.LEARNING_DATA = {
  title: "My Skill Map",

  domains: [
    { id: "cs", name: "CS Foundations", color: "#2563eb", anchor: [0, -540],
      summary: "The base everything else stands on: programming, data structures and algorithms, how computers and networks work, software engineering habits, and the math behind machine learning. Dashed links show which AI and Finance concepts depend on each foundation." },
    { id: "ai", name: "Artificial Intelligence", color: "#7c5cff", anchor: [-520, -60],
      summary: "Teaching computers to learn patterns from data, from classic machine learning to deep learning and large language models." },
    { id: "fin", name: "Finance", color: "#0f9f6e", anchor: [460, -60],
      summary: "How money, markets and companies work: valuing assets, managing risk, and building portfolios." },
    { id: "ea", name: "Enterprise Architecture", color: "#0369a1", anchor: [660, -600],
      summary: "Designing how an organization's business, data, applications and technology fit together, and planning how to get from today's state to the target. TOGAF is the most widely used framework." },
    { id: "gov", name: "AI Governance & Privacy", color: "#dc2626", anchor: [660, 600],
      summary: "Making AI trustworthy and lawful: risk frameworks (NIST AI RMF), management-system standards (ISO/IEC 42001), AI laws (EU AI Act and national rules), data protection (GDPR), and where privacy meets algorithmic bias and transparency." },
    { id: "consult", name: "Consulting & Communication", color: "#db2777", anchor: [-620, 560],
      summary: "The other half of a forward deployed engineer: breaking down messy client problems, communicating answers to executives, running discovery with stakeholders, and making the business case for AI." },
    { id: "aifin", name: "AI × Finance", color: "#e08a00", anchor: [0, 330],
      summary: "Where the two meet: applying machine learning to trading, credit, fraud and risk." }
  ],

  topics: [
    { id: "cs-prog", domain: "cs", name: "Programming Fundamentals" },
    { id: "cs-dsa", domain: "cs", name: "Data Structures & Algorithms" },
    { id: "cs-systems", domain: "cs", name: "Computer Systems & Networks" },
    { id: "cs-swe", domain: "cs", name: "Software Engineering" },
    { id: "cs-math", domain: "cs", name: "Math for CS & ML" },
    { id: "ai-found", domain: "ai", name: "ML Foundations" },
    { id: "ai-deep", domain: "ai", name: "Deep Learning" },
    { id: "ai-llm", domain: "ai", name: "LLMs & GenAI" },
    { id: "ai-agentic", domain: "ai", name: "Agentic AI & AI Engineering" },
    { id: "fin-core", domain: "fin", name: "Core Finance" },
    { id: "fin-mkt", domain: "fin", name: "Markets & Investing" },
    { id: "fin-quant", domain: "fin", name: "Quantitative Finance" },
    { id: "con-problem", domain: "consult", name: "Structured Problem Solving" },
    { id: "con-comm", domain: "consult", name: "Executive Communication" },
    { id: "con-client", domain: "consult", name: "Client & Stakeholder Skills" },
    { id: "con-aistrat", domain: "consult", name: "AI Business Strategy" },
    { id: "ea-framework", domain: "ea", name: "TOGAF & the ADM" },
    { id: "ea-domains", domain: "ea", name: "Architecture Domains (BDAT)" },
    { id: "ea-modeling", domain: "ea", name: "Modeling & Planning" },
    { id: "ea-governance", domain: "ea", name: "Architecture Governance" },
    { id: "gov-frameworks", domain: "gov", name: "Risk Frameworks & Standards" },
    { id: "gov-law", domain: "gov", name: "AI Laws & Compliance" },
    { id: "gov-privacy", domain: "gov", name: "Data Protection" },
    { id: "gov-fairness", domain: "gov", name: "Bias, Fairness & Transparency" }
  ],

  concepts: [
    // ── AI Governance · Risk Frameworks & Standards
    { id: "nist-ai-rmf", topic: "gov-frameworks", label: "NIST AI RMF", definition: "The US National Institute of Standards and Technology's voluntary AI Risk Management Framework (1.0, January 2023), organized around four functions: Govern, Map, Measure and Manage.", related: ["ai-governance", "guardrails"] },
    { id: "iso-42001", topic: "gov-frameworks", label: "ISO/IEC 42001 (AI management system)", definition: "The international standard (2023) for an AI management system: policies, objectives and processes for responsible AI, run with Plan-Do-Check-Act and certifiable like ISO 27001.", related: ["nist-ai-rmf", "arch-governance"] },
    { id: "ai-risk-assessment", topic: "gov-frameworks", label: "AI risk & impact assessment", definition: "Systematically identifying what could go wrong with an AI system (harm to people, bias, security, misuse), how likely and severe it is, and which controls reduce it.", related: ["nist-ai-rmf", "evals"] },

    // ── AI Governance · AI Laws & Compliance
    { id: "eu-ai-act", topic: "gov-law", label: "EU AI Act", definition: "Regulation (EU) 2024/1689: a risk-based law that bans some AI practices, sets strict obligations for high-risk systems, and adds transparency duties for others, including general-purpose AI models.", related: ["ai-risk-assessment", "gdpr"] },
    { id: "ai-conformity", topic: "gov-law", label: "Conformity, documentation & oversight", definition: "What high-risk AI must show: technical documentation, logging, human oversight, accuracy and robustness testing, and conformity assessment before going to market.", related: ["eu-ai-act", "llmops"] },
    { id: "national-ai-laws", topic: "gov-law", label: "National AI laws & policies", definition: "AI rules beyond the EU, such as US state laws and sector guidance, China's rules on algorithms and generative AI, and other countries' frameworks. They differ in scope, so map which ones apply.", related: ["eu-ai-act"] },

    // ── AI Governance · Data Protection
    { id: "gdpr", topic: "gov-privacy", label: "GDPR", definition: "The EU General Data Protection Regulation (2016/679): rules for processing personal data, people's rights over their data, and accountability for organizations, with large fines for violations.", related: ["data-arch"] },
    { id: "privacy-principles", topic: "gov-privacy", label: "Lawful basis & data minimization", definition: "Core data protection principles: have a lawful basis, use data only for stated purposes, collect no more than needed, keep it accurate and no longer than necessary, and secure it.", related: ["gdpr"] },
    { id: "dpia", topic: "gov-privacy", label: "DPIA", definition: "Data Protection Impact Assessment: required before high-risk processing (common for AI) to describe the processing, assess risks to people, and plan mitigations.", related: ["gdpr", "ai-risk-assessment"] },
    { id: "adm-rights", topic: "gov-privacy", label: "Automated decisions (GDPR Art. 22)", definition: "People's right not to be subject to solely automated decisions with legal or similarly significant effects, plus safeguards such as human review and meaningful information about the logic. This is where privacy law meets algorithmic fairness.", related: ["gdpr", "algorithmic-bias", "explainability", "credit-scoring"] },

    // ── AI Governance · Bias, Fairness & Transparency
    { id: "algorithmic-bias", topic: "gov-fairness", label: "Algorithmic bias", definition: "Systematic unfair outcomes from AI. NIST SP 1270 groups the sources into systemic, statistical/computational and human biases, so fixing the data alone is not enough.", related: ["classification", "credit-scoring", "fraud-detection"] },
    { id: "fairness-metrics", topic: "gov-fairness", label: "Fairness metrics", definition: "Ways to measure whether outcomes differ across groups, e.g. demographic parity, equal opportunity and equalized odds. They can conflict, so the choice is a policy decision.", related: ["algorithmic-bias", "precision-recall", "evals"] },
    { id: "explainability", topic: "gov-fairness", label: "Explainability (XAI)", definition: "Techniques and practices that make model decisions understandable to the people affected and to reviewers, e.g. feature attributions, reason codes and counterfactuals.", related: ["adm-rights", "neural-net"] },
    { id: "transparency-docs", topic: "gov-fairness", label: "Transparency documentation", definition: "Model cards, datasheets and system cards that record what a model is for, how it was built and tested, and its known limits. Many AI laws now expect this.", related: ["ai-conformity", "evals"] },

    // ── Enterprise Architecture · TOGAF & the ADM
    { id: "togaf", topic: "ea-framework", label: "TOGAF Standard", definition: "The Open Group's framework for enterprise architecture: a method (the ADM), a content framework, and guidance for governing and evolving architecture across an organization." },
    { id: "adm", topic: "ea-framework", label: "Architecture Development Method (ADM)", definition: "TOGAF's core cycle: Preliminary, A Vision, B Business, C Information Systems, D Technology, E Opportunities & Solutions, F Migration Planning, G Implementation Governance, H Change Management, with Requirements Management at the center.", related: ["togaf"] },
    { id: "arch-content", topic: "ea-framework", label: "Deliverables, artifacts & building blocks", definition: "TOGAF's content framework: deliverables are formal work products, artifacts are catalogs, matrices and diagrams, and building blocks are reusable components of the architecture.", related: ["adm"] },
    { id: "enterprise-continuum", topic: "ea-framework", label: "Enterprise Continuum", definition: "A way to classify architecture and solution assets from generic (foundation) to organization-specific, so teams can reuse what already exists.", related: ["togaf"] },
    { id: "arch-repository", topic: "ea-framework", label: "Architecture Repository", definition: "Where an organization stores its architecture assets: the metamodel, landscapes, reference models, standards and governance records.", related: ["enterprise-continuum"] },

    // ── Enterprise Architecture · Domains (BDAT)
    { id: "business-arch", topic: "ea-domains", label: "Business architecture", definition: "How the organization creates value: its strategy, capabilities, value streams, organization structure and key business processes.", related: ["adm"] },
    { id: "data-arch", topic: "ea-domains", label: "Data architecture", definition: "The structure of an organization's data assets and how data flows, is owned and is governed across systems.", related: ["databases", "business-arch"] },
    { id: "application-arch", topic: "ea-domains", label: "Application architecture", definition: "The applications an organization runs, what each is responsible for, and how they integrate (often through APIs).", related: ["apis", "data-arch"] },
    { id: "technology-arch", topic: "ea-domains", label: "Technology architecture", definition: "The infrastructure the applications run on: platforms, cloud, networks, security and hosting standards.", related: ["system-design", "application-arch", "ai-architecture"] },

    // ── Enterprise Architecture · Modeling & Planning
    { id: "archimate", topic: "ea-modeling", label: "ArchiMate modeling", definition: "The Open Group's visual modeling language for enterprise architecture, with layers for business, application and technology and the relationships between them.", related: ["togaf", "business-arch"] },
    { id: "capability-mapping", topic: "ea-modeling", label: "Capability-based planning", definition: "Describing what the business must be able to do (capabilities), assessing each one, and planning investments around the gaps.", related: ["business-arch", "use-case-prioritization"] },
    { id: "value-streams", topic: "ea-modeling", label: "Value streams", definition: "The end-to-end stages through which an organization delivers value to a customer, used to see which capabilities matter most.", related: ["capability-mapping"] },
    { id: "migration-planning", topic: "ea-modeling", label: "Roadmaps & migration planning", definition: "Comparing baseline and target architectures (gap analysis), then sequencing the work into transition architectures and a roadmap.", related: ["adm", "proposals"] },

    // ── Enterprise Architecture · Governance
    { id: "arch-principles", topic: "ea-governance", label: "Architecture principles", definition: "Agreed rules that guide architecture decisions, each with a rationale and implications, e.g. 'Data is an asset'.", related: ["togaf"] },
    { id: "arch-governance", topic: "ea-governance", label: "Architecture governance", definition: "How architecture decisions are made, checked and enforced: architecture boards, compliance reviews, contracts and dispensations.", related: ["arch-principles", "ai-governance"] },
    { id: "ea-stakeholders", topic: "ea-governance", label: "Stakeholders, concerns & viewpoints", definition: "Identifying who cares about the architecture, what they worry about, and showing each group a view that answers their concerns.", related: ["stakeholder-mgmt", "arch-governance"] },

    // ── Consulting · Structured Problem Solving
    { id: "mece", topic: "con-problem", label: "MECE thinking", definition: "Mutually Exclusive, Collectively Exhaustive: splitting a problem into parts that don't overlap and together cover everything, so nothing is double-counted or missed." },
    { id: "issue-tree", topic: "con-problem", label: "Issue trees", definition: "Breaking a big question into smaller sub-questions, branch by branch, until each one can be answered with analysis.", related: ["mece", "trees-graphs"] },
    { id: "hypothesis-driven", topic: "con-problem", label: "Hypothesis-driven problem solving", definition: "Starting with a best-guess answer early, then designing analyses to prove or disprove it, instead of boiling the ocean.", related: ["issue-tree"] },
    { id: "prioritization", topic: "con-problem", label: "80/20 prioritization", definition: "Focusing on the few drivers that explain most of the impact, and deliberately ignoring the rest.", related: ["hypothesis-driven"] },

    // ── Consulting · Executive Communication
    { id: "pyramid-principle", topic: "con-comm", label: "Pyramid Principle", definition: "Barbara Minto's method: lead with the answer, then group supporting arguments logically underneath it, so busy executives get the point in the first sentence.", related: ["mece"] },
    { id: "storyline", topic: "con-comm", label: "Storylining (SCQA)", definition: "Structuring a presentation as Situation → Complication → Question → Answer, so the audience follows why your recommendation matters.", related: ["pyramid-principle"] },
    { id: "data-storytelling", topic: "con-comm", label: "Storytelling with data", definition: "Choosing the one chart that makes your point, removing clutter, and saying in words what the audience should take away.", related: ["probability-stats"] },
    { id: "slide-design", topic: "con-comm", label: "Action titles & slide design", definition: "Every slide has a full-sentence title that states its takeaway; read only the titles in order and the whole story should make sense.", related: ["storyline"] },
    { id: "exec-presence", topic: "con-comm", label: "Executive presence & speaking", definition: "Delivering clearly and confidently: answer first, handle tough questions calmly, and adjust depth to the audience.", related: ["pyramid-principle"] },

    // ── Consulting · Client & Stakeholder Skills
    { id: "stakeholder-interviews", topic: "con-client", label: "Stakeholder interviews", definition: "Structured conversations to understand how work really happens, what hurts, and what success means to each person.", related: ["fde"] },
    { id: "workshops", topic: "con-client", label: "Workshop facilitation", definition: "Running sessions where a group maps a process, generates ideas and agrees on priorities, with you steering rather than lecturing.", related: ["stakeholder-interviews"] },
    { id: "stakeholder-mgmt", topic: "con-client", label: "Stakeholder management", definition: "Knowing who decides, who influences and who is affected, and keeping each of them informed and on side.", related: ["fde"] },
    { id: "proposals", topic: "con-client", label: "Proposals & scoping", definition: "Turning a client need into a clear scope, plan, deliverables and success criteria, so everyone agrees what will be built.", related: ["stakeholder-mgmt", "ai-architecture"] },

    // ── Consulting · AI Business Strategy
    { id: "use-case-prioritization", topic: "con-aistrat", label: "AI use-case prioritization", definition: "Scoring candidate AI use cases on value, feasibility, data readiness and risk to pick where to start.", related: ["prioritization", "ai-architecture"] },
    { id: "business-case", topic: "con-aistrat", label: "ROI & business cases", definition: "Estimating the cost, benefit and payback of an AI initiative so leaders can decide to fund it.", related: ["npv", "use-case-prioritization"] },
    { id: "change-mgmt", topic: "con-aistrat", label: "Change management & adoption", definition: "Getting people to actually use the new AI system: training, champions, redesigned workflows, and measuring adoption.", related: ["stakeholder-mgmt"] },
    { id: "ai-governance", topic: "con-aistrat", label: "AI governance & risk", definition: "Policies and controls for using AI responsibly: data privacy, accountability, human oversight and regulatory compliance.", related: ["guardrails", "evals"] },

    // ── CS · Programming Fundamentals (start here)
    { id: "python", topic: "cs-prog", label: "Python programming", definition: "The main language of AI and data work. Variables, types, loops, conditionals, and reading/writing files are the first things to get comfortable with." },
    { id: "conditionals-loops", topic: "cs-prog", label: "Conditionals, loops & Boolean logic", definition: "The building blocks of every program: making decisions (if / else with true-or-false expressions) and repeating steps (for / while loops).", related: ["python"] },
    { id: "c-lang", topic: "cs-prog", label: "C & compiled languages", definition: "A low-level language that is compiled to machine code before it runs. Learning it shows what higher-level languages like Python do for you.", related: ["memory-pointers"] },
    { id: "functions", topic: "cs-prog", label: "Functions & abstraction", definition: "Packaging logic into reusable named pieces with inputs and outputs, so big problems become small, testable parts.", related: ["python"] },
    { id: "oop", topic: "cs-prog", label: "Object-oriented programming", definition: "Organizing code around objects (classes) that bundle data with the functions that act on it. Most libraries you use, from pandas to SDKs, are built this way.", related: ["functions"] },
    { id: "debugging", topic: "cs-prog", label: "Debugging", definition: "Systematically finding why code doesn't work: reading error messages and stack traces, printing or stepping through values, and forming and testing hypotheses.", related: ["python"] },
    { id: "async", topic: "cs-prog", label: "Concurrency & async", definition: "Doing several things at once or without waiting, e.g. calling many APIs in parallel. Essential for fast agents and data pipelines.", related: ["functions"] },

    // ── CS · Data Structures & Algorithms
    { id: "algorithms-pseudocode", topic: "cs-dsa", label: "Algorithms & pseudocode", definition: "An algorithm is a precise, step-by-step procedure for solving a problem; pseudocode writes it in plain language before you write real code.", related: ["sorting-searching"] },
    { id: "big-o", topic: "cs-dsa", label: "Big-O complexity", definition: "How an algorithm's time or memory grows as the input grows: O(1), O(log n), O(n), O(n²). It tells you whether code will still be fast with a million rows." },
    { id: "arrays-lists", topic: "cs-dsa", label: "Arrays & lists", definition: "Ordered collections accessed by position. The basis of vectors, matrices and dataframes.", related: ["big-o"] },
    { id: "hash-maps", topic: "cs-dsa", label: "Hash maps (dictionaries)", definition: "Key → value lookups in roughly constant time. Python's dict, JSON objects and caches all work this way.", related: ["big-o"] },
    { id: "trees-graphs", topic: "cs-dsa", label: "Trees & graphs", definition: "Structures of nodes and connections: file systems, org charts, social networks, decision trees, and knowledge graphs like this one.", related: ["recursion"] },
    { id: "recursion", topic: "cs-dsa", label: "Recursion", definition: "A function that solves a problem by calling itself on smaller versions of it, which is natural for trees and divide-and-conquer." },
    { id: "sorting-searching", topic: "cs-dsa", label: "Sorting & searching", definition: "Classic algorithms such as binary search, merge sort and quicksort. Learning them teaches how to reason about correctness and speed.", related: ["big-o", "arrays-lists"] },

    // ── CS · Computer Systems & Networks
    { id: "how-computers-work", topic: "cs-systems", label: "How computers work", definition: "CPU, memory, storage and the layers between hardware and your code. It explains why some things are fast and others slow (e.g. GPUs for AI)." },
    { id: "binary", topic: "cs-systems", label: "Binary & data representation", definition: "Computers store everything as bits (0s and 1s). Numbers, text (ASCII / Unicode), colors (RGB), images and sound are all patterns of bits.", related: ["how-computers-work"] },
    { id: "memory-pointers", topic: "cs-systems", label: "Memory & pointers", definition: "How programs store data in memory at addresses, how pointers refer to those addresses, and how memory is allocated and freed.", related: ["how-computers-work"] },
    { id: "os-processes", topic: "cs-systems", label: "Operating systems & processes", definition: "How the OS runs programs as processes and threads, manages memory and files, and isolates programs from each other.", related: ["how-computers-work"] },
    { id: "networking", topic: "cs-systems", label: "Networking & HTTP", definition: "How machines talk: IP addresses, DNS, TCP, and HTTP requests/responses with status codes and headers. Every API call and web app relies on it." },
    { id: "databases", topic: "cs-systems", label: "Databases & SQL", definition: "Storing and querying structured data reliably: tables, keys, indexes, joins and transactions." },
    { id: "security-basics", topic: "cs-systems", label: "Security basics", definition: "Authentication vs. authorization, encryption (HTTPS), secrets management, and common attacks like injection. Matters for anything you deploy.", related: ["networking"] },

    // ── CS · Software Engineering
    { id: "cli", topic: "cs-swe", label: "Command line & Linux", definition: "Using the terminal to navigate files, run programs, and automate tasks. Servers, cloud machines and most dev tools assume it." },
    { id: "git", topic: "cs-swe", label: "Git & version control", definition: "Tracking changes to code, branching, and collaborating through pull requests on GitHub (exactly how this skill map is built).", related: ["cli"] },
    { id: "apis", topic: "cs-swe", label: "APIs & JSON", definition: "How programs offer services to each other, usually REST over HTTP with JSON data. Calling LLM APIs and building tools for agents are both API work.", related: ["networking"] },
    { id: "web-basics", topic: "cs-swe", label: "Web basics (HTML, CSS, JavaScript)", definition: "How web pages are built: HTML for structure, CSS for style, JavaScript for behavior, plus a server (e.g. Flask) that responds to browser requests.", related: ["networking", "apis"] },
    { id: "testing", topic: "cs-swe", label: "Testing", definition: "Writing automated checks (unit and integration tests) so you know code works and stays working after changes." },
    { id: "system-design", topic: "cs-swe", label: "System design basics", definition: "Combining services, databases, caches and queues into a system that scales and stays reliable, and reasoning about the trade-offs.", related: ["databases", "apis"] },

    // ── CS · Math for CS & ML
    { id: "linear-algebra", topic: "cs-math", label: "Linear algebra", definition: "Vectors, matrices and their operations. Neural networks and embeddings are, at heart, big matrix multiplications.", related: ["arrays-lists"] },
    { id: "probability-stats", topic: "cs-math", label: "Probability & statistics", definition: "Reasoning about uncertainty: distributions, mean and variance, correlation, hypothesis tests. The language of both ML and finance." },
    { id: "calculus", topic: "cs-math", label: "Calculus (derivatives)", definition: "How a quantity changes as its inputs change. Derivatives and gradients are what models use to learn." },
    { id: "discrete-math", topic: "cs-math", label: "Discrete math & logic", definition: "Sets, logic, counting, proofs and graphs: the math of algorithms and data structures.", related: ["trees-graphs"] },

    // ── AI · ML Foundations
    { id: "supervised", topic: "ai-found", label: "Supervised learning", definition: "Training a model on labeled examples (input → known answer) so it can predict answers for new inputs, e.g. spam detection or price prediction." },
    { id: "unsupervised", topic: "ai-found", label: "Unsupervised learning", definition: "Finding structure in unlabeled data, such as clustering similar customers or flagging unusual points (anomaly detection)." },
    { id: "regression", topic: "ai-found", label: "Regression", definition: "Predicting a continuous number (house price, next-month return). Linear regression fits a straight line through the data.", related: ["supervised", "probability-stats"] },
    { id: "classification", topic: "ai-found", label: "Classification", definition: "Predicting a category (fraud / not fraud, default / no default).", related: ["supervised"] },
    { id: "overfitting", topic: "ai-found", label: "Overfitting", definition: "When a model memorizes training data, noise included, and fails on new data. Countered with more data, regularization, cross-validation or simpler models." },
    { id: "gradient-descent", topic: "ai-found", label: "Gradient descent", definition: "The optimization method most models learn with: repeatedly nudging parameters in the direction that lowers the error (loss).", related: ["calculus"] },
    { id: "precision-recall", topic: "ai-found", label: "Precision / Recall", definition: "Precision: of the items predicted positive, how many really are. Recall: of all real positives, how many were found.", related: ["classification", "probability-stats"] },
    { id: "feature-eng", topic: "ai-found", label: "Feature engineering", definition: "Turning raw data into informative model inputs, e.g. ratios, moving averages or counts.", related: ["python"] },

    // ── AI · Deep Learning
    { id: "neural-net", topic: "ai-deep", label: "Neural network", definition: "Layers of simple connected units whose weights are learned from data; the foundation of deep learning.", related: ["gradient-descent", "linear-algebra", "calculus"] },
    { id: "backprop", topic: "ai-deep", label: "Backpropagation", definition: "The algorithm that computes how much each weight contributed to the error, so gradient descent can update it.", related: ["neural-net", "gradient-descent", "calculus"] },
    { id: "cnn", topic: "ai-deep", label: "CNN", definition: "Convolutional Neural Network, specialized for grid data like images; it learns local patterns such as edges and shapes.", related: ["neural-net"] },
    { id: "sequence-models", topic: "ai-deep", label: "Sequence models (RNN/LSTM)", definition: "Networks that process ordered data step by step while keeping a memory of what came before: text, audio, price series.", related: ["neural-net"] },
    { id: "transformer", topic: "ai-deep", label: "Transformer", definition: "An architecture built on attention, which lets every token weigh every other token. It powers modern LLMs.", related: ["sequence-models"] },
    { id: "transfer-learning", topic: "ai-deep", label: "Transfer learning", definition: "Reusing a model trained on a big dataset as the starting point for a new, smaller task." },

    // ── AI · LLMs
    { id: "tokenization", topic: "ai-llm", label: "Tokenization", definition: "Splitting text into tokens (word pieces) that a language model reads and predicts one at a time.", related: ["transformer", "hash-maps"] },
    { id: "embedding", topic: "ai-llm", label: "Embedding", definition: "A vector of numbers representing an item (word, document, customer) so that similar items sit close together.", related: ["linear-algebra"] },
    { id: "fine-tuning", topic: "ai-llm", label: "Fine-tuning", definition: "Continuing to train a pre-trained model on task-specific data to adapt it to your use case.", related: ["transfer-learning"] },
    { id: "prompting", topic: "ai-llm", label: "Prompt engineering", definition: "Designing instructions, context and examples so an LLM produces reliable, useful output." },
    { id: "rag", topic: "ai-llm", label: "RAG", definition: "Retrieval-Augmented Generation: fetching relevant documents at query time and giving them to the LLM so answers are grounded in your data.", related: ["embedding", "prompting"] },

    // ── AI · Agentic AI & AI Engineering
    { id: "agents", topic: "ai-agentic", label: "AI agents", definition: "LLM systems that plan and take actions with tools (search, code, APIs) in a loop to complete multi-step tasks.", related: ["prompting"] },
    { id: "tool-use", topic: "ai-agentic", label: "Tool use / function calling", definition: "Letting a model call functions you define (search, database, APIs) by returning structured arguments; your code runs the tool and feeds the result back.", related: ["agents", "apis"] },
    { id: "mcp", topic: "ai-agentic", label: "Model Context Protocol (MCP)", definition: "An open standard for connecting AI apps to tools and data. MCP servers expose tools, resources and prompts that any MCP-compatible client or agent can use, instead of writing a custom integration for each.", related: ["tool-use", "agents", "apis", "networking"] },
    { id: "agent-patterns", topic: "ai-agentic", label: "Agent design patterns", definition: "Reusable ways to structure agents: the ReAct loop (reason → act → observe), planner–executor, routing, reflection / self-critique, and human-in-the-loop checkpoints.", related: ["agents"] },
    { id: "orchestration", topic: "ai-agentic", label: "Workflows & orchestration", definition: "Chaining LLM calls and tools into reliable pipelines (prompt chaining, routing, parallel steps), often with frameworks such as LangGraph. Workflows follow fixed paths; agents choose their own.", related: ["agent-patterns", "async"] },
    { id: "multi-agent", topic: "ai-agentic", label: "Multi-agent systems", definition: "Several specialized agents (e.g. researcher, coder, reviewer) coordinated by an orchestrator or talking to each other to split up a large task.", related: ["orchestration", "agents"] },
    { id: "context-eng", topic: "ai-agentic", label: "Context engineering & memory", definition: "Deciding what goes into the model's limited context window: instructions, retrieved documents, tool results, conversation history, and long-term memory stored between sessions.", related: ["rag", "prompting"] },
    { id: "vector-db", topic: "ai-agentic", label: "Vector databases", definition: "Databases that store embeddings and find the most similar ones fast (e.g. pgvector, Pinecone, Chroma). The retrieval layer behind RAG and agent memory.", related: ["embedding", "rag", "databases"] },
    { id: "evals", topic: "ai-agentic", label: "LLM evaluation (evals)", definition: "Systematically testing AI outputs with test sets, graders (code, human or LLM-as-judge) and metrics, so you can tell whether a change made the system better.", related: ["precision-recall", "testing"] },
    { id: "guardrails", topic: "ai-agentic", label: "Guardrails & AI safety", definition: "Controls that keep AI systems safe and on-task: input/output filtering, permissions on tools, prompt-injection defenses, and approval steps for risky actions.", related: ["tool-use", "security-basics"] },
    { id: "llmops", topic: "ai-agentic", label: "LLMOps & observability", definition: "Running AI apps in production: deployment, tracing each LLM and tool call, monitoring cost, latency and quality, and versioning prompts and models.", related: ["evals", "git", "testing"] },
    { id: "ai-architecture", topic: "ai-agentic", label: "AI solution architecture", definition: "Designing the end-to-end system around a model: choosing models, data and retrieval, tools/MCP integrations, security, scaling and cost, and how it fits the customer's existing stack.", related: ["llmops", "rag", "mcp", "guardrails", "system-design"] },
    { id: "fde", topic: "ai-agentic", label: "Forward deployed engineering", definition: "Engineers who embed with customers to discover their problems, then design, build and deploy AI solutions in the customer's real environment, mixing solution architecture, hands-on coding and stakeholder work.", related: ["ai-architecture"] },

    // ── Finance · Core
    { id: "tvm", topic: "fin-core", label: "Time value of money", definition: "A dollar today is worth more than a dollar tomorrow, because it can be invested. This is the basis of discounting." },
    { id: "npv", topic: "fin-core", label: "NPV", definition: "Net Present Value: the sum of a project's future cash flows discounted to today, minus its cost. Positive NPV creates value.", related: ["tvm"] },
    { id: "statements", topic: "fin-core", label: "Financial statements", definition: "Income statement (profit), balance sheet (what a firm owns and owes) and cash-flow statement (cash in and out)." },
    { id: "dcf", topic: "fin-core", label: "DCF valuation", definition: "Discounted Cash Flow: valuing a company as the present value of the cash it will generate in the future.", related: ["npv", "statements"] },
    { id: "risk-return", topic: "fin-core", label: "Risk & return", definition: "Higher expected returns usually come with higher risk (uncertainty); investors demand compensation for bearing risk.", related: ["probability-stats"] },

    // ── Finance · Markets
    { id: "stocks", topic: "fin-mkt", label: "Stocks (equity)", definition: "Shares of ownership in a company. Holders gain from price growth and dividends." },
    { id: "bonds", topic: "fin-mkt", label: "Bonds", definition: "Loans to governments or companies that pay interest (coupons). Bond prices fall when interest rates rise.", related: ["tvm"] },
    { id: "etf", topic: "fin-mkt", label: "ETFs & index funds", definition: "Funds that hold a basket of assets tracking an index, giving cheap, instant diversification." },
    { id: "diversification", topic: "fin-mkt", label: "Diversification", definition: "Spreading money across assets that don't move together, lowering risk without giving up as much return.", related: ["risk-return", "etf"] },
    { id: "derivatives", topic: "fin-mkt", label: "Derivatives", definition: "Contracts whose value depends on another asset: options, futures, swaps. Used for hedging or speculation." },
    { id: "emh", topic: "fin-mkt", label: "Market efficiency", definition: "The Efficient Market Hypothesis: prices already reflect available information, so consistently beating the market is hard." },

    // ── Finance · Quant
    { id: "time-series", topic: "fin-quant", label: "Time series", definition: "Data indexed by time (daily prices, returns). It needs special care: trends, seasonality, and no peeking into the future.", related: ["sequence-models", "regression"] },
    { id: "volatility", topic: "fin-quant", label: "Volatility", definition: "How much returns swing, usually measured as the standard deviation of returns. The most common measure of risk.", related: ["risk-return", "probability-stats"] },
    { id: "sharpe", topic: "fin-quant", label: "Sharpe ratio", definition: "Excess return per unit of volatility: (return − risk-free rate) ÷ volatility. Higher is better risk-adjusted performance.", related: ["volatility"] },
    { id: "capm", topic: "fin-quant", label: "CAPM & beta", definition: "Capital Asset Pricing Model: expected return = risk-free rate + beta × market premium. Beta is estimated with a regression on market returns.", related: ["regression", "risk-return"] },
    { id: "monte-carlo", topic: "fin-quant", label: "Monte Carlo simulation", definition: "Simulating thousands of random future scenarios to estimate the range of outcomes, e.g. for pricing options or planning retirement.", related: ["derivatives", "probability-stats"] },
    { id: "backtesting", topic: "fin-quant", label: "Backtesting", definition: "Testing a trading strategy on historical data. It is easy to fool yourself: watch for overfitting and look-ahead bias.", related: ["overfitting", "time-series"] },

    // ── AI × Finance (bridge)
    { id: "algo-trading", domain: "aifin", label: "Algorithmic trading", definition: "Using models and code to make trading decisions automatically, from simple rules to ML-predicted signals.", related: ["backtesting", "supervised", "time-series", "emh"] },
    { id: "credit-scoring", domain: "aifin", label: "Credit scoring", definition: "Predicting the probability a borrower defaults, a classic classification problem where explainability matters.", related: ["classification", "precision-recall", "statements"] },
    { id: "fraud-detection", domain: "aifin", label: "Fraud detection", definition: "Spotting suspicious transactions in real time with anomaly detection and classifiers trained on rare positive cases.", related: ["unsupervised", "classification", "precision-recall"] },
    { id: "sentiment", domain: "aifin", label: "Financial sentiment (NLP)", definition: "Using language models to read news, earnings calls and filings and turn their tone into trading or risk signals.", related: ["transformer", "embedding", "stocks"] },
    { id: "robo-advisor", domain: "aifin", label: "Robo-advisors", definition: "Automated platforms that build and rebalance diversified portfolios from a client's goals and risk tolerance.", related: ["diversification", "etf", "agents"] },
    { id: "risk-modeling", domain: "aifin", label: "ML risk modeling", definition: "Using machine learning to forecast volatility, losses and stress scenarios beyond classic statistical models.", related: ["volatility", "monte-carlo", "neural-net", "feature-eng"] },
    { id: "fin-llm", domain: "aifin", label: "LLMs for finance", definition: "Applying LLMs and RAG to research reports, filings and customer service, such as summarizing a 10-K or answering questions over it.", related: ["rag", "statements", "agents", "mcp"] }
  ],

  // The Plan tab: a phased study plan. Each phase has one MAIN track (~60% of your weekly hours),
  // one SUPPORT track (~25%) and a light HABIT (~15%). Steps are done in order; each has a link,
  // the reason for its position (why) and the study method to use (how). Hours are rough estimates.
  // A step can link to a course (`ref`, optional `modules`), one of your own courses (`match`)
  // or a certification exam (`cert` + `exam`); otherwise its checkbox is stored on its own.
  plan: {
    budget: 12,
    split: { main: 0.6, support: 0.25, habit: 0.15 },
    lanes: [
      { id: "ai", name: "AI engineering", topic: "ai" },
      { id: "gov", name: "AI governance · AIGP", topic: "gov" },
      { id: "cs", name: "CS foundations · MS-CS", topic: "cs" },
      { id: "ea", name: "Enterprise architecture · TOGAF", topic: "ea" },
      { id: "consult", name: "Consulting & communication", topic: "consult" },
      { id: "review", name: "Review habit", topic: "other" }
    ],
    phases: [
      { id: "p1", title: "Build AI engineering depth",
        why: "Your depth track comes first: it gives everything after it (AIGP, architecture) concrete examples to hang on. CS50x keeps your foundations moving on the side." },
      { id: "p2", title: "AIGP: learn through the exam",
        why: "AI governance overlaps most with your AI work. Studying by the exam outline with practice questions from week one is the most efficient way to learn it." },
      { id: "p3", title: "MS-CS pathway courses",
        why: "Pathway course grades decide admission, so they get a phase of their own and never overlap with an exam crunch." },
      { id: "p4", title: "TOGAF in one focused block",
        why: "TOGAF is a separate body of knowledge with its own vocabulary; one focused block (Part 1 then Part 2) avoids forgetting between the two exams." }
    ],
    steps: [
      // ── Phase 1
      { id: "s-anki", phase: "p1", role: "habit", lane: "review", ongoing: true, hours: 0,
        title: "Set up a spaced-repetition deck (Anki) and review 15 minutes a day", url: "https://apps.ankiweb.net/",
        why: "Spaced retrieval is the best-supported study method there is; starting now means every later phase benefits.",
        how: "After each study session write 5–10 question cards in your own words. Review daily; never just reread notes." },
      { id: "s-fde", phase: "p1", role: "main", lane: "ai", match: "fde", hours: 30,
        title: "Finish the AI FDE / Agentic AI Architect course",
        why: "Your main goal track. Concepts here (agents, MCP, architecture) are reused in every later phase.",
        how: "After each section, close the video and rebuild the example from memory before checking. Write down open questions." },
      { id: "s-mcp", phase: "p1", role: "main", lane: "ai", hours: 20, project: true,
        title: "Project: build a small MCP server (e.g. finance data)", url: "https://modelcontextprotocol.io/",
        why: "Building it is what moves MCP, tool use and APIs from Understand to Apply.",
        how: "Keep scope tiny: one tool, one resource. Ship it, write a README, then log it on My courses as a Project." },
      { id: "s-cs50-a", phase: "p1", role: "support", lane: "cs", ref: "c-cs50x", modules: ["w0", "w1", "w2", "w3", "w4", "w5"], hours: 60,
        title: "CS50x Weeks 0–5 (Scratch, C, arrays, algorithms, memory, data structures)",
        why: "Hands-on and steady: a good contrast to the course-heavy main track, and the base for the MS-CS later.",
        how: "Attempt each problem set before watching walkthroughs. Do one week per 1–2 weeks; don't binge." },
      { id: "s-emory-1", phase: "p1", role: "habit", lane: "consult", ref: "c-emory-present", hours: 7,
        title: "Consulting Presentations and Storytelling (Emory)",
        why: "Short; it teaches the pyramid structure you will use for every memo from now on.",
        how: "Re-write one slide or email from your own work with an action title after each module." },
      { id: "s-genai", phase: "p1", role: "habit", lane: "ai", ref: "c-genai-everyone", hours: 6,
        title: "Generative AI for Everyone",
        why: "General AI literacy from a business angle: how generative AI works, what it can and can't do, and how projects run. Light enough to sit next to the FDE course.",
        how: "Watch at normal speed; for each lesson write one card: 'what would I tell a client about this?'" },

      // ── Phase 2
      { id: "s-aigp-bok", phase: "p2", role: "main", lane: "gov", hours: 3,
        title: "Download the AIGP Body of Knowledge and exam blueprint; turn each item into a question", url: "https://iapp.org/certify/aigp/",
        why: "The exam outline becomes your study map, so you study what is tested, in the right depth.",
        how: "One line per BoK item as a question ('What does the EU AI Act require for high-risk systems?'). These become Anki cards." },
      { id: "s-aigp-practice", phase: "p2", role: "main", lane: "gov", hours: 6,
        title: "Do practice questions from week one, not only at the end", url: "https://iapp.org/certify/aigp-candidate-handbook",
        why: "Testing yourself before you feel ready (pre-testing) improves what you then learn from reading.",
        how: "Do 10–20 questions a week; for each wrong answer, write a card explaining the right answer." },
      { id: "s-nist-rmf", phase: "p2", role: "main", lane: "gov", ref: "r-nist-ai-rmf", hours: 4,
        title: "NIST AI RMF: the Govern, Map, Measure and Manage functions",
        why: "The most widely used AI risk framework; the vocabulary for everything else in AIGP.",
        how: "Read the four functions, then draw them from memory on one page." },
      { id: "s-eu-ai-act", phase: "p2", role: "main", lane: "gov", ref: "r-eu-ai-act", hours: 8,
        title: "EU AI Act key provisions: prohibited practices (Art. 5), high-risk classification (Art. 6) and requirements (Arts. 8–15), transparency (Art. 50), general-purpose AI (Chapter V)",
        why: "The core law on the exam; reading only the key provisions is far more efficient than reading it cover to cover.",
        how: "For each provision, write who it applies to, what they must do, and one example from your own AI work." },
      { id: "s-gdpr", phase: "p2", role: "main", lane: "gov", ref: "r-gdpr", hours: 6,
        title: "GDPR key articles: principles (Art. 5), lawful basis (Art. 6), automated decisions (Art. 22), DPIA (Art. 35)",
        why: "Where data protection meets algorithmic bias, a frequent exam and real-world topic.",
        how: "Link each article to an AI case, e.g. Art. 22 ↔ credit scoring. Use the connected nodes on the Skill map." },
      { id: "s-iso", phase: "p2", role: "main", lane: "gov", ref: "r-iso-42001", hours: 4,
        title: "ISO/IEC 42001: management-system clauses and Annex A controls",
        why: "Shows how governance is run in practice; links to TOGAF's governance ideas later.",
        how: "Skim the clause structure; compare it with NIST AI RMF in a two-column table." },
      { id: "s-nist-1270", phase: "p2", role: "main", lane: "gov", ref: "r-nist-1270", hours: 3,
        title: "NIST SP 1270: sources of bias in AI",
        why: "Gives the bias and fairness part of AIGP a solid structure.",
        how: "Summarize the three bias categories with one example each from your own projects." },
      { id: "s-memos", phase: "p2", role: "habit", lane: "consult", hours: 8,
        title: "Write a one-page pyramid memo for each law or framework you study",
        why: "Doubles as retrieval practice for AIGP and as consulting writing practice.",
        how: "Answer first, then three supporting points; no more than one page." },
      { id: "s-cs50-b", phase: "p2", role: "support", lane: "cs", ref: "c-cs50x", modules: ["w6", "w7", "w8", "w9", "project"], hours: 50,
        title: "CS50x Weeks 6–9 and Final Project (Python, SQL, web, Flask)",
        why: "Hands-on contrast to AIGP's reading; finishes your foundation before the MS-CS phase.",
        how: "Same rule: problem set first, help second. Make the final project something you can reuse (e.g. a small AI tool)." },
      { id: "s-aigp-exam", phase: "p2", role: "main", lane: "gov", cert: "aigp", exam: "aigp-exam", hours: 8,
        title: "Book and pass the AIGP exam",
        why: "Ends the phase with a milestone while everything is fresh.",
        how: "Book once you score comfortably on full timed practice exams; in the final week only review your cards and wrong answers." },

      // ── Phase 3
      { id: "s-mscs-pathway", phase: "p3", role: "main", lane: "cs", ref: "d-mscs", hours: 150,
        title: "MS-CS pathway courses (CU Boulder on Coursera)",
        why: "High stakes: your grades decide admission, so this is the only main track in the phase.",
        how: "Treat each course like an exam: weekly spaced review, practice problems, and the course forums before deadlines." },
      { id: "s-agents-project", phase: "p3", role: "support", lane: "ai", hours: 25, project: true,
        title: "Project: multi-agent workflow with evals and guardrails", url: "https://www.anthropic.com/engineering/building-effective-agents",
        why: "Applies AIGP ideas (risk, evaluation, transparency) to real code; keeps your AI skills active.",
        how: "Write the evaluation set first, then build. Document risks and controls as a short model card." },
      { id: "s-aigp-review", phase: "p3", role: "habit", lane: "review", hours: 6,
        title: "Keep reviewing your AIGP cards (spaced: 1, 3, 7, 14, 30 days)",
        why: "Without review most exam knowledge fades within months; spacing keeps it for the long term.",
        how: "15 minutes a day in Anki; suspend cards you know cold." },

      // ── Phase 4
      { id: "s-togaf-std", phase: "p4", role: "main", lane: "ea", ref: "c-togaf-standard", hours: 15,
        title: "Read the TOGAF Standard core: the ADM first, then the content framework",
        why: "The ADM is the backbone of both exams; everything else hangs off it.",
        how: "Draw the ADM cycle from memory every few days until you can list each phase's purpose and outputs." },
      { id: "s-togaf-1", phase: "p4", role: "main", lane: "ea", cert: "togaf10", exam: "foundation", hours: 25,
        title: "TOGAF Part 1 (OGEA-101): practice questions, then the exam",
        why: "Closed book, so it rewards retrieval practice; take it while Part 2 material is still ahead.",
        how: "Timed 40-question practice sets; mix questions across ADM phases (interleaving) instead of one phase at a time." },
      { id: "s-togaf-2", phase: "p4", role: "main", lane: "ea", cert: "togaf10", exam: "practitioner", hours: 30,
        title: "TOGAF Part 2 (OGEA-102): scenario practice, then the exam",
        why: "Builds directly on Part 1; doing it right after avoids relearning.",
        how: "Practice choosing the best answer in scenarios and finding things fast in the standard (open book)." },
      { id: "s-mscs-degree", phase: "p4", role: "support", lane: "cs", ref: "d-mscs", ongoing: true, hours: 0,
        title: "MS-CS degree courses, one at a time",
        why: "Once admitted, a steady one-course pace fits alongside other goals.",
        how: "One course at a time; keep the same weekly review habit." },
      { id: "s-pitch", phase: "p4", role: "habit", lane: "consult", ongoing: true, hours: 0,
        title: "After every project: a one-page memo and a 3-minute recorded pitch",
        why: "Communication improves with repetition and feedback, not more courses.",
        how: "Record, watch it back once, note one thing to improve next time." }
    ],
    methods: [
      { name: "Retrieval practice", strength: "Strong evidence", tip: "Test yourself (questions, explaining from memory) instead of rereading." },
      { name: "Spaced repetition", strength: "Strong evidence", tip: "Review after 1, 3, 7, 14 and 30 days; a few minutes daily beats long sessions." },
      { name: "Learning by doing", strength: "Strong for skills", tip: "Build a project after each course; it is what moves skills to Apply." },
      { name: "Interleaving", strength: "Moderate evidence", tip: "Mix similar topics that are easy to confuse (ADM phases, different laws); not unrelated subjects." },
      { name: "Elaboration", strength: "Moderate evidence", tip: "Ask why, and link new ideas to ones you know (the dashed links on the Skill map)." },
      { name: "One session, one subject", strength: "Task-switching costs", tip: "Parallel tracks on different days or sessions, not three subjects in one evening." },
      { name: "Rereading and highlighting", strength: "Low value", tip: "Fine for a first pass, but never the main way to study." }
    ]
  },

  // Your plan: added once to My courses as "Up next" (bump the id to add new items later).
  starterPlan: {
    id: "plan-2026-11",
    certifications: ["togaf10", "aigp"],
    planned: ["d-mscs", "r-nist-ai-rmf", "r-iso-42001", "r-eu-ai-act", "r-gdpr", "r-nist-1270", "c-togaf-standard"]
  },

  // Certification paths you can add on the My courses page. Links point only to official sites;
  // your own study materials are recognized by the `match` keywords when you paste their links.
  certifications: [
    { id: "aigp", name: "IAPP Artificial Intelligence Governance Professional", short: "AIGP", provider: "IAPP",
      url: "https://iapp.org/certify/aigp/", category: "gov", match: ["aigp"],
      exams: [
        { id: "aigp-exam", code: "AIGP", name: "AIGP certification exam",
          format: "100 multiple-choice questions (15 unscored) · 3 hours including an optional 15-minute break", url: "https://iapp.org/certify/aigp-candidate-handbook",
          covers: ["ai-governance", "nist-ai-rmf", "iso-42001", "ai-risk-assessment", "eu-ai-act", "ai-conformity", "national-ai-laws", "gdpr", "privacy-principles", "dpia", "adm-rights", "algorithmic-bias", "fairness-metrics", "transparency-docs"],
          steps: [
            "Download the current AIGP Body of Knowledge and Exam Blueprint from iapp.org",
            "Domain I: foundations of AI governance (AI basics, risks and harms, responsible AI principles)",
            "Domain II: laws, standards and frameworks (EU AI Act, GDPR, NIST AI RMF, ISO/IEC 42001)",
            "Domain III: governing AI development (risk assessment, data, testing, documentation)",
            "Domain IV: governing AI deployment and use (monitoring, incidents, third-party AI)",
            "Take timed practice exams until you are comfortably above the pass mark",
            "Book the exam"
          ] }
      ] },
    { id: "togaf10", name: "TOGAF® Enterprise Architecture (10th Edition)", short: "TOGAF 10", provider: "The Open Group",
      url: "https://www.opengroup.org/togaf", category: "ea", match: ["togaf", "ogea"],
      exams: [
        { id: "foundation", code: "OGEA-101", name: "Part 1: TOGAF Enterprise Architecture Foundation",
          format: "40 multiple-choice questions · 60 minutes · closed book · pass mark 60%", url: "https://certification.opengroup.org/node/14",
          covers: ["togaf", "adm", "arch-content", "enterprise-continuum", "arch-repository", "arch-principles", "arch-governance", "ea-stakeholders"],
          steps: [
            "Read the TOGAF Standard fundamental content: introduction and core concepts",
            "Learn every ADM phase (Preliminary, A–H, Requirements Management): purpose, inputs and outputs",
            "Learn the content framework: deliverables, artifacts and building blocks",
            "Learn the Enterprise Continuum and the Architecture Repository",
            "Learn architecture principles, governance and stakeholder management",
            "Take full timed practice tests until you score 75%+ consistently",
            "Book the exam"
          ] },
        { id: "practitioner", code: "OGEA-102", name: "Part 2: TOGAF Enterprise Architecture Practitioner",
          format: "8 scenario questions · 90 minutes · open book · gradient scoring · pass mark 60%", url: "https://certification.opengroup.org/node/14",
          covers: ["adm", "business-arch", "data-arch", "application-arch", "technology-arch", "capability-mapping", "value-streams", "migration-planning"],
          steps: [
            "Pass Part 1 first (or plan for the combined OGEA-103 exam)",
            "Practice applying the ADM to scenarios: choose the best answer, not just a correct one",
            "Learn how to tailor the ADM and use the series guides (e.g. business scenarios, capability-based planning)",
            "Practice finding things fast in the standard (the exam is open book)",
            "Do timed scenario practice: about 11 minutes per question",
            "Book the exam"
          ] }
      ] }
  ],

  courses: [
    // Degree (type: "degree")
    { id: "d-mscs", type: "degree", title: "Master of Science in Computer Science (CU Boulder, on Coursera)", provider: "University of Colorado Boulder / Coursera", url: "https://www.coursera.org/degrees/ms-computer-science-boulder", cost: "Tuition (see official page)", level: "Advanced",
      covers: ["big-o", "sorting-searching", "trees-graphs", "recursion", "discrete-math", "os-processes", "networking", "databases", "system-design", "how-computers-work", "probability-stats", "linear-algebra"] },

    // Reading: official standards, frameworks and laws (type: "reading")
    { id: "r-nist-ai-rmf", type: "reading", title: "NIST AI Risk Management Framework (AI RMF 1.0)", provider: "NIST", url: "https://www.nist.gov/itl/ai-risk-management-framework", cost: "Free", level: "Intermediate",
      covers: ["nist-ai-rmf", "ai-risk-assessment", "ai-governance"] },
    { id: "r-iso-42001", type: "reading", title: "ISO/IEC 42001:2023 AI management system", provider: "ISO", url: "https://www.iso.org/standard/42001", cost: "Paid standard", level: "Intermediate",
      covers: ["iso-42001", "ai-risk-assessment"] },
    { id: "r-eu-ai-act", type: "reading", title: "EU AI Act: Regulation (EU) 2024/1689", provider: "EUR-Lex (European Union)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", cost: "Free", level: "Intermediate",
      covers: ["eu-ai-act", "ai-conformity", "transparency-docs"] },
    { id: "r-gdpr", type: "reading", title: "GDPR: Regulation (EU) 2016/679", provider: "EUR-Lex (European Union)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", cost: "Free", level: "Intermediate",
      covers: ["gdpr", "privacy-principles", "dpia", "adm-rights"] },
    { id: "r-nist-1270", type: "reading", title: "NIST SP 1270: Towards a Standard for Identifying and Managing Bias in AI", provider: "NIST", url: "https://doi.org/10.6028/NIST.SP.1270", cost: "Free", level: "Intermediate",
      covers: ["algorithmic-bias", "fairness-metrics", "explainability"] },

    // Enterprise Architecture (official source only; add your own study materials on My courses)
    { id: "c-togaf-standard", type: "reading", title: "The TOGAF Standard, 10th Edition (official)", provider: "The Open Group", url: "https://www.opengroup.org/togaf", cost: "Free to read (registration)", level: "Intermediate",
      covers: ["togaf", "adm", "arch-content", "enterprise-continuum", "arch-repository", "business-arch", "data-arch", "application-arch", "technology-arch", "migration-planning", "arch-principles", "arch-governance", "ea-stakeholders", "capability-mapping"] },

    // Consulting & Communication
    { id: "c-emory-present", title: "Consulting Presentations and Storytelling", provider: "Coursera / Emory University", url: "https://www.coursera.org/learn/management-consulting-presentations", cost: "Subscription (7-day trial / financial aid)", level: "Beginner",
      covers: ["pyramid-principle", "storyline", "data-storytelling", "slide-design", "exec-presence"] },
    { id: "c-emory-problem", title: "Consulting Approach to Problem Solving", provider: "Coursera / Emory University", url: "https://www.coursera.org/learn/consulting-problem-solving", cost: "Subscription (7-day trial / financial aid)", level: "Beginner",
      covers: ["mece", "issue-tree", "hypothesis-driven", "prioritization"] },
    { id: "c-genai-everyone", domain: "ai", title: "Generative AI for Everyone", provider: "DeepLearning.AI / Coursera", url: "https://www.coursera.org/learn/generative-ai-for-everyone", cost: "Free", level: "Beginner",
      covers: ["prompting", "transformer", "use-case-prioritization", "business-case"] },
    { id: "c-minto", title: "The Pyramid Principle (Barbara Minto: book & course)", provider: "barbaraminto.com", url: "https://barbaraminto.com/course", cost: "Book is cheap; course is paid", level: "Intermediate",
      covers: ["pyramid-principle", "storyline", "mece"] },

    // CS Foundations (roughly in this order)
    { id: "c-cs50p", title: "CS50's Introduction to Programming with Python", provider: "Harvard", url: "https://cs50.harvard.edu/python/", cost: "Free", level: "Beginner",
      covers: ["python", "functions", "oop", "debugging", "testing"] },
    { id: "c-cs50x", title: "CS50x: Introduction to Computer Science", provider: "Harvard", url: "https://cs50.harvard.edu/x/", cost: "Free", level: "Beginner",
      covers: ["how-computers-work"],
      // Track week by week: each module lights up its own concepts when done.
      modules: [
        { id: "w0", title: "Week 0: Scratch", url: "https://cs50.harvard.edu/x/weeks/0/", covers: ["binary", "algorithms-pseudocode", "conditionals-loops", "functions", "sorting-searching"] },
        { id: "w1", title: "Week 1: C", url: "https://cs50.harvard.edu/x/weeks/1/", covers: ["c-lang", "conditionals-loops", "cli"] },
        { id: "w2", title: "Week 2: Arrays", url: "https://cs50.harvard.edu/x/weeks/2/", covers: ["arrays-lists", "debugging", "c-lang"] },
        { id: "w3", title: "Week 3: Algorithms", url: "https://cs50.harvard.edu/x/weeks/3/", covers: ["sorting-searching", "big-o", "recursion"] },
        { id: "w4", title: "Week 4: Memory", url: "https://cs50.harvard.edu/x/weeks/4/", covers: ["memory-pointers", "how-computers-work"] },
        { id: "w5", title: "Week 5: Data Structures", url: "https://cs50.harvard.edu/x/weeks/5/", covers: ["arrays-lists", "hash-maps", "trees-graphs"] },
        { id: "w6", title: "Week 6: Python", url: "https://cs50.harvard.edu/x/weeks/6/", covers: ["python", "functions"] },
        { id: "w7", title: "Week 7: SQL", url: "https://cs50.harvard.edu/x/weeks/7/", covers: ["databases"] },
        { id: "w8", title: "Week 8: HTML, CSS, JavaScript", url: "https://cs50.harvard.edu/x/weeks/8/", covers: ["networking", "web-basics"] },
        { id: "w9", title: "Week 9: Flask", url: "https://cs50.harvard.edu/x/weeks/9/", covers: ["web-basics", "apis"] },
        { id: "project", title: "Final Project", url: "https://cs50.harvard.edu/x/project/", covers: [] }
      ] },
    { id: "c-missing", title: "The Missing Semester of Your CS Education", provider: "MIT", url: "https://missing.csail.mit.edu/", cost: "Free", level: "Beginner",
      covers: ["cli", "git", "debugging", "security-basics"] },
    { id: "c-cs50sql", title: "CS50's Introduction to Databases with SQL", provider: "Harvard", url: "https://cs50.harvard.edu/sql/", cost: "Free", level: "Beginner",
      covers: ["databases"] },
    { id: "c-3b1b", title: "Essence of Linear Algebra & Calculus (videos)", provider: "3Blue1Brown", url: "https://www.3blue1brown.com/topics/linear-algebra", cost: "Free", level: "Beginner",
      covers: ["linear-algebra", "calculus"] },
    { id: "c-math-ml", title: "Mathematics for Machine Learning Specialization", provider: "Coursera / Imperial College London", url: "https://www.coursera.org/specializations/mathematics-machine-learning", cost: "Free to audit", level: "Intermediate",
      covers: ["linear-algebra", "calculus", "probability-stats"] },
    { id: "c-stat110", title: "Stat 110: Probability", provider: "Harvard", url: "https://projects.iq.harvard.edu/stat110", cost: "Free", level: "Intermediate",
      covers: ["probability-stats", "discrete-math"] },
    { id: "c-neetcode", title: "NeetCode Roadmap (data structures & algorithms practice)", provider: "NeetCode", url: "https://neetcode.io/roadmap", cost: "Free", level: "Intermediate",
      covers: ["arrays-lists", "hash-maps", "trees-graphs", "recursion", "sorting-searching", "big-o"] },
    { id: "c-mit6006", title: "Introduction to Algorithms (6.006)", provider: "MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", cost: "Free", level: "Advanced",
      covers: ["big-o", "sorting-searching", "trees-graphs", "recursion", "hash-maps", "discrete-math"] },
    { id: "c-nand2tetris", title: "Nand2Tetris: Build a Modern Computer from First Principles", provider: "nand2tetris.org", url: "https://www.nand2tetris.org/", cost: "Free", level: "Advanced",
      covers: ["how-computers-work", "os-processes"] },
    { id: "c-tycs", title: "Teach Yourself Computer Science (full self-study guide)", provider: "teachyourselfcs.com", url: "https://teachyourselfcs.com/", cost: "Free", level: "Advanced",
      covers: ["how-computers-work", "os-processes", "networking", "databases", "discrete-math", "system-design", "big-o"] },

    // AI
    { id: "c-ml-ng", title: "Machine Learning Specialization (Andrew Ng)", provider: "Coursera / DeepLearning.AI", url: "https://www.coursera.org/specializations/machine-learning-introduction", cost: "Free to audit", level: "Beginner",
      covers: ["supervised", "unsupervised", "regression", "classification", "overfitting", "gradient-descent", "precision-recall", "neural-net"] },
    { id: "c-kaggle", title: "Kaggle Learn: Intro to ML & Feature Engineering", provider: "Kaggle", url: "https://www.kaggle.com/learn", cost: "Free", level: "Beginner",
      covers: ["supervised", "overfitting", "feature-eng"] },
    { id: "c-dl-spec", title: "Deep Learning Specialization", provider: "Coursera / DeepLearning.AI", url: "https://www.coursera.org/specializations/deep-learning", cost: "Free to audit", level: "Intermediate",
      covers: ["neural-net", "backprop", "cnn", "sequence-models", "transformer", "transfer-learning"] },
    { id: "c-fastai", title: "Practical Deep Learning for Coders", provider: "fast.ai", url: "https://course.fast.ai/", cost: "Free", level: "Intermediate",
      covers: ["neural-net", "cnn", "transfer-learning", "fine-tuning", "embedding"] },
    { id: "c-karpathy", title: "Neural Networks: Zero to Hero", provider: "Andrej Karpathy", url: "https://karpathy.ai/zero-to-hero.html", cost: "Free", level: "Advanced",
      covers: ["backprop", "neural-net", "transformer", "tokenization"] },
    { id: "c-hf", title: "Hugging Face LLM Course", provider: "Hugging Face", url: "https://huggingface.co/learn", cost: "Free", level: "Advanced",
      covers: ["transformer", "tokenization", "fine-tuning", "embedding", "agents"] },
    { id: "c-anthropic", title: "Anthropic Courses (prompting, RAG, tool use)", provider: "Anthropic on GitHub", url: "https://github.com/anthropics/courses", cost: "Free", level: "Intermediate",
      covers: ["prompting", "rag", "agents", "tool-use"] },
    { id: "c-mcp-docs", title: "Model Context Protocol: official docs & tutorials", provider: "modelcontextprotocol.io", url: "https://modelcontextprotocol.io/", cost: "Free", level: "Beginner",
      covers: ["mcp", "tool-use"] },
    { id: "c-mcp-dlai", title: "MCP: Build Rich-Context AI Apps with Anthropic", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/", cost: "Free", level: "Intermediate",
      covers: ["mcp", "tool-use", "agents"] },
    { id: "c-effective-agents", title: "Building Effective Agents (guide)", provider: "Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents", cost: "Free", level: "Intermediate",
      covers: ["agents", "agent-patterns", "orchestration", "tool-use", "multi-agent"] },

    // Finance
    { id: "c-khan", title: "Khan Academy: Finance & Capital Markets", provider: "Khan Academy", url: "https://www.khanacademy.org/economics-finance-domain/core-finance", cost: "Free", level: "Beginner",
      covers: ["tvm", "npv", "statements", "stocks", "bonds", "derivatives"] },
    { id: "c-shiller", title: "Financial Markets (Robert Shiller)", provider: "Coursera / Yale", url: "https://www.coursera.org/learn/financial-markets-global", cost: "Free to audit", level: "Beginner",
      covers: ["risk-return", "stocks", "bonds", "diversification", "emh", "derivatives"] },
    { id: "c-wharton", title: "Introduction to Corporate Finance", provider: "Coursera / Wharton", url: "https://www.coursera.org/learn/wharton-finance", cost: "Free to audit", level: "Beginner",
      covers: ["tvm", "npv", "dcf"] },
    { id: "c-damodaran", title: "Valuation Classes (Aswath Damodaran)", provider: "NYU Stern", url: "https://pages.stern.nyu.edu/~adamodar/", cost: "Free", level: "Intermediate",
      covers: ["dcf", "statements", "risk-return", "capm"] },
    { id: "c-mit-fin", title: "Topics in Mathematics with Applications in Finance", provider: "MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/", cost: "Free", level: "Advanced",
      covers: ["time-series", "volatility", "monte-carlo", "derivatives", "regression"] },

    // AI × Finance
    { id: "c-edhec", title: "Investment Management with Python and Machine Learning", provider: "Coursera / EDHEC", url: "https://www.coursera.org/specializations/investment-management-python-machine-learning", cost: "Subscription", level: "Intermediate",
      covers: ["diversification", "sharpe", "capm", "volatility", "backtesting", "robo-advisor", "risk-modeling"] },
    { id: "c-ml-trading", title: "Machine Learning for Trading", provider: "Coursera / Google Cloud & NYIF", url: "https://www.coursera.org/specializations/machine-learning-trading", cost: "Subscription", level: "Advanced",
      covers: ["algo-trading", "backtesting", "time-series", "sequence-models", "supervised"] },
    { id: "c-kaggle-fraud", title: "Kaggle: Credit Card Fraud & Credit Risk competitions", provider: "Kaggle", url: "https://www.kaggle.com/competitions", cost: "Free", level: "Intermediate",
      covers: ["fraud-detection", "credit-scoring", "precision-recall", "feature-eng"] }
  ]
};
