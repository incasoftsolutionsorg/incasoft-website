
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProjectMock } from "@/components/ProjectMock";
import { CTA } from "@/components/CTA";
import { Link } from "@/lib/router";
import { projects } from "@/data/projects";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function CaseStudyPage({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <NotFoundPage />;

  const hasResults = Boolean(project.results?.length);

  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}
      <PageHero
        eyebrow={`Case study · ${project.industry}`}
        title={project.title}
        description={project.summary}
      />

      {/* =========================================================
          CASE STUDY CONTENT
      ========================================================= */}
      <section className="bg-background">
        <div className="container-x py-12 sm:py-16 md:py-20">
          {/* -------------------------------------------------------
              PROJECT MOCK
          ------------------------------------------------------- */}
          <Reveal>
            <div className="relative min-w-0">
              <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl">
                <ProjectMock
                  accent={project.accent}
                  className="
                    aspect-[16/10]
                    w-full
                    min-h-[220px]
                    sm:aspect-[16/8]
                    sm:min-h-[280px]
                  "
                />
              </div>

              <span
                className="
                  absolute
                  left-4
                  top-4
                  rounded-full
                  bg-[hsl(var(--navy-deep))]/85
                  px-2.5
                  py-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-accent
                  backdrop-blur
                  sm:left-6
                  sm:top-6
                  sm:px-3
                  sm:py-1.5
                  sm:text-[9.5px]
                  sm:tracking-[0.14em]
                "
              >
                Demo project
              </span>
            </div>
          </Reveal>

          {/* -------------------------------------------------------
              MAIN CONTENT + SIDEBAR
          ------------------------------------------------------- */}
          <div
            className="
              mt-10
              grid
              min-w-0
              gap-10
              sm:mt-12
              sm:gap-12
              lg:grid-cols-[1.5fr_1fr]
              lg:gap-16
            "
          >
            {/* =====================================================
                LEFT CONTENT
            ===================================================== */}
            <div className="min-w-0 space-y-10 sm:space-y-12">
              {/* ---------------------------------------------------
                  CHALLENGE
              --------------------------------------------------- */}
              <Reveal>
                <h2 className="eyebrow">The challenge</h2>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-relaxed
                    text-muted-foreground
                    sm:mt-4
                    sm:text-[15px]
                    md:text-base
                  "
                >
                  {project.challenge}
                </p>
              </Reveal>

              {/* ---------------------------------------------------
                  SOLUTION
              --------------------------------------------------- */}
              <Reveal>
                <h2 className="eyebrow">The solution</h2>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-relaxed
                    text-muted-foreground
                    sm:mt-4
                    sm:text-[15px]
                    md:text-base
                  "
                >
                  {project.solution}
                </p>
              </Reveal>

              {/* ---------------------------------------------------
                  KEY FEATURES
              --------------------------------------------------- */}
              <Reveal>
                <h2 className="eyebrow">Key features</h2>

                <ul
                  className="
                    mt-4
                    grid
                    gap-2.5
                    sm:mt-5
                    sm:gap-3
                    sm:grid-cols-2
                  "
                >
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-2.5
                        rounded-xl
                        border
                        border-border
                        bg-[hsl(var(--soft))]
                        p-3.5
                        sm:gap-3
                        sm:p-4
                      "
                    >
                      <Check
                        className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent
                        "
                        aria-hidden="true"
                      />

                      <span
                        className="
                          min-w-0
                          break-words
                          text-[13px]
                          font-medium
                          leading-relaxed
                          text-heading
                          sm:text-sm
                        "
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* ---------------------------------------------------
                  RESULTS
              --------------------------------------------------- */}
              <Reveal>
                <h2 className="eyebrow">Results</h2>

                {hasResults ? (
                  <ul
                    className="
                      mt-4
                      grid
                      gap-3
                      sm:grid-cols-2
                    "
                  >
                    {project.results?.map((result) => (
                      <li
                        key={result}
                        className="
                          rounded-xl
                          border
                          border-border
                          bg-[hsl(var(--soft))]
                          p-4
                          text-[13px]
                          font-medium
                          leading-relaxed
                          text-heading
                          sm:p-5
                          sm:text-sm
                        "
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    className="
                      mt-3
                      max-w-xl
                      rounded-xl
                      border
                      border-dashed
                      border-border
                      bg-[hsl(var(--soft))]
                      p-5
                      sm:mt-4
                      sm:p-6
                    "
                  >
                    <p
                      className="
                        text-[13px]
                        font-medium
                        leading-relaxed
                        text-heading
                        sm:text-sm
                      "
                    >
                      No client results are published for this
                      demonstration project.
                    </p>

                    <p
                      className="
                        mt-2
                        text-[12px]
                        leading-relaxed
                        text-muted-foreground
                        sm:text-sm
                      "
                    >
                      Approved client case studies will include measurable
                      outcomes here when results are available and cleared
                      for public sharing.
                    </p>
                  </div>
                )}
              </Reveal>
            </div>

            {/* =====================================================
                RIGHT SIDEBAR
            ===================================================== */}
            <Reveal delay={120}>
              <aside
                className="
                  min-w-0
                  space-y-5
                  sm:space-y-6
                  lg:sticky
                  lg:top-28
                "
              >
                {/* -------------------------------------------------
                    PROJECT INFO
                ------------------------------------------------- */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-border
                    p-4
                    sm:p-6
                  "
                >
                  <h3
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground
                      sm:text-xs
                      sm:tracking-[0.18em]
                    "
                  >
                    Project
                  </h3>

                  <dl className="mt-4 space-y-4 text-[13px] sm:text-sm">
                    {/* Industry */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <dt className="shrink-0 text-muted-foreground">
                        Industry
                      </dt>

                      <dd
                        className="
                          min-w-0
                          break-words
                          text-right
                          font-semibold
                          text-heading
                        "
                      >
                        {project.industry}
                      </dd>
                    </div>

                    {/* Services */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <dt className="shrink-0 text-muted-foreground">
                        Services
                      </dt>

                      <dd
                        className="
                          min-w-0
                          max-w-[65%]
                          break-words
                          text-right
                          font-semibold
                          leading-relaxed
                          text-heading
                        "
                      >
                        {project.tags.join(" · ")}
                      </dd>
                    </div>

                    {/* Status */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <dt className="text-muted-foreground">Status</dt>

                      <dd
                        className="
                          rounded-full
                          bg-accent/10
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          text-accent
                          sm:text-xs
                        "
                      >
                        Demonstration
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* -------------------------------------------------
                    TECHNOLOGY
                ------------------------------------------------- */}
                <div
                  className="
                    rounded-2xl
                    bg-[hsl(var(--navy-deep))]
                    p-4
                    text-white
                    sm:p-6
                  "
                >
                  <h3
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-accent
                      sm:text-xs
                      sm:tracking-[0.18em]
                    "
                  >
                    Technology
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technology.map((t) => (
                      <span
                        key={t}
                        className="
                          max-w-full
                          break-words
                          rounded-full
                          border
                          border-white/15
                          bg-white/5
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-medium
                          leading-tight
                          text-white/80
                          sm:px-3
                          sm:text-xs
                        "
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* -------------------------------------------------
                    CTA
                ------------------------------------------------- */}
                <CTA
                  to="/start-a-project"
                  className="
                    w-full
                    min-h-[46px]
                    text-sm
                  "
                >
                  Build Something Similar
                </CTA>
              </aside>
            </Reveal>
          </div>

          {/* -------------------------------------------------------
              BACK TO WORK
          ------------------------------------------------------- */}
          <Link
            to="/work"
            className="
              mt-10
              inline-flex
              min-h-[44px]
              items-center
              gap-2
              text-[13px]
              font-semibold
              text-muted-foreground
              transition-colors
              hover:text-heading
              sm:mt-14
              sm:text-sm
            "
          >
            <ArrowLeft
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            Back to all work
          </Link>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <FinalCTA />
    </>
  );
}

