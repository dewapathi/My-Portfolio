export const SITE = {
  name: "Pradeepa Lakruwan",
  role: "Full Stack Software Engineer",
  email: "pradeepalakruwan.d@gmail.com",
  phone: "+94 77 9400 291",
  github: "https://github.com/pradeepalakruwan",
  linkedin: "https://linkedin.com/in/pradeepalakruwan",
  location: "Remote · Worldwide",
  available: true,
  tagline:
    "I design and build production-ready software systems that help businesses launch faster, automate operations, and scale with confidence.",
};

export const STATS = [
  { value: "8+", label: "Years shipping" },
  { value: "2", label: "Apps in stores" },
  { value: "4+", label: "Cloud deployments" },
  { value: "10+", label: "Systems delivered" },
];

export const CORE_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Django",
  "Python",
  "React Native",
  "PostgreSQL",
  "AWS",
  "Docker",
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
    title: "Vehicle Spare Parts Platform",
    category: "Mobile Application",
    tagline: "End-to-end e-commerce for automotive parts on iOS & Android.",
    problem:
      "A parts distributor needed a cross-platform mobile storefront with real-time inventory, order tracking, and local payment acceptance — without maintaining two separate codebases.",
    role: "Sole engineer · full stack + mobile",
    impact:
      "Single codebase deployed to both stores with live order status and a fully integrated payment flow.",
    stack: ["React Native", "Django REST", "Firebase", "Payhere", "PostgreSQL"],
    image: "/images/projects/M-auto.PNG",
    accentFrom: "#3B82F6",
    accentTo: "#06B6D4",
    live: null,
    github: null,
  },
  {
    id: "02",
    title: "Orivet Mobile App",
    category: "Mobile Application",
    tagline: "Veterinary microchip management and pet care mobile platform.",
    problem:
      "A vet-tech company needed a robust app with real-time pet tracking, push notifications, and Stripe subscription billing — all tightly coupled to an existing Django backend.",
    role: "Mobile + backend integration engineer",
    impact:
      "Published on both stores; handles live tracking, push notifications, and recurring billing in production.",
    stack: ["React Native", "Django REST", "Stripe", "Firebase", "AWS", "SNS"],
    image: "/images/projects/Orivet.PNG",
    accentFrom: "#10B981",
    accentTo: "#059669",
    live: null,
    github: null,
  },
  {
    id: "03",
    title: "Microchip Tracking Portal",
    category: "Web Application",
    tagline: "Full-featured registration and lookup portal for pet microchips.",
    problem:
      "Needed a fast, modern web interface for microchip registration, ownership transfers, and searchable lookup — replacing a dated legacy portal.",
    role: "Frontend architect + API integration",
    impact:
      "Sub-second search, intuitive ownership transfer flow, and real-time status dashboard.",
    stack: ["Next.js", "React", "TypeScript", "REST APIs", "Recharts"],
    image: null,
    accentFrom: "#6366F1",
    accentTo: "#8B5CF6",
    live: null,
    github: null,
  },
  {
    id: "04",
    title: "Django LMS API",
    category: "Backend System",
    tagline: "Scalable learning management system API with containerised CI/CD.",
    problem:
      "A training platform needed a secure, role-based API to manage courses, users, enrollments, and progress — deployable with zero downtime.",
    role: "Backend engineer + DevOps",
    impact:
      "Containerised with Docker, full CI/CD pipeline, and production-ready on AWS with automated test coverage.",
    stack: ["Django", "Django REST", "PostgreSQL", "Redis", "Docker", "CI/CD", "AWS"],
    image: null,
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
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
    category: "Frontend",
    core: ["React", "Next.js", "TypeScript"],
    more: ["Tailwind CSS", "Framer Motion", "JavaScript", "HTML / CSS"],
  },
  {
    category: "Backend",
    core: ["Python", "Django", "Node.js"],
    more: ["Django REST", "FastAPI", "Flask", "Express.js"],
  },
  {
    category: "Mobile",
    core: ["React Native", "Expo"],
    more: ["Firebase", "Push Notifications", "App Store", "Play Store"],
  },
  {
    category: "Cloud & DevOps",
    core: ["AWS", "Docker", "CI/CD"],
    more: ["EC2", "S3", "RDS", "Lambda", "Secrets Manager", "SES", "SNS"],
  },
  {
    category: "Database",
    core: ["PostgreSQL", "MySQL"],
    more: ["MongoDB", "Redis", "Migrations", "Query Optimisation"],
  },
  {
    category: "Integrations",
    core: ["REST APIs", "Stripe", "Firebase"],
    more: ["Payhere", "SMS / Push", "Webhooks", "OAuth / JWT"],
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
    period: "2020 – Present",
    title: "Full Stack Software Engineer",
    company: "Freelance · Contract",
    location: "Remote",
    description:
      "Designing and delivering full-stack web, mobile, and cloud systems for startups and businesses across multiple industries. Owning projects end-to-end: architecture, development, deployment, and ongoing support.",
    highlights: [
      "Built and deployed production React Native apps to both iOS and Android stores",
      "Architected secure Django REST APIs with RBAC and payment integrations",
      "Configured AWS infrastructure: EC2, S3, RDS, Lambda, SES, CI/CD pipelines",
      "Delivered Next.js web applications with auth, dashboards, and SEO",
    ],
    stack: ["React", "Next.js", "Django", "React Native", "AWS", "PostgreSQL", "Docker"],
  },
  {
    period: "2018 – 2020",
    title: "Backend Developer",
    company: "Various Clients",
    location: "Remote",
    description:
      "Specialised in backend development and API design. Built secure authentication systems, optimised database performance, and integrated third-party services for client products.",
    highlights: [
      "Designed RESTful APIs with Django REST Framework",
      "Implemented JWT authentication and role-based access control",
      "Optimised slow queries and improved database performance",
      "Integrated payment gateways and external APIs",
    ],
    stack: ["Python", "Django", "PostgreSQL", "MySQL", "AWS", "REST APIs"],
  },
];

