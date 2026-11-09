"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackMeetingBooked } from "@/lib/analytics";

/**
 * External booking link that reports a `meeting_booked` event, as the previous
 * hero did. It exists only so the hero itself can stay a Server Component:
 * the click handler is the single piece of browser code the buttons need.
 */
export function TrackedBookingLink({
  href,
  source,
  className,
  children,
}: {
  href: string;
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackMeetingBooked(source)}
    >
      {children}
    </Link>
  );
}
