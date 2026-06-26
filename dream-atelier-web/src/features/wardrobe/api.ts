import { apiClient } from "../../services/apiClient";
import { Product } from "../catalog/api";

export type WardrobeItem = {
  product: Product;
  dream_origin_text: string | null;
};

export type SavedItem = {
  id: string;
  product: Product;
  created_at: string;
};

export async function fetchWardrobe(): Promise<WardrobeItem[]> {
  const { data } = await apiClient.get("/me/wardrobe/");
  return data.results ?? data;
}

export async function fetchWishlist(): Promise<SavedItem[]> {
  const { data } = await apiClient.get("/me/wishlist/");
  return data.results ?? data;
}
