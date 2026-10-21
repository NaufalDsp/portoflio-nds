import { useState, useEffect, useRef, useMemo } from "react";
import {
  Sun,
  Moon,
  Download,
  Menu,
  X,
  Globe,
  ChevronDown,
  Check,
  FileText,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { getNavigationLinks } from "../data/navigation";
import { getResumeOptions } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { motion, AnimatePresence } from "motion/react";

const LANGUAGE_OPTIONS = [
  {
    code: "en" as const,
    label: "English",
    nativeLabel: "English",
    badge: "EN",
  },
  {
    code: "id" as const,
    label: "Indonesia",
    nativeLabel: "Bahasa Indonesia",
    badge: "ID",
  },
] as const;

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [mobileResumeOpen, setMobileResumeOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#home");
  const isClickingRef = useRef(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const resumeDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = useMemo(() => getNavigationLinks(language), [language]);
  const resumeOptions = useMemo(() => getResumeOptions(language), [language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(target)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        resumeDropdownRef.current &&
        !resumeDropdownRef.current.contains(target)
      ) {
        setResumeDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangDropdownOpen(false);
        setMobileLangOpen(false);
        setResumeDropdownOpen(false);
        setMobileResumeOpen(false);
      }
    };

    if (langDropdownOpen || resumeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [langDropdownOpen, resumeDropdownOpen]);

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
          setActiveHref("#home");
          return;
        }

        // 2. When near bottom of page, activate Contact
        if (
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 70
        ) {
          setActiveHref("#contact");
          return;
        }

        // 3. Scan sections by active reading line (32% from viewport top)
        const triggerPoint = window.innerHeight * 0.32;
        let matchedHref: string | null = null;

        for (const link of navLinks) {
          const section = document.querySelector(link.href);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
              matchedHref = link.href;
              break;
            }
          }
        }

        // Fallback: If in between padding, find closest section to trigger point
        if (!matchedHref) {
          let minDistance = Infinity;
          for (const link of navLinks) {
            const section = document.querySelector(link.href);
            if (section) {
              const rect = section.getBoundingClientRect();
              const dist = Math.abs(rect.top - triggerPoint);
              if (dist < minDistance) {
                minDistance = dist;
                matchedHref = link.href;
              }
            }
          }
        }

        if (matchedHref) {
          setActiveHref(matchedHref);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [navLinks]);

  const navigateTo = (href: `#${string}`) => {
    setActiveHref(href);
    setMobileOpen(false);
    setLangDropdownOpen(false);
    setMobileLangOpen(false);
    setResumeDropdownOpen(false);
    setMobileResumeOpen(false);
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
            onClick={() => navigateTo("#home")}
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
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigateTo(link.href)}
                className={`relative text-xs lg:text-sm font-medium transition-colors duration-200 group ${
                  activeHref === link.href ? "font-semibold" : ""
                }`}
                style={{
                  color:
                    activeHref === link.href
                      ? "var(--portfolio-accent)"
                      : "var(--portfolio-muted)",
                }}>
                {link.label}
                {activeHref === link.href && (
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
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
                aria-label={t.nav.currentLanguage}
                title={t.nav.switchLanguage}
                className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 h-10 rounded-xl border text-xs font-mono font-semibold transition-all duration-200 ${
                  isDark
                    ? "bg-white/[0.05] border-white/10 hover:bg-white/10 hover:border-white/20 text-[#d5dedf]"
                    : "bg-black/[0.04] border-black/10 hover:bg-black/10 hover:border-black/20 text-slate-700"
                } ${
                  langDropdownOpen
                    ? "border-[var(--portfolio-accent)]/60 ring-2 ring-[var(--portfolio-accent)]/20 shadow-sm"
                    : ""
                }`}>
                <Globe size={15} className="text-[var(--portfolio-accent)] shrink-0" />
                <span className="uppercase tracking-wider font-bold">
                  {language === "en" ? "EN" : "ID"}
                </span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 opacity-70 ${
                    langDropdownOpen
                      ? "rotate-180 text-[var(--portfolio-accent)] opacity-100"
                      : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border p-1.5 shadow-2xl backdrop-blur-2xl z-[70] overflow-hidden"
                    style={{
                      background: "var(--portfolio-surface)",
                      borderColor: "var(--portfolio-border)",
                    }}
                    role="listbox"
                    aria-label="Select Language">
                    <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--portfolio-muted)]">
                      {language === "id" ? "Pilih Bahasa" : "Select Language"}
                    </div>
                    {LANGUAGE_OPTIONS.map((opt) => {
                      const isSelected = language === opt.code;
                      return (
                        <button
                          key={opt.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setLanguage(opt.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors duration-150 ${
                            isSelected
                              ? "bg-[var(--portfolio-accent)]/15 text-[var(--portfolio-accent)] font-semibold"
                              : "text-[var(--portfolio-text)] hover:bg-black/5 dark:hover:bg-white/5 font-medium"
                          }`}>
                          <div className="flex flex-col items-start text-left">
                            <span className="text-xs font-sans leading-tight">
                              {opt.nativeLabel}
                            </span>
                            <span className="text-[10px] font-mono opacity-60 leading-tight">
                              {opt.badge}
                            </span>
                          </div>
                          {isSelected && (
                            <Check
                              size={14}
                              className="text-[var(--portfolio-accent)] shrink-0 ml-2"
                            />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
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

            {/* Resume Dropdown */}
            <div className="relative hidden md:block" ref={resumeDropdownRef}>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setResumeDropdownOpen((prev) => !prev)}
                aria-expanded={resumeDropdownOpen}
                aria-haspopup="menu"
                aria-label={t.nav.selectResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
                style={{
                  background: "var(--portfolio-accent)",
                  color: "var(--portfolio-accent-contrast)",
                }}>
                <Download size={14} />
                <span>{t.nav.resume}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    resumeDropdownOpen ? "rotate-180" : "opacity-80"
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {resumeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-44 rounded-xl border p-1.5 shadow-2xl backdrop-blur-2xl z-[70] overflow-hidden"
                    style={{
                      background: "var(--portfolio-surface)",
                      borderColor: "var(--portfolio-border)",
                    }}
                    role="menu"
                    aria-label={t.nav.selectResume}>
                    <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--portfolio-muted)] flex items-center justify-between">
                      <span>{t.nav.selectResume}</span>
                      <span className="text-[9px] opacity-60">PDF</span>
                    </div>
                    {resumeOptions.map((opt) => (
                      <a
                        key={opt.id}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        onClick={() => setResumeDropdownOpen(false)}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors duration-150 text-[var(--portfolio-text)] hover:bg-black/5 dark:hover:bg-white/5 group font-medium">
                        <span className="font-mono text-xs font-semibold group-hover:text-[var(--portfolio-accent)] transition-colors">
                          {opt.label}
                        </span>
                        <FileText
                          size={13}
                          className="text-[var(--portfolio-muted)] group-hover:text-[var(--portfolio-accent)] shrink-0 transition-colors"
                        />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
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
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => navigateTo(link.href)}
                  className={`text-left text-sm py-2 transition-colors duration-200 ${
                    activeHref === link.href ? "font-semibold" : ""
                  }`}
                  style={{
                    color:
                      activeHref === link.href
                        ? "var(--portfolio-accent)"
                        : "var(--portfolio-muted)",
                  }}>
                  {link.label}
                </button>
              ))}

              {/* Mobile Language Dropdown Row */}
              <div
                className="pt-3 border-t mt-2"
                style={{ borderColor: "var(--portfolio-border)" }}>
                <button
                  type="button"
                  onClick={() => setMobileLangOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-2 text-xs font-mono font-medium rounded-lg px-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: "var(--portfolio-muted)" }}>
                  <span className="flex items-center gap-2">
                    <Globe size={14} className="text-[var(--portfolio-accent)]" />
                    <span>Language / Bahasa:</span>
                    <span
                      className="font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-[11px]"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        color: "var(--portfolio-accent)",
                      }}>
                      {language === "en" ? "EN • English" : "ID • Indonesia"}
                    </span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      mobileLangOpen
                        ? "rotate-180 text-[var(--portfolio-accent)]"
                        : "opacity-70"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileLangOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-1.5 flex flex-col gap-1 p-1 rounded-xl border"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                      }}>
                      {LANGUAGE_OPTIONS.map((opt) => {
                        const isSelected = language === opt.code;
                        return (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() => {
                              setLanguage(opt.code);
                              setMobileLangOpen(false);
                            }}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                              isSelected
                                ? "bg-[var(--portfolio-accent)]/15 text-[var(--portfolio-accent)] font-semibold"
                                : "text-[var(--portfolio-text)] hover:bg-black/5 dark:hover:bg-white/5"
                            }`}>
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-medium">
                                {opt.nativeLabel}
                              </span>
                              <span className="text-[10px] font-mono opacity-60">
                                ({opt.badge})
                              </span>
                            </div>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-[var(--portfolio-accent)] shrink-0"
                              />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Resume Dropdown Row */}
              <div
                className="pt-2 border-t mt-1"
                style={{ borderColor: "var(--portfolio-border)" }}>
                <button
                  type="button"
                  onClick={() => setMobileResumeOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-semibold shadow-sm transition-all"
                  style={{
                    background: "var(--portfolio-accent)",
                    color: "var(--portfolio-accent-contrast)",
                  }}>
                  <span className="flex items-center gap-2">
                    <Download size={14} />
                    <span>{t.nav.downloadCv}</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      mobileResumeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileResumeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-2 flex flex-col gap-1.5 p-1.5 rounded-xl border"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                      }}>
                      {resumeOptions.map((opt) => (
                        <a
                          key={opt.id}
                          href={opt.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setMobileResumeOpen(false);
                            setMobileOpen(false);
                          }}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors hover:bg-black/5 dark:hover:bg-white/5 font-medium"
                          style={{ color: "var(--portfolio-text)" }}>
                          <span className="font-mono text-xs font-semibold">
                            {opt.label}
                          </span>
                          <FileText
                            size={14}
                            className="text-[var(--portfolio-muted)] shrink-0 ml-2"
                          />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
