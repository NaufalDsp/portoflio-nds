import type { WorkExperienceEntry } from "../types/portfolio";

export const WORK_EXPERIENCES: WorkExperienceEntry[] = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "BKPSDM Kota Surakarta",
    period: "February 2025 - July 2025",
    employmentType: "Internship",
    description:
      "Contributed to the development of AKPK ASN, a competency assessment and training proposal system for government employees.",
    achievements: [
      "Developed responsive interfaces for assessment and training proposal workflows.",
      "Improved internal functionality and usability for ASN users.",
      "Designed pages following government digital service standards.",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "PT Media Sarana Data (GMEDIA)",
    period: "August 2025 - January 2026",
    employmentType: "Internship",
    description:
      "Developed responsive web interfaces based on business requirements and collaborated on commercial booking and data management features.",
    achievements: [
      "Built responsive interfaces using Vue.js and Tailwind CSS.",
      "Integrated frontend features with Laravel and Inertia.js.",
      "Collaborated with backend developers to improve UI performance and user experience.",
    ],
  },
];
