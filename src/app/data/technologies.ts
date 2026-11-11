import { createElement } from "react";
import type { IconType } from "react-icons";
import {
  SiAstro,
  SiCanva,
  SiCloudflare,
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
import type { Language } from "../i18n/translations";

export const SiCapcut: IconType = (props) =>
  createElement(
    "svg",
    {
      viewBox: "0 0 24.2 24",
      fill: "currentColor",
      fillRule: "evenodd",
      width: "1em",
      height: "1em",
      ...props,
    },
    createElement("path", {
      d: "M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z",
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
  Cloudflare: "#F38020",
  Hono: "#E36002",
  CorelDRAW: "#00A389",
  CapCut: "#00F2FE",
} as const;

export const getTechnologyGroups = (
  lang: Language = "en",
): TechnologyGroup[] => [
  {
    category:
      lang === "id" ? "Pengembangan Frontend" : "Frontend Development",
    description:
      lang === "id"
        ? "Framework sisi klien modern, sistem berpengetikan (typed), dan arsitektur styling."
        : "Modern client-side frameworks, typed systems, and styling architecture.",
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
    category:
      lang === "id" ? "Backend & Basis Data" : "Backend & Database",
    description:
      lang === "id"
        ? "Runtime server, RESTful API, dan mesin penyimpanan data terstruktur."
        : "Server runtimes, RESTful APIs, and structured data storage engines.",
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
    category:
      lang === "id" ? "DevOps & Arsitektur" : "DevOps & Architecture",
    description:
      lang === "id"
        ? "Kontainerisasi, kontrol versi kode sumber, dan lapisan abstraksi basis data."
        : "Containerization, source versioning, and database abstraction layers.",
    technologies: [
      { name: "Docker", icon: SiDocker, color: TECHNOLOGY_COLORS.Docker },
      { name: "Git", icon: SiGit, color: TECHNOLOGY_COLORS.Git },
      { name: "Prisma", icon: SiPrisma, color: TECHNOLOGY_COLORS.Prisma },
      {
        name: "Cloudflare",
        icon: SiCloudflare,
        color: TECHNOLOGY_COLORS.Cloudflare,
      },
    ],
  },
  {
    category:
      lang === "id" ? "Kreatif & Multimedia" : "Creative & Multimedia",
    description:
      lang === "id"
        ? "Pembuatan prototipe UI/UX, branding visual, grafis vektor, dan pengeditan video."
        : "UI/UX prototyping, visual branding, vector graphics, and video editing.",
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

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = getTechnologyGroups("en");

export const TECHNOLOGIES: Technology[] = TECHNOLOGY_GROUPS.flatMap(
  (group) => group.technologies,
);
