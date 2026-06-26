import { View, StyleSheet, ViewProps } from "react-native";
import { colors, radius, spacing } from "../tokens";

/**
 * Plain content container used across feature screens — product cards,
 * showcase cards, dream cards all wrap their content in this rather than
 * each defining their own card chrome.
 */
export function Card({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
});
