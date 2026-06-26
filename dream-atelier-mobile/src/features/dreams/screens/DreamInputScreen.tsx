import { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from "react-native";
import { Button } from "../../../shared/components/Button";
import { colors, spacing, radius, typography } from "../../../shared/tokens";
import { useSubmitDream } from "../hooks";
import { MoodTag, OccasionTag } from "../api";

const MOOD_OPTIONS: { value: MoodTag; label: string }[] = [
  { value: "soft", label: "Soft" },
  { value: "bold", label: "Bold" },
  { value: "classic", label: "Classic" },
  { value: "edgy", label: "Edgy" },
  { value: "romantic", label: "Romantic" },
  { value: "minimal", label: "Minimal" },
];

const OCCASION_OPTIONS: { value: OccasionTag; label: string }[] = [
  { value: "everyday", label: "Everyday" },
  { value: "celebration", label: "Celebration" },
  { value: "travel", label: "Travel" },
  { value: "just_for_me", label: "Just for me" },
];

/**
 * PRD Module 3, Part 1 — "Tell Us Your Vision". This screen must feel like
 * journaling, not filling a form: no required-field asterisks, no rigid
 * step wizard, no progress bar. Mood tags and occasion are genuinely
 * optional, including at the UI level — don't add validation that blocks
 * submission without them.
 */
export function DreamInputScreen({ navigation }: any) {
  const [freeText, setFreeText] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<MoodTag[]>([]);
  const [occasion, setOccasion] = useState<OccasionTag | undefined>(undefined);
  const [feeling, setFeeling] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitDream = useSubmitDream();

  function toggleMood(tag: MoodTag) {
    setSelectedMoods((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit() {
    if (!freeText.trim()) return;
    await submitDream.mutateAsync({
      free_text: freeText,
      mood_tags: selectedMoods,
      occasion_tag: occasion,
      feeling_prompt: feeling || undefined,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <View style={styles.confirmWrap}>
        <Text style={styles.confirmTitle}>Your dream is in our hands</Text>
        <Text style={styles.confirmBody}>
          We've got it, just as you wrote it. We'll let you know the moment someone
          starts bringing it to life.
        </Text>
        <Button label="See your dreams" onPress={() => navigation.navigate("MyDreams")} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Tell us your vision</Text>
      <Text style={styles.subtitle}>Describe your dream outfit. No detail is too small.</Text>

      <TextInput
        style={styles.journalInput}
        multiline
        placeholder="I keep imagining something soft, with sleeves that move when I walk..."
        placeholderTextColor={colors.grey}
        value={freeText}
        onChangeText={setFreeText}
        textAlignVertical="top"
      />

      <Text style={styles.sectionLabel}>What's the mood? (optional)</Text>
      <View style={styles.chipRow}>
        {MOOD_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => toggleMood(opt.value)}
            style={[styles.chip, selectedMoods.includes(opt.value) && styles.chipSelected]}
          >
            <Text style={[styles.chipText, selectedMoods.includes(opt.value) && styles.chipTextSelected]}>
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>What's it for? (optional)</Text>
      <View style={styles.chipRow}>
        {OCCASION_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => setOccasion(occasion === opt.value ? undefined : opt.value)}
            style={[styles.chip, occasion === opt.value && styles.chipSelected]}
          >
            <Text style={[styles.chipText, occasion === opt.value && styles.chipTextSelected]}>
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>What feeling do you want this outfit to give you?</Text>
      <TextInput
        style={styles.feelingInput}
        placeholder="Optional, but we'd love to know"
        placeholderTextColor={colors.grey}
        value={feeling}
        onChangeText={setFeeling}
      />

      <Button
        label="Share this dream"
        onPress={handleSubmit}
        loading={submitDream.isPending}
        disabled={!freeText.trim()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { fontSize: typography.size.xxl, fontWeight: "700", color: colors.ink, marginBottom: spacing.xs },
  subtitle: { fontSize: typography.size.md, color: colors.grey, marginBottom: spacing.lg },
  journalInput: {
    minHeight: 140,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: typography.size.md,
    color: colors.ink,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: typography.size.sm,
    color: colors.grey,
    marginBottom: spacing.sm,
    fontWeight: "600",
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  chipSelected: { backgroundColor: colors.roseLight, borderColor: colors.rose },
  chipText: { color: colors.ink, fontSize: typography.size.sm },
  chipTextSelected: { color: colors.rose, fontWeight: "600" },
  feelingInput: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: typography.size.md,
    color: colors.ink,
    marginBottom: spacing.xl,
  },
  confirmWrap: { flex: 1, justifyContent: "center", padding: spacing.xl, gap: spacing.md, backgroundColor: colors.background },
  confirmTitle: { fontSize: typography.size.xl, fontWeight: "700", color: colors.ink, textAlign: "center" },
  confirmBody: { fontSize: typography.size.md, color: colors.grey, textAlign: "center", marginBottom: spacing.md },
});
