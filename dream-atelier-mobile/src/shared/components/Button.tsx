import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors, radius, spacing, typography } from "../tokens";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
};

/**
 * Single shared Button. Calm-tone rule (architecture doc Section 8.2)
 * applies to the `label` text you pass in — no shouting copy, no
 * multiple exclamation marks, ever.
 */
export function Button({ label, onPress, variant = "primary", loading, disabled }: ButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.white : colors.rose} />
      ) : (
        <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.rose,
  },
  secondary: {
    backgroundColor: colors.roseLight,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: typography.size.md,
    fontWeight: "600",
  },
  labelPrimary: {
    color: colors.white,
  },
  labelSecondary: {
    color: colors.rose,
  },
});
