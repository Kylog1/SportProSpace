// Builds the downloadable "Brief sponsoringowy marki" (.docx) lead magnet.
//
//   node scripts/brief/build-brief.mjs
//
// Output: lib/brief/brief-sponsoringowy-marki.docx - kept outside /public on
// purpose, so the file is only reachable through the lead form (/api/brief),
// which sends it as an email attachment.
//
// The document is written with docx-js, which has no API for Word content
// controls. Fields are therefore emitted as marker text and swapped for real
// content controls in a post-processing pass over word/document.xml:
//   ⟦F:hint⟧ -> rich-text control showing "hint" as grey placeholder text
//   ⟦C⟧      -> clickable checkbox control (☐ / ☒)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const OUT = path.join(root, "lib/brief/brief-sponsoringowy-marki.docx");

// Brand palette (tailwind.config.ts, navy scale).
const NAVY_950 = "0B1736";
const NAVY_800 = "1E3A8A";
const NAVY_100 = "DBE5F1";
const NAVY_50 = "F0F4FA";
const MUTED = "64748B";
const FIELD_BG = "F8FAFC";
const FIELD_BORDER = "CBD5E1";
const FONT = "Arial";

// A4, 2 cm margins.
const PAGE_W = 11906;
const MARGIN = 1134;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9638

const F = (hint) => `⟦F:${hint}⟧`;
const C = "⟦C⟧";

// ---------- building blocks ----------

const cellBorder = (color = FIELD_BORDER) => {
  const b = { style: BorderStyle.SINGLE, size: 4, color };
  return { top: b, bottom: b, left: b, right: b };
};

const noBorders = () => {
  const b = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: b, bottom: b, left: b, right: b };
};

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: 290 },
    alignment: opts.align,
    keepNext: opts.keepNext,
    children: [].concat(text).map((t) =>
      typeof t === "string"
        ? new TextRun({ text: t, size: opts.size ?? 20, color: opts.color ?? NAVY_950, bold: opts.bold, italics: opts.italics })
        : t
    ),
  });
}

function run(text, o = {}) {
  return new TextRun({ text, size: o.size ?? 20, color: o.color ?? NAVY_950, bold: o.bold, italics: o.italics });
}

// Question label + an input box below it.
function question(label, hint, { lines = 2 } = {}) {
  return [
    new Paragraph({
      keepNext: true,
      spacing: { before: 160, after: 60 },
      children: [run(label, { bold: true, size: 20 })],
    }),
    fieldBox(hint, lines),
  ];
}

// A one-cell table styled as an input box. `lines` only sets the minimum
// height; the box grows as the reader types.
function fieldBox(hint, lines = 2, width = CONTENT_W) {
  return new Table({
    width: { size: width, type: WidthType.DXA },
    columnWidths: [width],
    rows: [
      new TableRow({
        height: { value: 260 * lines + 100, rule: "atLeast" },
        children: [
          new TableCell({
            width: { size: width, type: WidthType.DXA },
            borders: cellBorder(),
            shading: { type: ShadingType.CLEAR, color: "auto", fill: FIELD_BG },
            margins: { top: 90, bottom: 90, left: 140, right: 140 },
            children: [p(F(hint), { after: 0 })],
          }),
        ],
      }),
    ],
  });
}

function sectionHeading(num, title, { newPage = false } = {}) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: newPage,
    keepNext: true,
    spacing: { before: 360, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY_800, space: 6 } },
    children: [
      run(`${num}  `, { bold: true, size: 30, color: NAVY_800 }),
      run(title, { bold: true, size: 30, color: NAVY_950 }),
    ],
  });
}

// Shaded "why this section exists" note.
function why(text) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: {
              ...noBorders(),
              left: { style: BorderStyle.SINGLE, size: 24, color: NAVY_800 },
            },
            shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_50 },
            margins: { top: 100, bottom: 100, left: 180, right: 180 },
            children: [
              p([run("Po co ta sekcja: ", { bold: true, size: 19, color: NAVY_800 }), run(text, { size: 19, color: NAVY_950 })], { after: 0 }),
            ],
          }),
        ],
      }),
    ],
  });
}

