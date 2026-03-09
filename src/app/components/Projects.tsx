import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const images = import.meta.glob<{ default: string }>(
  "../../assets/images/*.png",
  { eager: true },
);
const img = (name: string) =>
  images[`../../assets/images/${name}.png`]?.default ?? "";

const projects = [
  {
    id: 1,
    title: "Labara",
    description:
      "A real-time analytics platform powered by machine learning, featuring interactive charts, predictive insights, and a highly responsive dark-mode interface.",
    image: img("labara"),
    tags: ["Vue", "Laravel", "TailwindCSS", "MySQL"],
    tagColors: ["#4FACFE", "#A855F7", "#34D399", "#F59E0B"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Mas. POS",
    description:
      "Full-stack e-commerce solution with a sleek product catalog, cart system, secure payment integration, and a comprehensive admin panel.",
    image: img("maspos"),
    tags: ["Vue", "Laravel", "TailwindCSS", "MySQL"],
    tagColors: ["#4FACFE", "#A855F7", "#34D399", "#F59E0B"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 3,
    title: "AKPK ASN",
    description:
      "Modern social platform with real-time messaging, dynamic feeds, story reels, and smooth cross-platform animations for an engaging UX.",
    image: img("akpkASN"),
    tags: ["Blade", "Laravel", "MySQL"],
    tagColors: ["#4FACFE", "#A855F7", "#F59E0B"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Hotel Booking",
    description:
      "Award-winning interactive portfolio website with immersive 3D animations, smooth page transitions, and a fully custom design system.",
    image: img("hotelBooking"),
    tags: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    tagColors: ["#34D399", "#4FACFE", "#A855F7", "#F59E0B"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Slice Bread Bakery Web",
    description:
      "Award-winning interactive portfolio website with immersive 3D animations, smooth page transitions, and a fully custom design system.",
    image: img("slicebread"),
    tags: ["Blade", "Laravel", "MySQL", "TailwindCSS"],
    tagColors: ["#34D399", "#A855F7", "#F59E0B", "#4FACFE"],
    github: "#",
    live: "#",
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
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
        {/* Hover overlay links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs backdrop-blur-md border border-white/20"
            style={{ background: "rgba(0,0,0,0.55)", fontWeight: 600 }}>
            <Github size={14} /> GitHub
          </a>
          <a
            href={project.live}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs"
            style={{
              background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
              fontWeight: 600,
            }}>
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>
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
          <motion.a
            href={project.live}
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
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: `${project.tagColors[i]}15`,
                color: project.tagColors[i],
                border: `1px solid ${project.tagColors[i]}30`,
                fontWeight: 600,
              }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { isDark } = useTheme();

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
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-14">
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl border text-sm transition-all duration-300"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: isDark ? "#A0A8C0" : "#6B7280",
              background: isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              fontWeight: 600,
            }}>
            View All Projects <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
