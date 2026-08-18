"use client";

// Thin wrapper around @vercel/analytics custom events. homepage_view and other
// plain page views are automatic (Vercel Analytics tracks route changes on its
// own) — everything here is an explicit funnel moment from the brief.

import { track } from "@vercel/analytics";

const SPORT_EVENT_NAMES: Record<string, string[]> = {
  football: ["football_selected"],
  fitness: ["fitness_selected"],
  "tennis-padel": ["tennis_selected", "padel_selected", "tennis_padel_selected"],
  golf: ["golf_selected"],
  swimming: ["swimming_selected"],
};

export function trackSportSelected(sport: string) {
  track("sport_selected", { sport });
  for (const name of SPORT_EVENT_NAMES[sport] ?? []) {
    track(name);
  }
}

// Each funnel step fires a generic event (comparable across disciplines) plus a
// discipline-prefixed one (easy to filter in the Vercel dashboard). The generic
// names predate the multi-sport rollout and must not be removed.
const SPORT_PREFIX: Record<string, string> = {
  football: "football",
  fitness: "fitness",
  // Tennis & Padel is one shared audit; both the combined hub card and the
  // per-discipline pick inside the audit itself roll up to the same prefix.
  "tennis-padel": "tennis_padel",
  tennis: "tennis_padel",
  padel: "tennis_padel",
};

function sportPrefix(sport: string): string | null {
  return SPORT_PREFIX[sport] ?? null;
}

export function trackSelfAuditStarted(sport: string) {
  track("self_audit_started", { sport });
  const p = sportPrefix(sport);
  if (p) track(`${p}_audit_started`);
}

export function trackAuditCompleted(sport: string, level: string) {
  track("audit_completed", { sport, level });
  const p = sportPrefix(sport);
  if (p) track(`${p}_audit_completed`, { level });
}

export function trackAuditResultViewed(sport: string, level: string) {
  track("audit_result_viewed", { sport, level });
  const p = sportPrefix(sport);
  if (p) track(`${p}_result_viewed`, { level });
}

export function trackLeadSubmitted(source: string) {
  track("lead_submitted", { source });
  // source looks like "self-assessment:fitness" or "notify-sport:golf"
  const sport = source.includes(":") ? source.split(":")[1] : "";
  const p = sportPrefix(sport);
  if (p) track(`${p}_lead_submitted`);
}

export function trackMeetingBooked(source: string) {
  track("meeting_booked", { source });
}
