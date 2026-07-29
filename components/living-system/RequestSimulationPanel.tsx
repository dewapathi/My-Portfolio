"use client";

import { REQUEST_STAGES } from "./RootNetworkChapter";

/**
 * Real DOM control + a text equivalent of the 3D simulation, always
 * present — the WebGL scene enhances this, it never gates it (see
 * EXPERIENCE_BIBLE.md §9).
 */
export default function RequestSimulationPanel({
  activeStage,
  onRun,
}: {
  activeStage: number;
  onRun: () => void;
}) {
  return (
    <div className="request-panel">
      <div className="request-panel__header">
        <p className="request-panel__eyebrow">Root Network · Live Simulation</p>
        <h3 className="request-panel__title">Run a request</h3>
        <p className="request-panel__hint">
          Cached API response — Client through Redis, Postgres, and back.
        </p>
      </div>
      <button type="button" className="request-panel__button" data-cursor="Run" onClick={onRun}>
        Run a request
      </button>
      <ol className="request-panel__stages" aria-label="Request pipeline stages">
        {REQUEST_STAGES.map((stage, i) => (
          <li
            key={stage.label}
            className={`request-panel__stage ${activeStage >= i ? "request-panel__stage--active" : ""}`}
            aria-current={activeStage === i ? "step" : undefined}
          >
            <span className="request-panel__stage-dot" style={{ background: stage.color }} />
            <span className="request-panel__stage-label">{stage.label}</span>
            <span className="request-panel__stage-sub">{stage.sub}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
