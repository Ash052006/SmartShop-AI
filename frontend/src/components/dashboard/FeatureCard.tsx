import { motion } from "framer-motion";
import {
  Search, Eye, GitCompare, Star, ShoppingCart,
  Trash2, Tag, CreditCard, PackageCheck, Zap,
  type LucideIcon,
} from "lucide-react";
import type { FeatureMeta } from "../../utils/constants";

interface FeatureCardProps {
  featureKey: string;
  value: number;
  meta: FeatureMeta;
  index: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  Eye,
  GitCompare,
  Star,
  ShoppingCart,
  Trash2,
  Tag,
  CreditCard,
  PackageCheck,
  Zap,
};

export function FeatureCard({ featureKey: _featureKey, value, meta, index }: FeatureCardProps) {
  const Icon = ICON_MAP[meta.icon];

  // Format engagement score as decimal
  const displayValue =
    _featureKey === "engagement_score" ? value.toFixed(2) : value.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 22,
        delay: index * 0.04,
      }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 cursor-default shadow-card hover:shadow-card-hover hover:border-slate-700/80 transition-all duration-200"
    >
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

      {/* Icon row */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/50 ${meta.color}`}
        >
          {Icon && <Icon size={16} />}
        </div>

        {/* Accent dot */}
        {value > 0 && (
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 group-hover:bg-indigo-400 transition-colors duration-200" />
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-slate-100 tabular-nums leading-none">
          {displayValue}
        </span>
      </div>

      {/* Label */}
      <p className="text-xs font-medium text-slate-500 leading-tight">{meta.label}</p>
    </motion.div>
  );
}
