import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submitDream, fetchMyDreams, fetchDreamDetail, fetchShowcaseFeed, DreamSubmission } from "./api";

export function useMyDreams() {
  return useQuery({ queryKey: ["dreams", "mine"], queryFn: fetchMyDreams });
}

export function useDreamDetail(id: string) {
  return useQuery({ queryKey: ["dreams", id], queryFn: () => fetchDreamDetail(id), enabled: !!id });
}

export function useShowcaseFeed() {
  return useQuery({ queryKey: ["dreams", "feed"], queryFn: fetchShowcaseFeed });
}

export function useSubmitDream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DreamSubmission) => submitDream(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dreams", "mine"] });
    },
  });
}
