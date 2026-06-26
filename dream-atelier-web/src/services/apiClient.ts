import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

export const apiClient = axios.create({ baseURL });

const ACCESS_TOKEN_KEY = "dream_atelier_access_token";
const REFRESH_TOKEN_KEY = "dream_atelier_refresh_token";

export function setTokens(access: string, refresh: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, attempt one silent refresh before giving up.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refresh) {
        try {
          const { data } = await axios.post(`${baseURL}/auth/refresh/`, { refresh_token: refresh });
          localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
          original.headers.Authorization = `Bearer ${data.access_token}`;
          return apiClient(original);
        } catch {
          clearTokens();
        }
      }
    }
    return Promise.reject(error);
  }
);
