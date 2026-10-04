import { useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Send, CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { CONTACT_DETAILS, SOCIAL_LINKS } from "../data/profile";
import {
  sendContactMessage,
  type ContactMessage,
} from "../services/contactService";

const EMPTY_FORM_DATA: ContactMessage = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  useTheme();
  const [formData, setFormData] = useState<ContactMessage>(EMPTY_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    setLoading(true);

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
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
    background: "var(--portfolio-surface)",
    border: "1px solid var(--portfolio-border)",
    color: "var(--portfolio-text)",
    borderRadius: 6,
    padding: "10px 14px",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    color: "var(--portfolio-text)",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    display: "block",
    marginBottom: 6,
    textTransform: "uppercase",
    fontFamily: "ui-monospace, monospace",
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        background: "var(--background)",
      }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-2xl">
          <p
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--portfolio-accent)" }}>
            Direct Inquiries
          </p>
          <h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: "var(--portfolio-text)",
              letterSpacing: "-0.03em",
            }}>
            Get In Touch
          </h2>
          <p
            className="max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--portfolio-muted)" }}>
            Have a project in mind, an opportunity to discuss, or just want to
            say hello? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2 flex flex-col gap-4">
            {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-lg border transition-colors"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                }}>
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-md border shrink-0"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-accent)",
                  }}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <p
                    className="font-mono text-[10px] uppercase font-bold tracking-wider mb-0.5"
                    style={{
                      color: "var(--portfolio-muted)",
                    }}>
                    {label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: "var(--portfolio-text)",
                    }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div
              className="p-5 rounded-lg border mt-1"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
              }}>
              <p
                className="font-mono text-[10px] uppercase font-bold tracking-wider mb-3.5"
                style={{
                  color: "var(--portfolio-muted)",
                }}>
                Social Profiles
              </p>
              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-md border transition-all duration-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                    style={{
                      borderColor: "var(--portfolio-border)",
                      background: "var(--portfolio-surface-raised)",
                      color: "var(--portfolio-muted)",
                    }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-3">
            <div
              className="p-6 sm:p-8 rounded-lg border"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
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
                    className="text-lg font-bold mb-2"
                    style={{
                      color: "var(--portfolio-text)",
                    }}>
                    Message Sent
                  </h3>
                  <p
                    className="text-sm max-w-sm"
                    style={{
                      color: "var(--portfolio-muted)",
                    }}>
                    Thank you for reaching out. I will review your message and
                    respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData(EMPTY_FORM_DATA);
                    }}
                    className="mt-6 px-5 py-2.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                    style={{
                      background: "var(--portfolio-accent)",
                      color: "var(--portfolio-accent-contrast)",
                    }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Naufal Dwi"
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
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="hello@email.com"
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
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Project Inquiry / Role Discussion"
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
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, timeline, or requirements..."
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
                      className="flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm"
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
                    className="inline-flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-opacity duration-200 mt-2 hover:opacity-90 disabled:opacity-70"
                    style={{
                      background: "var(--portfolio-accent)",
                      color: "var(--portfolio-accent-contrast)",
                    }}>
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
