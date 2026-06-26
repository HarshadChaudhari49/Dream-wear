import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBanners, fetchProducts, fetchProductDetail, saveProduct, loveProduct } from "./api";

export function useBanners() {
  return useQuery({ queryKey: ["banners"], queryFn: fetchBanners });
}

export function useProducts(params?: { category?: string; mood?: string; ordering?: string; search?: string }) {
  return useQuery({ queryKey: ["products", params], queryFn: () => fetchProducts(params) });
}

export function useProductDetail(id: string) {
  return useQuery({ queryKey: ["products", id], queryFn: () => fetchProductDetail(id), enabled: !!id });
}

export function useSaveProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => saveProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useLoveProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => loveProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
