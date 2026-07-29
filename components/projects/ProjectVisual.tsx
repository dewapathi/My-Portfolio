import Image from "next/image";
import type { JSX } from "react";
import type { Project } from "@/content/projects";

function AIPipelineMockup({ project }: { project: Project }) {
  const steps = [
    { label: "Sentry Error", sub: "Webhook", c: "#F87171" },
    { label: "Secret Filter", sub: "Middleware", c: "#FBBF24" },
    { label: "Claude Haiku", sub: "File Discovery", c: project.accentFrom },
    { label: "Claude Sonnet", sub: "Fix Generation", c: project.accentTo },
    { label: "Draft PR", sub: "Bitbucket", c: "#34D399" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8" style={{ background: "#0D1117" }}>
      <p className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase mb-2" style={{ color: `${project.accentFrom}80` }}>
        AutoFix Pipeline
      </p>
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[200px]">
          <div
            className="w-full rounded-lg px-4 py-2.5 text-center"
            style={{ background: `${s.c}14`, border: `1px solid ${s.c}30` }}
          >
            <p className="text-[11px] font-bold leading-none mb-1" style={{ color: s.c }}>{s.label}</p>
            <p className="text-[9.5px] leading-none" style={{ color: `${s.c}70` }}>{s.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="h-4 w-px" style={{ background: `${s.c}40` }} />
          )}
        </div>
      ))}
    </div>
  );
}

function StudentDashboardMockup({ project }: { project: Project }) {
  const students = [
    { name: "Amal Perera",  role: "Admin",   present: true },
    { name: "Nimal Silva",  role: "Student", present: true },
    { name: "Kasun Raj",    role: "Student", present: false },
    { name: "Saman Fernando", role: "Teacher", present: true },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-7">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold" style={{ color: project.accentFrom }}>Students</span>
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${project.accentFrom}20`, color: project.accentFrom }}
        >
          + Enroll
        </span>
      </div>
      <div className="rounded-lg overflow-hidden flex-1" style={{ border: `1px solid ${project.accentFrom}20` }}>
        <div
          className="grid grid-cols-3 px-3 py-2 text-[9.5px] font-bold uppercase tracking-wider"
          style={{ background: `${project.accentFrom}14`, color: project.accentFrom }}
        >
          <span>Name</span>
          <span>Role</span>
          <span>Attendance</span>
        </div>
        {students.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-3 px-3 py-2.5 text-[11px] border-t"
            style={{ borderColor: `${project.accentFrom}14`, color: `${project.accentFrom}CC` }}
          >
            <span className="font-medium truncate">{s.name}</span>
            <span
              className="text-[9.5px] font-bold px-2 py-0.5 rounded-full w-fit"
              style={{
                background: s.role === "Admin" ? `${project.accentFrom}20` : s.role === "Teacher" ? `${project.accentTo}20` : "rgba(255,255,255,0.06)",
                color: s.role === "Admin" ? project.accentFrom : s.role === "Teacher" ? project.accentTo : `${project.accentFrom}80`,
              }}
            >
              {s.role}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${s.present ? "bg-[#10B981]" : "bg-[#EF4444]"}`} />
              {s.present ? "Present" : "Absent"}
            </span>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-between rounded-lg px-4 py-2.5"
        style={{ background: `${project.accentFrom}10`, border: `1px solid ${project.accentFrom}20` }}
      >
        <span className="text-[10.5px]" style={{ color: `${project.accentFrom}80` }}>Stripe fees collected</span>
        <span className="text-[11px] font-bold" style={{ color: project.accentFrom }}>LKR 48,200</span>
      </div>
    </div>
  );
}

