import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const baseURL = Constants.expoConfig?.extra?.apiBaseUrl ?? "http://localhost:8000/api";

export const apiClient = axios.create({ baseURL });

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export async function setTokens(access: string, refresh: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, attempt one silent refresh before giving up — every authenticated
// screen relies on this rather than handling token refresh itself.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (refresh) {
        try {
          const { data } = await axios.post(`${baseURL}/auth/refresh/`, { refresh_token: refresh });
          await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.access_token);
          original.headers.Authorization = `Bearer ${data.access_token}`;
          return apiClient(original);
        } catch {
          await clearTokens();
        }
      }
    }
    return Promise.reject(error);
  }
);
