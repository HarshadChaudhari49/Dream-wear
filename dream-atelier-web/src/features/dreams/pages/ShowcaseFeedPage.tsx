import { useState, CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useShowcaseFeed } from "../hooks";
import { DreamDetail } from "../api";

export function ShowcaseFeedPage() {
  const { data, isLoading } = useShowcaseFeed();

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}`, textAlign: "center" }}>
          <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.xl, color: colors.rose, marginBottom: spacing.sm }}>
            Where vision becomes real
          </p>
          <h1 style={{ fontFamily: typography.heading, fontSize: "clamp(32px, 5vw, 54px)", color: colors.white, lineHeight: 1.15, marginBottom: spacing.lg }}>
            Real women.<br />Real dreams.<br />Real garments.
          </h1>
          <p style={{ fontSize: typography.size.md, color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, marginBottom: spacing.xl }}>
            Every card below started as one woman's description of an outfit she imagined. We made it. She wore it first. Then it lived here, exactly as she wrote it.
          </p>
          <Link to="/dreams/new">
            <Button label="Share your dream" size="lg" variant="secondary" style={{ borderRadius: radius.pill }} />
          </Link>
        </div>
      </div>

      {/* Feed */}
      <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl }}>
        {isLoading ? (
          <SkeletonMasonry />
        ) : !data?.length ? (
          <EmptyFeed />
        ) : (
          <div className="masonry-grid fade-in">
            {data.map((dream) => (
              <ShowcaseCard key={dream.id} dream={dream} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShowcaseCard({ dream }: { dream: DreamDetail }) {
  const navigate  = useNavigate();
  const [hovered, setHovered] = useState(false);
  const photo = dream.stages?.[dream.stages.length - 1]?.photo_url;

  return (
    <div
      className="masonry-item"
      style={{
        borderRadius:  radius.xl,
        overflow:      "hidden",
        background:    colors.white,
        boxShadow:     hovered ? shadows.lg : shadows.card,
        transform:     hovered ? "translateY(-3px)" : "none",
        transition:    "transform 0.25s ease, box-shadow 0.25s ease",
        cursor:        "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => dream.product_id && navigate(`/explore/${dream.product_id}`)}
    >
      {/* Photo */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {photo ? (
          <img
            src={photo}
            alt="Finished piece"
            style={{ width: "100%", objectFit: "cover", display: "block", transition: "transform 0.45s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
        ) : (
          <div style={{ height: 260, background: `linear-gradient(135deg, ${colors.roseLight}, ${colors.sand})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 40 }}>🌸</span>
          </div>
        )}

        {/* "Shop this look" overlay on hover */}
        {dream.product_id && (
          <div style={{
            position:   "absolute", inset: 0,
            background: "rgba(43,37,48,0.38)",
            display:    "flex", alignItems: "center", justifyContent: "center",
            opacity:    hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}>
            <span style={{ color: colors.white, fontWeight: typography.weight.semibold, fontSize: typography.size.md, border: `1.5px solid rgba(255,255,255,0.8)`, padding: `${spacing.sm} ${spacing.lg}`, borderRadius: radius.pill }}>
              Shop this look
            </span>
          </div>
        )}
      </div>

      {/* Quote */}
      <div style={{ padding: spacing.lg }}>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.md, color: colors.ink, lineHeight: 1.65, fontStyle: "italic", marginBottom: spacing.md }}>
          ❝ {dream.free_text} ❞
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Mood tags */}
          {dream.mood_tags?.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {dream.mood_tags.slice(0, 2).map((t) => (
                <span key={t} style={{ padding: "2px 10px", borderRadius: radius.pill, background: colors.rosePale, color: colors.rose, fontSize: typography.size.xs, fontWeight: typography.weight.medium }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Love count */}
          {dream.love_count != null && dream.love_count > 0 && (
            <span style={{ fontSize: typography.size.xs, color: colors.grey, whiteSpace: "nowrap" }}>
              ♥ {dream.love_count} loved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonMasonry() {
  const heights = [300, 240, 380, 260, 320, 200];
  return (
    <div className="masonry-grid">
      {heights.map((h, i) => (
        <div key={i} className="masonry-item skeleton" style={{ height: h, borderRadius: radius.xl }} />
      ))}
    </div>
  );
}

function EmptyFeed() {
  return (
    <div style={{ textAlign: "center", padding: spacing["4xl"] }}>
      <p style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.ink, marginBottom: spacing.md, fontStyle: "italic" }}>
        The first dreams are being made.
      </p>
      <p style={{ color: colors.grey, fontSize: typography.size.md, marginBottom: spacing.xxl, maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
        This feed will grow with every piece that goes from dream to garment. Yours could be one of the first.
      </p>
      <Link to="/dreams/new" style={{ marginTop: spacing.xl, display: "inline-block" }}>
        <Button label="Be the first to dream" size="lg" />
      </Link>
    </div>
  );
}

const headerStyle: CSSProperties = {
  background:  `linear-gradient(160deg, ${colors.ink} 0%, #3D1E2A 50%, #2B2530 100%)`,
  padding:     `${spacing["4xl"]} ${spacing.xl}`,
  position:    "relative",
  overflow:    "hidden",
};
