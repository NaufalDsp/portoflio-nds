import { ExternalLink, Github, Lock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
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
  const { isDark } = useTheme();

  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      {project && (
        <DialogContent
          className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-3xl"
          style={{
            background: isDark ? "#111119" : "#ffffff",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            color: isDark ? "#E8EAF0" : "#1F2937",
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
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-500">
                    Featured project
                  </span>
                )}
                {project.isPrivate && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500">
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
                style={{ color: isDark ? "#A0A8C0" : "#6B7280" }}>
                {project.description}
              </DialogDescription>
            </DialogHeader>

            {project.caseStudy && (
              <section aria-labelledby="project-contribution-heading">
                <h3
                  id="project-contribution-heading"
                  className="mb-2 text-sm font-semibold"
                  style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                  My Role
                </h3>
                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: isDark ? "#A0A8C0" : "#6B7280" }}>
                  {project.caseStudy.role}
                </p>
                <h4
                  className="mb-3 text-sm font-semibold"
                  style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                  Contributions
                </h4>
                <ul
                  className="list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-sky-500"
                  style={{ color: isDark ? "#A0A8C0" : "#6B7280" }}>
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
                style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(({ name, color }) => (
                  <span
                    key={name}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                      color,
                    }}>
                    {name}
                  </span>
                ))}
              </div>
            </section>

            <div
              className="flex flex-wrap gap-3 border-t pt-5"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
              }}>
              {project.isPrivate ? (
                <p
                  className="text-sm"
                  style={{ color: isDark ? "#A0A8C0" : "#6B7280" }}>
                  Source code and live preview are not public.
                </p>
              ) : (
                <>
                  {project.links.github && project.links.github !== "#" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      style={{
                        borderColor: isDark
                          ? "rgba(255,255,255,0.14)"
                          : "rgba(0,0,0,0.12)",
                        color: isDark ? "#E8EAF0" : "#1F2937",
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
                      className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2">
                      <ExternalLink size={16} aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                  {(!project.links.github || project.links.github === "#") &&
                    (!project.links.live || project.links.live === "#") && (
                      <p
                        className="text-sm"
                        style={{ color: isDark ? "#A0A8C0" : "#6B7280" }}>
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
