import { useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Sparkles, Terminal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { getProfessionalTitles, SOCIAL_LINKS } from "../data/profile";
import { scrollToSection } from "../utils/scrollToSection";
import { TypewriterText } from "./TypewriterText";
import portraitDarkUrl from "../../assets/images/naufal-profile-dark.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
        value: "3+",
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

  const orbitText =
    language === "id"
      ? "NAUFAL DWI SAPUTRO • FULL STACK SOFTWARE ENGINEER • ARSITEKTUR BERSIH & INTERAKSI WEB • "
      : "NAUFAL DWI SAPUTRO • FULL STACK SOFTWARE ENGINEER • CLEAN ARCHITECTURE & INTERACTIVE WEB • ";

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      // 1. Entrance Choreography on Initial Load
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl
        .fromTo(
          portalWrapRef.current,
          { scale: 0.68, opacity: 0, rotate: -12 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.25 },
          0.1,
        )
        .fromTo(
          [titleTopRef.current, titleBottomRef.current],
          { yPercent: 35, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
          0.2,
        )
        .fromTo(
          [
            nodeTopLeftRef.current,
            nodeTopRightRef.current,
            nodeBottomLeftRef.current,
            nodeBottomRightRef.current,
          ],
          { y: 28, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
          },
          0.35,
        );

      // 2. Continuous Ambient Rotation on the SVG Orbital Rings
      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 42,
        repeat: -1,
        ease: "none",
      });

      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 56,
        repeat: -1,
        ease: "none",
      });

      // 3. Mouse-Reactive 3D Spatial Parallax (gsap.quickTo)
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
        const rect = section.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        xToPortal(relX * 22);
        yToPortal(relY * 22);
        rotYTo(relX * 16);
        rotXTo(-relY * 16);
        imgXTo(-relX * 14);
        imgYTo(-relY * 14);
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

      // 4. Pinned Interactive Scroll-Zoom Choreography (ScrollTrigger)
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };

          const targetZoom = isDesktop ? 1.62 : 1.28;

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isDesktop ? "+=155%" : "+=115%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressFillRef.current) {
                  progressFillRef.current.style.transform = `scaleX(${self.progress})`;
                }
                if (zoomReadoutRef.current) {
                  const currentZoom = (
                    1 +
                    self.progress * (targetZoom - 1)
                  ).toFixed(2);
                  zoomReadoutRef.current.textContent = `${currentZoom}x`;
                }
              },
            },
          });

          // Phase 1 & 2: Central Portrait Portal Zooms In & Rings Accelerate
          scrollTl.to(
            portalWrapRef.current,
            {
              scale: targetZoom,
              ease: "power2.inOut",
              duration: 0.78,
            },
            0,
          );

          scrollTl.to(
            portraitImgRef.current,
            {
              scale: 1.14,
              ease: "none",
              duration: 0.78,
            },
            0,
          );

          scrollTl.to(
            outerRingRef.current,
            {
              scale: isDesktop ? 1.26 : 1.12,
              rotation: "+=140",
              opacity: 0.25,
              ease: "power2.inOut",
              duration: 0.78,
            },
            0,
          );

          scrollTl.to(
            innerRingRef.current,
            {
              scale: 0.88,
              rotation: "-=120",
              ease: "power2.inOut",
              duration: 0.78,
            },
            0,
          );

          // Monumental Backdrop Typography Splits Outward Like Cinema Curtains
          scrollTl.to(
            titleTopRef.current,
            {
              xPercent: isDesktop ? -28 : -14,
              yPercent: isDesktop ? -18 : -10,
              scale: 1.1,
              opacity: 0.18,
              ease: "power2.inOut",
              duration: 0.75,
            },
            0,
          );

          scrollTl.to(
            titleBottomRef.current,
            {
              xPercent: isDesktop ? 28 : 14,
              yPercent: isDesktop ? 18 : 10,
              scale: 1.1,
              opacity: 0.18,
              ease: "power2.inOut",
              duration: 0.75,
            },
            0,
          );

          // Surrounding Satellite Nodes Expand Radially Outward on Zoom
          if (isDesktop) {
            scrollTl.to(
              nodeTopLeftRef.current,
              {
                x: -70,
                y: -45,
                scale: 0.94,
                opacity: 0.35,
                ease: "power2.inOut",
                duration: 0.7,
              },
              0,
            );
            scrollTl.to(
              nodeTopRightRef.current,
              {
                x: 70,
                y: -45,
                scale: 0.94,
                opacity: 0.35,
                ease: "power2.inOut",
                duration: 0.7,
              },
              0,
            );
            scrollTl.to(
              nodeBottomLeftRef.current,
              {
                x: -70,
                y: 45,
                scale: 0.94,
                opacity: 0.35,
                ease: "power2.inOut",
                duration: 0.7,
              },
              0,
            );
            scrollTl.to(
              nodeBottomRightRef.current,
              {
                x: 70,
                y: 45,
                scale: 0.94,
                opacity: 0.35,
                ease: "power2.inOut",
                duration: 0.7,
              },
              0,
            );
          }

          // Deep-Focus HUD Overlay Locks In During Peak Zoom
          scrollTl.fromTo(
            focusHudRef.current,
            {
              opacity: 0,
              scale: 0.86,
              y: 24,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "power3.out",
              duration: 0.42,
            },
            0.32,
          );

          // Phase 3: Final Hold & Smooth Cinematic Hand-off to Next Section
          scrollTl.to(
            stage,
            {
              scale: 1.04,
              opacity: 0.88,
              ease: "power1.in",
              duration: 0.22,
            },
            0.78,
          );
        },
      );

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: sectionRef, dependencies: [language] },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 pb-10 select-none"
      style={{
        background: "var(--background)",
        perspective: "1200px",
      }}>
      {/* Architectural Grid + Radial Vignette + Subtle Film Grain */}
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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full pointer-events-none blur-[110px] opacity-30 dark:opacity-35"
        style={{
          background:
            "radial-gradient(circle, var(--portfolio-accent) 0%, rgba(20, 107, 102, 0.12) 55%, transparent 75%)",
        }}
      />

      {/* Main Spatial Stage */}
      <div
        ref={stageRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center min-h-[calc(100vh-5.5rem)]">
        {/* Top Architectural Frame Bar */}
        <div
          className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] pb-3 mb-4 lg:mb-0 lg:pb-0 lg:
          absolute lg:top-4 lg:left-12 lg:right-12 lg:w-auto border-b lg:border-b-0"
          style={{
            color: "var(--portfolio-muted)",
            borderColor: "var(--portfolio-border)",
          }}>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--portfolio-accent)" }}
            />
            <span>SYS.00 // SPATIAL IDENTITY</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>LAT 7.4279° S · LON 111.0220° E</span>
            <span style={{ color: "var(--portfolio-accent)" }}>
              [SCROLL TO ENGAGE ZOOM]
            </span>
          </div>
        </div>

        {/* ============================================================
            MONUMENTAL SPLIT BACKDROP TYPOGRAPHY (BEHIND PORTRAIT)
           ============================================================ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-14 sm:py-16 lg:py-12 overflow-hidden z-0">
          {/* Upper Monumental Line: NAUFAL */}
          <div
            ref={titleTopRef}
            className="w-full flex items-center justify-center lg:justify-start lg:pl-6">
            <span
              className="font-display font-extrabold uppercase tracking-tighter leading-none select-none"
              style={{
                fontSize: "clamp(3.3rem, 11.5vw, 10.5rem)",
                color: "var(--portfolio-text)",
                opacity: 0.11,
                letterSpacing: "-0.04em",
              }}>
              NAUFAL
            </span>
            <span
              className="hidden md:inline-block ml-6 font-editorial italic font-normal text-stroke-accent"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 6.2rem)",
                opacity: 0.45,
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
                fontSize: "clamp(2.2rem, 5.5vw, 5.4rem)",
                color: "var(--portfolio-accent)",
                opacity: 0.28,
              }}>
              Engineer
            </span>
            <span
              className="font-display font-extrabold uppercase tracking-tighter leading-none text-stroke-editorial select-none"
              style={{
                fontSize: "clamp(2.8rem, 9.8vw, 8.8rem)",
                letterSpacing: "-0.04em",
              }}>
              DWI SAPUTRO
            </span>
          </div>
        </div>

        {/* ============================================================
            CENTRAL ORBITAL PORTRAIT STAGE + SURROUNDING SATELLITE NODES
           ============================================================ */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 my-auto py-2 lg:py-6">
          {/* LEFT SATELLITE COLUMN (Nodes 01 & 03 on Desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 lg:gap-14 order-2 lg:order-1 z-20">
            {/* NODE 01 // IDENTITY & ROLE */}
            <div
              ref={nodeTopLeftRef}
              className="relative rounded-2xl border p-4 sm:p-5 backdrop-blur-md transition-colors duration-300"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 84%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}>
                  [01 // IDENTITY]
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border"
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
                  fontSize: "clamp(1.65rem, 2.6vw, 2.35rem)",
                  color: "var(--portfolio-text)",
                }}>
                Naufal Dwi Saputro
                <span style={{ color: "var(--portfolio-accent)" }}>.</span>
              </h1>

              <div className="mt-2 flex items-center gap-2">
                <Terminal
                  size={14}
                  style={{ color: "var(--portfolio-accent)" }}
                  className="shrink-0"
                />
                <TypewriterText
                  words={professionalTitles}
                  className="font-mono text-xs sm:text-sm font-semibold"
                  style={{ color: "var(--portfolio-accent)" }}
                />
              </div>

              <div
                className="mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono"
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
              className="relative rounded-2xl border p-4 sm:p-5 backdrop-blur-md"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 84%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between mb-3">
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

              <div className="grid grid-cols-2 gap-3">
                {heroStats.map((item) => (
                  <div
                    key={item.code}
                    className="rounded-xl border p-2.5 sm:p-3 transition-colors hover:border-[var(--portfolio-accent)]"
                    style={{
                      background: "var(--portfolio-surface-raised)",
                      borderColor: "var(--portfolio-border)",
                    }}>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="font-display text-xl sm:text-2xl font-extrabold tracking-tight"
                        style={{
                          color: "var(--portfolio-text)",
                          fontVariantNumeric: "tabular-nums",
                        }}>
                        {item.value}
                      </span>
                      {item.suffix && (
                        <span
                          className="font-mono text-[10px] font-semibold"
                          style={{ color: "var(--portfolio-accent)" }}>
                          {item.suffix}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[11px] leading-snug mt-0.5 font-medium"
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
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 z-30 my-2 lg:my-0">
            <div
              ref={portalWrapRef}
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
              className="relative flex items-center justify-center w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] lg:w-[410px] lg:h-[410px]">
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
                  style={{
                    fontSize: "12.2px",
                    letterSpacing: "0.255em",
                    opacity: 0.78,
                  }}>
                  <textPath href="#heroOrbitTextPath" startOffset="0%">
                    {orbitText}
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
                className="relative w-[205px] h-[205px] sm:w-[258px] sm:h-[258px] lg:w-[284px] lg:h-[284px] rounded-full p-2 flex items-center justify-center">
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
                    className="w-full h-full object-cover object-center scale-[1.05] select-none pointer-events-none"
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

                {/* Floating Coordinate Badge on Portal Rim */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest whitespace-nowrap shadow-lg backdrop-blur-md"
                  style={{
                    background: "var(--portfolio-surface)",
                    borderColor: "var(--portfolio-accent)",
                    color: "var(--portfolio-text)",
                  }}>
                  <span style={{ color: "var(--portfolio-accent)" }}>●</span>{" "}
                  NDS // STUDIO PORTRAIT
                </div>
              </div>

              {/* DEEP-FOCUS HUD OVERLAY (REVEALED AS USER SCROLL-ZOOMS IN) */}
              <div
                ref={focusHudRef}
                className="pointer-events-none absolute -bottom-12 sm:-bottom-14 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] rounded-2xl border px-4 py-3 backdrop-blur-xl shadow-2xl opacity-0 z-40"
                style={{
                  background:
                    "color-mix(in srgb, var(--portfolio-surface) 92%, transparent)",
                  borderColor: "var(--portfolio-accent)",
                }}>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-1.5">
                  <span
                    className="font-bold flex items-center gap-1"
                    style={{ color: "var(--portfolio-accent)" }}>
                    <Sparkles size={11} />
                    {language === "id"
                      ? "FOKUS ARSITEKTUR"
                      : "ARCHITECTURAL FOCUS"}
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
          </div>

          {/* RIGHT SATELLITE COLUMN (Nodes 02 & 04 on Desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 lg:gap-14 order-3 z-20">
            {/* NODE 02 // MANIFESTO & CORE STACK */}
            <div
              ref={nodeTopRightRef}
              className="relative rounded-2xl border p-4 sm:p-5 backdrop-blur-md"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 84%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between mb-2.5">
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
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--portfolio-muted)" }}>
                {t.hero.bio}
              </p>

              <div className="mt-3.5 flex flex-wrap gap-1.5">
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
                    className="px-2.5 py-1 rounded-md border font-mono text-[11px] font-medium"
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
              className="relative rounded-2xl border p-4 sm:p-5 backdrop-blur-md"
              style={{
                background:
                  "color-mix(in srgb, var(--portfolio-surface) 84%, transparent)",
                borderColor: "var(--portfolio-border)",
                boxShadow: "var(--portfolio-shadow)",
              }}>
              <div className="flex items-center justify-between mb-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollToSection("#projects")}
                  className="group inline-flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    background: "var(--portfolio-accent)",
                    color: "var(--portfolio-accent-contrast)",
                    boxShadow: "0 6px 20px rgba(20, 107, 102, 0.28)",
                  }}>
                  <span>{t.hero.viewProjects}</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="inline-flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] cursor-pointer"
                  style={{
                    background: "var(--portfolio-surface-raised)",
                    borderColor: "var(--portfolio-border)",
                    color: "var(--portfolio-text)",
                  }}>
                  <span>{t.hero.contactMe}</span>
                  <Mail size={15} style={{ color: "var(--portfolio-accent)" }} />
                </button>
              </div>

              {/* Social Channels Bar */}
              <div
                className="mt-4 pt-3 border-t flex items-center justify-between"
                style={{ borderColor: "var(--portfolio-border)" }}>
                <span
                  className="text-[11px] font-mono uppercase tracking-wider font-semibold"
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
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM INTERACTIVE SCROLL-ZOOM TELEMETRY BAR
           ============================================================ */}
        <div
          className="w-full max-w-xl mx-auto mt-4 lg:mt-0 lg:absolute lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <div className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] px-1">
            <span
              className="flex items-center gap-1.5"
              style={{ color: "var(--portfolio-muted)" }}>
              <ArrowDown
                size={12}
                className="animate-bounce"
                style={{ color: "var(--portfolio-accent)" }}
              />
              {language === "id"
                ? "SCROLL UNTUK ZOOM INTERAKTIF"
                : "SCROLL FOR INTERACTIVE ZOOM"}
            </span>
            <span
              className="font-semibold"
              style={{ color: "var(--portfolio-accent)" }}>
              ZOOM // <span ref={zoomReadoutRef}>1.00x</span>
            </span>
          </div>

          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: "var(--portfolio-border)" }}>
            <div
              ref={progressFillRef}
              className="h-full w-full origin-left scale-x-0 transition-transform duration-75"
              style={{ background: "var(--portfolio-accent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
