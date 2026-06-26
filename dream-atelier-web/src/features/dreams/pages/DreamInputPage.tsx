import { useState, CSSProperties } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography } from "../../../shared/tokens";
import { useSubmitDream } from "../hooks";
import { MoodTag, OccasionTag } from "../api";

const MOODS: { value: MoodTag; label: string; emoji: string }[] = [
  { value: "soft",     label: "Soft",     emoji: "🌿" },
  { value: "bold",     label: "Bold",     emoji: "🔥" },
  { value: "classic",  label: "Classic",  emoji: "💎" },
  { value: "edgy",     label: "Edgy",     emoji: "⚡" },
  { value: "romantic", label: "Romantic", emoji: "🌸" },
  { value: "minimal",  label: "Minimal",  emoji: "✦" },
];

const OCCASIONS: { value: OccasionTag; label: string; emoji: string }[] = [
  { value: "everyday",     label: "Everyday",     emoji: "☀️" },
  { value: "celebration",  label: "Celebration",  emoji: "✨" },
  { value: "travel",       label: "Travel",       emoji: "🌍" },
  { value: "just_for_me",  label: "Just for me",  emoji: "💕" },
];

export function DreamInputPage() {
  const navigate      = useNavigate();
  const [freeText,    setFreeText]    = useState("");
  const [moods,       setMoods]       = useState<MoodTag[]>([]);
  const [occasion,    setOccasion]    = useState<OccasionTag | undefined>();
  const [feeling,     setFeeling]     = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [focused,     setFocused]     = useState(false);

  const submit = useSubmitDream();

  function toggleMood(m: MoodTag) {
    setMoods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  }

  async function handleSubmit() {
    if (!freeText.trim()) return;
    await submit.mutateAsync({ free_text: freeText, mood_tags: moods, occasion_tag: occasion, feeling_prompt: feeling || undefined });
    setSubmitted(true);
  }

  if (submitted) return <SubmittedState onNavigate={() => navigate("/dreams/mine")} />;

  const charCount = freeText.length;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Left column: decorative */}
      <div style={pageLayoutStyle}>
        <aside style={sidebarStyle}>
          <div style={{ position: "sticky", top: 100 }}>
            <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.xl, color: colors.rose, marginBottom: spacing.md }}>
              Your idea matters.
            </p>
            <p style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white, lineHeight: 1.3, marginBottom: spacing.lg, fontStyle: "italic" }}>
              Every great piece here started exactly like this.
            </p>
            <p style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Describe it in your own words. No detail is too small. The more you share how it feels — the closer we can get to what you imagine.
            </p>

            {/* Quote samples */}
            <div style={{ marginTop: spacing.xxl }}>
              {[
                "\"Something soft, like wearing a warm afternoon…\"",
                "\"I want fabric that moves when I move.\"",
                "\"Elegant enough to feel special, comfortable enough to forget I'm wearing it.\"",
              ].map((q, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, borderLeft: `3px solid ${colors.rose}` }}>
                  <p style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.65)", fontStyle: "italic", lineHeight: 1.6 }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main form */}
        <main style={formAreaStyle}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p style={{ fontSize: typography.size.sm, color: colors.grey, marginBottom: spacing.sm }}>
              <Link to="/dreams" style={{ color: colors.grey }}>← Back to dreams</Link>
            </p>

            <h1 style={pageTitleStyle}>Tell us your vision</h1>
            <p style={pageSubStyle}>No detail is too small. Write it like a journal entry — not a specification.</p>

            {/* Main textarea */}
            <div style={{ position: "relative", marginBottom: spacing.xl }}>
              <textarea
                className="form-input"
                placeholder="I keep imagining something soft and flowing, with wide sleeves that catch the breeze… something I can wear on a slow morning but still feel beautiful in…"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  ...textareaStyle,
                  borderColor: focused ? colors.rose : colors.border,
                  boxShadow:   focused ? `0 0 0 3px rgba(181,72,90,0.1), ${shadows.md}` : shadows.sm,
                }}
              />
              {/* Character count — subtle */}
              {charCount > 20 && (
                <span style={{ position: "absolute", bottom: 12, right: 16, fontSize: typography.size.xs, color: colors.grey, opacity: 0.6 }}>
                  {charCount}
                </span>
              )}
            </div>

            {/* Feeling prompt */}
            <div style={sectionWrapStyle}>
              <label style={sectionLabelStyle}>What feeling do you want it to give you?</label>
              <p style={sectionHintStyle}>Optional, but we'd love to know — it helps more than you think.</p>
              <input
                className="form-input"
                type="text"
                placeholder="Like wearing a quiet confidence, effortless but intentional…"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Mood */}
            <div style={sectionWrapStyle}>
              <label style={sectionLabelStyle}>What's the mood? <span style={{ color: colors.grey, fontWeight: 400 }}>(optional)</span></label>
              <div style={chipRowStyle}>
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    className="chip"
                    onClick={() => toggleMood(m.value)}
                    style={moodChipStyle(moods.includes(m.value))}
                  >
                    <span>{m.emoji}</span> {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div style={sectionWrapStyle}>
              <label style={sectionLabelStyle}>What's it for? <span style={{ color: colors.grey, fontWeight: 400 }}>(optional)</span></label>
              <div style={chipRowStyle}>
                {OCCASIONS.map((o) => (
                  <button
                    key={o.value}
                    className="chip"
                    onClick={() => setOccasion(occasion === o.value ? undefined : o.value)}
                    style={occasionChipStyle(occasion === o.value)}
                  >
                    <span>{o.emoji}</span> {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div style={{ paddingTop: spacing.lg, borderTop: `1px solid ${colors.border}`, display: "flex", gap: spacing.md, alignItems: "center" }}>
              <Button
                label="Share this dream"
                size="lg"
                loading={submit.isPending}
                disabled={!freeText.trim()}
                onClick={handleSubmit}
                style={{ borderRadius: radius.pill, paddingLeft: spacing.xxl, paddingRight: spacing.xxl }}
              />
              {!freeText.trim() && (
                <p style={{ fontSize: typography.size.xs, color: colors.grey, fontStyle: "italic" }}>
                  Start with just one sentence about what you imagine.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SubmittedState({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: colors.background }}>
      <div style={{ maxWidth: 520, textAlign: "center", padding: spacing.xl }} className="scale-in">
        {/* Animated rose */}
        <div style={{ fontSize: 72, marginBottom: spacing.xl, lineHeight: 1 }}>🌸</div>

        <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.xl, color: colors.rose, marginBottom: spacing.md }}>
          Your dream is in our hands.
        </p>
        <h1 style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.ink, marginBottom: spacing.lg, lineHeight: 1.2 }}>
          We've got it, just as<br />you wrote it.
        </h1>
        <p style={{ fontSize: typography.size.md, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xxl }}>
          We'll let you know the moment someone starts bringing it to life. Every step, every stage — you'll see it happen in your dreams archive.
        </p>

        <div style={{ display: "flex", gap: spacing.md, justifyContent: "center", flexWrap: "wrap" }}>
          <Button label="See my dreams" size="lg" onClick={onNavigate} />
          <Link to="/dreams">
            <Button label="Browse other dreams" variant="ghost" size="lg" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── chip styles ─────────────────────────────────────────────── */
const moodChipStyle = (active: boolean): CSSProperties => ({
  display:      "inline-flex",
  alignItems:   "center",
  gap:          6,
  padding:      `8px 18px`,
  borderRadius: radius.pill,
  border:       `1.5px solid ${active ? colors.rose : colors.border}`,
  background:   active ? colors.roseLight : colors.white,
  color:        active ? colors.rose : colors.ink,
  fontWeight:   active ? typography.weight.semibold : typography.weight.regular,
  fontSize:     typography.size.sm,
  cursor:       "pointer",
  boxShadow:    active ? `0 0 0 3px rgba(181,72,90,0.1)` : "none",
});
const occasionChipStyle = (active: boolean): CSSProperties => ({
  ...moodChipStyle(active),
  background: active ? colors.sageLight : colors.white,
  border:     `1.5px solid ${active ? colors.sage : colors.border}`,
  color:      active ? colors.sageDark : colors.ink,
  boxShadow:  active ? `0 0 0 3px rgba(92,110,90,0.1)` : "none",
});

/* ─── page layout ─────────────────────────────────────────────── */
const pageLayoutStyle: CSSProperties = {
  display:             "grid",
  gridTemplateColumns: "360px 1fr",
  minHeight:           "100vh",
};
const sidebarStyle: CSSProperties = {
  background: `linear-gradient(160deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:    `${spacing["4xl"]} ${spacing.xl}`,
};
const formAreaStyle: CSSProperties = {
  padding:    `${spacing["3xl"]} ${spacing.xxl}`,
  background: colors.background,
};
const pageTitleStyle: CSSProperties = {
  fontFamily:   typography.heading,
  fontSize:     typography.size["3xl"],
  color:        colors.ink,
  marginBottom: spacing.sm,
};
const pageSubStyle: CSSProperties = {
  fontSize:     typography.size.md,
  color:        colors.grey,
  marginBottom: spacing.xl,
  lineHeight:   1.6,
};
const textareaStyle: CSSProperties = {
  width:        "100%",
  minHeight:    200,
  borderRadius: radius.lg,
  border:       `1.5px solid ${colors.border}`,
  padding:      spacing.lg,
  fontSize:     typography.size.md,
  color:        colors.ink,
  fontFamily:   typography.body,
  lineHeight:   1.7,
  resize:       "vertical",
  outline:      "none",
  transition:   "border-color 0.2s ease, box-shadow 0.2s ease",
};
const inputStyle: CSSProperties = {
  width:        "100%",
  borderRadius: radius.md,
  border:       `1.5px solid ${colors.border}`,
  padding:      spacing.md,
  fontSize:     typography.size.md,
  color:        colors.ink,
  outline:      "none",
  fontStyle:    "italic",
  background:   colors.white,
  boxShadow:    shadows.xs,
};
const sectionWrapStyle: CSSProperties = {
  marginBottom: spacing.xl,
};
const sectionLabelStyle: CSSProperties = {
  display:      "block",
  fontSize:     typography.size.sm,
  fontWeight:   typography.weight.semibold,
  color:        colors.ink,
  marginBottom: spacing.xs,
};
const sectionHintStyle: CSSProperties = {
  fontSize:     typography.size.xs,
  color:        colors.grey,
  marginBottom: spacing.md,
  fontStyle:    "italic",
};
const chipRowStyle: CSSProperties = {
  display:   "flex",
  flexWrap:  "wrap",
  gap:       spacing.sm,
};
