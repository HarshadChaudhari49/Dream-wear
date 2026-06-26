import { useState, CSSProperties } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useProductDetail, useSaveProduct, useLoveProduct } from "../hooks";
import { useAddToCart } from "../../orders/hooks";
import { useToast } from "../../../shared/components/Toast";

export function ProductDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const navigate  = useNavigate();
  const toast     = useToast();

  const { data: product, isLoading } = useProductDetail(id!);
  const addToCart = useAddToCart();
  const save      = useSaveProduct();
  const love      = useLoveProduct();

  const [saved, setSaved]     = useState(false);
  const [loved, setLoved]     = useState(false);
  const [quantity, setQty]    = useState(1);
  const [addedToCart, setATC] = useState(false);

  if (isLoading) return <LoadingState />;
  if (!product)  return <NotFound />;

  async function handleAddToCart() {
    await addToCart.mutateAsync({ productId: product!.id, quantity });
    setATC(true);
    toast("Added to cart ✓");
    setTimeout(() => setATC(false), 2000);
  }

  function handleSave() {
    save.mutate(product!.id);
    setSaved(true);
    toast("Saved to your wishlist");
  }

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `${spacing.lg} ${spacing.xl} 0` }}>
        <p style={{ fontSize: typography.size.sm, color: colors.grey }}>
          <Link to="/" style={{ color: colors.grey }}>Home</Link>
          {" / "}
          <Link to="/explore" style={{ color: colors.grey }}>Explore</Link>
          {" / "}
          <span style={{ color: colors.ink }}>{product.title}</span>
        </p>
      </div>

      {/* Main layout */}
      <div style={layoutStyle}>
        {/* Left: Image */}
        <div style={imgSectionStyle}>
          <div style={imgWrapStyle} className="card-img-wrap">
            {product.display_photo_url ? (
              <img src={product.display_photo_url} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${colors.roseLight}, ${colors.sand})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 64 }}>👗</span>
              </div>
            )}
          </div>

          {/* Photo attribution */}
          <p style={{ fontSize: typography.size.xs, color: colors.grey, marginTop: spacing.sm, textAlign: "center", fontStyle: "italic" }}>
            Real customer photo — authentic, not styled
          </p>
        </div>

        {/* Right: Info */}
        <div style={infoSectionStyle} className="slide-up">
          {/* Category badge */}
          <span style={categoryBadgeStyle}>{product.category}</span>

          <h1 style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.ink, lineHeight: 1.2, marginBottom: spacing.md }}>
            {product.title}
          </h1>

          {/* Mood tags */}
          {product.mood_tags?.length > 0 && (
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", marginBottom: spacing.lg }}>
              {product.mood_tags.map((t) => (
                <span key={t} style={{ padding: "4px 12px", borderRadius: radius.pill, background: colors.roseLight, color: colors.rose, fontSize: typography.size.xs, fontWeight: typography.weight.semibold }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <p style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.rose, marginBottom: spacing.sm }}>
            ₹{Number(product.price_inr).toLocaleString("en-IN")}
          </p>
          <p style={{ fontSize: typography.size.xs, color: colors.grey, marginBottom: spacing.xl }}>
            Free delivery · Handmade with care
          </p>

          <hr className="divider" style={{ marginBottom: spacing.xl }} />

          {/* Quantity */}
          <div style={{ marginBottom: spacing.xl }}>
            <p style={{ fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.ink, marginBottom: spacing.sm }}>
              Quantity
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
              <button onClick={() => setQty(Math.max(1, quantity - 1))} style={qtyBtnStyle}>−</button>
              <span style={{ minWidth: 32, textAlign: "center", fontWeight: typography.weight.semibold, fontSize: typography.size.md }}>{quantity}</span>
              <button onClick={() => setQty(quantity + 1)} style={qtyBtnStyle}>+</button>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: spacing.md, marginBottom: spacing.lg }}>
            <Button
              label={addedToCart ? "In your cart ✓" : "Add to cart"}
              size="lg"
              fullWidth
              loading={addToCart.isPending}
              onClick={handleAddToCart}
              style={addedToCart ? { background: colors.success, boxShadow: "none" } : undefined}
            />
            <button
              className={`heart-btn ${saved ? "liked" : ""}`}
              onClick={handleSave}
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: saved ? colors.roseLight : colors.white,
                border: `1.5px solid ${saved ? colors.rose : colors.border}`,
                color: saved ? colors.rose : colors.grey,
                fontSize: 20, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: shadows.xs,
              }}
            >
              {saved ? "♥" : "♡"}
            </button>
          </div>

          <Button
            label="Go to cart & checkout"
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate("/cart")}
          />

          <hr className="divider" style={{ margin: `${spacing.xl} 0` }} />

          {/* Story callout */}
          <div style={storyBoxStyle}>
            <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.lg, color: colors.rose, marginBottom: spacing.xs }}>
              ✦ This started as someone's dream
            </p>
            <p style={{ fontSize: typography.size.sm, color: colors.grey, lineHeight: 1.6 }}>
              This piece was born from a real woman's described idea. It was made by hand, delivered to her first, and published here with her blessing. When you buy this, you're wearing someone's imagination.
            </p>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", gap: spacing.lg, marginTop: spacing.xl, alignItems: "center" }}>
            {product.save_count > 0 && (
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.rose }}>{product.save_count}</p>
                <p style={{ fontSize: typography.size.xs, color: colors.grey }}>saved</p>
              </div>
            )}
            <button
              onClick={() => { if (!loved) { love.mutate(product!.id); setLoved(true); } }}
              disabled={loved || love.isPending}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 2, border: "none", cursor: loved ? "default" : "pointer",
                padding: `${spacing.sm} ${spacing.md}`,
                borderRadius: radius.md,
                background: loved ? colors.roseLight : "transparent",
                transition: "background 0.2s",
              }}
            >
              <span style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.rose }}>
                {(product.love_count + (loved ? 1 : 0)).toLocaleString()}
              </span>
              <span style={{ fontSize: typography.size.xs, color: loved ? colors.rose : colors.grey }}>
                {loved ? "♥ loved" : "♡ love this"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl, display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.xxl }}>
      <div className="skeleton" style={{ height: 560, borderRadius: radius.xl }} />
      <div>
        {[80, 300, 40, 60, 200].map((w, i) => (
          <div key={i} className="skeleton" style={{ height: i === 1 ? 48 : 20, width: `${w}%`, marginBottom: 20, borderRadius: radius.sm }} />
        ))}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: spacing["4xl"], color: colors.grey }}>
      <p style={{ fontSize: 48, marginBottom: spacing.md }}>🌸</p>
      <p style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink }}>
        This piece couldn't be found
      </p>
      <Link to="/explore" style={{ color: colors.rose, marginTop: spacing.md, display: "block" }}>← Back to explore</Link>
    </div>
  );
}

