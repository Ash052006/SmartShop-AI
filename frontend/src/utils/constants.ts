import type { ClassificationType } from "../types/api";
import type { EventButtonConfig } from "../types/events";

// ─── Classification Color Themes ─────────────────────────────────────────────

export interface ClassificationTheme {
  gradient: string;
  border: string;
  badge: string;
  badgeText: string;
  glow: string;
  ring: string;
  icon: string;
  description: string;
}

export const CLASSIFICATION_THEMES: Record<string, ClassificationTheme> = {
  Browser: {
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 border border-blue-400/40",
    badgeText: "text-blue-300",
    glow: "shadow-blue-500/20",
    ring: "#3b82f6",
    icon: "🌐",
    description:
      "This user is exploring your catalog with broad interest. Focus on discovery experiences and personalized browsing recommendations.",
  },
  Comparer: {
    gradient: "from-purple-600/20 via-violet-600/10 to-transparent",
    border: "border-purple-500/30",
    badge: "bg-purple-500/20 border border-purple-400/40",
    badgeText: "text-purple-300",
    glow: "shadow-purple-500/20",
    ring: "#a855f7",
    icon: "⚖️",
    description:
      "This user compares products carefully before deciding. Highlight comparison tools, feature tables, and detailed specs.",
  },
  "Discount Seeker": {
    gradient: "from-orange-600/20 via-amber-600/10 to-transparent",
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 border border-orange-400/40",
    badgeText: "text-orange-300",
    glow: "shadow-orange-500/20",
    ring: "#f97316",
    icon: "🏷️",
    description:
      "This user is motivated by deals and discounts. Show coupons, flash sales, and bundle offers prominently.",
  },
  "Cart Abandoner": {
    gradient: "from-red-600/20 via-rose-600/10 to-transparent",
    border: "border-red-500/30",
    badge: "bg-red-500/20 border border-red-400/40",
    badgeText: "text-red-300",
    glow: "shadow-red-500/20",
    ring: "#ef4444",
    icon: "🛒",
    description:
      "This user adds items but hesitates to complete purchase. Use urgency cues, exit-intent offers, and cart recovery emails.",
  },
  "Loyal Customer": {
    gradient: "from-green-600/20 via-emerald-600/10 to-transparent",
    border: "border-green-500/30",
    badge: "bg-green-500/20 border border-green-400/40",
    badgeText: "text-green-300",
    glow: "shadow-green-500/20",
    ring: "#22c55e",
    icon: "⭐",
    description:
      "This user is a returning, high-value customer. Reward loyalty, offer early access, and provide VIP experiences.",
  },
};

export const DEFAULT_THEME: ClassificationTheme = {
  gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
  border: "border-indigo-500/30",
  badge: "bg-indigo-500/20 border border-indigo-400/40",
  badgeText: "text-indigo-300",
  glow: "shadow-indigo-500/20",
  ring: "#6366f1",
  icon: "🤖",
  description: "Session analyzed. Review the features and recommendations below.",
};

export function getClassificationTheme(classification: ClassificationType): ClassificationTheme {
  return CLASSIFICATION_THEMES[classification] ?? DEFAULT_THEME;
}

// ─── Feature Metadata ─────────────────────────────────────────────────────────

export interface FeatureMeta {
  label: string;
  icon: string;
  description: string;
  color: string;
}

export const FEATURE_META: Record<string, FeatureMeta> = {
  search_count: {
    label: "Searches",
    icon: "Search",
    description: "Total search queries performed",
    color: "text-blue-400",
  },
  product_views: {
    label: "Product Views",
    icon: "Eye",
    description: "Number of product pages viewed",
    color: "text-cyan-400",
  },
  comparison_count: {
    label: "Comparisons",
    icon: "GitCompare",
    description: "Products compared side-by-side",
    color: "text-purple-400",
  },
  review_reads: {
    label: "Review Reads",
    icon: "Star",
    description: "Customer reviews read",
    color: "text-yellow-400",
  },
  cart_additions: {
    label: "Cart Additions",
    icon: "ShoppingCart",
    description: "Items added to cart",
    color: "text-green-400",
  },
  cart_removals: {
    label: "Cart Removals",
    icon: "Trash2",
    description: "Items removed from cart",
    color: "text-red-400",
  },
  coupon_used: {
    label: "Coupons Used",
    icon: "Tag",
    description: "Discount coupons applied",
    color: "text-orange-400",
  },
  checkout_started: {
    label: "Checkouts",
    icon: "CreditCard",
    description: "Checkout processes initiated",
    color: "text-indigo-400",
  },
  purchase_completed: {
    label: "Purchases",
    icon: "PackageCheck",
    description: "Completed transactions",
    color: "text-emerald-400",
  },
  engagement_score: {
    label: "Engagement Score",
    icon: "Zap",
    description: "Overall session engagement metric",
    color: "text-violet-400",
  },
};

// ─── Event Button Configs ─────────────────────────────────────────────────────

export const EVENT_BUTTONS: EventButtonConfig[] = [
  {
    type: "search",
    label: "Search",
    icon: "Search",
    color: "blue",
    defaultMetadata: { query: "iphone" },
  },
  {
    type: "view_product",
    label: "View Product",
    icon: "Eye",
    color: "cyan",
    defaultMetadata: { product_id: "P101" },
  },
  {
    type: "compare_products",
    label: "Compare Products",
    icon: "GitCompare",
    color: "purple",
    defaultMetadata: { product_ids: ["P101", "P102"] },
  },
  {
    type: "read_reviews",
    label: "Read Reviews",
    icon: "Star",
    color: "yellow",
    defaultMetadata: { product_id: "P101" },
  },
  {
    type: "add_to_cart",
    label: "Add To Cart",
    icon: "ShoppingCart",
    color: "green",
    defaultMetadata: { product_id: "P101" },
  },
  {
    type: "remove_from_cart",
    label: "Remove From Cart",
    icon: "Trash2",
    color: "red",
    defaultMetadata: { product_id: "P101" },
  },
  {
    type: "apply_coupon",
    label: "Apply Coupon",
    icon: "Tag",
    color: "orange",
    defaultMetadata: { coupon_code: "SAVE10" },
  },
  {
    type: "checkout",
    label: "Checkout",
    icon: "CreditCard",
    color: "indigo",
    defaultMetadata: {},
  },
  {
    type: "purchase",
    label: "Purchase",
    icon: "PackageCheck",
    color: "emerald",
    defaultMetadata: { product_id: "P101" },
  },
  {
    type: "leave_site",
    label: "Leave Site",
    icon: "LogOut",
    color: "slate",
    defaultMetadata: {},
  },
];

// ─── Sidebar Navigation ───────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  icon: string;
  path: string;
  disabled?: boolean;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: "LayoutDashboard", path: "/" },
  { label: "Session History", icon: "History", path: "/history", disabled: true, badge: "Soon" },
  { label: "AI Insights", icon: "BrainCircuit", path: "/insights", disabled: true, badge: "Soon" },
  { label: "Rule Trace", icon: "GitBranch", path: "/rules", disabled: true, badge: "Soon" },
  {
    label: "Decision Tree",
    icon: "Network",
    path: "/tree",
    disabled: true,
    badge: "Soon",
  },
  {
    label: "Business Insights",
    icon: "TrendingUp",
    path: "/business",
    disabled: true,
    badge: "Soon",
  },
  { label: "Settings", icon: "Settings", path: "/settings", disabled: true, badge: "Soon" },
];
