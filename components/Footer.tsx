import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <span className="text-[17px] font-semibold tracking-tight text-navy-950">
                Sport Pro<span className="text-navy-800"> Space</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Niezależna platforma diagnozy doświadczenia w sporcie. Badania,
              analiza danych i certyfikacja jakości dla akademii i klubów.
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-navy-950">
              Platforma
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-700">
              <li>
                <Link href="#how-we-help" className="hover:text-navy-950">
                  Usługi
                </Link>
              </li>
              <li>
                <Link href="#certification" className="hover:text-navy-950">
                  Certyfikat
                </Link>
              </li>
              <li>
                <Link href="#sports" className="hover:text-navy-950">
                  Dyscypliny
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-navy-950">
              Kontakt
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-700">
              <li>
                <a
                  href="mailto:hello@sportspacepro.pl"
                  className="hover:text-navy-950"
                >
                  hello@sportspacepro.pl
                </a>
              </li>
              <li>
                <a href="tel:+48000000000" className="hover:text-navy-950">
                  +48 532 413 777
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-navy-100 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Sport Pro Space. Wszystkie prawa zastrzeżone.</span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-navy-900">
              Polityka prywatności
            </Link>
            <Link href="#" className="hover:text-navy-900">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
