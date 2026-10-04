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
  useTheme();

  return (
    <section
      id="certificates"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--portfolio-accent)" }}>
            Credentials &amp; Learning
          </p>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            Certificates
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            Verified technical certifications and course completions across
            software development, networking, databases, and AI.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {CERTIFICATES.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
              className="flex min-h-56 flex-col rounded-lg border p-5 transition-colors sm:p-6"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
              }}>
              <CertificatePreview
                previewUrl={certificate.previewUrl}
                title={certificate.title}
              />

              <div className="mb-4 flex items-start justify-between gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-accent)",
                  }}>
                  <FileText size={17} aria-hidden="true" />
                </div>
                <BadgeCheck
                  size={17}
                  className="mt-1 shrink-0"
                  style={{ color: "var(--portfolio-accent)" }}
                  aria-label="Verified document"
                />
              </div>

              <div className="flex-1">
                <h3
                  className="text-base font-bold leading-snug"
                  style={{ color: "var(--portfolio-text)" }}>
                  {certificate.title}
                </h3>
                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--portfolio-muted)" }}>
                  {certificate.issuer ?? "Official credential"}
                </p>
                <p
                  className="mt-2.5 font-mono text-[11px]"
                  style={{ color: "var(--portfolio-muted)" }}>
                  Issued {formatIssueDate(certificate.issuedAt)}
                </p>
              </div>

              <div
                className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-3.5"
                style={{
                  borderColor: "var(--portfolio-border)",
                }}>
                <a
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
                  style={{ color: "var(--portfolio-accent)" }}
                  aria-label={`Open ${certificate.title} PDF in a new tab`}>
                  View PDF
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a
                  href={certificate.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                  style={{ color: "var(--portfolio-muted)" }}
                  aria-label={`Download ${certificate.title} PDF`}>
                  <Download size={13} aria-hidden="true" />
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
