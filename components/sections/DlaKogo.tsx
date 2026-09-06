import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Dumbbell,
  Target,
  Flag,
  Waves,
  Users,
  type LucideIcon,
} from "lucide-react";

const audiences: {
  icon: LucideIcon;
  name: string;
  note: string;
  href: string;
}[] = [
  {
    icon: CircleDot,
    name: "Akademie i Kluby Piłkarskie",
    note: "Akademie młodzieżowe i kluby pro",
    href: "/self-assessment/football",
  },
  {
    icon: Target,
    name: "Tenis i Padel",
    note: "Kluby tenisowe i padlowe",
    href: "/self-assessment/tennis-padel",
  },
  {
    icon: Flag,
    name: "Golf i Country Kluby",
    note: "Kluby i akademie golfowe",
    href: "/self-assessment",
  },
  {
    icon: Waves,
    name: "Pływanie i Sporty Wodne",
    note: "Akademie i kluby pływackie",
    href: "/self-assessment",
  },
  {
    icon: Dumbbell,
    name: "Fitness i Wellness",
    note: "Siłownie, studia fitness, kluby wellness",
    href: "/self-assessment/fitness",
  },
  {
    icon: Users,
    name: "Kluby Wielosekcyjne",
    note: "Organizacje z wieloma dyscyplinami",
    href: "/self-assessment",
  },
];

export function DlaKogo() {
  return (
    <section id="dla-kogo" className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Dla kogo?
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Pracujemy z organizacjami w wielu dyscyplinach.
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-relaxed text-muted-foreground">
            Metodologia jest uniwersalna. Adaptujemy ją do specyfiki danej
            dyscypliny, struktury klubu i segmentu odbiorców.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-3">
          {audiences.map(({ icon: Icon, name, note, href }) => (
            <Link
              key={name}
              href={href}
              className="group relative flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_18px_36px_-20px_rgba(15,23,42,0.18)]"
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
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-navy-800 transition-colors group-hover:text-navy-950">
                Zrób Self-Audit
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