function AWSFlowMockup({ project }: { project: Project }) {
  const ac = project.accentFrom;
  const nodes = [
    { label: "EventBridge", sub: "Event trigger", c: ac },
    { label: "Lambda", sub: "Producer fn", c: ac },
    { label: "SQS Queue", sub: "Decoupled buffer", c: ac },
    { label: "Lambda", sub: "Consumer fn", c: ac },
    { label: "SES", sub: "Email delivery", c: "#34D399" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8" style={{ background: "#0D1117" }}>
      <p className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase mb-2" style={{ color: `${ac}70` }}>
        Serverless Pipeline
      </p>
      {nodes.map((n, i) => (
        <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[220px]">
          <div
            className="w-full rounded-lg px-4 py-2 text-center"
            style={{ background: `${n.c}12`, border: `1px solid ${n.c}28` }}
          >
            <p className="text-[11px] font-bold leading-none mb-0.5" style={{ color: n.c }}>{n.label}</p>
            <p className="text-[9.5px] leading-none" style={{ color: `${n.c}60` }}>{n.sub}</p>
          </div>
          {i < nodes.length - 1 && (
            <div className="h-3 w-px" style={{ background: `${ac}30` }} />
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 mt-3">
        {["Auto-retry", "Zero server", "Fault-tolerant"].map((t) => (
          <span key={t} className="text-[9px] font-mono px-2 py-1 rounded" style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}25` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReminderMockup({ project }: { project: Project }) {
  const langs = ["🇦🇺 EN", "🇬🇧 EN", "🇱🇰 SI", "🇩🇪 DE", "🇫🇷 FR"];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-7" style={{ background: "#0D1117" }}>
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-[10px]" style={{ color: `${project.accentFrom}80` }}>Good afternoon</p>
          <p className="text-[13px] font-bold leading-none" style={{ color: "#EEF2FF" }}>Pradeepa</p>
          <p className="text-[11px] font-semibold mt-0.5" style={{ color: project.accentFrom }}>Well Organized</p>
        </div>
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke={`${project.accentFrom}25`} strokeWidth="4" />
            <circle cx="24" cy="24" r="20" fill="none" stroke={project.accentFrom} strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="31.4" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold" style={{ color: project.accentFrom }}>75</span>
        </div>
      </div>
      <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${project.accentFrom}14`, border: `1px solid ${project.accentFrom}28` }}>
        <div className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-sm" style={{ background: `${project.accentFrom}25` }}>🔔</div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold truncate" style={{ color: "#EEF2FF" }}>Electricity bill due today</p>
          <p className="text-[10px]" style={{ color: `${project.accentFrom}80` }}>Finance Vault · LKR 5,000</p>
        </div>
        <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#EF444430", color: "#F87171" }}>Overdue</span>
      </div>
      <div>
        <p className="text-[9.5px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color: `${project.accentFrom}55` }}>Voice Languages</p>
        <div className="flex flex-wrap gap-1.5">
          {langs.map((l) => (
            <span key={l} className="text-[10px] px-2 py-1 rounded-md font-mono" style={{ background: `${project.accentFrom}14`, color: project.accentFrom, border: `1px solid ${project.accentFrom}25` }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-auto">
        {[["2", "Vehicles"], ["4", "Reminders"], ["5", "Vaults"]].map(([v, l]) => (
          <div key={l} className="flex-1 rounded-lg p-2 text-center" style={{ background: `${project.accentFrom}0E`, border: `1px solid ${project.accentFrom}1A` }}>
            <p className="text-[14px] font-bold leading-none" style={{ color: project.accentFrom }}>{v}</p>
            <p className="text-[9px] mt-0.5" style={{ color: `${project.accentFrom}70` }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlassVialsMockup({ project }: { project: Project }) {
  const colors = ["#EF4444", "#3B82F6", "#22C55E", "#A855F7", "#F97316", "#EAB308"];
  const vials = [
    [0, 2, 1, 3],
    [1, 4, 0, 5],
    [2, 3, 4, 1],
    [5, 0, 3, 2],
    [4, 1, 5, 0],
    [3, 5, 2, 4],
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-7" style={{ background: "#1A0E00" }}>
      <div className="flex items-center justify-between w-full mb-1">
        <p className="text-[11px] font-bold" style={{ color: project.accentFrom }}>Glass Vials</p>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${project.accentFrom}20`, color: project.accentFrom }}>Level 11</span>
      </div>
      <div className="flex gap-2 items-end">
        {vials.map((vial, vi) => (
          <div key={vi} className="flex flex-col gap-1 items-center">
            <div className="flex flex-col gap-0.5 rounded-b-full overflow-hidden" style={{ border: `1.5px solid ${project.accentFrom}40`, borderTop: "none", padding: "2px", background: "rgba(255,255,255,0.04)" }}>
              {vial.map((ci, bi) => (
                <div key={bi} className="h-5 w-5 rounded-sm" style={{ background: colors[ci], opacity: 0.85 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2">
        {["MOVES 00/30", "★★★"].map((t) => (
          <span key={t} className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: `${project.accentFrom}18`, color: project.accentFrom, border: `1px solid ${project.accentFrom}30` }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function PdfMockup({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-7" style={{ background: "#0D1117" }}>
      <div className="flex items-center gap-3 rounded-lg px-4 py-2.5" style={{ background: `${project.accentFrom}18`, border: `1px solid ${project.accentFrom}30` }}>
        <span className="text-[11px] font-bold" style={{ color: project.accentFrom }}>POST</span>
        <span className="text-[11px] font-mono flex-1" style={{ color: "#8B949E" }}>/api/v1/reports/generate</span>
        <span className="text-[11px] font-bold text-[#10B981]">200 OK</span>
      </div>
      <div className="flex-1 rounded-lg p-4 font-mono text-[11.5px] leading-relaxed" style={{ background: "#161B22", border: `1px solid ${project.accentFrom}22`, color: "#CDD9E5" }}>
        <div style={{ color: "#6E7681" }}>{"{"}</div>
        <div className="pl-4"><span style={{ color: "#79C0FF" }}>&quot;status&quot;</span><span>: </span><span style={{ color: "#A5D6FF" }}>&quot;generated&quot;</span><span>,</span></div>
        <div className="pl-4"><span style={{ color: "#79C0FF" }}>&quot;pages&quot;</span><span>: </span><span style={{ color: "#FFA657" }}>12</span><span>,</span></div>
        <div className="pl-4"><span style={{ color: "#79C0FF" }}>&quot;format&quot;</span><span>: </span><span style={{ color: "#A5D6FF" }}>&quot;pdf&quot;</span><span>,</span></div>
        <div className="pl-4"><span style={{ color: "#79C0FF" }}>&quot;storage&quot;</span><span>: </span><span style={{ color: "#A5D6FF" }}>&quot;s3://reports/...&quot;</span><span>,</span></div>
        <div className="pl-4"><span style={{ color: "#79C0FF" }}>&quot;trigger&quot;</span><span>: </span><span style={{ color: "#A5D6FF" }}>&quot;firebase_event&quot;</span></div>
        <div style={{ color: "#6E7681" }}>{"}"}</div>
      </div>
      <div className="flex gap-2">
        {["Node.js", "AWS EC2", "Firebase", "S3"].map((t) => (
          <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-md" style={{ background: `${project.accentFrom}10`, color: project.accentFrom, border: `1px solid ${project.accentFrom}22` }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function BreederStatsMockup({ project }: { project: Project }) {
  const ac = project.accentFrom;
  const routes = [
    { path: "traffic split", c: ac },
    { path: "New Primary DB", c: "#34D399" },
    { path: "Legacy Prod DB (read-only)", c: "#FBBF24" },
    { path: "Read Replica (optional)", c: ac },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8" style={{ background: "#0D1117" }}>
      <p className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase mb-1" style={{ color: `${ac}80` }}>
        Strangler-Fig Migration
      </p>
      <div className="w-full max-w-[220px] rounded-lg px-4 py-2.5 text-center" style={{ background: `${ac}14`, border: `1px solid ${ac}30` }}>
        <p className="text-[11px] font-bold leading-none mb-1" style={{ color: ac }}>Custom DB Router</p>
        <p className="text-[9.5px] leading-none" style={{ color: `${ac}70` }}>Django</p>
      </div>
      <div className="h-3 w-px" style={{ background: `${ac}40` }} />
      <div className="grid grid-cols-1 gap-2 w-full max-w-[220px]">
        {routes.slice(1).map((r, i) => (
          <div key={i} className="rounded-lg px-3 py-2 text-center" style={{ background: `${r.c}12`, border: `1px solid ${r.c}28` }}>
            <p className="text-[10px] font-semibold" style={{ color: r.c }}>{r.path}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        {["45+ endpoints", "6 modules", "Zero downtime"].map((t) => (
          <span key={t} className="text-[9px] font-mono px-2 py-1 rounded" style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}25` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function GenericMockup({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <div
        className="w-full rounded-xl p-5 space-y-3"
        style={{
          background: `${project.accentFrom}12`,
          border: `1px solid ${project.accentFrom}25`,
        }}
      >
        {[85, 70, 92, 60, 78].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg shrink-0" style={{ background: `${project.accentFrom}30` }} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 rounded-full" style={{ background: `${project.accentFrom}38`, width: `${w}%` }} />
              <div className="h-1.5 rounded-full" style={{ background: `${project.accentFrom}20`, width: `${w - 24}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCKUPS: Record<string, (props: { project: Project }) => JSX.Element> = {
  "01": AIPipelineMockup,
  "04": StudentDashboardMockup,
  "05": AWSFlowMockup,
  "06": ReminderMockup,
  "07": GlassVialsMockup,
  "08": PdfMockup,
  "09": BreederStatsMockup,
};

/** Screenshot if one exists, otherwise a stylised mockup unique to the project. */
export default function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 44vw"
      />
    );
  }

  const Mockup = MOCKUPS[project.id] ?? GenericMockup;
  return <Mockup project={project} />;
}
