/**
 * Brand tokens — kept in manual sync with dream-atelier-web's tokens.ts and
 * with the architecture doc, Section 8.1. There is no shared package between
 * repos (see architecture doc Section 4.3); if you change a value here,
 * change it in the web repo too and note it in your PR.
 */
export const colors = {
  ink: "#2B2530", // primary text, headings
  rose: "#B5485A", // primary accent — buttons, active states
  roseLight: "#F3E1E4", // soft backgrounds, badges
  sage: "#5C6E5A", // secondary accent — gentle/calm UI states
  grey: "#6B6B6B", // secondary text, captions
  white: "#FFFFFF",
  background: "#FFFBFA",
  border: "#E7DEE0",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
};

export const typography = {
  // PRD Section 8.2.1 / architecture doc Section 8.1: dreamer quotes need a
  // warm, slightly handwritten feel — pick an actual font during design,
  // this is a placeholder family name.
  heading: "System",
  body: "System",
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 26,
    xxl: 32,
  },
};
