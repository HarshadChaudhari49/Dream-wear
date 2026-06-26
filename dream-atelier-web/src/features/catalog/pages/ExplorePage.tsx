import { useState, CSSProperties } from "react";
import { useSearchParams } from "react-router-dom";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useProducts } from "../hooks";
import { ProductCard } from "../../home/pages/HomePage";

const CATEGORIES = [
  { value: "",           label: "All pieces" },
  { value: "kurti",      label: "Kurtis" },
  { value: "top",        label: "Tops" },
  { value: "dress",      label: "Dresses" },
  { value: "co_ord_set", label: "Co-ord sets" },
];

const MOODS = ["Soft", "Bold", "Classic", "Edgy", "Romantic", "Minimal"];

const SORT_OPTIONS = [
  { value: "-published_at", label: "Newest first" },
  { value: "price_inr",     label: "Price: low to high" },
  { value: "-price_inr",    label: "Price: high to low" },
  { value: "-save_count",   label: "Most loved" },
];

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [mood,     setMood]     = useState("");
  const [ordering, setOrdering] = useState("-published_at");

  const { data: products, isLoading } = useProducts({
    category: category || undefined,
    mood:     mood ? mood.toLowerCase() : undefined,
    ordering,
    search:   search || undefined,
  });

  function selectCategory(val: string) {
    setCategory(val);
    setSearchParams(val ? { category: val } : {});
  }

  function clearAll() {
    setCategory("");
    setMood("");
    setSearchParams({});
  }

  const hasFilters = !!category || !!mood;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Page header */}
      <div style={pageHeaderStyle}>
        <div style={{ maxWidth: maxWidth.wide, margin: "0 auto", padding: `0 ${spacing.xl}` }}>
          <h1 style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.white, marginBottom: spacing.xs }}>
            Explore all pieces
          </h1>
          <p style={{ fontSize: typography.size.md, color: "rgba(255,255,255,0.7)" }}>
            {products?.length ?? 0} pieces, each one someone's real idea
          </p>
        </div>
      </div>

      {/* Body: sidebar + main */}
      <div style={bodyStyle}>
        {/* ── Sidebar ── */}
        <aside style={sidebarStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.lg }}>
            <span style={sectionHeadStyle}>Filters</span>
            {hasFilters && (
              <button onClick={clearAll} style={clearBtnStyle}>Clear all</button>
            )}
          </div>

          {/* Category */}
          <div style={{ marginBottom: spacing.xl }}>
            <span style={filterLabelStyle}>Category</span>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs, marginTop: spacing.sm }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => selectCategory(c.value)}
                  style={sidebarItemStyle(category === c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <span style={filterLabelStyle}>Mood</span>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs, marginTop: spacing.sm }}>
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(mood === m ? "" : m)}
                  style={sidebarItemStyle(mood === m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Search + sort row */}
          <div style={topBarStyle}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: spacing.md, top: "50%", transform: "translateY(-50%)", color: colors.grey, fontSize: 16, pointerEvents: "none" }}>🔍</span>
              <input
                className="form-input"
                type="search"
                placeholder="Search by title, description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={searchInputStyle}
              />
            </div>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              style={selectStyle}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Active filter pills */}
          {hasFilters && (
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", marginBottom: spacing.lg }}>
              {category && (
                <span style={activePillStyle}>
                  {CATEGORIES.find((c) => c.value === category)?.label}
                  <button onClick={() => selectCategory("")} style={pillRemoveStyle}>×</button>
                </span>
              )}
              {mood && (
                <span style={activePillStyle}>
                  {mood}
                  <button onClick={() => setMood("")} style={pillRemoveStyle}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <SkeletonGrid />
          ) : products?.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="product-grid slide-up">
              {products?.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="product-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ borderRadius: radius.lg, overflow: "hidden", boxShadow: shadows.sm }}>
          <div className="skeleton" style={{ height: 280 }} />
          <div style={{ padding: spacing.md, background: colors.white }}>
            <div className="skeleton" style={{ height: 14, width: "70%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 18, width: "40%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: spacing["4xl"], color: colors.grey }}>
      <p style={{ fontSize: 48, marginBottom: spacing.md }}>🌸</p>
      <p style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink, marginBottom: spacing.sm }}>
        Nothing here yet
      </p>
      <p style={{ fontSize: typography.size.md }}>Try a different filter, or check back soon.</p>
    </div>
  );
}

