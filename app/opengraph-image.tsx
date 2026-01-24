import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  const title = "Full Stack Software Engineer";
  const name = "Pradeepa lakruwan";
  const subtitle = "Backend • Mobile • AWS • CI/CD";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 20%, #38bdf8 0%, rgba(56,189,248,0.15) 35%, transparent 60%), radial-gradient(circle at 80% 70%, #a855f7 0%, rgba(168,85,247,0.16) 35%, transparent 60%), #050b1a",
        }}
      >
        <div
          style={{
            width: 1040,
            height: 510,
            borderRadius: 42,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(18px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 72px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.85)", letterSpacing: 1.2 }}>
            {title}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 800,
              color: "white",
            }}
          >
            {name}
          </div>
          <div style={{ marginTop: 22, fontSize: 30, color: "rgba(255,255,255,0.78)" }}>
            {subtitle}
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["Python", "Django", "Node.js", "AWS", "React Native"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 20,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}

