import { CSSProperties, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { colors, radius, spacing, typography, zIndex } from "../tokens";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../features/orders/hooks";

const SIDEBAR_OPEN  = 220;
const SIDEBAR_CLOSED = 64;

const NAV_ITEMS = [
  {
    to: "/", label: "Home", exact: true, auth: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: "/explore", label: "Explore", auth: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    to: "/dreams", label: "Dream Showcase", auth: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    to: "/dreams/mine", label: "My Dreams", auth: true,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    to: "/cart", label: "Cart", auth: true, showBadge: true,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    to: "/orders", label: "Orders", auth: true,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    to: "/profile", label: "Profile", auth: true,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const [open, setOpen]    = useState(true);
  const location           = useLocation();
  const navigate           = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { data: cart }     = useCart({ enabled: isAuthenticated });

  const cartCount = cart?.reduce((n, item) => n + item.quantity, 0) ?? 0;
  const phone     = localStorage.getItem("dream_atelier_phone") ?? "";

  function isActive(to: string, exact = false) {
    if (exact || to === "/") return location.pathname === to;
    return location.pathname.startsWith(to);
  }

  return (
    <aside style={sidebarStyle(open)}>
      {/* ── Top: logo + toggle ── */}
      <div style={topSectionStyle(open)}>
        {open && (
          <Link to="/" style={{ textDecoration: "none", overflow: "hidden" }}>
            <div style={{ whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: colors.rose, fontWeight: typography.weight.bold }}>Dream</span>
              <span style={{ fontFamily: typography.heading, fontSize: typography.size.lg, color: "rgba(255,255,255,0.9)", fontWeight: typography.weight.regular }}> Atelier</span>
            </div>
            <p style={{ fontSize: typography.size.xs, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3, whiteSpace: "nowrap" }}>
              Women's clothing
            </p>
          </Link>
        )}

        <button onClick={() => setOpen(!open)} style={toggleBtnStyle(open)} title={open ? "Collapse sidebar" : "Expand sidebar"}>
          {open ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, padding: `${spacing.sm} 0`, overflowY: "auto", overflowX: "hidden" }}>
        {NAV_ITEMS.filter((item) => !item.auth || isAuthenticated).map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <Link key={item.to} to={item.to} style={navItemStyle(active, open)} title={!open ? item.label : undefined}>
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0, opacity: active ? 1 : 0.55, position: "relative" }}>
                {item.icon}
                {"showBadge" in item && cartCount > 0 && !open && (
                  <span style={dotBadgeStyle} />
                )}
              </span>
              {open && (
                <>
                  <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden" }}>{item.label}</span>
                  {"showBadge" in item && cartCount > 0 && (
                    <span style={badgeStyle}>{cartCount > 9 ? "9+" : cartCount}</span>
                  )}
                </>
              )}
            </Link>
          );
        })}

        {!isAuthenticated && (
          <Link to="/login" style={navItemStyle(false, open)} title={!open ? "Sign in" : undefined}>
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0, opacity: 0.55 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            </span>
            {open && <span style={{ whiteSpace: "nowrap" }}>Sign in</span>}
          </Link>
        )}

        {/* Dream CTA */}
        {open ? (
          <div style={{ padding: `${spacing.xl} ${spacing.md} ${spacing.md}` }}>
            <Link to="/dreams/new" style={dreamCtaOpenStyle}>
              <span>✦</span> Share a dream
            </Link>
          </div>
        ) : (
          <Link to="/dreams/new" style={dreamCtaClosedStyle} title="Share a dream">
            ✦
          </Link>
        )}
      </nav>

      {/* ── Bottom user ── */}
      {isAuthenticated && (
        <div style={userSectionStyle(open)}>
          <div style={avatarStyle}>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors.white }}>{phone ? phone.slice(-2) : "✦"}</span>
          </div>
          {open && (
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <p style={{ fontSize: typography.size.sm, color: "rgba(255,255,255,0.85)", fontWeight: typography.weight.medium, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {phone ? `+91 ${phone}` : "Dreamer"}
              </p>
              <button onClick={() => { logout(); navigate("/login"); }} style={logoutBtnStyle}>
                Logout
              </button>
            </div>
          )}
          {!open && (
            <button
              onClick={() => { logout(); navigate("/login"); }}
              style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
            />
          )}
        </div>
      )}
    </aside>
  );
}

/* ── dynamic styles ────────────────────────────────────────────── */
function sidebarStyle(open: boolean): CSSProperties {
  return {
    width:          open ? SIDEBAR_OPEN : SIDEBAR_CLOSED,
    height:         "100vh",
    position:       "sticky",
    top:            0,
    flexShrink:     0,
    background:     colors.ink,
    display:        "flex",
    flexDirection:  "column",
    zIndex:         zIndex.navbar,
    overflowY:      "auto",
    overflowX:      "hidden",
    transition:     "width 0.25s ease",
  };
}

