import { motion } from "framer-motion";
import {
  Search,
  Eye,
  GitCompare,
  Star,
  ShoppingCart,
  Trash2,
  Tag,
  CreditCard,
  PackageCheck,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import type { EventButtonConfig } from "../../types/events";

interface EventButtonProps {
  config: EventButtonConfig;
  onClick: (config: EventButtonConfig) => void;
  disabled?: boolean;
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
  LogOut,
};

const COLOR_CLASSES: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue: {
    bg: "bg-blue-500/10 hover:bg-blue-500/20",
    border: "border-blue-500/20 hover:border-blue-400/40",
    text: "text-blue-400",
    glow: "hover:shadow-blue-500/15",
  },
  cyan: {
    bg: "bg-cyan-500/10 hover:bg-cyan-500/20",
    border: "border-cyan-500/20 hover:border-cyan-400/40",
    text: "text-cyan-400",
    glow: "hover:shadow-cyan-500/15",
  },
  purple: {
    bg: "bg-purple-500/10 hover:bg-purple-500/20",
    border: "border-purple-500/20 hover:border-purple-400/40",
    text: "text-purple-400",
    glow: "hover:shadow-purple-500/15",
  },
  yellow: {
    bg: "bg-yellow-500/10 hover:bg-yellow-500/20",
    border: "border-yellow-500/20 hover:border-yellow-400/40",
    text: "text-yellow-400",
    glow: "hover:shadow-yellow-500/15",
  },
  green: {
    bg: "bg-green-500/10 hover:bg-green-500/20",
    border: "border-green-500/20 hover:border-green-400/40",
    text: "text-green-400",
    glow: "hover:shadow-green-500/15",
  },
  red: {
    bg: "bg-red-500/10 hover:bg-red-500/20",
    border: "border-red-500/20 hover:border-red-400/40",
    text: "text-red-400",
    glow: "hover:shadow-red-500/15",
  },
  orange: {
    bg: "bg-orange-500/10 hover:bg-orange-500/20",
    border: "border-orange-500/20 hover:border-orange-400/40",
    text: "text-orange-400",
    glow: "hover:shadow-orange-500/15",
  },
  indigo: {
    bg: "bg-indigo-500/10 hover:bg-indigo-500/20",
    border: "border-indigo-500/20 hover:border-indigo-400/40",
    text: "text-indigo-400",
    glow: "hover:shadow-indigo-500/15",
  },
  emerald: {
    bg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    text: "text-emerald-400",
    glow: "hover:shadow-emerald-500/15",
  },
  slate: {
    bg: "bg-slate-500/10 hover:bg-slate-500/20",
    border: "border-slate-500/20 hover:border-slate-400/40",
    text: "text-slate-400",
    glow: "hover:shadow-slate-500/15",
  },
};

export function EventButton({ config, onClick, disabled }: EventButtonProps) {
  const Icon = ICON_MAP[config.icon];
  const colors = COLOR_CLASSES[config.color] ?? COLOR_CLASSES.slate;

  return (
    <motion.button
      id={`event-btn-${config.type}`}
      onClick={() => onClick(config)}
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={[
        "relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200",
        "text-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
        "shadow-sm hover:shadow-md",
        colors.bg,
        colors.border,
        colors.glow,
      ].join(" ")}
      aria-label={`Add ${config.label} event`}
    >
      {Icon && (
        <div className={`flex items-center justify-center w-7 h-7 ${colors.text}`}>
          <Icon size={18} />
        </div>
      )}
      <span className={`text-xs font-medium leading-tight ${colors.text}`}>{config.label}</span>
    </motion.button>
  );
}
