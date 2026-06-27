export const SITE = {
  name: "Pradeepa Lakruwan",
  role: "Full Stack Engineer · Cloud & AI Specialist · Mobile",
  email: "pradeepalakruwan.d@gmail.com",
  phone: "+94 779 400 291",
  github: "https://github.com/dewapathi",
  linkedin: "https://linkedin.com/in/pradeepa-lakruwan",
  location: "Remote · Worldwide",
  available: true,
  tagline:
    "I architect and ship production software systems — from cloud infrastructure and AI automation to mobile app stores.",
};

export const STATS = [
  { value: "60%+", label: "API latency reduced" },
  { value: "20+", label: "AWS services in prod." },
  { value: "3+", label: "Years at production scale" },
  { value: "3", label: "Payment gateways shipped" },
];

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

export type Project = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  role: string;
  impact: string;
  stack: string[];
  image: string | null;
  accentFrom: string;
  accentTo: string;
  live: string | null;
  github: string | null;
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "AI Developer Automation System",
    category: "AI / LLM Automation",
    tagline:
      "Multi-model Claude pipeline that automatically triages Sentry errors and drafts root-cause PRs.",
    problem:
      "Manual Sentry error triage consumed hours of developer time. Engineers had to read stack traces, identify root causes, locate affected files, and write fix PRs — entirely manually.",
    role: "Sole architect & engineer — Django backend, Claude API integration, Bitbucket API, security design",
    impact:
      "Automated the full triage-to-PR pipeline: Claude Haiku discovers affected files (fast, cheap), Sonnet generates root-cause analysis and fix code, Bitbucket draft PR created automatically. Secret-filtering middleware ensures zero credential leakage to the LLM.",
    stack: ["Claude API", "Haiku + Sonnet", "Django", "Celery", "Bitbucket API", "Webhook Automation", "Python"],
    image: null,
    accentFrom: "#6366F1",
    accentTo: "#8B5CF6",
    live: null,
    github: null,
  },
  {
    id: "02",
    title: "Vehicle Spare Parts Platform",
    category: "Mobile Application",
    tagline:
      "Full-stack e-commerce for automotive parts — iOS & Android with PayHere payment integration.",
    problem:
      "A parts distributor needed a cross-platform mobile storefront with real-time inventory, order tracking, FCM push notifications, and PayHere payment processing — without maintaining two separate codebases.",
    role: "Sole engineer · full stack + mobile",
    impact:
      "Single React Native codebase deployed to both stores with live order status, Firebase push notifications, role-based admin panel, and a fully integrated PayHere payment flow.",
    stack: ["React Native", "Django REST", "Firebase FCM", "PayHere", "PostgreSQL", "Docker"],
    image: "/images/projects/M-auto.PNG",
    accentFrom: "#3B82F6",
    accentTo: "#06B6D4",
    live: null,
    github: null,
  },
  {
    id: "03",
    title: "Orivet Mobile App",
    category: "Mobile Application",
    tagline:
      "Veterinary microchip management and pet care mobile platform with Stripe subscription billing.",
    problem:
      "A vet-tech company needed a robust app with real-time pet tracking, push notifications, and Stripe subscription billing — tightly coupled to an existing Django backend.",
    role: "Mobile + backend integration engineer",
    impact:
      "Published on both App Store and Play Store; handles live tracking, Firebase push notifications, and recurring Stripe billing in production.",
    stack: ["React Native", "Django REST", "Stripe", "Firebase FCM", "AWS SNS", "PostgreSQL"],
    image: "/images/projects/Orivet.PNG",
    accentFrom: "#10B981",
    accentTo: "#059669",
    live: null,
    github: null,
  },
  {
    id: "04",
    title: "Student Management System",
    category: "Web Application",
    tagline:
      "Complete student platform with attendance, academic records, RBAC, and Stripe fee collection.",
    problem:
      "An educational institution needed a modern student management system — registration, attendance tracking, academic records, role-based access for admins, teachers and students, and integrated fee collection.",
    role: "Full stack engineer — frontend, backend, database architecture, payment integration",
    impact:
      "Complete platform live in production: RBAC across three roles, attendance and academic records system, dashboard analytics, and Stripe payment integration for fee collection.",
    stack: ["Next.js", "Django", "PostgreSQL", "Stripe", "TypeScript", "Tailwind CSS"],
    image: null,
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
    live: null,
    github: null,
  },
  {
    id: "05",
    title: "AWS Serverless Email Pipeline",
    category: "Cloud Architecture",
    tagline:
      "Fully serverless event-driven email architecture — decoupled, fault-tolerant, auto-retrying.",
    problem:
      "A production platform needed high-reliability async email delivery that handles failures gracefully without manual intervention or server maintenance overhead.",
    role: "Cloud architect & backend engineer",
    impact:
      "EventBridge triggers Lambda → SQS queues → Lambda workers → SES delivery. Zero-server maintenance, automatic retry on failure, decoupled services, and significantly reduced infrastructure cost vs. traditional server-based email.",
    stack: ["AWS Lambda", "SQS", "EventBridge", "SES", "IAM", "CloudWatch", "Python"],
    image: null,
    accentFrom: "#FF9900",
    accentTo: "#FF6B35",
    live: null,
    github: null,
  },
  {
    id: "06",
    title: "Voice Reminder & Life Organizer",
    category: "Mobile Application",
    tagline:
      "Advanced React Native reminder app — TTS voice alerts in 20+ country-language voices, Finance Vaults, vehicle tracking, and Firebase real-time sync.",
    problem:
      "Users needed smart reminders that speak aloud in their native language, not just vibrate. The app also had to manage vehicles, finance vaults, and recurring tasks — all in one polished experience.",
    role: "Sole engineer — full stack mobile, Firebase backend, TTS integration, multi-language architecture",
    impact:
      "Production app on both stores: Firebase Firestore + FCM for real-time sync and push, native TTS playback in 20+ country/language voice profiles, finance vault tracking, vehicle reminder system, and an organisation score dashboard. Voice reads reminder details aloud when a notification opens — a fully hands-free experience.",
    stack: ["React Native", "Firebase", "Firestore", "FCM", "Text-to-Speech", "i18n", "Multi-language Voices", "AsyncStorage"],
    image: null,
    accentFrom: "#8B5CF6",
    accentTo: "#C4B5FD",
    live: null,
    github: null,
  },
  {
    id: "07",
    title: "Glass Vials — Color Puzzle Game",
    category: "Mobile Game",
    tagline:
      "Published React Native color-sorting puzzle game — level packs, star ratings, animated glass vial mechanics, zero native game engine.",
    problem:
      "Build a fully polished, published mobile game with smooth pour animations, persistent progress, and a multi-pack level-unlock system — entirely in React Native without a native game engine.",
    role: "Sole developer — game logic, UI animations, level design, App Store & Play Store release",
    impact:
      "Live on both stores with multi-pack progression (Wooden Cabinet → Crystal Cave → Lava Forge), 3-star scoring, hint system, sound/vibration settings, and smooth tube-pour animations — all implemented in pure React Native Animated API.",
    stack: ["React Native", "Expo", "Animated API", "AsyncStorage", "Game Logic", "App Store", "Play Store"],
    image: null,
    accentFrom: "#F59E0B",
    accentTo: "#EC4899",
    live: null,
    github: null,
  },
  {
    id: "08",
    title: "PDF Report Generation Server",
    category: "Backend Service",
    tagline:
      "Node.js REST API on AWS EC2 generating structured multi-page PDF reports triggered by Firebase events.",
    problem:
      "A production app needed server-side PDF generation — dynamic, structured reports that couldn't be rendered client-side, triggered by Firebase real-time data events and delivered as downloadable files.",
    role: "Backend engineer — Node.js API, PDF templating, AWS EC2 hosting, Firebase integration",
    impact:
      "REST API deployed on AWS EC2: accepts structured JSON, generates multi-page PDF reports, stores output to S3 for download. Firebase trigger integration enables fully automated report generation on data events — zero manual intervention.",
    stack: ["Node.js", "Express", "PDFKit", "AWS EC2", "AWS S3", "Firebase", "REST API"],
    image: null,
    accentFrom: "#14B8A6",
    accentTo: "#06B6D4",
    live: null,
    github: null,
  },
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

export const PROOF_STATS = [
  { value: "60%+", label: "API latency reduction" },
  { value: "20+", label: "AWS services shipped" },
  { value: "3", label: "Payment gateways built" },
  { value: "4", label: "Mobile apps in stores" },
  { value: "2", label: "AI automation systems" },
  { value: "3+", label: "Years production impact" },
];

export const PROOF_TAGS = [
  "Claude API (Haiku + Sonnet)",
  "AWS Lambda + SQS + EventBridge",
  "Django REST Framework",
  "React Native iOS & Android",
  "Stripe + PayHere + Square",
  "Docker + ECS + Fargate",
  "Redis + Celery",
  "Firebase FCM",
  "CI/CD GitHub Actions",
  "JWT + Cognito + WAF",
  "WebSockets · Socket.IO",
  "Step Functions",
  "Serverless Architecture",
  "Zero-downtime Deployments",
  "Multi-model LLM Pipeline",
  "Agile · Scrum",
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

export const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "AI", href: "#ai" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
