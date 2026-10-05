
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProjectMock } from "@/components/ProjectMock";
import { Link } from "@/lib/router";
import { projects } from "@/data/projects";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { trackEvent } from "@/lib/analytics";

export function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Selected <span className="text-accent">work</span>
          </>
        }
        description="The projects below are demonstration case studies that show the kind of systems we design and build. Real client work will be published here with client permission."
      />

      <section className="bg-background">
        <div className="container-x space-y-14 py-20 sm:py-24">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 80, 160)}>
              <Link
                to={`/work/${p.slug}`}
                onClick={() =>
                  trackEvent("case_study_click", {
                    project: p.slug,
                    location: "work_page",
                  })
                }
                className={`group grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1
                    ? "lg:[&>*:first-child]:order-2"
                    : ""
                }`}
              >
                <div className="relative">
                  <ProjectMock
                    accent={p.accent}
                    className="transition-transform duration-500 group-hover:scale-[1.01]"
                  />

                  <span className="absolute left-7 top-7 rounded-full bg-[hsl(var(--navy-deep))]/85 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-accent backdrop-blur">
                    Demo project
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {p.industry}
                  </p>

                  <h2 className="mt-3 font-display text-2xl font-bold text-heading sm:text-3xl">
                    {p.title}
                  </h2>

                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-heading transition-colors group-hover:text-accent">
                    <span className="link-underline">
                      View case study
                    </span>

                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Client work announcement */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-[hsl(var(--soft))] px-6 py-10 text-center sm:px-10 sm:py-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
              >
                <div className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="relative mx-auto max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  More to come
                </p>

                <h2 className="mt-3 font-display text-2xl font-bold text-heading sm:text-3xl">
                  More client case studies coming soon
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  We are building and documenting new client projects.
                  Published case studies will appear here once the work is
                  completed and approved for public sharing.
                </p>

                <p className="mt-5 text-sm font-medium text-heading/80">
                  Ask us for references or examples relevant to your project.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

