import { HTMLAttributes } from "react";
import { colors, radius, shadows, spacing } from "../tokens";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
  flush?: boolean;
};

export function Card({ style, children, hoverable = false, flush = false, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`${hoverable ? "hover-lift" : ""} ${className}`}
      style={{
        backgroundColor: colors.white,
        borderRadius:    radius.lg,
        border:          `1px solid ${colors.border}`,
        boxShadow:       shadows.card,
        padding:         flush ? 0 : spacing.md,
        overflow:        "hidden",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
