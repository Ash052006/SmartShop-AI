import { Sparkles, Code2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950/50 py-5 px-6">
      <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-600 text-xs">
          <Sparkles size={12} className="text-indigo-500" />
          <span>SmartShop AI · Explainable Personalization Engine</span>
          <span className="text-slate-700">·</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono text-[10px]">
            v1.0.0
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-slate-400 transition-colors duration-200"
          >
            <Code2 size={12} />
            Source
          </a>
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-slate-400 transition-colors duration-200"
          >
            <ExternalLink size={12} />
            API Docs
          </a>
          <span>Built with React 19 + FastAPI</span>
        </div>
      </div>
    </footer>
  );
}
