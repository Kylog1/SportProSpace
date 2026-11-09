"use client";

import { useEffect, useRef } from "react";

import { drawStadium, type StadiumAnchors } from "./draw-stadium";
import { HERO_SAMPLE } from "./hero-sample-data";

type ChipKey = keyof StadiumAnchors;

/**
 * The decorative stadium. Everything it shows is also available as text in the
 * hero (KPI board, sr-only description), so the whole stage is aria-hidden.
 * It is the only part of the hero that draws on a canvas and the only code that
 * runs in the browser for it: the canvas is drawn in an effect, once per
 * resize, and never animates.
 */
export function HeroStadiumCanvas({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chips = useRef<Record<ChipKey, HTMLSpanElement | null>>({
    boards: null,
    seats: null,
    exits: null,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    // Same breakpoint as Tailwind's `lg:`, which switches the stage from its
    // own block (narrow) to the full-hero background (wide).
    const wideQuery = window.matchMedia("(min-width: 1024px)");

    let frame = 0;
    const render = () => {
      frame = 0;
      const { width, height } = wrap.getBoundingClientRect();
      if (width < 2 || height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const layout = wideQuery.matches ? "wide" : "narrow";
      const anchors = drawStadium(ctx, {
        width,
        height,
        dpr,
        layout,
        sample: HERO_SAMPLE,
      });
      (Object.keys(chips.current) as ChipKey[]).forEach((key) => {
        const el = chips.current[key];
        if (!el) return;
        const a = anchors[key];
        // The inline style wins over the `hidden` class, which only keeps the
        // chips out of the first paint.
        el.style.display = layout === "wide" ? "block" : "none";
        el.style.transform = `translate(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px) translate(${
          a.align === "right" ? "-100%" : "-50%"
        }, -50%)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(wrap);
    wideQuery.addEventListener("change", schedule);
    schedule();
    return () => {
      observer.disconnect();
      wideQuery.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const chipBase =
    "absolute left-0 top-0 hidden whitespace-nowrap border bg-space-bg/95 px-2.5 py-1 font-hud text-xs font-semibold will-change-transform";

  return (
    <div ref={wrapRef} aria-hidden="true" className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span
        ref={(el) => {
          chips.current.seats = el;
        }}
        className={`${chipBase} border-space-promoter text-space-promoter`}
      >
        TRYBUNY · NPS
      </span>
      <span
        ref={(el) => {
          chips.current.boards = el;
        }}
        className={`${chipBase} border-space-cyan text-space-cyan`}
      >
        BANDY · COMMERCIAL SCORE
      </span>
      <span
        ref={(el) => {
          chips.current.exits = el;
        }}
        className={`${chipBase} border-space-coral text-space-coral`}
      >
        WYJŚCIA · CHURN
      </span>
    </div>
  );
}
