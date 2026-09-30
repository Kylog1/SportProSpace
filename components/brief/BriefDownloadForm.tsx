"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BRIEF_FORM_ID, BRIEF_STAGES, type BriefStage } from "@/lib/brief/stages";

// Lead gate for the "Brief sponsoringowy marki" template. The file is emailed
// rather than linked, so the address is confirmed and the template is not
// sitting in /public for anyone to fetch around the form.

export function BriefDownloadForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<BriefStage | null>(null);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const ready =
    name.trim().length > 1 &&
    email.includes("@") &&
    company.trim().length > 1 &&
    stage !== null &&
    consent;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !ready) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, role, phone, stage, consent, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Nie udało się wysłać wzoru. Spróbuj ponownie.");
        return;
      }
      setSentTo(email.trim());
    } catch {
      setError("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id={BRIEF_FORM_ID}
      className={cn(
        "mt-10 scroll-mt-24 rounded-2xl border border-navy-200 bg-navy-50/60 p-6 sm:p-8",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-white sm:flex">
          <FileText className="size-6" />
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-800">
            Bezpłatny wzór · Word (.docx)
          </p>
          <h2 className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-navy-950">
            Brief sponsoringowy marki
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-navy-800">
            8 sekcji z polami do wpisania i polami wyboru oraz karta oceny
            propozycji. Wyślemy go na podany adres e-mail.
          </p>
        </div>
      </div>

      {sentTo ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-white p-5">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          <div>
            <p className="text-[15px] font-semibold text-navy-950">Wzór jest w drodze</p>
            <p className="mt-1 text-[14px] leading-relaxed text-navy-800">
              Wysłaliśmy go na <strong>{sentTo}</strong>. Jeśli nie widzisz
              wiadomości w ciągu kilku minut, sprawdź folder spam lub oferty.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Imię i nazwisko" value={name} onChange={setName} autoComplete="name" required placeholder="Anna Nowak" />
            <Field label="Email służbowy" type="email" value={email} onChange={setEmail} autoComplete="email" required placeholder="anna@firma.pl" />
            <Field label="Firma / marka" value={company} onChange={setCompany} autoComplete="organization" required placeholder="Nazwa firmy" />
            <Field label="Stanowisko (opcjonalnie)" value={role} onChange={setRole} autoComplete="organization-title" placeholder="np. Brand Manager" />
            <Field label="Telefon (opcjonalnie)" type="tel" value={phone} onChange={setPhone} autoComplete="tel" placeholder="+48 600 000 000" />
          </div>

          <fieldset className="border-t border-navy-100 pt-5">
            <legend className="sr-only">Na jakim etapie jesteście?</legend>
            <div className="text-[14px] font-medium text-navy-950">
              Na jakim etapie jesteście?
              <span className="ml-0.5 text-red-600">*</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {BRIEF_STAGES.map((opt) => {
                const active = stage === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStage(opt.id)}
                    className={cn(
                      "rounded-lg border px-4 py-2.5 text-left text-[14px] transition-all",
                      active
                        ? "border-navy-800 bg-white font-medium text-navy-950 ring-2 ring-navy-800/15"
                        : "border-navy-100 bg-white text-navy-800 hover:border-navy-300"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden
          />

          <label className="flex items-start gap-3 border-t border-navy-100 pt-5 text-[13.5px] leading-relaxed text-navy-900">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-navy-300 text-navy-800 focus:ring-navy-800/30"
            />
            <span>
              Zgadzam się na przesłanie wzoru briefu na podany adres e-mail.
              Szczegóły w{" "}
              <a href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-navy-950">
                polityce prywatności
              </a>
              .<span className="ml-0.5 text-red-600">*</span>
            </span>
          </label>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-900">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg" disabled={submitting || !ready}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Wysyłam...
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  Wyślij mi wzór briefu
                </>
              )}
            </Button>
            <p className="text-[12px] text-muted-foreground">
              Bez spamu. Danych nie przekazujemy dalej.
            </p>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="block w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[16px] text-navy-950 outline-none transition-colors placeholder:text-navy-300 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
      />
    </label>
  );
}
