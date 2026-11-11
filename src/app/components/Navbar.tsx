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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { getNavigationLinks } from "../data/navigation";
import { getResumeOptions } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(useGSAP);

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

  const navShellRef = useRef<HTMLElement>(null);
  const compactLayerRef = useRef<HTMLDivElement>(null);
  const expandedLayerRef = useRef<HTMLDivElement>(null);
  const leftBrandRef = useRef<HTMLAnchorElement>(null);
  const rightControlsRef = useRef<HTMLDivElement>(null);

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

  // GSAP Center-Outward Symmetrical Capsule Morph Choreography (Desktop lg+)
  useGSAP(
    () => {
      const shell = navShellRef.current;
      const compactLayer = compactLayerRef.current;
      const expandedLayer = expandedLayerRef.current;
      if (!shell) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const navItems = shell.querySelectorAll(".gsap-nav-link-item");
        const viewportW = window.innerWidth;
        const fullBarInnerW = Math.min(1320, viewportW - 64);
        const floatingExpandedW = Math.min(1260, viewportW - 32);
        const floatingInnerW = Math.min(1180, floatingExpandedW - 56);

        if (!scrolled) {
          // STATE 1: Full-Width Top Architectural Bar (At top of page)
          gsap.to(shell, {
            width: viewportW,
            marginTop: 0,
            borderRadius: 0,
            paddingLeft: 36,
            paddingRight: 36,
            paddingTop: 14,
            paddingBottom: 14,
            duration: 0.52,
            ease: "expo.out",
            overwrite: true,
          });

          if (compactLayer) {
            gsap.to(compactLayer, {
              opacity: 0,
              scale: 0.9,
              pointerEvents: "none",
              duration: 0.2,
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (expandedLayer) {
            gsap.to(expandedLayer, {
              width: "100%",
              maxWidth: fullBarInnerW,
              opacity: 1,
              scaleX: 1,
              scaleY: 1,
              pointerEvents: "auto",
              duration: 0.48,
              ease: "expo.out",
              overwrite: true,
            });
          }

          if (leftBrandRef.current && rightControlsRef.current) {
            gsap.to([leftBrandRef.current, rightControlsRef.current], {
              x: 0,
              opacity: 1,
              duration: 0.42,
              ease: "expo.out",
              overwrite: true,
            });
          }

          if (navItems.length) {
            gsap.to(navItems, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.35,
              stagger: { each: 0.018, from: "center" },
              ease: "power3.out",
              overwrite: true,
            });
          }
        } else if (isCompactCapsule) {
          // STATE 2: Compact Floating Capsule (Contracts symmetrically toward the center)
          gsap.to(shell, {
            width: 360,
            marginTop: 14,
            borderRadius: 9999,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 9,
            paddingBottom: 9,
            duration: 0.5,
            ease: "expo.out",
            overwrite: true,
          });

          if (expandedLayer) {
            gsap.to(expandedLayer, {
              width: "100%",
              maxWidth: floatingInnerW,
              opacity: 0,
              scaleX: 0.72,
              scaleY: 0.94,
              pointerEvents: "none",
              duration: 0.24,
              ease: "power3.out",
              overwrite: true,
            });
          }

          if (leftBrandRef.current) {
            gsap.to(leftBrandRef.current, {
              x: 24,
              opacity: 0,
              duration: 0.22,
              ease: "power2.out",
              overwrite: true,
            });
          }
          if (rightControlsRef.current) {
            gsap.to(rightControlsRef.current, {
              x: -24,
              opacity: 0,
              duration: 0.22,
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (navItems.length) {
            gsap.to(navItems, {
              opacity: 0,
              scale: 0.9,
              y: 0,
              duration: 0.18,
              stagger: { each: 0.012, from: "edges" },
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (compactLayer) {
            gsap.to(compactLayer, {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.38,
              delay: 0.08,
              ease: "expo.out",
              overwrite: true,
            });
          }
        } else {
          // STATE 3: Expanded Floating Capsule on Hover (Spreads symmetrically from CENTER to LEFT & RIGHT!)
          gsap.to(shell, {
            width: floatingExpandedW,
            marginTop: 14,
            borderRadius: 9999,
            paddingLeft: 28,
            paddingRight: 28,
            paddingTop: 10,
            paddingBottom: 10,
            duration: 0.52,
            ease: "expo.out",
            overwrite: true,
          });

          if (compactLayer) {
            gsap.to(compactLayer, {
              opacity: 0,
              scale: 0.9,
              pointerEvents: "none",
              duration: 0.18,
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (expandedLayer) {
            gsap.to(expandedLayer, {
              width: "100%",
              maxWidth: floatingInnerW,
              opacity: 1,
              scaleX: 1,
              scaleY: 1,
              pointerEvents: "auto",
              duration: 0.48,
              ease: "expo.out",
              overwrite: true,
            });
          }

          if (leftBrandRef.current) {
            gsap.to(leftBrandRef.current, {
              x: 0,
              opacity: 1,
              duration: 0.46,
              ease: "expo.out",
              overwrite: true,
            });
          }

          if (rightControlsRef.current) {
            gsap.to(rightControlsRef.current, {
              x: 0,
              opacity: 1,
              duration: 0.46,
              ease: "expo.out",
              overwrite: true,
            });
          }

          if (navItems.length) {
            gsap.to(navItems, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.38,
              stagger: { each: 0.022, from: "center" },
              ease: "expo.out",
              overwrite: true,
            });
          }
        }
      });
    },
    {
      scope: navShellRef,
      dependencies: [scrolled, isCompactCapsule],
    },
  );

  // Keep desktop pixel widths responsive on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 || !navShellRef.current) return;
      const viewportW = window.innerWidth;
      const floatingExpandedW = Math.min(1260, viewportW - 32);
      const floatingInnerW = Math.min(1180, floatingExpandedW - 56);

      if (!scrolled) {
        gsap.set(navShellRef.current, { width: viewportW });
        if (expandedLayerRef.current) {
          gsap.set(expandedLayerRef.current, {
            maxWidth: Math.min(1320, viewportW - 64),
          });
        }
      } else if (isCompactCapsule) {
        gsap.set(navShellRef.current, { width: 360 });
        if (expandedLayerRef.current) {
          gsap.set(expandedLayerRef.current, { maxWidth: floatingInnerW });
        }
      } else {
        gsap.set(navShellRef.current, { width: floatingExpandedW });
        if (expandedLayerRef.current) {
          gsap.set(expandedLayerRef.current, { maxWidth: floatingInnerW });
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [scrolled, isCompactCapsule]);

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
      {/* Outer Morphing Shell — Centered so width changes always expand/contract symmetrically from center to left & right */}
      <nav
        ref={navShellRef}
        onMouseEnter={handleMouseEnterCapsule}
        onMouseLeave={handleMouseLeaveCapsule}
        style={{
          transformOrigin: "center center",
          background: isDark
            ? scrolled
              ? "rgba(17, 23, 25, 0.9)"
              : "rgba(17, 23, 25, 0.76)"
            : scrolled
              ? "rgba(245, 247, 248, 0.94)"
              : "rgba(245, 247, 248, 0.82)",
          borderColor: scrolled
            ? "color-mix(in srgb, var(--portfolio-accent) 34%, var(--portfolio-border))"
            : "var(--portfolio-border)",
          boxShadow: scrolled
            ? isDark
              ? "0 14px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(121, 198, 188, 0.08)"
              : "0 14px 36px rgba(20, 42, 44, 0.12), 0 0 0 1px rgba(20, 107, 102, 0.08)"
            : "none",
        }}
        className={`pointer-events-auto relative mx-auto origin-center backdrop-blur-2xl transition-colors duration-300 ${
          isCompactCapsule ? "lg:overflow-hidden" : ""
        } ${
          scrolled
            ? "mt-2.5 sm:mt-3.5 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] rounded-2xl lg:rounded-full border px-3.5 sm:px-5 py-2"
            : "mt-0 w-full border-b px-4 sm:px-6 lg:px-10 py-3 lg:py-3.5"
        }`}>
        {/* ============================================================
            LAYER A (DESKTOP lg+): COMPACT CAPSULE VIEW (DEAD-CENTERED)
           ============================================================ */}
        <div
          ref={compactLayerRef}
          aria-hidden={!isCompactCapsule}
          className="hidden lg:flex absolute inset-0 items-center justify-center gap-3.5 px-5 select-none opacity-0 pointer-events-none">
          <div className="flex items-center justify-center gap-3.5 shrink-0">
            <span
              className="font-display text-lg font-extrabold tracking-tight shrink-0"
              style={{
                color: "var(--portfolio-text)",
                letterSpacing: "-0.03em",
              }}>
              NDS<span style={{ color: "var(--portfolio-accent)" }}>.</span>
            </span>

            <span
              className="h-3.5 w-px shrink-0"
              style={{ background: "var(--portfolio-border)" }}
            />

            <div className="flex items-center gap-2 shrink-0">
              <span
                className="h-2 w-2 rounded-full animate-pulse shrink-0"
                style={{ background: "var(--portfolio-accent)" }}
              />
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-wider shrink-0"
                style={{ color: "var(--portfolio-accent)" }}>
                {SECTION_INDEX_MAP[activeHref] ?? "00"}
              </span>
              <span
                className="font-mono text-xs font-semibold truncate max-w-[130px]"
                style={{ color: "var(--portfolio-text)" }}>
                // {activeNavLink?.label}
              </span>
            </div>

            <span
              className="h-3.5 w-px shrink-0"
              style={{ background: "var(--portfolio-border)" }}
            />

            {/* Live SVG Circular Scroll Progress Meter */}
            <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
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
        </div>

        {/* ============================================================
            LAYER B: EXPANDED SYMMETRICAL FULL BAR
            Wrapped in `flex justify-center` with `lg:shrink-0` on expandedLayerRef
            so shrinking `navShellRef` NEVER triggers `justify-between` flex-start right overflow!
           ============================================================ */}
        <div className="w-full flex justify-center">
          <div
            ref={expandedLayerRef}
            style={{ transformOrigin: "center center" }}
            className="w-full max-w-7xl lg:max-w-none lg:shrink-0 flex items-center justify-between gap-2 sm:gap-3 origin-center">
            {/* Left Brand Logo */}
            <a
              ref={leftBrandRef}
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("#home");
              }}
              className="relative flex items-center group cursor-pointer shrink-0">
              <span
                className="font-display text-xl sm:text-2xl tracking-tight select-none font-extrabold"
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

            {/* Mobile & Tablet Compact Section Indicator (< lg when scrolled) */}
            {scrolled && (
              <div
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex lg:hidden items-center gap-2 sm:gap-3 px-2 py-0.5 select-none cursor-pointer">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse shrink-0"
                    style={{ background: "var(--portfolio-accent)" }}
                  />
                  <span
                    className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--portfolio-accent)" }}>
                    {SECTION_INDEX_MAP[activeHref] ?? "00"}
                  </span>
                  <span
                    className="font-mono text-[11px] sm:text-xs font-semibold truncate max-w-[110px] sm:max-w-none"
                    style={{ color: "var(--portfolio-text)" }}>
                    // {activeNavLink?.label}
                  </span>
                </div>

                <span
                  className="h-3.5 w-px"
                  style={{ background: "var(--portfolio-border)" }}
                />

                <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
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

            {/* Center Desktop Navigation Links (Unfurls from Center Outward!) */}
            <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 shrink-0">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => navigateTo(link.href)}
                    className={`gsap-nav-link-item relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                      isActive ? "font-semibold" : ""
                    }`}
                    style={{
                      color: isActive
                        ? "var(--portfolio-accent)"
                        : "var(--portfolio-muted)",
                    }}>
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full -z-10 transition-all duration-300"
                        style={{
                          background:
                            "color-mix(in srgb, var(--portfolio-accent-soft) 75%, transparent)",
                        }}
                      />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </div>

          {/* Right Controls (Desktop + Mobile/Tablet) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Language, Theme & Resume Controls (lg+) */}
            <div
              ref={rightControlsRef}
              className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
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
                  className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
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

            {/* Mobile & Tablet Controls (< lg: Quick Language Pill, Theme, Hamburger) */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                aria-label={t.nav.switchLanguage}
                className="flex items-center justify-center px-2.5 h-8 sm:h-9 rounded-xl border font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-accent)",
                }}>
                {language === "en" ? "EN" : "ID"}
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-colors"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-text)",
                }}>
                {isDark ? (
                  <Sun size={15} className="text-[#FCD34D]" />
                ) : (
                  <Moon size={15} className="text-slate-600" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-colors duration-200"
                style={{
                  background: "var(--portfolio-surface)",
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-text)",
                }}>
                {mobileOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Mobile & Tablet Menu Drawer (< lg) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t mt-3"
              style={{
                borderColor: "var(--portfolio-border)",
              }}>
              <div className="py-3 flex flex-col gap-2">
                {/* 2-Column Bento Navigation Grid on Mobile & Tablet */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {navLinks.map((link) => {
                    const isActive = activeHref === link.href;
                    const idxCode = SECTION_INDEX_MAP[link.href] ?? "00";
                    return (
                      <button
                        key={link.href}
                        type="button"
                        onClick={() => navigateTo(link.href)}
                        className={`flex items-center gap-2 text-left text-xs sm:text-sm py-2.5 px-3 rounded-xl border transition-colors duration-200 ${
                          isActive ? "font-semibold" : ""
                        }`}
                        style={{
                          background: isActive
                            ? "var(--portfolio-accent-soft)"
                            : "var(--portfolio-surface-raised)",
                          borderColor: isActive
                            ? "var(--portfolio-accent)"
                            : "var(--portfolio-border)",
                          color: isActive
                            ? "var(--portfolio-accent)"
                            : "var(--portfolio-text)",
                        }}>
                        <span
                          className="font-mono text-[10px] opacity-70"
                          style={{ color: "var(--portfolio-accent)" }}>
                          {idxCode}
                        </span>
                        <span className="truncate">{link.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile & Tablet Language + Resume Row */}
                <div
                  className="pt-2.5 border-t grid grid-cols-1 sm:grid-cols-2 gap-2"
                  style={{ borderColor: "var(--portfolio-border)" }}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileLangOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-mono font-medium rounded-xl border transition-colors"
                      style={{
                        background: "var(--portfolio-surface-raised)",
                        borderColor: "var(--portfolio-border)",
                        color: "var(--portfolio-muted)",
                      }}>
                      <span className="flex items-center gap-2">
                        <Globe
                          size={14}
                          className="text-[var(--portfolio-accent)]"
                        />
                        <span>
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

                  <div>
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
                          className="overflow-hidden mt-1.5 flex flex-col gap-1 p-1 rounded-xl border"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
