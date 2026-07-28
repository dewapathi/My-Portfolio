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
      "AI-native full-stack engineer building production systems end-to-end — from cloud infrastructure and serverless architectures on AWS to React Native mobile applications shipped to both app stores.",
    highlights: [
      "Reduced API response latency by 60%+ via Redis caching and Celery async task offloading in Django REST production systems",
      "Designed AWS serverless pipelines (Lambda · SQS · EventBridge · Step Functions) for async processing and event-driven workflows",
      "Containerised microservices with Docker, deployed to AWS ECS/ECR/Fargate with zero-downtime CI/CD via GitHub Actions and CodePipeline",
      "Built React Native mobile applications (Android & iOS) independently from architecture through App Store and Play Store release",
      "Integrated Stripe, Square, and PayHere payment gateways handling real-money transactions across web and mobile platforms",
      "Built AI automation systems using Anthropic Claude API — multi-model pipeline (Haiku + Sonnet) with security-first secret-filtering middleware",
      "Secured infrastructure using AWS Cognito, Secrets Manager, IAM roles, and WAF; managed PostgreSQL and multi-database architectures",
      "Operated in Agile/Scrum teams with sprint planning, peer code reviews, and iterative cross-functional delivery",
    ],
    stack: [
      "Django", "React Native", "Next.js", "AWS Lambda", "ECS", "Fargate", "Docker",
      "Claude API", "Redis", "Celery", "PostgreSQL", "Stripe", "Firebase FCM", "CI/CD",
    ],
  },
];
