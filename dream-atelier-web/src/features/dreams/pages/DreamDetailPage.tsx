import { CSSProperties } from "react";
import { useParams, Link } from "react-router-dom";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useDreamDetail } from "../hooks";
import { DreamStage } from "../api";

const STAGE_LABELS: Record<string, string> = {
  brief_received:        "Brief received",
  fabric_selected:       "Fabric & pattern selected",
  in_production:         "In production",
  quality_check:         "Quality check",
  shipped:               "Shipped",
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  submitted:              { label: "We've got your dream",         color: colors.grey },
  in_review:              { label: "Someone's reading it...",      color: "#856404" },
  in_progress:            { label: "It's coming to life",          color: colors.sageDark },
  delivered_to_dreamer:   { label: "On its way to you",            color: "#1a6091" },
  live:                   { label: "Live — others love it now",    color: colors.rose },
  declined_paused:        { label: "Paused for now",               color: colors.grey },
};

export function DreamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: dream, isLoading } = useDreamDetail(id!);

  if (isLoading) return <LoadingState />;
  if (!dream) return (
    <div style={{ textAlign: "center", padding: spacing["4xl"] }}>
      <p style={{ fontSize: 48 }}>🌸</p>
      <p style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink }}>Dream not found</p>
      <Link to="/dreams/mine" style={{ color: colors.rose, marginTop: spacing.md, display: "block" }}>← Back to my dreams</Link>
    </div>
  );

  const status = STATUS_CONFIG[dream.status] ?? STATUS_CONFIG.submitted;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}` }}>
          <Link to="/dreams/mine" style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.6)", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: spacing.lg }}>
            ← My dreams
          </Link>
          <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.lg, color: colors.rose, marginBottom: spacing.sm }}>
            Your vision
          </p>
          <p style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white, lineHeight: 1.4, fontStyle: "italic", maxWidth: 640 }}>
            ❝ {dream.free_text} ❞
          </p>
        </div>
      </div>

      <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl, display: "grid", gridTemplateColumns: "1fr 340px", gap: spacing.xxl, alignItems: "start" }}>

        {/* Left: Stage tracker */}
        <div>
          <h2 style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink, marginBottom: spacing.xl }}>
            The journey
          </h2>

          {dream.stages?.length > 0 ? (
            <div style={{ position: "relative", paddingLeft: 52 }}>
              <div className="timeline-line" />
              {dream.stages.map((stage, i) => (
                <StageBlock key={stage.id} stage={stage} index={i} isLast={i === dream.stages.length - 1} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: spacing.xxl, background: colors.white, borderRadius: radius.xl, border: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: 40, marginBottom: spacing.md }}>✂️</p>
              <p style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.ink, marginBottom: spacing.sm }}>
                The making begins soon
              </p>
              <p style={{ fontSize: typography.size.sm, color: colors.grey, lineHeight: 1.6 }}>
                Once your dream is assigned to a designer, each step will appear here with photos.
              </p>
            </div>
          )}

          {/* Locked final action */}
          <div style={lockedActionStyle}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <div>
              <p style={{ fontWeight: typography.weight.semibold, color: colors.ink, marginBottom: 2 }}>Something special is coming</p>
              <p style={{ fontSize: typography.size.xs, color: colors.grey }}>Unlocks soon — we'll let you know when it's ready.</p>
            </div>
          </div>
        </div>

        {/* Right: Dream info */}
        <div style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: spacing.md }}>
          {/* Status card */}
          <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.lg }}>
            <p style={{ fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.grey, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: spacing.sm }}>
              Current status
            </p>
            <p style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: status.color, lineHeight: 1.3 }}>
              {status.label}
            </p>
          </div>

          {/* Meta */}
          <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.lg }}>
            <MetaRow label="Submitted" value={new Date(dream.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
            {dream.occasion_tag && <MetaRow label="Occasion" value={dream.occasion_tag.replace("_", " ")} />}
            {dream.mood_tags?.length > 0 && (
              <div style={{ paddingTop: spacing.sm }}>
                <p style={metaLabelStyle}>Mood</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {dream.mood_tags.map((t) => (
                    <span key={t} style={{ background: colors.roseLight, color: colors.rose, padding: "2px 10px", borderRadius: radius.pill, fontSize: typography.size.xs, fontWeight: typography.weight.medium }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {dream.feeling_prompt && <MetaRow label="Feeling" value={`"${dream.feeling_prompt}"`} italic />}
          </div>

          {/* Social proof */}
          {dream.love_count != null && dream.love_count > 0 && (
            <div style={{ background: colors.roseLight, borderRadius: radius.xl, padding: spacing.lg, textAlign: "center", border: `1px solid ${colors.border}` }}>
              <p style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.rose }}>
                {dream.love_count}
              </p>
              <p style={{ fontSize: typography.size.sm, color: colors.roseDark, fontWeight: typography.weight.semibold }}>
                women loved your idea ♥
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StageBlock({ stage, index, isLast }: { stage: DreamStage; index: number; isLast: boolean }) {
  return (
    <div style={{ position: "relative", marginBottom: isLast ? 0 : spacing.xxl }}>
      {/* Circle indicator */}
      <div style={{
        position:    "absolute",
        left:        -52,
        top:         0,
        width:       38,
        height:      38,
        borderRadius:"50%",
        background:  colors.rose,
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
        color:       colors.white,
        fontWeight:  typography.weight.bold,
        fontSize:    typography.size.sm,
        boxShadow:   shadows.btn,
        zIndex:      1,
      }}>
        {index + 1}
      </div>

      <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, overflow: "hidden" }}>
        {stage.photo_url && (
          <img src={stage.photo_url} alt={stage.stage_name} style={{ width: "100%", height: 240, objectFit: "cover" }} />
        )}
        <div style={{ padding: spacing.lg }}>
          <p style={{ fontWeight: typography.weight.semibold, color: colors.ink, marginBottom: spacing.xs, fontSize: typography.size.md }}>
            {STAGE_LABELS[stage.stage_name] ?? stage.stage_name}
          </p>
          {stage.notes && (
            <p style={{ fontSize: typography.size.sm, color: colors.grey, lineHeight: 1.6 }}>{stage.notes}</p>
          )}
          <p style={{ fontSize: typography.size.xs, color: colors.greyLight, marginTop: spacing.sm }}>
            {new Date(stage.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value, italic }: { label: string; value: string; italic?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: `${spacing.sm} 0`, borderBottom: `1px solid ${colors.border}` }}>
      <span style={metaLabelStyle}>{label}</span>
      <span style={{ fontSize: typography.size.sm, color: colors.ink, fontStyle: italic ? "italic" : "normal", maxWidth: "60%", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl }}>
      <div className="skeleton" style={{ height: 220, borderRadius: radius.xl, marginBottom: spacing.xl }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: spacing.xxl }}>
        <div>
          {[180, 220, 160].map((h, i) => (
            <div key={i} className="skeleton" style={{ height: h, borderRadius: radius.xl, marginBottom: spacing.lg }} />
          ))}
        </div>
        <div className="skeleton" style={{ height: 300, borderRadius: radius.xl }} />
      </div>
    </div>
  );
}

const headerStyle: CSSProperties = {
  background:  `linear-gradient(160deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:     `${spacing["3xl"]} ${spacing.xl}`,
  marginBottom: spacing.xl,
};
const lockedActionStyle: CSSProperties = {
  display:      "flex",
  alignItems:   "center",
  gap:          spacing.md,
  marginTop:    spacing.xxl,
  padding:      spacing.lg,
  background:   colors.sand,
  borderRadius: radius.lg,
  border:       `1.5px dashed ${colors.border}`,
};
const metaLabelStyle: CSSProperties = {
  fontSize:   typography.size.xs,
  fontWeight: typography.weight.semibold,
  color:      colors.grey,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};
