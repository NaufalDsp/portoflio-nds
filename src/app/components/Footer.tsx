import { useTheme } from "../context/ThemeContext";
import { NAVIGATION_LINKS } from "../data/navigation";
import { scrollToSection } from "../utils/scrollToSection";

export function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className="relative py-10 border-t"
      style={{
        background: isDark ? "#0D0D12" : "#F0F4FF",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <span
            className="text-xl tracking-tight select-none"
            style={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            NDS
          </span>

          {/* Copyright */}
          <p
            className="flex items-center gap-1.5 text-sm"
            style={{ color: isDark ? "#4A5268" : "#9CA3AF" }}>
            © 2026 Naufal Dwi Saputro
          </p>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-xs transition-colors duration-200"
                style={{
                  color: isDark ? "#4A5268" : "#9CA3AF",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
