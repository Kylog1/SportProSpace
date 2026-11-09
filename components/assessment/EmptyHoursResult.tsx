"use client";

import Link from "next/link";
import { ArrowRight, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackMeetingBooked } from "@/lib/analytics";
import {
  buildLossCopy,
  type LossResult,
  type TextPart,
} from "@/lib/assessment/tennis-padel-loss";

// Top of the Tennis & Padel result screen: how many off-peak court hours stand
// empty, what that is worth, and which AI agents to start with. All numbers and
// wording come from lib/assessment/tennis-padel-loss(.config).ts.

function Parts({
  parts,
  valueClassName,
}: {
  parts: TextPart[];
  valueClassName: string;
}) {
  return (
    <>
      {parts.map((p, i) =>
        p.value ? (
          <span key={i} className={`whitespace-nowrap ${valueClassName}`}>
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function EmptyHoursResult({ result }: { result: LossResult }) {
  const copy = buildLossCopy(result);

  return (
    <section className="border-b border-navy-100 bg-white">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <Badge variant="soft" className="gap-1.5 px-3 py-1">
            <Clock className="size-3.5" />
            Puste godziny na kortach
          </Badge>

          <h1 className="mt-5 text-balance text-[34px] font-semibold leading-[1.08] tracking-tightest text-navy-950 sm:text-[42px]">
            <Parts parts={copy.headline} valueClassName="text-navy-800" />
          </h1>

          {copy.untappedLine && (
            <p className="mt-4 text-balance text-[22px] font-semibold leading-snug tracking-tight text-navy-950 sm:text-[26px]">
              <Parts parts={copy.untappedLine} valueClassName="text-navy-800" />
            </p>
          )}

          {copy.paragraph && (
            <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
              <Parts
                parts={copy.paragraph}
                valueClassName="font-semibold text-navy-900"
              />
            </p>
          )}

          {copy.noOffPeakBody && (
            <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
              {copy.noOffPeakBody}
            </p>
          )}

          {copy.unknownNote && (
            <div className="mt-5 flex max-w-3xl items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3.5 text-[13.5px] leading-relaxed text-amber-900">
              <Info className="mt-0.5 size-4 shrink-0" />
              <span>{copy.unknownNote}</span>
            </div>
          )}

          {/* Agents to start with */}
          <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8">
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
              {copy.agentsTitle}
            </h2>
            {result.agents.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {result.agents.map((agent, i) => (
                  <li
                    key={agent.id}
                    className="flex items-start gap-4 rounded-lg border border-navy-100 bg-navy-50/40 p-4"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[13px] font-semibold text-white">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-[14.5px] font-semibold text-navy-950">
                        {agent.name}
                      </div>
                      <div className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                        {capitalise(agent.description)}
                      </div>
                      <div className="mt-1.5 text-[12px] text-muted-foreground">
                        Wasza odpowiedź: {agent.answerLabel}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                {copy.agentsNone}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-5 rounded-2xl border border-navy-900 bg-navy-950 p-6 text-white sm:p-8">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 whitespace-normal bg-white py-2.5 text-center text-navy-950 hover:bg-navy-100"
            >
              <Link
                href={copy.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMeetingBooked("tennis-padel-empty-hours")}
              >
                {copy.ctaLabel}
                <ArrowRight />
              </Link>
            </Button>
            <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-200">
              {copy.ctaCaption}
            </p>
          </div>

          <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
