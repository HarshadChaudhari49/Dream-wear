import { useState, CSSProperties } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { colors, radius, shadows, spacing, typography } from "../../../shared/tokens";
import { useAuth } from "../../../contexts/AuthContext";
import { apiClient } from "../../../services/apiClient";

type Step = "phone" | "otp";

export function LoginPage() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const { login }   = useAuth();
  const from        = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";
  const [step, setStep]      = useState<Step>("phone");
  const [phone, setPhone]    = useState("");
  const [otp, setOtp]        = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]    = useState("");

  async function requestOTP() {
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await apiClient.post("/auth/otp/request/", { phone });
      setStep("otp");
    } catch {
      setError("Couldn't send the OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP() {
    if (otp.length < 4) { setError("Please enter the OTP."); return; }
    setError("");
    setLoading(true);
    try {
      const { data } = await apiClient.post("/auth/otp/verify/", { phone, code: otp });
      localStorage.setItem("dream_atelier_phone", phone);
      login(data.access_token, data.refresh_token);
      navigate(from, { replace: true });
    } catch {
      setError("That code doesn't match. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      {/* Left panel — brand */}
      <div style={leftPanelStyle} className="hero-gradient">
        <div style={{ zIndex: 1, color: colors.white, textAlign: "center", padding: spacing.xl }}>
          <p style={{ fontFamily: typography.heading, fontSize: typography.size["3xl"], marginBottom: spacing.md, lineHeight: 1.2 }}>
            Dream Atelier
          </p>
          <p style={{ fontSize: typography.size.lg, opacity: 0.85, fontStyle: "italic", fontFamily: typography.heading, lineHeight: 1.6 }}>
            "A wardrobe that feels<br />like an extension of who you are."
          </p>
        </div>
        {/* Decorative dots */}
        <div style={dotsStyle} />
      </div>

      {/* Right panel — form */}
      <div style={rightPanelStyle}>
        <div style={formWrapStyle} className="slide-up">
          <Link to="/" style={{ fontSize: typography.size.sm, color: colors.grey, marginBottom: spacing.xl, display: "block" }}>
            ← Back to home
          </Link>

          {step === "phone" ? (
            <>
              <h1 style={headingStyle}>Welcome back</h1>
              <p style={subStyle}>Enter your phone number to sign in or create an account.</p>

              <label style={labelStyle}>Phone number</label>
              <div style={inputWrapStyle}>
                <span style={prefixStyle}>+91</span>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && requestOTP()}
                  style={inputStyle}
                  maxLength={10}
                />
              </div>

              {error && <p style={errorStyle}>{error}</p>}

              <Button
                label="Send OTP"
                fullWidth
                size="lg"
                loading={loading}
                onClick={requestOTP}
                style={{ marginTop: spacing.md }}
              />

              <p style={{ fontSize: typography.size.xs, color: colors.grey, marginTop: spacing.lg, textAlign: "center", lineHeight: 1.6 }}>
                By signing in, you agree to Dream Atelier's terms & privacy policy.
              </p>
            </>
          ) : (
            <>
              <h1 style={headingStyle}>One last step</h1>
              <p style={subStyle}>We sent a code to <strong>{phone}</strong>.</p>

              <label style={labelStyle}>Enter OTP</label>
              <input
                className="form-input"
                type="text"
                placeholder="· · · · · ·"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && verifyOTP()}
                style={{ ...inputStyle, letterSpacing: "0.35em", textAlign: "center", fontSize: typography.size.xl }}
                maxLength={6}
                autoFocus
              />

              {error && <p style={errorStyle}>{error}</p>}

              <Button
                label="Verify & continue"
                fullWidth
                size="lg"
                loading={loading}
                onClick={verifyOTP}
                style={{ marginTop: spacing.md }}
              />

              <button
                onClick={() => { setStep("phone"); setError(""); setOtp(""); }}
                style={{ background: "none", border: "none", color: colors.grey, fontSize: typography.size.sm, cursor: "pointer", marginTop: spacing.md, display: "block", textAlign: "center", width: "100%" }}
              >
                Wrong number? Change it
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  minHeight:   "100vh",
  display:     "flex",
};
const leftPanelStyle: CSSProperties = {
  flex:           "0 0 45%",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  position:       "relative",
  overflow:       "hidden",
};
const dotsStyle: CSSProperties = {
  position:     "absolute",
  inset:        0,
  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
  backgroundSize:  "28px 28px",
};
const rightPanelStyle: CSSProperties = {
  flex:           1,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  padding:        spacing.xl,
  backgroundColor: colors.cream,
};
const formWrapStyle: CSSProperties = {
  width:     "100%",
  maxWidth:  420,
};
const headingStyle: CSSProperties = {
  fontFamily:  typography.heading,
  fontSize:    typography.size.xxl,
  color:       colors.ink,
  marginBottom: spacing.sm,
};
const subStyle: CSSProperties = {
  fontSize:    typography.size.md,
  color:       colors.grey,
  marginBottom: spacing.xl,
  lineHeight:  1.6,
};
const labelStyle: CSSProperties = {
  fontSize:    typography.size.sm,
  fontWeight:  typography.weight.semibold,
  color:       colors.ink,
  display:     "block",
  marginBottom: spacing.sm,
};
const inputWrapStyle: CSSProperties = {
  display:     "flex",
  alignItems:  "center",
  border:      `1.5px solid ${colors.border}`,
  borderRadius: radius.md,
  overflow:    "hidden",
  transition:  "border-color 0.2s ease",
  boxShadow:   shadows.xs,
};
const prefixStyle: CSSProperties = {
  padding:         `0 ${spacing.md}`,
  background:      colors.sand,
  color:           colors.grey,
  fontSize:        typography.size.md,
  height:          "100%",
  display:         "flex",
  alignItems:      "center",
  borderRight:     `1px solid ${colors.border}`,
  fontWeight:      typography.weight.medium,
  whiteSpace:      "nowrap",
};
const inputStyle: CSSProperties = {
  flex:        1,
  border:      "none",
  padding:     spacing.md,
  fontSize:    typography.size.md,
  color:       colors.ink,
  background:  "transparent",
  outline:     "none",
};
const errorStyle: CSSProperties = {
  fontSize:    typography.size.sm,
  color:       colors.error,
  marginTop:   spacing.sm,
};