function tip(text) {
  return p([run("Wskazówka: ", { bold: true, size: 18, color: MUTED }), run(text, { size: 18, color: MUTED, italics: true })], {
    before: 80,
    after: 80,
  });
}

// Generic grid. `cells` are strings; header row is shaded navy.
function grid(widths, header, rows, { center = [], keepTogether = false } = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const mk = (text, i, isHeader, isLast = false) =>
    new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: cellBorder(isHeader ? NAVY_800 : FIELD_BORDER),
      shading: isHeader
        ? { type: ShadingType.CLEAR, color: "auto", fill: NAVY_800 }
        : text.startsWith("⟦F")
        ? { type: ShadingType.CLEAR, color: "auto", fill: FIELD_BG }
        : undefined,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      children: [
        new Paragraph({
          alignment: center.includes(i) ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { after: 0 },
          // Word keeps a table on one page when every row but the last is
          // "keep with next".
          keepNext: keepTogether && !isLast,
          keepLines: keepTogether,
          children: [
            run(text, {
              size: isHeader ? 18 : 19,
              bold: isHeader,
              color: isHeader ? "FFFFFF" : NAVY_950,
            }),
          ],
        }),
      ],
    });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: header.map((h, i) => mk(h, i, true)) }),
      ...rows.map(
        (r, ri) =>
          new TableRow({ cantSplit: true, children: r.map((c, i) => mk(c, i, false, ri === rows.length - 1)) })
      ),
    ],
  });
}

// Inline checkbox list: "☐ label   ☐ label".
function checks(label, options) {
  const out = [];
  if (label) {
    out.push(new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run(label, { bold: true })] }));
  }
  options.forEach((o, i) => {
    out.push(
      new Paragraph({
        // Keep a short list on one page together with its label.
        keepNext: i < options.length - 1,
        spacing: { after: 40 },
        indent: { left: 120 },
        children: [run(C), run(`  ${o}`)],
      })
    );
  });
  return out;
}

const gap = (after = 120) => new Paragraph({ spacing: { after }, children: [] });

// ---------- content ----------

const symbol = fs.readFileSync(path.join(here, "symbol.png"));

// Header and footer are two-column borderless tables rather than a paragraph
// with a right-aligned tab: several viewers (Pages, mobile previews, Google
// Docs import) ignore the tab stop and run both halves together.
function barTable(left, right, { rule = false } = {}) {
  const leftW = Math.round(CONTENT_W * 0.66);
  const cell = (children, width, align) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      borders: {
        ...noBorders(),
        bottom: rule
          ? { style: BorderStyle.SINGLE, size: 4, color: NAVY_100 }
          : { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 0, bottom: rule ? 80 : 0, left: 0, right: 0 },
      children: [new Paragraph({ alignment: align, spacing: { after: 0 }, children })],
    });
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [leftW, CONTENT_W - leftW],
    rows: [
      new TableRow({
        children: [cell(left, leftW, AlignmentType.LEFT), cell(right, CONTENT_W - leftW, AlignmentType.RIGHT)],
      }),
    ],
  });
}

const header = new Header({
  children: [
    barTable(
      [
        new ImageRun({ type: "png", data: symbol, transformation: { width: 22, height: 22 } }),
        run("   Sport Space Pro", { bold: true, size: 18, color: NAVY_950 }),
      ],
      [run("Brief sponsoringowy marki", { size: 16, color: MUTED })],
      { rule: true }
    ),
    new Paragraph({ spacing: { after: 0 }, children: [] }),
  ],
});

