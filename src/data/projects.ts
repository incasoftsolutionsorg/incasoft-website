import projectsData from "./projects.json";

/**
 * Portfolio / case studies.
 *
 * Content lives in `projects.json` — add, remove or reorder projects there
 * (array order is display order). Images go in `public/image/projects/<slug>/`.
 */
export interface Project {
  slug: string;
  title: string;
  industry: string;
  /** Short type label, e.g. "Web Application" */
  category?: string;
  tags: string[];
  /** Short highlight chips shown on the case study page */
  highlights?: string[];
  summary: string;
  /** Longer description shown at the top of the case study */
  overview?: string;
  /** Single problem/approach pair. Use `challenges` instead for several. */
  challenge?: string;
  solution?: string;
  /** Several numbered challenge/solution pairs */
  challenges?: { challenge: string; solution: string }[];
  features: string[];
  technology: string[];
  /** Architecture building blocks, shown as chips */
  architecture?: string[];
  /** Security measures, shown as a checklist */
  security?: string[];
  /** What we did on the project */
  role?: string;
  /** Main image used on cards and the case study hero. Falls back to the mock UI. */
  coverImage?: string;
  /** Screenshots shown in the case study gallery */
  gallery?: string[];
  /** Outcome paragraph, shown in the "Outcome" section */
  outcome?: string;
  /** Measurable results, listed in the "Outcome" section */
  results?: string[];
  /** Public URL of the running project — shows a "View live project" button */
  liveUrl?: string;
  /** Short disclaimer / note shown under the overview */
  note?: string;
  /** e.g. "Completed", "In progress". Demo projects always show "Demo". */
  status?: string;
  /** Visual accent for the code-drawn mock UI, used when there is no coverImage */
  accent: "pos" | "dashboard" | "service";
  isDemo: boolean;
  /** Shown in the home page "Selected work" section (first 3 are used) */
  featured?: boolean;
}

export const projects = projectsData as Project[];

export const FEATURED_LIMIT = 3;

export function getFeaturedProjects(limit = FEATURED_LIMIT): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
