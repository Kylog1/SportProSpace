// Recommendation bank.
//
// Every line here is written by hand and keyed to a question id. Nothing is
// generated, nothing is randomised: the same answers always produce the same
// advice. This is the file to edit when the wording of the result screen needs
// to change - no scoring code depends on it.
//
// Lines are written for someone scoring low on that question, because that is
// the only situation in which they are shown (see buildImprovements() in
// scoring.ts, which picks the weakest answer inside each weak category).

const RECOMMENDATIONS: Record<string, string> = {
  // ── Organization: Positioning & Offer ────────────────────────────────────
  of1: "Zapiszcie jedno zdanie odpowiadające, co firma zyskuje na współpracy z Wami - nie czego Wy potrzebujecie. Bez tego zdania każda rozmowa zaczyna się od tłumaczenia, zamiast od propozycji.",
  of2: "Przygotujcie ofertę z trzema pakietami i cenami. Partner, który musi zapytać o cenę, w połowie przypadków nie zapyta.",
  of3: "Zacznijcie rozmowę od pytania, co firma chce osiągnąć, i dopiero potem dobierajcie aktywa. Ta sama prezentacja wysyłana wszystkim jest najczęstszym powodem braku odpowiedzi.",

  // ── Organization: Commercial Assets ──────────────────────────────────────
  as1: "Spiszcie wszystkie aktywa w jednej tabeli: co to jest, ile tego jest, kto to widzi. Większość organizacji sprzedaje wyłącznie te aktywa, które sama ma przed oczami.",
  as2: "Wyjdźcie poza logo i banery. Content, akademia, społeczność i wydarzenia to aktywa, które nie wymagają nowej infrastruktury, a poszerzają ofertę o rzeczy niemożliwe do porównania z cennikiem reklamy.",
  as3: "Opiszcie swoje formaty cyfrowe jak produkt: nazwa, zasięg, częstotliwość, miejsce dla partnera. Bez tego digital pozostaje dodatkiem, a nie pozycją w ofercie.",

  // ── Organization: B2B & Hospitality ──────────────────────────────────────
  bb1: "Zbudujcie prosty format goszczenia partnerów przy okazji wydarzeń, które i tak organizujecie. Dla wielu firm możliwość zaproszenia klienta jest wartościowsza niż ekspozycja logo.",
  bb2: "Zaproście lokalnych przedsiębiorców na jedno spotkanie w roku. To najtańszy sposób zbudowania listy firm, z którymi rozmowa o sponsoringu zaczyna się od znajomości, a nie od zimnego maila.",

  // ── Organization: Sales Capability ───────────────────────────────────────
  sa1: "Wskażcie jedną osobę odpowiedzialną za sponsoring i dajcie jej na to konkretny czas w tygodniu. Sponsoring bez właściciela pozostaje efektem przypadkowych znajomości.",
  sa2: "Zbudujcie listę 20 firm, do których chcecie dotrzeć w tym sezonie. Bez listy nie ma czego mierzyć ani z czego rozliczać.",
  sa3: "Ustalcie stały rytm kontaktów - choćby pięć firm tygodniowo. Sponsoring rzadko przychodzi sam; przychodzi do tych, którzy się odzywają regularnie.",
  sa4: "Zapisujcie każdą rozmowę w jednym miejscu, ze statusem i datą kolejnego kroku. Rozmowy, które nie mają następnego kroku, kończą się bez decyzji.",

  // ── Organization: Activation & Measurement ───────────────────────────────
  ac1: "Zaplanujcie dla każdego partnera minimum jedną aktywację poza ekspozycją logo. Sama ekspozycja jest najłatwiejsza do wycięcia z budżetu przy pierwszych oszczędnościach.",
  ac2: "Wysyłajcie partnerom krótki raport z efektów, nawet jednostronicowy. Sponsor, który nie widzi wyniku, nie ma czym uzasadnić przedłużenia umowy u siebie w firmie.",
  ac3: "Policzcie, ilu partnerów zostało z Wami na kolejny sezon. To najtwardszy wskaźnik jakości sponsoringu i najczęściej ten, którego nikt nie liczy.",

  // ── Athlete: Sport Value ─────────────────────────────────────────────────
  sp1: "Poziom rozgrywkowy zmienia się wolno. W rozmowie z markami równoważy się go zasięgiem i wyrazistym wizerunkiem - i tam warto skierować energię w najbliższych miesiącach.",
  sp2: "Buduj widoczność wokół tego, co osiągasz teraz, nawet na poziomie regionalnym. Marki lokalne rzadko szukają mistrza kraju, częściej kogoś rozpoznawalnego w swoim regionie.",
  sp3: "Brak kadry nie zamyka drogi do współpracy. Zastąp go konsekwentnym wizerunkiem i regularnym contentem - dla większości marek to ważniejsze niż powołanie.",
  sp4: "Pokazuj kierunek, w którym idziesz. Marki podpisują umowy na najbliższe sezony, więc jasno komunikowany cel sportowy działa na Twoją korzyść.",

  // ── Athlete: Content Power ───────────────────────────────────────────────
  co1: "Ustal jeden stały dzień publikacji w tygodniu i trzymaj się go przez trzy miesiące. Regularność jest dla marki ważniejsza niż jakość pojedynczego materiału.",
  co2: "Zacznij publikować video. Zdecydowana większość budżetów na współprace ze sportowcami idzie dziś na format wideo, nie na zdjęcia.",
  co3: "Naucz się nagrywać i montować prosty materiał samodzielnie. Marka potrzebuje pewności, że dostanie materiał w umówionym terminie - to najczęstszy powód rezygnacji ze współpracy.",

  // ── Athlete: Brand Fit ───────────────────────────────────────────────────
  bf1: "Nazwij trzy wartości, które chcesz, żeby ludzie z Tobą kojarzyli, i sprawdź, czy widać je w ostatnich dziesięciu postach. Jeśli nie widać - to jeszcze nie jest wizerunek.",
  bf2: "Wypisz konkretne kategorie marek, do których pasujesz, i uzasadnij każdą jednym zdaniem. \"Cokolwiek sportowego\" nie jest odpowiedzią, na której marka może oprzeć decyzję.",
  bf3: "Ustal, jakich współprac nie przyjmiesz. Zawodnik, który bierze wszystko, jest dla marki mniej wart niż taki, którego rekomendacja coś znaczy.",

  // ── Athlete: Commercial Readiness ────────────────────────────────────────
  cr1: "Zacznij od jednej, choćby małej współpracy z lokalną marką. Pierwszy zrealizowany projekt jest łatwiejszym argumentem w kolejnej rozmowie niż jakikolwiek zasięg.",
  cr2: "Przygotuj media kit: kim jesteś, kto Cię ogląda, co potrafisz zrobić, ile to kosztuje. Jedna strona wystarczy, a jej brak zatrzymuje większość rozmów na starcie.",
  cr3: "Sprawdź w statystykach wiek, płeć i lokalizację swoich odbiorców. Marka kupuje dostęp do konkretnej grupy, więc to pierwsze pytanie, które padnie.",
  cr4: "Ustal stawki za konkretne formaty, zanim ktoś o nie zapyta. Wycenianie na gorąco kończy się albo zaniżeniem, albo utratą rozmowy.",
  cr5: "Rozważ powierzenie rozmów handlowych komuś, kto robi to zawodowo. Negocjowanie własnych stawek jest niewygodne i zwykle kosztuje więcej, niż wynosi prowizja.",
};

/** Shown if a question id ever slips through without a written line. */
const FALLBACK =
  "To jeden z obszarów o największym potencjale poprawy - warto zacząć od niego.";

export function getRecommendation(questionId: string, _answer: number): string {
  return RECOMMENDATIONS[questionId] ?? FALLBACK;
}

/**
 * Guard used by the validation script: every question must have a written line,
 * so a new question can never ship silently showing the fallback.
 */
export function missingRecommendations(questionIds: string[]): string[] {
  return questionIds.filter((id) => !RECOMMENDATIONS[id]);
}
