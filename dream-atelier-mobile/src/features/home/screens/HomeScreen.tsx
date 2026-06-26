import { ScrollView, View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { Card } from "../../../shared/components/Card";
import { colors, spacing, radius, typography } from "../../../shared/tokens";
import { useBanners, useProducts } from "../hooks";
import { Product } from "../api";

/**
 * PRD Module 1 — Home Dashboard. Trending Now is intentionally not built
 * here: PRD flags it explicitly as "planned for the next version" pending
 * the threshold decision in PRD Open Decision #3.
 */
export function HomeScreen({ navigation }: any) {
  const { data: banners } = useBanners();
  const { data: newArrivals } = useProducts({ ordering: "-published_at" });

  return (
    <ScrollView style={styles.screen}>
      {banners?.[0] && (
        <Image source={{ uri: banners[0].image_url }} style={styles.banner} resizeMode="cover" />
      )}

      <View style={styles.categoryRow}>
        <Pressable
          style={styles.categoryCard}
          onPress={() => navigation.navigate("Explore", { category: "kurti" })}
        >
          <Text style={styles.categoryLabel}>Kurtis</Text>
        </Pressable>
        <Pressable
          style={styles.categoryCard}
          onPress={() => navigation.navigate("Explore", { category: "top" })}
        >
          <Text style={styles.categoryLabel}>Tops</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>New arrivals</Text>
      <FlatList
        horizontal
        data={newArrivals?.slice(0, 10)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.arrivalsRow}
        renderItem={({ item }) => <ProductTile product={item} />}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>All pieces</Text>
      <View style={styles.grid}>
        {newArrivals?.map((p) => <ProductTile key={p.id} product={p} wide />)}
      </View>
    </ScrollView>
  );
}

function ProductTile({ product, wide }: { product: Product; wide?: boolean }) {
  return (
    <Card style={[styles.tile, wide && styles.tileWide]}>
      <Image source={{ uri: product.display_photo_url }} style={styles.tileImage} resizeMode="cover" />
      <Text style={styles.tileTitle}>{product.title}</Text>
      <Text style={styles.tilePrice}>₹{product.price_inr}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  banner: { width: "100%", height: 180 },
  categoryRow: { flexDirection: "row", gap: spacing.md, padding: spacing.md },
  categoryCard: {
    flex: 1,
    backgroundColor: colors.roseLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
  },
  categoryLabel: { fontSize: typography.size.lg, fontWeight: "700", color: colors.rose },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: "700",
    color: colors.ink,
    marginLeft: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  arrivalsRow: { paddingHorizontal: spacing.md, gap: spacing.md },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: spacing.md, gap: spacing.md },
  tile: { width: 160, padding: spacing.sm },
  tileWide: { width: "47%" },
  tileImage: { width: "100%", height: 180, borderRadius: radius.md, marginBottom: spacing.sm },
  tileTitle: { fontSize: typography.size.sm, color: colors.ink, fontWeight: "600" },
  tilePrice: { fontSize: typography.size.sm, color: colors.grey },
});
