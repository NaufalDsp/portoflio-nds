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
    title: "Labara",
    description:
      "A real-time analytics platform powered by machine learning, featuring interactive charts, predictive insights, and a highly responsive dark-mode interface.",
    image: getProjectImage("labara"),
    technologies: [
      { name: "Vue", color: TECHNOLOGY_COLORS.Vue },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    links: { github: "#", live: "#" },
    featured: true,
  },
  {
    id: 2,
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
    links: { github: "#", live: "#" },
    featured: false,
  },
  {
    id: 3,
    title: "AKPK ASN",
    description:
      "A web-based competency development system for AKPK Surakarta that streamlines training data management, ASN self-assessments, training proposals, and proposal verification.",
    image: getProjectImage("akpkASN"),
    technologies: [
      { name: "Blade", color: TECHNOLOGY_COLORS.Blade },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    links: { github: "#", live: "#" },
    featured: false,
  },
  {
    id: 4,
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
    links: { github: "#", live: "#" },
    featured: false,
  },
  {
    id: 5,
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
    links: { github: "#", live: "#" },
    featured: false,
  },
  {
    id: 6,
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
    links: { github: "#", live: "#" },
    featured: false,
  },
];
