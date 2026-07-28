export type Project = {
  id: string;
  slug: string;
  flagship: boolean;
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
    slug: "ai-developer-automation",
    flagship: true,
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
    accentFrom: "#6C8CFF",
    accentTo: "#9B7CFF",
    live: null,
    github: null,
  },
  {
    id: "02",
    slug: "vehicle-spare-parts-platform",
    flagship: true,
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
    accentFrom: "#4CD8E0",
    accentTo: "#6C8CFF",
    live: null,
    github: null,
  },
  {
    id: "03",
    slug: "orivet-mobile-app",
    flagship: true,
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
    accentFrom: "#34D399",
    accentTo: "#0E9AA6",
    live: null,
    github: null,
  },
  {
    id: "04",
    slug: "student-management-system",
    flagship: false,
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
    accentFrom: "#F2C9A0",
    accentTo: "#E0704A",
    live: null,
    github: null,
  },
  {
    id: "05",
    slug: "aws-serverless-email-pipeline",
    flagship: false,
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
    accentFrom: "#F2C9A0",
    accentTo: "#B8895A",
    live: null,
    github: null,
  },
  {
    id: "06",
    slug: "voice-reminder-life-organizer",
    flagship: true,
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
    accentFrom: "#9B7CFF",
    accentTo: "#6C8CFF",
    live: null,
    github: null,
  },
  {
    id: "07",
    slug: "glass-vials-puzzle-game",
    flagship: false,
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
    accentFrom: "#F2C9A0",
    accentTo: "#E05A9C",
    live: null,
    github: null,
  },
  {
    id: "08",
    slug: "pdf-report-generation-server",
    flagship: false,
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
    accentFrom: "#4CD8E0",
    accentTo: "#0E9AA6",
    live: null,
    github: null,
  },
];

export const FLAGSHIP_PROJECTS = PROJECTS.filter((p) => p.flagship);
export const ARCHIVE_PROJECTS = PROJECTS.filter((p) => !p.flagship);

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
