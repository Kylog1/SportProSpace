// Kalkulator PHV: wzory i wyliczenia (Moore i in. 2015).
// Czysta logika, bez Reacta. Wszystko liczy się w przeglądarce.

export type Sex = "M" | "F";
export type Formula = "M1" | "M2" | "F";
export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6;

export interface PhvRaw {
  sex: Sex;
  name: string;
  birth: string; // YYYY-MM-DD
  date: string;
  height: string;
  sitting: string;
  weight: string;
  prevDate: string;
  prevHeight: string;
}

export interface PhvInput {
  sex: Sex;
  name: string;
  birth: Date;
  date: Date;
  age: number;
  height: number;
  sitting: number | null;
  weight: number;
  prevDate: Date | null;
  prevHeight: number | null;
}

export interface PhvResult extends PhvInput {
  offset: number;
  formula: Formula;
  aphv: number;
  peak: Date;
  w1from: Date;
  w1to: Date;
  w2from: Date;
  w2to: Date;
  phaseId: PhaseId;
  legs: number | null;
  protFrom: number;
  protTo: number;
  protMeal: number;
  vitD: string;
  velocity: number | null;
  nextDates: Date[];
}

export const YEAR_MS = 365.25 * 864e5;

/* ---------- Wzory Moore i in. 2015 ---------- */
export function maturityOffset(sex: Sex, age: number, height: number, sitting: number | null): { value: number; formula: Formula } {
  if (sex === "F") return { value: -7.709133 + 0.0042232 * (age * height), formula: "F" };
  if (sitting) return { value: -8.128741 + 0.0070346 * (age * sitting), formula: "M1" };
  return { value: -7.999994 + 0.0036124 * (age * height), formula: "M2" };
}

/* ---------- Granice faz (górna granica włącznie) ---------- */
const PHASE_LIMITS: { id: PhaseId; upTo: number }[] = [
  { id: 1, upTo: -1.0000001 },
  { id: 2, upTo: -0.5000001 },
  { id: 3, upTo: 0.5 },
  { id: 4, upTo: 1.0 },
  { id: 5, upTo: 2.0 },
  { id: 6, upTo: Infinity },
];

export function phaseFor(offset: number): PhaseId {
  return (PHASE_LIMITS.find((p) => offset <= p.upTo) ?? PHASE_LIMITS[5]).id;
}

