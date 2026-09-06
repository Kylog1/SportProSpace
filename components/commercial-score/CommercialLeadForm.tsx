"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PersonaId } from "@/lib/commercial-score";

// Lead gate. Separate from components/assessment/LeadForm because the payload,
// the endpoint and the fields differ: an entity name instead of a club name, a
// buying-intent question used only for qualification, and a second, optional
// marketing consent kept apart from the consent required to send the result.

export const BUYING_INTENTS = [
  { id: "active", label: "Tak, aktywnie szukamy" },
  { id: "3months", label: "Tak, w ciągu najbliższych 3 miesięcy" },
  { id: "planning", label: "Jeszcze nie, ale chcemy zacząć" },
  { id: "curious", label: "Sprawdzam tylko swój wynik" },
] as const;

export type BuyingIntent = (typeof BUYING_INTENTS)[number]["id"];

export type LeadPayload = {
  name: string;
  email: string;
  entityName: string;
  phone: string;
  buyingIntent: BuyingIntent;
  consent: boolean;
  consentMarketing: boolean;
  website: string;
};

export function CommercialLeadForm({
  persona,
  chipScore,
  chipLevel,
  submitting,
  error,
  onBack,
  onSubmit,
}: {
  persona: PersonaId;
  chipScore: string;
  chipLevel: string;
  submitting: boolean;
  error: string | null;
  onBack: () => void;
  onSubmit: (lead: LeadPayload) => void;
}) {
  const isAthlete = persona === "athlete";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [entityName, setEntityName] = useState("");
  const [phone, setPhone] = useState("");
  const [buyingIntent, setBuyingIntent] = useState<BuyingIntent | null>(null);
  const [consent, setConsent] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const ready =
    name.trim().length > 1 &&
    email.includes("@") &&
    entityName.trim().length > 1 &&
    buyingIntent !== null &&
    consent;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !ready || !buyingIntent) return;
    onSubmit({
      name,
      email,
      entityName,
      phone,
      buyingIntent,
      consent,
      consentMarketing,
      website,
    });
  }

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="soft" className="gap-1.5 px-3 py-1">
              <Lock className="size-3.5" />
              Wynik jest gotowy
            </Badge>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft />
              Wróć
            </Button>
          </div>

          <h2 className="text-balance text-[30px] font-semibold leading-[1.08] tracking-tightest text-navy-950 sm:text-[38px]">
            Gdzie wysłać pełny wynik?
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Podsumowanie z rozbiciem na kategorie, największą szansą i trzema
            obszarami do poprawy wyślemy na podany adres. Zaraz po wysłaniu
            zobaczysz komplet wyników tutaj, na stronie.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white px-4 py-2 shadow-[0_4px_12px_-8px_rgba(15,23,42,0.18)]">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
              Twój wynik
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
            className="mt-8 grid gap-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Imię i nazwisko"
                value={name}
                onChange={setName}
                autoComplete="name"
                required
                placeholder="Jan Kowalski"
              />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                required
                placeholder={isAthlete ? "jan@example.com" : "jan@klub.pl"}
              />
              <Field
                label={isAthlete ? "Imię i nazwisko zawodnika" : "Nazwa organizacji"}
                value={entityName}
                onChange={setEntityName}
                autoComplete={isAthlete ? "off" : "organization"}
                required
                placeholder={isAthlete ? "Jan Kowalski" : "KS Sport Warszawa"}
              />
              <Field
                label="Telefon (opcjonalnie)"
                type="tel"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
                placeholder="+48 600 000 000"
              />
            </div>

            <fieldset className="border-t border-navy-100 pt-5">
              <legend className="sr-only">Gotowość do współpracy</legend>
              <div className="text-[14px] font-medium text-navy-950">
                {isAthlete
                  ? "Czy szukasz obecnie partnerów komercyjnych?"
                  : "Czy szukacie obecnie partnerów komercyjnych?"}
                <span className="ml-0.5 text-red-600">*</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {BUYING_INTENTS.map((opt) => {
                  const active = buyingIntent === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBuyingIntent(opt.id)}
                      className={cn(
                        "rounded-lg border px-4 py-2.5 text-left text-[14px] transition-all",
                        active
                          ? "border-navy-800 bg-navy-50/60 font-medium text-navy-950"
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
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden
            />

            <div className="grid gap-3 border-t border-navy-100 pt-5">
              <Consent checked={consent} onChange={setConsent} required>
                Zgadzam się na otrzymanie wyniku Commercial Score na podany adres
                email.
              </Consent>
              <Consent checked={consentMarketing} onChange={setConsentMarketing}>
                Chcę otrzymywać od Sport Space Pro materiały o sponsoringu i
                współpracy z markami. Możesz wypisać się w każdej chwili.
              </Consent>
            </div>

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
                    Liczę wynik...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    Pokaż mój Commercial Score
                  </>
                )}
              </Button>
              <p className="text-[12px] text-muted-foreground">
                Bez spamu. Danych nie przekazujemy dalej.
              </p>
            </div>
          </form>
        </div>
      </div>
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

function Consent({
  checked,
  onChange,
  required,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-navy-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 rounded border-navy-300 text-navy-800 focus:ring-navy-800/30"
      />
      <span>
        {children}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
    </label>
  );
}
