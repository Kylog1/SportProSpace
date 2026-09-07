import Link from "next/link";

// Anchor rail for the proposal page. This deck is meant to be forwarded inside
// R-GOL, so a reader who lands on it cold needs to see the whole agenda at a
// glance instead of scrolling to discover it. Hidden below lg: on a phone the
// page is short enough to just scroll.

const SECTIONS = [
  { href: "#punkt-wyjscia", label: "Punkt wyjścia" },
  { href: "#dane", label: "Dane" },
  { href: "#obszary", label: "Obszary" },
  { href: "#koncepty", label: "Koncepty" },
  { href: "#pilotaz", label: "Pilotaż" },
  { href: "#kto", label: "Kto" },
];

export function ProposalNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/85 backdrop-blur">
      <div className="container flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[13.5px] font-semibold tracking-tight text-navy-950"
        >
          Sport Space Pro{" "}
          <span className="font-normal text-navy-300">×</span>{" "}
          <span className="text-navy-800">R-GOL</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-navy-900"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <a
          href="#spotkanie"
          className="inline-flex h-9 items-center rounded-md bg-navy-800 px-4 text-[13px] font-medium text-white transition-colors hover:bg-navy-900"
        >
          Umówmy spotkanie
        </a>
      </div>
    </header>
  );
}
