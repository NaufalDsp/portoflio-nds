import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Terminal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { getProfessionalTitles, SOCIAL_LINKS } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { TypewriterText } from "./TypewriterText";
import portraitDarkUrl from "../../assets/images/naufal-profile-dark.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_ORBIT_TEXT =
  "NAUFAL DWI SAPUTRO • SOFTWARE ENGINEER • FULL STACK DEVELOPER • AI ENTHUSIAST • ";

export function Hero() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const portalWrapRef = useRef<HTMLDivElement>(null);
  const portraitInnerRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const outerRingRef = useRef<SVGSVGElement>(null);
  const innerRingRef = useRef<SVGSVGElement>(null);
  const titleTopRef = useRef<HTMLDivElement>(null);
  const titleBottomRef = useRef<HTMLDivElement>(null);
  const nodeTopLeftRef = useRef<HTMLDivElement>(null);
  const nodeTopRightRef = useRef<HTMLDivElement>(null);
  const nodeBottomLeftRef = useRef<HTMLDivElement>(null);
  const nodeBottomRightRef = useRef<HTMLDivElement>(null);
  const focusHudRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const zoomReadoutRef = useRef<HTMLSpanElement>(null);

  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  const professionalTitles = useMemo(
    () => getProfessionalTitles(language),
    [language],
  );

  const heroStats = useMemo(
    () => [
      {
        code: "01",
        value: "4",
        label: t.hero.stats.internships,
      },
      {
        code: "02",
        value: "9+",
        label: t.hero.stats.webApps,
      },
      {
        code: "03",
        value: "10",
        label: t.hero.stats.credentials,
      },
      {
        code: "04",
        value: "3.91",
        suffix: "/4.00",
        label: t.hero.stats.gpa,
      },
    ],
    [t],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const textNodes = [
        nodeTopLeftRef.current,
        nodeTopRightRef.current,
        nodeBottomLeftRef.current,
        nodeBottomRightRef.current,
        titleTopRef.current,
        titleBottomRef.current,
      ].filter(Boolean);

      const restoreCrispText = () => {
        gsap.set(textNodes, {
          clearProps: "transform,opacity",
        });
      };

      // 1. Entrance Choreography on Initial Load
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: restoreCrispText,
      });

      introTl
        .fromTo(
          portalWrapRef.current,
          { scale: 0.72, opacity: 0, rotate: -10 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.15,
            clearProps: "rotate",
          },
          0.08,
        )
        .fromTo(
          [titleTopRef.current, titleBottomRef.current],
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.1,
            clearProps: "transform,opacity",
          },
          0.18,
        )
        .fromTo(
          [
            nodeTopLeftRef.current,
            nodeTopRightRef.current,
            nodeBottomLeftRef.current,
            nodeBottomRightRef.current,
          ],
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.07,
            clearProps: "transform,opacity",
          },
          0.3,
        );

      // 2. Continuous Ambient Rotation on the SVG Orbital Rings
      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 54,
        repeat: -1,
        ease: "none",
      });

      // 3. Mouse-Reactive 3D Spatial Parallax (Desktop pointer devices)
      const xToPortal = gsap.quickTo(portraitInnerRef.current, "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      const yToPortal = gsap.quickTo(portraitInnerRef.current, "y", {
        duration: 0.6,
        ease: "power3.out",
      });
      const rotXTo = gsap.quickTo(portraitInnerRef.current, "rotationX", {
        duration: 0.6,
        ease: "power3.out",
      });
      const rotYTo = gsap.quickTo(portraitInnerRef.current, "rotationY", {
        duration: 0.6,
        ease: "power3.out",
      });
      const imgXTo = gsap.quickTo(portraitImgRef.current, "x", {
        duration: 0.7,
        ease: "power3.out",
      });
      const imgYTo = gsap.quickTo(portraitImgRef.current, "y", {
        duration: 0.7,
        ease: "power3.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
        const rect = section.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        xToPortal(relX * 20);
        yToPortal(relY * 20);
        rotYTo(relX * 15);
        rotXTo(-relY * 15);
        imgXTo(-relX * 12);
        imgYTo(-relY * 12);
      };

      const handleMouseLeave = () => {
        xToPortal(0);
        yToPortal(0);
        rotXTo(0);
        rotYTo(0);
        imgXTo(0);
        imgYTo(0);
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      // 4. Interactive Scroll-Zoom Choreography (Desktop: Cinematic Pinned Zoom; Mobile/Tablet: Natural Fluid Scroll)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // DESKTOP (lg+): Pinned Cinematic Spatial Scroll-Zoom
        // Calibrated targetZoom (1.28x on laptops < 950px, 1.40x on large monitors) to guarantee ample breathing room
        const targetZoom = window.innerHeight > 950 ? 1.4 : 1.28;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            onLeaveBack: () => {
              restoreCrispText();
            },
            onUpdate: (self) => {
              if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (zoomReadoutRef.current) {
                const currentZoom = (1 + self.progress * (targetZoom - 1)).toFixed(2);
                zoomReadoutRef.current.textContent = `${currentZoom}x`;
              }
              if (self.progress === 0) {
                restoreCrispText();
              }
            },
          },
        });

        scrollTl.eventCallback("onReverseComplete", () => {
          restoreCrispText();
        });

        // Central Portrait Portal Zooms In & Rings Accelerate (Strictly scale >= 1.0, No shrinking on scroll start)
        scrollTl.fromTo(
          portalWrapRef.current,
          { scale: 1 },
          {
            scale: targetZoom,
            ease: "power2.inOut",
            duration: 0.78,
          },
          0,
        );

        scrollTl.fromTo(
          portraitImgRef.current,
          { scale: 1 },
          {
            scale: 1.14,
            ease: "none",
            duration: 0.78,
          },
          0,
        );

        scrollTl.fromTo(
          outerRingRef.current,
          { scale: 1 },
          {
            scale: 1.24,
            rotation: "+=140",
            opacity: 0.25,
            ease: "power2.inOut",
            duration: 0.78,
          },
          0,
        );

        scrollTl.fromTo(
          innerRingRef.current,
          { scale: 1 },
          {
            scale: 1.06,
            rotation: "-=120",
            ease: "power2.inOut",
            duration: 0.78,
          },
          0,
        );

        // Monumental Backdrop Typography Splits Outward Like Cinema Curtains (No scale down/up to preserve 100% font raster sharpness)
        scrollTl.fromTo(
          titleTopRef.current,
          { xPercent: 0, yPercent: 0, opacity: 1 },
          {
            xPercent: -24,
            yPercent: -12,
            opacity: 0.14,
            ease: "power2.inOut",
            duration: 0.75,
          },
          0,
        );

        scrollTl.fromTo(
          titleBottomRef.current,
          { xPercent: 0, yPercent: 0, opacity: 1 },
          {
            xPercent: 24,
            yPercent: 12,
            opacity: 0.14,
            ease: "power2.inOut",
            duration: 0.75,
          },
          0,
        );

        // Satellite Nodes Parting on Desktop (Horizontally and slightly vertically, No scale downscaling to prevent font raster blur)
        scrollTl.fromTo(
          nodeTopLeftRef.current,
          { x: 0, y: 0, opacity: 1 },
          {
            x: -68,
            y: -28,
            opacity: 0.18,
            ease: "power2.inOut",
            duration: 0.72,
          },
          0,
        );
        scrollTl.fromTo(
          nodeTopRightRef.current,
          { x: 0, y: 0, opacity: 1 },
          {
            x: 68,
            y: -28,
            opacity: 0.18,
            ease: "power2.inOut",
            duration: 0.72,
          },
          0,
        );
        scrollTl.fromTo(
          nodeBottomLeftRef.current,
          { x: 0, y: 0, opacity: 1 },
          {
            x: -68,
            y: 28,
            opacity: 0.18,
            ease: "power2.inOut",
            duration: 0.72,
          },
          0,
        );
        scrollTl.fromTo(
          nodeBottomRightRef.current,
          { x: 0, y: 0, opacity: 1 },
          {
            x: 68,
            y: 28,
            opacity: 0.18,
            ease: "power2.inOut",
            duration: 0.72,
          },
          0,
        );

        // Deep-Focus HUD Overlay Locks In During Peak Zoom in Desktop Center Column
        if (focusHudRef.current) {
          // 1. Reveal during peak focal zoom
          scrollTl.fromTo(
            focusHudRef.current,
            {
              opacity: 0,
              scale: 0.9,
              y: 16,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "back.out(1.2)",
              duration: 0.35,
            },
            0.28,
          );

          // 2. Graceful Dissolve before hand-off so it NEVER gets cut off or truncated by Projects section
          scrollTl.to(
            focusHudRef.current,
            {
              opacity: 0,
              scale: 0.94,
              y: -12,
              ease: "power2.in",
              duration: 0.18,
            },
            0.8,
          );
        }
      });

      mm.add("(max-width: 1023px)", () => {
        // MOBILE & TABLET (< lg): Natural Fluid Unpinned Scroll
        // Eliminates screen locking, card displacement, and overlapping HUD clashes
        const mobileScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
            onLeaveBack: () => {
              restoreCrispText();
            },
            onUpdate: (self) => {
              if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (zoomReadoutRef.current) {
                const currentZoom = (1 + self.progress * 0.12).toFixed(2);
                zoomReadoutRef.current.textContent = `${currentZoom}x`;
              }
              if (self.progress === 0) {
                restoreCrispText();
              }
            },
          },
        });

        // Gentle Portal & Ring Parallax (Cards remain 100% visible and uncolliding)
        mobileScrollTl.fromTo(
          portalWrapRef.current,
          { scale: 1 },
          {
            scale: 1.08,
            y: 14,
            ease: "none",
          },
          0,
        );

        mobileScrollTl.to(
          outerRingRef.current,
          {
            rotation: "+=80",
            ease: "none",
          },
          0,
        );

        mobileScrollTl.to(
          innerRingRef.current,
          {
            rotation: "-=70",
            ease: "none",
          },
          0,
        );

        mobileScrollTl.to(
          titleTopRef.current,
          {
            xPercent: -12,
            ease: "none",
          },
          0,
        );

        mobileScrollTl.to(
          titleBottomRef.current,
          {
            xPercent: 12,
            ease: "none",
          },
          0,
        );
      });

      const handleNativeScroll = () => {
        if (window.scrollY === 0) {
          restoreCrispText();
        }
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", handleNativeScroll);
      };
    },
    { scope: sectionRef, dependencies: [language] },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 select-none"
      style={{
        background: "var(--background)",
      }}>
      {/* Architectural Grid + Radial Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--portfolio-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--portfolio-border) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 35%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 35%, transparent 88%)",
        }}
      />

      {/* Ambient Emerald-Teal Core Glow Behind Center Portrait */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[440px] sm:h-[440px] lg:w-[580px] lg:h-[580px] rounded-full pointer-events-none blur-[100px] opacity-30 dark:opacity-35"
        style={{
          background:
            "radial-gradient(circle, var(--portfolio-accent) 0%, rgba(20, 107, 102, 0.12) 55%, transparent 75%)",
        }}
      />

      {/* Main Spatial Stage */}
      <div
        ref={stageRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-7 lg:px-12 flex flex-col items-center justify-between min-h-[calc(100dvh-5.5rem)]">
        {/* Top Architectural Frame Bar (Desktop & Tablet) */}
        <div
          className="hidden sm:flex w-full items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] pb-2 lg:pb-0 lg:absolute lg:top-3 lg:left-12 lg:right-12 lg:w-auto"
          style={{
            color: "var(--portfolio-muted)",
          }}>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--portfolio-accent)" }}
            />
            <span>SYS.00 // SPATIAL IDENTITY</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden md:inline">
              LAT 7.4279° S · LON 111.0220° E
            </span>
            <span style={{ color: "var(--portfolio-accent)" }}>
              [SRAGEN · INDONESIA]
            </span>
          </div>
        </div>

        {/* ============================================================
            MONUMENTAL SPLIT BACKDROP TYPOGRAPHY (BEHIND PORTRAIT)
           ============================================================ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-10 sm:py-14 lg:py-12 overflow-hidden z-0">
          {/* Upper Monumental Line: NAUFAL */}
          <div
            ref={titleTopRef}
            className="w-full flex items-center justify-center lg:justify-start lg:pl-6">
            <span
              className="font-display font-extrabold uppercase tracking-tighter leading-none select-none"
              style={{
                fontSize: "clamp(2.8rem, 11vw, 10.2rem)",
                color: "var(--portfolio-text)",
                opacity: 0.1,
                letterSpacing: "-0.04em",
              }}>
              NAUFAL
            </span>
            <span
              className="hidden md:inline-block ml-6 font-editorial italic font-normal text-stroke-accent"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 6rem)",
                opacity: 0.42,
              }}>
              Creative
            </span>
          </div>

          {/* Lower Monumental Line: DWI SAPUTRO */}
          <div
            ref={titleBottomRef}
            className="w-full flex items-center justify-center lg:justify-end lg:pr-6">
            <span
              className="hidden md:inline-block mr-6 font-editorial italic font-normal"
              style={{
                fontSize: "clamp(2rem, 5vw, 5.2rem)",
                color: "var(--portfolio-accent)",
                opacity: 0.26,
              }}>
              Engineer
            </span>
            <span
              className="font-display font-extrabold uppercase tracking-tighter leading-none text-stroke-editorial select-none"
              style={{
                fontSize: "clamp(2.4rem, 9.5vw, 8.6rem)",
                letterSpacing: "-0.04em",
              }}>
              DWI SAPUTRO
            </span>
          </div>
        </div>

        {/* ============================================================
            CENTRAL ORBITAL PORTRAIT STAGE + SURROUNDING SATELLITE NODES
            - Desktop (lg): 12-col 3-part spatial layout (Left 4 / Center 4 / Right 4)
            - Tablet (sm/md): Top Identity + Center Portrait + 2-col Bottom Dock
            - Mobile (<sm): Compact Identity + Center Portrait + Compact Stats/CTA Dock
           ============================================================ */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-3.5 sm:gap-4 lg:gap-5 my-auto py-1 lg:py-4">
          {/* LEFT SATELLITE COLUMN ON DESKTOP / TOP-LEFT & BOTTOM-LEFT ON TABLET */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between gap-3.5 sm:gap-4 lg:gap-12 order-2 lg:order-1 z-20">
            {/* NODE 01 // IDENTITY & ROLE */}
            <div
              ref={nodeTopLeftRef}
              className="relative rounded-2xl border p-3.5 sm:p-4 lg:p-5 backdrop-blur-md transition-colors duration-300"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 86%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  [01 // IDENTITY]
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold border"
                  style={{
                    background: "var(--portfolio-accent-soft)",
                    color: "var(--portfolio-accent-strong)",
                    borderColor: "var(--portfolio-accent)",
                  }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ background: "var(--portfolio-accent)" }}
                  />
                  {t.hero.codeCard.status}
                </span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tight leading-[1.06]"
                style={{
                  fontSize: "clamp(1.35rem, 2.5vw, 2.25rem)",
                  color: "var(--portfolio-text)",
                }}>
                Naufal Dwi Saputro
                <span style={{ color: "var(--portfolio-accent)" }}>.</span>
              </h1>

              <div className="mt-1.5 flex items-center gap-2">
                <Terminal
                  size={13}
                  style={{ color: "var(--portfolio-accent)" }}
                  className="shrink-0"
                />
                <TypewriterText
                  words={professionalTitles}
                  className="font-mono text-xs sm:text-sm font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}
                />
              </div>

              {/* Mobile Core Engineering Standards Pills (< lg) */}
              <div
                className="flex lg:hidden flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t"
                style={{ borderColor: "var(--portfolio-border)" }}>
                <span
                  className="font-mono text-[9px] uppercase tracking-wider font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  {language === "id" ? "STANDAR KODE:" : "STANDARDS:"}
                </span>
                {t.hero.codeCard.principles.map((p) => (
                  <span
                    key={p}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-text)",
                    }}>
                    {p}
                  </span>
                ))}
              </div>

              <div
                className="mt-2.5 pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono"
                style={{
                  borderColor: "var(--portfolio-border)",
                  color: "var(--portfolio-muted)",
                }}>
                <a
                  href="https://github.com/NaufalDsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--portfolio-text)" }}>
                  @NaufalDsp
                </a>
                <span className="inline-flex items-center gap-1">
                  <MapPin
                    size={12}
                    style={{ color: "var(--portfolio-accent)" }}
                  />
                  {t.hero.location}
                </span>
              </div>
            </div>

            {/* NODE 03 // LIVE TELEMETRY METRICS */}
            <div
              ref={nodeBottomLeftRef}
              className="relative rounded-2xl border p-3.5 sm:p-4 lg:p-5 backdrop-blur-md"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 86%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  [03 // TELEMETRY]
                </span>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--portfolio-muted)" }}>
                  UNS · D3 INFORMATICS
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {heroStats.map((item) => (
                  <div
                    key={item.code}
                    className="rounded-xl border p-2 sm:p-2.5 transition-colors hover:border-[var(--portfolio-accent)]"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                    }}>
                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                      <span
                        className="font-display text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight"
                        style={{
                          color: "var(--portfolio-text)",
                          fontVariantNumeric: "tabular-nums",
                        }}>
                        {item.value}
                      </span>
                      {item.suffix && (
                        <span
                          className="hidden sm:inline font-mono text-[10px] font-semibold"
                          style={{ color: "var(--portfolio-accent)" }}>
                          {item.suffix}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[10px] sm:text-[11px] leading-tight mt-0.5 font-medium line-clamp-1 sm:line-clamp-none"
                      style={{ color: "var(--portfolio-muted)" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================
              CENTERPIECE COLUMN: PORTRAIT PORTAL + ORBITING SVG TEXT RINGS
             ============================================================ */}
          <div className="relative md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 z-30 my-1 sm:my-2 lg:my-0">
            <div
              ref={portalWrapRef}
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
              className="relative flex items-center justify-center w-[236px] h-[236px] sm:w-[310px] sm:h-[310px] lg:w-[395px] lg:h-[395px]"
              style={{ perspective: "1000px" }}>
              {/* OUTER ROTATING SVG ORBITAL TEXT RING */}
              <svg
                ref={outerRingRef}
                viewBox="0 0 500 500"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <path
                    id="heroOrbitTextPath"
                    d="M 250, 250 m -216, 0 a 216,216 0 1,1 432,0 a 216,216 0 1,1 -432,0"
                  />
                </defs>
                <circle
                  cx="250"
                  cy="250"
                  r="238"
                  fill="none"
                  stroke="var(--portfolio-border)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
                <text
                  fill="var(--portfolio-text)"
                  className="font-mono uppercase font-semibold"
                  textLength="1340"
                  lengthAdjust="spacing"
                  textRendering="geometricPrecision"
                  style={{
                    fontSize: "12.5px",
                    letterSpacing: "0.22em",
                    opacity: 0.82,
                  }}>
                  <textPath href="#heroOrbitTextPath" startOffset="0%">
                    {HERO_ORBIT_TEXT}
                  </textPath>
                </text>
              </svg>

              {/* INNER COUNTER-ROTATING COMPASS / TELEMETRY RING */}
              <svg
                ref={innerRingRef}
                viewBox="0 0 500 500"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none">
                <circle
                  cx="250"
                  cy="250"
                  r="184"
                  fill="none"
                  stroke="var(--portfolio-accent)"
                  strokeWidth="1.5"
                  strokeDasharray="18 12 4 12"
                  strokeOpacity="0.55"
                />
                <circle
                  cx="250"
                  cy="66"
                  r="4.5"
                  fill="var(--portfolio-accent)"
                />
                <circle
                  cx="250"
                  cy="434"
                  r="4.5"
                  fill="var(--portfolio-accent)"
                />
                <circle
                  cx="66"
                  cy="250"
                  r="3.5"
                  fill="var(--portfolio-accent)"
                  fillOpacity="0.6"
                />
                <circle
                  cx="434"
                  cy="250"
                  r="3.5"
                  fill="var(--portfolio-accent)"
                  fillOpacity="0.6"
                />
              </svg>

              {/* CENTRAL 3D PARALLAX PORTRAIT CORE */}
              <div
                ref={portraitInnerRef}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[166px] h-[166px] sm:w-[218px] sm:h-[218px] lg:w-[276px] lg:h-[276px] rounded-full p-1.5 sm:p-2 flex items-center justify-center">
                {/* Glowing Emerald-Teal Aura Ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full transition-all duration-500"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, var(--portfolio-accent) 0deg, transparent 120deg, var(--portfolio-accent) 240deg, transparent 360deg)",
                    opacity: isPortraitHovered ? 0.9 : 0.55,
                    filter: "blur(8px)",
                  }}
                />

                {/* Circular Portrait Frame */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden border-2 shadow-2xl bg-[#05080b]"
                  style={{
                    borderColor: "var(--portfolio-accent)",
                  }}>
                  <img
                    ref={portraitImgRef}
                    src={portraitDarkUrl}
                    alt="Naufal Dwi Saputro — Editorial Side Profile Portrait"
                    className="w-full h-full object-cover object-center scale-100 select-none pointer-events-none"
                  />

                  {/* Subtle Emerald-Teal Rim Light Overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 25%, transparent 55%, rgba(20, 184, 166, 0.22) 100%)",
                    }}
                  />
                </div>

                {/* Floating Role & System Identity Badge on Portal Rim */}
                <div
                  className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider whitespace-nowrap shadow-lg backdrop-blur-md flex items-center gap-1.5"
                  style={{
                    background: "var(--portfolio-surface)",
                    borderColor: "var(--portfolio-accent)",
                    color: "var(--portfolio-text)",
                  }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "var(--portfolio-accent)" }}
                  />
                  <span className="font-semibold">
                    NDS // SOFTWARE ENGINEER
                  </span>
                </div>
              </div>
            </div>

            {/* DEEP-FOCUS HUD OVERLAY (DOCKED IN CENTER COLUMN, NEVER MULTIPLIED BY PORTAL SCALE) */}
            <div
              ref={focusHudRef}
              className="hidden lg:block pointer-events-none absolute -bottom-8 xl:-bottom-10 left-1/2 -translate-x-1/2 w-[330px] xl:w-[365px] rounded-2xl border px-3.5 py-2.5 backdrop-blur-xl shadow-2xl opacity-0 z-40"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 95%, transparent)",
                borderColor: "var(--portfolio-accent)",
                boxShadow:
                  "0 14px 32px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(20, 184, 166, 0.2)",
              }}>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-1.5">
                <span
                  className="font-bold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  {language === "id"
                    ? "PRINSIP REKAYASA KODE"
                    : "CORE ENGINEERING STANDARDS"}
                </span>
                <span style={{ color: "var(--portfolio-muted)" }}>
                  GPA 3.91 / 4.00
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono font-semibold">
                {t.hero.codeCard.principles.map((p) => (
                  <span
                    key={p}
                    className="px-2 py-0.5 rounded border"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-text)",
                    }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SATELLITE COLUMN ON DESKTOP / TOP-RIGHT & BOTTOM-RIGHT ON TABLET */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between gap-3.5 sm:gap-4 lg:gap-12 order-3 z-20">
            {/* NODE 02 // MANIFESTO & CORE STACK (Hidden on tiny phones to keep 100dvh unclipped, visible from sm/tablet up) */}
            <div
              ref={nodeTopRightRef}
              className="hidden sm:block relative rounded-2xl border p-4 lg:p-5 backdrop-blur-md"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 86%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  [02 // ARCHITECTURE]
                </span>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--portfolio-muted)" }}>
                  FULL STACK
                </span>
              </div>

              <p
                className="text-xs sm:text-sm leading-relaxed line-clamp-3 lg:line-clamp-none"
                style={{ color: "var(--portfolio-muted)" }}>
                {t.hero.bio}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  "TypeScript",
                  "React",
                  "Vue.js",
                  "Laravel",
                  "Node.js",
                  "Tailwind CSS",
                ].map((stack) => (
                  <span
                    key={stack}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border font-mono text-[10px] sm:text-[11px] font-medium"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                      color: "var(--portfolio-text)",
                    }}>
                    {stack}
                  </span>
                ))}
              </div>
            </div>

            {/* NODE 04 // MAGNETIC ACTION DOCK & SOCIAL CHANNELS */}
            <div
              ref={nodeBottomRightRef}
              className="relative rounded-2xl border p-3.5 sm:p-4 lg:p-5 backdrop-blur-md"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 86%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="hidden sm:flex items-center justify-between mb-2.5">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  [04 // NAVIGATION DOCK]
                </span>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--portfolio-muted)" }}>
                  DIRECT ACCESS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollToSection("#projects")}
                  className="group inline-flex items-center justify-between gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    background: "var(--portfolio-accent)",
                    color: "var(--portfolio-accent-contrast)",
                    boxShadow: "0 6px 20px rgba(20, 107, 102, 0.28)",
                  }}>
                  <span className="truncate">{t.hero.viewProjects}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="inline-flex items-center justify-between gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] cursor-pointer"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-text)",
                  }}>
                  <span className="truncate">{t.hero.contactMe}</span>
                  <Mail
                    size={14}
                    style={{ color: "var(--portfolio-accent)" }}
                    className="shrink-0"
                  />
                </button>
              </div>

              {/* Social Channels Bar */}
              <div
                className="mt-3 pt-2.5 border-t flex items-center justify-between"
                style={{ borderColor: "var(--portfolio-border)" }}>
                <span
                  className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold"
                  style={{ color: "var(--portfolio-muted)" }}>
                  {t.hero.connect}
                </span>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)]"
                      style={{
                        borderColor: "var(--portfolio-border)",
                        background: "var(--portfolio-surface-raised)",
                        color: "var(--portfolio-text)",
                      }}>
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM TELEMETRY PROGRESS BAR
           ============================================================ */}
        <div
          className="w-full max-w-md mx-auto mt-2 lg:mt-0 lg:absolute lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2 flex items-center gap-3 z-30">
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ background: "var(--portfolio-border)" }}>
            <div
              ref={progressFillRef}
              className="h-full w-full origin-left scale-x-0 transition-transform duration-75"
              style={{ background: "var(--portfolio-accent)" }}
            />
          </div>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.18em] font-semibold shrink-0"
            style={{ color: "var(--portfolio-accent)" }}>
            <span ref={zoomReadoutRef}>1.00x</span>
          </span>
        </div>
      </div>
    </section>
  );
}
