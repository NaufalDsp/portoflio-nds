import { Clock, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { ContactDetail, SocialLink } from "../types/portfolio";
import type { Language } from "../i18n/translations";

export const CV_URL_EN = "/CV%20ATS-Naufal%20Dwi%20Saputro.pdf";
export const CV_URL_ID = "/CV%20ID-Naufal%20Dwi%20Saputro.pdf";
export const CV_URL = CV_URL_EN;

export interface ResumeOption {
  id: "en" | "id";
  label: string;
  href: string;
}

export const getResumeOptions = (_lang: Language = "en"): ResumeOption[] => [
  {
    id: "en",
    label: "CV ENG",
    href: CV_URL_EN,
  },
  {
    id: "id",
    label: "CV ID",
    href: CV_URL_ID,
  },
];

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
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/6285196860055",
    color: "#25D366",
  },
];

export const getContactDetails = (lang: Language = "en"): ContactDetail[] => [
  {
    icon: Mail,
    label: lang === "id" ? "Email" : "Email",
    value: "naufalsaputro219@gmail.com",
    href: "mailto:naufalsaputro219@gmail.com",
    color: "#4FACFE",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "0851 9686 0055",
    href: "https://wa.me/6285196860055",
    color: "#25D366",
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
