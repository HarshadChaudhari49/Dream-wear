import { useState, CSSProperties } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useWardrobe, useWishlist } from "../hooks";
import { useAuth } from "../../../contexts/AuthContext";
import { WardrobeItem, SavedItem } from "../api";

type Tab = "wardrobe" | "saved" | "account";

function formatINR(val: string | number) {
  return `₹${Number(val).toLocaleString("en-IN")}`;
}

export function ProfilePage() {
  const [tab, setTab] = useState<Tab>("wardrobe");
  const { logout }     = useAuth();
  const navigate       = useNavigate();

  const phone = localStorage.getItem("dream_atelier_phone") ?? "Your account";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Profile header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}`, display: "flex", alignItems: "center", gap: spacing.xl }}>
          {/* Avatar */}
          <div style={avatarStyle}>
            <span style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.white }}>✦</span>
          </div>
          <div>
            <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.lg, color: colors.rose, marginBottom: spacing.xs }}>
              Welcome back
            </p>
            <h1 style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white, lineHeight: 1.2 }}>
              {phone}
            </h1>
            <div style={{ display: "flex", gap: spacing.lg, marginTop: spacing.md }}>
              <Link to="/dreams/new" style={{ fontSize: typography.size.xs, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                Share a dream →
              </Link>
              <Link to="/orders" style={{ fontSize: typography.size.xs, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                My orders →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: colors.white, borderBottom: `1px solid ${colors.border}`, position: "sticky", top: 64, zIndex: 10 }}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}`, display: "flex", gap: 0 }}>
          {(["wardrobe", "saved", "account"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={tabStyle(tab === t)}>
              {{ wardrobe: "My Wardrobe", saved: "Saved Pieces", account: "Account" }[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl }}>
        {tab === "wardrobe" && <WardrobeTab />}
        {tab === "saved"    && <SavedTab />}
        {tab === "account"  && <AccountTab onLogout={handleLogout} phone={phone} />}
      </div>
    </div>
  );
}

function WardrobeTab() {
  const { data: items, isLoading } = useWardrobe();

  if (isLoading) return <SkeletonGrid />;

  if (!items?.length) return (
    <div style={emptyStyle}>
      <p style={{ fontSize: 56, marginBottom: spacing.lg }}>👗</p>
      <p style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink, marginBottom: spacing.sm }}>
        Your wardrobe is empty for now.
      </p>
      <p style={{ fontSize: typography.size.sm, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xl, maxWidth: 400 }}>
        Pieces you've ordered will appear here. Each one carries the story of the woman who dreamed it first.
      </p>
      <Link to="/explore"><Button label="Find your first piece" /></Link>
    </div>
  );

  return (
    <div className="fade-in">
      <p style={{ fontSize: typography.size.sm, color: colors.grey, marginBottom: spacing.xl }}>
        {items.length} {items.length === 1 ? "piece" : "pieces"} in your wardrobe
      </p>
      <div style={gridStyle}>
        {items.map((item, i) => <WardrobeCard key={i} item={item} />)}
      </div>
    </div>
  );
}

function WardrobeCard({ item }: { item: WardrobeItem }) {
  const navigate = useNavigate();
  return (
    <div
      className="hover-lift"
      style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, overflow: "hidden", cursor: "pointer" }}
      onClick={() => navigate(`/explore/${item.product.id}`)}
    >
      <div className="card-img-wrap" style={{ height: 220, overflow: "hidden", background: colors.roseLight }}>
        {item.product.display_photo_url ? (
          <img src={item.product.display_photo_url} alt={item.product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🌸</div>
        )}
      </div>
      <div style={{ padding: spacing.md }}>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.md, color: colors.ink, marginBottom: 4 }}>{item.product.title}</p>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose }}>{formatINR(item.product.price_inr)}</p>
        {item.dream_origin_text && (
          <p style={{ fontSize: typography.size.xs, color: colors.grey, fontStyle: "italic", marginTop: spacing.sm, lineHeight: 1.5, borderTop: `1px solid ${colors.border}`, paddingTop: spacing.sm }}>
            ❝ {item.dream_origin_text.slice(0, 80)}…
          </p>
        )}
      </div>
    </div>
  );
}

