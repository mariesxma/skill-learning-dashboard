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
    { id: "ai", name: "Artificial Intelligence", color: "#7c5cff", anchor: [-460, -60],
      summary: "Teaching computers to learn patterns from data, from classic machine learning to deep learning and large language models." },
    { id: "fin", name: "Finance", color: "#0f9f6e", anchor: [460, -60],
      summary: "How money, markets and companies work: valuing assets, managing risk, and building portfolios." },
    { id: "aifin", name: "AI × Finance", color: "#e08a00", anchor: [0, 330],
      summary: "Where the two meet: applying machine learning to trading, credit, fraud and risk." }
  ],

  topics: [
    { id: "ai-found", domain: "ai", name: "ML Foundations" },
    { id: "ai-deep", domain: "ai", name: "Deep Learning" },
    { id: "ai-llm", domain: "ai", name: "LLMs & GenAI" },
    { id: "fin-core", domain: "fin", name: "Core Finance" },
    { id: "fin-mkt", domain: "fin", name: "Markets & Investing" },
    { id: "fin-quant", domain: "fin", name: "Quantitative Finance" }
  ],

  concepts: [
    // ── AI · ML Foundations
    { id: "supervised", topic: "ai-found", label: "Supervised learning", definition: "Training a model on labeled examples (input → known answer) so it can predict answers for new inputs, e.g. spam detection or price prediction." },
    { id: "unsupervised", topic: "ai-found", label: "Unsupervised learning", definition: "Finding structure in unlabeled data, such as clustering similar customers or flagging unusual points (anomaly detection)." },
    { id: "regression", topic: "ai-found", label: "Regression", definition: "Predicting a continuous number (house price, next-month return). Linear regression fits a straight line through the data.", related: ["supervised"] },
    { id: "classification", topic: "ai-found", label: "Classification", definition: "Predicting a category (fraud / not fraud, default / no default).", related: ["supervised"] },
    { id: "overfitting", topic: "ai-found", label: "Overfitting", definition: "When a model memorizes training data, noise included, and fails on new data. Countered with more data, regularization, cross-validation or simpler models." },
    { id: "gradient-descent", topic: "ai-found", label: "Gradient descent", definition: "The optimization method most models learn with: repeatedly nudging parameters in the direction that lowers the error (loss)." },
    { id: "precision-recall", topic: "ai-found", label: "Precision / Recall", definition: "Precision: of the items predicted positive, how many really are. Recall: of all real positives, how many were found.", related: ["classification"] },
    { id: "feature-eng", topic: "ai-found", label: "Feature engineering", definition: "Turning raw data into informative model inputs, e.g. ratios, moving averages or counts." },

    // ── AI · Deep Learning
    { id: "neural-net", topic: "ai-deep", label: "Neural network", definition: "Layers of simple connected units whose weights are learned from data; the foundation of deep learning.", related: ["gradient-descent"] },
    { id: "backprop", topic: "ai-deep", label: "Backpropagation", definition: "The algorithm that computes how much each weight contributed to the error, so gradient descent can update it.", related: ["neural-net", "gradient-descent"] },
    { id: "cnn", topic: "ai-deep", label: "CNN", definition: "Convolutional Neural Network, specialized for grid data like images; it learns local patterns such as edges and shapes.", related: ["neural-net"] },
    { id: "sequence-models", topic: "ai-deep", label: "Sequence models (RNN/LSTM)", definition: "Networks that process ordered data step by step while keeping a memory of what came before: text, audio, price series.", related: ["neural-net"] },
    { id: "transformer", topic: "ai-deep", label: "Transformer", definition: "An architecture built on attention, which lets every token weigh every other token. It powers modern LLMs.", related: ["sequence-models"] },
    { id: "transfer-learning", topic: "ai-deep", label: "Transfer learning", definition: "Reusing a model trained on a big dataset as the starting point for a new, smaller task." },

    // ── AI · LLMs
    { id: "tokenization", topic: "ai-llm", label: "Tokenization", definition: "Splitting text into tokens (word pieces) that a language model reads and predicts one at a time.", related: ["transformer"] },
    { id: "embedding", topic: "ai-llm", label: "Embedding", definition: "A vector of numbers representing an item (word, document, customer) so that similar items sit close together." },
    { id: "fine-tuning", topic: "ai-llm", label: "Fine-tuning", definition: "Continuing to train a pre-trained model on task-specific data to adapt it to your use case.", related: ["transfer-learning"] },
    { id: "prompting", topic: "ai-llm", label: "Prompt engineering", definition: "Designing instructions, context and examples so an LLM produces reliable, useful output." },
    { id: "rag", topic: "ai-llm", label: "RAG", definition: "Retrieval-Augmented Generation: fetching relevant documents at query time and giving them to the LLM so answers are grounded in your data.", related: ["embedding", "prompting"] },
    { id: "agents", topic: "ai-llm", label: "AI agents", definition: "LLM systems that plan and take actions with tools (search, code, APIs) in a loop to complete multi-step tasks.", related: ["prompting"] },

    // ── Finance · Core
    { id: "tvm", topic: "fin-core", label: "Time value of money", definition: "A dollar today is worth more than a dollar tomorrow, because it can be invested. This is the basis of discounting." },
    { id: "npv", topic: "fin-core", label: "NPV", definition: "Net Present Value: the sum of a project's future cash flows discounted to today, minus its cost. Positive NPV creates value.", related: ["tvm"] },
    { id: "statements", topic: "fin-core", label: "Financial statements", definition: "Income statement (profit), balance sheet (what a firm owns and owes) and cash-flow statement (cash in and out)." },
    { id: "dcf", topic: "fin-core", label: "DCF valuation", definition: "Discounted Cash Flow: valuing a company as the present value of the cash it will generate in the future.", related: ["npv", "statements"] },
    { id: "risk-return", topic: "fin-core", label: "Risk & return", definition: "Higher expected returns usually come with higher risk (uncertainty); investors demand compensation for bearing risk." },

    // ── Finance · Markets
    { id: "stocks", topic: "fin-mkt", label: "Stocks (equity)", definition: "Shares of ownership in a company. Holders gain from price growth and dividends." },
    { id: "bonds", topic: "fin-mkt", label: "Bonds", definition: "Loans to governments or companies that pay interest (coupons). Bond prices fall when interest rates rise.", related: ["tvm"] },
    { id: "etf", topic: "fin-mkt", label: "ETFs & index funds", definition: "Funds that hold a basket of assets tracking an index, giving cheap, instant diversification." },
    { id: "diversification", topic: "fin-mkt", label: "Diversification", definition: "Spreading money across assets that don't move together, lowering risk without giving up as much return.", related: ["risk-return", "etf"] },
    { id: "derivatives", topic: "fin-mkt", label: "Derivatives", definition: "Contracts whose value depends on another asset: options, futures, swaps. Used for hedging or speculation." },
    { id: "emh", topic: "fin-mkt", label: "Market efficiency", definition: "The Efficient Market Hypothesis: prices already reflect available information, so consistently beating the market is hard." },

    // ── Finance · Quant
    { id: "time-series", topic: "fin-quant", label: "Time series", definition: "Data indexed by time (daily prices, returns). It needs special care: trends, seasonality, and no peeking into the future.", related: ["sequence-models", "regression"] },
    { id: "volatility", topic: "fin-quant", label: "Volatility", definition: "How much returns swing, usually measured as the standard deviation of returns. The most common measure of risk.", related: ["risk-return"] },
    { id: "sharpe", topic: "fin-quant", label: "Sharpe ratio", definition: "Excess return per unit of volatility: (return − risk-free rate) ÷ volatility. Higher is better risk-adjusted performance.", related: ["volatility"] },
    { id: "capm", topic: "fin-quant", label: "CAPM & beta", definition: "Capital Asset Pricing Model: expected return = risk-free rate + beta × market premium. Beta is estimated with a regression on market returns.", related: ["regression", "risk-return"] },
    { id: "monte-carlo", topic: "fin-quant", label: "Monte Carlo simulation", definition: "Simulating thousands of random future scenarios to estimate the range of outcomes, e.g. for pricing options or planning retirement.", related: ["derivatives"] },
    { id: "backtesting", topic: "fin-quant", label: "Backtesting", definition: "Testing a trading strategy on historical data. It is easy to fool yourself: watch for overfitting and look-ahead bias.", related: ["overfitting", "time-series"] },

    // ── AI × Finance (bridge)
    { id: "algo-trading", domain: "aifin", label: "Algorithmic trading", definition: "Using models and code to make trading decisions automatically, from simple rules to ML-predicted signals.", related: ["backtesting", "supervised", "time-series", "emh"] },
    { id: "credit-scoring", domain: "aifin", label: "Credit scoring", definition: "Predicting the probability a borrower defaults, a classic classification problem where explainability matters.", related: ["classification", "precision-recall", "statements"] },
    { id: "fraud-detection", domain: "aifin", label: "Fraud detection", definition: "Spotting suspicious transactions in real time with anomaly detection and classifiers trained on rare positive cases.", related: ["unsupervised", "classification", "precision-recall"] },
    { id: "sentiment", domain: "aifin", label: "Financial sentiment (NLP)", definition: "Using language models to read news, earnings calls and filings and turn their tone into trading or risk signals.", related: ["transformer", "embedding", "stocks"] },
    { id: "robo-advisor", domain: "aifin", label: "Robo-advisors", definition: "Automated platforms that build and rebalance diversified portfolios from a client's goals and risk tolerance.", related: ["diversification", "etf", "agents"] },
    { id: "risk-modeling", domain: "aifin", label: "ML risk modeling", definition: "Using machine learning to forecast volatility, losses and stress scenarios beyond classic statistical models.", related: ["volatility", "monte-carlo", "neural-net", "feature-eng"] },
    { id: "fin-llm", domain: "aifin", label: "LLMs for finance", definition: "Applying LLMs and RAG to research reports, filings and customer service, such as summarizing a 10-K or answering questions over it.", related: ["rag", "statements", "agents"] }
  ],

  courses: [
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
      covers: ["prompting", "rag", "agents"] },

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
