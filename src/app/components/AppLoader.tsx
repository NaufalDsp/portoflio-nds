import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(useGSAP);

interface AppLoaderProps {
  onComplete: () => void;
}

export function AppLoader({ onComplete }: AppLoaderProps) {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);
  const centerStageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);

  const [isPointerHidden, setIsPointerHidden] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        const timer = window.setTimeout(onComplete, 300);
        return () => window.clearTimeout(timer);
      }

      const statusMessages =
        language === "id"
          ? [
              "MENGINISIALISASI RUANG VISUAL...",
              "MEMUAT ASET & ARSITEKTUR...",
              "MENYINKRONKAN TELEMETRI...",
              "SIAP // NAUFAL DWI SAPUTRO",
            ]
          : [
              "INITIALIZING SPATIAL ENVIRONMENT...",
              "LOADING ASSETS & ARCHITECTURE...",
              "CALIBRATING TELEMETRY NODES...",
              "READY // NAUFAL DWI SAPUTRO",
            ];

      const counterObj = { val: 0 };

      // Ambient rotation on the loader orbital ring
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // 1. Entrance of the Center Telemetry Emblem
      tl.fromTo(
        centerStageRef.current,
        { opacity: 0, scale: 0.92, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        0,
      );

      // 2. Smooth Non-Linear Counter (000 -> 100) & Laser Progress Line
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.35,
          ease: "power3.inOut",
          onUpdate: () => {
            const current = Math.round(counterObj.val);
            if (counterRef.current) {
              counterRef.current.textContent = String(current).padStart(3, "0");
            }
            if (statusTextRef.current) {
              const stageIdx = Math.min(
                Math.floor((current / 100) * statusMessages.length),
                statusMessages.length - 1,
              );
              statusTextRef.current.textContent = statusMessages[stageIdx];
            }
          },
        },
        0.1,
      );

      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.35,
          ease: "power3.inOut",
        },
        0.1,
      );

      // 3. Center Emblem Locks & Compacts Before Shutters Part Open
      tl.add(() => {
        setIsPointerHidden(true);
      }, 1.48);

      tl.to(
        centerStageRef.current,
        {
          scale: 0.88,
          opacity: 0,
          duration: 0.38,
          ease: "power3.in",
        },
        1.48,
      );

      tl.to(
        progressLineRef.current,
        {
          scaleY: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        1.55,
      );

      // 4. Hardware-Accelerated Dual Architectural Shutters Glide Open (Zero Blur / Zero Jank)
      tl.to(
        topShutterRef.current,
        {
          yPercent: -102,
          duration: 0.82,
          ease: "expo.inOut",
          force3D: true,
        },
        1.58,
      );

      tl.to(
        bottomShutterRef.current,
        {
          yPercent: 102,
          duration: 0.82,
          ease: "expo.inOut",
          force3D: true,
        },
        1.58,
      );
    },
    { scope: containerRef, dependencies: [language, onComplete] },
  );

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label={t.loader.ariaLabel}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none ${
        isPointerHidden ? "pointer-events-none" : "pointer-events-auto"
      }`}>
      {/* TOP ARCHITECTURAL SHUTTER PANEL */}
      <div
        ref={topShutterRef}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[50.5vh] bg-[#0b1012] border-b border-white/[0.06] will-change-transform">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(121, 198, 188, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(121, 198, 188, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Top Corner Telemetry Metadata */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#657178]">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#79c6bc] animate-pulse" />
            SYS.BOOT // NDS.PORTFOLIO
          </span>
          <span className="hidden sm:inline">SRAGEN · ID // 2026</span>
        </div>
      </div>

      {/* BOTTOM ARCHITECTURAL SHUTTER PANEL */}
      <div
        ref={bottomShutterRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[50.5vh] bg-[#0b1012] border-t border-white/[0.06] will-change-transform flex flex-col justify-end">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(121, 198, 188, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(121, 198, 188, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Bottom Corner Telemetry Metadata */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#657178]">
          <span ref={statusTextRef} className="text-[#79c6bc] truncate">
            {language === "id"
              ? "MENGINISIALISASI RUANG VISUAL..."
              : "INITIALIZING SPATIAL ENVIRONMENT..."}
          </span>
          <span className="shrink-0 ml-4">v2.6 // GSAP ENGINE</span>
        </div>
      </div>

      {/* CENTER SEAM LASER PROGRESS LINE */}
      <div
        ref={progressLineRef}
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] z-20 origin-left scale-x-0 will-change-transform"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #146b66 25%, #79c6bc 50%, #146b66 75%, transparent 100%)",
          boxShadow: "0 0 20px rgba(121, 198, 188, 0.55)",
        }}
      />

      {/* CENTER TELEMETRY EMBLEM & COUNTER */}
      <div
        ref={centerStageRef}
        aria-hidden="true"
        className="relative z-30 flex flex-col items-center justify-center will-change-transform">
        <div className="relative flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#0e1518]/90 border border-white/10 shadow-[0_0_60px_rgba(20,107,102,0.22)] backdrop-blur-md">
          {/* Rotating SVG Orbital Ring */}
          <svg
            ref={ringRef}
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(121, 198, 188, 0.2)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="#79c6bc"
              strokeWidth="1.5"
              strokeDasharray="28 18 6 18"
              strokeOpacity="0.65"
            />
            <circle cx="100" cy="10" r="3" fill="#79c6bc" />
            <circle cx="100" cy="190" r="3" fill="#79c6bc" />
          </svg>

          {/* Brand & Live Tabular Counter */}
          <div className="flex flex-col items-center text-center">
            <div className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#edf2f1] leading-none mb-1.5">
              NDS<span className="text-[#79c6bc]">.</span>
            </div>

            <div className="flex items-baseline gap-0.5 font-mono">
              <span
                ref={counterRef}
                className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-[#79c6bc]"
                style={{ fontVariantNumeric: "tabular-nums" }}>
                000
              </span>
              <span className="text-xs font-bold text-[#657178]">%</span>
            </div>

            <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#a0adad]">
              {language === "id" ? "ARSITEKTUR WEB" : "WEB ARCHITECTURE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
