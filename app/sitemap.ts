import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE_URL = "https://sportspacepro.pl";

// Static pages carry no lastModified on purpose: `new Date()` would stamp every
// page with the build time on each deploy, which tells crawlers that all pages
// changed when they did not. Articles keep their real dates.
export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/artykuly/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/self-assessment`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/self-assessment/football`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/self-assessment/fitness`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/self-assessment/tennis-padel`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/commercial-score`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/commercial-score/zawodnik`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/commercial-score/organizacja`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/brief-sponsoringowy`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/narzedzia`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kalkulator-phv`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/artykuly`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/partnerzy`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...articleEntries,
    {
      url: `${BASE_URL}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/regulamin`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
