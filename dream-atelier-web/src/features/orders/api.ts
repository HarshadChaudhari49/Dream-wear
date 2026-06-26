import { apiClient } from "../../services/apiClient";
import { Product } from "../catalog/api";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  status: string;
  carrier: string;
  tracking_ref: string;
  total_inr: string;
  created_at: string;
};

export async function fetchCart(): Promise<CartItem[]> {
  const { data } = await apiClient.get("/cart/");
  return data.results ?? data;
}

export async function addToCart(productId: string, quantity = 1): Promise<CartItem> {
  const { data } = await apiClient.post("/cart/", { product: productId, quantity });
  return data;
}

export async function removeFromCart(cartItemId: string): Promise<void> {
  await apiClient.delete(`/cart/${cartItemId}/`);
}

export async function updateCartItem(cartItemId: string, quantity: number): Promise<CartItem> {
  const { data } = await apiClient.patch(`/cart/${cartItemId}/`, { quantity });
  return data;
}

export async function checkout(): Promise<Order> {
  const { data } = await apiClient.post("/orders/checkout/");
  return data;
}

export async function fetchOrders(): Promise<Order[]> {
  const { data } = await apiClient.get("/orders/");
  return data.results ?? data;
}
