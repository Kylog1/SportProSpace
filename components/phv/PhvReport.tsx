import type { ReactNode } from "react";
import { FileText, PencilLine, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bySex, cm, dec, dmy, nom, signed, type PhvResult } from "@/lib/phv/calc";
import { DISCLAIMER, PHASES, PROTEIN_FOODS, SOURCES, VIDEOS, type VideoCode } from "@/lib/phv/content";
import { PhvChart } from "./PhvChart";

// Otwiera sam raport w czystej karcie. Wszystko dzieje się w przeglądarce:
// kopiujemy to, co widać na ekranie, do nowego okna. Bez adresu z danymi i bez zapisu.
function openReport() {
  const root = document.getElementById("phv-report");
  if (!root) return;
  const win = window.open("", "_blank");
  if (!win) return;
  const clone = root.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-report-hide]").forEach((el) => el.remove());
  const styles = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .map((l) => `<link rel="stylesheet" href="${l.href}">`)
    .join("");
  win.document.open();
  win.document.write(
    `<!doctype html><html lang="pl" class="${document.documentElement.className}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Raport PHV</title>${styles}</head><body class="${document.body.className} bg-white"><main style="max-width:56rem;margin:0 auto;padding:1.5rem 1rem 3rem">${clone.outerHTML}</main></body></html>`,
  );
  win.document.close();
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-navy-100 pt-6 break-inside-auto">
      <h2 className="text-xl font-semibold tracking-tight text-navy-950">{title}</h2>
      {children}
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="rounded-md bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900 print:break-inside-avoid">{children}</p>;
}

function VideoLinks({ code }: { code: VideoCode }) {
  const v: { label: string; url: string; alt?: string } = VIDEOS[code];
  return (
    <span className="mt-1.5 flex flex-wrap gap-1.5">
      <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-800 hover:bg-navy-100">
        <PlayCircle className="h-3.5 w-3.5" aria-hidden /> {v.label}
      </a>
      {v.alt && (
        <a href={v.alt} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-navy-100 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-navy-50">
          wersja EN
        </a>
      )}
    </span>
  );
}

