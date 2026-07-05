import { motion } from "framer-motion";
import { getClassificationTheme } from "../../utils/constants";
import type { ClassificationResponse } from "../../types/api";
import { ConfidenceGauge } from "./ConfidenceGauge";
import { User2, Sparkles } from "lucide-react";

interface ClassificationCardProps {
  data: ClassificationResponse;
}

export function ClassificationCard({ data }: ClassificationCardProps) {
  const theme = getClassificationTheme(data.classification);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.gradient} p-6 shadow-xl ${theme.glow}`}
    >
      {/* Background decorative glow */}
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20`}
        style={{ backgroundColor: theme.ring }}
      />
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Top row: icon badge + confidence gauge */}
        <div className="flex items-start justify-between gap-4">
          {/* Classification info */}
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className={`self-start flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold ${theme.badge} ${theme.badgeText}`}
            >
              <span className="text-base">{theme.icon}</span>
              <span>{data.classification}</span>
            </motion.div>

            {/* Classification label */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-slate-100 leading-tight">
                {data.classification}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <User2 size={13} className="text-slate-500" />
                <span className="text-sm text-slate-400 font-medium">{data.persona}</span>
              </div>
            </motion.div>

            {/* Session ID */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-1.5"
            >
              <Sparkles size={11} className="text-slate-600" />
              <span className="text-xs font-mono text-slate-600">Session: {data.session_id}</span>
            </motion.div>
          </div>

          {/* Confidence gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
            className="flex-shrink-0"
          >
            <ConfidenceGauge confidence={data.confidence} color={theme.ring} />
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 text-sm text-slate-400 leading-relaxed`}
        >
          {theme.description}
        </motion.div>
      </div>
    </motion.div>
  );
}
