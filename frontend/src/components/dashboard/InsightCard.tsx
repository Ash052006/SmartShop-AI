import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface InsightCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  type?: "probability" | "risk";
  delay: number;
}

export function InsightCard({ title, content, icon: Icon, type, delay }: InsightCardProps) {
  let badgeColor = "";
  if (type === "probability") {
    const val = content.toLowerCase();
    if (val.includes("high")) badgeColor = "bg-green-500/20 text-green-400 border-green-500/30";
    else if (val.includes("medium")) badgeColor = "bg-orange-500/20 text-orange-400 border-orange-500/30";
    else if (val.includes("low")) badgeColor = "bg-red-500/20 text-red-400 border-red-500/30";
  } else if (type === "risk") {
    const val = content.toLowerCase();
    if (val.includes("high")) badgeColor = "bg-red-500/20 text-red-400 border-red-500/30";
    else if (val.includes("medium")) badgeColor = "bg-orange-500/20 text-orange-400 border-orange-500/30";
    else if (val.includes("low")) badgeColor = "bg-green-500/20 text-green-400 border-green-500/30";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Icon size={16} className="text-indigo-400" />
        </div>
        <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
      </div>
      {badgeColor ? (
        <div className="mt-auto self-start pt-1">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}>
            {content}
          </span>
        </div>
      ) : (
        <p className="text-sm text-slate-400 leading-relaxed">{content}</p>
      )}
    </motion.div>
  );
}
