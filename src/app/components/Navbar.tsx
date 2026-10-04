import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Download, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NAVIGATION_LINKS } from "../data/navigation";
import { CV_URL } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const isClickingRef = useRef(false);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);

        if (isClickingRef.current) return;

        // 1. When near top, activate Home
        if (scrollY < 120) {
          setActiveLink("Home");
          return;
        }

        // 2. When near bottom of page, activate Contact
        if (
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 70
        ) {
          setActiveLink("Contact");
          return;
        }

        // 3. Scan sections by active reading line (32% from viewport top)
        const triggerPoint = window.innerHeight * 0.32;
        let matchedLabel: string | null = null;

        for (const link of NAVIGATION_LINKS) {
          const section = document.querySelector(link.href);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
              matchedLabel = link.label;
              break;
            }
          }
        }

        // Fallback: If in between padding, find the closest section to trigger point
        if (!matchedLabel) {
          let minDistance = Infinity;
          for (const link of NAVIGATION_LINKS) {
            const section = document.querySelector(link.href);
            if (section) {
              const rect = section.getBoundingClientRect();
              const dist = Math.abs(rect.top - triggerPoint);
              if (dist < minDistance) {
                minDistance = dist;
                matchedLabel = link.label;
              }
            }
          }
        }

        if (matchedLabel) {
          setActiveLink(matchedLabel);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navigateTo = (href: `#${string}`, label: string) => {
    setActiveLink(label);
    setMobileOpen(false);
    isClickingRef.current = true;
    scrollToSection(href);
    setTimeout(() => {
      isClickingRef.current = false;
    }, 700);
  };

  const glassStyle = isDark
    ? scrolled
      ? "bg-[#111719]/85 border-[#2b383b] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      : "bg-[#111719]/60 border-[#2b383b]/60"
    : scrolled
      ? "bg-[#f5f7f8]/90 border-[#e1e7e8] shadow-[0_4px_24px_rgba(24,42,44,0.06)]"
      : "bg-[#f5f7f8]/70 border-[#e1e7e8]/60";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${glassStyle}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={() => navigateTo("#home", "Home")}
            className="relative flex items-center group cursor-pointer"
            whileHover={{ scale: 1.04 }}>
            <span
              className="text-2xl tracking-tight select-none font-extrabold"
              style={{
                color: "var(--portfolio-text)",
                letterSpacing: "-0.03em",
              }}>
              NDS
              <span
                style={{ color: "var(--portfolio-accent)" }}
                aria-hidden="true">
                .
              </span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => navigateTo(link.href, link.label)}
                className={`relative text-xs lg:text-sm font-medium transition-colors duration-200 group ${
                  activeLink === link.label ? "font-semibold" : ""
                }`}
                style={{
                  color:
                    activeLink === link.label
                      ? "var(--portfolio-accent)"
                      : "var(--portfolio-muted)",
                }}>
                {link.label}
                {activeLink === link.label && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background: "var(--portfolio-accent)",
                    }}
                  />
                )}
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
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka CV Naufal Dwi Saputro"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
              style={{
                background: "var(--portfolio-accent)",
                color: "var(--portfolio-accent-contrast)",
              }}>
              <Download size={14} />
              Resume
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border transition-colors duration-200"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                color: "var(--portfolio-text)",
              }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: "var(--portfolio-surface)",
              borderColor: "var(--portfolio-border)",
            }}>
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigateTo(link.href, link.label)}
                  className={`text-left text-sm py-2 transition-colors duration-200 ${
                    activeLink === link.label ? "font-semibold" : ""
                  }`}
                  style={{
                    color:
                      activeLink === link.label
                        ? "var(--portfolio-accent)"
                        : "var(--portfolio-muted)",
                  }}>
                  {link.label}
                </button>
              ))}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buka CV Naufal Dwi Saputro"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 rounded-lg text-xs font-semibold w-fit shadow-sm"
                style={{
                  background: "var(--portfolio-accent)",
                  color: "var(--portfolio-accent-contrast)",
                }}>
                <Download size={14} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