/* ─── styles ─────────────────────────────────────────────────── */
const layoutStyle: CSSProperties = {
  display:    "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap:        spacing.xxl,
  maxWidth:   maxWidth.content,
  margin:     "0 auto",
  padding:    spacing.xl,
  alignItems: "start",
};
const imgSectionStyle: CSSProperties = {
  position: "sticky",
  top:      88,
};
const imgWrapStyle: CSSProperties = {
  borderRadius: radius.xl,
  overflow:    "hidden",
  height:      560,
  boxShadow:   shadows.lg,
};
const infoSectionStyle: CSSProperties = {
  paddingTop: spacing.md,
};
const categoryBadgeStyle: CSSProperties = {
  display:      "inline-block",
  padding:      "4px 12px",
  borderRadius: radius.pill,
  background:   colors.sageLight,
  color:        colors.sageDark,
  fontSize:     typography.size.xs,
  fontWeight:   typography.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: spacing.md,
};
const qtyBtnStyle: CSSProperties = {
  width:       36, height: 36,
  borderRadius: "50%",
  border:      `1.5px solid ${colors.border}`,
  background:  colors.white,
  color:       colors.ink,
  fontSize:    18,
  cursor:      "pointer",
  display:     "flex",
  alignItems:  "center",
  justifyContent: "center",
};
const storyBoxStyle: CSSProperties = {
  padding:     spacing.lg,
  background:  colors.rosePale,
  borderRadius: radius.lg,
  borderLeft:  `3px solid ${colors.rose}`,
};
