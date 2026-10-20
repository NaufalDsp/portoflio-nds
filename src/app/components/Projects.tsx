import { ArrowRight, ArrowUpRight, Github, Lock } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { getProjects } from "../data/projects";
import type { Project } from "../types/portfolio";
import { ProjectDetailsDialog } from "./ProjectDetailsDialog";

function ProjectCard({
  project,
  index,
  onOpenDetails,
  featured = false,
}: {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
  featured?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-lg border transition-colors duration-200 ${
        featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : "flex flex-col"
      }`}
      style={{
        background: "var(--portfolio-surface)",
        borderColor: "var(--portfolio-border)",
      }}>
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-[var(--portfolio-surface-raised)] ${
          featured ? "lg:aspect-auto lg:min-h-[360px]" : ""
        }`}>
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          loading={index > 0 ? "lazy" : "eager"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div
        className={`flex flex-col ${featured ? "justify-center p-6 sm:p-9 lg:p-10" : "flex-1 p-5 sm:p-6"}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {featured && (
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--portfolio-accent)" }}>
              {t.projects.selectedBadge}
            </span>
          )}
          {project.isPrivate && (
            <span
              className="inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[11px] font-medium"
              style={{
                borderColor: "var(--portfolio-border)",
                color: "var(--portfolio-muted)",
              }}>
              <Lock size={11} aria-hidden="true" />
              {t.projects.privateBadge}
            </span>
          )}
        </div>

        <div className="mb-3 flex items-start justify-between gap-3">
          <h3
            className={`${featured ? "text-2xl sm:text-3xl" : "text-lg"} font-bold leading-tight`}
            style={{ color: "var(--portfolio-text)" }}>
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {!project.isPrivate &&
              project.links.github &&
              project.links.github !== "#" && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors hover:text-[var(--portfolio-accent)]"
                  style={{
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-muted)",
                  }}>
                  <Github size={15} aria-hidden="true" />
                </a>
              )}
            {!project.isPrivate &&
              project.links.live &&
              project.links.live !== "#" && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors hover:text-[var(--portfolio-accent)]"
                  style={{
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-muted)",
                  }}>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
          </div>
        </div>

        <p
          className={`${featured ? "max-w-xl text-base" : "text-sm"} mb-5 leading-relaxed`}
          style={{ color: "var(--portfolio-muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {project.technologies.map(({ name }) => (
            <span
              key={name}
              className="font-mono text-xs"
              style={{
                color: "var(--portfolio-muted)",
              }}>
              {name}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          aria-label={`View details for ${project.title}`}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold transition-colors hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-focus)] focus-visible:ring-offset-4">
          <span style={{ color: "var(--portfolio-accent)" }}>
            {t.projects.readProject}
          </span>
          <ArrowRight
            size={15}
            aria-hidden="true"
            style={{ color: "var(--portfolio-accent)" }}
          />
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { language, t } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const projects = useMemo(() => getProjects(language), [language]);
  const featuredProject = projects.find((project) => project.featured);
  const supportingProjects = projects.filter((project) => !project.featured);

  const selectedProject = useMemo(
    () =>
      selectedProjectId !== null
        ? projects.find((p) => p.id === selectedProjectId) ?? null
        : null,
    [projects, selectedProjectId],
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: "var(--background)",
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--portfolio-accent)" }}>
            {t.projects.overline}
          </p>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            {t.projects.title}
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            {t.projects.description}
          </p>
        </motion.div>

        {featuredProject && (
          <div className="mb-5">
            <ProjectCard
              project={featuredProject}
              index={0}
              featured
              onOpenDetails={(p) => setSelectedProjectId(p.id)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {supportingProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              onOpenDetails={(p) => setSelectedProjectId(p.id)}
            />
          ))}
        </div>
      </div>
      <ProjectDetailsDialog
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProjectId(null);
        }}
      />
    </section>
  );
}
