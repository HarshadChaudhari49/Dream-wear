/**
 * Brand tokens — kept in manual sync with dream-atelier-mobile's tokens.ts
 * and with the architecture doc Section 8.1. If you change a value here,
 * change it in the mobile repo too.
 */
export const colors = {
  // Core brand
  ink:        "#2B2530",
  rose:       "#B5485A",
  roseDark:   "#8B2E42",
  roseLight:  "#F3E1E4",
  rosePale:   "#FDF0F2",
  sage:       "#5C6E5A",
  sageDark:   "#3D4F3B",
  sageLight:  "#EAF0E9",
  gold:       "#C9A86C",
  // Neutral
  white:      "#FFFFFF",
  cream:      "#FFFBF7",
  sand:       "#F8F2EC",
  border:     "#E8DDD9",
  borderFocus:"#B5485A",
  grey:       "#6B6B6B",
  greyLight:  "#C4BAB8",
  // Utility
  success:    "#3D8B6A",
  error:      "#C0392B",
  warning:    "#D4891A",
  info:       "#2C7CB0",
  // Background
  background: "#FFFBF7",
  surface:    "#FFFFFF",
  overlay:    "rgba(43, 37, 48, 0.48)",
};

export const spacing = {
  xs:  "4px",
  sm:  "8px",
  md:  "16px",
  lg:  "24px",
  xl:  "32px",
  xxl: "48px",
  "3xl":"64px",
  "4xl":"96px",
};

export const radius = {
  xs:   "6px",
  sm:   "10px",
  md:   "14px",
  lg:   "22px",
  xl:   "32px",
  pill: "999px",
};

export const typography = {
  heading:     "'Playfair Display', Georgia, 'Times New Roman', serif",
  body:        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  handwritten: "'Dancing Script', cursive",
  size: {
    xs:  "11px",
    sm:  "13px",
    md:  "15px",
    lg:  "18px",
    xl:  "24px",
    xxl: "32px",
    "3xl": "42px",
    "4xl": "56px",
  },
  weight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  lineHeight: {
    tight:  1.25,
    normal: 1.55,
    loose:  1.75,
  },
};

export const shadows = {
  xs:      "0 1px 4px rgba(43, 37, 48, 0.06)",
  sm:      "0 2px 10px rgba(43, 37, 48, 0.07)",
  md:      "0 4px 20px rgba(43, 37, 48, 0.09)",
  lg:      "0 8px 32px rgba(43, 37, 48, 0.12)",
  xl:      "0 16px 56px rgba(43, 37, 48, 0.16)",
  card:    "0 2px 16px rgba(43, 37, 48, 0.07)",
  cardHov: "0 10px 36px rgba(43, 37, 48, 0.14)",
  nav:     "0 2px 24px rgba(43, 37, 48, 0.09)",
  btn:     "0 4px 14px rgba(181, 72, 90, 0.32)",
  btnHov:  "0 6px 20px rgba(181, 72, 90, 0.42)",
};

export const transitions = {
  fast:   "0.15s ease",
  normal: "0.22s ease",
  slow:   "0.35s ease",
};

export const zIndex = {
  base:    0,
  card:    10,
  sticky:  100,
  navbar:  110,
  modal:   200,
  toast:   300,
};

export const maxWidth = {
  content: "1120px",
  narrow:  "680px",
  wide:    "1320px",
};
