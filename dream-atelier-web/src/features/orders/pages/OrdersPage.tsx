import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useOrders } from "../hooks";
import { Order } from "../api";

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; icon: string }> = {
  pending:    { label: "Pending",    bg: "#FEF3CD", color: "#856404",       icon: "⏳" },
  confirmed:  { label: "Confirmed",  bg: colors.sageLight, color: colors.sageDark, icon: "✅" },
  shipped:    { label: "Shipped",    bg: "#E8F4FD", color: "#1a6091",       icon: "📦" },
  delivered:  { label: "Delivered",  bg: colors.roseLight, color: colors.rose, icon: "✨" },
  cancelled:  { label: "Cancelled",  bg: "#F5F0F0", color: colors.grey,    icon: "✕" },
};

export function OrdersPage() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <LoadingState />;
  if (!orders?.length) return <EmptyState />;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <div style={headerStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}` }}>
          <h1 style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white }}>
            Your orders
          </h1>
          <p style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.6)", marginTop: spacing.xs }}>
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: spacing.xl }}>
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
  const date = new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="hover-lift" style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, overflow: "hidden" }}>
      {/* Status color bar */}
      <div style={{ height: 4, background: status.color }} />

      <div style={{ padding: spacing.lg }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.md }}>
          <div>
            <p style={{ fontSize: typography.size.xs, color: colors.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Order</p>
            <p style={{ fontFamily: typography.heading, fontSize: typography.size.md, color: colors.ink }}>
              #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <span style={{ ...badgeStyle, background: status.bg, color: status.color }}>
            {status.icon} {status.label}
          </span>
        </div>

        {/* Details row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${colors.border}`, paddingTop: spacing.md }}>
          <div style={{ display: "flex", gap: spacing.xxl }}>
            <div>
              <p style={metaLabelStyle}>Total</p>
              <p style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose }}>
                ₹{Number(order.total_inr).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p style={metaLabelStyle}>Placed on</p>
              <p style={{ fontSize: typography.size.sm, color: colors.ink }}>{date}</p>
            </div>
            {order.carrier && (
              <div>
                <p style={metaLabelStyle}>Carrier</p>
                <p style={{ fontSize: typography.size.sm, color: colors.ink }}>{order.carrier}</p>
              </div>
            )}
          </div>

          {order.tracking_ref && (
            <div style={{ textAlign: "right" }}>
              <p style={metaLabelStyle}>Tracking</p>
              <p style={{ fontSize: typography.size.sm, color: colors.ink, fontWeight: typography.weight.semibold, fontFamily: "monospace" }}>
                {order.tracking_ref}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
      <div style={{ maxWidth: 440, textAlign: "center" }} className="slide-up">
        <p style={{ fontSize: 64, marginBottom: spacing.lg }}>📋</p>
        <p style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.ink, marginBottom: spacing.md, fontStyle: "italic" }}>
          No orders yet.
        </p>
        <p style={{ fontSize: typography.size.md, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xxl }}>
          When you place an order, it'll appear here. Each piece ships with care.
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
    <div style={{ maxWidth: 760, margin: "0 auto", padding: spacing.xl }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton" style={{ height: 120, borderRadius: radius.xl, marginBottom: spacing.md }} />
      ))}
    </div>
  );
}

const headerStyle: CSSProperties = {
  background:   `linear-gradient(135deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:      `${spacing["3xl"]} ${spacing.xl} ${spacing.xxl}`,
  marginBottom: spacing.xl,
};
const badgeStyle: CSSProperties = {
  display:      "inline-flex",
  alignItems:   "center",
  gap:          6,
  padding:      "4px 12px",
  borderRadius: radius.pill,
  fontSize:     typography.size.xs,
  fontWeight:   typography.weight.semibold,
};
const metaLabelStyle: CSSProperties = {
  fontSize:      typography.size.xs,
  fontWeight:    typography.weight.semibold,
  color:         colors.grey,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom:  2,
};
