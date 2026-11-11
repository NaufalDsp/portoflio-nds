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

const SECTION_INDEX_MAP: Record<string, string> = {
  "#home": "00",
  "#projects": "01",
  "#skills": "02",
  "#experience": "03",
  "#education": "04",
  "#certificates": "05",
  "#activity": "06",
  "#contact": "07",
};

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [mobileResumeOpen, setMobileResumeOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#home");

  const isClickingRef = useRef(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const resumeDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = useMemo(() => getNavigationLinks(language), [language]);
  const resumeOptions = useMemo(() => getResumeOptions(language), [language]);

  const activeNavLink = useMemo(
    () => navLinks.find((l) => l.href === activeHref) ?? navLinks[0],
    [navLinks, activeHref],
  );

  // Whether the desktop navbar is in compact pill state vs expanded state
  const isDropdownActive = langDropdownOpen || resumeDropdownOpen;
  const isCompactCapsule = scrolled && !isHovered && !isDropdownActive;

  const handleMouseEnterCapsule = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeaveCapsule = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

        setScrolled(scrollY > 72);
        setScrollProgress(pct);

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

        // 3. Scan sections (accounting for GSAP .pin-spacer wrapper if pinned)
        const triggerPoint = window.innerHeight * 0.35;
        let matchedHref: string | null = null;

        for (const link of navLinks) {
          const rawEl = document.querySelector(link.href);
          const section = rawEl?.closest(".pin-spacer") ?? rawEl;
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
              matchedHref = link.href;
              break;
            }
          }
        }

        if (!matchedHref) {
          let minDistance = Infinity;
          for (const link of navLinks) {
            const rawEl = document.querySelector(link.href);
            const section = rawEl?.closest(".pin-spacer") ?? rawEl;
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
    }, 750);
  };

  const ringCircumference = 2 * Math.PI * 9;
  const ringOffset = ringCircumference * (1 - scrollProgress);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-center">
      {/* Outer Morphing Container */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={handleMouseEnterCapsule}
        onMouseLeave={handleMouseLeaveCapsule}
        style={{
          background: isDark
            ? scrolled
              ? "rgba(17, 23, 25, 0.88)"
              : "rgba(17, 23, 25, 0.72)"
            : scrolled
              ? "rgba(245, 247, 248, 0.92)"
              : "rgba(245, 247, 248, 0.78)",
          borderColor: scrolled
            ? "color-mix(in srgb, var(--portfolio-accent) 32%, var(--portfolio-border))"
            : "var(--portfolio-border)",
          boxShadow: scrolled
            ? isDark
              ? "0 14px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(121, 198, 188, 0.08)"
              : "0 14px 36px rgba(20, 42, 44, 0.12), 0 0 0 1px rgba(20, 107, 102, 0.08)"
            : "none",
        }}
        className={`pointer-events-auto backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? isCompactCapsule
              ? "mt-3.5 w-[calc(100%-2rem)] md:w-auto md:min-w-[330px] md:max-w-[420px] rounded-2xl md:rounded-full border px-4 sm:px-5 py-2"
              : "mt-3.5 w-[calc(100%-2rem)] max-w-6xl rounded-2xl md:rounded-full border px-5 sm:px-7 py-2.5"
            : "mt-0 w-full max-w-full border-b px-6 lg:px-10 py-3.5 lg:py-4"
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("#home");
            }}
            className="relative flex items-center group cursor-pointer shrink-0">
            <span
              className={`font-display tracking-tight select-none font-extrabold transition-all duration-300 ${
                isCompactCapsule ? "text-lg" : "text-xl sm:text-2xl"
              }`}
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
          </a>

          {/* ============================================================
              COMPACT CAPSULE INDICATOR (SHOWN ON DESKTOP WHEN SCROLLED & NOT HOVERED)
             ============================================================ */}
          {isCompactCapsule && (
            <div className="hidden md:flex items-center gap-3 px-2 py-0.5 select-none">
              <span
                className="h-3.5 w-px"
                style={{ background: "var(--portfolio-border)" }}
              />

              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ background: "var(--portfolio-accent)" }}
                />
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--portfolio-accent)" }}>
                  {SECTION_INDEX_MAP[activeHref] ?? "00"}
                </span>
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: "var(--portfolio-text)" }}>
                  // {activeNavLink?.label}
                </span>
              </div>

              <span
                className="h-3.5 w-px"
                style={{ background: "var(--portfolio-border)" }}
              />

              {/* Live SVG Circular Scroll Progress Meter */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <svg
                  className="w-6 h-6 -rotate-90"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="var(--portfolio-border)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="var(--portfolio-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                  />
                </svg>
                <span
                  className="font-mono text-[8px] font-bold"
                  style={{ color: "var(--portfolio-muted)" }}>
                  {Math.round(scrollProgress * 100)}
                </span>
              </div>
            </div>
          )}

          {/* ============================================================
              FULL DESKTOP NAVIGATION LINKS (SHOWN AT TOP OR WHEN CAPSULE HOVERED)
             ============================================================ */}
          <div
            className={`hidden md:flex items-center gap-1 lg:gap-1.5 transition-all duration-300 ${
              isCompactCapsule
                ? "hidden opacity-0 pointer-events-none w-0 overflow-hidden"
                : "opacity-100"
            }`}>
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigateTo(link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs lg:text-[13px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive ? "font-semibold" : ""
                  }`}
                  style={{
                    color: isActive
                      ? "var(--portfolio-accent)"
                      : "var(--portfolio-muted)",
                  }}>
                  {isActive && (
                    <motion.span
                      layoutId="activeCapsuleNavIndicator"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background:
                          "color-mix(in srgb, var(--portfolio-accent-soft) 75%, transparent)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ============================================================
              RIGHT CONTROLS (THEME, LANGUAGE, RESUME, MOBILE MENU)
             ============================================================ */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Language & Resume Controls (Hidden in compact pill to keep capsule ultra-sleek, shown on hover) */}
            <div
              className={`hidden md:flex items-center gap-2 transition-all duration-300 ${
                isCompactCapsule
                  ? "hidden opacity-0 pointer-events-none w-0 overflow-hidden"
                  : "opacity-100"
              }`}>
              {/* Language Switcher Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen((prev) => !prev)}
                  aria-expanded={langDropdownOpen}
                  aria-haspopup="listbox"
                  aria-label={t.nav.currentLanguage}
                  title={t.nav.switchLanguage}
                  className={`relative flex items-center gap-1.5 px-2.5 h-9 rounded-full border text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                    isDark
                      ? "bg-white/[0.05] border-white/10 hover:bg-white/10 text-[#d5dedf]"
                      : "bg-black/[0.04] border-black/10 hover:bg-black/10 text-slate-700"
                  }`}>
                  <Globe
                    size={14}
                    className="text-[var(--portfolio-accent)] shrink-0"
                  />
                  <span className="uppercase tracking-wider font-bold">
                    {language === "en" ? "EN" : "ID"}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 opacity-70 ${
                      langDropdownOpen
                        ? "rotate-180 text-[var(--portfolio-accent)] opacity-100"
                        : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-2xl z-[70] overflow-hidden"
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
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors duration-150 cursor-pointer ${
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
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 cursor-pointer ${
                  isDark
                    ? "bg-white/[0.05] border-white/10 hover:bg-white/10"
                    : "bg-black/[0.04] border-black/10 hover:bg-black/10"
                }`}>
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}>
                      <Sun size={16} className="text-[#FCD34D]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}>
                      <Moon size={16} className="text-slate-600" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Resume Dropdown */}
              <div className="relative" ref={resumeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setResumeDropdownOpen((prev) => !prev)}
                  aria-expanded={resumeDropdownOpen}
                  aria-haspopup="menu"
                  aria-label={t.nav.selectResume}
                  className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                  style={{
                    background: "var(--portfolio-accent)",
                    color: "var(--portfolio-accent-contrast)",
                  }}>
                  <Download size={13} />
                  <span>{t.nav.resume}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      resumeDropdownOpen ? "rotate-180" : "opacity-80"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {resumeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-44 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-2xl z-[70] overflow-hidden"
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
                          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors duration-150 text-[var(--portfolio-text)] hover:bg-black/5 dark:hover:bg-white/5 group font-medium">
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
            </div>

            {/* Mobile Controls (Theme + Hamburger) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center w-9 h-9 rounded-xl border transition-colors"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-text)",
                }}>
                {isDark ? (
                  <Sun size={16} className="text-[#FCD34D]" />
                ) : (
                  <Moon size={16} className="text-slate-600" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
                className="flex items-center justify-center w-9 h-9 rounded-xl border transition-colors duration-200"
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

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t mt-3"
              style={{
                borderColor: "var(--portfolio-border)",
              }}>
              <div className="py-3 flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => navigateTo(link.href)}
                    className={`text-left text-sm py-2 px-3 rounded-xl transition-colors duration-200 ${
                      activeHref === link.href ? "font-semibold" : ""
                    }`}
                    style={{
                      background:
                        activeHref === link.href
                          ? "var(--portfolio-accent-soft)"
                          : "transparent",
                      color:
                        activeHref === link.href
                          ? "var(--portfolio-accent)"
                          : "var(--portfolio-muted)",
                    }}>
                    {link.label}
                  </button>
                ))}

                {/* Mobile Language Row */}
                <div
                  className="pt-3 border-t mt-1"
                  style={{ borderColor: "var(--portfolio-border)" }}>
                  <button
                    type="button"
                    onClick={() => setMobileLangOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between py-2 px-3 text-xs font-mono font-medium rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    style={{ color: "var(--portfolio-muted)" }}>
                    <span className="flex items-center gap-2">
                      <Globe
                        size={14}
                        className="text-[var(--portfolio-accent)]"
                      />
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

                {/* Mobile Resume Row */}
                <div
                  className="pt-2 border-t mt-1"
                  style={{ borderColor: "var(--portfolio-border)" }}>
                  <button
                    type="button"
                    onClick={() => setMobileResumeOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm transition-all"
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
    </header>
  );
}