// Page number only: the total-pages field is not rendered by every viewer and
// showed up as a dangling "6 /".
const footer = new Footer({
  children: [
    barTable(
      [run("Wzór: Sport Space Pro · sportspacepro.pl · możesz go dowolnie zmieniać i używać", { size: 15, color: MUTED })],
      [new TextRun({ children: ["Strona ", PageNumber.CURRENT], size: 15, color: MUTED })]
    ),
  ],
});

const intro = [
  new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [run("WZÓR DO WYPEŁNIENIA", { bold: true, size: 17, color: NAVY_800 })],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [run("Brief sponsoringowy marki", { bold: true, size: 52, color: NAVY_950 })],
  }),
  p(
    "Dokument, który marka wypełnia u siebie, zanim poprosi klub, akademię, wydarzenie lub zawodnika o ofertę. Dzięki niemu każdy potencjalny partner odpowiada na ten sam problem biznesowy, a nie przysyła cennika pakietów.",
    { size: 22, color: MUTED, after: 240 }
  ),
  grid(
    [3000, CONTENT_W - 3000],
    ["Metryczka", ""],
    [
      ["Marka / firma", F("Nazwa marki i firmy")],
      ["Osoba prowadząca", F("Imię, nazwisko, stanowisko, e-mail, telefon")],
      ["Data i wersja briefu", F("np. 14.10.2026, wersja 1")],
      ["Termin odpowiedzi", F("Do kiedy czekamy na propozycje")],
      ["Do kogo wysyłamy", F("Lista partnerów, którzy dostaną ten brief")],
    ]
  ),
  gap(200),
  new Paragraph({ keepNext: true, spacing: { after: 80 }, children: [run("Jak korzystać z tego wzoru", { bold: true, size: 24 })] }),
  ...[
    ["Wypełnijcie go wspólnie. ", "Marketing, sprzedaż i osoba, która podpisze umowę, przy jednym stole. Rozbieżności wychodzą wtedy przed rozmową z partnerem, a nie po niej."],
    ["Wyślijcie tę samą wersję do kilku potencjalnych partnerów. ", "Każdy odpowiada na te same pytania, więc propozycje da się uczciwie porównać."],
    ["Oceńcie propozycje, zanim spojrzycie na cenę. ", "Służy do tego Karta oceny na ostatniej stronie."],
    ["Wróćcie do briefu po sezonie. ", "Cele i wskaźniki z sekcji 2 to punkt odniesienia do rozmowy o przedłużeniu umowy."],
  ].map(
    ([b, t]) =>
      new Paragraph({
        numbering: { reference: "steps", level: 0 },
        spacing: { after: 80, line: 290 },
        children: [run(b, { bold: true }), run(t)],
      })
  ),
  tip("szare pola są do wpisania: kliknij i pisz. Pola ☐ zaznaczasz kliknięciem. Pytania, które Was nie dotyczą, po prostu usuńcie."),
];

const s1 = [
  sectionHeading("1", "Punkt wyjścia: jaki problem ma rozwiązać sponsoring"),
  why("partner, który rozumie Wasz problem, zaproponuje rozwiązanie. Partner, który go nie zna, zaproponuje logo na koszulce."),
  ...question("Z jakim problemem biznesowym przychodzicie? Opiszcie go w dwóch zdaniach.", "np. W województwie X nasza marka jest nieznana, a otwieramy tam 6 sklepów / brakuje nam techników w zakładzie w Y"),
  ...question("Dlaczego sport i dlaczego teraz?", "Co przesądziło, że rozważacie sponsoring zamiast kolejnej kampanii reklamowej"),
  ...question("Co już próbowaliście w tej sprawie i z jakim skutkiem?", "Kampanie, kanały, wcześniejsze współprace"),
  ...question("Czy byliście już w sponsoringu? Co powtórzycie, a czego na pewno nie?", "Wnioski z poprzednich umów"),
  ...question("Co robi w sporcie Wasza konkurencja?", "Kogo sponsoruje, co działa, co wygląda na wydane bez efektu"),
];

