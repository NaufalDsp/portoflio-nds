import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export interface NavigationLink {
  label: string;
  href: `#${string}`;
}

export interface ProjectTechnology {
  name: string;
  color: `#${string}`;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: ProjectTechnology[];
  links: {
    github: string;
    live: string;
  };
  featured: boolean;
}

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
  color: `#${string}`;
}

export interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  color: `#${string}`;
}

export interface Technology {
  name: string;
  icon: IconType;
  color: `#${string}`;
}

export interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  status: string;
  highlights: string[];
}

export interface WorkExperienceEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  employmentType: string;
  description: string;
  achievements: string[];
}
