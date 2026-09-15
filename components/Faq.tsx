export type FaqItem = {
  question: string;
  answer: string;
};

// Renders visible Q&A text and its FAQPage JSON-LD from the same array, so the
// structured data can never drift from what a visitor actually reads on the
// page (all content stays plainly visible — no accordion, nothing collapsed).
export function FaqSection({
  title = "Najczęściej zadawane pytania",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="border-b border-navy-100 bg-navy-50/40">
      <div className="container py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-700">
            {title}
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-navy-100 bg-white p-5"
              >
                <h3 className="text-[15px] font-semibold leading-snug text-navy-950">
                  {item.question}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
