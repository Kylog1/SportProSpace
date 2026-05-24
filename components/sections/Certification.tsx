import { ShieldCheck, CheckCircle2 } from "lucide-react";

const features = [
  "Przyznawany wyłącznie na podstawie zebranych danych",
  "Niezależna metodologia oceny — bez konfliktu interesów",
  "Ważny 12 miesięcy, z coroczną re-certyfikacją",
  "Pełna transparentność wyników dla zarządu klubu",
];

export function Certification() {
  return (
    <section
      id="certification"
      className="border-b border-navy-100 bg-white"
    >
      <div className="container py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Certyfikacja
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Certyfikat jakości doświadczenia w sporcie.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Niezależny znak jakości dla akademii i klubów, które mierzą i
              poprawiają doświadczenie swoich zawodników, rodziców i członków Twojego klubu.
              Element zaufania w komunikacji z odbiorcami i partnerami.
            </p>

            <ul className="mt-7 space-y-3">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[14.5px] text-navy-900"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-navy-800" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* premium badge / certificate card */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-navy-100/60 via-transparent to-navy-100/60 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-navy-200 bg-gradient-to-br from-white to-navy-50/60 p-5 shadow-[0_30px_60px_-25px_rgba(15,23,42,0.25)] sm:p-8">
              <div className="absolute right-6 top-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-700">
                Edition 2026
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-navy-800 text-white">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Sport Space Pro
                  </div>
                  <div className="text-[15px] font-semibold tracking-tight text-navy-950">
                    NPS Quality Certificate
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-navy-100 pt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Przyznano dla
                </div>
                <div className="mt-1.5 text-2xl font-semibold tracking-tight text-navy-950">
                  Akademia Sportowa
                </div>
                <div className="text-sm text-muted-foreground">
                  Sezon 2026 / 2027
                </div>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-navy-100 pt-6">
                <BadgeStat label="NPS" value="+62" />
                <BadgeStat label="Retencja" value="87%" />
                <BadgeStat label="Trust" value="4.5" />
              </div>

              <div className="mt-7 flex items-end justify-between">
                <div className="text-[11px] text-muted-foreground">
                  ID: SPS-2026-00412
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Ważny do: 06.2027
                </div>
              </div>

              {/* subtle pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full border border-navy-200/60"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full border border-navy-200/40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BadgeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-navy-100 bg-white p-3 text-center">
      <div className="text-lg font-semibold tracking-tight text-navy-900">
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
