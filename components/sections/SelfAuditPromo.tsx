import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Carries the "Dla kogo" list that used to be its own section above. That
// section was a second copy of the /self-assessment hub - same six disciplines,
// same links - so it cost a full screen of scrolling to duplicate a page that
// already exists. Here the disciplines do the one job they were really doing:
// telling a visitor the audit is built for their sport before they click.
//
// The id is kept because the footer links to /#dla-kogo.

const disciplines = [
  { label: "Piłka nożna", href: "/self-assessment/football" },
  { label: "Fitness i wellness", href: "/self-assessment/fitness" },
  { label: "Tenis i padel", href: "/self-assessment/tennis-padel" },
  { label: "Golf", href: "/self-assessment" },
  { label: "Pływanie", href: "/self-assessment" },
  { label: "Kluby wielosekcyjne", href: "/self-assessment" },
];

export function SelfAuditPromo() {
  return (
    <section id="dla-kogo" className="border-b border-navy-100 bg-white">
      <div className="container py-20 md:py-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-navy-200 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 px-8 py-14 text-white md:px-16 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/5 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-lg border border-white/20 bg-white/10">
              <ClipboardCheck className="size-6" />
            </div>

            <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-[40px] md:leading-[1.1]">
              Sprawdź potencjał swojego klubu.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-navy-100/80">
              W kilka minut sprawdzisz, gdzie Twój klub jest mocny, gdzie
              traci potencjał i od czego warto zacząć.
            </p>

            <div className="mt-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-200/70">
                Dla kogo
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {disciplines.map((d) => (
                  <Link
                    key={d.label}
                    href={d.href}
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-navy-100 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[12.5px] text-navy-100/70">
              <span>Dopasowane do dyscypliny</span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" />
              <span>Kilka minut</span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" />
              <span>Wynik + rekomendacje na start</span>
            </div>

            <Button asChild size="lg" className="mt-8 bg-white text-navy-950 hover:bg-navy-100">
              <Link href="/self-assessment">
                Zrób darmowy Self-Audit
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
