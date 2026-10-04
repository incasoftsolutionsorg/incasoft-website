import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { insights } from "@/data/insights";
import { Link } from "@/lib/router";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { FinalCTA } from "@/sections/home/FinalCTA";

export function InsightArticlePage({ slug }: { slug: string }) {
  const article = insights.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;

  return (
    <>
      <PageHero
        eyebrow={`Insights · ${article.topic}`}
        title={article.title}
        description={article.excerpt}
      />
      <section className="bg-background">
        <div className="container-x py-12 sm:py-16">
          <Reveal>
            <article className="mx-auto max-w-3xl">
              <div className="space-y-6">
                {article.content.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={`${block.type}-${index}`}
                        className="pt-4 font-display text-xl font-bold leading-snug text-heading sm:text-2xl"
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul
                        key={`${block.type}-${index}`}
                        className="list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-muted-foreground sm:text-base"
                      >
                        {block.items.map((item) => (
                          <li key={item} className="pl-1">{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={`${block.type}-${index}`}
                      className="text-[15px] leading-relaxed text-muted-foreground sm:text-base sm:leading-8"
                    >
                      {block.text}
                    </p>
                  );
                })}
              </div>
              <Link
                to="/insights"
                className="mt-12 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-heading"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all insights
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
