import { FlatList, View, Text, StyleSheet } from "react-native";
import { Card } from "../../../shared/components/Card";
import { Button } from "../../../shared/components/Button";
import { colors, spacing, typography } from "../../../shared/tokens";
import { useMyDreams } from "../hooks";
import { DreamListItem } from "../api";

const STATUS_COPY: Record<string, string> = {
  submitted: "We've got your dream!",
  in_review: "Someone's reading your dream...",
  in_progress: "It's coming to life",
  delivered_to_dreamer: "It's on its way to you",
  live: "Live — others can see it now",
  declined_paused: "Paused for now",
};

/**
 * PRD Module 4 — "My Dreams". Empty state copy is a direct PRD quote:
 * "Your dreams will live here. Share your first one?" — don't reword it.
 */
export function MyDreamsScreen({ navigation }: any) {
  const { data, isLoading } = useMyDreams();

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DreamRow dream={item} onPress={() => navigation.navigate("DreamDetail", { id: item.id })} />}
      ListEmptyComponent={
        !isLoading ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Your dreams will live here. Share your first one?</Text>
            <Button label="Share a dream" onPress={() => navigation.navigate("DreamInput")} />
          </View>
        ) : null
      }
    />
  );
}

function DreamRow({ dream, onPress }: { dream: DreamListItem; onPress: () => void }) {
  return (
    <Card style={styles.row} onTouchEnd={onPress}>
      <Text style={styles.firstLine}>{dream.first_line}</Text>
      <Text style={styles.status}>{STATUS_COPY[dream.status] ?? dream.status}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.sm },
  row: { marginBottom: spacing.sm },
  firstLine: { fontSize: typography.size.md, color: colors.ink, marginBottom: spacing.xs },
  status: { fontSize: typography.size.sm, color: colors.sage },
  empty: { padding: spacing.xl, alignItems: "center", gap: spacing.md },
  emptyText: { color: colors.grey, fontSize: typography.size.md, textAlign: "center" },
});
