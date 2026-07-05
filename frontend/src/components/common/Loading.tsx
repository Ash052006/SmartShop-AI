import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Analyzing session..." }: LoadingProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
        aria-live="polite"
        aria-label="Loading"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative flex flex-col items-center gap-5 p-8 rounded-2xl border border-slate-800/80 bg-slate-900/90 shadow-2xl"
        >
          {/* Glow behind spinner */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-xl -z-10" />

          {/* Animated rings */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-16 h-16 rounded-full border-2 border-transparent border-t-indigo-500/60 border-r-purple-500/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-12 h-12 rounded-full border-2 border-transparent border-t-violet-500/50 border-l-indigo-500/30"
            />
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-slate-200 font-semibold text-sm">{message}</p>
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-indigo-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
