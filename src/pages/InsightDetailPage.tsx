
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { useEffect, useState } from "react";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { getInsightBySlug, insights } from "@/data/insights";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function InsightDetailPage() {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const updateSlug = () => {
      const hashPath = window.location.hash.replace(/^#/, "");
      const parts = hashPath.split("/").filter(Boolean);

      setSlug(parts[1] ?? "");
    };

    updateSlug();

    window.addEventListener("hashchange", updateSlug);

    return () => {
      window.removeEventListener("hashchange", updateSlug);
    };
  }, []);

  const article = slug ? getInsightBySlug(slug) : undefined;

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedInsights = insights
    .filter((insight) => insight.slug !== article.slug)
    .filter((insight) => insight.topic === article.topic)
    .slice(0, 3);

  const fallbackRelatedInsights =
    relatedInsights.length > 0
      ? relatedInsights
      : insights
          .filter((insight) => insight.slug !== article.slug)
          .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={article.topic}
        title={article.title}
        description={article.excerpt}
      />

      <main className="bg-background">
        <article>
          <div className="container-x py-12 sm:py-16 md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  <CalendarDays
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />

                  {article.date}
                </span>

                <span className="h-1 w-1 rounded-full bg-border" />

                <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Clock3
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />

                  {article.readTime}
                </span>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
              <div className="min-w-0">
                <Reveal>
                  <div className="rounded-2xl border border-border bg-[hsl(var(--soft))] p-5 sm:p-7 md:p-8">
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {article.excerpt}
                    </p>
                  </div>
                </Reveal>

                <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
                  {article.content.map((section, index) => (
                    <Reveal key={`${article.slug}-section-${index}`}>
                      <section>
                        {section.heading && (
                          <h2 className="font-display text-2xl font-bold leading-tight text-heading sm:text-3xl">
                            {section.heading}
                          </h2>
                        )}

                        <div
                          className={
                            section.heading
                              ? "mt-5 space-y-4"
                              : "space-y-4"
                          }
                        >
                          {section.paragraphs.map(
                            (paragraph, paragraphIndex) => (
                              <p
                                key={`${article.slug}-paragraph-${index}-${paragraphIndex}`}
                                className="text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8"
                              >
                                {paragraph}
                              </p>
                            ),
                          )}
                        </div>

                        {section.points &&
                          section.points.length > 0 && (
                            <ul className="mt-6 space-y-3">
                              {section.points.map(
                                (point, pointIndex) => (
                                  <li
                                    key={`${article.slug}-point-${index}-${pointIndex}`}
                                    className="flex items-start gap-3 text-[14px] leading-6 text-muted-foreground sm:text-[15px]"
                                  >
                                    <CheckCircle2
                                      className="mt-1 h-4 w-4 shrink-0 text-accent"
                                      aria-hidden="true"
                                    />

                                    <span>{point}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                      </section>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={100}>
                  <div className="mt-12 border-t border-border pt-8 sm:mt-16">
                    <Link
                      to="/insights"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-heading transition-colors duration-300 hover:text-accent"
                    >
                      <ArrowLeft
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                        aria-hidden="true"
                      />

                      <span className="link-underline">
                        Back to Insights
                      </span>
                    </Link>
                  </div>
                </Reveal>
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <Reveal delay={100}>
                  <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                    <p className="eyebrow">About this insight</p>

                    <div className="mt-5 space-y-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Topic
                        </p>

                        <p className="mt-1 text-sm font-semibold text-heading">
                          {article.topic}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Published
                        </p>

                        <p className="mt-1 text-sm font-semibold text-heading">
                          {article.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Reading time
                        </p>

                        <p className="mt-1 text-sm font-semibold text-heading">
                          {article.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={180}>
                  <div className="mt-5 rounded-2xl border border-border bg-[hsl(var(--soft))] p-5 sm:p-6">
                    <p className="eyebrow">Need help?</p>

                    <h3 className="mt-3 font-display text-xl font-bold leading-tight text-heading">
                      Have a project in mind?
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Let&apos;s discuss how software and automation can
                      support your business.
                    </p>

                    <Link
                      to="/contact"
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                    >
                      <span className="link-underline">
                        Start a conversation
                      </span>

                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </article>

        {fallbackRelatedInsights.length > 0 && (
          <section className="border-t border-border bg-[hsl(var(--soft))]">
            <div className="container-x py-16 sm:py-20 md:py-24">
              <Reveal>
                <div className="max-w-2xl">
                  <p className="eyebrow">Keep reading</p>

                  <h2 className="mt-4 font-display text-[clamp(1.7rem,5vw,2.6rem)] font-bold uppercase leading-[1.08] text-heading">
                    More insights
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Explore more practical ideas about software,
                    automation and digital transformation.
                  </p>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {fallbackRelatedInsights.map((insight, index) => (
                  <Reveal key={insight.slug} delay={index * 90}>
                    <Link
                      to={`/insights/${insight.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_55px_-25px_rgba(11,35,64,0.35)] sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                          {insight.topic}
                        </span>

                        <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock3
                            className="h-3 w-3"
                            aria-hidden="true"
                          />

                          {insight.readTime}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-heading transition-colors duration-300 group-hover:text-accent">
                        {insight.title}
                      </h3>

                      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                        {insight.excerpt}
                      </p>

                      <span className="mt-auto flex items-center gap-1.5 pt-6 text-xs font-semibold text-heading transition-colors duration-300 group-hover:text-accent">
                        Read article

                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <FinalCTA />
    </>
  );
}
