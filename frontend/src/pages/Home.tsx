import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, MousePointer2, Braces, Activity, ChevronRight } from "lucide-react";
import { JsonEditor } from "../components/input/JsonEditor";
import { Simulator } from "../components/input/Simulator";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Loading } from "../components/common/Loading";
import { ErrorAlert } from "../components/common/ErrorAlert";
import { useClassification } from "../hooks/useClassification";
import type { ClassifyRequest } from "../types/api";

type ActiveTab = "json" | "simulator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("json");
  const { result, loading, error, classify, reset } = useClassification();

  const handleAnalyze = useCallback(
    (payload: ClassifyRequest) => {
      classify(payload);
    },
    [classify]
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Page header */}
      <div className="px-4 sm:px-6 py-5 border-b border-slate-800/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-1.5">
                <span>Dashboard</span>
                <ChevronRight size={11} />
                <span className="text-slate-400">Session Analyzer</span>
              </div>
              <h1 className="text-xl font-bold text-slate-100">Session Classifier</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Analyze user behavior and get real-time classification
              </p>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">
                  Session analyzed · {result.session_id}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 min-h-[600px]">

            {/* ─── Left Panel: Input (40%) ─── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-[40%] xl:w-[38%] flex-shrink-0"
            >
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 overflow-hidden h-full flex flex-col">
                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/50">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25">
                      <Activity size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-slate-200">Mock User Event Stream</h2>
                      <p className="text-xs text-slate-600">Build or paste a user session</p>
                    </div>
                  </div>
                </div>

                {/* Tab switcher */}
                <div className="flex items-center gap-1 px-4 pt-3 pb-0">
                  <div className="flex bg-slate-950/60 rounded-xl p-1 border border-slate-800/50 w-full">
                    <TabButton
                      id="tab-json"
                      active={activeTab === "json"}
                      onClick={() => setActiveTab("json")}
                      icon={<Braces size={13} />}
                      label="JSON"
                    />
                    <TabButton
                      id="tab-simulator"
                      active={activeTab === "simulator"}
                      onClick={() => setActiveTab("simulator")}
                      icon={<MousePointer2 size={13} />}
                      label="Simulator"
                    />
                  </div>
                </div>

                {/* Tab content */}
                <div className="flex-1 min-h-0 p-4 pt-3">
                  <AnimatePresence mode="wait">
                    {activeTab === "json" ? (
                      <motion.div
                        key="json"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="h-full min-h-[480px]"
                      >
                        <JsonEditor onAnalyze={handleAnalyze} isLoading={loading} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="simulator"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="h-full min-h-[480px]"
                      >
                        <Simulator onAnalyze={handleAnalyze} isLoading={loading} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* ─── Right Panel: Results (60%) ─── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex-1 min-w-0"
            >
              <AnimatePresence mode="wait">
                {/* Error state */}
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4"
                  >
                    <ErrorAlert
                      message={error.message}
                      detail={error.detail}
                      onDismiss={reset}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Dashboard data={result} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center min-h-[480px]"
                  >
                    <EmptyState />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && <Loading message="Analyzing session..." />}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TabButtonProps {
  id: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ id, active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={[
        "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
        active
          ? "bg-slate-800 text-slate-200 shadow-sm"
          : "text-slate-500 hover:text-slate-300",
      ].join(" ")}
      aria-selected={active}
      role="tab"
    >
      {icon}
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-5 text-center p-8 max-w-sm mx-auto">
      {/* Animated icon */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(99,102,241,0)",
              "0 0 30px rgba(99,102,241,0.3)",
              "0 0 0px rgba(99,102,241,0)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20"
        >
          <Code2 size={36} className="text-indigo-400" />
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-indigo-500/40"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              ease: "linear",
              delay: i * 0.8,
            }}
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: `${30 + i * 8}px 0px`,
            }}
          />
        ))}
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-300 mb-2">Ready to Classify</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Enter a session JSON or use the Simulator to build events, then click{" "}
          <span className="text-indigo-400 font-medium">Analyze Session</span> to see the
          classification results.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2 w-full text-left">
        {[
          { n: "1", text: "Select JSON or Simulator tab" },
          { n: "2", text: "Configure your session events" },
          { n: "3", text: "Click Analyze Session" },
        ].map((step) => (
          <div key={step.n} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold flex-shrink-0">
              {step.n}
            </div>
            <span className="text-xs text-slate-500">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