const goals = [
  "Rozpoznawalność marki w nowej grupie lub regionie",
  "Zmiana postrzegania marki",
  "Relacje B2B i sprzedaż do firm",
  "Sprzedaż, leady, pobrania aplikacji",
  "Employer branding i rekrutacja",
  "Obecność w lokalnej społeczności",
];

const s2 = [
  sectionHeading("2", "Cel i miara sukcesu"),
  why("jeden wyraźny cel da się zmierzyć i obronić przed zarządem. Sześć celów naraz to przepis na raport, z którego nic nie wynika."),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Wybierzcie jeden cel główny i najwyżej jeden dodatkowy.", { bold: true })] }),
  grid([CONTENT_W - 2400, 1200, 1200], ["Cel", "Główny", "Dodatkowy"], goals.map((g) => [g, C, C]), { center: [1, 2] }),
  gap(80),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Jak zmierzycie, że się udało?", { bold: true })] }),
  grid(
    [3000, 1500, 1500, CONTENT_W - 6000],
    ["Wskaźnik", "Stan dziś", "Cel po sezonie", "Jak mierzymy i kto dostarcza dane"],
    [
      ["np. leady z wydarzeń partnera", "0", "150", "formularz na stronie, raport kwartalny od partnera"],
      [F("Wskaźnik"), F("Stan"), F("Cel"), F("Metoda i źródło danych")],
      [F("Wskaźnik"), F("Stan"), F("Cel"), F("Metoda i źródło danych")],
      [F("Wskaźnik"), F("Stan"), F("Cel"), F("Metoda i źródło danych")],
    ]
  ),
  ...question("Po czym za 12 miesięcy zarząd uzna, że to były dobrze wydane pieniądze?", "Jedno zdanie, które chcielibyście móc powiedzieć na zarządzie"),
];

const s3 = [
  sectionHeading("3", "Odbiorca: kogo chcemy poruszyć"),
  why("każdy klub i każdy zawodnik ma inną publiczność. Partner, który wie, kogo szukacie, pokaże dane o właściwej grupie, a nie łączne zasięgi."),
  ...question("Kim jest odbiorca tej współpracy?", "B2C: wiek, miejsce zamieszkania, styl życia, zwyczaje zakupowe. B2B: branża, wielkość firmy, stanowisko decydenta"),
  ...question("Do kogo dziś nie docieracie innymi kanałami?", "Grupa, której brakuje w Waszych obecnych kampaniach"),
  ...checks("Chodzi głównie o:", ["obecnych klientów (lojalność, większe zakupy)", "nowych klientów", "jednych i drugich po równo"]),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Proporcja odbiorców", { bold: true })] }),
  grid([CONTENT_W / 2, CONTENT_W / 2], ["Konsumenci (B2C)", "Firmy i decydenci (B2B)"], [[F("np. 70%"), F("np. 30%")]]),
  ...checks("Zasięg geograficzny:", ["miasto lub powiat", "region / województwo", "cała Polska", "zagranica"]),
  ...question("Gdzie konkretnie?", "Miasta, regiony, kraje", { lines: 1 }),
];

