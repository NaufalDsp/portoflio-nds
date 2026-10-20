import type { Project } from "../types/portfolio";
import type { Language } from "../i18n/translations";
import { TECHNOLOGY_COLORS } from "./technologies";

const projectImages = import.meta.glob<{ default: string }>(
  "../../assets/images/*.png",
  { eager: true },
);

function getProjectImage(name: string) {
  return projectImages[`../../assets/images/${name}.png`]?.default ?? "";
}

export const getProjects = (lang: Language = "en"): Project[] => [
  {
    id: 1,
    title: "Jejak Rona",
    description:
      lang === "id"
        ? "Platform majalah visual dan editorial modern yang mengurasi keindahan budaya Nusantara, lanskap kepulauan, dan esai naratif. Dirancang dengan performa statis zero-JS serta CMS dinamis berbasis blok."
        : "A modern visual and editorial magazine platform curating Indonesian culture, archipelago landscapes, and narrative essays. Engineered with zero-JS static performance and a dynamic block-based CMS.",
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
      role:
        lang === "id"
          ? "Pengembang Full-stack & Desainer"
          : "Full-stack Developer & Designer",
      contributions:
        lang === "id"
          ? [
              "Merancang platform membaca editorial dengan Clean Architecture monorepo, pengiriman statis zero-JS, dan tipografi yang elegan.",
              "Membangun CMS administratif dengan tata letak visual berbasis blok, riwayat snapshot revisi, dan manajemen korespondensi pembaca.",
              "Mengimplementasikan manajemen aset media dengan kalibrasi titik fokus serta pemodelan database PostgreSQL di Supabase.",
            ]
          : [
              "Architected an editorial reading platform with Clean Architecture monorepo, zero-JS static delivery, and refined typography.",
              "Built an administrative CMS with block-based visual layouting, revision snapshot history, and reader correspondence management.",
              "Implemented media asset management with focal-point calibration and PostgreSQL database modeling on Supabase.",
            ],
    },
  },
  {
    id: 2,
    title: "Singgah",
    description:
      lang === "id"
        ? "Platform kurasi destinasi perjalanan Nusantara berbasis data iklim historis 30 tahun ECMWF ERA5, dilengkapi kalender musim bulanan, eksplorasi lanskap, dan perencana itinerari interaktif."
        : "A climate-driven Indonesian travel curation platform powered by 30 years of historical ECMWF ERA5 reanalysis data, featuring seasonal calendars, landscape discovery, and an interactive trip planner.",
    image: getProjectImage("singgah"),
    technologies: [
      { name: "Astro", color: TECHNOLOGY_COLORS.Astro },
      { name: "React", color: TECHNOLOGY_COLORS.React },
      { name: "TypeScript", color: TECHNOLOGY_COLORS.TypeScript },
      { name: "TailwindCSS", color: TECHNOLOGY_COLORS.TailwindCSS },
      { name: "Cloudflare", color: TECHNOLOGY_COLORS.Cloudflare },
    ],
    links: {
      live: "https://singgah.naufaldsp.workers.dev/",
    },
    featured: false,
    caseStudy: {
      role:
        lang === "id"
          ? "Pengembang Full-stack & Desainer"
          : "Full-stack Developer & Designer",
      contributions:
        lang === "id"
          ? [
              "Membangun platform perjalanan SSG berkinerja tinggi menggunakan arsitektur Astro Islands dan React untuk komponen interaktif seperti Trip Planner.",
              "Merancang penilaian destinasi musiman objektif berbasis data iklim historis 30 tahun ECMWF ERA5.",
              "Mengintegrasikan perutean API Hono dan deployment edge di Cloudflare Workers dalam monorepo pnpm berbasis TypeScript.",
            ]
          : [
              "Built a high-performance SSG travel platform using Astro Islands architecture and React for interactive components like the Trip Planner.",
              "Engineered objective seasonal destination scoring powered by 30-year historical ECMWF ERA5 climate reanalysis data.",
              "Integrated Hono API routing and full-site edge deployment on Cloudflare Workers within a typed pnpm monorepo.",
            ],
    },
  },
  {
    id: 3,
    title: "Labara",
    description:
      lang === "id"
        ? "Platform pemesanan Haji dan Umrah dengan panel admin untuk mengelola paket perjalanan secara dinamis dan menjaga informasi perjalanan tetap mutakhir."
        : "A Hajj and Umrah booking platform with an admin panel for dynamically managing packages and keeping travel information up to date.",
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
    id: 4,
    title: "Mas. POS",
    description:
      lang === "id"
        ? "Solusi e-commerce full-stack dengan katalog produk modern, sistem keranjang, integrasi pembayaran yang aman, dan panel admin komprehensif."
        : "Full-stack e-commerce solution with a sleek product catalog, cart system, secure payment integration, and a comprehensive admin panel.",
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
    id: 5,
    title: "AKPK ASN",
    description:
      lang === "id"
        ? "Sistem pengembangan kompetensi berbasis web untuk AKPK Surakarta yang menyederhanakan pengelolaan data pelatihan, penilaian mandiri ASN, usulan pelatihan, dan verifikasi berkas."
        : "A web-based competency development system for AKPK Surakarta that streamlines training data management, ASN self-assessments, training proposals, and proposal verification.",
    image: getProjectImage("akpkASN"),
    technologies: [
      { name: "Blade", color: TECHNOLOGY_COLORS.Blade },
      { name: "Laravel", color: TECHNOLOGY_COLORS.Laravel },
      { name: "MySQL", color: TECHNOLOGY_COLORS.MySQL },
    ],
    isPrivate: true,
    featured: false,
    caseStudy: {
      role:
        lang === "id"
          ? "Magang Frontend Developer · BKPSDM Kota Surakarta"
          : "Frontend Developer Intern · BKPSDM Kota Surakarta",
      contributions:
        lang === "id"
          ? [
              "Mengembangkan antarmuka responsif untuk alur kerja penilaian mandiri dan usulan pelatihan.",
              "Meningkatkan fungsionalitas internal dan kemudahan penggunaan bagi pengguna ASN.",
              "Merancang halaman antarmuka sesuai dengan standar layanan digital instansi pemerintah.",
            ]
          : [
              "Developed responsive interfaces for assessment and training proposal workflows.",
              "Improved internal functionality and usability for ASN users.",
              "Designed pages following government digital service standards.",
            ],
    },
  },
  {
    id: 6,
    title: "Hotel Booking",
    description:
      lang === "id"
        ? "Platform reservasi hotel berbasis web untuk menelusuri kamar, memeriksa ketersediaan, dan mengelola reservasi melalui antarmuka responsif."
        : "A web-based hotel reservation platform where users can browse rooms, check availability, and manage bookings through a responsive interface.",
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
    id: 7,
    title: "Slice Bread Bakery Web",
    description:
      lang === "id"
        ? "Website toko roti responsif yang menampilkan katalog produk unggulan, profil toko, dan alur pemesanan praktis bagi pelanggan."
        : "A responsive bakery website that showcases products, store information, and a simple ordering experience for customers.",
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
    id: 8,
    title: "Agreema",
    description:
      lang === "id"
        ? "Sistem manajemen kontrak digital untuk menyusun, melacak, memperbarui, dan mengarsipkan dokumen kontrak dalam satu platform terpusat."
        : "A digital contract management system for creating, tracking, renewing, and organizing contracts in one centralized platform.",
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
      role:
        lang === "id"
          ? "Magang Pengembang Perangkat Lunak · Solutionlabs Group Indonesia"
          : "Software Developer Intern · Solutionlabs Group Indonesia",
      contributions:
        lang === "id"
          ? [
              "Merancang modul Templat dan Manajemen Kontrak, mencakup kategori kontrak, templat DOCX, field dinamis, dan alur pembuatan kontrak.",
              "Menyusun kebutuhan sistem dan desain teknis arsitektur, termasuk use case diagram, activity diagram, ERD, dan relasi database.",
              "Mengimplementasikan fondasi awal RBAC menggunakan React dan Laravel REST API, termasuk pengujian API Postman dan integrasi frontend.",
            ]
          : [
              "Designed the Template and Contract Management module, including contract categories, DOCX templates, dynamic fields, and contract creation workflows.",
              "Produced system requirements and technical designs, including use case diagrams, activity diagrams, ERD, and database relationships.",
              "Implemented the initial RBAC foundation using React and Laravel REST API, including API testing with Postman and frontend integration.",
            ],
    },
  },
  {
    id: 9,
    title: "Nexora Space",
    description:
      lang === "id"
        ? "Website profil perusahaan responsif untuk penyedia jasa renovasi dan desain interior, menampilkan katalog layanan, portofolio proyek, dan identitas merek."
        : "A responsive company profile website for a renovation and interior design company, showcasing its services, projects, and brand identity.",
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
    id: 10,
    title: "VidDrop",
    description:
      lang === "id"
        ? "Aplikasi pengunduh video TikTok praktis yang memungkinkan pengguna menyimpan konten dalam format video MP4 atau audio MP3 melalui antarmuka bersih dan cepat."
        : "A TikTok video downloader that lets users quickly save content in MP4 video or MP3 audio formats through a clean, responsive interface.",
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

export const PROJECTS: Project[] = getProjects("en");
