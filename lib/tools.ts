import { Calculator, ClipboardCheck, FileText, Gauge, type LucideIcon } from "lucide-react";

export type Tool = {
  href: string;
  label: string;
  note: string;
  title: string;
  body: string;
  audience: string;
  cta: string;
  icon: LucideIcon;
};

export const TOOLS: Tool[] = [
  {
    href: "/self-assessment",
    label: "Self-Audit",
    note: "Gdzie tracicie klientów",
    title: "Self-Audit",
    body: "Kilka minut z pytaniami o klub, akademię lub obiekt. Dostajesz diagnozę miejsc, w których tracicie członków i przychód.",
    audience: "Kluby, akademie, obiekty sportowe",
    cta: "Zrób Self-Audit",
    icon: ClipboardCheck,
  },
  {
    href: "/commercial-score",
    label: "Commercial Score",
    note: "Ile jesteście warci dla marek",
    title: "Commercial Score",
    body: "Wynik 0-100 z rozbiciem na obszary i trzema rzeczami do poprawy. Osobne modele dla zawodnika i dla organizacji sportowej.",
    audience: "Zawodnicy i organizacje sportowe",
    cta: "Policz swój wynik",
    icon: Gauge,
  },
  {
    href: "/brief-sponsoringowy",
    label: "Brief sponsoringowy",
    note: "Wzór dla marek szukających partnera",
    title: "Brief sponsoringowy",
    body: "Gotowy wzór briefu, który marka może wypełnić, żeby opisać czego szuka w sponsoringu sportowym. Pobierasz plik i wysyłasz dalej.",
    audience: "Marki i organizacje sportowe",
    cta: "Pobierz wzór",
    icon: FileText,
  },
  {
    href: "/kalkulator-phv",
    label: "Kalkulator PHV",
    note: "Dojrzewanie młodego piłkarza",
    title: "Kalkulator PHV",
    body: "Sprawdź, w którym momencie dojrzewania jest młody piłkarz lub piłkarka, i otrzymaj plan ćwiczeń, rollowania i żywienia. Dane zostają w przeglądarce.",
    audience: "Rodzice i zawodnicy",
    cta: "Otwórz kalkulator",
    icon: Calculator,
  },
];