const s4 = [
  sectionHeading("4", "Jakiego partnera szukamy"),
  why("jasne kryteria oszczędzają czas obu stronom. Potencjalny partner, który ich nie spełnia, odpadnie sam, zanim przygotuje propozycję."),
  ...checks("Typ partnera:", ["klub", "akademia lub szkółka", "zawodniczka / zawodnik", "wydarzenie lub turniej", "liga lub związek sportowy", "jeszcze nie wiemy"]),
  ...checks("Skala działania partnera:", ["lokalna", "regionalna", "ogólnopolska", "międzynarodowa"]),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Dyscypliny", { bold: true })] }),
  grid([CONTENT_W / 2, CONTENT_W / 2], ["Bierzemy pod uwagę", "Wykluczamy"], [[F("Dyscypliny, które pasują do marki"), F("Dyscypliny, które odpadają, i dlaczego")]]),
  ...question("Jakie wartości partner musi z nami dzielić?", "np. praca z młodzieżą, fair play, innowacyjność, lokalność"),
  ...question("Czerwone flagi, które wykluczają partnera", "np. zaległości finansowe, konflikty z kibicami, kontrowersyjne wypowiedzi w mediach"),
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: cellBorder(NAVY_800),
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            children: [
              p([run("Poproście potencjalnych partnerów o wynik Commercial Score", { bold: true, color: NAVY_800 })], { after: 60, before: 0 }),
              p(
                "To bezpłatna samoocena gotowości komercyjnej klubu, organizacji lub zawodnika w sześciu obszarach: publiczność, aktywa komercyjne, pozycjonowanie i oferta, sprzedaż, aktywacja i pomiar, relacje B2B. Wynik 0–100 pozwala porównać potencjalnych partnerów tą samą miarą, zanim zobaczycie ich propozycje. Klub lub zawodnik wykonuje go w kilka minut na sportspacepro.pl/commercial-score.",
                { size: 19, after: 0 }
              ),
            ],
          }),
        ],
      }),
    ],
  }),
];

const s5 = [
  sectionHeading("5", "Co wnosimy do współpracy"),
  why("sponsoring to nie tylko przelew za świadczenia. Najlepsze współprace powstają, gdy marka dokłada własne kanały, produkty i ludzi."),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Budżet (widełki netto)", { bold: true })] }),
  grid(
    [CONTENT_W - 3600, 1800, 1800],
    ["Pozycja", "Od", "Do"],
    [
      ["Świadczenia partnera (prawa sponsorskie)", F("kwota"), F("kwota")],
      ["Aktywacja po naszej stronie (kampanie, content, wydarzenia, produkcja)", F("kwota"), F("kwota")],
      ["Razem", F("kwota"), F("kwota")],
    ]
  ),
  tip("samo prawo do logo rzadko przynosi efekt. Bez osobnego budżetu na aktywację świadczenia partnera zostają niewykorzystane."),
  ...checks("Okres współpracy:", ["jedno wydarzenie", "jeden sezon / rok", "dłużej, z opcją przedłużenia"]),
  ...question("Daty", "Planowany start i koniec", { lines: 1 }),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Zasoby, które możemy dołożyć", { bold: true })] }),
  grid(
    [700, 3600, CONTENT_W - 4300],
    ["", "Zasób", "Szczegóły (skala, dostępność)"],
    [
      "Baza klientów, newsletter",
      "Aplikacja lub program lojalnościowy",
      "Social media marki",
      "Sieć sklepów, punktów, oddziałów",
      "Produkty do samplingu, vouchery, nagrody",
      "Ambasadorzy i influencerzy marki",
      "Przestrzeń, flota, obiekty",
      "Pracownicy (wolontariat, drużyna firmowa)",
    ].map((z) => [C, z, F("np. 40 tys. subskrybentów, 2 wysyłki w sezonie")]),
    { center: [0] }
  ),
  ...question("Kto po naszej stronie prowadzi projekt i ile czasu tygodniowo może mu poświęcić?", "Imię, rola, dostępność"),
];

