import { useQuery } from "@tanstack/react-query";
import { fetchWardrobe, fetchWishlist } from "./api";

export function useWardrobe() {
  return useQuery({ queryKey: ["wardrobe"], queryFn: fetchWardrobe });
}

export function useWishlist() {
  return useQuery({ queryKey: ["wishlist"], queryFn: fetchWishlist });
}
