"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Shared lead-capture step for every Self-Audit discipline. Markup moved
// verbatim out of components/SelfAssessment.tsx; only the copy, the summary
// chip and the `sport` field on the payload vary per discipline.

export function LeadForm({
  answers,
  questionIds,
  sport,
  reportDescription,
  chipScore,
  chipLevel,
  onBack,
  onSuccess,
}: {
  answers: Record<string, number>;
  /** Every question that must be answered before submitting, in order. */
  questionIds: string[];
  /** Sent to the API so leads can be segmented by discipline. */
  sport: string;
  /** Sentence describing what the emailed report contains. */
  reportDescription: string;
  /** Right-hand side of the score chip, e.g. "33 / 60" or "72 / 100". */
  chipScore: string;
  /** Maturity level name shown next to the score. */
  chipLevel: string;
  onBack: (targetIdx?: number) => void;
  onSuccess: (email: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missingIdx, setMissingIdx] = useState<number | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setMissingIdx(null);

    // Defense in depth: a double-click on a quiz answer could have caused
    // an auto-advance to skip a question. Refuse to submit if any answer
    // is missing, and send the user back to the first unanswered one.
    const firstMissing = questionIds.findIndex((id) => answers[id] == null);
    if (firstMissing !== -1) {
      const missingCount = questionIds.filter((id) => answers[id] == null).length;
      setMissingIdx(firstMissing);
      setError(
        missingCount === 1
          ? `Brakuje odpowiedzi na 1 pytanie. Uzupełnij je i wyślij ponownie.`
          : `Brakuje odpowiedzi na ${missingCount} pytań. Uzupełnij je i wyślij ponownie.`
      );
      return;
    }

    if (!consent) {
      setError("Wymagana zgoda na otrzymanie raportu.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organization,
          phone,
          consent,
          website,
          answers,
          sport,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Nie udało się wysłać raportu. Spróbuj ponownie.");
        setSubmitting(false);
        return;
      }
      onSuccess(email);
    } catch {
      setError("Problem z połączeniem. Spróbuj ponownie.");
      setSubmitting(false);
    }
  }

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="soft" className="gap-1.5 px-3 py-1">
              <CheckCircle2 className="size-3.5" />
              Ostatni krok
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => onBack()}>
              <ArrowLeft />
              Wróć do pytań
            </Button>
          </div>

          <h1 className="text-balance text-[32px] font-semibold leading-[1.08] tracking-tightest text-navy-950 sm:text-[38px]">
            Gdzie wysłać Wasz raport?
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            {reportDescription}
          </p>

          {/* Result preview chip */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white px-4 py-2 shadow-[0_4px_12px_-8px_rgba(15,23,42,0.18)]">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
              Wynik
            </span>
            <span className="text-[14px] font-semibold text-navy-950">
              {chipScore}
            </span>
            <span className="text-[12px] text-navy-700">·</span>
            <span className="text-[13px] font-medium text-navy-800">
              {chipLevel}
            </span>
          </div>

          <form
            onSubmit={submit}
            className="mt-8 grid gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Imię i nazwisko"
                value={name}
                onChange={setName}
                autoComplete="name"
                required
                placeholder="Jan Kowalski"
              />
              <FormField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                required
                placeholder="jan@klub.pl"
              />
              <FormField
                label="Klub / organizacja"
                value={organization}
                onChange={setOrganization}
                autoComplete="organization"
                required
                placeholder="Akademia Sport Warszawa"
              />
              <FormField
                label="Telefon (opcjonalnie)"
                type="tel"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
                placeholder="+48 600 000 000"
              />
            </div>

            {/* Honeypot - hidden from users */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden
            />

            <label className="mt-2 flex items-start gap-3 text-[13.5px] leading-relaxed text-navy-900">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-4 shrink-0 rounded border-navy-300 text-navy-800 focus:ring-navy-800/30"
              />
              <span>
                Zgadzam się na otrzymanie raportu PDF i kontakt w sprawie
                badania satysfakcji. Bez spamu, możesz wypisać się w każdej
                chwili.
              </span>
            </label>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-900">
                <div>{error}</div>
                {missingIdx !== null && (
                  <button
                    type="button"
                    onClick={() => onBack(missingIdx)}
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-red-900 underline underline-offset-2 hover:text-red-700"
                  >
                    <ArrowLeft className="size-3.5" />
                    Wróć do pytania {missingIdx + 1}
                  </button>
                )}
              </div>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={submitting || !name || !email || !organization || !consent}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Wysyłam raport...
                  </>
                ) : (
                  <>
                    <Mail className="size-4" />
                    Wyślij mi raport PDF
                  </>
                )}
              </Button>
              <p className="text-[12px] text-muted-foreground">
                Raport dotrze w ciągu kilkudziesięciu sekund.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({
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
        className="block w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[15px] text-navy-950 outline-none transition-colors placeholder:text-navy-300 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
      />
    </label>
  );
}
