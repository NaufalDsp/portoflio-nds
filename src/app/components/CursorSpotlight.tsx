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
  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${smoothX}px ${smoothY}px, ${
    isDark ? "rgba(121, 198, 188, 0.05)" : "rgba(20, 107, 102, 0.035)"
  } 0%, transparent 70%)`;

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
