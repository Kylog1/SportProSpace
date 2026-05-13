import {
  CircleDot,
  Dribbble,
  Volleyball,
  Flag,
  MoreHorizontal,
} from "lucide-react";

const sports = [
  { icon: CircleDot, name: "Piłka nożna", note: "Akademie i kluby pro" },
  { icon: Dribbble, name: "Koszykówka", note: "Sekcje młodzieżowe i seniorskie" },
  { icon: Volleyball, name: "Siatkówka", note: "Kluby ligowe i amatorskie" },
  { icon: Flag, name: "Kluby Golfowe", note: "Kluby i szkoły golfowe" },
  { icon: MoreHorizontal, name: "Inne dyscypliny", note: "Indywidualne i drużynowe" },
];

export function SportTypes() {
  return (
    <section id="sports" className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Dyscypliny
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Pracujemy z organizacjami w wielu dyscyplinach.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Metodologia jest uniwersalna — adaptujemy ją do specyfiki danej
            dyscypliny, struktury klubu i segmentu odbiorców.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {sports.map(({ icon: Icon, name, note }) => (
            <div
              key={name}
              className="group relative rounded-xl border border-navy-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_18px_36px_-20px_rgba(15,23,42,0.18)]"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800 transition-colors group-hover:bg-navy-800 group-hover:text-white">
                <Icon className="size-5" />
              </div>
              <div className="mt-5 text-[15px] font-semibold tracking-tight text-navy-950">
                {name}
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                {note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
