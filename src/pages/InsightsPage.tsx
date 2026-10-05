
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { insights } from "@/data/insights";

const INITIAL_ARTICLES = 3;
const ARTICLES_PER_LOAD = 3;

export function InsightsPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLES);

  const visibleArticles = insights.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < insights.length;

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + ARTICLES_PER_LOAD, insights.length),
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Ideas on software{" "}
            <span className="text-accent">&amp; business</span>
          </>
        }
        description="Practical insights on software, automation and digital transformation for growing businesses."
      />

      <section className="bg-background">
        <div className="container-x py-16 sm:py-20 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Popular insights</p>

              <h2
                className="
                  mt-4
                  font-display
                  text-[clamp(1.7rem,6vw,2.6rem)]
                  font-bold
                  uppercase
                  leading-[1.08]
                  text-heading
                  text-balance
                "
              >
                Ideas worth exploring
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Practical knowledge and perspectives on technology, business
                systems and digital transformation.
              </p>
            </div>
          </Reveal>

          <div
            className="
              mt-10
              grid
              gap-5
              sm:mt-12
              sm:gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {visibleArticles.map((article, index) => (
              <Reveal
                key={article.slug}
                delay={(index % ARTICLES_PER_LOAD) * 90}
                className="min-w-0"
              >
                <Link
                  to={`/insights/${article.slug}`}
                  className="
                    group
                    flex
                    h-full
                    min-w-0
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    transition-all
                    duration-400
                    hover:-translate-y-1.5
                    hover:border-accent/50
                    hover:shadow-[0_24px_55px_-25px_rgba(11,35,64,0.35)]
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      min-h-[150px]
                      items-end
                      overflow-hidden
                      bg-[hsl(var(--soft))]
                      p-5
                      sm:min-h-[165px]
                      sm:p-6
                    "
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-40
                        w-40
                        rounded-full
                        bg-accent/10
                        blur-3xl
                        transition-transform
                        duration-700
                        group-hover:scale-125
                      "
                      aria-hidden="true"
                    />

                    <div
                      className="
                        relative
                        flex
                        w-full
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <span
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-border
                          bg-background
                          text-heading
                          shadow-sm
                          transition-all
                          duration-300
                          group-hover:border-accent/40
                          group-hover:bg-accent
                          group-hover:text-[#06202E]
                        "
                      >
                        <BookOpen
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </span>

                      {article.featured && (
                        <span
                          className="
                            rounded-full
                            bg-accent/10
                            px-2.5
                            py-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-accent
                          "
                        >
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      p-5
                      sm:p-6
                    "
                  >
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-x-3
                        gap-y-2
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-accent
                          sm:text-[11px]
                        "
                      >
                        {article.topic}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-border" />

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          font-medium
                          text-muted-foreground
                          sm:text-[11px]
                        "
                      >
                        <Clock3
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                        {article.readTime}
                      </span>
                    </div>

                    <h3
                      className="
                        mt-3
                        break-words
                        font-display
                        text-[17px]
                        font-bold
                        leading-snug
                        text-heading
                        transition-colors
                        duration-300
                        group-hover:text-accent
                        sm:text-lg
                      "
                    >
                      {article.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[13px]
                        leading-relaxed
                        text-muted-foreground
                        sm:text-[13.5px]
                      "
                    >
                      {article.excerpt}
                    </p>

                    <span
                      className="
                        mt-auto
                        flex
                        items-center
                        gap-1.5
                        pt-6
                        text-[12px]
                        font-semibold
                        text-heading
                        transition-colors
                        duration-300
                        group-hover:text-accent
                        sm:text-[13px]
                      "
                    >
                      Read article

                      <ArrowRight
                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {hasMoreArticles && (
            <Reveal delay={100} className="mt-10 sm:mt-12">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="
                    group
                    inline-flex
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-border
                    bg-card
                    px-5
                    text-sm
                    font-semibold
                    text-heading
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-accent/50
                    hover:bg-accent
                    hover:text-[#06202E]
                    hover:shadow-[0_12px_30px_-15px_hsl(var(--accent))]
                    active:scale-[0.98]
                    sm:px-6
                  "
                >
                  Explore More Insights

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Reveal>
          )}

          {!hasMoreArticles && (
            <Reveal delay={100} className="mt-10 sm:mt-12">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  You&apos;ve reached the end of our insights.
                </p>

                <Link
                  to="/contact"
                  className="
                    group
                    mt-3
                    inline-flex
                    items-center
                    gap-1.5
                    text-sm
                    font-semibold
                    text-accent
                  "
                >
                  <span className="link-underline">Suggest a topic</span>

                  <ArrowRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
