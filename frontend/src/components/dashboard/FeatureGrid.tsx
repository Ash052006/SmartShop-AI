import { FeatureCard } from "./FeatureCard";
import { FEATURE_META } from "../../utils/constants";
import type { Features } from "../../types/api";
import { BarChart3 } from "lucide-react";

interface FeatureGridProps {
  features: Features;
}

const FEATURE_ORDER = [
  "search_count",
  "product_views",
  "comparison_count",
  "review_reads",
  "cart_additions",
  "cart_removals",
  "coupon_used",
  "checkout_started",
  "purchase_completed",
  "engagement_score",
];

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section aria-label="Session features">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 border border-slate-700">
          <BarChart3 size={14} className="text-slate-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Session Features</h3>
          <p className="text-xs text-slate-600">Extracted behavioral metrics</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {FEATURE_ORDER.map((key, index) => {
          const meta = FEATURE_META[key];
          const value = features[key] ?? 0;
          if (!meta) return null;
          return (
            <FeatureCard
              key={key}
              featureKey={key}
              value={value}
              meta={meta}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}
