import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  ClipboardList, 
  TrendingUp, 
  Target, 
  Zap, 
  Activity, 
  AlertTriangle,
  RefreshCw,
  Copy,
  Check
} from "lucide-react";
import { generateInsight } from "../../services/ai";
import { InsightCard } from "./InsightCard";
import type { ClassificationResponse } from "../../types/api";
import type { AIInsight, AIInsightRequest } from "../../types/ai";

interface AIInsightsProps {
  data: ClassificationResponse;
}

export function AIInsights({ data }: AIInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);
    try {
      const payload: AIInsightRequest = {
        classification: data.classification,
        confidence: data.confidence,
        persona: data.persona,
        features: data.features,
        evidence: data.evidence,
        recommendations: data.recommendations,
      };
      const res = await generateInsight(payload);
      if (res.success && res.insight) {
        setInsight(res.insight);
        setGeneratedAt(res.generated_at || new Date().toISOString());
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = useCallback(() => {
    if (!insight) return;
    const text = `
Customer Summary: ${insight.customer_summary}
Business Impact: ${insight.business_impact}
Marketing Strategy: ${insight.marketing_strategy}
Next Best Action: ${insight.next_best_action}
Conversion Probability: ${insight.conversion_probability}
Risk Level: ${insight.risk_level}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [insight]);

  return (
    <section className="mt-6 w-full">
      <AnimatePresence mode="wait">
        {!insight ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex flex-col items-center justify-center text-center gap-4 p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
              <Sparkles size={24} className="text-indigo-400" />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-slate-100">🤖 AI Business Insights</h3>
              <p className="text-sm text-slate-500 mt-1">
                Generate AI-powered business insights based on the rule engine's classification.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating AI Insight...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  ✨ Generate AI Insight
                </>
              )}
            </button>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mt-2 text-left"
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Unable to generate AI insight.</span>
                  <span className="text-xs text-red-400/80 mt-0.5">Please try again.</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/50 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">🤖 AI Business Insights</h3>
                <p className="text-sm text-slate-500 mt-1">Generated using Groq AI</p>
              </div>
              {generatedAt && (
                <div className="text-xs text-slate-500">
                  Generated at <span className="font-mono text-slate-400">{new Date(generatedAt).toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <InsightCard title="Customer Summary" content={insight.customer_summary} icon={ClipboardList} delay={0.1} />
              <InsightCard title="Business Impact" content={insight.business_impact} icon={TrendingUp} delay={0.2} />
              <InsightCard title="Marketing Strategy" content={insight.marketing_strategy} icon={Target} delay={0.3} />
              <InsightCard title="Next Best Action" content={insight.next_best_action} icon={Zap} delay={0.4} />
              <InsightCard title="Conversion Probability" content={insight.conversion_probability} icon={Activity} type="probability" delay={0.5} />
              <InsightCard title="Risk Level" content={insight.risk_level} icon={AlertTriangle} type="risk" delay={0.6} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-secondary"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Regenerate Insight
              </button>
              
              <button
                onClick={handleCopy}
                className="btn-secondary"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Insight"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
