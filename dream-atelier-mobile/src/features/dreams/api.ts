import { apiClient } from "../../services/apiClient";

export type MoodTag = "soft" | "bold" | "classic" | "edgy" | "romantic" | "minimal";
export type OccasionTag = "everyday" | "celebration" | "travel" | "just_for_me";

export type DreamSubmission = {
  free_text: string;
  mood_tags: MoodTag[];
  occasion_tag?: OccasionTag;
  feeling_prompt?: string;
};

export type DreamStage = {
  id: string;
  stage_name: string;
  photo_url: string;
  notes: string;
  created_at: string;
};

export type DreamListItem = {
  id: string;
  first_line: string;
  status: string;
  created_at: string;
};

export type DreamDetail = DreamSubmission & {
  id: string;
  status: string;
  consent_to_publish: boolean;
  stages: DreamStage[];
  created_at: string;
};

export async function submitDream(payload: DreamSubmission): Promise<DreamDetail> {
  const { data } = await apiClient.post("/dreams/", payload);
  return data;
}

export async function fetchMyDreams(): Promise<DreamListItem[]> {
  const { data } = await apiClient.get("/dreams/");
  return data.results ?? data;
}

export async function fetchDreamDetail(id: string): Promise<DreamDetail> {
  const { data } = await apiClient.get(`/dreams/${id}/`);
  return data;
}

export async function fetchShowcaseFeed(): Promise<DreamDetail[]> {
  const { data } = await apiClient.get("/dreams/feed/");
  return data.results ?? data;
}