function SavedTab() {
  const { data: items, isLoading } = useWishlist();

  if (isLoading) return <SkeletonGrid />;

  if (!items?.length) return (
    <div style={emptyStyle}>
      <p style={{ fontSize: 56, marginBottom: spacing.lg }}>🤍</p>
      <p style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink, marginBottom: spacing.sm }}>
        Nothing saved yet.
      </p>
      <p style={{ fontSize: typography.size.sm, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xl, maxWidth: 400 }}>
        Tap the heart on any piece to save it here. Think of it as your private wishlist.
      </p>
      <Link to="/explore"><Button label="Browse pieces" /></Link>
    </div>
  );

  return (
    <div className="fade-in">
      <p style={{ fontSize: typography.size.sm, color: colors.grey, marginBottom: spacing.xl }}>
        {items.length} saved {items.length === 1 ? "piece" : "pieces"}
      </p>
      <div style={gridStyle}>
        {items.map((item) => <SavedCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

function SavedCard({ item }: { item: SavedItem }) {
  const navigate = useNavigate();
  return (
    <div
      className="hover-lift"
      style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, overflow: "hidden", cursor: "pointer" }}
      onClick={() => navigate(`/explore/${item.product.id}`)}
    >
      <div className="card-img-wrap" style={{ height: 220, overflow: "hidden", background: colors.roseLight }}>
        {item.product.display_photo_url ? (
          <img src={item.product.display_photo_url} alt={item.product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🌸</div>
        )}
      </div>
      <div style={{ padding: spacing.md }}>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.md, color: colors.ink, marginBottom: 4 }}>{item.product.title}</p>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose }}>{formatINR(item.product.price_inr)}</p>
        <p style={{ fontSize: typography.size.xs, color: colors.grey, marginTop: 4 }}>
          Saved {new Date(item.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </p>
      </div>
    </div>
  );
}

function AccountTab({ onLogout, phone }: { onLogout: () => void; phone: string }) {
  return (
    <div style={{ maxWidth: 480 }} className="fade-in">
      <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.xl, marginBottom: spacing.lg }}>
        <h3 style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.ink, marginBottom: spacing.lg }}>Account details</h3>
        <div style={{ display: "flex", justifyContent: "space-between", padding: `${spacing.sm} 0`, borderBottom: `1px solid ${colors.border}` }}>
          <span style={metaLabel}>Phone</span>
          <span style={{ fontSize: typography.size.sm, color: colors.ink }}>{phone}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: `${spacing.sm} 0` }}>
          <span style={metaLabel}>Account type</span>
          <span style={{ fontSize: typography.size.sm, color: colors.ink }}>Dreamer</span>
        </div>
      </div>

      <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.xl }}>
        <h3 style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.ink, marginBottom: spacing.lg }}>Quick links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
          <Link to="/dreams/mine" style={quickLinkStyle}>My dreams →</Link>
          <Link to="/orders" style={quickLinkStyle}>My orders →</Link>
          <Link to="/explore" style={quickLinkStyle}>Explore pieces →</Link>
        </div>
      </div>

      <div style={{ marginTop: spacing.xl }}>
        <Button label="Sign out" variant="ghost" onClick={onLogout} />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div style={gridStyle}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton" style={{ height: 300, borderRadius: radius.xl }} />
      ))}
    </div>
  );
}

const headerStyle: CSSProperties = {
  background:   `linear-gradient(160deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:      `${spacing["3xl"]} ${spacing.xl}`,
  marginBottom: 0,
};
const avatarStyle: CSSProperties = {
  width:          80,
  height:         80,
  borderRadius:   "50%",
  background:     `linear-gradient(135deg, ${colors.rose}, ${colors.roseDark})`,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  flexShrink:     0,
  boxShadow:      shadows.lg,
};
const tabStyle = (active: boolean): CSSProperties => ({
  padding:        `${spacing.lg} ${spacing.xl}`,
  border:         "none",
  borderBottom:   active ? `2px solid ${colors.rose}` : "2px solid transparent",
  background:     "none",
  cursor:         "pointer",
  fontSize:       typography.size.sm,
  fontWeight:     active ? typography.weight.semibold : typography.weight.regular,
  color:          active ? colors.rose : colors.grey,
  transition:     "color 0.2s, border-color 0.2s",
  whiteSpace:     "nowrap",
});
const gridStyle: CSSProperties = {
  display:             "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap:                 spacing.lg,
};
const emptyStyle: CSSProperties = {
  textAlign:  "center",
  padding:    spacing["4xl"],
};
const metaLabel: CSSProperties = {
  fontSize:      typography.size.xs,
  fontWeight:    typography.weight.semibold,
  color:         colors.grey,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};
const quickLinkStyle: CSSProperties = {
  fontSize:    typography.size.sm,
  color:       colors.rose,
  padding:     `${spacing.sm} 0`,
  display:     "block",
  borderBottom: `1px solid ${colors.border}`,
};
