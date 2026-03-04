import { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "naufal.ds@email.com",
    color: "#4FACFE",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jakarta, Indonesia",
    color: "#A855F7",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    color: "#34D399",
  },
];

export function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
    color: isDark ? "#E8EAF0" : "#1F2937",
    borderRadius: 12,
    padding: "12px 16px",
    width: "100%",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    color: isDark ? "#8890A8" : "#6B7280",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    display: "block",
    marginBottom: 7,
    textTransform: "uppercase",
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #0F0F18 0%, #0D0D12 100%)"
          : "linear-gradient(180deg, #F8F9FF 0%, #F0F4FF 100%)",
      }}>
      {/* Accent glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background: isDark
            ? "radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{
              color: "#34D399",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}>
            Get In Touch
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: isDark ? "#E8EAF0" : "#1F2937",
              letterSpacing: "-0.02em",
            }}>
            Let's{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              Work Together
            </span>
          </h2>
          <p
            style={{
              color: isDark ? "#6B7080" : "#6B7280",
              maxWidth: 460,
              margin: "0 auto",
              fontSize: "0.95rem",
            }}>
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6">
            {contactDetails.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex items-center gap-5 p-5 rounded-2xl border"
                style={{
                  background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.07)",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                  }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-0.5"
                    style={{
                      color: isDark ? "#4A5268" : "#9CA3AF",
                      fontWeight: 700,
                    }}>
                    {label}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: isDark ? "#C0C8E0" : "#374151",
                      fontWeight: 500,
                    }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
                borderColor: isDark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(0,0,0,0.07)",
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
              }}>
              <p
                className="text-xs uppercase tracking-wider mb-5"
                style={{
                  color: isDark ? "#4A5268" : "#9CA3AF",
                  fontWeight: 700,
                }}>
                Connect
              </p>
              <div className="flex gap-3">
                {[
                  {
                    Icon: Github,
                    label: "GitHub",
                    color: "#E8EAF0",
                    href: "https://github.com/NaufalDsp",
                  },
                  {
                    Icon: Linkedin,
                    label: "LinkedIn",
                    color: "#4FACFE",
                    href: "https://www.linkedin.com/in/naufal-dwi-saputro-b14a03299/",
                  },
                ].map(({ Icon, label, color: c, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200"
                    style={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)",
                      background: isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.02)",
                      color: isDark ? c : "#6B7280",
                    }}>
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3">
            <div
              className="p-8 rounded-2xl border"
              style={{
                background: isDark ? "rgba(255,255,255,0.025)" : "#ffffff",
                borderColor: isDark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(0,0,0,0.07)",
                boxShadow: isDark
                  ? "0 4px 40px rgba(0,0,0,0.4)"
                  : "0 4px 40px rgba(0,0,0,0.06)",
              }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(52,211,153,0.15)",
                      border: "1px solid rgba(52,211,153,0.3)",
                    }}>
                    <CheckCircle size={32} className="text-[#34D399]" />
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: isDark ? "#E8EAF0" : "#1F2937",
                      fontSize: "1.2rem",
                      marginBottom: 8,
                    }}>
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      color: isDark ? "#6B7080" : "#6B7280",
                      fontSize: "0.9rem",
                    }}>
                    Thank you for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-8 px-6 py-2.5 rounded-xl text-white text-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                      fontWeight: 600,
                    }}>
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input
                        type="text"
                        placeholder="Naufal Dwi"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#4FACFE";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(79,172,254,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = isDark
                            ? "rgba(255,255,255,0.09)"
                            : "rgba(0,0,0,0.09)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        placeholder="hello@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#4FACFE";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(79,172,254,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = isDark
                            ? "rgba(255,255,255,0.09)"
                            : "rgba(0,0,0,0.09)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Collaboration"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#A855F7";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(168,85,247,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = isDark
                          ? "rgba(255,255,255,0.09)"
                          : "rgba(0,0,0,0.09)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#A855F7";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(168,85,247,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = isDark
                          ? "rgba(255,255,255,0.09)"
                          : "rgba(0,0,0,0.09)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 35px rgba(79,172,254,0.4)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm transition-all duration-300 mt-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                      boxShadow: "0 4px 22px rgba(79,172,254,0.3)",
                      fontWeight: 600,
                      opacity: loading ? 0.8 : 1,
                    }}>
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
