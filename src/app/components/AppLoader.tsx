import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

interface AppLoaderProps {
  onComplete: () => void;
}

export function AppLoader({ onComplete }: AppLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const loaderDuration = prefersReducedMotion ? 350 : 1_400;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(onComplete, loaderDuration);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [loaderDuration, onComplete]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading Naufal Dwi Saputro portfolio"
      initial={{ opacity: 1 }}
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.035, filter: "blur(12px)" }
      }
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.48 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0D0D12]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at center, black 10%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 10%, transparent 72%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[18%] top-[16%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(79,172,254,0.11)" }}
      />
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -24, 0], y: [0, 22, 0], scale: [1, 0.94, 1] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[12%] right-[18%] h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(168,85,247,0.1)" }}
      />

      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 18, scale: 0.9 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.6, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-xs flex-col items-center px-6 text-center"
        aria-hidden="true">
        <div className="mb-5 flex items-center font-mono text-4xl font-bold tracking-tight sm:text-5xl">
          <motion.span
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="text-[#4FACFE]">
            &lt;
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
            className="mx-2"
            style={{
              background: "linear-gradient(135deg, #4FACFE, #A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 18px rgba(79,172,254,0.3))",
            }}>
            NDS
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="text-[#A855F7]">
            /&gt;
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.4 }}
          className="mb-7 text-[0.68rem] font-semibold uppercase text-[#7D849C]"
          style={{ letterSpacing: "0.24em" }}>
          Full Stack Developer
        </motion.p>

        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.2,
              duration: prefersReducedMotion ? 0.2 : 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full origin-left rounded-full"
            style={{
              background: "linear-gradient(90deg, #4FACFE, #A855F7)",
              boxShadow: "0 0 16px rgba(79,172,254,0.55)",
            }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-3 text-[0.58rem] font-medium uppercase text-[#50566A]"
          style={{ letterSpacing: "0.18em" }}>
          Loading portfolio
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
