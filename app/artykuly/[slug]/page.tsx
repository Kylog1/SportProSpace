import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
  formatDate,
  CATEGORY_LABELS,
} from "@/lib/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface Props {
  params: { slug: string };
}

// Generate all static paths
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// Per-article SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: `${article.title} - Sport Space Pro`,
    description: article.excerpt,
    alternates: {
      canonical: `https://sportspacepro.pl/artykuly/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  // Get prev/next
  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // JSON-LD: Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Sport Space Pro",
      url: "https://sportspacepro.pl",
    },
    keywords: article.tags.join(", "),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sport Space Pro",
        item: "https://sportspacepro.pl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artykuły",
        item: "https://sportspacepro.pl/artykuly",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://sportspacepro.pl/artykuly/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        {/* Article */}
        <article itemScope itemType="https://schema.org/Article">
          <div className="bg-white">
            <div className="container py-6 md:py-10">
              <div className="mx-auto max-w-5xl">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <Link href="/" className="hover:text-navy-950">Sport Space Pro</Link>
                  <span>/</span>
                  <Link href="/artykuly" className="hover:text-navy-950">Artykuły</Link>
                  <span>/</span>
                  <span className="text-navy-950">{CATEGORY_LABELS[article.category]}</span>
                </nav>

                {/* Category + tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-navy-200 bg-navy-50 px-3 py-0.5 text-[12px] font-semibold text-navy-800">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/artykuly?q=${tag}`}
                      className="text-[12px] font-medium text-muted-foreground hover:text-navy-950"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                {/* Title */}
                <h1
                  itemProp="headline"
                  className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-[38px] md:leading-[1.15]"
                >
                  {article.title}
                </h1>

                {/* Excerpt */}
                <p
                  itemProp="description"
                  className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground md:max-w-2xl"
                >
                  {article.excerpt}
                </p>

                {/* PDF download CTA */}
                {article.pdfUrl && (
                  <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-navy-200 bg-navy-50/60 p-4">
                    <div className="flex-1">
                      <div className="text-[13.5px] font-semibold text-navy-950">
                        Pełny raport PDF do pobrania za darmo
                      </div>
                      <div className="text-[12.5px] text-muted-foreground">
                        Bez zostawiania danych - link otwiera się w nowej karcie.
                      </div>
                    </div>
                    <Button asChild size="lg">
                      <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download />
                        Pobierz raport PDF
                      </a>
                    </Button>
                  </div>
                )}

                {/* Divider */}
                <div className="mt-6 border-t border-navy-100 md:mt-8" />

              </div>

              {/* Body grid */}
              <div className="mx-auto mt-8 grid max-w-5xl gap-10 lg:grid-cols-[1fr_260px]">
                {/* Main content */}
                <div
                  itemProp="articleBody"
                  className="prose prose-navy max-w-none text-[16px] leading-[1.8] text-navy-900
                    [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-navy-950
                    [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-navy-950
                    [&_p]:mb-5 [&_p]:text-[15.5px] [&_p]:leading-relaxed [&_p]:text-navy-800
                    [&_strong]:font-semibold [&_strong]:text-navy-950
                    [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
                    [&_li]:text-[15.5px] [&_li]:text-navy-800"
                >
                  {article.content
                    .trim()
                    .split("\n")
                    .map((line, i) => {
                      if (line.startsWith("## "))
                        return (
                          <h2 key={i}>{line.replace("## ", "")}</h2>
                        );
                      if (line.startsWith("### "))
                        return (
                          <h3 key={i}>{line.replace("### ", "")}</h3>
                        );
                      if (line.startsWith("- "))
                        return <li key={i}>{line.replace("- ", "")}</li>;
                      if (line.trim() === "") return null;
                      return <p key={i}>{line}</p>;
                    })}

                  {/* PDF download CTA (bottom) */}
                  {article.pdfUrl && (
                    <div className="mt-2 flex flex-wrap items-center gap-3 rounded-xl border border-navy-200 bg-navy-50/60 p-4">
                      <div className="flex-1">
                        <div className="text-[13.5px] font-semibold text-navy-950">
                          Pełny raport PDF do pobrania za darmo
                        </div>
                        <div className="text-[12.5px] text-muted-foreground">
                          Bez zostawiania danych - link otwiera się w nowej karcie.
                        </div>
                      </div>
                      <Button asChild size="lg">
                        <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download />
                          Pobierz raport PDF
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                  <div className="sticky top-24 space-y-6">
                    {/* Meta */}
                    <div className="rounded-xl border border-navy-100 bg-navy-50/60 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        O materiale
                      </p>
                      <dl className="mt-4 space-y-3 text-[13px]">
                        <div>
                          <dt className="text-muted-foreground">Kategoria</dt>
                          <dd className="font-medium text-navy-950">
                            {CATEGORY_LABELS[article.category]}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Opublikowano</dt>
                          <dd className="font-medium text-navy-950">
                            {formatDate(article.publishedAt)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Autor</dt>
                          <dd className="font-medium text-navy-950">
                            {article.author}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Tags */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Tagi
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/artykuly?q=${tag}`}
                            className="rounded-full border border-navy-100 bg-white px-3 py-1 text-[12px] font-medium text-navy-700 transition-colors hover:border-navy-800 hover:text-navy-950"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="border-t border-navy-100 bg-white">
            <div className="container py-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/artykuly/${prev.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-navy-100 p-5 transition-all hover:border-navy-300 hover:shadow-sm"
                  >
                    <ArrowLeft className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-navy-950" />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Poprzedni
                      </p>
                      <p className="mt-1 text-[14px] font-semibold leading-snug text-navy-950 group-hover:text-navy-700">
                        {prev.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {next && (
                  <Link
                    href={`/artykuly/${next.slug}`}
                    className="group flex items-start justify-end gap-3 rounded-xl border border-navy-100 p-5 text-right transition-all hover:border-navy-300 hover:shadow-sm"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Następny
                      </p>
                      <p className="mt-1 text-[14px] font-semibold leading-snug text-navy-950 group-hover:text-navy-700">
                        {next.title}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-navy-950" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section className="border-t border-navy-100 bg-navy-50/40">
            <div className="container py-14 md:py-16">
              <h2 className="text-xl font-semibold tracking-tight text-navy-950">
                Podobne materiały
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="border-t border-navy-100 bg-white">
          <div className="container py-14 text-center md:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-navy-950 md:text-3xl">
              Chcesz mierzyć doświadczenie w swoim klubie?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              Pierwsza rozmowa jest bezpłatna i niezobowiązująca. Wrócimy do
              Ciebie z propozycją zakresu badania w 8 godzin.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/#contact">Zamów badanie</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/artykuly">
                  <ArrowLeft className="size-4" />
                  Wróć do artykułów
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
