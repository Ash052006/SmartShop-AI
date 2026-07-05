import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, ServerCrash } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  detail?: string;
  onDismiss?: () => void;
}

export function ErrorAlert({ message, detail, onDismiss }: ErrorAlertProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        role="alert"
        aria-live="assertive"
        className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-950/30 backdrop-blur-sm p-5"
      >
        {/* Red glow accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30">
              <ServerCrash size={18} className="text-red-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={13} className="text-red-400 flex-shrink-0" />
              <h3 className="text-sm font-semibold text-red-300">Analysis Failed</h3>
            </div>
            <p className="text-sm text-red-200/90 leading-relaxed">{message}</p>
            {detail && (
              <p className="mt-2 text-xs text-red-400/70 font-mono border-t border-red-500/20 pt-2">
                {detail}
              </p>
            )}
          </div>

          {/* Dismiss */}
          {onDismiss && (
            <button
              id="error-dismiss-btn"
              onClick={onDismiss}
              aria-label="Dismiss error"
              className="flex-shrink-0 p-1.5 rounded-lg text-red-400/60 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
