import { ArrowUpRight, BadgeCheck, Download, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { CERTIFICATES } from "../data/certificates";

function CertificatePreview({
  previewUrl,
  title,
}: {
  previewUrl: string;
  title: string;
}) {
  return (
    <div
      className="relative mb-5 aspect-[1.414/1] overflow-hidden rounded-md border bg-white"
      style={{ borderColor: "rgba(31,41,55,0.12)" }}>
      <img
        src={previewUrl}
        alt={`${title} certificate preview`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}

function formatIssueDate({
  year,
  month,
  day,
}: (typeof CERTIFICATES)[number]["issuedAt"]) {
  const date = new Date(Date.UTC(year, month - 1, day ?? 1));
  const options: Intl.DateTimeFormatOptions = day
    ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    : { month: "long", year: "numeric", timeZone: "UTC" };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function Certificates() {
  const { isDark } = useTheme();

  return (
    <section
      id="certificates"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #0F0F18 0%, #0D0D12 100%)"
          : "linear-gradient(180deg, #F4F2FF 0%, #F0F4FF 100%)",
      }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-sky-500">
            Learning &amp; Credentials
          </p>
          <h2
            className="mb-4 text-3xl font-extrabold sm:text-4xl"
            style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
            Certificates
          </h2>
          <p
            className="mx-auto max-w-xl text-center text-sm leading-relaxed sm:text-base"
            style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
            Selected certificates from my technical and professional learning.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {CERTIFICATES.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
              className="flex min-h-56 flex-col border p-5 transition-colors sm:p-6"
              style={{
                borderRadius: 8,
                background: isDark ? "rgba(255,255,255,0.025)" : "#FFFFFF",
                borderColor: isDark
                  ? "rgba(255,255,255,0.09)"
                  : "rgba(31,41,55,0.1)",
              }}>
              <CertificatePreview
                previewUrl={certificate.previewUrl}
                title={certificate.title}
              />

              <div className="mb-6 flex items-start justify-between gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    background: isDark
                      ? "rgba(79,172,254,0.1)"
                      : "rgba(79,172,254,0.08)",
                    borderColor: "rgba(79,172,254,0.22)",
                    color: "#4FACFE",
                  }}>
                  <FileText size={20} aria-hidden="true" />
                </div>
                <BadgeCheck
                  size={18}
                  className="mt-1 shrink-0 text-emerald-500"
                  aria-label="Certificate document"
                />
              </div>

              <div className="flex-1">
                <h3
                  className="mb-2 text-base font-bold leading-snug"
                  style={{ color: isDark ? "#E8EAF0" : "#1F2937" }}>
                  {certificate.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: isDark ? "#8B91A5" : "#6B7280" }}>
                  {certificate.issuer ?? "Certificate document"}
                </p>
                <p
                  className="mt-2 text-xs font-medium"
                  style={{ color: isDark ? "#6B7080" : "#9CA3AF" }}>
                  Issued {formatIssueDate(certificate.issuedAt)}
                </p>
              </div>

              <div
                className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-4"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(31,41,55,0.08)",
                }}>
                <a
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-label={`Open ${certificate.title} PDF in a new tab`}>
                  View PDF
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={certificate.fileUrl}
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  style={{ color: isDark ? "#A0A8C0" : "#6B7280" }}
                  aria-label={`Download ${certificate.title} PDF`}>
                  <Download size={15} aria-hidden="true" />
                  Download
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
