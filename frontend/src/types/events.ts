export type EventType =
  | "search"
  | "view_product"
  | "compare_products"
  | "read_reviews"
  | "add_to_cart"
  | "remove_from_cart"
  | "apply_coupon"
  | "checkout"
  | "purchase"
  | "leave_site";

export interface SimulatorEvent {
  id: string;
  type: EventType;
  label: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface EventButtonConfig {
  type: EventType;
  label: string;
  icon: string;
  color: string;
  defaultMetadata: Record<string, unknown>;
}
