import { useState, useEffect } from "react";
import { Sun, Moon, Download, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string, label: string) => {
    setActiveLink(label);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const glassStyle = isDark
    ? scrolled
      ? "bg-[#0D0D12]/80 border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      : "bg-[#0D0D12]/40 border-white/[0.04]"
    : scrolled
      ? "bg-white/80 border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      : "bg-white/40 border-black/[0.04]";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${glassStyle}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => scrollTo("#home", "Home")}
            className="relative flex items-center group cursor-pointer"
            whileHover={{ scale: 1.04 }}>
            <span
              className="text-2xl tracking-tight select-none"
              style={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              NDS
            </span>
            <span
              className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
              style={{ background: "linear-gradient(90deg, #4FACFE, #A855F7)" }}
            />
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href, link.label)}
                className={`relative text-sm transition-colors duration-200 group ${
                  activeLink === link.label
                    ? ""
                    : isDark
                      ? "text-[#A0A8C0] hover:text-white"
                      : "text-slate-500 hover:text-slate-900"
                }`}
                style={
                  activeLink === link.label
                    ? {
                        background:
                          "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: 600,
                      }
                    : {}
                }>
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 rounded-full ${
                    activeLink === link.label
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, #4FACFE, #A855F7)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={toggleTheme}
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                isDark
                  ? "bg-white/[0.05] border-white/10 hover:bg-white/10 hover:border-white/20"
                  : "bg-black/[0.04] border-black/10 hover:bg-black/10 hover:border-black/20"
              }`}>
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}>
                    <Sun size={18} className="text-[#FCD34D]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}>
                    <Moon size={18} className="text-slate-600" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CV Button */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                boxShadow: "0 4px 20px rgba(79,172,254,0.3)",
                fontWeight: 600,
              }}>
              <Download size={15} />
              CV
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                isDark
                  ? "bg-white/[0.05] border-white/10"
                  : "bg-black/[0.04] border-black/10"
              }`}>
              {mobileOpen ? (
                <X
                  size={18}
                  className={isDark ? "text-white" : "text-slate-800"}
                />
              ) : (
                <Menu
                  size={18}
                  className={isDark ? "text-white" : "text-slate-800"}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden border-t ${
              isDark ? "border-white/[0.06]" : "border-black/[0.06]"
            }`}>
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href, link.label)}
                  className={`text-left text-sm py-2 transition-colors duration-200 ${
                    isDark
                      ? "text-[#A0A8C0] hover:text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}>
                  {link.label}
                </button>
              ))}
              <a
                href="#"
                className="flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl text-sm text-white w-fit"
                style={{
                  background:
                    "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
                  fontWeight: 600,
                }}>
                <Download size={15} />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
