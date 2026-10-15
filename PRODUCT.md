# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Cztery role w klubie sportowym lub akademii, wszystkie potwierdzone przez właściciela produktu
jako realni odbiorcy strony — decyzja bywa rozproszona, a strona musi działać dla każdej z nich:

- **Prezes / właściciel klubu** — decyduje jednoosobowo, myśli kategoriami przychodu i reputacji.
- **Dyrektor sportowy / szef akademii** — odpowiada za retencję i jakość szkolenia, ale budżet
  musi wywalczyć u zarządu; potrzebuje materiału do rozmowy w górę.
- **Zarząd / rada klubu** — decyduje kolegialnie; ktokolwiek trafi na stronę pierwszy, musi
  przekonać pozostałych.
- **Marketing / dyrektor operacyjny** — patrzy przez pryzmat wizerunku i członkostwa, nie wyników
  sportowych.

Konsekwencja wiążąca dla każdej powierzchni: **strona musi znieść przesłanie dalej.** Osoba, która
ją znalazła, rzadko jest osobą, która podpisuje. Materiał musi bronić się bez obecnego nadawcy.

## Product Purpose

Niezależne badania i analiza danych o doświadczeniu zawodników, rodziców i trenerów w klubach
sportowych i akademiach. Produkt odpowiada na jedno pytanie, którego kluby same sobie nie zadają
w sposób ustrukturyzowany: **dlaczego ludzie odchodzą.**

Sukces to klub, który zamiast decydować na intuicji dostaje policzalną diagnozę i plan działania.

## Positioning

Mechanizm, którego sąsiedni produkt nie może uczciwie skopiować: **niezależna strona trzecia
prowadząca anonimowe badanie.** Klub nie bada sam siebie — dlatego respondenci mówią to, czego
nie powiedzieliby wprost trenerowi czy dyrektorowi.

