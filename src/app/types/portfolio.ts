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

export interface ProjectCaseStudy {
  role: string;
  contributions: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  fileUrl: string;
  previewUrl: string;
  issuedAt: {
    year: number;
    month: number;
    day?: number;
  };
}

interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: ProjectTechnology[];
  featured: boolean;
  caseStudy?: ProjectCaseStudy;
}

type ProjectAccess =
  | {
      isPrivate: true;
      links?: never;
    }
  | {
      isPrivate?: false;
      links: {
        github?: string;
        live?: string;
      };
    };

export type Project = ProjectDetails & ProjectAccess;

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
  workMode?: string;
  description: string;
  achievements: string[];
}
