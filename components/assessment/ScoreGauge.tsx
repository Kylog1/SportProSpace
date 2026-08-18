"use client";

import { cn } from "@/lib/utils";

// Shared circular score dial. Moved verbatim out of components/SelfAssessment.tsx
// so Football renders exactly as before; `caption` was added so a discipline
// scored directly on 0-100 can suppress the redundant percentage line.

export function ScoreGauge({
  value,
  max,
  pct,
  caption,
}: {
  value: number;
  max: number;
  pct: number;
  /** Text under the value. Defaults to "<pct>%"; pass null to hide. */
  caption?: string | null;
}) {
  const size = 160;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  const color =
    pct < 40
      ? "stroke-red-500"
      : pct < 60
      ? "stroke-amber-500"
      : pct < 80
      ? "stroke-blue-600"
      : "stroke-emerald-600";

  const captionText = caption === undefined ? `${pct}%` : caption;

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            className="fill-none stroke-navy-100"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className={cn("fill-none transition-all duration-700", color)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[28px] font-semibold leading-none tracking-tight text-navy-950">
            {value}
            <span className="text-[14px] font-medium text-muted-foreground">
              /{max}
            </span>
          </div>
          {captionText !== null && (
            <div className="mt-1 text-[12px] font-medium text-muted-foreground">
              {captionText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