/* ---------- Daty ---------- */
export function parseDate(v: string): Date | null {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
export function addYears(d: Date, y: number): Date {
  return new Date(d.getTime() + y * YEAR_MS);
}
export function addMonths(d: Date, m: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth() + m, 1);
  const last = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(d.getDate(), last));
  return r;
}
export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------- Formatowanie ---------- */
const MON_NOM = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
const MON_GEN = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
export const nom = (d: Date) => `${MON_NOM[d.getMonth()]} ${d.getFullYear()}`;
export const gen = (d: Date) => `${MON_GEN[d.getMonth()]} ${d.getFullYear()}`;
export const monShort = (d: Date) => `${MON_NOM[d.getMonth()].slice(0, 3).toUpperCase()} ${d.getFullYear()}`;
export const dmy = (d: Date) => `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
export const dec = (x: number, n = 1) => x.toFixed(n).replace(".", ",");
export const cm = (x: number) => dec(x).replace(/,0$/, "");
export function signed(x: number): string {
  let r = Math.round(x * 10) / 10;
  if (Object.is(r, -0)) r = 0;
  return (r > 0 ? "+" : r < 0 ? "−" : "") + dec(Math.abs(r));
}
const round5 = (x: number) => Math.round(x / 5) * 5;

/* ---------- Walidacja ---------- */
function toNum(v: string): number | null {
  const t = v.trim().replace(",", ".");
  return t === "" ? null : Number(t);
}

export function validate(raw: PhvRaw): { input?: PhvInput; errors: string[] } {
  const e: string[] = [];
  const birth = parseDate(raw.birth);
  const date = parseDate(raw.date);
  const height = toNum(raw.height);
  const sitting = toNum(raw.sitting);
  const weight = toNum(raw.weight);
  const prevDate = parseDate(raw.prevDate);
  const prevHeight = toNum(raw.prevHeight);
  let age = 0;

  if (!birth) e.push("Uzupełnij pole „Data urodzenia”.");
  if (!date) e.push("Uzupełnij pole „Data pomiaru”.");
  if (height === null) e.push("Uzupełnij pole „Wzrost”.");
  if (weight === null) e.push("Uzupełnij pole „Waga”.");

  if (birth && date) {
    const today = new Date();
    today.setHours(23, 59, 59);
    if (date <= birth || date > today) {
      e.push("Sprawdź daty. Data pomiaru musi być późniejsza niż data urodzenia i nie może być z przyszłości.");
    } else {
      age = (date.getTime() - birth.getTime()) / YEAR_MS;
      const maxAge = raw.sex === "F" ? 17 : 18;
      if (age < 8 || age >= maxAge) e.push("Kalkulator działa dla chłopców w wieku 8–17 lat i dziewcząt w wieku 8–16 lat. Poza tym przedziałem wzór nie daje wiarygodnego wyniku.");
    }
  }
  if (height !== null && (Number.isNaN(height) || height < 100 || height > 210)) e.push("Sprawdź wartość w polu „Wzrost”, wygląda na nietypową.");
  if (weight !== null && (Number.isNaN(weight) || weight < 20 || weight > 120)) e.push("Sprawdź wartość w polu „Waga”, wygląda na nietypową.");
  if (sitting !== null) {
    if (Number.isNaN(sitting) || sitting < 50 || sitting > 110) e.push("Sprawdź wartość w polu „Wysokość w pozycji siedzącej”, wygląda na nietypową.");
    else if (height && (sitting >= height || sitting < 0.4 * height || sitting > 0.6 * height)) e.push("Wysokość w pozycji siedzącej wygląda na błędną. Zwykle to ok. 50–55% wzrostu. Sprawdź pomiar.");
  }
  if (prevDate || prevHeight !== null) {
    if (!prevDate || prevHeight === null) e.push("Aby policzyć tempo wzrostu, podaj datę i wzrost z poprzedniego pomiaru.");
    else if (date && (date.getTime() - prevDate.getTime()) / YEAR_MS < 2 / 12) e.push("Tempo wzrostu liczymy, gdy od poprzedniego pomiaru minęły co najmniej 2 miesiące.");
    else if (Number.isNaN(prevHeight) || prevHeight < 90 || prevHeight > 210) e.push("Sprawdź wzrost z poprzedniego pomiaru.");
  }

  if (e.length || !birth || !date || height === null || weight === null) return { errors: e };
  return {
    errors: [],
    input: {
      sex: raw.sex,
      name: raw.name.trim().slice(0, 40),
      birth,
      date,
      age,
      height,
      sitting,
      weight,
      prevDate: prevDate && prevHeight !== null ? prevDate : null,
      prevHeight: prevDate && prevHeight !== null ? prevHeight : null,
    },
  };
}

/* ---------- Wyliczenia ---------- */
export function compute(i: PhvInput): PhvResult {
  const mo = maturityOffset(i.sex, i.age, i.height, i.sitting);
  const aphv = i.age - mo.value;
  const peak = addYears(i.birth, aphv);
  const phaseId = phaseFor(mo.value);
  const step = phaseId === 6 ? 6 : 3;
  return {
    ...i,
    offset: mo.value,
    formula: mo.formula,
    aphv,
    peak,
    w1from: addMonths(peak, -6),
    w1to: addMonths(peak, 6),
    w2from: addMonths(peak, 12),
    w2to: addMonths(peak, 24),
    phaseId,
    legs: i.sitting ? i.height - i.sitting : null,
    protFrom: round5(i.weight * 1.3),
    protTo: round5(i.weight * 1.8),
    protMeal: Math.max(10, round5(i.weight * 0.3)),
    vitD: i.age < 11 ? "600–1000 j.m." : "1000–2000 j.m.",
    velocity: i.prevDate && i.prevHeight !== null ? (i.height - i.prevHeight) / ((i.date.getTime() - i.prevDate.getTime()) / YEAR_MS) : null,
    nextDates: [1, 2, 3, 4].map((k) => addMonths(i.date, k * step)),
  };
}

/** Pomocnik do tekstów zależnych od płci. */
export const bySex = <T,>(r: { sex: Sex }, m: T, f: T): T => (r.sex === "F" ? f : m);
