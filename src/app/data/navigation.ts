import type { NavigationLink } from "../types/portfolio";
import type { Language } from "../i18n/translations";

export const getNavigationLinks = (lang: Language = "en"): NavigationLink[] => [
  { label: lang === "id" ? "Beranda" : "Home", href: "#home" },
  { label: lang === "id" ? "Proyek" : "Projects", href: "#projects" },
  { label: lang === "id" ? "Keahlian" : "Skills", href: "#skills" },
  { label: lang === "id" ? "Pengalaman" : "Experience", href: "#experience" },
  { label: lang === "id" ? "Pendidikan" : "Education", href: "#education" },
  {
    label: lang === "id" ? "Sertifikat" : "Certificates",
    href: "#certificates",
  },
  { label: lang === "id" ? "Aktivitas" : "Activity", href: "#activity" },
  { label: lang === "id" ? "Kontak" : "Contact", href: "#contact" },
];

export const NAVIGATION_LINKS: NavigationLink[] = getNavigationLinks("en");
