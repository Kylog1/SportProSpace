import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <span className="text-[17px] font-semibold tracking-tight text-navy-950">
                Sport Space<span className="text-navy-800"> Pro</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Growth &amp; Experience Intelligence dla klubów i organizacji
              sportowych. Badania, analiza danych i Self-Audit dopasowane do
              Twojej dyscypliny.
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-navy-950">
              Platforma
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-700">
              <li>
                <Link href="/#jak-dzialamy" className="hover:text-navy-950">
                  Jak działamy
                </Link>
              </li>
              <li>
                <Link href="/#dla-kogo" className="hover:text-navy-950">
                  Dla kogo
                </Link>
              </li>
              <li>
                <Link href="/self-assessment" className="hover:text-navy-950">
                  Self-Audit
                </Link>
              </li>
              <li>
                <Link href="/partnerzy" className="hover:text-navy-950">
                  Partnerzy
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
          <span>© {new Date().getFullYear()} Sport Space Pro. Wszystkie prawa zastrzeżone.</span>
          <div className="flex items-center gap-5">
            <Link href="/polityka-prywatnosci" className="hover:text-navy-900">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="hover:text-navy-900">
              Regulamin
            </Link>
            <div className="flex items-center gap-3 border-l border-navy-100 pl-5">
              <a
                href="https://www.linkedin.com/company/sport-space-pro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-navy-700 hover:text-navy-950"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://www.instagram.com/sport_space_pro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-navy-700 hover:text-navy-950"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61593570542780"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-navy-700 hover:text-navy-950"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
