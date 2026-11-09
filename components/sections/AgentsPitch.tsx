"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Compass,
  Handshake,
  Headphones,
  HeartPulse,
  Megaphone,
  Radar,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { trackMeetingBooked } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Dane                                                               */
/* ------------------------------------------------------------------ */

type PillarId = "sponsoring" | "kluby" | "ai";

const PILLARS: Record<
  PillarId,
  { label: string; short: string; desc: string; href: string; dot: string; ring: string; text: string; bg: string }
> = {
  sponsoring: {
    label: "Sponsoring",
    short: "Sponsoring",
    desc: "Agenci, którzy zamieniają dane o kibicach i zasięgu w pakiety, wyceny i rozmowy ze sponsorami.",
    href: "#doradztwo",
    dot: "bg-amber-500",
    ring: "ring-amber-500",
    text: "text-amber-700",
    bg: "bg-amber-50",
  },
  kluby: {
    label: "Dla klubów i operatorów",
    short: "Kluby i operatorzy",
    desc: "Agenci, którzy pilnują retencji i doświadczenia członków. Pracują na wynikach badań CX i NPS.",
    href: "#doradztwo",
    dot: "bg-emerald-600",
    ring: "ring-emerald-600",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  ai: {
    label: "AI i automatyzacja",
    short: "AI i automatyzacja",
    desc: "Agenci, którzy zdejmują z ludzi w klubie komunikację, administrację i powtarzalne zadania.",
    href: "#doradztwo",
    dot: "bg-navy-800",
    ring: "ring-navy-800",
    text: "text-navy-800",
    bg: "bg-navy-50",
  },
};

type Agent = {
  id: string;
  no: number;
  name: string;
  /** Krótka etykieta pod koszulką (max ~2 linie) */
  label: string;
  role: string;
  line: "Atak" | "Pomoc" | "Obrona" | "Bramka";
  pillar: PillarId;
  icon: LucideIcon;
  /** pozycja na boisku w % (x: lewo→prawo, y: góra→dół) */
  x: number;
  y: number;
  captain?: boolean;
  does: string[];
  data: string;
  stat: { value: string; label: string };
};

const AGENTS: Agent[] = [
  // ATAK — zdobywa przychody
  {
    id: "content",
    no: 7,
    name: "Content i Social Media",
    label: "Content i Social",
    role: "Skrzydłowy",
    line: "Atak",
    pillar: "sponsoring",
    icon: Megaphone,
    x: 18,
    y: 15,
    does: [
      "Planuje i pisze posty pod kalendarz meczów i wydarzeń",
      "Eksponuje sponsorów zgodnie z umowami",
      "Raportuje zasięg i zaangażowanie co tydzień",
    ],
    data: "kalendarz klubu, umowy sponsorskie, statystyki social media",
    stat: { value: "3×", label: "więcej publikacji przy tym samym zespole" },
  },
  {
    id: "sponsoring",
    no: 9,
    name: "Agent Sponsoringu",
    label: "Sponsoring",
    role: "Napastnik",
    line: "Atak",
    pillar: "sponsoring",
    icon: Handshake,
    x: 50,
    y: 10,
    does: [
      "Buduje pakiety sponsorskie na podstawie profilu kibiców",
      "Wycenia ekwiwalent medialny i zasięg",
      "Typuje firmy do kontaktu i przygotowuje pierwszą wiadomość",
    ],
    data: "Sponsorship Score, Commercial Score, segmentacja kibiców",
    stat: { value: "+40", label: "firm na liście leadów co sezon" },
  },
  {
    id: "sprzedaz",
    no: 11,
    name: "Sprzedaż i Marketing",
    label: "Sprzedaż",
    role: "Skrzydłowy",
    line: "Atak",
    pillar: "kluby",
    icon: TrendingUp,
    x: 82,
    y: 15,
    does: [
      "Prowadzi kampanie karnetów, obozów i biletów",
      "Odpowiada na zapytania i dopina zapisy",
      "Proponuje upsell i cross-sell obecnym członkom",
    ],
    data: "baza członków, historia zakupów, wyniki Self-Audit",
    stat: { value: "+12%", label: "konwersji z zapytań na zapis" },
  },

  // POMOC — rozumie dane i rozgrywa
  {
    id: "cx",
    no: 6,
    name: "Analityk CX i NPS",
    label: "Analityk CX",
    role: "Pomocnik",
    line: "Pomoc",
    pillar: "kluby",
    icon: BarChart3,
    x: 20,
    y: 45,
    does: [
      "Analizuje badania NPS i komentarze członków",
      "Wskazuje powody odejść i miejsca, gdzie klub traci",
      "Zamienia wyniki w listę działań dla zarządu",
    ],
    data: "badania CX i NPS Sport Space Pro, ankiety, opinie",
    stat: { value: "+62", label: "NPS jako punkt odniesienia" },
  },
  {
    id: "kapitan",
    no: 10,
    name: "Kapitan",
    label: "Kapitan",
    role: "Rozgrywający / orkiestrator",
    line: "Pomoc",
    pillar: "ai",
    icon: Compass,
    x: 50,
    y: 41,
    captain: true,
    does: [
      "Rozdziela zadania między pozostałych agentów",
      "Pilnuje priorytetów ustalonych z zarządem",
      "W poniedziałek rano wysyła raport z całego tygodnia",
    ],
    data: "wszystko, co zbierają pozostali zawodnicy",
    stat: { value: "1", label: "raport tygodniowy zamiast 10 arkuszy" },
  },
  {
    id: "skaut",
    no: 8,
    name: "Skaut Konkurencji",
    label: "Skaut konkurencji",
    role: "Pomocnik",
    line: "Pomoc",
    pillar: "kluby",
    icon: Radar,
    x: 80,
    y: 45,
    does: [
      "Śledzi ceny, ofertę i promocje okolicznych klubów",
      "Monitoruje ich social media i opinie w Google",
      "Daje znać, gdy konkurencja robi coś ważnego",
    ],
    data: "strony i profile konkurencji, opinie Google, benchmarki branżowe",
    stat: { value: "24/7", label: "monitoring zamiast ręcznego sprawdzania" },
  },

  // OBRONA — chroni przychód, czyli retencję
  {
    id: "rodzice",
    no: 3,
    name: "Komunikacja z Rodzicami",
    label: "Rodzice",
    role: "Boczny obrońca",
    line: "Obrona",
    pillar: "ai",
    icon: Users,
    x: 12,
    y: 66,
    does: [
      "Odpowiada rodzicom na WhatsAppie i Messengerze",
      "Wysyła przypomnienia o treningach, opłatach i zmianach",
      "Przekazuje trenerowi tylko sprawy, które wymagają człowieka",
    ],
    data: "grafik, regulamin, cennik, lista grup",
    stat: { value: "−6 h", label: "tygodniowo na odpisywanie rodzicom" },
  },
  {
    id: "retencja",
    no: 4,
    name: "Agent Retencji",
    label: "Retencja",
    role: "Środkowy obrońca",
    line: "Obrona",
    pillar: "kluby",
    icon: HeartPulse,
    x: 37,
    y: 70,
    does: [
      "Wyłapuje członków, którzy przestają przychodzić",
      "Uruchamia kontakt, zanim ktoś zrezygnuje",
      "Mierzy, które działania zatrzymują ludzi najskuteczniej",
    ],
    data: "frekwencja, płatności, wyniki NPS",
    stat: { value: "87%", label: "retencji jako cel do utrzymania" },
  },
  {
    id: "obsluga",
    no: 5,
    name: "Obsługa Członków",
    label: "Obsługa członków",
    role: "Środkowy obrońca",
    line: "Obrona",
    pillar: "ai",
    icon: Headphones,
    x: 63,
    y: 70,
    does: [
      "Odpowiada na pytania o grafik, karnety i płatności",
      "Zapisuje na zajęcia i przyjmuje zmiany",
      "Zbiera feedback po każdej interakcji",
    ],
    data: "system klubowy, cennik, baza wiedzy",
    stat: { value: "80%", label: "pytań zamkniętych bez udziału recepcji" },
  },
  {
    id: "admin",
    no: 2,
    name: "Administracja",
    label: "Administracja",
    role: "Boczny obrońca",
    line: "Obrona",
    pillar: "ai",
    icon: ClipboardList,
    x: 88,
    y: 66,
    does: [
      "Przygotowuje dokumenty, zgody i umowy",
      "Pilnuje terminów płatności i faktur",
      "Porządkuje listy zawodników i członków",
    ],
    data: "dokumenty klubu, system księgowy, listy zawodników",
    stat: { value: "−10 h", label: "pracy biurowej miesięcznie" },
  },

  // BRAMKA — chroni klub
  {
    id: "dane",
    no: 1,
    name: "Strażnik Danych",
    label: "Strażnik danych",
    role: "Bramkarz",
    line: "Bramka",
    pillar: "ai",
    icon: ShieldCheck,
    x: 50,
    y: 88,
    does: [
      "Pilnuje RODO, zgód i dostępu do danych",
      "Szczególnie chroni dane dzieci w akademiach",
      "Sprawdza, czy agenci działają zgodnie z AI Act",
    ],
    data: "rejestr zgód, polityki klubu, logi agentów",
    stat: { value: "UE", label: "dane przetwarzane i hostowane w Unii" },
  },
];

const LINES = [
  { name: "Atak", desc: "zdobywa przychody", y: 5 },
  { name: "Pomoc", desc: "rozumie dane", y: 33 },
  { name: "Obrona", desc: "chroni retencję", y: 57 },
  { name: "Bramka", desc: "chroni klub", y: 81 },
];

/* Boisko rysujemy w viewBoxie 100 × 120, więc y% → y * 1.2 */
const VB_H = 120;
const vy = (y: number) => (y / 100) * VB_H;

/* ------------------------------------------------------------------ */
/*  Komponent                                                          */
/* ------------------------------------------------------------------ */

export default function AgentsPitch({
  ctaHref = "#contact",
  auditHref = "/self-assessment",
}: {
  ctaHref?: string;
  auditHref?: string;
}) {
  const [selectedId, setSelectedId] = useState<string>("kapitan");
  const [pillar, setPillar] = useState<PillarId | null>(null);

  const selected = AGENTS.find((a) => a.id === selectedId) ?? AGENTS[0];
  const captain = AGENTS.find((a) => a.captain)!;

  const isActive = (a: Agent) => (pillar ? a.pillar === pillar : true);

  const choosePillar = (p: PillarId | null) => {
    setPillar(p);
    if (p && selected.pillar !== p) {
      const first = AGENTS.find((a) => a.pillar === p);
      if (first) setSelectedId(first.id);
    }
  };

  const SelIcon = selected.icon;
  const selPillar = PILLARS[selected.pillar];

  return (
    <section id="druzyna-ai" className="bg-white py-20 sm:py-24">
      <style>{`
        @keyframes sspPass { to { stroke-dashoffset: -8; } }
        .ssp-pass { animation: sspPass 0.9s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .ssp-pass { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Nagłówek */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
            Jak to się łączy
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Jedenastka, która gra na Waszych danych.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Sponsoring, doświadczenie członków i automatyzacja to jedna drużyna. Obrona trzyma
            klientów, pomoc rozumie dane, atak zdobywa przychody. Kliknij zawodnika, żeby zobaczyć,
            co robi.
          </p>
        </div>

        {/* Filtry = trzy bloki usług */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Obszary usług">
          <button
            type="button"
            role="tab"
            aria-selected={pillar === null}
            onClick={() => choosePillar(null)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              pillar === null
                ? "border-navy-950 bg-navy-950 text-white"
                : "border-navy-100 bg-white text-navy-950 hover:bg-navy-50"
            }`}
          >
            Cała drużyna
          </button>
          {(Object.keys(PILLARS) as PillarId[]).map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={pillar === p}
              onClick={() => choosePillar(pillar === p ? null : p)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                pillar === p
                  ? "border-navy-950 bg-navy-950 text-white"
                  : "border-navy-100 bg-white text-navy-950 hover:bg-navy-50"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${PILLARS[p].dot}`} aria-hidden />
              {PILLARS[p].short}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          {/* Boisko */}
          <div className="rounded-[0.625rem] border border-navy-100 bg-navy-50 p-3 sm:p-5">
            <div className="relative mx-auto w-full max-w-[560px]" style={{ aspectRatio: "100 / 120" }}>
              <svg
                viewBox={`0 0 100 ${VB_H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                {/* pasy murawy */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="0"
                    y={i * 15}
                    width="100"
                    height="15"
                    fill={i % 2 ? "#E6ECF6" : "#F0F4FA"}
                  />
                ))}
                <g fill="none" stroke="#C9D5EA" strokeWidth="0.45">
                  <rect x="3" y="3" width="94" height={VB_H - 6} rx="1" />
                  <line x1="3" y1={VB_H / 2} x2="97" y2={VB_H / 2} />
                  <circle cx="50" cy={VB_H / 2} r="11" />
                  <circle cx="50" cy={VB_H / 2} r="0.8" fill="#C9D5EA" />
                  {/* pole karne góra */}
                  <rect x="24" y="3" width="52" height="16" />
                  <rect x="38" y="3" width="24" height="6" />
                  <path d="M 40 19 A 10 10 0 0 0 60 19" />
                  {/* pole karne dół */}
                  <rect x="24" y={VB_H - 19} width="52" height="16" />
                  <rect x="38" y={VB_H - 9} width="24" height="6" />
                  <path d={`M 40 ${VB_H - 19} A 10 10 0 0 1 60 ${VB_H - 19}`} />
                </g>

                {/* podania od kapitana */}
                {AGENTS.filter((a) => !a.captain).map((a) => {
                  const on = a.id === selected.id || (pillar !== null && a.pillar === pillar);
                  return (
                    <line
                      key={a.id}
                      x1={captain.x}
                      y1={vy(captain.y)}
                      x2={a.x}
                      y2={vy(a.y)}
                      stroke={on ? "#1E3A8A" : "#C9D5EA"}
                      strokeWidth={on ? 0.55 : 0.3}
                      strokeDasharray="1.6 1.6"
                      strokeLinecap="round"
                      className={on ? "ssp-pass" : undefined}
                      opacity={on ? 0.9 : 0.6}
                    />
                  );
                })}
              </svg>

              {/* etykiety formacji (desktop) */}
              {LINES.map((l) => (
                <div
                  key={l.name}
                  className="pointer-events-none absolute left-[3.5%] hidden -translate-y-1/2 sm:block"
                  style={{ top: `${l.y}%` }}
                  aria-hidden
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy-800/60">
                    {l.name}
                  </div>
                </div>
              ))}

              {/* zawodnicy */}
              {AGENTS.map((a) => {
                const Icon = a.icon;
                const isSel = a.id === selected.id;
                const active = isActive(a);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    aria-pressed={isSel}
                    aria-label={`${a.name}, ${a.role}`}
                    className={`group absolute flex w-[22%] max-w-[96px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-navy-800 ${
                      active ? "opacity-100" : "opacity-30"
                    }`}
                    style={{ left: `${a.x}%`, top: `${a.y}%` }}
                  >
                    <span
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition sm:h-14 sm:w-14 ${
                        isSel
                          ? "scale-110 bg-navy-950 text-white ring-4 ring-navy-800/20"
                          : "bg-white text-navy-950 ring-1 ring-navy-100 group-hover:-translate-y-0.5 group-hover:ring-navy-800"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.75} />
                      {/* numer */}
                      <span
                        className={`absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[9px] font-semibold tabular-nums sm:h-5 sm:min-w-[1.25rem] sm:text-[10px] ${
                          isSel ? "bg-white text-navy-950" : "bg-navy-950 text-white"
                        }`}
                      >
                        {a.no}
                      </span>
                      {/* kolor obszaru */}
                      <span
                        className={`absolute -bottom-0.5 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full sm:w-6 ${PILLARS[a.pillar].dot}`}
                        aria-hidden
                      />
                      {a.captain && (
                        <span className="absolute -left-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-navy-950 ring-2 ring-white sm:h-5 sm:w-5 sm:text-[10px]">
                          C
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-center text-[10px] font-medium leading-tight sm:text-xs ${
                        isSel ? "text-navy-950" : "text-slate-700"
                      }`}
                    >
                      {a.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* legenda */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
              {(Object.keys(PILLARS) as PillarId[]).map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5">
                  <span className={`h-1.5 w-4 rounded-full ${PILLARS[p].dot}`} aria-hidden />
                  {PILLARS[p].short}
                </span>
              ))}
            </div>
          </div>

          {/* Karta zawodnika */}
          <aside
            className="rounded-[0.625rem] border border-navy-100 bg-white p-6 shadow-sm lg:sticky lg:top-24"
            aria-live="polite"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-950 text-white">
                <SelIcon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  #{selected.no} · {selected.role} · {selected.line}
                </p>
                <h3 className="mt-0.5 text-lg font-semibold text-navy-950">{selected.name}</h3>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${selPillar.bg} ${selPillar.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${selPillar.dot}`} aria-hidden />
                  {selPillar.label}
                </span>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {selected.does.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm leading-snug text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-800" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-lg bg-navy-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-navy-800">
                Gra na danych
              </p>
              <p className="mt-1 text-sm text-slate-700">{selected.data}</p>
            </div>

            <div className="mt-5 flex items-baseline gap-3 border-t border-navy-100 pt-5">
              <span className="text-3xl font-semibold tabular-nums tracking-tight text-navy-950">
                {selected.stat.value}
              </span>
              <span className="text-sm leading-snug text-slate-600">{selected.stat.label}</span>
            </div>
            <p className="mt-1 text-xs text-slate-600">Dane przykładowe</p>

            {pillar && (
              <div className="mt-5 border-t border-navy-100 pt-5">
                <p className="text-sm text-slate-600">{PILLARS[pillar].desc}</p>
              </div>
            )}
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-5 rounded-[0.625rem] border border-navy-100 bg-navy-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <p className="text-lg font-semibold">Nie potrzebujecie od razu całej jedenastki.</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              Zaczynamy od diagnozy. Wynik pokaże, których 2–3 zawodników wpuścić na boisko jako
              pierwszych.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
            <Link
              href={auditHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-navy-950 transition hover:bg-navy-50"
            >
              Zrób darmowy Self-Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={ctaHref}
              {...(ctaHref.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => trackMeetingBooked("druzyna-ai")}
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Umów rozmowę
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
