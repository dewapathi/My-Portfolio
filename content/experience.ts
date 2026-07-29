export type Experience = {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    period: "2022 – Present",
    title: "Full Stack Software Engineer",
    company: "CreatIT Solutions (PVT) Ltd.",
    location: "Remote",
    description:
      "Backend-focused full-stack engineer with 3+ years of production experience building and scaling Python/Django REST APIs on AWS — comfortable owning services end-to-end, from API and schema design through authentication, payments, containerization, and CI/CD.",
    highlights: [
      "Architected and scaled Django REST Framework APIs powering business-critical workflows across multiple client platforms, cutting response latency 60%+ through Redis caching and Celery-based async task offloading",
      "Designed event-driven, serverless AWS architectures (Lambda, SQS, EventBridge, Step Functions) for asynchronous email and workflow processing, removing server-management overhead and improving fault tolerance through automatic retries",
      "Containerized services with Docker and deployed to AWS ECS/ECR/Fargate; built CI/CD pipelines with GitHub Actions and AWS CodePipeline, achieving zero-downtime releases",
      "Engineered secure payment processing by integrating Stripe, Square, and PayHere into live platforms handling real-money transactions",
      "Implemented authentication and access control using AWS Cognito, IAM roles, and Secrets Manager; administered PostgreSQL and multi-database architectures",
      "Delivered a React Native mobile commerce application (Android & iOS) end-to-end, including Firebase push notification integration — full-stack ownership beyond the backend",
      "Built AI-assisted engineering tooling on the Anthropic Claude API — automated Sentry error triage and code-fix generation, with security-first secret-filtering middleware",
      "Operated within Agile/Scrum teams, running sprint planning and peer code reviews across cross-functional delivery",
    ],
    stack: [
      "Python", "Django", "DRF", "FastAPI", "React Native", "Next.js", "AWS Lambda", "ECS", "Fargate", "Docker",
      "Claude API", "Redis", "Celery", "PostgreSQL", "MySQL", "Stripe", "Square", "PayHere", "Firebase FCM", "AWS Cognito", "CI/CD",
    ],
  },
];
