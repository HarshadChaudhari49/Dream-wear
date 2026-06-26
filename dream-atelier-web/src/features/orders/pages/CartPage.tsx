import { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useCart, useRemoveFromCart, useUpdateCartItem } from "../hooks";
import { CartItem } from "../api";

function formatINR(val: string | number) {
  return `₹${Number(val).toLocaleString("en-IN")}`;
}

export function CartPage() {
  const { data: items, isLoading } = useCart();
  const navigate = useNavigate();

  const subtotal = items?.reduce(
    (sum, item) => sum + parseFloat(item.product.price_inr) * item.quantity,
    0,
  ) ?? 0;

  if (isLoading) return <LoadingState />;

  if (!items?.length) return <EmptyCart />;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}` }}>
          <h1 style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white }}>
            Your cart
          </h1>
          <p style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.6)", marginTop: spacing.xs }}>
            {items.length} {items.length === 1 ? "piece" : "pieces"} selected
          </p>
        </div>
      </div>

      <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl, display: "grid", gridTemplateColumns: "1fr 340px", gap: spacing.xxl, alignItems: "start" }}>
        {/* Items list */}
        <div className="fade-in">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Summary sidebar */}
        <div style={{ position: "sticky", top: 88 }}>
          <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.xl }}>
            <h3 style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.ink, marginBottom: spacing.lg }}>
              Order summary
            </h3>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <span style={{ fontSize: typography.size.sm, color: colors.grey }}>Subtotal</span>
              <span style={{ fontSize: typography.size.sm, color: colors.ink }}>{formatINR(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: spacing.lg, borderBottom: `1px solid ${colors.border}` }}>
              <span style={{ fontSize: typography.size.sm, color: colors.grey }}>Delivery</span>
              <span style={{ fontSize: typography.size.sm, color: colors.sage, fontWeight: typography.weight.semibold }}>Free</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: `${spacing.lg} 0 ${spacing.xl}` }}>
              <span style={{ fontWeight: typography.weight.bold, color: colors.ink }}>Total</span>
              <span style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.rose }}>{formatINR(subtotal)}</span>
            </div>

            <Button label="Proceed to checkout" fullWidth size="lg" onClick={() => navigate("/checkout")} />
            <Link to="/explore">
              <Button label="Continue shopping" variant="ghost" fullWidth style={{ marginTop: spacing.sm }} />
            </Link>
          </div>

          {/* Brand note */}
          <p style={{ fontSize: typography.size.xs, color: colors.grey, textAlign: "center", marginTop: spacing.lg, lineHeight: 1.6 }}>
            Every piece here was made by a tailor, just for one woman first.
          </p>
        </div>
      </div>
    </div>
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const remove = useRemoveFromCart();
  const update = useUpdateCartItem();

  return (
    <div className="hover-lift" style={{ display: "flex", gap: spacing.lg, background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.lg, marginBottom: spacing.md }}>
      {/* Image */}
      <div className="card-img-wrap" style={{ width: 88, height: 88, borderRadius: radius.lg, flexShrink: 0, overflow: "hidden", background: colors.roseLight }}>
        {item.product.display_photo_url ? (
          <img src={item.product.display_photo_url} alt={item.product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🌸</div>
        )}
      </div>

      {/* Details */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: typography.heading, fontSize: typography.size.md, color: colors.ink, marginBottom: 2 }}>{item.product.title}</p>
            <p style={{ fontSize: typography.size.xs, color: colors.grey, textTransform: "capitalize" }}>{item.product.category}</p>
          </div>
          <p style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose }}>{formatINR(item.product.price_inr)}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: spacing.md }}>
          {/* Quantity stepper */}
          <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, background: colors.background, borderRadius: radius.pill, padding: `${spacing.xs} ${spacing.sm}`, border: `1px solid ${colors.border}` }}>
            <button
              onClick={() => item.quantity > 1 && update.mutate({ cartItemId: item.id, quantity: item.quantity - 1 })}
              style={qtyBtnStyle(item.quantity <= 1)}
            >−</button>
            <span style={{ fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.ink, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
            <button
              onClick={() => update.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })}
              style={qtyBtnStyle(false)}
            >+</button>
          </div>

          {/* Remove */}
          <button
            onClick={() => remove.mutate(item.id)}
            style={{ fontSize: typography.size.xs, color: colors.grey, background: "none", border: "none", cursor: "pointer", padding: `${spacing.xs} ${spacing.sm}` }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
      <div style={{ maxWidth: 440, textAlign: "center" }} className="slide-up">
        <p style={{ fontSize: 64, marginBottom: spacing.lg }}>🛍</p>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.ink, marginBottom: spacing.md, fontStyle: "italic" }}>
          Your cart is waiting.
        </p>
        <p style={{ fontSize: typography.size.md, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xxl }}>
          Find a piece that calls to you — something made by a real tailor, from a real woman's dream.
        </p>
        <Link to="/explore">
          <Button label="Explore pieces" size="lg" />
        </Link>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl }}>
      <div className="skeleton" style={{ height: 100, borderRadius: radius.xl, marginBottom: spacing.xl }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: spacing.xxl }}>
        <div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: 112, borderRadius: radius.xl, marginBottom: spacing.md }} />
          ))}
        </div>
        <div className="skeleton" style={{ height: 300, borderRadius: radius.xl }} />
      </div>
    </div>
  );
}

const headerStyle: CSSProperties = {
  background:  `linear-gradient(135deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:     `${spacing["3xl"]} ${spacing.xl} ${spacing.xxl}`,
  marginBottom: spacing.xl,
};
const qtyBtnStyle = (disabled: boolean): CSSProperties => ({
  width:        28,
  height:       28,
  borderRadius: "50%",
  border:       `1px solid ${disabled ? colors.border : colors.rose}`,
  background:   disabled ? colors.background : colors.rose,
  color:        disabled ? colors.grey : colors.white,
  cursor:       disabled ? "not-allowed" : "pointer",
  fontSize:     typography.size.lg,
  lineHeight:   1,
  display:      "flex",
  alignItems:   "center",
  justifyContent: "center",
  fontWeight:   typography.weight.semibold,
});
