// Tests for the Tennis & Padel "ile klub traci" block (lib/assessment/tennis-padel-loss*.ts).
// The project has no test framework, so this uses node:test and compiles the few
// pure TypeScript modules it needs on the fly with the installed `typescript`.
//
//   npm test

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "spp-loss-test-"));
const require = createRequire(import.meta.url);

for (const file of [
  "types",
  "tennis-padel",
  "tennis-padel-loss-config",
  "tennis-padel-loss",
]) {
  const source = fs.readFileSync(path.join(root, "lib", "assessment", `${file}.ts`), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  fs.writeFileSync(path.join(outDir, `${file}.js`), outputText);
}

const loss = require(path.join(outDir, "tennis-padel-loss.js"));
const lossConfig = require(path.join(outDir, "tennis-padel-loss-config.js"));
const engine = require(path.join(outDir, "types.js"));
const { TENNIS_PADEL_CONFIG } = require(path.join(outDir, "tennis-padel.js"));

const CFG = lossConfig.TENNIS_PADEL_LOSS_CONFIG;
const NB = " "; // amounts use non-breaking spaces
const noAgentIssues = { filler: 3, retention: 3, fourthPlayer: 3, support: 3, events: 3 };

// Example from the brief: 6 courts, open 16 h, peak 5 h, 100 zł, occupancy 0.30.
const BRIEF_VENUE = {
  courts: 6,
  openHoursPerDay: 16,
  peakHoursPerDay: 5,
  offPeakPricePln: 100,
  occupancyChoice: "weak",
};

describe("wzór: przykład z briefu", () => {
  const r = loss.computeTennisPadelLoss(BRIEF_VENUE, noAgentIssues);

  it("godziny kortowe poza szczytem", () => {
    assert.equal(r.offPeakHoursPerDay, 11);
    assert.equal(r.offPeakCapacity, 1980);
    assert.equal(r.occupancy, 0.3);
  });
  it("puste godziny ≈ 1 390 (dokładnie 1 386)", () => {
    assert.ok(Math.abs(r.emptyHoursExact - 1386) < 1e-9);
    assert.equal(r.emptyHours, 1390);
  });
  it("niewykorzystany potencjał ≈ 139 000 zł", () => {
    assert.equal(r.untappedValue, 139000);
  });
  it("do odzyskania 9 900-19 800 zł miesięcznie", () => {
    assert.equal(r.recoverLow, 9900);
    assert.equal(r.recoverHigh, 19800);
    assert.equal(r.recoverHighCapped, false);
  });
  it("rocznie 118 800-237 600 zł", () => {
    assert.equal(r.yearlyLow, 118800);
    assert.equal(r.yearlyHigh, 237600);
  });
  it("kwoty po polsku, z twardą spacją i zł", () => {
    assert.equal(loss.formatPln(139000), `139${NB}000${NB}zł`);
    assert.equal(loss.formatPln(9900), `9${NB}900${NB}zł`);
    assert.equal(loss.formatInt(1390), `1${NB}390`);
    assert.equal(loss.formatInt(80), "80");
    assert.equal(loss.formatRange(9900, 19800), `9${NB}900–19${NB}800${NB}zł`);
  });
  it("teksty ekranu wyniku", () => {
    const copy = loss.buildLossCopy(r);
    assert.equal(copy.mode, "normal");
    assert.equal(
      loss.partsToText(copy.headline),
      `Poza szczytem macie ok. 1${NB}390 pustych godzin kortowych miesięcznie.`
    );
    assert.equal(
      loss.partsToText(copy.untappedLine),
      `To ok. 139${NB}000${NB}zł niewykorzystanego potencjału.`
    );
    assert.equal(
      loss.partsToText(copy.paragraph),
      `Nie da się zapełnić wszystkiego. Kluby, które aktywnie zapełniają wolne godziny, podnoszą obłożenie poza szczytem o 5–10 punktów procentowych. U Was to 9${NB}900–19${NB}800${NB}zł miesięcznie, czyli 118${NB}800–237${NB}600${NB}zł rocznie.`
    );
    assert.equal(copy.unknownNote, null);
  });
});

describe("wzór: obłożenie 0.70 ogranicza górną granicę do +5 pp", () => {
  const r = loss.computeTennisPadelLoss(
    { courts: 4, openHoursPerDay: 14, peakHoursPerDay: 4, offPeakPricePln: 120, occupancyChoice: "good" },
    noAgentIssues
  );
  it("recoverHigh = recoverLow", () => {
    // 4 * 10 h * 30 dni = 1200 godzin; 1200 * 5% * 120 zł = 7 200 zł
    assert.equal(r.offPeakCapacity, 1200);
    assert.equal(r.recoverLow, 7200);
    assert.equal(r.recoverHigh, 7200);
    assert.equal(r.recoverHighCapped, true);
    assert.equal(r.yearlyHigh, 86400);
  });
  it("puste godziny liczone od 30% wolnych", () => {
    assert.equal(r.emptyHours, 360);
    assert.equal(r.untappedValue, 43200);
  });
  it("tekst podaje jedną kwotę, nie przedział", () => {
    const text = loss.partsToText(loss.buildLossCopy(r).paragraph);
    assert.match(text, /liczymy ostrożnie 5 punktów: 7 200 zł miesięcznie, czyli 86 400 zł rocznie\./);
    assert.ok(!text.includes("–7"));
  });
});

describe("wzór: 'Nie wiem' w obłożeniu", () => {
  const r = loss.computeTennisPadelLoss({ ...BRIEF_VENUE, occupancyChoice: "unknown" }, noAgentIssues);
  it("używa 0.30 i ustawia flagę", () => {
    assert.equal(r.occupancy, 0.3);
    assert.equal(r.occupancyUnknown, true);
    assert.equal(r.untappedValue, 139000);
  });
  it("ekran dodaje zdanie o typowej wartości", () => {
    assert.equal(
      loss.buildLossCopy(r).unknownNote,
      "Przyjęliśmy typową wartość dla branży. Pierwsze, co sprawdzimy w audycie, to Wasze faktyczne obłożenie."
    );
  });
  it("bez 'Nie wiem' flaga jest wyłączona", () => {
    assert.equal(loss.computeTennisPadelLoss(BRIEF_VENUE, noAgentIssues).occupancyUnknown, false);
  });
});

describe("wzór: wszystkie karty obłożenia", () => {
  const expected = { empty: 0.15, weak: 0.3, half: 0.5, good: 0.7, unknown: 0.3 };
  for (const [id, occ] of Object.entries(expected)) {
    it(`${id} = ${occ}`, () => {
      const r = loss.computeTennisPadelLoss({ ...BRIEF_VENUE, occupancyChoice: id }, noAgentIssues);
      assert.equal(r.occupancy, occ);
    });
  }
  it("karty mają unikalne numery 1-5", () => {
    assert.deepEqual(CFG.occupancy.options.map((o) => o.value), [1, 2, 3, 4, 5]);
  });
});

describe("wzór: szczyt równy godzinom otwarcia", () => {
  const r = loss.computeTennisPadelLoss({ ...BRIEF_VENUE, peakHoursPerDay: 16 }, noAgentIssues);
  it("nie ma godzin poza szczytem i nie ma ujemnych wartości", () => {
    assert.equal(r.offPeakHoursPerDay, 0);
    assert.equal(r.hasOffPeak, false);
    assert.equal(r.emptyHours, 0);
    assert.equal(r.untappedValue, 0);
    assert.equal(r.recoverLow, 0);
  });
  it("ekran nie pokazuje kwot", () => {
    const copy = loss.buildLossCopy(r);
    assert.equal(copy.mode, "noOffPeak");
    assert.equal(copy.untappedLine, null);
    assert.equal(copy.paragraph, null);
  });
});

describe("zaokrąglanie", () => {
  it("do najbliższej wielokrotności, połówka w górę", () => {
    assert.equal(loss.roundTo(1385, 10), 1390);
    assert.equal(loss.roundTo(1386, 10), 1390);
    assert.equal(loss.roundTo(138600, 100), 138600);
    assert.equal(loss.roundTo(138649, 100), 138600);
    assert.equal(loss.roundTo(138650, 100), 138700);
  });
  it("dodatnia wartość nie zaokrągla się do zera", () => {
    assert.equal(loss.roundTo(4, 10), 10);
    assert.equal(loss.roundTo(30, 100), 100);
  });
  it("zero zostaje zerem", () => {
    assert.equal(loss.roundTo(0, 100), 0);
  });
});

describe("walidacja pól", () => {
  const v = (id, raw, ctx = {}) => loss.validateNumberField(id, raw, ctx);

  it("puste pole jest błędem (brak wartości domyślnych)", () => {
    for (const id of ["courts", "openHoursPerDay", "peakHoursPerDay", "offPeakPricePln"]) {
      assert.equal(v(id, "").ok, false, id);
      assert.equal(v(id, "   ").ok, false, id);
    }
    assert.equal(v("courts", "").error, "Wpisz liczbę.");
  });
  it("tekst zamiast liczby", () => {
    assert.equal(v("courts", "sześć").ok, false);
    assert.equal(v("offPeakPricePln", "100 zł").ok, false);
    assert.equal(v("courts", "1e3").ok, false);
  });
  it("A1: kort 1-50, tylko całkowite", () => {
    assert.equal(v("courts", "0").ok, false);
    assert.equal(v("courts", "51").ok, false);
    assert.equal(v("courts", "-3").ok, false);
    assert.equal(v("courts", "6.5").ok, false);
    assert.equal(v("courts", "1").ok, true);
    assert.equal(v("courts", "50").ok, true);
    assert.equal(v("courts", "51").error, "Wpisz liczbę od 1 do 50.");
  });
  it("A2: godziny otwarcia 1-24", () => {
    assert.equal(v("openHoursPerDay", "0").ok, false);
    assert.equal(v("openHoursPerDay", "25").ok, false);
    assert.equal(v("openHoursPerDay", "24").ok, true);
    assert.equal(v("openHoursPerDay", "16,5").ok, true);
  });
  it("A3: szczyt 0 do godzin otwarcia", () => {
    const ctx = { openHoursPerDay: 16 };
    assert.equal(v("peakHoursPerDay", "0", ctx).ok, true);
    assert.equal(v("peakHoursPerDay", "16", ctx).ok, true);
    assert.equal(v("peakHoursPerDay", "-1", ctx).ok, false);
    const tooLong = v("peakHoursPerDay", "17", ctx);
    assert.equal(tooLong.ok, false);
    assert.equal(
      tooLong.error,
      "Szczyt nie może trwać dłużej niż obiekt jest otwarty (16 h)."
    );
  });
  it("A3: ograniczenie zależy od A2, nie od stałej", () => {
    assert.equal(v("peakHoursPerDay", "9", { openHoursPerDay: 8 }).ok, false);
    assert.equal(v("peakHoursPerDay", "8", { openHoursPerDay: 8 }).ok, true);
  });
  it("A4: cena 20-1000 zł", () => {
    assert.equal(v("offPeakPricePln", "19").ok, false);
    assert.equal(v("offPeakPricePln", "1001").ok, false);
    assert.equal(v("offPeakPricePln", "20").ok, true);
    assert.equal(v("offPeakPricePln", "1000").ok, true);
    assert.equal(v("offPeakPricePln", "99,50").value, 99.5);
    assert.equal(v("offPeakPricePln", "1 000").value, 1000);
    assert.equal(v("offPeakPricePln", "1001").error, `Wpisz liczbę od 20 do 1${NB}000${NB}zł.`);
  });
});

describe("walidacja całego Bloku A (serwer)", () => {
  it("poprawne dane przechodzą", () => {
    assert.equal(loss.validateVenueInputs(BRIEF_VENUE).ok, true);
  });
  it("szczyt większy niż godziny otwarcia", () => {
    assert.equal(loss.validateVenueInputs({ ...BRIEF_VENUE, peakHoursPerDay: 17 }).ok, false);
  });
  it("wartość poza zakresem", () => {
    assert.equal(loss.validateVenueInputs({ ...BRIEF_VENUE, courts: 80 }).ok, false);
    assert.equal(loss.validateVenueInputs({ ...BRIEF_VENUE, offPeakPricePln: 5 }).ok, false);
  });
  it("nieznana karta obłożenia", () => {
    assert.equal(loss.validateVenueInputs({ ...BRIEF_VENUE, occupancyChoice: "x" }).ok, false);
  });
});

describe("rekomendacje agentów", () => {
  const ids = (a) => loss.recommendAgents(a).map((r) => r.id);

  it("odpowiedź 1 lub 2 wrzuca agenta na listę, najsłabsze pierwsze", () => {
    assert.deepEqual(
      ids({ filler: 2, retention: 1, fourthPlayer: 5, support: 4, events: 2 }),
      ["retention", "filler", "events"]
    );
  });
  it("remis rozstrzyga kolejność z konfiguracji", () => {
    assert.deepEqual(
      ids({ filler: 1, retention: 1, fourthPlayer: 1, support: 1, events: 1 }),
      ["filler", "retention", "fourthPlayer", "support", "events"]
    );
  });
  it("gdy nic nie ma 1-2: maksymalnie dwa najniżej ocenione", () => {
    const r = loss.recommendAgents({ filler: 4, retention: 3, fourthPlayer: 5, support: 3, events: 4 });
    assert.deepEqual(r.map((x) => x.id), ["retention", "support"]);
    assert.ok(r.every((x) => x.reason === "lowest"));
  });
  it("same trójki: dwa pierwsze z konfiguracji", () => {
    assert.deepEqual(ids(noAgentIssues), ["filler", "retention"]);
  });
  it("same piątki: brak rekomendacji i zdanie zamiast listy", () => {
    const all5 = { filler: 5, retention: 5, fourthPlayer: 5, support: 5, events: 5 };
    assert.deepEqual(ids(all5), []);
    const copy = loss.buildLossCopy(loss.computeTennisPadelLoss(BRIEF_VENUE, all5));
    assert.equal(copy.agentsNone, CFG.copy.agentsNone);
  });
  it("opis agenta pochodzi z konfiguracji", () => {
    const [first] = loss.recommendAgents({ filler: 1, retention: 5, fourthPlayer: 5, support: 5, events: 5 });
    assert.equal(first.name, "Wypełniacz godzin");
    assert.equal(
      first.description,
      "wysyła graczom propozycje wolnych godzin dopasowane do tego, kiedy zwykle grają."
    );
  });
});

describe("odpowiedzi z quizu -> dane typowane", () => {
  const answers = {
    venue_courts: 6,
    venue_open_hours: 16,
    venue_peak_hours: 5,
    venue_off_peak_price: 100,
    venue_occupancy: 2,
    agent_filler: 1,
    agent_retention: 3,
    agent_fourth_player: 3,
    agent_support: 3,
    agent_events: 2,
  };
  it("karta nr 2 to 'weak' (0.30), nr 5 to 'unknown'", () => {
    assert.equal(loss.venueFromAnswers(answers).occupancyChoice, "weak");
    assert.equal(loss.venueFromAnswers({ ...answers, venue_occupancy: 5 }).occupancyChoice, "unknown");
  });
  it("brak któregokolwiek pola daje null", () => {
    const { venue_courts, ...rest } = answers;
    assert.equal(loss.venueFromAnswers(rest), null);
    const { agent_events, ...rest2 } = answers;
    assert.equal(loss.agentAnswersFromAnswers(rest2), null);
  });
  it("niepoprawna wartość (szczyt > otwarcie) daje null", () => {
    assert.equal(loss.venueFromAnswers({ ...answers, venue_peak_hours: 20 }), null);
  });
  it("lossQuestionIds zwraca 10 pytań w kolejności A potem B", () => {
    assert.deepEqual(loss.lossQuestionIds(), [
      "venue_courts",
      "venue_open_hours",
      "venue_peak_hours",
      "venue_off_peak_price",
      "venue_occupancy",
      "agent_filler",
      "agent_retention",
      "agent_fourth_player",
      "agent_support",
      "agent_events",
    ]);
  });
  it("Growth Score z pytań o procesy nie zmienia się po dodaniu nowych odpowiedzi", () => {
    const core = {};
    for (const q of TENNIS_PADEL_CONFIG.questions) core[q.id] = 3;
    const before = engine.overallScore(TENNIS_PADEL_CONFIG, core);
    const merged = { ...answers, ...core };
    // Bez pickAnswers suma obejmowałaby 6 kortów i 16 godzin i zepsuła wynik...
    assert.notEqual(engine.overallScore(TENNIS_PADEL_CONFIG, merged), before);
    // ...dlatego quiz liczy wynik wyłącznie z pytań o procesy.
    const picked = loss.pickAnswers(merged, TENNIS_PADEL_CONFIG.questions.map((q) => q.id));
    assert.equal(engine.overallScore(TENNIS_PADEL_CONFIG, picked), before);
  });
});

describe("zależność szczytu od godzin otwarcia w quizie", () => {
  const answers = { venue_open_hours: 16, venue_peak_hours: 5 };
  it("obniżenie godzin otwarcia poniżej szczytu unieważnia szczyt", () => {
    assert.deepEqual(loss.staleAnswerIds(answers, "venue_open_hours", 4), ["venue_peak_hours"]);
  });
  it("zmiana, która mieści szczyt, niczego nie kasuje", () => {
    assert.deepEqual(loss.staleAnswerIds(answers, "venue_open_hours", 5), []);
    assert.deepEqual(loss.staleAnswerIds(answers, "venue_open_hours", 20), []);
  });
  it("inne pytania niczego nie kasują", () => {
    assert.deepEqual(loss.staleAnswerIds(answers, "venue_courts", 1), []);
  });
  it("kontekst walidacji bierze godziny otwarcia z odpowiedzi", () => {
    const ctx = loss.fieldContextFromAnswers(answers);
    assert.equal(ctx.openHoursPerDay, 16);
    assert.equal(loss.validateNumberField("peakHoursPerDay", "17", ctx).ok, false);
  });
});

describe("pytania o procesy po usunięciu en2 i re3", () => {
  const qs = TENNIS_PADEL_CONFIG.questions;
  const perCategory = (cat) => qs.filter((q) => q.category === cat).length;

  it("zostało 16 pytań, bez en2 i re3", () => {
    assert.equal(qs.length, 16);
    assert.ok(!qs.some((q) => q.id === "en2" || q.id === "re3"));
  });
  it("Engage i Retain mają po 2 pytania, reszta po 3", () => {
    assert.deepEqual(
      TENNIS_PADEL_CONFIG.categories.map((c) => [c.id, perCategory(c.id)]),
      [["attract", 3], ["activate", 3], ["engage", 2], ["retain", 2], ["expand", 3], ["insight", 3]]
    );
  });
  it("skraje skali: same 1 to 0, same 5 to 100, same 3 to 50", () => {
    const all = (v) => Object.fromEntries(qs.map((q) => [q.id, v]));
    assert.equal(engine.overallScore(TENNIS_PADEL_CONFIG, all(1)), 0);
    assert.equal(engine.overallScore(TENNIS_PADEL_CONFIG, all(5)), 100);
    assert.equal(engine.overallScore(TENNIS_PADEL_CONFIG, all(3)), 50);
  });
  it("kategoria z 2 pytaniami liczy się na własnej skali 0-100", () => {
    const answers = Object.fromEntries(qs.map((q) => [q.id, 3]));
    answers.en1 = 5;
    answers.en3 = 5;
    const engage = engine
      .categoryScores(TENNIS_PADEL_CONFIG, answers)
      .find((c) => c.id === "engage");
    assert.equal(engage.score, 100);
    assert.equal(engage.rawMax, 10);
  });
});

describe("konfiguracja", () => {
  it("Blok A to 4 pola liczbowe i 1 pytanie z kartami, Blok B to 5 agentów", () => {
    assert.equal(CFG.numberFields.length, 4);
    assert.equal(CFG.occupancy.options.length, 5);
    assert.equal(CFG.agents.length, 5);
  });
  it("każdy agent ma pięć kart 1-5", () => {
    for (const agent of CFG.agents) {
      assert.deepEqual(agent.options.map((o) => o.value), [1, 2, 3, 4, 5], agent.id);
    }
  });
  it("identyfikatory pytań są unikalne i nie kolidują z pytaniami o procesy", () => {
    const all = [...loss.lossQuestionIds(), ...TENNIS_PADEL_CONFIG.questions.map((q) => q.id)];
    assert.equal(new Set(all).size, all.length);
  });
});

fs.rmSync(outDir, { recursive: true, force: true });
