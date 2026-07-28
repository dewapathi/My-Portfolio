export const CORE_STACK = [
  "Python",
  "Django",
  "React Native",
  "Next.js",
  "AWS Lambda",
  "Docker",
  "Claude API",
  "Redis",
  "PostgreSQL",
  "TypeScript",
];

export type SkillGroup = {
  category: string;
  core: string[];
  more: string[];
};

export const TECH_STACK: SkillGroup[] = [
  {
    category: "AI / LLM",
    core: ["Claude API", "Multi-model"],
    more: ["Haiku + Sonnet", "Prompt Engineering", "Structured Tool Use", "Webhook Automation"],
  },
  {
    category: "Frontend",
    core: ["React.js", "Next.js", "TypeScript"],
    more: ["Tailwind CSS", "Framer Motion", "JavaScript", "HTML / CSS"],
  },
  {
    category: "Backend",
    core: ["Python", "Django", "Node.js"],
    more: ["DRF", "FastAPI", "Celery", "Express.js", "WebSockets"],
  },
  {
    category: "Mobile",
    core: ["React Native", "Expo"],
    more: ["Firebase FCM", "Push Notifications", "Twilio SMS", "App Store", "Play Store"],
  },
  {
    category: "AWS Cloud",
    core: ["Lambda", "ECS", "EC2"],
    more: [
      "Fargate", "ECR", "S3", "RDS", "DynamoDB", "SQS", "SNS", "SES",
      "EventBridge", "Step Functions", "Cognito", "WAF", "Route53",
      "CloudFront", "CloudWatch", "X-Ray", "CodePipeline", "IAM", "Secrets Manager",
    ],
  },
  {
    category: "DevOps & DB",
    core: ["Docker", "PostgreSQL", "Redis"],
    more: ["MySQL", "MongoDB", "DynamoDB", "GitHub Actions", "Jenkins", "Terraform", "CI/CD"],
  },
];

export type EngineeringLayer = {
  id: string;
  label: string;
  description: string;
  technologies: string[];
};

/** Every technology string here matches TECH_STACK exactly — no new tech introduced. */
export const ENGINEERING_LAYERS: EngineeringLayer[] = [
  {
    id: "product",
    label: "Product Experience",
    description: "The interface layer — fast, accessible, and built with the same care as the systems behind it.",
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "clients",
    label: "Web & Mobile Clients",
    description: "Cross-platform React Native apps shipped to both stores, alongside the web client.",
    technologies: ["React Native", "Expo", "Firebase FCM", "Push Notifications", "App Store", "Play Store"],
  },
  {
    id: "api",
    label: "API & Authentication",
    description: "Django REST and FastAPI services behind JWT/OAuth-based auth and role-based access control.",
    technologies: ["Django", "DRF", "FastAPI", "Cognito", "WAF"],
  },
  {
    id: "domain",
    label: "Domain Services",
    description: "The business-logic layer — Python and Node.js services that encode how the product actually works.",
    technologies: ["Python", "Django", "Node.js", "Express.js"],
  },
  {
    id: "async",
    label: "Async Processing",
    description: "Event-driven work that shouldn't block a request — queued, retried, and orchestrated.",
    technologies: ["Celery", "SQS", "EventBridge", "Step Functions"],
  },
  {
    id: "data",
    label: "Database & Cache",
    description: "Schema design, migrations, and Redis caching layers that keep production fast at scale.",
    technologies: ["PostgreSQL", "Redis", "MySQL", "DynamoDB"],
  },
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    description: "Containerised, zero-downtime deployments across AWS's compute and storage services.",
    technologies: ["Lambda", "ECS", "EC2", "Fargate", "S3", "Docker", "CI/CD"],
  },
  {
    id: "monitoring",
    label: "Monitoring & Security",
    description: "Observability and hardening — the layer that catches problems before users do.",
    technologies: ["CloudWatch", "X-Ray", "Secrets Manager", "IAM"],
  },
];