export type Service = {
  icon: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: "Monitor",
    title: "Frontend Development",
    description:
      "React and Next.js applications — server-rendered, fast, accessible, and pixel-sharp on every screen.",
  },
  {
    icon: "Server",
    title: "Backend Development",
    description:
      "Django, FastAPI, or Node.js APIs with clean architecture, auth systems, and reliable third-party integrations.",
  },
  {
    icon: "Smartphone",
    title: "Mobile App Development",
    description:
      "React Native apps for iOS and Android — one codebase, native feel, shipped to both stores.",
  },
  {
    icon: "Cloud",
    title: "AWS Cloud Deployment",
    description:
      "Production infrastructure on AWS: EC2, S3, RDS, Lambda, CI/CD, Secrets Manager, SES, and SNS.",
  },
  {
    icon: "Database",
    title: "Database Architecture",
    description:
      "Schema design, migrations, query tuning, and indexing for PostgreSQL, MySQL, and MongoDB.",
  },
  {
    icon: "Zap",
    title: "Performance Optimisation",
    description:
      "Profiling and fixing bottlenecks — frontend rendering, API response time, and database query speed.",
  },
  {
    icon: "Shield",
    title: "Security & Authentication",
    description:
      "JWT, OAuth, RBAC, data encryption, and security best practices across every layer of the stack.",
  },
  {
    icon: "Layers",
    title: "MVP Development",
    description:
      "Fast, focused builds for founders who need a working product in weeks — not months.",
  },
];

export const PROOF_STATS = [
  { value: "2", label: "Mobile apps in production" },
  { value: "4+", label: "Cloud deployments on AWS" },
  { value: "3", label: "Payment systems integrated" },
  { value: "10+", label: "APIs built and maintained" },
  { value: "8+", label: "Years of production work" },
  { value: "2", label: "App store launches" },
];

export const PROOF_TAGS = [
  "iOS & Android",
  "Stripe Integration",
  "Payhere Integration",
  "AWS EC2 & S3",
  "Docker",
  "CI/CD Pipelines",
  "Role-Based Access Control",
  "JWT Authentication",
  "Push Notifications",
  "Admin Dashboards",
  "REST APIs",
  "PostgreSQL",
  "Redis Caching",
  "Webhook Systems",
  "SMS Integration",
  "Firebase",
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
      "Readable, modular code another engineer can pick up without a lengthy handover.",
  },
  {
    icon: "MessageSquare",
    title: "Clear communication",
    description:
      "Regular updates, async-friendly, direct. No surprises, no disappearing acts mid-project.",
  },
  {
    icon: "BarChart2",
    title: "Business-first thinking",
    description:
      "Every technical decision is weighed against real-world impact — not engineering preference.",
  },
  {
    icon: "Layers",
    title: "Scalable by default",
    description: "Architecture that handles 10× growth without a full rewrite.",
  },
  {
    icon: "Eye",
    title: "UI/UX awareness",
    description:
      "I care about what users see and feel. Systems built to be usable, not just functional.",
  },
  {
    icon: "CheckSquare",
    title: "Full ownership",
    description:
      "I treat your product as if it were mine — from first commit to production incident.",
  },
  {
    icon: "LifeBuoy",
    title: "Long-term support",
    description:
      "Available beyond delivery for bugs, updates, and feature additions.",
  },
  {
    icon: "Target",
    title: "Deadline-driven",
    description:
      "Milestones are commitments. I scope honestly and deliver on time.",
  },
];

export const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
