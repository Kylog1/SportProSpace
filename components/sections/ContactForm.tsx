"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { trackLeadSubmitted } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        success?: boolean;
      };

      if (!res.ok || !body.success) {
        setStatus("error");
        setErrorMsg(body.error ?? "Nie udało się wysłać. Spróbuj ponownie.");
        return;
      }

      setStatus("success");
      formEl.reset();
      trackLeadSubmitted("contact-form");
    } catch {
      setStatus("error");
      setErrorMsg("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-6 text-white"
      >
        <CheckCircle2 className="size-7 text-emerald-300" aria-hidden />
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Wiadomość wysłana.</h3>
          <p className="mt-1 text-sm leading-relaxed text-navy-100/80">
            Dziękujemy. Wracamy do Ciebie z odpowiedzią w ciągu 8 godzin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 min-h-11 text-xs font-semibold text-white/80 underline-offset-4 hover:underline"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-base text-white placeholder:text-navy-200/50 focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20";
  const labelCls = "mb-1.5 block text-xs font-medium text-navy-100/85";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3.5 rounded-xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm md:p-6"
    >
      {/* honeypot — hidden from users, bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Imię i nazwisko *
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Jan Kowalski"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jan@klub.pl"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-org" className={labelCls}>
            Klub / organizacja *
          </label>
          <input
            id="cf-org"
            name="organization"
            type="text"
            required
            minLength={2}
            maxLength={200}
            autoComplete="organization"
            placeholder="KS Przykład"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Telefon <span className="text-navy-200/50">(opcjonalnie)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            placeholder="+48 ..."
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-msg" className={labelCls}>
          Wiadomość *
        </label>
        <textarea
          id="cf-msg"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          placeholder="Krótko opisz cel kontaktu — ile osób w klubie, jakie pytania badawcze, oczekiwany termin."
          className={`${inputCls} resize-none`}
        />
      </div>

      {errorMsg ? (
        <p role="alert" className="text-sm font-medium text-rose-200">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Wysyłanie...
          </>
        ) : (
          <>
            Wyślij zapytanie
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </button>

      <p className="text-[11.5px] leading-relaxed text-navy-200/65">
        Klikając „Wyślij zapytanie" wyrażasz zgodę na kontakt zwrotny.
        Twoje dane przetwarzamy wyłącznie w celu odpowiedzi na zapytanie.
      </p>
    </form>
  );
}
