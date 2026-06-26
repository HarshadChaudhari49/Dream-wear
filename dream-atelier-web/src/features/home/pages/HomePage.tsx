import { useState, CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Button } from "../../../shared/components/Button";
import { Card } from "../../../shared/components/Card";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useBanners, useProducts, useSaveProduct } from "../../catalog/hooks";
import { Product } from "../../catalog/api";

export function HomePage() {
  const { data: arrivals } = useProducts({ ordering: "-published_at" });
  const { data: all }      = useProducts({});

  return (
    <main style={{ background: colors.background, minHeight: "100vh" }}>
      <DashboardTopBar />
      <div style={{ padding: `0 ${spacing.xl} ${spacing["3xl"]}`, maxWidth: maxWidth.content, margin: "0 auto" }}>
        <WelcomeCard />
        <CategorySection />
        <NewArrivalsSection products={arrivals?.slice(0, 8) ?? []} />
        <AllPiecesSection products={all ?? []} />
      </div>
    </main>
  );
}

/* ─── DASHBOARD TOP BAR ──────────────────────────────────────── */
function DashboardTopBar() {
  const { isAuthenticated } = useAuth();
  const now   = new Date();
  const date  = now.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" }).toUpperCase();
  const phone = isAuthenticated ? (localStorage.getItem("dream_atelier_phone") ?? "") : "";

  return (
    <div style={topBarStyle}>
      <div>
        <p style={{ fontSize: typography.size.xs, color: colors.grey, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
          {date}
        </p>
        <h2 style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink }}>
          {isAuthenticated ? `${getGreeting()}, dreamer` : "Welcome to Dream Atelier"}
        </h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
        <div style={topBarIconStyle}>
          <svg width="18" height="18" fill="none" stroke={colors.grey} strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        {isAuthenticated && phone && (
          <div style={topBarAvatarStyle}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.white }}>{phone.slice(-2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ─── WELCOME CARD ───────────────────────────────────────────── */
function WelcomeCard() {
  return (
    <div style={welcomeCardStyle} className="fade-in">
      {/* Left: brand circle */}
      <div style={brandCircleWrapStyle}>
        <div style={brandCircleStyle} className="hero-gradient">
          <span style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.white, fontStyle: "italic", position: "relative", zIndex: 1 }}>
            ✦
          </span>
        </div>
      </div>

      {/* Right: copy + CTAs */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.rose, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: spacing.sm }}>
          Dream Atelier
        </p>
        <h1 style={{ fontFamily: typography.heading, fontSize: "clamp(26px, 3vw, 38px)", color: colors.ink, lineHeight: 1.2, marginBottom: spacing.md }}>
          A wardrobe that<br /><em style={{ color: colors.rose }}>feels like you</em>
        </h1>
        <p style={{ fontSize: typography.size.md, color: colors.grey, maxWidth: 420, lineHeight: 1.65, marginBottom: spacing.xl }}>
          Every piece here began as one real woman's dream — described in her own words, made by hand, delivered to her first.
        </p>
        <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
          <Link to="/explore" style={cardPrimaryBtn}>
            Explore pieces →
          </Link>
          <Link to="/dreams/new" style={cardSecondaryBtn}>
            Share your dream
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── CATEGORIES ─────────────────────────────────────────────── */
function CategorySection() {
  return (
    <section style={{ padding: `${spacing.xxl} ${spacing.xl}`, maxWidth: maxWidth.content, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg }}>
        <CategoryCard
          label="Kurtis"
          tag="Designed by real dreamers"
          to="/explore?category=kurti"
          gradient="linear-gradient(135deg, #F3E1E4 0%, #FADDE1 100%)"
          accentColor={colors.rose}
          icon="🌸"
        />
        <CategoryCard
          label="Tops"
          tag="From everyday ease to standout moments"
          to="/explore?category=top"
          gradient="linear-gradient(135deg, #EAF0E9 0%, #D5E8D3 100%)"
          accentColor={colors.sage}
          icon="✨"
        />
      </div>
    </section>
  );
}

function CategoryCard({ label, tag, to, gradient, accentColor, icon }: {
  label: string; tag: string; to: string; gradient: string; accentColor: string; icon: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        display:       "block",
        textDecoration:"none",
        borderRadius:  radius.xl,
        background:    gradient,
        padding:       spacing.xxl,
        position:      "relative",
        overflow:      "hidden",
        transition:    "transform 0.25s ease, box-shadow 0.25s ease",
        transform:     hovered ? "translateY(-4px)" : "none",
        boxShadow:     hovered ? shadows.lg : shadows.sm,
        minHeight:     200,
        border:        `1px solid rgba(0,0,0,0.04)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontSize: 40, display: "block", marginBottom: spacing.md }}>{icon}</span>
      <h2 style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: accentColor, marginBottom: spacing.xs }}>
        {label}
      </h2>
      <p style={{ fontSize: typography.size.sm, color: colors.grey, maxWidth: 240 }}>{tag}</p>
      <span style={{
        position: "absolute", bottom: spacing.lg, right: spacing.lg,
        fontSize: typography.size.sm, color: accentColor, fontWeight: typography.weight.semibold,
        opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease",
      }}>
        Browse all →
      </span>
    </Link>
  );
}

/* ─── NEW ARRIVALS ───────────────────────────────────────────── */
function NewArrivalsSection({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section style={{ padding: `0 ${spacing.xl} ${spacing.xxl}`, maxWidth: maxWidth.content, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.xl }}>
        <div>
          <h2 style={sectionHeadingStyle}>New arrivals</h2>
          <p style={{ fontSize: typography.size.sm, color: colors.grey, marginTop: spacing.xs }}>
            The latest pieces brought to life from real dreams
          </p>
        </div>
        <Link to="/explore" style={{ fontSize: typography.size.sm, color: colors.rose, fontWeight: typography.weight.semibold }}>
          View all →
        </Link>
      </div>

      <div className="scroll-row">
        {products.map((p, i) => (
          <NewArrivalCard key={p.id} product={p} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}

function NewArrivalCard({ product, featured }: { product: Product; featured?: boolean }) {
  const navigate = useNavigate();
  const width = featured ? 340 : 260;

  return (
    <div
      style={{ width, flexShrink: 0, cursor: "pointer" }}
      className="hover-lift"
      onClick={() => navigate(`/explore/${product.id}`)}
    >
      <div className="card-img-wrap" style={{ borderRadius: radius.lg, marginBottom: spacing.md, height: featured ? 320 : 240 }}>
        {product.display_photo_url ? (
          <img src={product.display_photo_url} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${colors.roseLight}, ${colors.sand})` }} />
        )}
      </div>

      {/* Speech bubble */}
      <div className="speech-bubble" style={{ marginBottom: spacing.sm }}>
        <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.md, color: colors.ink, lineHeight: 1.5 }}>
          {product.title}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm }}>
        <span style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose }}>
          ₹{Number(product.price_inr).toLocaleString("en-IN")}
        </span>
        <span style={{ fontSize: typography.size.xs, color: colors.grey }}>Shop this look →</span>
      </div>
    </div>
  );
}

