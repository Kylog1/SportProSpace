import Link from "next/link";

// Anchor rail for the Hillwood proposal. The page is sent as a link to one
// decision maker who may forward it internally, so the agenda has to be
// readable without scrolling. Shown from xl up - below that the row would
// crowd the CTA, and the page is short enough to scroll.

const SECTIONS = [
  { href: "#punkt-wyjscia", label: "Punkt wyjścia" },
  { href: "#dlaczego-pogon", label: "Dlaczego Pogoń" },
  { href: "#kierunki", label: "Kierunki" },
  { href: "#pilotaz", label: "Pilotaż" },
  { href: "#zakres", label: "Zakres" },
  { href: "#pomiar", label: "Pomiar" },
  { href: "#inwestycja", label: "Inwestycja" },
];

export function ProposalNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/85 backdrop-blur">
      <div className="container flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="whitespace-nowrap text-[13.5px] font-semibold tracking-tight text-navy-950"
        >
          Hillwood{" "}
          <span className="font-normal text-navy-300">×</span>{" "}
          <span className="text-navy-800">Pogoń Grodzisk</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-navy-900"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakt"
          className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-md bg-navy-800 px-4 text-[13px] font-medium text-white transition-colors hover:bg-navy-900"
        >
          Porozmawiajmy
        </a>
      </div>
    </header>
  );
}
