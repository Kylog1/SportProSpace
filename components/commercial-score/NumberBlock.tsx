"use client";

import { ArrowLeft, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AudienceChannelDef, AudienceValue } from "@/lib/commercial-score";

// Audience numbers, all on one screen.
//
// The diagnostic questions advance one per screen because that keeps momentum,
// but these fields deliberately do not: the visitor has to leave for Instagram,
// TikTok and their CRM to look numbers up, and coming back to a one-field-at-a
// -time flow each time is punishing. Showing the whole list lets them fill in
// what they know, go get the rest, and see how much is left.
//
// Nothing here is required. A field the visitor cannot answer is handled by the
// model, not by validation - forcing a number they do not have is the single
// most common reason people abandon a form like this.

export type ExtraField = {
  id: string;
  label: string;
  hint?: string;
  placeholder?: string;
};

function formatNumber(v: number): string {
  return v.toLocaleString("pl-PL").replace(/ /g, " ");
}

/** Accepts "12 000", "12.000", "12,000" - people paste numbers as they see them. */
function parseNumber(raw: string): number | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits === "") return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

export function NumberBlock({
  channels,
  extraField,
  values,
  onChange,
  onNext,
  onPrev,
  title,
  intro,
}: {
  channels: AudienceChannelDef[];
  /** Unscored input that feeds the quality multiplier (athlete: avg views). */
  extraField?: ExtraField;
  values: Record<string, AudienceValue>;
  onChange: (id: string, value: AudienceValue) => void;
  onNext: () => void;
  onPrev: () => void;
  title: string;
  intro: string;
}) {
  const rows: (AudienceChannelDef | ExtraField)[] = extraField
    ? [...channels, extraField]
    : channels;

  const filled = rows.filter((r) => {
    const v = values[r.id];
    return v === "n/a" || (typeof v === "number" && v >= 0);
  }).length;

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Badge variant="soft" className="gap-1.5 px-3 py-1">
              <BarChart3 className="size-3.5" />
              Ostatni krok przed wynikiem
            </Badge>
            <div className="text-[12px] font-medium text-muted-foreground">
              Uzupełnione: {filled} z {rows.length}
            </div>
          </div>

          <h2 className="text-balance text-[28px] font-semibold leading-[1.1] tracking-tightest text-navy-950 sm:text-[34px]">
            {title}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
            {intro}
          </p>

          <div className="mt-8 grid gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-7">
            {rows.map((row) => {
              const naLabel = "naLabel" in row ? row.naLabel : undefined;
              return (
                <NumberField
                  key={row.id}
                  id={row.id}
                  label={row.label}
                  hint={row.hint}
                  placeholder={row.placeholder}
                  naLabel={naLabel}
                  value={values[row.id] ?? null}
                  onChange={(v) => onChange(row.id, v)}
                />
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft />
              Wstecz
            </Button>
            <Button size="lg" onClick={onNext}>
              Pokaż mój wynik
              <ArrowRight />
            </Button>
          </div>
          <p className="mt-3 text-[12.5px] text-muted-foreground">
            Puste pole traktujemy jako brak kanału. Nie musisz podawać
            wszystkiego, żeby zobaczyć wynik.
          </p>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  id,
  label,
  hint,
  placeholder,
  naLabel,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  placeholder?: string;
  naLabel?: string;
  value: AudienceValue;
  onChange: (v: AudienceValue) => void;
}) {
  const isNa = value === "n/a";
  const display = typeof value === "number" ? formatNumber(value) : "";

  return (
    <div className="grid gap-2 border-b border-navy-100 pb-4 last:border-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4">
      <div className="min-w-0">
        <label
          htmlFor={`cs-${id}`}
          className="text-[14.5px] font-medium text-navy-950"
        >
          {label}
        </label>
        {hint && (
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">
            {hint}
          </p>
        )}
        {naLabel && (
          <button
            type="button"
            onClick={() => onChange(isNa ? null : "n/a")}
            className={cn(
              "mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
              isNa
                ? "border-navy-800 bg-navy-800 text-white"
                : "border-navy-200 bg-white text-navy-700 hover:border-navy-400"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isNa ? "bg-white" : "bg-navy-300"
              )}
            />
            {naLabel}
          </button>
        )}
      </div>

      <input
        id={`cs-${id}`}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        disabled={isNa}
        value={display}
        placeholder={placeholder}
        onChange={(e) => onChange(parseNumber(e.target.value))}
        className={cn(
          "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[16px] font-medium text-navy-950 outline-none transition-colors",
          "placeholder:font-normal placeholder:text-navy-300",
          "focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20",
          "disabled:cursor-not-allowed disabled:bg-navy-50 disabled:text-navy-300",
          "sm:w-[168px] sm:text-right"
        )}
      />
    </div>
  );
}
