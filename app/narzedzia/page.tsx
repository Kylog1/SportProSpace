import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Narzędzia | Sport Space Pro",
  description:
    "Bezpłatne narzędzia Sport Space Pro: Self-Audit, Commercial Score, brief sponsoringowy i kalkulator PHV. Wybierz to, którego potrzebujesz.",
  alternates: {
    canonical: "https://sportspacepro.pl/narzedzia",
  },
};

export default function NarzedziaPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-navy-100 bg-white">
          <div className="container py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
                Narzędzia
              </div>
              <h1 className="mt-4 text-balance text-[36px] font-semibold leading-[1.05] tracking-tightest text-navy-950 sm:text-[44px] lg:text-[52px]">
                Wybierz narzędzie
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                Cztery bezpłatne narzędzia dla klubów, zawodników, marek i
                rodziców. Każde działa w kilka minut.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.28)] sm:p-8"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl border border-navy-100 bg-navy-50 text-navy-800">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-5 text-[20px] font-semibold tracking-[-0.025em] text-navy-950">
                      {tool.title}
                    </h2>
                    <div className="mt-1 text-[12.5px] font-medium text-navy-700">
                      {tool.audience}
                    </div>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">
                      {tool.body}
                    </p>
                    <span className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-5 text-sm font-medium text-white shadow-sm transition-colors group-hover:bg-navy-900">
                      {tool.cta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