Anonimowość jest deklarowana wprost na żywej stronie („100% anonimowe ankiety") i jest rdzeniem
oferty, nie dodatkiem. Szczegółowa architektura tej anonimowości (email → jednorazowy token,
brak dostępu klubu do surowych danych) jest opisana w
[brand/koncepty-do-wykorzystania.md](brand/koncepty-do-wykorzystania.md), ale **nie jest
potwierdzona jako wdrożona** — traktować jako zamierzenie produktowe do weryfikacji, nie jako
istniejącą funkcję.

## Operating Context

Ścieżka zakupowa jest dwuetapowa i to jest istotne dla każdej powierzchni:

1. **Self-assessment** — darmowy quiz, klub ocenia sam siebie, dostaje wynik i PDF na email.
2. **Pełne badanie** — płatne, prowadzone przez Sport Space Pro na zawodnikach, rodzicach
   i trenerach, kończy się raportem i rekomendacjami.

Napięcie między tymi etapami (samoocena kontra to, co naprawdę myślą badani) jest naturalnym
argumentem sprzedażowym i jest już zapisane jako copy w
[brand/koncepty-do-wykorzystania.md](brand/koncepty-do-wykorzystania.md).

Proces badania: analiza organizacji → badanie doświadczenia → analiza danych → raport
z rekomendacjami na 12 miesięcy.

## Capabilities and Constraints

**Działające funkcje** (zweryfikowane w kodzie):

- Self-assessment: quiz z walidacją Zod, generowanie PDF, wysyłka mailem przez Resend,
  rate limiting, honeypot antybotowy — [app/api/submit-assessment/route.ts](app/api/submit-assessment/route.ts)
- Formularz kontaktowy — [app/api/contact/route.ts](app/api/contact/route.ts)
- System artykułów: 10 wpisów w 4 kategoriach (4 artykuły, 3 case studies, 2 raporty, 1 webinar),
  wyszukiwarka i filtrowanie, SEO z JSON-LD — [lib/articles.ts](lib/articles.ts)
- Raport PDF do pobrania — `public/raporty/gdzie-akademie-sportowe-traca-zawodnikow.pdf`

**Terminologia — wiążąca, wielokrotnie korygowana przez właściciela:**

- „członków Twojego klubu", **nigdy** „kibiców" — produkt bada uczestników klubu, nie widownię
- „Kluby Golfowe", nie „Pływanie"; ikona golfa to `Flag` z lucide-react
- „Net Promoter Score" w treści i na wykresach, nie w podtytułach sekcji

**Techniczne:** Next.js 14 App Router, TypeScript, TailwindCSS 3, shadcn/ui, deploy na Vercel
z auto-deployem przy push na `main`. Email przez Resend.

## Brand Commitments

Nazwa: **Sport Space Pro** (ujednolicona 2026-08-13; wcześniej kod używał równolegle wariantu
„Sport Pro Space"). Domena: sportspacepro.pl.

Istnieje pełny system brandowy w `brand/` — manual, logo w wielu wariantach, grafiki social,
szablony Canva. **Właściciel zadeklarował wprost, że nic z tego nie jest nienaruszalne:** nazwa,
logo, paleta navy i Inter mogą zostać podważone, jeśli wariant udowodni, że inaczej jest lepiej.

Wyjątek techniczny, nie brandowy: pliki logo w `brand/logo/` mają akcent kolorystyczny na słowie
„Space", co po zmianie kolejności słów w nazwie wymaga osobnej decyzji o rozmieszczeniu akcentu.

## Evidence on Hand

**Prawdziwe — wolno używać jako fakt:**

- Statystyki rynkowe na stronie: 41% młodych zawodników rezygnuje przed 13. rokiem życia,
  3× wyższa retencja w klubach z formalnym feedbackiem, 67% rodziców nie zgłasza zastrzeżeń
  wprost klubowi. Potwierdzone przez właściciela jako pochodzące z realnych badań branżowych.
- Treść 10 artykułów i raport PDF.
- Działający self-assessment z generowaniem PDF.

**Zmyślone — NIE WOLNO podawać jako prawdziwe:**

- Wszystkie case studies konkretnych klubów („Akademia FC — 34% wzrost retencji", „Klub
  koszykówki — NPS +18 w 6 miesięcy", „Akademia pływania — dziewczęta U-14"). Właściciel
  potwierdził, że to wypełniacz.
- Liczby w mockupie dashboardu w hero (NPS +62, retencja 87%, 412 respondentów, Q2 2026).

**Zasada wiążąca:** dane demonstracyjne są materiałem projektowym i mogą być tworzone w pełnej
jakości, ale muszą być czytelnie oznaczone jako poglądowe wszędzie, gdzie odwiedzający mógłby
wziąć je za wyniki realnych badań. Nazwy klientów, benchmarki i wyniki wdrożeń pozostają
niewymyślalne do czasu, aż pojawią się prawdziwe.

**Brak:** referencji, logotypów klientów, cen, potwierdzonej liczby zrealizowanych badań.

## Product Principles

1. **Niezależność jest produktem.** Wszystko, co upodabnia Sport Space Pro do agencji
   marketingowej klubu, niszczy powód, dla którego respondenci mówią prawdę.
2. **Strona musi znieść przesłanie dalej.** Odbiorca rzadko jest decydentem; materiał broni się
   bez nadawcy.
3. **Pokazuj mechanizm, nie obietnicę.** Produktem są dane — powierzchnia, która o danych mówi,
   zamiast je pokazywać, sprzedaje słabiej niż mogłaby.
4. **Nie fabrykuj dowodów.** Firma jest przed pierwszymi publicznymi wdrożeniami; udawanie
   inaczej jest jedynym ryzykiem, które może ją kosztować wiarygodność nieodwracalnie.
5. **Terminologia to wiarygodność.** Jedno „kibiców" zamiast „członków klubu" zdradza, że autor
   nie rozumie środowiska, do którego mówi.
