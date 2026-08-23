"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { trackMeetingBooked } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";

// Secondary CTA inside the dark contact panel: for people who would rather book
// a slot than fill in the form. Styling is hand-rolled because the shared Button
// variants are tuned for light backgrounds.
export function BookingLink() {
  return (
    <Link
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackMeetingBooked("contact-section")}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
    >
      <CalendarDays className="size-4" aria-hidden />
      Umów rozmowę
    </Link>
  );
}
