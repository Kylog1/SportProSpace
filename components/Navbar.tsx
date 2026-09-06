"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Self-Audit and Commercial Score sit under one "Narzędzia" item rather than as
// two more top-level links: eight flat items plus the CTA overflow the bar
// between 1024 and 1200px, which is the most common laptop width.

const TOOLS = [
  {
    href: "/self-assessment",
    label: "Self-Audit",
    note: "Gdzie tracicie klientów",
  },
  {
    href: "/commercial-score",
    label: "Commercial Score",
    note: "Ile jesteście warci dla marek",
  },
];

const navItems = [
  { href: "/#doradztwo", label: "Doradztwo" },
  { href: "/#about", label: "O nas" },
  { href: "/#jak-dzialamy", label: "Jak działamy" },
  { href: "/artykuly", label: "Artykuły" },
  { href: "/partnerzy", label: "Partnerzy" },
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

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          <ToolsMenu />
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

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild size="sm">
            <Link href="/commercial-score">Sprawdź swój potencjał</Link>
          </Button>
        </div>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-navy-100 bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="container flex flex-col gap-1 py-4">
          <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Narzędzia
          </div>
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-[15px] font-medium text-navy-800 hover:bg-navy-50"
            >
              {tool.label}
              <span className="block text-[12.5px] font-normal text-muted-foreground">
                {tool.note}
              </span>
            </Link>
          ))}

          <div className="mt-2 border-t border-navy-100 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-[15px] font-medium text-navy-800 hover:bg-navy-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-2 px-3">
            <Button asChild size="sm">
              <Link href="/commercial-score" onClick={() => setOpen(false)}>
                Sprawdź swój potencjał
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-[14px] font-medium text-navy-700 transition-colors hover:text-navy-950"
      >
        Narzędzia
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-[268px] pt-3">
          <div className="overflow-hidden rounded-xl border border-navy-100 bg-white p-1.5 shadow-[0_12px_32px_-18px_rgba(15,23,42,0.35)]">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-navy-50"
              >
                <span className="block text-[14px] font-medium text-navy-950">
                  {tool.label}
                </span>
                <span className="block text-[12.5px] text-muted-foreground">
                  {tool.note}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
