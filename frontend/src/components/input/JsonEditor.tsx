import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, RefreshCw, Trash2, AlertCircle, Code2 } from "lucide-react";
import { SAMPLE_JSON_STRING } from "../../utils/sampleData";
import type { ClassifyRequest } from "../../types/api";

interface JsonEditorProps {
  onAnalyze: (payload: ClassifyRequest) => void;
  isLoading: boolean;
}

export function JsonEditor({ onAnalyze, isLoading }: JsonEditorProps) {
  const [value, setValue] = useState<string>(SAMPLE_JSON_STRING);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setParseError(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    try {
      const parsed = JSON.parse(value) as ClassifyRequest;
      if (!parsed.session_id || !Array.isArray(parsed.events)) {
        setParseError('JSON must have "session_id" (string) and "events" (array).');
        return;
      }
      setParseError(null);
      onAnalyze(parsed);
    } catch {
      setParseError("Invalid JSON — please check your syntax.");
    }
  }, [value, onAnalyze]);

  const handleLoadSample = useCallback(() => {
    setValue(SAMPLE_JSON_STRING);
    setParseError(null);
  }, []);

  const handleClear = useCallback(() => {
    setValue("");
    setParseError(null);
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header hint */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Code2 size={12} />
        <span>Paste or edit your session JSON below</span>
      </div>

      {/* Textarea wrapper */}
      <div className="relative flex-1 min-h-0">
        <textarea
          id="json-editor-textarea"
          className="json-textarea h-full min-h-[320px]"
          value={value}
          onChange={handleChange}
          spellCheck={false}
          autoComplete="off"
          placeholder={`{\n  "session_id": "S001",\n  "events": [...]\n}`}
          aria-label="Session JSON input"
        />

        {/* Line count */}
        <div className="absolute bottom-3 right-3 text-xs text-slate-600 font-mono pointer-events-none select-none">
          {value.split("\n").length} lines
        </div>
      </div>

      {/* Parse error */}
      {parseError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-950/40 border border-red-500/25 text-sm text-red-400"
        >
          <AlertCircle size={14} className="flex-shrink-0" />
          {parseError}
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <motion.button
          id="analyze-json-btn"
          onClick={handleAnalyze}
          disabled={isLoading || !value.trim()}
          className="btn-primary flex-1 sm:flex-none justify-center"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Analyze session JSON"
        >
          <Play size={14} />
          {isLoading ? "Analyzing..." : "Analyze Session"}
        </motion.button>

        <motion.button
          id="load-sample-btn"
          onClick={handleLoadSample}
          disabled={isLoading}
          className="btn-secondary"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Load sample data"
        >
          <RefreshCw size={14} />
          Load Sample
        </motion.button>

        <motion.button
          id="clear-json-btn"
          onClick={handleClear}
          disabled={isLoading}
          className="btn-ghost"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Clear editor"
        >
          <Trash2 size={14} />
          Clear
        </motion.button>
      </div>
    </div>
  );
}