/* ─── sidebar item ─────────────────────────────────────────────── */
function sidebarItemStyle(active: boolean): CSSProperties {
  return {
    width:        "100%",
    textAlign:    "left",
    padding:      `10px ${spacing.md}`,
    borderRadius: radius.md,
    border:       "none",
    background:   active ? colors.roseLight : "transparent",
    color:        active ? colors.rose : colors.ink,
    fontWeight:   active ? typography.weight.semibold : typography.weight.regular,
    fontSize:     typography.size.sm,
    cursor:       "pointer",
    transition:   "all 0.15s ease",
    borderLeft:   active ? `3px solid ${colors.rose}` : "3px solid transparent",
  };
}

/* ─── styles ─────────────────────────────────────────────────── */
const pageHeaderStyle: CSSProperties = {
  background:   `linear-gradient(135deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:      `${spacing["3xl"]} ${spacing.xl} ${spacing.xxl}`,
  marginBottom: spacing.xl,
};

const bodyStyle: CSSProperties = {
  display:   "flex",
  gap:       spacing.xl,
  maxWidth:  maxWidth.wide,
  margin:    "0 auto",
  padding:   `0 ${spacing.xl} ${spacing["3xl"]} ${spacing.sm}`,
  alignItems: "flex-start",
};

const sidebarStyle: CSSProperties = {
  width:       240,
  flexShrink:  0,
  position:    "sticky",
  top:         88,
  background:  colors.white,
  borderRadius: radius.lg,
  border:      `1px solid ${colors.border}`,
  boxShadow:   shadows.xs,
  padding:     spacing.lg,
};

const topBarStyle: CSSProperties = {
  display:       "flex",
  gap:           spacing.md,
  alignItems:    "center",
  marginBottom:  spacing.lg,
};

const searchInputStyle: CSSProperties = {
  width:        "100%",
  padding:      `${spacing.md} ${spacing.md} ${spacing.md} 44px`,
  borderRadius: radius.lg,
  border:       `1.5px solid ${colors.border}`,
  fontSize:     typography.size.md,
  background:   colors.white,
  color:        colors.ink,
  boxShadow:    shadows.sm,
  outline:      "none",
};

const selectStyle: CSSProperties = {
  padding:      `10px ${spacing.md}`,
  borderRadius: radius.md,
  border:       `1.5px solid ${colors.border}`,
  fontSize:     typography.size.sm,
  color:        colors.ink,
  background:   colors.white,
  cursor:       "pointer",
  outline:      "none",
  flexShrink:   0,
};

const sectionHeadStyle: CSSProperties = {
  fontFamily:  typography.heading,
  fontSize:    typography.size.lg,
  color:       colors.ink,
};

const filterLabelStyle: CSSProperties = {
  fontSize:      typography.size.xs,
  fontWeight:    typography.weight.semibold,
  color:         colors.grey,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const clearBtnStyle: CSSProperties = {
  fontSize:   typography.size.xs,
  color:      colors.rose,
  background: "none",
  border:     "none",
  cursor:     "pointer",
  padding:    0,
};

const activePillStyle: CSSProperties = {
  display:      "inline-flex",
  alignItems:   "center",
  gap:          spacing.xs,
  padding:      `4px 10px 4px 12px`,
  borderRadius: radius.pill,
  background:   colors.roseLight,
  color:        colors.rose,
  fontSize:     typography.size.xs,
  fontWeight:   typography.weight.semibold,
};

const pillRemoveStyle: CSSProperties = {
  background: "none",
  border:     "none",
  color:      colors.rose,
  cursor:     "pointer",
  fontSize:   14,
  lineHeight: 1,
  padding:    0,
};
