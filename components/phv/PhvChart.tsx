import { monShort, type PhvResult } from "@/lib/phv/calc";

// Typowa krzywa tempa wzrostu ustawiona na szczyt zawodnika, z jego pozycją.
export function PhvChart({ r }: { r: PhvResult }) {
  const x0 = 50, x1 = 620, y0 = 230, yTop = 30;
  const omin = -3, omax = 4;
  const X = (o: number) => x0 + ((o - omin) / (omax - omin)) * (x1 - x0);
  const Y = (v: number) => y0 - (v / 10) * (y0 - yTop);
  const peakV = r.sex === "F" ? 8.5 : 9.5;
  const base = 5.5;
  const vel = (o: number) =>
    o < 0
      ? base + (peakV - base) * Math.exp(-(o * o) / (2 * 0.55 * 0.55))
      : Math.max(peakV * Math.exp(-(o * o) / (2 * 1.15 * 1.15)), 0.4);

  const pts: string[] = [];
  for (let i = 0; i <= 70; i++) {
    const o = omin + i / 10;
    pts.push(`${X(o).toFixed(1)},${Y(vel(o)).toFixed(1)}`);
  }
  const cur = Math.max(omin, Math.min(omax, r.offset));
  const cx = X(cur);
  const cy = Y(vel(cur));
  const lx = Math.max(x0 + 46, Math.min(x1 - 46, cx));
  const ages: number[] = [];
  for (let a = Math.ceil(r.aphv + omin); a <= Math.floor(r.aphv + omax); a++) ages.push(a);

  return (
    <figure className="overflow-x-auto rounded-[0.625rem] bg-navy-950 px-2.5 pb-2 pt-3.5">
      <svg viewBox="0 0 660 290" role="img" aria-label="Wykres tempa wzrostu z zaznaczoną pozycją zawodnika" className="block h-auto w-full min-w-[520px]">
        <rect x={X(-0.5)} y={yTop} width={X(0.5) - X(-0.5)} height={y0 - yTop} fill="#e11d48" fillOpacity={0.28} />
        <rect x={X(1)} y={yTop} width={X(2) - X(1)} height={y0 - yTop} fill="#f59e0b" fillOpacity={0.22} />
        <g stroke="#475569" strokeWidth={1}>
          <line x1={x0} y1={y0} x2={x1} y2={y0} />
          <line x1={x0} y1={Y(5)} x2={x1} y2={Y(5)} strokeDasharray="3 5" strokeOpacity={0.6} />
          <line x1={x0} y1={Y(10)} x2={x1} y2={Y(10)} strokeDasharray="3 5" strokeOpacity={0.6} />
        </g>
        <g fontFamily="inherit" fontSize={11} fill="#94a3b8">
          <text x={42} y={y0 + 4} textAnchor="end">0</text>
          <text x={42} y={Y(5) + 4} textAnchor="end">5</text>
          <text x={42} y={Y(10) + 4} textAnchor="end">10</text>
          {ages.map((a) => (
            <text key={a} x={X(a - r.aphv)} y={250} textAnchor="middle">{a}</text>
          ))}
          <text x={335} y={274} textAnchor="middle">wiek (lata)</text>
          <text x={14} y={130} textAnchor="middle" transform="rotate(-90 14 130)">cm / rok</text>
        </g>
        <polyline points={pts.join(" ")} fill="none" stroke="#f8fafc" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
        <line x1={cx} y1={yTop} x2={cx} y2={y0} stroke="#f8fafc" strokeOpacity={0.5} />
        <circle cx={cx} cy={cy} r={7} fill="#e11d48" stroke="#f8fafc" strokeWidth={2.5} />
        <rect x={lx - 44} y={4} width={88} height={22} rx={5} fill="#f8fafc" />
        <text x={lx} y={19} textAnchor="middle" fontWeight={700} fontSize={12} fill="#0B1736">TY · {monShort(r.date)}</text>
        <g fontWeight={700} fontSize={11}>
          <text x={X(0)} y={222} textAnchor="middle" fill="#fda4af">OKNO 1</text>
          <text x={X(1.5)} y={222} textAnchor="middle" fill="#fcd34d">OKNO 2</text>
        </g>
      </svg>
      <figcaption className="px-1.5 pt-1.5 text-xs text-slate-300">
        Typowa krzywa tempa wzrostu, ustawiona na twój szczyt. Czerwone pole: pół roku przed i po szczycie, czyli czas najszybszego rośnięcia. Pomarańczowe: od roku do dwóch lat po szczycie, czyli dobry czas na budowanie siły.
      </figcaption>
    </figure>
  );
}