function topSectionStyle(open: boolean): CSSProperties {
  return {
    display:        "flex",
    alignItems:     "center",
    justifyContent: open ? "space-between" : "center",
    padding:        open ? `${spacing.xl} ${spacing.lg} ${spacing.lg}` : `${spacing.xl} 0 ${spacing.lg}`,
    borderBottom:   "1px solid rgba(255,255,255,0.07)",
    flexShrink:     0,
    gap:            spacing.sm,
  };
}

function navItemStyle(active: boolean, open: boolean): CSSProperties {
  return {
    display:        "flex",
    alignItems:     "center",
    justifyContent: open ? "flex-start" : "center",
    gap:            open ? spacing.md : 0,
    padding:        open ? `11px ${spacing.lg}` : "12px 0",
    margin:         open ? `1px ${spacing.sm}` : `1px ${spacing.xs}`,
    borderRadius:   radius.md,
    textDecoration: "none",
    fontSize:       typography.size.sm,
    fontWeight:     active ? typography.weight.semibold : typography.weight.regular,
    color:          active ? colors.white : "rgba(255,255,255,0.55)",
    background:     active ? "rgba(181,72,90,0.2)" : "transparent",
    borderLeft:     open ? `3px solid ${active ? colors.rose : "transparent"}` : "none",
    transition:     "all 0.15s ease",
    overflow:       "hidden",
  };
}

function userSectionStyle(open: boolean): CSSProperties {
  return {
    display:        "flex",
    alignItems:     "center",
    justifyContent: open ? "flex-start" : "center",
    gap:            open ? spacing.md : 0,
    padding:        open ? spacing.lg : `${spacing.md} 0`,
    borderTop:      "1px solid rgba(255,255,255,0.07)",
    flexShrink:     0,
  };
}

/* ── static styles ────────────────────────────────────────────── */
const toggleBtnStyle = (open: boolean): CSSProperties => ({
  background:  "none",
  border:      "none",
  color:       "rgba(255,255,255,0.55)",
  cursor:      "pointer",
  display:     "flex",
  alignItems:  "center",
  justifyContent: "center",
  padding:     6,
  borderRadius: radius.sm,
  flexShrink:  0,
  transition:  "color 0.15s ease, background 0.15s ease",
  marginLeft:  open ? 0 : "auto",
  marginRight: open ? 0 : "auto",
});

const badgeStyle: CSSProperties = {
  background:   colors.rose,
  color:        colors.white,
  borderRadius: "99px",
  fontSize:     10,
  fontWeight:   700,
  padding:      "1px 7px",
  minWidth:     18,
  textAlign:    "center",
  flexShrink:   0,
};

const dotBadgeStyle: CSSProperties = {
  position:     "absolute",
  top:          -3,
  right:        -3,
  width:        8,
  height:       8,
  borderRadius: "50%",
  background:   colors.rose,
  border:       `2px solid ${colors.ink}`,
};

const dreamCtaOpenStyle: CSSProperties = {
  display:        "flex",
  alignItems:     "center",
  gap:            spacing.sm,
  width:          "100%",
  padding:        `10px ${spacing.md}`,
  borderRadius:   radius.md,
  background:     `linear-gradient(135deg, ${colors.rose} 0%, ${colors.roseDark} 100%)`,
  color:          colors.white,
  fontSize:       typography.size.sm,
  fontWeight:     typography.weight.semibold,
  textDecoration: "none",
  justifyContent: "center",
  boxShadow:      "0 4px 14px rgba(181,72,90,0.35)",
};

const dreamCtaClosedStyle: CSSProperties = {
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  margin:         `${spacing.md} auto`,
  width:          40,
  height:         40,
  borderRadius:   "50%",
  background:     `linear-gradient(135deg, ${colors.rose} 0%, ${colors.roseDark} 100%)`,
  color:          colors.white,
  fontSize:       16,
  textDecoration: "none",
  boxShadow:      "0 4px 14px rgba(181,72,90,0.35)",
};

const avatarStyle: CSSProperties = {
  width:          36,
  height:         36,
  borderRadius:   "50%",
  background:     `linear-gradient(135deg, ${colors.rose}, ${colors.roseDark})`,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  flexShrink:     0,
};

const logoutBtnStyle: CSSProperties = {
  background: "none",
  border:     "none",
  color:      "rgba(181,72,90,0.8)",
  fontSize:   typography.size.xs,
  cursor:     "pointer",
  padding:    0,
  marginTop:  2,
  display:    "block",
};
