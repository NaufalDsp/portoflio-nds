import type { Project } from "../types/portfolio";
import { TECHNOLOGY_COLORS } from "./technologies";

const projectImages = import.meta.glob<{ default: string }>(
  "../../assets/images/*.png",
  { eager: true },
);

function getProjectImage(name: string) {
  return projectImages[`../../assets/images/${name}.png`]?.default ?? "";
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Jejak Rona",
    description:
      "A modern visual and editorial magazine platform curating Indonesian culture, archipelago landscapes, and narrative essays. Engineered with zero-JS static performance and a dynamic block-based CMS.",
    image: getProjectImage("jejakRona"),
    technologies: [
      { name: "Astro", color: TECHNOLOGY_COLORS.Astro },
      { name: "TypeScript", color: TECHNOLOGY_COLORS.TypeScript },
      { name: "Supabase", color: TECHNOLOGY_COLORS.Supabase },
      { name: "PostgreSQL", color: TECHNOLOGY_COLORS.PostgreSQL },
    ],
    links: {
      github: "https://github.com/NaufalDsp/jejak-rona",
      live: "https://jejak-rona.naufaldsp.workers.dev/",
    },
    featured: true,
    caseStudy: {
      role: "Full-stack Developer & Designer",
      contributions: [
        "Architected an editorial reading platform with Clean Architecture monorepo, zero-JS static delivery, and refined typography.",
        "Built an administrative CMS with block-based visual layouting, revision snapshot history, and reader correspondence management.",
        "Implemented media asset management with focal-point calibration and PostgreSQL database modeling on Supabase.",
      ],
    },
  },
  {
    id: 2,
    title: "Labara",
    description:
      "A Hajj and Umrah booking platform with an admin panel for dynamically managing packages and keeping travel information up to date.",
    image: getProjectImage("labara"),
    technologies: [
      { name: "Vue", color: TECHNOLOGY_COLORS.Vue },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    isPrivate: true,
    featured: false,
  },
  {
    id: 3,
    title: "Mas. POS",
    description:
      "Full-stack e-commerce solution with a sleek product catalog, cart system, secure payment integration, and a comprehensive admin panel.",
    image: getProjectImage("maspos"),
    technologies: [
      { name: "Vue", color: TECHNOLOGY_COLORS.Vue },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    links: {},
    featured: false,
  },
  {
    id: 4,
    title: "AKPK ASN",
    description:
      "A web-based competency development system for AKPK Surakarta that streamlines training data management, ASN self-assessments, training proposals, and proposal verification.",
    image: getProjectImage("akpkASN"),
    technologies: [
      { name: "Blade", color: TECHNOLOGY_COLORS.Blade },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    isPrivate: true,
    featured: false,
    caseStudy: {
      role: "Frontend Developer Intern · BKPSDM Kota Surakarta",
      contributions: [
        "Developed responsive interfaces for assessment and training proposal workflows.",
        "Improved internal functionality and usability for ASN users.",
        "Designed pages following government digital service standards.",
      ],
    },
  },
  {
    id: 5,
    title: "Hotel Booking",
    description:
      "A web-based hotel reservation platform where users can browse rooms, check availability, and manage bookings through a responsive interface.",
    image: getProjectImage("hotelBooking"),
    technologies: [
      { name: "Next.js", color: TECHNOLOGY_COLORS["Next.js"] },
      { name: "TypeScript", color: TECHNOLOGY_COLORS.TypeScript },
      { name: "Prisma", color: TECHNOLOGY_COLORS.Prisma },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
    ],
    links: {},
    featured: false,
  },
  {
    id: 6,
    title: "Slice Bread Bakery Web",
    description:
      "A responsive bakery website that showcases products, store information, and a simple ordering experience for customers.",
    image: getProjectImage("sliceBread"),
    technologies: [
      { name: "Blade", color: TECHNOLOGY_COLORS.Blade },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
    ],
    links: {},
    featured: false,
  },
  {
    id: 7,
    title: "Agreema",
    description:
      "A digital contract management system for creating, tracking, renewing, and organizing contracts in one centralized platform.",
    image: getProjectImage("agreema"),
    technologies: [
      { name: "React", color: TECHNOLOGY_COLORS.React },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    isPrivate: true,
    featured: false,
    caseStudy: {
      role: "Software Developer Intern · Solutionlabs Group Indonesia",
      contributions: [
        "Designed the Template and Contract Management module, including contract categories, DOCX templates, dynamic fields, and contract creation workflows.",
        "Produced system requirements and technical designs, including use case diagrams, activity diagrams, ERD, and database relationships.",
        "Implemented the initial RBAC foundation using React and Laravel REST API, including API testing with Postman and frontend integration.",
      ],
    },
  },
  {
    id: 8,
    title: "Nexora Space",
    description:
      "A responsive company profile website for a renovation and interior design company, showcasing its services, projects, and brand identity.",
    image: getProjectImage("nexoraSpace"),
    technologies: [
      { name: "React", color: TECHNOLOGY_COLORS.React },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
    ],
    links: {
      github: "https://github.com/NaufalDsp/company-nexora",
      live: "https://nexora-space.vercel.app",
    },
    featured: false,
  },
  {
    id: 9,
    title: "VidDrop",
    description:
      "A TikTok video downloader that lets users quickly save content in MP4 video or MP3 audio formats through a clean, responsive interface.",
    image: getProjectImage("vidrop"),
    technologies: [
      { name: "React", color: TECHNOLOGY_COLORS.React },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
    ],
    links: {
      github: "https://github.com/NaufalDsp/vidrop",
      live: "https://vidrop.vercel.app/",
    },
    featured: false,
  },
];
