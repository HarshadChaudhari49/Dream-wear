import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "../../../shared/components/Card";
import { colors, spacing, radius, typography } from "../../../shared/tokens";
import { useShowcaseFeed } from "../hooks";
import { DreamDetail } from "../api";

/**
 * PRD Module 3, Part 2 — "Where Vision Becomes Real". This is the product's
 * primary trust mechanism (see PRD Section 8.3 / architecture doc Section
 * 6): real photo + her own words, exactly as written. Don't truncate or
 * rephrase free_text here.
 */
export function ShowcaseFeedScreen() {
  const { data, isLoading } = useShowcaseFeed();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.rose} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ShowcaseCard dream={item} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>The first dreams are still being made.</Text>
        </View>
      }
    />
  );
}

function ShowcaseCard({ dream }: { dream: DreamDetail }) {
  const photo = dream.stages?.[dream.stages.length - 1]?.photo_url;
  return (
    <Card style={styles.card}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} resizeMode="cover" />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder]} />
      )}
      <Text style={styles.quote}>&ldquo;{dream.free_text}&rdquo;</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.md },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background },
  card: { marginBottom: spacing.md, padding: 0, overflow: "hidden" },
  photo: { width: "100%", height: 280, borderRadius: radius.lg },
  photoPlaceholder: { backgroundColor: colors.roseLight },
  quote: {
    padding: spacing.md,
    fontSize: typography.size.md,
    color: colors.ink,
    fontStyle: "italic",
    lineHeight: 22,
  },
  empty: { padding: spacing.xl, alignItems: "center" },
  emptyText: { color: colors.grey, fontSize: typography.size.md, textAlign: "center" },
});
