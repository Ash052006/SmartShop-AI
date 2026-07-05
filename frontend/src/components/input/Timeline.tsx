import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";
import {
  Search, Eye, GitCompare, Star, ShoppingCart,
  Trash2, Tag, CreditCard, PackageCheck, LogOut,
  type LucideIcon,
} from "lucide-react";
import type { SimulatorEvent } from "../../types/events";

interface TimelineProps {
  events: SimulatorEvent[];
  onRemove: (id: string) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  search: Search,
  view_product: Eye,
  compare_products: GitCompare,
  read_reviews: Star,
  add_to_cart: ShoppingCart,
  remove_from_cart: Trash2,
  apply_coupon: Tag,
  checkout: CreditCard,
  purchase: PackageCheck,
  leave_site: LogOut,
};

const COLOR_MAP: Record<string, string> = {
  search: "text-blue-400 bg-blue-500/15 border-blue-500/25",
  view_product: "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
  compare_products: "text-purple-400 bg-purple-500/15 border-purple-500/25",
  read_reviews: "text-yellow-400 bg-yellow-500/15 border-yellow-500/25",
  add_to_cart: "text-green-400 bg-green-500/15 border-green-500/25",
  remove_from_cart: "text-red-400 bg-red-500/15 border-red-500/25",
  apply_coupon: "text-orange-400 bg-orange-500/15 border-orange-500/25",
  checkout: "text-indigo-400 bg-indigo-500/15 border-indigo-500/25",
  purchase: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  leave_site: "text-slate-400 bg-slate-500/15 border-slate-500/25",
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function Timeline({ events, onRemove }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-600">
        <Clock size={28} className="opacity-30" />
        <div className="text-center">
          <p className="text-sm font-medium">No events yet</p>
          <p className="text-xs mt-1">Click event buttons above to build a session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vertical connector line */}
      <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-indigo-500/30 via-slate-700/40 to-transparent" />

      <ul className="flex flex-col gap-2.5 pl-1" role="list" aria-label="Event timeline">
        <AnimatePresence initial={false}>
          {events.map((event, index) => {
            const Icon = ICON_MAP[event.type];
            const colorClass = COLOR_MAP[event.type] ?? "text-slate-400 bg-slate-500/15 border-slate-500/25";

            return (
              <motion.li
                key={event.id}
                layout
                initial={{ opacity: 0, x: -12, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: index === events.length - 1 ? 0 : 0 }}
                className="flex items-center gap-3 group"
              >
                {/* Icon node */}
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border ${colorClass} z-10`}>
                  {Icon && <Icon size={14} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/50 group-hover:border-slate-700/60 transition-all duration-200">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">{event.label}</p>
                    <p className="text-[10px] text-slate-600 font-mono mt-0.5">{formatTime(event.timestamp)}</p>
                  </div>

                  <button
                    onClick={() => onRemove(event.id)}
                    aria-label={`Remove ${event.label} event`}
                    className="flex-shrink-0 p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-150"
                  >
                    <X size={13} />
                  </button>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
