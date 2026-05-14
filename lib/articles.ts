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
    slug: "dlaczego-zawodnicy-odchodza-w-drugim-sezonie",
    title: "Dlaczego zawodnicy odchodzą w drugim sezonie?",
    excerpt:
      "Analiza głównych powodów rezygnacji zawodników U-13 i U-16 na podstawie badania 150 akademii sportowych w Polsce.",
    content: `
## Wstęp

Drugi sezon jest krytycznym momentem dla każdej akademii sportowej. Zawodnik przeszedł już selekcję, poznał środowisko, ma wyrobione pierwsze opinie. Jeśli odchodzi właśnie wtedy — oznacza to, że coś systemowego nie działa.

## Dane

Na podstawie naszego badania przeprowadzonego w 150 akademiach sportowych (piłka nożna, koszykówka, siatkówka, pływanie) w latach 2024–2026 zidentyfikowaliśmy trzy główne powody odejść.

### 1. Brak indywidualnego feedbacku (68% wskazań)

Zawodnicy w kategorii U-13 do U-16 oczekują regularnej informacji zwrotnej od trenerów. Nie oceny — informacji. "Czy robię postępy?", "Co powinienem poprawiać?", "Gdzie jestem na tle grupy?". Większość klubów nie ma sformalizowanego systemu feedbacku — ani dla zawodnika, ani dla rodzica.

### 2. Komunikacja z trenerami (54% wskazań)

Problemem nie jest brak kompetencji trenerów — problemem jest brak struktury komunikacyjnej. Rodzice nie wiedzą, jak i kiedy rozmawiać z trenerem. Zawodnicy nie wiedzą, czego się od nich oczekuje w kolejnym miesiącu.

### 3. Atmosfera w grupie (22% wskazań)

Rzadziej wymieniana, ale często decydująca. Zjawiska wykluczenia, faworyzowania i braku integracji grupowej prowadzą do cichych odejść — szczególnie wśród zawodniczek.

## Wnioski dla zarządów

Retencja to nie kwestia jakości treningu. To kwestia jakości doświadczenia — komunikacji, poczucia przynależności i przejrzystości procesu rozwoju. Kluby, które wdrożyły ustrukturyzowany system feedbacku, odnotowały wzrost retencji o 23–41% w ciągu 12 miesięcy.
    `,
    category: "artykul",
    tags: ["NPS", "Retencja", "U13-U16", "Feedback"],
    author: "Zespół Sport Pro Space",
    authorRole: "Dział Badań",
    publishedAt: "2026-03-12",
    readTime: 6,
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
    author: "Zespół Sport Pro Space",
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
    author: "Zespół Sport Pro Space",
    authorRole: "Dział Badań",
    publishedAt: "2026-02-15",
    readTime: 10,
    featured: true,
    coverGradient: "from-emerald-700 to-navy-900",
  },
  {
    slug: "benchmarking-nps-pilka-nozna-2025",
    title: "Benchmarking NPS w piłce nożnej — Polska 2025",
    excerpt:
      "Raport z badania 120 akademii i klubów piłkarskich w Polsce. Średni NPS, kluczowe czynniki różnicujące i rekomendacje dla zarządów.",
    content: `
## Metodologia badania

Badanie przeprowadzono między październikiem 2024 a lutym 2025 roku. Objęto nim 120 akademii i klubów piłkarskich z całej Polski — od akademii przy klubach ekstraklasy po lokalne szkoły futbolu.

## Kluczowe wyniki

Średni NPS rodziców zawodników w Polsce: +21. Średni NPS samych zawodników U-12/U-16: +34. Akademie przy profesjonalnych klubach osiągają NPS wyższy o 18 punktów od niezależnych akademii — nie ze względu na jakość treningu, ale ze względu na prestiż i infrastrukturę komunikacyjną.

## Czynniki różnicujące

Akademie z NPS powyżej +50 wyróżniają się trzema cechami: regularny ustrukturyzowany feedback (87% z nich), transparentny system selekcji i awansu (79%) oraz aktywna komunikacja z rodzicami minimum raz w miesiącu (94%).

## Rekomendacje

Inwestycja w system komunikacji i feedbacku zwraca się szybciej niż inwestycja w infrastrukturę. Akademie, które wdrożyły podstawowe narzędzia komunikacyjne, odnotowały wzrost NPS o 15-30 punktów w ciągu 12 miesięcy.
    `,
    category: "raport",
    tags: ["Raport", "NPS", "Benchmarking", "Piłka nożna"],
    author: "Zespół Sport Pro Space",
    authorRole: "Dział Analiz",
    publishedAt: "2026-02-01",
    readTime: 15,
    featured: true,
    coverGradient: "from-violet-700 to-navy-900",
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
    author: "Zespół Sport Pro Space",
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
    author: "Zespół Sport Pro Space",
    authorRole: "Dział Badań",
    publishedAt: "2026-01-08",
    readTime: 9,
    featured: true,
    coverGradient: "from-amber-600 to-navy-900",
  },
  {
    slug: "raport-retencji-zawodnikow-u12-u16",
    title: "Raport retencji zawodników U-12 do U-16 — Polska 2024–2025",
    excerpt:
      "Kompleksowa analiza danych retencji z 89 akademii sportowych. Gdzie tracisz zawodników i w jakim wieku odejście jest najbardziej prawdopodobne.",
    content: `
## Zakres raportu

Raport obejmuje dane z 89 akademii sportowych w Polsce (piłka nożna 45%, koszykówka 22%, siatkówka 18%, pływanie 15%) za sezon 2024/2025. Łącznie przeanalizowano dane 12 400 zawodników w kategoriach U-12 do U-16.

## Krytyczny punkt: przejście U-13 na U-14

41% wszystkich odejść w badanej próbie następuje w momencie przejścia z kategorii U-13 do U-14. To moment zwiększonej intensywności treningów, zmiany grupy rówieśniczej i często zmiany trenera. Akademie, które mają ustrukturyzowany program onboardingu na tym etapie, tracą o 34% mniej zawodników.

## Różnice między dyscyplinami

Najwyższą retencję odnotowano w akademiach pływackich (78% średnio), najniższą w piłce nożnej (61% średnio). Różnica wynika głównie ze struktury selekcji — piłka nożna prowadzi bardziej agresywną selekcję negatywną.

## Co nie wpływa na retencję

Infrastruktura, wyniki sportowe w niższych kategoriach wiekowych ani wysokość czesnego nie wykazują istotnej korelacji statystycznej z retencją. Kluczowe są: jakość komunikacji, poczucie przynależności i przejrzystość ścieżki rozwoju.
    `,
    category: "raport",
    tags: ["Raport", "Retencja", "U12-U16", "Akademie"],
    author: "Zespół Sport Pro Space",
    authorRole: "Dział Analiz",
    publishedAt: "2025-12-10",
    readTime: 18,
    featured: false,
    coverGradient: "from-sky-700 to-navy-900",
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
    author: "Zespół Sport Pro Space",
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
    author: "Zespół Sport Pro Space",
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
      "90-minutowy webinar z ekspertami Sport Pro Space. Metodologia, case studies i sesja Q&A. Dostępne nagranie i materiały.",
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
    author: "Zespół Sport Pro Space",
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
