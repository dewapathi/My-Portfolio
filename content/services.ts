export type Service = {
  icon: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: "Layers",
    title: "Full Stack Development",
    description:
      "Complete web applications — Django/FastAPI backends, React/Next.js frontends, PostgreSQL, and cloud deployment end-to-end.",
  },
  {
    icon: "Server",
    title: "Backend API Architecture",
    description:
      "Scalable Django REST and FastAPI systems with Redis caching, Celery workers, RBAC, and a 60%+ latency reduction track record.",
  },
  {
    icon: "Smartphone",
    title: "React Native Mobile",
    description:
      "Cross-platform iOS and Android apps shipped to both stores — push notifications, real-money payments, offline sync.",
  },
  {
    icon: "Cloud",
    title: "AWS Cloud & DevOps",
    description:
      "20+ AWS services — Lambda, ECS, Fargate, SQS, EventBridge, Step Functions, CI/CD pipelines, zero-downtime deployments.",
  },
  {
    icon: "Zap",
    title: "AI / LLM Automation",
    description:
      "Anthropic Claude API pipelines — multi-model systems (Haiku + Sonnet), structured tool use, webhook-driven automation, security-first design.",
  },
  {
    icon: "Shield",
    title: "Payment Integrations",
    description:
      "Stripe, PayHere, and Square — subscription billing, webhook handling, refunds, and PCI-compliant transaction flows.",
  },
  {
    icon: "Database",
    title: "Performance Optimisation",
    description:
      "Redis caching, Celery async offloading, query tuning, and profiling — proven 60%+ API response time improvement in production.",
  },
  {
    icon: "Monitor",
    title: "MVP Development",
    description:
      "Fast, focused builds for founders — working product in weeks with architecture that holds beyond the MVP.",
  },
];

export type WorkPrinciple = {
  icon: string;
  title: string;
  description: string;
};

export const WORK_STYLE: WorkPrinciple[] = [
  {
    icon: "Code2",
    title: "Clean architecture",
    description:
      "Readable, modular code from Django API to React Native component — built for handover and longevity, not just the deadline.",
  },
  {
    icon: "MessageSquare",
    title: "Clear communication",
    description:
      "Regular updates, async-friendly, and direct. Sprint planning, code reviews, and cross-functional delivery in Agile teams.",
  },
  {
    icon: "BarChart2",
    title: "Measurable results",
    description:
      "I optimise for business impact — 60%+ API latency reduction, zero-downtime deploys, and reliable production uptime.",
  },
  {
    icon: "Layers",
    title: "End-to-end ownership",
    description:
      "Architecture to deployment to ongoing support — I own the full cycle, not just one layer of the stack.",
  },
  {
    icon: "Eye",
    title: "Security-first",
    description:
      "JWT, OAuth, RBAC, Cognito, WAF, Secrets Manager, and secret-filtering middleware — baked in from day one.",
  },
  {
    icon: "CheckSquare",
    title: "Production mindset",
    description:
      "I build for scale and resilience from the start — not MVP shortcuts that become expensive technical debt.",
  },
  {
    icon: "LifeBuoy",
    title: "Long-term partnership",
    description:
      "Available beyond delivery for bugs, performance improvements, new features, and infrastructure scaling.",
  },
  {
    icon: "Target",
    title: "Deadline-driven",
    description:
      "Honest scoping and milestone commitments. I deliver on time because I plan before I build.",
  },
];
