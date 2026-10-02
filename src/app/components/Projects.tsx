import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { PROJECTS } from "../data/projects";
import type { Project } from "../types/portfolio";
import { useTheme } from "../context/ThemeContext";
import { ProjectDetailsDialog } from "./ProjectDetailsDialog";

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl border transition-all duration-300"
      style={{
        background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        boxShadow: isDark
          ? "0 4px 30px rgba(0,0,0,0.4)"
          : "0 4px 30px rgba(0,0,0,0.06)",
      }}>
      {project.featured && (
        <div
          className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs text-white"
          style={{
            background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}>
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-75"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent 30%, #0D0D12 100%)"
              : "linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-base"
            style={{
              fontWeight: 700,
              color: isDark ? "#E8EAF0" : "#1F2937",
              fontSize: "1.05rem",
            }}>
            {project.title}
          </h3>
          {project.isPrivate ? (
            <span
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              style={{
                borderColor: isDark
                  ? "rgba(168,85,247,0.3)"
                  : "rgba(124,58,237,0.2)",
                background: isDark
                  ? "rgba(168,85,247,0.1)"
                  : "rgba(124,58,237,0.07)",
                color: isDark ? "#C084FC" : "#7C3AED",
                fontWeight: 600,
              }}>
              <Lock size={12} aria-hidden="true" />
              Private Project
            </span>
          ) : project.links.live && project.links.live !== "#" ? (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live demo`}
              whileHover={{ scale: 1.15 }}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
                color: isDark ? "#7880A0" : "#9CA3AF",
              }}>
              <ArrowUpRight size={15} />
            </motion.a>
          ) : null}
        </div>

        <p
          className="mb-5 leading-relaxed"
          style={{
            color: isDark ? "#6B7080" : "#6B7280",
            fontSize: "0.875rem",
          }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map(({ name, color }) => (
            <span
              key={name}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: `${color}15`,
                color,
                border: `1px solid ${color}30`,
                fontWeight: 600,
              }}>
              {name}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          aria-label={`View details for ${project.title}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4"
          style={{ color: isDark ? "#A0A8C0" : "#4B5563" }}>
          View project details
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-28 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #0D0D12 0%, #0F0F18 100%)"
          : "linear-gradient(180deg, #F0F4FF 0%, #F8F9FF 100%)",
      }}>
      {/* Section bg accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 opacity-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #4FACFE)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{
              color: "#4FACFE",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}>
            My Work
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: isDark ? "#E8EAF0" : "#1F2937",
              letterSpacing: "-0.02em",
            }}>
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Projects
            </span>
          </h2>
          <p
            style={{
              color: isDark ? "#6B7080" : "#6B7280",
              maxWidth: 500,
              margin: "0 auto",
              fontSize: "0.95rem",
            }}>
            A curated selection of projects that demonstrate my passion for
            clean code and beautiful interfaces.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>
      </div>
      <ProjectDetailsDialog
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
