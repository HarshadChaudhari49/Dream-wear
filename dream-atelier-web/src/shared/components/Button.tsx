import { ButtonHTMLAttributes, CSSProperties } from "react";
import { colors, radius, shadows, spacing, transitions, typography } from "../tokens";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size    = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
};

const BASE: CSSProperties = {
  display:        "inline-flex",
  alignItems:     "center",
  justifyContent: "center",
  gap:            "8px",
  border:         "none",
  borderRadius:   radius.md,
  fontFamily:     typography.body,
  fontWeight:     typography.weight.semibold,
  cursor:         "pointer",
  transition:     `all ${transitions.normal}`,
  letterSpacing:  "0.01em",
  whiteSpace:     "nowrap",
};

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: {
    background:   `linear-gradient(135deg, ${colors.rose} 0%, ${colors.roseDark} 100%)`,
    color:        colors.white,
    boxShadow:    shadows.btn,
  },
  secondary: {
    background:   colors.roseLight,
    color:        colors.rose,
  },
  ghost: {
    background:   "transparent",
    color:        colors.ink,
    border:       `1px solid ${colors.border}`,
  },
  outline: {
    background:   "transparent",
    color:        colors.rose,
    border:       `1.5px solid ${colors.rose}`,
  },
  danger: {
    background:   colors.error,
    color:        colors.white,
  },
};

const SIZES: Record<Size, CSSProperties> = {
  sm: { padding: `${spacing.sm} ${spacing.md}`,  fontSize: typography.size.sm },
  md: { padding: `${spacing.md} ${spacing.lg}`,  fontSize: typography.size.md },
  lg: { padding: `14px ${spacing.xl}`,            fontSize: typography.size.lg },
};

export function Button({
  label, variant = "primary", size = "md", loading, disabled,
  icon, fullWidth, style, ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      style={{
        ...BASE,
        ...VARIANTS[variant],
        ...SIZES[size],
        width:   fullWidth ? "100%" : undefined,
        opacity: isDisabled ? 0.55 : 1,
        cursor:  isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <span style={{ display: "inline-flex", gap: 4 }}>
          <span style={dotStyle(0)} />
          <span style={dotStyle(0.15)} />
          <span style={dotStyle(0.3)} />
        </span>
      ) : (
        <>
          {icon && <span style={{ fontSize: "1.1em", lineHeight: 1 }}>{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
}

function dotStyle(delay: number): CSSProperties {
  return {
    width:    6, height: 6,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    display:  "inline-block",
    animation: `pulse 1s ${delay}s ease infinite`,
  };
}
