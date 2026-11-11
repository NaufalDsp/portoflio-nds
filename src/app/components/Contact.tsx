import { useState, useMemo, useRef } from "react";
import { AlertCircle, ArrowUpRight, Send, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { getContactDetails, SOCIAL_LINKS } from "../data/profile";
import {
  sendContactMessage,
  type ContactMessage,
} from "../services/contactService";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EMPTY_FORM_DATA: ContactMessage = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<ContactMessage>(EMPTY_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const contactDetails = useMemo(
    () => getContactDetails(language),
    [language],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        ".contact-header-reveal",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".contact-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".contact-header-wrap",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".gsap-contact-block",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-contact-grid",
            start: "top 82%",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [language] },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t.contact.errorDefault,
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof ContactMessage, value: string) => {
    setErrorMessage(null);
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--portfolio-surface-raised)",
    border: "1px solid var(--portfolio-border)",
    color: "var(--portfolio-text)",
    borderRadius: 10,
    padding: "12px 15px",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    color: "var(--portfolio-text)",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: 8,
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* ============================================================
            ASYMMETRIC EDITORIAL HEADER (07 // GET IN TOUCH)
           ============================================================ */}
        <div className="contact-header-wrap mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
            <div>
              <div className="contact-header-reveal flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--portfolio-accent)",
                    borderColor: "var(--portfolio-border)",
                    background: "var(--portfolio-surface)",
                  }}>
                  07 // {t.contact.overline}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--portfolio-muted)" }}>
                  [DIRECT TRANSMISSION]
                </span>
              </div>

              <h2
                className="contact-header-reveal font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]"
                style={{
                  color: "var(--portfolio-text)",
                  letterSpacing: "-0.03em",
                }}>
                {t.contact.title}
                <span
                  className="font-editorial italic font-normal ml-3"
                  style={{ color: "var(--portfolio-accent)" }}>
                  &amp; Collaborate.
                </span>
              </h2>
            </div>

            <p
              className="contact-header-reveal max-w-md text-sm sm:text-base leading-relaxed lg:text-right"
              style={{ color: "var(--portfolio-muted)" }}>
              {t.contact.description}
            </p>
          </div>

          <div
            className="contact-header-line h-px w-full origin-left"
            style={{ background: "var(--portfolio-border)" }}
          />
        </div>

        <div className="gsap-contact-grid grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info panel */}
          <div className="gsap-contact-block lg:col-span-2 flex flex-col gap-4">
            {contactDetails.map(({ icon: Icon, label, value, href }) => {
              const cardContent = (
                <>
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl border shrink-0 transition-colors"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-accent)",
                    }}>
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-mono text-[10px] uppercase font-bold tracking-wider mb-0.5"
                      style={{
                        color: "var(--portfolio-muted)",
                      }}>
                      {label}
                    </p>
                    <p
                      className="text-sm font-semibold truncate transition-colors group-hover:text-[var(--portfolio-accent)]"
                      style={{
                        color: "var(--portfolio-text)",
                      }}>
                      {value}
                    </p>
                  </div>
                  {href && (
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      style={{ color: "var(--portfolio-accent)" }}
                    />
                  )}
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200 group hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)]"
                  style={{
                    background: "var(--portfolio-surface)",
                    borderColor: "var(--portfolio-border)",
                    boxShadow: "var(--portfolio-shadow)",
                  }}>
                  {cardContent}
                </a>
              ) : (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors"
                  style={{
                    background: "var(--portfolio-surface)",
                    borderColor: "var(--portfolio-border)",
                    boxShadow: "var(--portfolio-shadow)",
                  }}>
                  {cardContent}
                </div>
              );
            })}

            {/* Social Links */}
            <div
              className="p-5 sm:p-6 rounded-2xl border mt-1"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <p
                className="font-mono text-[10px] uppercase font-bold tracking-wider mb-3.5"
                style={{
                  color: "var(--portfolio-muted)",
                }}>
                {t.contact.labels.social}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)]"
                    style={{
                      borderColor: "var(--portfolio-border)",
                      background: "var(--portfolio-surface-raised)",
                      color: "var(--portfolio-text)",
                    }}>
                    <Icon size={15} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="gsap-contact-block lg:col-span-3">
            <div
              className="p-6 sm:p-8 lg:p-10 rounded-2xl border"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border"
                    style={{
                      background: "var(--portfolio-accent-soft)",
                      borderColor: "var(--portfolio-accent)",
                    }}>
                    <CheckCircle
                      size={24}
                      style={{ color: "var(--portfolio-accent)" }}
                    />
                  </div>
                  <h3
                    className="font-display text-xl font-bold mb-2"
                    style={{
                      color: "var(--portfolio-text)",
                    }}>
                    {t.contact.success.title}
                  </h3>
                  <p
                    className="text-sm max-w-sm"
                    style={{
                      color: "var(--portfolio-muted)",
                    }}>
                    {t.contact.success.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData(EMPTY_FORM_DATA);
                    }}
                    className="mt-6 px-5 py-2.5 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90 cursor-pointer"
                    style={{
                      background: "var(--portfolio-accent)",
                      color: "var(--portfolio-accent-contrast)",
                    }}>
                    {t.contact.success.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>{t.contact.form.fullName}</label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder={t.contact.form.fullNamePlaceholder}
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--portfolio-focus)";
                          e.target.style.boxShadow =
                            "0 0 0 2px var(--portfolio-accent-soft)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "var(--portfolio-border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.contact.form.email}</label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--portfolio-focus)";
                          e.target.style.boxShadow =
                            "0 0 0 2px var(--portfolio-accent-soft)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            "var(--portfolio-border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>{t.contact.form.subject}</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder={t.contact.form.subjectPlaceholder}
                      value={formData.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--portfolio-focus)";
                        e.target.style.boxShadow =
                          "0 0 0 2px var(--portfolio-accent-soft)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--portfolio-border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.contact.form.message}</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={t.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      required
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--portfolio-focus)";
                        e.target.style.boxShadow =
                          "0 0 0 2px var(--portfolio-accent-soft)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--portfolio-border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm"
                      style={{
                        color: "var(--destructive, #b91c1c)",
                        background: "rgba(239, 68, 68, 0.08)",
                        borderColor: "rgba(239, 68, 68, 0.25)",
                      }}>
                      <AlertCircle size={17} className="mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 mt-1 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-70 cursor-pointer"
                    style={{
                      background: "var(--portfolio-accent)",
                      color: "var(--portfolio-accent-contrast)",
                      boxShadow: "0 6px 20px rgba(20, 107, 102, 0.24)",
                    }}>
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        {t.contact.form.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