export function PhvReport({ r, onEdit }: { r: PhvResult; onEdit: () => void }) {
  const p = PHASES[r.phaseId];
  const notes: string[] = [];
  const bestLo = bySex(r, 12, 9);
  const bestHi = bySex(r, 16, 13);
  if (r.age < bestLo || r.age > bestHi) notes.push("W twoim wieku wzór jest mniej dokładny. Powtarzaj pomiar co 3 miesiące, a obraz będzie coraz pewniejszy.");
  const early = r.aphv < bySex(r, 12.5, 10.5);
  const late = r.aphv > bySex(r, 15, 13);
  if (early || late)
    notes.push(
      `Twój wynik wskazuje na dojrzewanie wyraźnie ${early ? "wcześniejsze" : "późniejsze"} niż u rówieśników. To normalne, ale wzór zwykle przesuwa takie wyniki w stronę średniej. Twój rzeczywisty szczyt może więc wypaść jeszcze ${early ? "wcześniej" : "później"}.`,
    );
  if (r.formula === "M2") notes.push("Bez pomiaru wysokości w pozycji siedzącej użyliśmy uproszczonego wzoru. Następnym razem zmierz też wysokość siedząc, wtedy wynik będzie dokładniejszy.");

  let velocityText = "";
  if (r.velocity !== null) {
    const v = r.velocity;
    if (v >= bySex(r, 7, 6)) velocityText = "To tempo typowe dla okolic szczytu. Pilnuj jakości ruchu i codziennego rollowania.";
    else if (v >= bySex(r, 4, 3)) velocityText = "Rośniesz w umiarkowanym tempie.";
    else if (v < 3 && r.offset > 0) velocityText = "Tempo wzrostu wyraźnie spadło, więc szczyt najpewniej jest już za tobą.";
  }

  return (
    <article id="phv-report" className="flex flex-col gap-6 text-[15px] leading-relaxed text-navy-950">
      {/* Wydruk: tylko raport, bez nawigacji i stopki strony */}
      <style>{`@media print{
        body *{visibility:hidden!important}
        #phv-report,#phv-report *{visibility:visible!important}
        #phv-report{position:absolute;left:0;top:0;width:100%;padding:0 8mm;font-size:12px}
        #phv-report *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      }`}</style>

      {/* Nagłówek */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="soft">Wynik PHV</Badge>
          <span className="text-sm text-muted-foreground">
            Pomiar z dnia {dmy(r.date)} · wiek {dec(r.age)} roku · {cm(r.height)} cm · {cm(r.weight)} kg
          </span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">{r.name ? `${r.name}: twój plan na fazę wzrostu` : "Twój plan na fazę wzrostu"}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            [dec(r.aphv), "przewidywany wiek szczytu wzrostu (lata)"],
            [signed(r.offset), "lata od szczytu wzrostu (przesunięcie dojrzałości)"],
            [p.name, `faza ${p.id} z 6`],
          ].map(([big, small], i) => (
            <div key={i} className="flex flex-col gap-1 rounded-[0.625rem] border border-navy-100 bg-navy-50 p-4">
              <b className={i === 2 ? "text-lg font-semibold text-navy-800" : "text-3xl font-semibold text-navy-800"}>{big}</b>
              <span className="text-xs text-muted-foreground">{small}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 print:hidden" data-report-hide>
          <Button onClick={openReport}>
            <FileText className="mr-2 h-4 w-4" aria-hidden /> Otwórz raport
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <PencilLine className="mr-2 h-4 w-4" aria-hidden /> Zmień dane
          </Button>
        </div>
      </header>

      <Section title="Co oznacza wynik">
        <p>
          <strong>PHV</strong> (Peak Height Velocity) to moment w dojrzewaniu, gdy ciało rośnie najszybciej.{" "}
          {bySex(
            r,
            "U chłopców wypada średnio około 14. roku życia, a normalny rozrzut to mniej więcej 12–16 lat. W szczycie przybywa zwykle 8–10 cm na rok.",
            "U dziewcząt wypada średnio około 12. roku życia, a normalny rozrzut to mniej więcej 10–14 lat. W szczycie przybywa zwykle 7–9 cm na rok.",
          )}
        </p>
        <p>
          <strong>Twój wynik: {signed(r.offset)} roku.</strong> Liczba ujemna oznacza, że szczyt jest jeszcze przed tobą, dodatnia, że już za tobą, a wynik bliski zera, że jesteś w szczycie. Twój przewidywany szczyt przypada na <strong>{nom(r.peak)}</strong> (w wieku {dec(r.aphv)} roku).
        </p>
        <p>
          To szacunek. Wzór ma błąd około pół roku, więc twój wynik najpewniej mieści się między {signed(r.offset - 0.5)} a {signed(r.offset + 0.5)}. Najlepiej traktować go jako okno, a nie konkretną datę.
        </p>
        {notes.map((n) => (
          <Note key={n}>{n}</Note>
        ))}
        <PhvChart r={r} />
      </Section>

      {(r.legs !== null || r.velocity !== null) && (
        <Section title="Twoje pomiary">
          {r.legs !== null && r.sitting !== null && (
            <p>
              Nogi: ok. <strong>{cm(r.legs)} cm</strong>, tułów: <strong>{cm(r.sitting)} cm</strong>. W dojrzewaniu najpierw rosną nogi, a dopiero potem tułów. Gdy kości rosną szybko, mięśnie i ścięgna muszą je „dogonić”, dlatego w tym czasie ciało bywa sztywniejsze i mniej zgrabne.
            </p>
          )}
          {r.velocity !== null && (
            <p>
              Od ostatniego pomiaru przybywa ci średnio <strong>{dec(Math.max(0, r.velocity))} cm na rok</strong>. {velocityText}
            </p>
          )}
        </Section>
      )}

      <Section title={`Twoja faza: ${p.name}`}>
        <p>{p.what(r)}</p>
        <div className="rounded-[0.625rem] border border-navy-100 bg-navy-50 p-4 print:break-inside-avoid">
          <h3 className="mb-2 font-semibold text-navy-800">Na czym się skupić</h3>
          <ul className="list-disc space-y-1 pl-5">
            {p.focus.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
        {r.sex === "F" && p.female && <Note>{p.female}</Note>}
        <h3 className="font-semibold">Ćwiczenia w domu ({p.plan})</h3>
        <p className="text-sm text-muted-foreground">
          Każde ćwiczenie najpierw obejrzyj na filmie. Liczy się technika, nie liczba powtórzeń. Ćwiczenia bez filmu nie występują w programach FIFA 11+. Opis wystarczy, a w razie wątpliwości zapytaj trenera.
        </p>
        <div className="overflow-x-auto rounded-[0.625rem] border border-navy-100">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Ćwiczenie</th>
                <th className="px-3 py-2 font-medium">Jak wykonać</th>
                <th className="px-3 py-2 font-medium">Dawka</th>
              </tr>
            </thead>
            <tbody>
              {p.exercises.map((e) => (
                <tr key={e.name} className="border-t border-navy-100 align-top print:break-inside-avoid">
                  <td className="px-3 py-2.5 font-semibold">{e.name}</td>
                  <td className="px-3 py-2.5">
                    {e.how}
                    {e.video && <VideoLinks code={e.video} />}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">{e.dose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-[0.625rem] bg-emerald-50 p-4 text-emerald-950 print:break-inside-avoid">
          <h3 className="mb-1 font-semibold">Co dalej</h3>
          <p>{p.next(r)}</p>
        </div>
      </Section>

      <Section title="Rollowanie i rozciąganie">
        <p>
          <strong>Jak często w twojej fazie:</strong> {p.roll}
        </p>
        <p>Rolluj łydki, przód uda, tył uda, pośladki i wewnętrzną stronę uda, po ok. 45 s na stronę, oraz górną część pleców przez ok. 60 s. Toczysz się powoli, w napiętym miejscu zatrzymaj się na kilka oddechów.</p>
        <Note>Nie rolluj kości ani stawów: kolana, rzepki, guzka pod rzepką, pięty ani dolnego odcinka pleców.</Note>
        <p>Po rollerze rozciągnij przód uda, tył uda, łydki i biodro w wykroku, po 30–45 s na stronę.</p>
      </Section>

      <Section title="Kiedy zmierzyć się znowu">
        <p>
          Mierz się co {p.id === 6 ? "6 miesięcy" : "3 miesiące"}: <strong className="tabular-nums">{r.nextDates.map(dmy).join(" · ")}</strong>. Porównuj się z samym sobą sprzed kilku miesięcy, a nie z kolegami z drużyny. W jednej drużynie różnice w dojrzałości biologicznej mogą sięgać kilku lat.
        </p>
      </Section>

      <Section title="Jedzenie i suplementacja">
        <p>
          Ciało jednocześnie rośnie i trenuje, więc najczęstszym błędem jest za mało jedzenia. <strong>Żadnych diet odchudzających.</strong> Jedz 4–5 posiłków dziennie. Przed treningiem coś z węglowodanami (kanapka, banan, ryż, makaron), a po treningu posiłek z białkiem w ciągu 1–2 godzin.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[0.625rem] border border-navy-100 bg-navy-50 p-4 print:break-inside-avoid">
            <h3 className="mb-1 font-semibold text-navy-800">
              Białko: {r.protFrom}–{r.protTo} g dziennie
            </h3>
            <p className="text-sm">Rekomendacja dla młodych sportowców to 1,3–1,8 g na kg masy ciała. Najlepiej rozłożyć je na 4 porcje po ok. {r.protMeal} g, w tym jedna po treningu i jedna przed snem.</p>
          </div>
          <div className="rounded-[0.625rem] bg-amber-50 p-4 text-amber-950 print:break-inside-avoid">
            <h3 className="mb-1 font-semibold">Witamina D: {r.vitD} dziennie</h3>
            <p className="text-sm">
              Tyle zalecają polskie wytyczne dla twojego wieku, <strong>przez cały rok</strong>, chyba że od maja do września codziennie spędzasz 30–45 minut na słońcu z odkrytymi rękami i nogami. Najlepiej przyjmować ją do posiłku z tłuszczem. Raz w roku warto zbadać poziom 25(OH)D. Dawkę ustal z lekarzem.
            </p>
          </div>
        </div>
        <p className="font-semibold">Ile białka w porcji (ok.):</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PROTEIN_FOODS.map(([food, g]) => (
            <div key={food} className="flex justify-between gap-2 rounded-md border border-navy-100 px-3 py-2 text-sm">
              <span>{food}</span>
              <b className="whitespace-nowrap">{g}</b>
            </div>
          ))}
        </div>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Wapń:</strong> {r.age >= 10 ? "ok. 1300 mg dziennie, czyli mniej więcej " : ""}3–4 porcje nabiału {r.age >= 10 ? "" : "dziennie "}(kefir, jogurt naturalny, ser, twaróg, serek wiejski) albo produkty wzbogacane w wapń.
          </li>
          <li>
            <strong>Żelazo:</strong> czerwone mięso 2–3 razy w tygodniu, jaja, strączki, do tego warzywa i owoce z witaminą C. {bySex(r, "", "Po pierwszej miesiączce zapotrzebowanie na żelazo rośnie. ")}Przy zmęczeniu i spadku formy warto zrobić morfologię i ferrytynę.
          </li>
          <li>
            <strong>Omega-3:</strong> tłusta ryba (łosoś, makrela, śledź) 2 razy w tygodniu.
          </li>
          <li>
            <strong>Woda:</strong> mocz ma być jasnosłomkowy. Ok. 400–500 ml na 2 godziny przed treningiem, w trakcie łyk co 15–20 minut.
          </li>
          <li>
            <strong>Sen:</strong> 9–10 godzin. Hormon wzrostu wydziela się głównie w nocy.
          </li>
          <li>
            <strong>Nie w tym wieku:</strong> kreatyna, przedtreningówki, energetyki, spalacze tłuszczu. Odżywka białkowa nie jest potrzebna, jeśli jedzenie jest dobre.
          </li>
        </ul>
      </Section>

      <Section title="Kiedy powiedzieć rodzicom i trenerowi">
        <ul className="list-disc space-y-1 pl-5">
          <li>ból pod rzepką, w pięcie albo w dole pleców, który nie mija po kilku dniach,</li>
          <li>utykanie, obrzęk, ból w nocy albo w spoczynku,</li>
          <li>nagły spadek energii i formy, częste infekcje{bySex(r, ".", ",")}</li>
          {r.sex === "F" && <li>brak miesiączki lub bardzo nieregularne cykle mimo wcześniejszego dojrzewania, zawroty głowy, ciągłe zmęczenie.</li>}
        </ul>
        <p>W takiej sytuacji warto skonsultować się z lekarzem lub fizjoterapeutą. Nie przerywaj ruchu na własną rękę na długo. Zwykle wystarczy zmienić ćwiczenia, a nie przestać trenować.</p>
      </Section>

      <Section title="Ważne">
        <p className="rounded-[0.625rem] bg-navy-50 p-4 text-sm text-muted-foreground">{DISCLAIMER}</p>
        <h3 className="font-semibold">Źródła</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          {SOURCES.map(([text, url]) => (
            <li key={url} className="break-words">
              {text}{" "}
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-navy-800 underline underline-offset-2">
                link
              </a>
            </li>
          ))}
        </ol>
      </Section>
    </article>
  );
}
