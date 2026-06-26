import { CSSProperties } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useMyDreams } from "../hooks";

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; icon: string }> = {
  submitted:          { label: "We've got your dream!",        bg: "#F5F0F0", color: colors.grey,    icon: "✉️" },
  in_review:          { label: "Someone's reading it...",      bg: "#FEF3CD", color: "#856404",       icon: "👀" },
  in_progress:        { label: "It's coming to life",          bg: colors.sageLight, color: colors.sageDark, icon: "✂️" },
  delivered_to_dreamer: { label: "It's on its way to you",    bg: "#E8F4FD", color: "#1a6091",       icon: "📦" },
  live:               { label: "Live — others love it now",    bg: colors.roseLight, color: colors.rose, icon: "✨" },
  declined_paused:    { label: "Paused for now",               bg: "#F5F0F0", color: colors.grey,    icon: "⏸" },
};

export function MyDreamsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useMyDreams();

  if (isLoading) return <LoadingState />;

  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Header */}
      <div style={pageHeaderStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}` }}>
          <h1 style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white, marginBottom: spacing.xs }}>
            My dreams
          </h1>
          <p style={{ fontSize: typography.size.md, color: "rgba(255,255,255,0.65)" }}>
            {data.length} {data.length === 1 ? "dream" : "dreams"} shared
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: spacing.xl }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }} className="fade-in">
          {data.map((dream) => {
            const status = STATUS_CONFIG[dream.status] ?? STATUS_CONFIG.submitted;
            return (
              <div
                key={dream.id}
                className="hover-lift"
                style={{
                  background:   colors.white,
                  borderRadius: radius.xl,
                  boxShadow:    shadows.card,
                  border:       `1px solid ${colors.border}`,
                  overflow:     "hidden",
                  cursor:       "pointer",
                }}
                onClick={() => navigate(`/dreams/${dream.id}`)}
              >
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  {/* Status side bar */}
                  <div style={{ width: 6, background: status.color, flexShrink: 0 }} />

                  <div style={{ flex: 1, padding: spacing.lg }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.sm }}>
                      {/* Status badge */}
                      <span style={{ ...statusBadgeStyle, background: status.bg, color: status.color }}>
                        {status.icon} {status.label}
                      </span>
                      <span style={{ fontSize: typography.size.xs, color: colors.grey }}>
                        {new Date(dream.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <p style={{ fontSize: typography.size.md, color: colors.ink, lineHeight: 1.5, fontStyle: "italic" }}>
                      ❝ {dream.first_line}
                    </p>

                    <p style={{ fontSize: typography.size.xs, color: colors.grey, marginTop: spacing.sm }}>
                      Tap to see the full story →
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: spacing.xxl }}>
          <Link to="/dreams/new">
            <Button label="Share another dream" variant="outline" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
      <div style={{ maxWidth: 480, textAlign: "center" }} className="slide-up">
        <p style={{ fontSize: 64, marginBottom: spacing.lg, lineHeight: 1 }}>🌸</p>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.ink, marginBottom: spacing.md, fontStyle: "italic" }}>
          Your dreams will live here.
        </p>
        <p style={{ fontSize: typography.size.md, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xxl }}>
          Share your first one? Describe an outfit you've been imagining — we'll make it real.
        </p>
        <Button label="Share your first dream" size="lg" onClick={() => navigate("/dreams/new")} />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: spacing.xl }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 96, borderRadius: radius.xl, marginBottom: spacing.md }} />
      ))}
    </div>
  );
}

const pageHeaderStyle: CSSProperties = {
  background:  `linear-gradient(135deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:     `${spacing["3xl"]} ${spacing.xl} ${spacing.xxl}`,
  marginBottom: spacing.xl,
};
const statusBadgeStyle: CSSProperties = {
  display:      "inline-flex",
  alignItems:   "center",
  gap:          6,
  padding:      `4px 12px`,
  borderRadius: radius.pill,
  fontSize:     typography.size.xs,
  fontWeight:   typography.weight.semibold,
};
