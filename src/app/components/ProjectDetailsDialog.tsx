import { ExternalLink, Github, Lock } from "lucide-react";
import type { Project } from "../types/portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ProjectDetailsDialogProps {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDialog({
  project,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      {project && (
        <DialogContent
          className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-3xl"
          style={{
            background: "var(--portfolio-surface)",
            borderColor: "var(--portfolio-border)",
            color: "var(--portfolio-text)",
          }}>
          <div className="h-48 overflow-hidden bg-black/10 sm:h-72">
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-7 p-5 sm:p-8">
            <DialogHeader className="gap-3 text-left">
              <div className="flex flex-wrap items-center gap-2">
                {project.featured && (
                  <span
                    className="rounded px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: "var(--portfolio-accent-soft)",
                      color: "var(--portfolio-accent-strong)",
                    }}>
                    Featured project
                  </span>
                )}
                {project.isPrivate && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-semibold"
                    style={{
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-muted)",
                    }}>
                    <Lock size={12} aria-hidden="true" />
                    Private project
                  </span>
                )}
              </div>
              <DialogTitle className="text-2xl font-bold sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription
                className="text-sm leading-relaxed"
                style={{ color: "var(--portfolio-muted)" }}>
                {project.description}
              </DialogDescription>
            </DialogHeader>

            {project.caseStudy && (
              <section aria-labelledby="project-contribution-heading">
                <h3
                  id="project-contribution-heading"
                  className="mb-2 text-sm font-semibold"
                  style={{ color: "var(--portfolio-text)" }}>
                  My Role
                </h3>
                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: "var(--portfolio-muted)" }}>
                  {project.caseStudy.role}
                </p>
                <h4
                  className="mb-3 text-sm font-semibold"
                  style={{ color: "var(--portfolio-text)" }}>
                  Contributions
                </h4>
                <ul
                  className="list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-[var(--portfolio-accent)]"
                  style={{ color: "var(--portfolio-muted)" }}>
                  {project.caseStudy.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="project-technologies-heading">
              <h3
                id="project-technologies-heading"
                className="mb-3 text-sm font-semibold"
                style={{ color: "var(--portfolio-text)" }}>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(({ name, color }) => (
                  <span
                    key={name}
                    className="rounded border px-2.5 py-1 font-mono text-xs"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-muted)",
                    }}>
                    {name}
                  </span>
                ))}
              </div>
            </section>

            <div
              className="flex flex-wrap gap-3 border-t pt-5"
              style={{
                borderColor: "var(--portfolio-border)",
              }}>
              {project.isPrivate ? (
                <p
                  className="text-sm"
                  style={{ color: "var(--portfolio-muted)" }}>
                  Source code and live preview are not public.
                </p>
              ) : (
                <>
                  {project.links.github && project.links.github !== "#" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--portfolio-surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-focus)]"
                      style={{
                        borderColor: "var(--portfolio-border)",
                        color: "var(--portfolio-text)",
                      }}>
                      <Github size={16} aria-hidden="true" />
                      Source code
                    </a>
                  )}
                  {project.links.live && project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-focus)]"
                      style={{
                        background: "var(--portfolio-accent)",
                        color: "var(--portfolio-accent-contrast)",
                      }}>
                      <ExternalLink size={16} aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                  {(!project.links.github || project.links.github === "#") &&
                    (!project.links.live || project.links.live === "#") && (
                      <p
                        className="text-sm"
                        style={{ color: "var(--portfolio-muted)" }}>
                        No public repository or live demo is available.
                      </p>
                    )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
