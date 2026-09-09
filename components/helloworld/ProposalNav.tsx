import Link from "next/link";

const SECTIONS = [
  { href: "#punkt-wyjscia", label: "Punkt wyjścia" },
  { href: "#oferta", label: "Oferta" },
  { href: "#dedykowane", label: "Działania" },
  { href: "#zasieg", label: "Zasięg" },
  { href: "#pomiar", label: "Pomiar" },
  { href: "#inwestycja", label: "Inwestycja" },
  { href: "#co-dalej", label: "Co dalej" },
];

export function ProposalNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/85 backdrop-blur">
      <div className="container flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[13.5px] font-semibold tracking-tight text-navy-950"
        >
          HelloWorld{" "}
          <span className="font-normal text-navy-300">×</span>{" "}
          <span className="text-navy-800">Pogoń Grodzisk Mazowiecki</span>
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
      </div>
    </header>
  );
}
