import type { Certificate } from "../types/portfolio";

const pdfUrl = (fileName: string) => encodeURI(`/${fileName}`);

export const CERTIFICATES: Certificate[] = [
  {
    id: "machine-learning-beginner",
    title: "Machine Learning untuk Pemula",
    issuer: "Dicoding",
    fileUrl: pdfUrl("sertifikat_Machine Learning Untuk Pemula.pdf"),
    previewUrl: "/certificate-previews/machine-learning.png",
    issuedAt: { year: 2026, month: 9, day: 23 },
  },
  {
    id: "memulai-pemrograman-python",
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding",
    fileUrl: pdfUrl("sertifikat_memulai pemrograman dengan python.pdf"),
    previewUrl: "/certificate-previews/memulai-pemrograman-python.png",
    issuedAt: { year: 2026, month: 9, day: 10 },
  },
  {
    id: "introduction-to-financial",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding",
    fileUrl: pdfUrl("SERTIFIKAT INTRODUCTION TO FINANCIAL.pdf"),
    previewUrl: "/certificate-previews/introduction-to-financial-literacy.png",
    issuedAt: { year: 2026, month: 9, day: 1 },
  },
  {
    id: "belajar-dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding",
    fileUrl: pdfUrl("SERTIFIKAT BELAJAR DASAR AI DICODING.pdf"),
    previewUrl: "/certificate-previews/belajar-dasar-ai.png",
    issuedAt: { year: 2026, month: 8, day: 31 },
  },
  {
    id: "introduction-to-iot",
    title: "Introduction to IoT and Digital Transformation",
    issuer: "Cisco Networking Academy",
    fileUrl: pdfUrl(
      "Introduction_to_IoT_certificate_naufalsaputro219-student-uns-ac-id_16c59d07-7a18-44f3-a15b-ed56adbfd5e0.pdf",
    ),
    previewUrl: "/certificate-previews/introduction-to-iot.png",
    issuedAt: { year: 2024, month: 12, day: 27 },
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    issuer: "SISTEM x D3 TI UNS",
    fileUrl: pdfUrl(
      "NAUFAL DWI SAPUTRO - [SISTEM x D3 TI UNS] Frontend Developer .pdf",
    ),
    previewUrl: "/certificate-previews/frontend-developer.png",
    issuedAt: { year: 2024, month: 10 },
  },
  {
    id: "ccna-introduction-to-networks",
    title: "CCNA v7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    fileUrl: pdfUrl("Naufal DwiSaputro-CCNAv7 Introduct-certificate.pdf"),
    previewUrl: "/certificate-previews/ccna-introduction-networks.png",
    issuedAt: { year: 2024, month: 8, day: 30 },
  },
  {
    id: "pcap-python",
    title: "PCAP: Programming Essentials in Python",
    issuer: "Python Institute / Cisco Networking Academy",
    fileUrl: pdfUrl("V3423066_Naufal Dwi Saputro_Sertifikat PCAP.pdf"),
    previewUrl: "/certificate-previews/pcap-python.png",
    issuedAt: { year: 2024, month: 6, day: 27 },
  },
  {
    id: "database-programming-with-sql",
    title: "Database Programming with SQL",
    issuer: "Oracle Academy",
    fileUrl: pdfUrl("Naufal Dwi Saputro-Database Programming with SQL.pdf"),
    previewUrl: "/certificate-previews/database-programming-sql.png",
    issuedAt: { year: 2024, month: 6, day: 25 },
  },
  {
    id: "java-fundamentals",
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    fileUrl: pdfUrl("Java Fundamentals.pdf"),
    previewUrl: "/certificate-previews/java-fundamentals.png",
    issuedAt: { year: 2024, month: 6, day: 16 },
  },
];
