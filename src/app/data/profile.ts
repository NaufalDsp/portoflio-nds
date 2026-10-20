import { Clock, Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { ContactDetail, SocialLink } from "../types/portfolio";
import type { Language } from "../i18n/translations";

export const CV_URL = "/CV%20ATS-Naufal%20Dwi%20Saputro.pdf";

export const getProfessionalTitles = (lang: Language = "en") =>
  lang === "id"
    ? (["Full Stack Developer", "Software Engineer", "Pengembang Web"] as const)
    : (["Full Stack Developer", "Software Engineer"] as const);

export const PROFESSIONAL_TITLES = getProfessionalTitles("en");

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/NaufalDsp",
    color: "#E8EAF0",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/naufal-dwi-saputro-b14a03299/",
    color: "#4FACFE",
  },
];

export const getContactDetails = (lang: Language = "en"): ContactDetail[] => [
  {
    icon: Mail,
    label: lang === "id" ? "Email" : "Email",
    value: "naufalsaputro219@gmail.com",
    color: "#4FACFE",
  },
  {
    icon: MapPin,
    label: lang === "id" ? "Lokasi" : "Location",
    value: "Sragen, Indonesia",
    color: "#A855F7",
  },
  {
    icon: Clock,
    label: lang === "id" ? "Waktu Respons" : "Response Time",
    value: lang === "id" ? "Dalam 24 jam" : "Within 24 hours",
    color: "#34D399",
  },
];

export const CONTACT_DETAILS: ContactDetail[] = getContactDetails("en");
