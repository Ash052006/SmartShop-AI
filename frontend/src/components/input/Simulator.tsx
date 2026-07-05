import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Trash2, MousePointer2 } from "lucide-react";
import { nanoid } from "nanoid";
import { EventButton } from "./EventButton";
import { Timeline } from "./Timeline";
import { EVENT_BUTTONS } from "../../utils/constants";
import type { SimulatorEvent, EventButtonConfig } from "../../types/events";
import type { ClassifyRequest } from "../../types/api";

interface SimulatorProps {
  onAnalyze: (payload: ClassifyRequest) => void;
  isLoading: boolean;
}

let eventCounter = 1;

export function Simulator({ onAnalyze, isLoading }: SimulatorProps) {
  const [events, setEvents] = useState<SimulatorEvent[]>([]);
  const [sessionId] = useState<string>(`SIM-${Date.now().toString(36).toUpperCase()}`);

  const handleAddEvent = useCallback((config: EventButtonConfig) => {
    const newEvent: SimulatorEvent = {
      id: nanoid(),
      type: config.type,
      label: config.label,
      timestamp: new Date(),
      metadata: { ...config.defaultMetadata },
    };
    setEvents((prev) => [...prev, newEvent]);
    eventCounter++;
  }, []);

  const handleRemoveEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setEvents([]);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (events.length === 0) return;

    const payload: ClassifyRequest = {
      session_id: sessionId,
      events: events.map((e) => ({
        event: e.type,
        metadata: e.metadata as Record<string, string>,
      })),
    };

    onAnalyze(payload);
  }, [events, sessionId, onAnalyze]);

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Header info */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <MousePointer2 size={12} />
          <span>Click events to build a user session</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
          <div className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-xs font-mono text-slate-500">{sessionId}</span>
        </div>
      </div>

      {/* Event buttons grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {EVENT_BUTTONS.map((config) => (
          <EventButton
            key={config.type}
            config={config}
            onClick={handleAddEvent}
            disabled={isLoading}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800" />
        </div>
        <div className="relative flex justify-between items-center">
          <span className="pr-3 bg-transparent text-xs text-slate-600">
            Session Events
          </span>
          <div className="flex items-center gap-2 pl-3 bg-transparent">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${events.length > 0 ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-600"}`}>
              {events.length} event{events.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto min-h-[140px] max-h-[280px] pr-1">
        <Timeline events={events} onRemove={handleRemoveEvent} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        <motion.button
          id="analyze-simulator-btn"
          onClick={handleAnalyze}
          disabled={isLoading || events.length === 0}
          className="btn-primary flex-1 sm:flex-none justify-center"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Analyze simulator session"
        >
          <Play size={14} />
          {isLoading ? "Analyzing..." : `Analyze ${events.length > 0 ? `(${events.length})` : ""}`}
        </motion.button>

        <motion.button
          id="clear-simulator-btn"
          onClick={handleClearAll}
          disabled={isLoading || events.length === 0}
          className="btn-ghost"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Clear all events"
        >
          <Trash2 size={14} />
          Clear All
        </motion.button>
      </div>
    </div>
  );
}
