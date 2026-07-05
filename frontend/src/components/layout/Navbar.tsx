import { Code2, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../common/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ─── Logo & Branding ─── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            {/* Logo mark */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
              <Sparkles size={17} className="text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
            </div>

            {/* Name + subtitle */}
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-slate-100 tracking-tight">
                SmartShop AI
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">
                Explainable Personalization Engine
              </span>
            </div>
          </motion.div>

          {/* ─── Center badge ─── */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10"
          >
            <Zap size={11} className="text-indigo-400" />
            <span className="text-xs text-indigo-300 font-medium">Powered by Rules Engine</span>
          </motion.div>

          {/* ─── Right Actions ─── */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <a
              id="github-link"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-all duration-200 text-sm font-medium"
            >
              <Code2 size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <div className="h-4 w-px bg-slate-800" />

            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
