import { Clock, Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { ContactDetail, SocialLink } from "../types/portfolio";

export const CV_URL = "/CV%20ATS-Naufal%20Dwi%20Saputro.pdf";

export const PROFESSIONAL_TITLES = [
  "Full Stack Developer",
  "Software Engineer",
] as const;

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

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: Mail,
    label: "Email",
    value: "naufalsaputro219@gmail.com",
    color: "#4FACFE",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Surakarta, Indonesia",
    color: "#A855F7",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    color: "#34D399",
  },
];
