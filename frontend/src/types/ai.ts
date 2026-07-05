import type { Features, Evidence, Recommendation } from "./api";

export interface AIInsight {
  customer_summary: string;
  business_impact: string;
  marketing_strategy: string;
  next_best_action: string;
  conversion_probability: string;
  risk_level: string;
}

export interface AIInsightRequest {
  classification: string;
  confidence: number;
  persona: string;
  features: Features;
  evidence: Evidence[];
  recommendations: Recommendation[];
}

export interface AIInsightResponse {
  success: boolean;
  generated_at?: string;
  insight?: AIInsight;
}
