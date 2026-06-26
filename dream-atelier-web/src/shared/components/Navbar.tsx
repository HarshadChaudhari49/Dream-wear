import { CSSProperties, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { colors, shadows, spacing, typography, zIndex } from "../tokens";
import { useCart } from "../../features/orders/hooks";
import { useAuth } from "../../contexts/AuthContext";

const NAV_LINKS = [
  { to: "/",           label: "Home"      },
  { to: "/explore",    label: "Explore"   },
  { to: "/dreams",     label: "Dreams"    },
  { to: "/dreams/mine",label: "My Dreams" },
];

export function Navbar() {
  const location             = useLocation();
  const navigate             = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated }  = useAuth();
  const { data: cart }       = useCart({ enabled: isAuthenticated });

  const cartCount  = cart?.reduce((n, item) => n + item.quantity, 0) ?? 0;
  const isLoggedIn = isAuthenticated;

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link to="/" style={logoStyle}>
        <span style={{ color: colors.rose }}>Dream</span>{" "}
        <span style={{ color: colors.ink }}>Atelier</span>
      </Link>

      {/* Desktop links */}
      <ul style={linksStyle}>
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`nav-link${isActive(to) ? " active" : ""}`}
              style={linkStyle(isActive(to))}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div style={actionsStyle}>
        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          style={iconBtnStyle}
          title="Cart"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && <span style={badgeStyle}>{cartCount > 9 ? "9+" : cartCount}</span>}
        </button>

        {/* Profile / Login */}
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/profile")}
            style={{ ...iconBtnStyle, backgroundColor: colors.roseLight }}
            title="Profile"
          >
            <svg width="18" height="18" fill="none" stroke={colors.rose} strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        ) : (
          <Link to="/login" style={loginBtnStyle}>Sign in</Link>
        )}

        {/* Dream CTA */}
        <Link to="/dreams/new" style={dreamBtnStyle}>
          Share a dream
        </Link>

        {/* Mobile hamburger */}
        <button
          style={{ ...iconBtnStyle, display: "none" }}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

/* ─── styles ──────────────────────────────────────────────────── */
const navStyle: CSSProperties = {
  position:       "sticky",
  top:            0,
  zIndex:         zIndex.navbar,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  padding:        `0 ${spacing.xl}`,
  height:         68,
  background:     "rgba(255, 251, 247, 0.88)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderBottom:   `1px solid rgba(232, 221, 217, 0.6)`,
  boxShadow:      shadows.nav,
};

const logoStyle: CSSProperties = {
  fontFamily:  typography.heading,
  fontSize:    typography.size.xl,
  fontWeight:  typography.weight.bold,
  letterSpacing: "0.01em",
  textDecoration: "none",
  flexShrink:  0,
};

const linksStyle: CSSProperties = {
  display:    "flex",
  listStyle:  "none",
  gap:        spacing.xl,
  alignItems: "center",
};

const linkStyle = (active: boolean): CSSProperties => ({
  fontFamily:  typography.body,
  fontSize:    typography.size.md,
  fontWeight:  active ? typography.weight.semibold : typography.weight.medium,
  color:       active ? colors.rose : colors.ink,
  textDecoration: "none",
});

const actionsStyle: CSSProperties = {
  display:    "flex",
  alignItems: "center",
  gap:        spacing.sm,
  flexShrink: 0,
};

const iconBtnStyle: CSSProperties = {
  position:    "relative",
  width:       38,
  height:      38,
  borderRadius: "50%",
  border:      "none",
  background:  colors.cream,
  color:       colors.ink,
  display:     "flex",
  alignItems:  "center",
  justifyContent: "center",
  cursor:      "pointer",
  transition:  "background 0.18s ease",
};

const badgeStyle: CSSProperties = {
  position:       "absolute",
  top:            -4,
  right:          -4,
  background:     colors.rose,
  color:          colors.white,
  borderRadius:   "50%",
  width:          18,
  height:         18,
  fontSize:       10,
  fontWeight:     700,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  lineHeight:     1,
};

const loginBtnStyle: CSSProperties = {
  padding:      `8px ${spacing.md}`,
  borderRadius: "999px",
  border:       `1.5px solid ${colors.border}`,
  color:        colors.ink,
  fontSize:     typography.size.sm,
  fontWeight:   typography.weight.medium,
  textDecoration: "none",
  transition:   "border-color 0.18s ease, color 0.18s ease",
};

const dreamBtnStyle: CSSProperties = {
  padding:      `8px ${spacing.lg}`,
  borderRadius: "999px",
  background:   `linear-gradient(135deg, ${colors.rose} 0%, ${colors.roseDark} 100%)`,
  color:        colors.white,
  fontSize:     typography.size.sm,
  fontWeight:   typography.weight.semibold,
  textDecoration: "none",
  boxShadow:    "0 3px 12px rgba(181,72,90,0.28)",
  transition:   "box-shadow 0.18s ease, transform 0.18s ease",
  whiteSpace:   "nowrap",
};
