export interface EventMetadata {
  query?: string;
  product_id?: string;
  product_ids?: string[];
  coupon_code?: string;
  [key: string]: unknown;
}

export interface SessionEvent {
  event: string;
  metadata: EventMetadata;
}

export interface ClassifyRequest {
  session_id: string;
  events: SessionEvent[];
}

export interface Features {
  search_count: number;
  product_views: number;
  comparison_count: number;
  review_reads: number;
  cart_additions: number;
  cart_removals: number;
  coupon_used: number;
  checkout_started: number;
  purchase_completed: number;
  engagement_score: number;
  [key: string]: number;
}

export type ClassificationType =
  | "Browser"
  | "Comparer"
  | "Discount Seeker"
  | "Cart Abandoner"
  | "Loyal Customer"
  | string;

export interface Evidence {
  rule?: string;
  description?: string;
  weight?: number;
  [key: string]: unknown;
}

export interface Recommendation {
  title?: string;
  description?: string;
  type?: string;
  icon?: string;
  [key: string]: unknown;
}

export interface ClassificationResponse {
  success: boolean;
  session_id: string;
  classification: ClassificationType;
  confidence: number;
  persona: string;
  evidence: Evidence[];
  recommendations: Recommendation[];
  features: Features;
}

export interface ApiError {
  message: string;
  detail?: string;
  status?: number;
}

