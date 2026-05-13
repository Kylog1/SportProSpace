import { ContactForm } from "@/components/sections/ContactForm";

export function CTASection() {
  return (
    <section id="contact" className="bg-white">
      <div className="container py-20 md:py-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-navy-200 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 px-8 py-14 text-white md:px-16 md:py-20">
          {/* subtle pattern */}
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

          <div className="relative grid items-start gap-10 md:grid-cols-2 md:gap-14">
            <div className="md:pt-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-200/90">
                Zacznij teraz
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-[40px] md:leading-[1.1]">
                Zacznij mierzyć doświadczenie w Twoim klubie.
              </h2>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-navy-100/80">
                Pierwsza rozmowa jest niezobowiązująca. Wracamy do Ciebie z
                rekomendacją zakresu badania w 8 godzin.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1 text-[12.5px] text-navy-100/70">
                <span>Odpowiadamy w 8h</span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span>Bez zobowiązań</span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span>NDA na życzenie</span>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
