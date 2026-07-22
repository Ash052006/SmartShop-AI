import axios from "axios";
import type { ClassifyRequest, ClassificationResponse } from "../types/api";

const apiClient = axios.create({
  baseURL: "https://smartshop-ai-backend-ubi2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);

// ─── API Methods ──────────────────────────────────────────────────────────────

export const classifySession = async (
  payload: ClassifyRequest
): Promise<ClassificationResponse> => {
  const response = await apiClient.post<ClassificationResponse>("/classify/", payload);
  return response.data;
};

export default apiClient;
