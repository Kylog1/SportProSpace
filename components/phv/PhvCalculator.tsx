"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Calculator, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { compute, todayStr, validate, type PhvRaw, type PhvResult } from "@/lib/phv/calc";
import { PhvReport } from "./PhvReport";

// Ważne: ten komponent nie wysyła danych nigdzie. Nie podpinaj wartości pól
// pod analitykę (Vercel Analytics track(), GTM, nagrywanie sesji).

const EMPTY: PhvRaw = { sex: "M", name: "", birth: "", date: "", height: "", sitting: "", weight: "", prevDate: "", prevHeight: "" };

const inputCls =
  "h-10 w-full rounded-md border border-navy-100 bg-white px-3 text-sm text-navy-950 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-800";

function Field({ id, label, hint, children, full }: { id: string; label: string; hint?: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={full ? "flex flex-col gap-1.5 sm:col-span-2" : "flex flex-col gap-1.5"}>
      <label htmlFor={id} className="text-sm font-medium text-navy-950">
        {label} {hint && <span className="font-normal text-muted-foreground">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

export function PhvCalculator() {
  const [raw, setRaw] = useState<PhvRaw>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<PhvResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  // Data pomiaru = dziś (ustawiana po stronie klienta, bez różnic przy renderowaniu na serwerze).
  useEffect(() => {
    setRaw((r) => (r.date ? r : { ...r, date: todayStr() }));
  }, []);

  const set = (k: keyof PhvRaw) => (e: { target: { value: string } }) => setRaw((r) => ({ ...r, [k]: e.target.value }));

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const v = validate(raw);
    if (!v.input) {
      setErrors(v.errors);
      requestAnimationFrame(() => errRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
      return;
    }
    setErrors([]);
    setResult(compute(v.input));
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function onReset() {
    setRaw({ ...EMPTY, date: todayStr() });
    setErrors([]);
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      {result ? (
        <Card className="border-navy-100">
          <CardContent className="p-5 sm:p-8">
            <PhvReport r={result} onEdit={() => setResult(null)} />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-navy-100">
          <CardContent className="p-5 sm:p-8">
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <fieldset className="flex flex-col gap-1.5 sm:col-span-2">
                <legend className="mb-1.5 text-sm font-medium text-navy-950">Płeć</legend>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["M", "Chłopiec"],
                      ["F", "Dziewczynka"],
                    ] as const
                  ).map(([val, lbl]) => (
                    <label
                      key={val}
                      className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm ${raw.sex === val ? "border-navy-800 bg-navy-50 font-semibold text-navy-800" : "border-navy-100"}`}
                    >
                      <input type="radio" name="phv-sex" value={val} checked={raw.sex === val} onChange={() => setRaw((r) => ({ ...r, sex: val }))} className="accent-navy-800" />
                      {lbl}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field id="phv-name" label="Imię" hint="nieobowiązkowe, tylko do nagłówka dokumentu" full>
                <input id="phv-name" type="text" maxLength={40} autoComplete="off" value={raw.name} onChange={set("name")} className={inputCls} />
              </Field>
              <Field id="phv-birth" label="Data urodzenia">
                <input id="phv-birth" type="date" value={raw.birth} onChange={set("birth")} className={inputCls} />
              </Field>
              <Field id="phv-date" label="Data pomiaru">
                <input id="phv-date" type="date" value={raw.date} onChange={set("date")} className={inputCls} />
              </Field>
              <Field id="phv-height" label="Wzrost (cm)">
                <input id="phv-height" type="number" inputMode="decimal" step="0.1" value={raw.height} onChange={set("height")} className={inputCls} />
              </Field>
              <Field id="phv-sitting" label="Wysokość w pozycji siedzącej (cm)" hint={raw.sex === "F" ? "nieobowiązkowe" : "zalecane"}>
                <input id="phv-sitting" type="number" inputMode="decimal" step="0.1" value={raw.sitting} onChange={set("sitting")} className={inputCls} />
              </Field>
              <Field id="phv-weight" label="Waga (kg)" hint="tylko do wyliczeń żywieniowych">
                <input id="phv-weight" type="number" inputMode="decimal" step="0.1" value={raw.weight} onChange={set("weight")} className={inputCls} />
              </Field>

              <details className="rounded-md bg-navy-50 px-4 py-3 sm:col-span-2">
                <summary className="cursor-pointer text-sm font-medium">Poprzedni pomiar (nieobowiązkowe): policz tempo wzrostu</summary>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <Field id="phv-prev-date" label="Data poprzedniego pomiaru">
                    <input id="phv-prev-date" type="date" value={raw.prevDate} onChange={set("prevDate")} className={inputCls} />
                  </Field>
                  <Field id="phv-prev-height" label="Wzrost wtedy (cm)">
                    <input id="phv-prev-height" type="number" inputMode="decimal" step="0.1" value={raw.prevHeight} onChange={set("prevHeight")} className={inputCls} />
                  </Field>
                </div>
              </details>

              <details className="rounded-md bg-navy-50 px-4 py-3 sm:col-span-2">
                <summary className="cursor-pointer text-sm font-medium">Jak mierzyć?</summary>
                <p className="mt-2 text-sm leading-relaxed">
                  Mierz rano, boso, zawsze w tym samym miejscu. <strong>Wzrost:</strong> pięty, pośladki i łopatki przy ścianie, wzrok prosto. <strong>Wysokość siedząc:</strong> usiądź na podłodze lub niskiej, twardej ławce plecami do ściany, pupa i kość ogonowa dosunięte do ściany, plecy wyprostowane. Mierz od powierzchni, na której siedzisz, do czubka głowy. Jeśli siedzisz na ławce, odejmij jej wysokość. Każdy pomiar zrób dwa razy i wpisz średnią.
                </p>
              </details>

              {errors.length > 0 && (
                <div ref={errRef} role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 sm:col-span-2">
                  <p className="font-semibold">Popraw dane:</p>
                  <ul className="mt-1 list-disc pl-5">
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <Button type="submit">
                  <Calculator className="mr-2 h-4 w-4" aria-hidden /> Oblicz i pokaż plan
                </Button>
                <Button type="button" variant="outline" onClick={onReset}>
                  Wyczyść
                </Button>
              </div>

              <p className="flex items-start gap-2 text-xs text-muted-foreground sm:col-span-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-navy-800" aria-hidden />
                Twoje dane nie są nigdzie wysyłane ani zapisywane. Wynik liczy się wyłącznie w Twojej przeglądarce i znika po zamknięciu strony. Jeśli chcesz go zachować, zapisz dokument jako PDF.
              </p>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
