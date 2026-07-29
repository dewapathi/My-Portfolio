"use client";

import { INCIDENT_CHOICES, type IncidentChoiceId, type IncidentPhase } from "@/lib/living-system/use-incident-timeline";

const ICONS: Record<IncidentChoiceId, React.ReactNode> = {
  restart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 12a8 8 0 1 1-2.8-6.1" strokeLinecap="round" />
      <path d="M20 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="9" width="6" height="10" rx="1.2" />
      <rect x="15" y="5" width="6" height="14" rx="1.2" />
    </svg>
  ),
  rollback: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="M10 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  investigate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5l-4.3-4.3" strokeLinecap="round" />
    </svg>
  ),
};

export default function IncidentOverlay({
  phase,
  chosenId,
  onChoose,
}: {
  phase: IncidentPhase;
  chosenId: IncidentChoiceId | null;
  onChoose: (id: IncidentChoiceId) => void;
}) {
  if (phase === "dormant") return null;

  const showChoices = phase === "straining" || phase === "choice";
  const respondingLine = INCIDENT_CHOICES.find((c) => c.id === chosenId)?.response;

  return (
    <div className="living-incident" aria-live="polite">
      {showChoices && (
        <div className="living-incident__choices-wrap">
          {phase === "choice" && <p className="living-incident__prompt">The system is under load.</p>}
          <div
            className={`living-incident__choices${phase === "choice" ? " living-incident__choices--active" : ""}`}
            role="group"
            aria-label="Choose how to respond to the incident"
          >
            {INCIDENT_CHOICES.map((c) => (
              <button
                key={c.id}
                type="button"
                className="living-incident__choice"
                disabled={phase !== "choice"}
                onClick={() => onChoose(c.id)}
              >
                <span className="living-incident__choice-icon" aria-hidden="true">
                  {ICONS[c.id]}
                </span>
                <span className="living-incident__choice-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "responding" && respondingLine && (
        <p className="living-incident__response">{respondingLine}</p>
      )}

      {phase === "failing" && (
        <div className="living-incident__error">
          <p className="living-incident__error-code">500</p>
          <p className="living-incident__error-label">Internal Server Error</p>
        </div>
      )}

      {(phase === "blackout" || phase === "rootcause") && (
        <div className="living-incident__blackout">
          {phase === "rootcause" && <p className="living-incident__line">Root cause identified.</p>}
        </div>
      )}

      {phase === "stat" && (
        <div className="living-incident__stat">
          <p className="living-incident__stat-value">
            Latency <span aria-hidden="true">↓</span> 60%
          </p>
        </div>
      )}
    </div>
  );
}