/* ─── ALL PIECES ─────────────────────────────────────────────── */
function AllPiecesSection({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section style={{ padding: `0 ${spacing.xl} ${spacing["3xl"]}`, maxWidth: maxWidth.content, margin: "0 auto" }}>
      <hr className="divider" style={{ marginBottom: spacing.xxl }} />

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.xl }}>
        <h2 style={sectionHeadingStyle}>All pieces</h2>
        <Link to="/explore" style={{ fontSize: typography.size.sm, color: colors.rose, fontWeight: typography.weight.semibold }}>
          Explore with filters →
        </Link>
      </div>

      <div className="product-grid">
        {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {products.length > 8 && (
        <div style={{ textAlign: "center", marginTop: spacing.xxl }}>
          <Link to="/explore">
            <Button label="See all pieces" variant="outline" size="lg" />
          </Link>
        </div>
      )}
    </section>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const save     = useSaveProduct();
  const [saved, setSaved]   = useState(false);
  const [imgErr, setImgErr] = useState(false);

  function handleSave(e: React.MouseEvent) {
    e.stopPropagation();
    save.mutate(product.id);
    setSaved(true);
  }

  return (
    <Card
      flush
      hoverable
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/explore/${product.id}`)}
    >
      {/* Image */}
      <div className="card-img-wrap" style={{ position: "relative" }}>
        {!imgErr && product.display_photo_url ? (
          <img
            src={product.display_photo_url}
            alt={product.title}
            style={{ width: "100%", height: 280, objectFit: "cover" }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{ width: "100%", height: 280, background: `linear-gradient(135deg, ${colors.roseLight}, ${colors.sand})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 32 }}>👗</span>
          </div>
        )}

        {/* Save heart */}
        <button
          className={`heart-btn ${saved ? "liked" : ""}`}
          onClick={handleSave}
          style={{
            position: "absolute", top: 10, right: 10,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            boxShadow: shadows.sm,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: saved ? colors.rose : colors.grey,
          }}
        >
          {saved ? "♥" : "♡"}
        </button>

        {/* Mood tags */}
        {product.mood_tags?.length > 0 && (
          <div style={{ position: "absolute", bottom: 8, left: 8, display: "flex", gap: 4 }}>
            {product.mood_tags.slice(0, 2).map((t) => (
              <span key={t} style={{ background: "rgba(255,255,255,0.88)", borderRadius: radius.pill, padding: "2px 8px", fontSize: typography.size.xs, color: colors.ink, fontWeight: typography.weight.medium }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: `${spacing.md} ${spacing.md} ${spacing.sm}` }}>
        <p style={{ fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.ink, marginBottom: 4, lineHeight: 1.4 }}>
          {product.title}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose }}>
            ₹{Number(product.price_inr).toLocaleString("en-IN")}
          </span>
          {product.save_count > 0 && (
            <span style={{ fontSize: typography.size.xs, color: colors.grey }}>♡ {product.save_count}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ─── BRAND STORY ────────────────────────────────────────────── */
function BrandStorySection() {
  return (
    <section style={{ background: colors.ink, padding: `${spacing["4xl"]} ${spacing.xl}`, position: "relative", overflow: "hidden" }}>
      {/* Dot pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.xl, color: colors.rose, marginBottom: spacing.md }}>
          No fast-fashion brand can ever copy this
        </p>
        <h2 style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.white, marginBottom: spacing.lg, lineHeight: 1.25, fontStyle: "italic" }}>
          Every design here began as someone's dream.
        </h2>
        <p style={{ fontSize: typography.size.md, color: "rgba(255,255,255,0.65)", lineHeight: typography.lineHeight.loose, marginBottom: spacing.xxl }}>
          She described it. We made it. She wore it. And with her blessing, it appeared here —
          her original words beside the finished piece. That wall of real stories, real women,
          real dreams is what makes this place unlike anything else.
        </p>
        <Link to="/dreams/new" style={storyCtaStyle}>
          Share your vision →
        </Link>
      </div>

      {/* Decorative quote */}
      <p style={{ position: "absolute", bottom: spacing.xl, right: spacing.xl, fontFamily: typography.heading, fontSize: "6rem", color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none" }}>
        "
      </p>
    </section>
  );
}

/* ─── shared styles ───────────────────────────────────────────── */
const topBarStyle: CSSProperties = {
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  padding:        `${spacing.xl} ${spacing.xl} ${spacing.lg}`,
  maxWidth:       maxWidth.content,
  margin:         "0 auto",
};

const topBarIconStyle: CSSProperties = {
  width:          38,
  height:         38,
  borderRadius:   "50%",
  background:     colors.white,
  border:         `1px solid ${colors.border}`,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  cursor:         "pointer",
  boxShadow:      shadows.xs,
};

const topBarAvatarStyle: CSSProperties = {
  width:          38,
  height:         38,
  borderRadius:   "50%",
  background:     `linear-gradient(135deg, ${colors.rose}, ${colors.roseDark})`,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  boxShadow:      shadows.xs,
};

const welcomeCardStyle: CSSProperties = {
  display:      "flex",
  alignItems:   "center",
  gap:          spacing.xxl,
  background:   `linear-gradient(135deg, ${colors.rosePale} 0%, ${colors.sand} 100%)`,
  borderRadius: radius.xl,
  padding:      `${spacing.xxl} ${spacing["3xl"]}`,
  marginBottom: spacing.xl,
  border:       `1px solid ${colors.border}`,
  boxShadow:    shadows.sm,
};

const brandCircleWrapStyle: CSSProperties = {
  flexShrink: 0,
};

const brandCircleStyle: CSSProperties = {
  width:          160,
  height:         160,
  borderRadius:   "50%",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  boxShadow:      shadows.lg,
  position:       "relative",
  overflow:       "hidden",
};

const cardPrimaryBtn: CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  padding:        `12px ${spacing.xl}`,
  borderRadius:   radius.pill,
  background:     `linear-gradient(135deg, ${colors.rose} 0%, ${colors.roseDark} 100%)`,
  color:          colors.white,
  fontWeight:     typography.weight.semibold,
  fontSize:       typography.size.md,
  boxShadow:      shadows.btn,
  textDecoration: "none",
};

const cardSecondaryBtn: CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  padding:        `12px ${spacing.xl}`,
  borderRadius:   radius.pill,
  background:     colors.white,
  border:         `1.5px solid ${colors.border}`,
  color:          colors.ink,
  fontWeight:     typography.weight.medium,
  fontSize:       typography.size.md,
  textDecoration: "none",
};
const sectionHeadingStyle: CSSProperties = {
  fontFamily: typography.heading,
  fontSize:   typography.size.xxl,
  color:      colors.ink,
};
const storyCtaStyle: CSSProperties = {
  display:      "inline-flex",
  alignItems:   "center",
  padding:      `14px ${spacing.xxl}`,
  borderRadius: radius.pill,
  border:       `1.5px solid rgba(255,255,255,0.3)`,
  color:        colors.white,
  fontSize:     typography.size.md,
  fontWeight:   typography.weight.semibold,
  textDecoration: "none",
  transition:   "background 0.2s ease",
};
