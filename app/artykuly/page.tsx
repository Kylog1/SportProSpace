"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { articles, type ArticleCategory, CATEGORY_LABELS } from "@/lib/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const FILTERS: { value: "all" | ArticleCategory; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "artykul", label: CATEGORY_LABELS.artykul },
  { value: "case-study", label: CATEGORY_LABELS["case-study"] },
  { value: "raport", label: CATEGORY_LABELS.raport },
  { value: "webinar", label: CATEGORY_LABELS.webinar },
];

const COUNTS: Record<"all" | ArticleCategory, number> = {
  all: articles.length,
  artykul: articles.filter((a) => a.category === "artykul").length,
  "case-study": articles.filter((a) => a.category === "case-study").length,
  raport: articles.filter((a) => a.category === "raport").length,
  webinar: articles.filter((a) => a.category === "webinar").length,
};

const PAGE_SIZE = 9;

export default function ArticulyPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ArticleCategory>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = category === "all" || a.category === category;
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, category]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  function handleFilter(value: "all" | ArticleCategory) {
    setCategory(value);
    setPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setPage(1);
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-navy-100 bg-white">
          <div className="container py-14 md:py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-navy-950"
            >
              <ArrowLeft className="size-3.5" />
              Sport Space Pro
            </Link>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-navy-950 md:text-5xl">
              Artykuły, case study i raporty.
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Wyniki badań, analizy przypadków i praktyczne przewodniki dla
              zarządów akademii sportowych i klubów profesjonalnych.
            </p>

            {/* Search */}
            <div className="relative mt-8 max-w-md">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Szukaj artykułów, case study, raportów..."
                className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-10 pr-4 text-[14px] text-navy-950 placeholder:text-muted-foreground focus:border-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-800/20"
              />
            </div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="bg-navy-50/40">
          <div className="container py-10 md:py-14">
            {/* Filter bar */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    category === f.value
                      ? "border-navy-800 bg-navy-800 text-white"
                      : "border-navy-200 bg-white text-navy-700 hover:border-navy-800 hover:text-navy-950"
                  }`}
                >
                  {f.label}
                  <span
                    className={`rounded-full px-1.5 py-px text-[10px] font-semibold ${
                      category === f.value
                        ? "bg-white/20 text-white"
                        : "bg-navy-100 text-navy-600"
                    }`}
                  >
                    {COUNTS[f.value]}
                  </span>
                </button>
              ))}
            </div>

            {/* Results count — aria-live announces changes to screen readers */}
            <p
              aria-live="polite"
              aria-atomic="true"
              className="mt-5 text-[13px] text-muted-foreground"
            >
              {filtered.length === 0
                ? "Brak wyników"
                : `${filtered.length} ${filtered.length === 1 ? "wynik" : "wyników"}`}
              {query && ` dla „${query}"`}
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
              <>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visible.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="rounded-lg border border-navy-200 bg-white px-6 py-2.5 text-[14px] font-medium text-navy-800 transition-colors hover:border-navy-800 hover:text-navy-950"
                    >
                      Wczytaj więcej ({filtered.length - visible.length} pozostałych)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-12 text-center">
                <p className="text-[16px] text-muted-foreground">
                  Nie znaleziono artykułów pasujących do wyszukiwania.
                </p>
                <button
                  onClick={() => { setQuery(""); setCategory("all"); }}
                  className="mt-4 text-[14px] font-medium text-navy-800 underline-offset-2 hover:underline"
                >
                  Wyczyść filtry
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
