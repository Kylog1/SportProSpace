"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackMeetingBooked } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/grzyb-krzysiek/new-meeting";

const navItems = [
  { href: "/#about", label: "O nas" },
  { href: "/#jak-dzialamy", label: "Jak działamy" },
  { href: "/self-assessment", label: "Self Assessment" },
  { href: "/artykuly", label: "Artykuły" },
  { href: "/#contact", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/80 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-[17px] font-semibold tracking-tight text-navy-950">
            Sport Space<span className="text-navy-800"> Pro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-navy-700 transition-colors hover:text-navy-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMeetingBooked("navbar")}
            >
              Umów rozmowę
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/self-assessment">Zrób darmowy Self-Audit</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-navy-100 bg-white md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="container flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-[15px] font-medium text-navy-800 hover:bg-navy-50"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 px-3">
            <Button asChild variant="outline" size="sm">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackMeetingBooked("navbar-mobile");
                  setOpen(false);
                }}
              >
                Umów rozmowę
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/self-assessment" onClick={() => setOpen(false)}>
                Zrób darmowy Self-Audit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
