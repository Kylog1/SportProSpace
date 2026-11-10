"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  spaceButton,
  spaceButtonPrimary,
  spaceButtonSm,
} from "@/components/sections/hero/space-button";

// The header is dark on every page, in the hero's language (DESIGN.md, "Hero and
// header"): one state, no change on scroll. "Kontakt" is the header button, not
// a menu item, so the menu stays short.
const navItems = [
  { href: "/narzedzia", label: "Narzędzia" },
  { href: "/#doradztwo", label: "Oferta" },
  { href: "/#about", label: "O nas" },
  { href: "/#jak-dzialamy", label: "Jak działamy" },
  { href: "/artykuly", label: "Artykuły" },
  { href: "/partnerzy", label: "Partnerzy" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-space-cyan";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-space-ink-2/20 bg-space-bg/95 text-space-ink backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-6 px-gutter">
        <Link
          href="/"
          className={cn(
            "whitespace-nowrap font-hero text-[13px] font-extrabold uppercase tracking-[0.12em] [font-stretch:125%]",
            focusRing
          )}
        >
          Sport Space<span className="text-space-blue-hi"> Pro</span>
        </Link>

        {/* Menu links are Inter, like the rest of the site (the monospaced
            uppercase of the hero stays on its buttons and labels). */}
        <nav
          aria-label="Główna nawigacja"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap font-sans text-[14px] font-medium text-space-ink transition-colors hover:text-space-promoter",
                focusRing
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/#contact"
            className={cn(spaceButton, spaceButtonSm, spaceButtonPrimary)}
          >
            Kontakt
          </Link>
        </div>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex size-11 items-center justify-center text-space-ink hover:bg-space-ink/10 lg:hidden",
            focusRing
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-space-ink-2/20 bg-space-bg lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 px-gutter py-4">
          <div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-3 font-sans text-[15px] font-medium text-space-ink hover:bg-space-ink/10",
                  focusRing
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2 px-3">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className={cn(spaceButton, spaceButtonPrimary, "w-full")}
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
