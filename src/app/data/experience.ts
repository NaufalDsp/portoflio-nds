import type { WorkExperienceEntry } from "../types/portfolio";
import type { Language } from "../i18n/translations";

export const getWorkExperiences = (
  lang: Language = "en",
): WorkExperienceEntry[] => [
  {
    id: 1,
    role:
      lang === "id"
        ? "Magang Frontend Developer"
        : "Frontend Developer Intern",
    company: "BKPSDM Kota Surakarta",
    period:
      lang === "id"
        ? "Februari 2025 - Juli 2025"
        : "February 2025 - July 2025",
    employmentType: lang === "id" ? "Magang" : "Internship",
    workMode: "Remote",
    description:
      lang === "id"
        ? "Berkontribusi dalam pengembangan AKPK ASN, sistem penilaian kompetensi dan pengajuan pelatihan bagi aparatur sipil negara."
        : "Contributed to the development of AKPK ASN, a competency assessment and training proposal system for government employees.",
    achievements:
      lang === "id"
        ? [
            "Mengembangkan antarmuka responsif untuk alur kerja penilaian mandiri dan pengajuan pelatihan.",
            "Meningkatkan fungsionalitas dan kemudahan penggunaan aplikasi bagi pengguna ASN.",
            "Merancang halaman sesuai dengan standar antarmuka layanan digital instansi pemerintah.",
          ]
        : [
            "Developed responsive interfaces for assessment and training proposal workflows.",
            "Improved internal functionality and usability for ASN users.",
            "Designed pages following government digital service standards.",
          ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "PT Media Sarana Data (GMEDIA)",
    period:
      lang === "id"
        ? "Agustus 2025 - Januari 2026"
        : "August 2025 - January 2026",
    employmentType: lang === "id" ? "Magang" : "Internship",
    workMode: "Hybrid",
    description:
      lang === "id"
        ? "Mengembangkan antarmuka web responsif berdasarkan kebutuhan bisnis dan berkolaborasi dalam fitur pemesanan komersial serta manajemen data."
        : "Developed responsive web interfaces based on business requirements and collaborated on commercial booking and data management features.",
    achievements:
      lang === "id"
        ? [
            "Membangun antarmuka responsif menggunakan Vue.js dan Tailwind CSS.",
            "Mengintegrasikan fitur-fitur frontend dengan Laravel dan Inertia.js.",
            "Berkolaborasi dengan pengembang backend untuk meningkatkan performa UI dan pengalaman pengguna.",
          ]
        : [
            "Built responsive interfaces using Vue.js and Tailwind CSS.",
            "Integrated frontend features with Laravel and Inertia.js.",
            "Collaborated with backend developers to improve UI performance and user experience.",
          ],
  },
  {
    id: 3,
    role:
      lang === "id"
        ? "Software Developer"
        : "Software Developer",
    company: "Solutionlabs Group Indonesia",
    period:
      lang === "id"
        ? "Januari 2026 - Februari 2026"
        : "January 2026 - February 2026",
    employmentType: lang === "id" ? "Magang" : "Internship",
    workMode: "Hybrid",
    description:
      lang === "id"
        ? "Berkontribusi dalam analisis dan pengembangan awal Agreema, sistem manajemen siklus hidup kontrak (CLM) berbasis web."
        : "Contributed to the analysis and initial development of Agreema, a web-based Contract Lifecycle Management system.",
    achievements:
      lang === "id"
        ? [
            "Merancang modul Templat dan Manajemen Kontrak, mencakup kategori kontrak, templat DOCX, field dinamis, dan alur pembuatan kontrak.",
            "Menyusun kebutuhan sistem dan desain teknis arsitektur, termasuk use case diagram, activity diagram, ERD, dan relasi basis data.",
            "Mengimplementasikan fondasi awal RBAC menggunakan React.js dan Laravel REST API, termasuk pengujian API via Postman dan integrasi frontend.",
          ]
        : [
            "Designed the Template and Contract Management module, covering contract categories, DOCX templates, dynamic fields, and contract creation workflows.",
            "Produced system requirements and technical designs, including use case diagrams, activity diagrams, ERD, and database relationships.",
            "Implemented the initial RBAC foundation using React.js and Laravel REST API, including API testing with Postman and frontend integration.",
          ],
  },
];

export const WORK_EXPERIENCES: WorkExperienceEntry[] = getWorkExperiences("en");