const s6 = [
  sectionHeading("6", "Czego oczekujemy od partnera"),
  why("partner nie musi zgadywać, co jest dla Was ważne. Rozdzielcie świadczenia, bez których nie ma umowy, od tych, które są tylko miłym dodatkiem."),
  gap(40),
  grid(
    [CONTENT_W - 4200, 1400, 1400, 1400],
    ["Świadczenie", "Musi być", "Mile widziane", "Niepotrzebne"],
    [
      "Ekspozycja logo (stroje, bandy, media)",
      "Prawa do wizerunku zawodników",
      "Wspólny content (wideo, social media)",
      "Bilety i hospitality",
      "Wydarzenia dla naszych klientów lub pracowników",
      "Kontakt z kibicami za ich zgodą (RODO)",
      "Strefa marki, aktywacje na obiekcie",
      "Prawa do nazwy (obiekt, turniej, drużyna)",
      "Wyłączność branżowa",
    ].map((s) => [s, C, C, C]),
    { center: [1, 2, 3] }
  ),
  ...question("Inne świadczenia, o których myślimy", "Czego brakuje na liście powyżej"),
  ...question("Pomysł, który chodzi nam po głowie", "Aktywacja, format lub akcja, którą chcecie sprawdzić z partnerem. Może być wzorowana na czymś, co Wam się podobało"),
  ...checks("Raport od partnera:", ["co miesiąc", "co kwartał", "po zakończeniu sezonu / wydarzenia"]),
  ...question("Co ma zawierać raport?", "Wskaźniki z sekcji 2, zdjęcia i materiały, dane o frekwencji i zasięgu"),
];

const s7 = [
  sectionHeading("7", "Granice i zasady komunikacji"),
  why("ograniczenia prawne i wizerunkowe wychodzą najczęściej przy podpisywaniu umowy. Lepiej, żeby partner znał je od pierwszego dnia."),
  ...question("Regulacje i ograniczenia prawne Waszej branży", "np. zasady reklamy alkoholu, usług finansowych, leków, zakładów"),
  ...question("Branże i marki, obok których nie możemy się pojawiać", "Konkurencja, kategorie wykluczone przez politykę firmy"),
  new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [run("Jak mówi nasza marka", { bold: true })] }),
  grid([CONTENT_W / 2, CONTENT_W / 2], ["Tak mówimy", "Tego unikamy"], [[F("np. bezpośrednio, na „ty”, z humorem"), F("np. memy, polityka, żarty z rywali")]]),
  ...question("Kto zatwierdza treści z udziałem marki i ile to trwa?", "Osoba i czas akceptacji, np. 48 godzin"),
  ...question("Sytuacje, w których chcemy móc zakończyć współpracę", "np. skandal z udziałem zawodnika, spadek z ligi, zmiana właściciela klubu"),
];

const s8 = [
  sectionHeading("8", "Decyzja i harmonogram"),
  why("partner, który zna termin i osoby decyzyjne, przygotuje propozycję pod ich pytania, a nie pod ogólne wyobrażenie o marce."),
  gap(40),
  grid(
    [CONTENT_W - 2800, 2800],
    ["Etap", "Termin"],
    [
      ["Wysłanie briefu do potencjalnych partnerów", F("data")],
      ["Pytania od potencjalnych partnerów", F("data")],
      ["Termin nadesłania propozycji", F("data")],
      ["Spotkania z wybranymi partnerami", F("data")],
      ["Decyzja", F("data")],
      ["Start współpracy", F("data")],
    ]
  ),
  ...question("Kto podejmuje decyzję, a kto jeszcze ma w niej głos?", "np. Dyrektor Marketingu decyduje, Zarząd zatwierdza budżet, centrala akceptuje umowę"),
  ...question("Czego obawia się nasz zarząd?", "Pytania, na które propozycja musi odpowiedzieć, żeby przeszła"),
  ...checks("W odpowiedzi na brief prosimy o:", [
    "koncepcję współpracy (najwyżej 3 strony)",
    "dane o publiczności z podaniem źródła i daty (frekwencja, zasięgi, profil kibiców)",
    "propozycję wskaźników i sposobu raportowania",
    "1–2 przykłady wcześniejszych współprac z wynikami",
    "wycenę z podziałem na świadczenia",
    "wynik Commercial Score (sportspacepro.pl/commercial-score)",
  ]),
];

