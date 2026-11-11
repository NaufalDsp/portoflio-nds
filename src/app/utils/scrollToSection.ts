export function scrollToSection(href: `#${string}`) {
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(href);
  if (!el) return;
  const target = el.closest(".pin-spacer") ?? el;
  target.scrollIntoView({ behavior: "smooth" });
}
