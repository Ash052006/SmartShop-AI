import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  confidence: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

export function ConfidenceGauge({
  confidence,
  color,
  size = 100,
  strokeWidth = 8,
}: ConfidenceGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedConfidence = Math.min(100, Math.max(0, confidence));
  const strokeDashoffset = circumference - (clampedConfidence / 100) * circumference;

  // Animate counter
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayValue(Math.round(eased * clampedConfidence));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [clampedConfidence]);

  // Color based on confidence level
  const getConfidenceLabel = () => {
    if (confidence >= 90) return { label: "Very High", textColor: "text-emerald-400" };
    if (confidence >= 75) return { label: "High", textColor: "text-green-400" };
    if (confidence >= 55) return { label: "Medium", textColor: "text-yellow-400" };
    return { label: "Low", textColor: "text-red-400" };
  };

  const { label, textColor } = getConfidenceLabel();

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}60)`,
            }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-slate-100 leading-none tabular-nums">
            {displayValue}
            <span className="text-xs font-medium text-slate-400">%</span>
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-0.5">
        <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
        <span className="text-[10px] text-slate-600">Confidence</span>
      </div>
    </div>
  );
}
