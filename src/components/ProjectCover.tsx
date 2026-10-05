import { ProjectMock } from "@/components/ProjectMock";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** A project's cover screenshot, or the code-drawn mock UI when it has none. */
export function ProjectCover({
  project,
  className,
  eager = false,
}: {
  project: Project;
  className?: string;
  eager?: boolean;
}) {
  if (!project.coverImage) {
    return <ProjectMock accent={project.accent} className={className} />;
  }

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#0C2440]", className)}>
      <img
        src={project.coverImage}
        alt={`${project.title} — main screen`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
