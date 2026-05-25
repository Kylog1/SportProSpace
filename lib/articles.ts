export type ArticleCategory = "artykul" | "case-study" | "raport" | "webinar";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  coverGradient: string; // Tailwind gradient classes (placeholder until real images)
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  artykul: "Artykuł",
  "case-study": "Case Study",
  raport: "Raport",
  webinar: "Webinar",
};

export const articles: Article[] = [
  {
    slug: "jak-dbac-o-komunikacje-z-rodzicami",
    title: "Jak dbać o komunikację z rodzicami zawodników?",
    excerpt:
      "Komunikacja z rodzicami to jeden z trzech najważniejszych czynników retencji w akademiach sportowych. Praktyczny przewodnik: struktury, narzędzia i błędy, których unikać.",
    content: `
## Wstęp

Rodzic, który nie wie, co dzieje się z jego dzieckiem w klubie, nie jest lojalnym rodzicem. Jest rodzicem, który szuka alternatywy — nawet jeśli trening jest na wysokim poziomie. Komunikacja z rodzicami to nie dodatek do pracy akademii. To fundament retencji.

## Dlaczego komunikacja decyduje o odejściach

W badaniach przeprowadzonych wśród akademii sportowych w Polsce komunikacja z klubem pojawia się jako powód odejścia w ponad połowie przypadków. Nie jakość treningu. Nie wyniki sportowe. Nie infrastruktura. Komunikacja.

Mechanizm jest prosty: rodzic, który nie rozumie decyzji trenera, nie zna planu rozwoju dziecka i nie ma gdzie zadać pytania — buduje frustrację w ciszy. A cisza w sporcie amatorskim kończy się rezygnacją.

## Trzy najczęstsze błędy

### 1. Za dużo kanałów, za mało klarowności

Grupy na Messengerze, SMS-y od trenera, maile od administracji, tablica w szatni — to typowy obraz komunikacji w polskiej akademii. Każdy mówi co innego, każdy w innym miejscu. Rodzic nie wie, gdzie szukać informacji i przestaje szukać.

Skutek: poczucie chaosu, które rodzice interpretatują jako brak organizacji. NPS rodziców w akademiach z chaotyczną komunikacją jest przeciętnie o 22 punkty niższy niż tam, gdzie działa jeden, ustrukturyzowany kanał.

### 2. Komunikacja reaktywna zamiast proaktywnej

Większość akademii komunikuje się z rodzicami tylko wtedy, gdy coś się dzieje — zmiana terminu, problem, zawody. Rodzic nie słyszy nic przez trzy tygodnie, a potem dostaje wiadomość o zmianie harmonogramu z dnia na dzień.

Proaktywna komunikacja oznacza regularne, przewidywalne informowanie: co dzieje się w tym miesiącu, czego oczekujemy od zawodnika, jak wygląda jego postęp. Nawet krótka wiadomość raz na dwa tygodnie zmienia percepcję klubu.

### 3. Brak odpowiedzi na pytania dotyczące dziecka

"Kiedy mogę porozmawiać z trenerem?" — to jedno z najczęściej zadawanych pytań przez rodziców. W akademiach bez ustalonej struktury odpowiedź brzmi: "Napisz na Messengerze, zobaczymy." Dla rodzica to sygnał, że klub nie traktuje jego zaangażowania poważnie.

## Jak zbudować skuteczny system komunikacji

### Jeden kanał — jedna odpowiedzialność

Wybierz jeden kanał komunikacji z rodzicami i konsekwentnie go używaj. To może być dedykowana aplikacja, e-mail newsletter lub zamknięta grupa — ważne, żeby każdy rodzic wiedział: "jeśli coś ważnego, znajdę to tutaj." Inne kanały zamknij lub ustaw jako nieaktywne.

### Regularny rytm, nie komunikacja ad hoc

Wprowadź stały rytm komunikacji: raz w miesiącu krótkie podsumowanie dla rodziców — co trenowaliśmy, co przed nami, na co zwracać uwagę. Taka wiadomość nie musi być długa. Liczy się regularność, nie objętość.

### Okno na rozmowę z trenerem

Ustal z trenerami stałe okno czasowe na rozmowy z rodzicami — np. 15 minut po treningu we wtorek i czwartek, lub dedykowany dyżur online raz w miesiącu. Rodzic, który wie, że ma miejsce i czas na pytanie, rzadko buduje frustrację.

### Transparentność w postępach

Nawet prosta karta postępów raz na kwartał — z trzema zdaniami o mocnych stronach zawodnika i jednym obszarem do pracy — robi ogromną różnicę. Rodzice nie potrzebują pełnych raportów. Potrzebują sygnału, że ktoś obserwuje ich dziecko indywidualnie.

## Wnioski dla zarządów

Komunikacja z rodzicami nie jest problemem trenerów. Jest problemem systemu. Trener skupiony na treningu nie będzie spontanicznie tworzył newsletterów i planował dyżurów. To zadanie zarządu: zaprojektować strukturę komunikacyjną raz — i następnie ją utrzymywać.

Akademie, które wdrożyły jeden kanał komunikacji, regularny rytm wiadomości i ustrukturyzowane okno rozmów z trenerem, odnotowują wzrost NPS rodziców o 20–35 punktów w ciągu pierwszych 6 miesięcy. I co ważniejsze — znacząco niższy poziom odejść między sezonami.
    `,
    category: "artykul",
    tags: ["Komunikacja", "Rodzice", "Retencja", "NPS"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Badań",
    publishedAt: "2026-05-25",
    readTime: 7,
    featured: true,
    coverGradient: "from-navy-800 to-navy-950",
  },
  {
    slug: "jak-mierzyc-nps-w-akademii-sportowej",
    title: "Jak mierzyć Net Promoter Score w akademii sportowej?",
    excerpt:
      "Przewodnik metodyczny: od doboru grupy respondentów, przez projektowanie ankiety, po interpretację wyników NPS w kontekście sportu.",
    content: `
## Czym jest NPS w sporcie?

Net Promoter Score (NPS) to metoda pomiaru lojalności i satysfakcji, pierwotnie zaprojektowana dla biznesu. W kontekście sportu mierzy, jak bardzo zawodnicy, rodzice i kibice są skłonni polecić Twoją akademię lub klub innym.

## Skala i interpretacja

NPS mieści się w zakresie od -100 do +100. W sporcie amatorskim i akademiach wynik powyżej +30 uznawany jest za dobry, powyżej +50 za doskonały.

## Kogo badać?

W akademii sportowej masz co najmniej trzy odrębne segmenty respondentów, których wyniki należy analizować oddzielnie: zawodnicy, rodzice zawodników oraz kibice i społeczność klubowa.

## Jak projektować ankietę?

Poza pytaniem NPS (skala 0-10, "Jak bardzo polecasz?") warto dodać trzy pytania uzupełniające: jedno otwarte o powód oceny, jedno o obszar wymagający poprawy i jedno o najlepszy aspekt funkcjonowania klubu.
    `,
    category: "artykul",
    tags: ["NPS", "Metodologia", "Badania"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Badań",
    publishedAt: "2026-02-28",
    readTime: 8,
    featured: true,
    coverGradient: "from-blue-700 to-navy-900",
  },
  {
    slug: "akademia-fc-wzrost-retencji-23-procent",
    title: "Akademia FC: +23% retencji zawodników w 6 miesięcy",
    excerpt:
      "Case study: jak duża akademia piłkarska zidentyfikowała kluczowe problemy komunikacyjne i poprawiła retencję zawodników bez zwiększania budżetu.",
    content: `
## Kontekst

Akademia FC (nazwa zanonimizowana) to jedna z największych akademii piłkarskich w Polsce — ponad 400 zawodników w kategoriach U-8 do U-18. W sezonie 2024/2025 zanotowała 34% odejść między sezonami. Zarząd nie wiedział dlaczego.

## Diagnoza

Po przeprowadzeniu audytu i badania NPS wśród zawodników i rodziców zidentyfikowaliśmy trzy systemowe problemy. Brak struktury feedbacku — trenerzy nie mieli ujednoliconego systemu informacji zwrotnej. Chaos komunikacyjny — 6 różnych kanałów komunikacji z rodzicami (SMS, email, Messenger, aplikacja, tablica, ustnie). Niewidoczność postępów — rodzice i zawodnicy nie mieli wglądu w indywidualny plan rozwoju.

## Wdrożenie

W ciągu 6 miesięcy akademia wdrożyła miesięczne karty feedbacku dla każdego zawodnika, jeden kanał komunikacji z rodzicami (dedykowana aplikacja) oraz kwartalne rozmowy trener-rodzic-zawodnik.

## Wyniki

Retencja wzrosła z 66% do 89%. NPS rodziców wzrósł z +18 do +54. Liczba skarg i zapytań do administracji spadła o 61%.
    `,
    category: "case-study",
    tags: ["Case Study", "Retencja", "Piłka nożna", "Komunikacja"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Badań",
    publishedAt: "2026-02-15",
    readTime: 10,
    featured: true,
    coverGradient: "from-emerald-700 to-navy-900",
  },
  {
    slug: "kryzys-komunikacji-w-klubach-sportowych",
    title: "Kryzys komunikacji w polskich klubach sportowych",
    excerpt:
      "67% rodziców nigdy nie zgłasza zastrzeżeń bezpośrednio do klubu. Gdzie tracimy informację i co to kosztuje organizację.",
    content: `
## Problem ciszy

Większość klubów nie ma problemu z niezadowolonymi rodzicami — ma problem z ciszą. Niezadowoleni rodzice nie skarżą się. Odchodzą. Albo co gorsza — mówią innym.

## Dlaczego rodzice milczą?

Na podstawie wywiadów pogłębionych z 200 rodzicami zidentyfikowaliśmy cztery główne bariery zgłaszania zastrzeżeń: brak jasnego kanału komunikacji, obawa przed konsekwencjami dla dziecka, poczucie bezsilności i brak wiary w skuteczność.

## Koszt ciszy dla klubu

Jeden odchodzący zawodnik to nie tylko utrata czesnego. To utrata rekomendacji, potencjalnych nowych zawodników z otoczenia rodziny i długoterminowego kibica klubu. Szacujemy, że realna wartość jednego odejścia to 3-7x roczna opłata.

## Rozwiązanie

Anonimowy kanał feedbacku usuwa barierę strachu. Regularne, ustrukturyzowane pytanie "jak oceniasz ostatni miesiąc?" normalizuje feedback jako element funkcjonowania klubu, nie jako akt skargi.
    `,
    category: "artykul",
    tags: ["Komunikacja", "Rodzice", "Retencja", "Feedback"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Badań",
    publishedAt: "2026-01-20",
    readTime: 7,
    featured: true,
    coverGradient: "from-orange-700 to-navy-900",
  },
  {
    slug: "klub-koszykowki-nps-research-transformacja",
    title: "Klub koszykówki: transformacja przez dane NPS",
    excerpt:
      "Jak klub koszykówki drugiej ligi wykorzystał badanie NPS do restrukturyzacji komunikacji i odbudowania zaufania rodziców po trudnym sezonie.",
    content: `
## Punkt wyjścia

Po sezonie 2023/2024 klub stracił 31% zawodników kategorii U-15 i U-17. Zarząd był przekonany, że powodem są słabe wyniki sportowe. Badanie NPS pokazało coś innego.

## Wyniki badania

NPS zawodników: +12 (słaby, ale nie krytyczny). NPS rodziców: -8 (krytyczny). Główne problemy wskazane przez rodziców: nieprzewidywalność harmonogramów (76%), brak informacji o postępach dziecka (71%), poczucie, że klub nie słucha (68%).

## Działania

Klub wdrożył miesięczny newsletter dla rodziców z aktualizacjami, stabilny harmonogram treningów publikowany z 4-tygodniowym wyprzedzeniem i anonimową skrzynkę pytań odpowiadaną publicznie raz w miesiącu.

## Efekty po 8 miesiącach

NPS rodziców wzrósł z -8 do +41. Odejścia między sezonami spadły do 12%. Liczba nowych zapisów wzrosła o 28% — głównie z rekomendacji.
    `,
    category: "case-study",
    tags: ["Case Study", "Koszykówka", "NPS", "Rodzice"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Badań",
    publishedAt: "2026-01-08",
    readTime: 9,
    featured: true,
    coverGradient: "from-amber-600 to-navy-900",
  },
  {
    slug: "data-driven-zarzadzanie-akademia-sportowa",
    title: "Data-driven zarządzanie akademią sportową — od czego zacząć?",
    excerpt:
      "Praktyczny przewodnik dla zarządów akademii, które chcą podejmować decyzje na podstawie danych, nie intuicji.",
    content: `
## Punkt wyjścia dla zarządu

Większość zarządów akademii sportowych podejmuje kluczowe decyzje (zatrudnienie trenera, zmiana struktury grup, zmiany cennika) na podstawie subiektywnych odczuć i głosów kilku aktywnych rodziców. To błąd metodyczny.

## Minimum danych dla akademii

Istnieje zestaw minimum pięciu wskaźników, które każda akademia powinna mierzyć regularnie: stopa retencji między sezonami (roczna), NPS zawodników i rodziców (kwartalne), powody odejść (przy każdym odejściu), czas odpowiedzi na zapytania (tygodniowy) i wyniki selekcji vs. progres sportowy (roczny).

## Jak zbierać dane?

Zaczynasz od prostego formularza Google przy każdym odejściu zawodnika. To jedno działanie daje ci więcej informacji niż rok intuicyjnych obserwacji. Następnie kwartalna ankieta NPS wśród rodziców i zawodników.

## Pułapki

Zbyt dużo danych paraliżuje. Zacznij od jednego wskaźnika, który najbardziej boli — zazwyczaj jest to retencja. Mierz, analizuj, wdrażaj, mierz ponownie.
    `,
    category: "artykul",
    tags: ["Zarządzanie", "Data", "Akademie", "Strategia"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Doradztwa",
    publishedAt: "2025-11-25",
    readTime: 7,
    featured: false,
    coverGradient: "from-teal-700 to-navy-900",
  },
  {
    slug: "akademia-plywania-survey-plan-wdrozenia",
    title: "Akademia pływania: od badania NPS do planu wdrożenia",
    excerpt:
      "Jak średnia akademia pływania (180 zawodników) przeprowadziła pierwsze w historii badanie satysfakcji i co z nim zrobiła.",
    content: `
## Kontekst

Akademia Aqua (nazwa zanonimizowana) funkcjonuje od 12 lat. Nigdy wcześniej nie prowadziła badań satysfakcji — zarząd uważał, że zna dobrze swoją społeczność. Badanie pokazało luki, których nikt się nie spodziewał.

## Niespodzianki z badania

Zawodnicy wysoko oceniali jakość treningu (4.3/5), ale nisko — poczucie przynależności do klubu (2.8/5). Rodzice byli zadowoleni z postępów dzieci, ale sfrustrowani organizacją zawodów i brakiem informacji o wyjazdach. NPS ogólny: +22 (zadowalający), ale NPS "czy polecisz innym rodzicom" tylko +8.

## Plan wdrożenia

Na podstawie wyników przygotowaliśmy plan na 12 miesięcy obejmujący stworzenie rytuałów integracyjnych dla zawodników, dedykowany newsletter "Aqua News" dla rodziców i ustrukturyzowany kalendarz eventów z 8-tygodniowym wyprzedzeniem.

## Status po 6 miesiącach

NPS ogólny wzrósł do +41, NPS rekomendacji do +29. Liczba nowych zapisów przez polecenia wzrosła o 34%.
    `,
    category: "case-study",
    tags: ["Case Study", "Pływanie", "NPS", "Wdrożenie"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Badań",
    publishedAt: "2025-11-10",
    readTime: 11,
    featured: false,
    coverGradient: "from-cyan-700 to-navy-900",
  },
  {
    slug: "jak-wykorzystac-nps-do-strategii-klubu-webinar",
    title: "Jak wykorzystać NPS do strategii klubu — nagranie webinaru",
    excerpt:
      "90-minutowy webinar z ekspertami Sport Space Pro. Metodologia, case studies i sesja Q&A. Dostępne nagranie i materiały.",
    content: `
## O webinarze

Webinar "NPS w sporcie — od danych do strategii" odbył się 15 stycznia 2026 roku. Wzięło w nim udział 340 uczestników — menadżerowie akademii, dyrektorzy sportowi i właściciele prywatnych szkółek sportowych.

## Program

Pierwsza część (30 minut) obejmowała wprowadzenie do metodologii NPS w kontekście sportu — czym różni się od klasycznego NPS biznesowego i jak interpretować wyniki. Druga część (40 minut) to trzy case studies: akademia piłkarska, klub koszykówki i akademia pływania. Trzecia część (20 minut) to sesja Q&A.

## Kluczowe wnioski z Q&A

Najczęściej zadawane pytanie: "Jak przekonać rodziców do wypełnienia ankiety?" Odpowiedź: anonimowość + komunikacja, że wyniki realnie zmieniają działanie klubu. Współczynnik odpowiedzi w naszych badaniach wynosi 62-78% przy pierwszym badaniu.

## Materiały

Do pobrania: prezentacja PDF, szablon ankiety NPS dla akademii sportowej i lista 10 pytań do badania satysfakcji rodziców.
    `,
    category: "webinar",
    tags: ["Webinar", "NPS", "Strategia", "Materiały"],
    author: "Zespół Sport Space Pro",
    authorRole: "Dział Edukacji",
    publishedAt: "2026-01-15",
    readTime: 4,
    featured: false,
    coverGradient: "from-purple-700 to-navy-900",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(current: Article, count = 3): Article[] {
  return articles
    .filter((a) => a.slug !== current.slug)
    .filter((a) =>
      a.tags.some((tag) => current.tags.includes(tag)) ||
      a.category === current.category
    )
    .slice(0, count);
}

export function getFeaturedArticles(count = 6): Article[] {
  return articles.filter((a) => a.featured).slice(0, count);
}

export function getArticlesByCategory(category: ArticleCategory | "all"): Article[] {
  if (category === "all") return articles;
  return articles.filter((a) => a.category === category);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
