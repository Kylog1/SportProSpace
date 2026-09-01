import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Article, CATEGORY_LABELS, formatDate } from "@/lib/articles";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

const CATEGORY_COLORS: Record<Article["category"], string> = {
  artykul: "bg-navy-50 text-navy-800 border-navy-200",
  "case-study": "bg-emerald-50 text-emerald-800 border-emerald-200",
  raport: "bg-violet-50 text-violet-800 border-violet-200",
  webinar: "bg-amber-50 text-amber-800 border-amber-200",
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link
      href={`/artykuly/${article.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)]",
        className
      )}
    >
      {/* Cover */}
      <div className="flex h-10 w-full items-center bg-navy-50 px-5">
        <span
          className={cn(
            "inline-flex items-center rounded-full border bg-white px-2.5 py-0.5 text-[11px] font-semibold",
            CATEGORY_COLORS[article.category]
          )}
        >
          {CATEGORY_LABELS[article.category]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mt-2.5 text-[16px] font-semibold leading-snug tracking-tight text-navy-950 group-hover:text-navy-700">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
          <time dateTime={article.publishedAt} className="text-[12px] text-muted-foreground">
            {formatDate(article.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-navy-800 transition-colors group-hover:text-navy-950">
            Czytaj
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
