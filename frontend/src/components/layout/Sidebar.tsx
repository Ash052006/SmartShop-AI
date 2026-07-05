import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  History,
  BrainCircuit,
  GitBranch,
  Network,
  TrendingUp,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "../../utils/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  History,
  BrainCircuit,
  GitBranch,
  Network,
  TrendingUp,
  Settings,
};

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-60 shrink-0 border-r border-white/[0.06] bg-slate-950/50 min-h-[calc(100vh-4rem)]">
      <nav className="flex flex-col gap-1 p-3 pt-4">
        <p className="section-title px-3 mb-2">Navigation</p>

        {NAV_ITEMS.map((item, i) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {item.disabled ? (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 cursor-not-allowed select-none">
                  {Icon && <Icon size={15} className="flex-shrink-0" />}
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-500 uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/25"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                    ].join(" ")
                  }
                >
                  {Icon && <Icon size={15} className="flex-shrink-0" />}
                  <span className="flex-1">{item.label}</span>
                </NavLink>
              )}
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="mt-auto p-3 pb-5">
        <div className="px-3 py-3 rounded-xl bg-slate-900/60 border border-slate-800/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Engine Active</span>
          </div>
          <p className="text-xs text-slate-600">Backend v1.0 · localhost:8000</p>
        </div>
      </div>
    </aside>
  );
}
