import apiClient from "./api";
import type { AIInsightRequest, AIInsightResponse } from "../types/ai";

export const generateInsight = async (
  payload: AIInsightRequest
): Promise<AIInsightResponse> => {
  const response = await apiClient.post<AIInsightResponse>("/ai-insight/", payload);
  return response.data;
};