const criteria = [
  ["Dopasowanie publiczności", "Czy kibice partnera to odbiorcy z sekcji 3?"],
  ["Świadczenia", "Czy partner ma to, co oznaczyliście jako „musi być”?"],
  ["Pomysł i dopasowanie do marki", "Czy koncepcja odpowiada na problem z sekcji 1?"],
  ["Organizacja i sprawność", "Czy jest osoba do współpracy, terminy są dotrzymywane?"],
  ["Aktywacja i pomiar", "Czy partner proponuje wskaźniki i raporty?"],
  ["Relacje B2B", "Hospitality, networking, lokalny biznes"],
];

const scorecard = [
  // The scorecard is used on its own (printed, passed around a meeting), so it
  // always starts a fresh page and the whole table stays on it.
  sectionHeading("Załącznik", "Karta oceny propozycji", { newPage: true }),
  p(
    "Ustalcie wagi, zanim otworzycie pierwszą propozycję; razem mają dać 100%. Każdy obszar oceńcie od 1 do 5. Wynik partnera to suma (ocena × waga) podzielona przez 5; najwyżej 100 punktów. Cenę porównujcie dopiero po ocenie.",
    { size: 19, color: MUTED, after: 160, keepNext: true }
  ),
  grid(
    [3238, 1000, 1800, 1800, 1800],
    ["Obszar", "Waga", "Partner A", "Partner B", "Partner C"],
    [
      ["", "", F("nazwa"), F("nazwa"), F("nazwa")],
      ...criteria.map(([name, hint]) => [`${name}\n${hint}`, F("%"), F("1–5"), F("1–5"), F("1–5")]),
      ["Wynik (0–100)", "100%", F("wynik"), F("wynik"), F("wynik")],
      ["Cena", "", F("kwota"), F("kwota"), F("kwota")],
    ],
    { center: [1, 2, 3, 4], keepTogether: true }
  ),
  ...question("Wnioski i decyzja", "Kogo wybieramy i dlaczego; o co dopytać przed podpisaniem umowy", { lines: 3 }),
  gap(200),
  p(
    [
      run("Chcecie, żeby ktoś przeprowadził Was przez ten proces? ", { bold: true, size: 19 }),
      run("Sport Space Pro pomaga markom dobrać partnera sportowego i zmierzyć efekt współpracy. Pierwsza rozmowa jest bezpłatna: hello@sportspacepro.pl", { size: 19 }),
    ],
    { after: 0 }
  ),
];

const doc = new Document({
  creator: "Sport Space Pro",
  title: "Brief sponsoringowy marki",
  description: "Wzór briefu sponsoringowego dla marek - Sport Space Pro",
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: NAVY_950 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: FONT, size: 30, bold: true, color: NAVY_950 },
        paragraph: { outlineLevel: 0 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "steps",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 400, hanging: 300 } }, run: { bold: true, color: NAVY_800 } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 16838 },
          margin: { top: 1300, bottom: 1100, left: MARGIN, right: MARGIN, header: 560, footer: 500 },
        },
      },
      headers: { default: header },
      footers: { default: footer },
      children: [...intro, ...s1, ...s2, ...s3, ...s4, ...s5, ...s6, ...s7, ...s8, ...scorecard],
    },
  ],
});

// ---------- post-processing: markers -> content controls ----------

