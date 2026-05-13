import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedArticles, CATEGORY_LABELS } from "@/lib/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { value: "all", label: "Wszystkie" },
  { value: "artykul", label: CATEGORY_LABELS.artykul },
  { value: "case-study", label: CATEGORY_LABELS["case-study"] },
  { value: "raport", label: CATEGORY_LABELS.raport },
  { value: "webinar", label: CATEGORY_LABELS.webinar },
] as const;

export function Articles() {
  const featured = getFeaturedArticles(3);

  return (
    <section id="articles" className="border-b border-navy-100 bg-white">
      <div className="container py-20 md:py-28">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Wiedza
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Artykuły, case study i raporty.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
              Publikujemy wyniki badań, analizy przypadków i praktyczne
              przewodniki dla zarządów akademii i klubów sportowych.
            </p>
          </div>

          {/* Category pills — desktop */}
          <div className="hidden flex-wrap gap-2 md:flex">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={
                  cat.value === "all"
                    ? "/artykuly"
                    : `/artykuly?kategoria=${cat.value}`
                }
                className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-navy-700 transition-colors hover:border-navy-800 hover:text-navy-950"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Category pills — mobile */}
        <div className="mt-6 flex flex-wrap gap-2 md:hidden">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={
                cat.value === "all"
                  ? "/artykuly"
                  : `/artykuly?kategoria=${cat.value}`
              }
              className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-navy-700 transition-colors hover:border-navy-800 hover:text-navy-950"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/artykuly">
              Wszystkie artykuły i raporty
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
