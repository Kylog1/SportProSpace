import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Carries the "Dla kogo" list that used to be its own section above. That
// section was a second copy of the /self-assessment hub - same six disciplines,
// same links - so it cost a full screen of scrolling to duplicate a page that
// already exists. Here the disciplines do the one job they were really doing:
// telling a visitor the audit is built for their sport before they click.
//
// The id is kept because the footer links to /#dla-kogo.
//
// The chips are links, so they look like links: an arrow, a hover state and a
// visible focus ring. Disciplines without their own audit yet (status
// "coming-soon" in lib/assessment/sports.ts) lead to the hub, where the visitor
// can ask to be told when it is ready, and say so on the chip.

const disciplines: { label: string; href: string; soon?: true }[] = [
  { label: "Piłka nożna", href: "/self-assessment/football" },
  { label: "Fitness i wellness", href: "/self-assessment/fitness" },
  { label: "Tenis i padel", href: "/self-assessment/tennis-padel" },
  { label: "Golf", href: "/self-assessment", soon: true },
  { label: "Pływanie", href: "/self-assessment", soon: true },
  { label: "Kluby wielosekcyjne", href: "/self-assessment", soon: true },
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
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-200/70">
                Dla kogo
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {disciplines.map((d) => (
                  <Link
                    key={d.label}
                    href={d.href}
                    className={cn(
                      "group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      d.soon
                        ? "border-dashed border-white/30 text-navy-100/80 hover:border-white/60 hover:bg-white/10 hover:text-white"
                        : "border-white/20 bg-white/5 text-navy-100 hover:border-white/50 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {d.label}
                    {d.soon ? (
                      <span className="text-xs font-normal text-navy-200/80 group-hover:text-white">
                        wkrótce
                      </span>
                    ) : (
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                      />
                    )}
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