function toControls(xml) {
  let id = 1000;

  // Checkbox markers.
  xml = xml.replace(/<w:r>(<w:rPr>(?:(?!<\/w:rPr>).)*<\/w:rPr>)?<w:t(?: xml:space="preserve")?>⟦C⟧<\/w:t><\/w:r>/g, () => {
    id += 1;
    return (
      `<w:sdt><w:sdtPr><w:id w:val="${id}"/>` +
      `<w14:checkbox><w14:checked w14:val="0"/>` +
      `<w14:checkedState w14:val="2612" w14:font="MS Gothic"/>` +
      `<w14:uncheckedState w14:val="2610" w14:font="MS Gothic"/></w14:checkbox>` +
      `</w:sdtPr><w:sdtContent><w:r><w:rPr><w:rFonts w:ascii="MS Gothic" w:eastAsia="MS Gothic" w:hAnsi="MS Gothic" w:hint="eastAsia"/>` +
      `<w:color w:val="${NAVY_800}"/><w:sz w:val="22"/></w:rPr><w:t>☐</w:t></w:r></w:sdtContent></w:sdt>`
    );
  });

  // Text field markers. Typed text takes the sdtPr run formatting (dark);
  // the placeholder itself is grey italic and clears on first keystroke.
  xml = xml.replace(/<w:r>(<w:rPr>(?:(?!<\/w:rPr>).)*<\/w:rPr>)?<w:t(?: xml:space="preserve")?>⟦F:([^⟧]*)⟧<\/w:t><\/w:r>/g, (_m, _rPr, hint) => {
    id += 1;
    return (
      `<w:sdt><w:sdtPr><w:rPr><w:rFonts w:ascii="${FONT}" w:hAnsi="${FONT}"/><w:color w:val="${NAVY_950}"/><w:sz w:val="20"/></w:rPr>` +
      `<w:id w:val="${id}"/><w:showingPlcHdr/></w:sdtPr>` +
      `<w:sdtContent><w:r><w:rPr><w:rFonts w:ascii="${FONT}" w:hAnsi="${FONT}"/><w:i/><w:color w:val="94A3B8"/><w:sz w:val="18"/></w:rPr>` +
      `<w:t xml:space="preserve">${hint}</w:t></w:r></w:sdtContent></w:sdt>`
    );
  });

  const left = xml.match(/⟦[^⟧]*⟧/g);
  if (left) throw new Error(`Unconverted markers: ${left.slice(0, 5).join(", ")}`);
  return xml;
}

// The scorecard's criterion cells are passed to grid() as "Name\nHint";
// docx-js keeps the "\n" verbatim, so split them here into a bold name, a line
// break and a muted hint. Hints were XML-escaped by docx-js already.
function splitCriterionCells(xml) {
  return xml.replace(/<w:r>(<w:rPr>(?:(?!<\/w:rPr>).)*<\/w:rPr>)<w:t(?: xml:space="preserve")?>([^<\n]+)\n([^<]+)<\/w:t><\/w:r>/g, (_m, rPr, name, hint) => {
    const bold = rPr.replace("<w:rPr>", "<w:rPr><w:b/><w:bCs/>");
    const muted = rPr.replace(/<w:color w:val="[^"]*"\/>/, `<w:color w:val="${MUTED}"/>`).replace(/<w:sz w:val="\d+"\/>/, '<w:sz w:val="16"/>');
    return `<w:r>${bold}<w:t xml:space="preserve">${name}</w:t></w:r><w:r>${muted}<w:br/><w:t xml:space="preserve">${hint}</w:t></w:r>`;
  });
}

const buf = await Packer.toBuffer(doc);
const zip = await JSZip.loadAsync(buf);
let xml = await zip.file("word/document.xml").async("string");
xml = splitCriterionCells(toControls(xml));
if (!/xmlns:w14=/.test(xml.slice(0, 3000))) throw new Error("w14 namespace missing on document root");
zip.file("word/document.xml", xml);

// docx-js leaves the PAGE field without a cached result, so viewers that don't
// recalculate fields fall back to default formatting (a larger number next to
// "Strona"). A cached "1" inside the formatted run keeps the size; Word and
// LibreOffice replace it with the real page number.
for (const name of Object.keys(zip.files).filter((n) => /^word\/footer\d+\.xml$/.test(n))) {
  const footerXml = await zip.file(name).async("string");
  zip.file(
    name,
    footerXml.replace(
      '<w:fldChar w:fldCharType="separate"/><w:fldChar w:fldCharType="end"/>',
      '<w:fldChar w:fldCharType="separate"/><w:t>1</w:t><w:fldChar w:fldCharType="end"/>'
    )
  );
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
console.log(`Wrote ${path.relative(root, OUT)} (${fs.statSync(OUT).size} bytes)`);
