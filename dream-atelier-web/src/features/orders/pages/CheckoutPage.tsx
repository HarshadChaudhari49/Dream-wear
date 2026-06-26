import { useState, CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography, maxWidth } from "../../../shared/tokens";
import { useCart, useCheckout } from "../hooks";

function formatINR(val: string | number) {
  return `₹${Number(val).toLocaleString("en-IN")}`;
}

type AddressForm = {
  full_name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY: AddressForm = { full_name: "", phone: "", line1: "", city: "", state: "", pincode: "", line2: "" };

export function CheckoutPage() {
  const navigate    = useNavigate();
  const { data: cartItems } = useCart();
  const checkout    = useCheckout();
  const [form, setForm] = useState<AddressForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<AddressForm>>({});
  const [success, setSuccess] = useState(false);

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + parseFloat(item.product.price_inr) * item.quantity, 0,
  ) ?? 0;

  function set(k: keyof AddressForm, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<AddressForm> = {};
    if (!form.full_name.trim()) e.full_name = "Required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number";
    if (!form.line1.trim()) e.line1 = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePlace() {
    if (!validate()) return;
    await checkout.mutateAsync();
    setSuccess(true);
  }

  if (success) return <SuccessState onViewOrders={() => navigate("/orders")} />;

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: `0 ${spacing.xl}` }}>
          <Link to="/cart" style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.6)", display: "inline-block", marginBottom: spacing.md }}>← Back to cart</Link>
          <h1 style={{ fontFamily: typography.heading, fontSize: typography.size.xxl, color: colors.white }}>Checkout</h1>
        </div>
      </div>

      <div style={{ maxWidth: maxWidth.content, margin: "0 auto", padding: spacing.xl, display: "grid", gridTemplateColumns: "1fr 360px", gap: spacing.xxl, alignItems: "start" }}>

        {/* Address form */}
        <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.xl }} className="fade-in">
          <h2 style={{ fontFamily: typography.heading, fontSize: typography.size.xl, color: colors.ink, marginBottom: spacing.xl }}>Delivery address</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg }}>
            <FormField label="Full name" value={form.full_name} onChange={(v) => set("full_name", v)} error={errors.full_name} placeholder="Priya Sharma" />
            <FormField label="Phone number" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} placeholder="98765 43210" type="tel" />
          </div>

          <FormField label="Address line 1" value={form.line1} onChange={(v) => set("line1", v)} error={errors.line1} placeholder="House / flat no., building name, street" />
          <FormField label="Address line 2" value={form.line2} onChange={(v) => set("line2", v)} error={errors.line2} placeholder="Area, locality (optional)" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", gap: spacing.lg }}>
            <FormField label="City" value={form.city} onChange={(v) => set("city", v)} error={errors.city} placeholder="Mumbai" />
            <FormField label="State" value={form.state} onChange={(v) => set("state", v)} error={errors.state} placeholder="Maharashtra" />
            <FormField label="Pincode" value={form.pincode} onChange={(v) => set("pincode", v)} error={errors.pincode} placeholder="400001" type="tel" />
          </div>

          <p style={{ fontSize: typography.size.xs, color: colors.grey, marginTop: spacing.lg, lineHeight: 1.6 }}>
            Your address is saved securely and used only for delivery. We never share it.
          </p>
        </div>

        {/* Order summary sidebar */}
        <div style={{ position: "sticky", top: 88 }}>
          <div style={{ background: colors.white, borderRadius: radius.xl, boxShadow: shadows.card, border: `1px solid ${colors.border}`, padding: spacing.xl }}>
            <h3 style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.ink, marginBottom: spacing.lg }}>Order summary</h3>

            {/* Items */}
            <div style={{ marginBottom: spacing.lg }}>
              {cartItems?.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `${spacing.xs} 0`, borderBottom: `1px solid ${colors.border}` }}>
                  <div>
                    <p style={{ fontSize: typography.size.sm, color: colors.ink, fontWeight: typography.weight.medium }}>{item.product.title}</p>
                    <p style={{ fontSize: typography.size.xs, color: colors.grey }}>Qty: {item.quantity}</p>
                  </div>
                  <p style={{ fontSize: typography.size.sm, color: colors.ink }}>{formatINR(parseFloat(item.product.price_inr) * item.quantity)}</p>
                </div>
              ))}
            </div>

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

            <Button
              label="Place order"
              fullWidth
              size="lg"
              loading={checkout.isPending}
              onClick={handlePlace}
            />
            <p style={{ fontSize: typography.size.xs, color: colors.grey, textAlign: "center", marginTop: spacing.md }}>
              Secure payment via Razorpay — coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, error, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: spacing.lg }}>
      <label style={{ display: "block", fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.ink, marginBottom: spacing.xs, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: spacing.md,
          borderRadius: radius.md,
          border: `1.5px solid ${error ? colors.error : focused ? colors.rose : colors.border}`,
          boxShadow: focused ? `0 0 0 3px rgba(181,72,90,0.08)` : "none",
          fontSize: typography.size.sm,
          color: colors.ink,
          outline: "none",
          background: colors.white,
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
      />
      {error && <p style={{ fontSize: typography.size.xs, color: colors.error, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function SuccessState({ onViewOrders }: { onViewOrders: () => void }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: colors.background }}>
      <div style={{ maxWidth: 480, textAlign: "center", padding: spacing.xl }} className="scale-in">
        <p style={{ fontSize: 72, marginBottom: spacing.xl }}>✨</p>
        <p style={{ fontFamily: typography.handwritten, fontSize: typography.size.xl, color: colors.rose, marginBottom: spacing.md }}>
          It's on its way.
        </p>
        <h1 style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], color: colors.ink, marginBottom: spacing.lg, lineHeight: 1.2 }}>
          Your order is confirmed.
        </h1>
        <p style={{ fontSize: typography.size.md, color: colors.grey, lineHeight: 1.7, marginBottom: spacing.xxl }}>
          We'll send you updates as your pieces are packed and shipped. Every order is handled with care.
        </p>
        <div style={{ display: "flex", gap: spacing.md, justifyContent: "center" }}>
          <Button label="View my orders" size="lg" onClick={onViewOrders} />
          <Link to="/explore">
            <Button label="Keep exploring" variant="ghost" size="lg" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const headerStyle: CSSProperties = {
  background:   `linear-gradient(135deg, ${colors.ink} 0%, #3D1E2A 100%)`,
  padding:      `${spacing["3xl"]} ${spacing.xl} ${spacing.xxl}`,
  marginBottom: spacing.xl,
};
