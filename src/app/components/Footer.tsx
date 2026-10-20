import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getNavigationLinks } from "../data/navigation";
import { scrollToSection } from "../utils/scrollToSection";

export function Footer() {
  useTheme();
  const { language, t } = useLanguage();
  const navigationLinks = getNavigationLinks(language);

  return (
    <footer
      className="relative py-12 border-t"
      style={{
        background: "var(--background)",
        borderColor: "var(--portfolio-border)",
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-baseline gap-3">
            <span
              className="text-lg tracking-tight select-none font-extrabold"
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
          </div>

          {/* Copyright */}
          <p
            className="text-xs font-mono text-center sm:text-left"
            style={{ color: "var(--portfolio-muted)" }}>
            © {new Date().getFullYear()} Naufal Dwi Saputro. {t.footer.rights}
          </p>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navigationLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xs font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                style={{
                  color: "var(--portfolio-muted)",
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
