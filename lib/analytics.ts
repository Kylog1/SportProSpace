"use client";

// Thin wrapper around @vercel/analytics custom events. homepage_view and other
// plain page views are automatic (Vercel Analytics tracks route changes on its
// own) — everything here is an explicit funnel moment from the brief.

import { track } from "@vercel/analytics";

const SPORT_EVENT_NAMES: Record<string, string[]> = {
  football: ["football_selected"],
  fitness: ["fitness_selected"],
  "tennis-padel": ["tennis_selected", "padel_selected"],
  golf: ["golf_selected"],
  swimming: ["swimming_selected"],
};

export function trackSportSelected(sport: string) {
  track("sport_selected", { sport });
  for (const name of SPORT_EVENT_NAMES[sport] ?? []) {
    track(name);
  }
}

export function trackSelfAuditStarted(sport: string) {
  track("self_audit_started", { sport });
}

export function trackAuditCompleted(sport: string, level: string) {
  track("audit_completed", { sport, level });
}

export function trackAuditResultViewed(sport: string, level: string) {
  track("audit_result_viewed", { sport, level });
}

export function trackLeadSubmitted(source: string) {
  track("lead_submitted", { source });
}

export function trackMeetingBooked(source: string) {
  track("meeting_booked", { source });
}
