import { useRef } from "react";
import { ArrowUpRight, BadgeCheck, Download, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { CERTIFICATES } from "../data/certificates";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CertificatePreview({
  previewUrl,
  title,
  altText,
}: {
  previewUrl: string;
  title: string;
  altText: string;
}) {
  return (
    <div
      className="relative mb-5 aspect-[1.414/1] overflow-hidden rounded-xl border bg-white"
      style={{ borderColor: "rgba(31,41,55,0.12)" }}>
      <img
        src={previewUrl}
        alt={`${title} ${altText}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}

function formatIssueDate(
  { year, month, day }: (typeof CERTIFICATES)[number]["issuedAt"],
  locale: string,
) {
  const date = new Date(Date.UTC(year, month - 1, day ?? 1));
  const options: Intl.DateTimeFormatOptions = day
    ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    : { month: "long", year: "numeric", timeZone: "UTC" };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function Certificates() {
  const { language, t } = useLanguage();
  const dateLocale = language === "id" ? "id-ID" : "en-US";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        ".cert-header-reveal",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cert-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".cert-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".cert-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".gsap-cert-card",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-cert-grid",
            start: "top 82%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [language] },
  );

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* ============================================================
            ASYMMETRIC EDITORIAL HEADER (05 // CREDENTIALS & LEARNING)
           ============================================================ */}
        <div className="cert-header-wrap mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="cert-header-reveal flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  05 // {t.certificates.overline}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [{String(CERTIFICATES.length).padStart(2, "0")} VERIFIED
                  LICENSES]
                </span>
              </div>

              <h2
                className="cert-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {t.certificates.title}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; Licenses.
                </span>
              </h2>
            </div>

            <p
              className="cert-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {t.certificates.description}
            </p>
          </div>

          <div
            className="cert-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>

        {/* ============================================================
            CERTIFICATES ARCHITECTURAL GRID
           ============================================================ */}
        <div className="gsap-cert-grid grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {CERTIFICATES.map((certificate, index) => {
            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <article
                key={certificate.id}
                className="gsap-cert-card group flex min-h-56 flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--portfolio-accent)] sm:p-6"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  boxShadow: "var(--portfolio-shadow)",
                }}>
                <div className="mb-3 flex items-center justify-between font-mono text-[11px]">
                  <span
                    className="font-bold"
                    style={{ color: "var(--portfolio-accent)" }}>
                    CERT // {indexLabel}
                  </span>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{ color: "var(--portfolio-muted)" }}>
                    <BadgeCheck
                      size={14}
                      style={{ color: "var(--portfolio-accent)" }}
                      aria-label="Verified document"
                    />
                    VERIFIED
                  </span>
                </div>

                <CertificatePreview
                  previewUrl={certificate.previewUrl}
                  title={certificate.title}
                  altText={t.certificates.altPreview}
                />

                <div className="flex-1">
                  <h3
                    className="font-display text-base sm:text-lg font-bold leading-snug"
                    style={{ color: "var(--portfolio-text)" }}>
                    {certificate.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mt-1 font-medium"
                    style={{ color: "var(--portfolio-accent)" }}>
                    {certificate.issuer ??
                      (language === "id"
                        ? "Kredensial resmi"
                        : "Official credential")}
                  </p>
                  <p
                    className="mt-2 font-mono text-[11px]"
                    style={{ color: "var(--portfolio-muted)" }}>
                    {t.certificates.issuedOn}{" "}
                    {formatIssueDate(certificate.issuedAt, dateLocale)}
                  </p>
                </div>

                <div
                  className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t pt-4"
                  style={{
                    borderColor: "var(--portfolio-border)",
                  }}>
                  <a
                    href={certificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors hover:underline"
                    style={{ color: "var(--portfolio-accent)" }}
                    aria-label={`Open ${certificate.title} PDF in a new tab`}>
                    <FileText size={13} aria-hidden="true" />
                    {t.certificates.openPdf}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a
                    href={certificate.fileUrl}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-colors hover:text-[var(--portfolio-accent)]"
                    style={{ color: "var(--portfolio-muted)" }}
                    aria-label={`Download ${certificate.title} PDF`}>
                    <Download size={13} aria-hidden="true" />
                    {language === "id" ? "Unduh" : "Download"}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
