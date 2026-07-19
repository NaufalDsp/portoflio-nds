import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function CursorSpotlight() {
  const { isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 25 });
  const spotlightBackground = useMotionTemplate`radial-gradient(380px circle at ${smoothX}px ${smoothY}px, ${
    isDark ? "rgba(79,172,254,0.11)" : "rgba(79,172,254,0.13)"
  } 0%, ${
    isDark ? "rgba(168,85,247,0.055)" : "rgba(168,85,247,0.07)"
  } 42%, transparent 72%)`;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      opacity.set(1);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) opacity.set(0);
    };

    const handleWindowBlur = () => opacity.set(0);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [opacity, pointerX, pointerY, prefersReducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      style={{
        background: spotlightBackground,
        opacity,
      }}
    />
  );
}
