import type { EducationEntry } from "../types/portfolio";
import type { Language } from "../i18n/translations";

export const getEducation = (lang: Language = "en"): EducationEntry[] => [
  {
    id: 1,
    degree:
      lang === "id"
        ? "D3 Teknik Informatika"
        : "Diploma in Informatics Engineering",
    institution: "Universitas Sebelas Maret (UNS)",
    period: lang === "id" ? "Agustus 2023 - 2026" : "August 2023 - 2026",
    gpa: "3.91 / 4.00",
    status:
      lang === "id"
        ? "Telah menyelesaikan sidang tugas akhir dan saat ini sedang menunggu ijazah kelulusan resmi."
        : "Completed the final project defense and currently awaiting the official graduation certificate.",
    highlights:
      lang === "id"
        ? [
            "Rekayasa perangkat lunak dan pengembangan web modern",
            "Integrasi frontend-backend dan manajemen basis data",
            "Tugas akhir berfokus pada manajemen kontrak digital",
          ]
        : [
            "Software engineering and modern web development",
            "Frontend-backend integration and database management",
            "Final project focused on digital contract management",
          ],
  },
];

export const EDUCATION: EducationEntry[] = getEducation("en");
