import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { ClassificationResponse } from "../../types/api";
import { ClassificationCard } from "./ClassificationCard";
import { FeatureGrid } from "./FeatureGrid";
import { EvidenceCard } from "./EvidenceCard";
import { RecommendationCard } from "./RecommendationCard";
import { AIInsights } from "./AIInsights";

interface DashboardProps {
  data: ClassificationResponse;
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      {/* Classification Hero */}
      <ClassificationCard data={data} />

      {/* Feature Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-5"
      >
        <FeatureGrid features={data.features} />
      </motion.div>

      {/* Evidence + Recommendations row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-5"
        >
          <EvidenceCard evidence={data.evidence} />
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-5"
        >
          {/* Section header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 border border-slate-700">
              <Lightbulb size={14} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Recommendations</h3>
              <p className="text-xs text-slate-600">Actions to improve conversion</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {data.recommendations.length === 0 ? (
              <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-slate-900/40 border border-slate-800/50 text-slate-600 text-sm">
                <Lightbulb size={15} />
                No recommendations available.
              </div>
            ) : (
              data.recommendations.map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} index={index} />
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* AI Business Insights */}
      <AIInsights data={data} />
    </motion.div>
  );
}
