import { motion } from "framer-motion";
import { Lightbulb, Tag, Megaphone, Gift, Zap, Star, ArrowRight, type LucideIcon } from "lucide-react";
import type { Recommendation } from "../../types/api";

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const TYPE_ICON_MAP: Record<string, LucideIcon> = {
  discount: Tag,
  offer: Gift,
  promotion: Megaphone,
  loyalty: Star,
  urgent: Zap,
  default: Lightbulb,
};

const TYPE_GRADIENT_MAP: Record<string, string> = {
  discount: "from-orange-500/15 to-amber-500/5 border-orange-500/20",
  offer: "from-pink-500/15 to-rose-500/5 border-pink-500/20",
  promotion: "from-purple-500/15 to-violet-500/5 border-purple-500/20",
  loyalty: "from-yellow-500/15 to-amber-500/5 border-yellow-500/20",
  urgent: "from-red-500/15 to-rose-500/5 border-red-500/20",
  default: "from-indigo-500/15 to-blue-500/5 border-indigo-500/20",
};

const TYPE_ICON_COLOR_MAP: Record<string, string> = {
  discount: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  offer: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  promotion: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  loyalty: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  urgent: "text-red-400 bg-red-500/10 border-red-500/20",
  default: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
};

function extractRecommendation(item: Recommendation): { title: string; description: string; type: string } {
  if (typeof item === "string") {
    return { title: item, description: "", type: "default" };
  }
  return {
    title: item.title ?? "Recommendation",
    description: item.description ?? "",
    type: item.type ?? "default",
  };
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const { title, description, type } = extractRecommendation(recommendation);
  const normalizedType = type.toLowerCase();
  const gradient = TYPE_GRADIENT_MAP[normalizedType] ?? TYPE_GRADIENT_MAP.default;
  const iconColor = TYPE_ICON_COLOR_MAP[normalizedType] ?? TYPE_ICON_COLOR_MAP.default;
  const Icon = TYPE_ICON_MAP[normalizedType] ?? TYPE_ICON_MAP.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 250, damping: 22 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${gradient} p-4 transition-all duration-200 cursor-default shadow-sm hover:shadow-md`}
    >
      {/* Decorative corner glow */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl bg-current opacity-5 pointer-events-none" />

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl border ${iconColor} mt-0.5`}>
          <Icon size={16} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-200 leading-tight pr-2">{title}</h4>
            <ArrowRight
              size={13}
              className="flex-shrink-0 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200 mt-0.5"
            />
          </div>
          {description && (
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
