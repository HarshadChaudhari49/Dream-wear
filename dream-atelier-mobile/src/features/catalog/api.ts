import { apiClient } from "../../services/apiClient";

export type Product = {
  id: string;
  title: string;
  category: string;
  mood_tags: string[];
  price_inr: string;
  display_photo_url: string;
  save_count: number;
  love_count: number;
  published_at: string;
};

export type Banner = {
  id: string;
  image_url: string;
  headline: string;
  deep_link: string;
};

export async function fetchBanners(): Promise<Banner[]> {
  const { data } = await apiClient.get("/banners/");
  return data.results ?? data;
}

export async function fetchProducts(params?: { category?: string; ordering?: string; search?: string }): Promise<Product[]> {
  const { data } = await apiClient.get("/products/", { params });
  return data.results ?? data;
}

export async function fetchProductDetail(id: string): Promise<Product> {
  const { data } = await apiClient.get(`/products/${id}/`);
  return data;
}

export async function saveProduct(id: string): Promise<{ save_count: number }> {
  const { data } = await apiClient.post(`/products/${id}/save/`);
  return data;
}
