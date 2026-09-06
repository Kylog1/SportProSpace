"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Dumbbell,
  Target,
  Flag,
  Waves,
  Users,
  MoreHorizontal,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SPORTS, type SportEntry } from "@/lib/assessment/sports";
import { trackSportSelected, trackLeadSubmitted } from "@/lib/analytics";

const SPORT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  football: CircleDot,
  fitness: Dumbbell,
  "tennis-padel": Target,
  golf: Flag,
  swimming: Waves,
  "multi-sport": Users,
  other: MoreHorizontal,
};

export function SelfAssessmentHub() {
  return (
    <section className="relative overflow-hidden border-b border-navy-100 bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg mask-fade-bottom opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-navy-100/50 blur-3xl"
      />

      <div className="container relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="soft" className="mb-5 gap-1.5 px-3 py-1">
            <ShieldCheck className="size-3.5" />
            Self-Audit dla klubów i organizacji sportowych
          </Badge>

          <h1 className="text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
            Wybierz swoją dyscyplinę.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Self-Audit dostosowany do specyfiki Twojej organizacji. Kilka minut,
            żeby zobaczyć, gdzie jesteście mocni, a gdzie tracicie potencjał.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPORTS.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>

        {/* Different question, same visitor: Self-Audit is about keeping the
            members you have, Commercial Score about what you are worth to a
            brand. People arriving here often want the second one. */}
        <div className="mx-auto mt-12 max-w-5xl">
          <Link
            href="/commercial-score"
            className="group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-navy-100 bg-navy-50/50 px-5 py-4 transition-colors hover:border-navy-300 hover:bg-navy-50 sm:px-6"
          >
            <div className="min-w-0">
              <div className="text-[15px] font-medium text-navy-950">
                Sprawdzasz też potencjał sponsorski?
              </div>
              <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted-foreground">
                Commercial Score pokazuje, jak Wasz sportowy potencjał wygląda
                z perspektywy marki, która rozważa współpracę.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-navy-800">
              Policz Commercial Score
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SportCard({ sport }: { sport: SportEntry }) {
  const Icon = SPORT_ICONS[sport.id] ?? MoreHorizontal;

  if (sport.status === "available" && sport.href) {
    return (
      <Link
        href={sport.href}
        onClick={() => trackSportSelected(sport.id)}
        className="group relative flex flex-col overflow-hidden rounded-xl bg-navy-900 p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.40)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex size-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
            <Icon className="size-5" />
          </div>
          <Badge className="shrink-0 border-none bg-white/15 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
            Dostępne teraz
          </Badge>
        </div>
        <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-white">
          {sport.label}
        </h3>
        <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-white/65">
          {sport.note}
        </p>
        <span className="relative mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-white">
          Rozpocznij Self-Audit
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    );
  }

  return <ComingSoonCard sport={sport} Icon={Icon} />;
}

function ComingSoonCard({
  sport,
  Icon,
}: {
  sport: SportEntry;
  Icon: ComponentType<{ className?: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/notify-sport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sport: sport.id, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Nie udało się wysłać. Spróbuj ponownie.");
        return;
      }
      setStatus("success");
      trackLeadSubmitted(`notify-sport:${sport.id}`);
    } catch {
      setStatus("error");
      setErrorMsg("Problem z połączeniem. Spróbuj ponownie.");
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition-all hover:border-navy-300">
      <div className="flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-800">
          <Icon className="size-5" />
        </div>
        <Badge variant="outline" className="shrink-0 text-[10px] font-semibold">
          Wkrótce
        </Badge>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy-950">
        {sport.label}
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
        {sport.note}
      </p>

      {status === "success" ? (
        <div className="mt-5 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-[13px] text-emerald-900">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          Dziękujemy. Odezwiemy się, gdy audyt będzie gotowy.
        </div>
      ) : open ? (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-2.5">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden
          />
          <input
            type="email"
            required
            placeholder="jan@klub.pl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-[15px] text-navy-950 outline-none transition-colors placeholder:text-navy-300 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
          />
          {errorMsg && (
            <p role="alert" className="text-[12px] text-red-700">
              {errorMsg}
            </p>
          )}
          <Button type="submit" size="sm" disabled={status === "submitting"} className="mt-1">
            {status === "submitting" ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Wysyłam...
              </>
            ) : (
              <>
                <Bell className="size-3.5" />
                Powiadom mnie
              </>
            )}
          </Button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => {
            trackSportSelected(sport.id);
            setOpen(true);
          }}
          className={cn(
            "mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-navy-700 transition-colors hover:text-navy-950"
          )}
        >
          <Bell className="size-3.5" />
          Powiadom mnie o starcie
        </button>
      )}
    </div>
  );
}
