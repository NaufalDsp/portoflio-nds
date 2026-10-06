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
          : { opacity: 0, scale: 1.02, filter: "blur(6px)" }
      }
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#111719]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, transparent 75%)",
        }}
      />

      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 12, scale: 0.96 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.15 : 0.5,
          ease: "easeOut",
        }}
        className="relative z-10 flex w-full max-w-xs flex-col items-center px-6 text-center"
        aria-hidden="true">
        <div className="mb-4 flex items-center text-4xl font-extrabold tracking-tight text-[#edf2f1]">
          <span>NDS</span>
          <span className="text-[#79c6bc]">.</span>
        </div>

        <p className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a0adad]">
          Full Stack Developer
        </p>

        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.15,
              duration: prefersReducedMotion ? 0.2 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full origin-left rounded-full bg-[#79c6bc]"
          />
        </div>

        <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#657178]">
          Initializing
        </span>
      </motion.div>
    </motion.div>
  );
}
