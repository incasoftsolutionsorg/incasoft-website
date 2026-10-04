import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { insights } from "@/data/insights";

export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Ideas on software <span className="text-accent">&amp; business</span></>}
        description="Practical perspectives on software, automation and digital transformation for growing businesses."
      />
      <section className="bg-background">
        <div className="container-x py-20 sm:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-400 hover:border-accent/50 hover:shadow-[0_20px_50px_-24px_rgba(11,35,64,0.35)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--soft))] text-heading">
                    <BookOpen className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{a.topic}</p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-heading">
                    <Link to={`/insights/${a.slug}`} className="transition-colors group-hover:text-accent">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{a.excerpt}</p>
                  <Link
                    to={`/insights/${a.slug}`}
                    className="mt-auto inline-flex min-h-[44px] items-end gap-2 pt-5 text-sm font-semibold text-accent"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150} className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Have a topic you'd like us to cover?{" "}
              <Link to="/contact" className="group inline-flex items-center gap-1.5 font-semibold text-accent">
                <span className="link-underline">Suggest it</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
