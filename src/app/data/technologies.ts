import { createElement } from "react";
import type { IconType } from "react-icons";
import {
  SiAstro,
  SiCanva,
  SiCoreldraw,
  SiDocker,
  SiFigma,
  SiGit,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import type { Technology, TechnologyGroup } from "../types/portfolio";

export const SiCapcut: IconType = (props) =>
  createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      width: "1em",
      height: "1em",
      ...props,
    },
    createElement("path", {
      d: "M2.5 5.5h6l3.5 6.5-3.5 6.5h-6l3.5-6.5zm19 0h-6l-3.5 6.5 3.5 6.5h6l-3.5-6.5z",
    }),
  );

export const TECHNOLOGY_COLORS = {
  React: "#61DAFB",
  "Next.js": "#E8EAF0",
  TypeScript: "#3178C6",
  Vue: "#4FC08D",
  "Node.js": "#339933",
  Python: "#3776AB",
  Laravel: "#FF2D20",
  Blade: "#F05340",
  TailwindCSS: "#38BDF8",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Docker: "#2496ED",
  Git: "#F05032",
  Figma: "#F24E1E",
  Prisma: "#A855F7",
  Astro: "#FF5D01",
  Supabase: "#3ECF8E",
  Canva: "#00C4CC",
  CorelDRAW: "#00A389",
  CapCut: "#00F2FE",
} as const;

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    category: "Frontend Development",
    description:
      "Modern client-side frameworks, typed systems, and styling architecture.",
    technologies: [
      { name: "React", icon: SiReact, color: TECHNOLOGY_COLORS.React },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: TECHNOLOGY_COLORS["Next.js"],
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: TECHNOLOGY_COLORS.TypeScript,
      },
      { name: "Astro", icon: SiAstro, color: TECHNOLOGY_COLORS.Astro },
      { name: "Vue", icon: SiVuedotjs, color: TECHNOLOGY_COLORS.Vue },
      {
        name: "TailwindCSS",
        icon: SiTailwindcss,
        color: TECHNOLOGY_COLORS.TailwindCSS,
      },
    ],
  },
  {
    category: "Backend & Database",
    description:
      "Server runtimes, RESTful APIs, and structured data storage engines.",
    technologies: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: TECHNOLOGY_COLORS["Node.js"],
      },
      { name: "Laravel", icon: SiLaravel, color: TECHNOLOGY_COLORS.Laravel },
      { name: "Python", icon: SiPython, color: TECHNOLOGY_COLORS.Python },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: TECHNOLOGY_COLORS.PostgreSQL,
      },
      { name: "Supabase", icon: SiSupabase, color: TECHNOLOGY_COLORS.Supabase },
      { name: "MySQL", icon: SiMysql, color: TECHNOLOGY_COLORS.MySQL },
      { name: "MongoDB", icon: SiMongodb, color: TECHNOLOGY_COLORS.MongoDB },
    ],
  },
  {
    category: "DevOps & Architecture",
    description:
      "Containerization, source versioning, and database abstraction layers.",
    technologies: [
      { name: "Docker", icon: SiDocker, color: TECHNOLOGY_COLORS.Docker },
      { name: "Git", icon: SiGit, color: TECHNOLOGY_COLORS.Git },
      { name: "Prisma", icon: SiPrisma, color: TECHNOLOGY_COLORS.Prisma },
    ],
  },
  {
    category: "Creative & Multimedia",
    description:
      "UI/UX prototyping, visual branding, vector graphics, and video editing.",
    technologies: [
      { name: "Figma", icon: SiFigma, color: TECHNOLOGY_COLORS.Figma },
      { name: "Canva", icon: SiCanva, color: TECHNOLOGY_COLORS.Canva },
      {
        name: "CorelDRAW",
        icon: SiCoreldraw,
        color: TECHNOLOGY_COLORS.CorelDRAW,
      },
      { name: "CapCut", icon: SiCapcut, color: TECHNOLOGY_COLORS.CapCut },
    ],
  },
];

export const TECHNOLOGIES: Technology[] = TECHNOLOGY_GROUPS.flatMap(
  (group) => group.technologies,
);
