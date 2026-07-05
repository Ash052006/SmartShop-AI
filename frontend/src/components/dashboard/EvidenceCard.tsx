import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText } from "lucide-react";
import type { Evidence } from "../../types/api";

interface EvidenceCardProps {
  evidence: Evidence[];
}

function extractEvidenceText(item: Evidence): string {
  return (
    item.description ??
    item.rule ??
    (typeof item === "string" ? item : JSON.stringify(item))
  );
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  if (!evidence || evidence.length === 0) {
    return (
      <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-slate-900/40 border border-slate-800/50 text-slate-600 text-sm">
        <FileText size={15} />
        No evidence data available.
      </div>
    );
  }

  return (
    <section aria-label="Classification evidence">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 border border-slate-700">
          <CheckCircle2 size={14} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Evidence</h3>
          <p className="text-xs text-slate-600">Why this classification was chosen</p>
        </div>
      </div>

      {/* Timeline list */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/30 via-slate-700/30 to-transparent" />

        <ul className="flex flex-col gap-2 pl-1" role="list">
          <AnimatePresence>
            {evidence.map((item, index) => {
              const text = extractEvidenceText(item);
              const weight = item.weight;

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-start gap-3"
                >
                  {/* Check icon node */}
                  <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 z-10">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  </div>

                  {/* Evidence text */}
                  <div className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-slate-700/60 transition-colors duration-150">
                    <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
                    {weight !== undefined && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-emerald-500/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (weight / 10) * 100)}%` }}
                            transition={{ delay: index * 0.07 + 0.2, duration: 0.5 }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 tabular-nums flex-shrink-0">
                          w:{weight.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
