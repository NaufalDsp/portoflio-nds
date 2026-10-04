import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const CODE_SNIPPET = `// developer.config.ts
export const engineer = {
  name: "Naufal Dwi Saputro",
  role: "Full Stack Developer",
  location: "Surakarta, Indonesia",
  education: {
    institution: "Universitas Sebelas Maret",
    degree: "Diploma in Informatics Engineering",
    gpa: "3.91 / 4.00",
  },
  stack: {
    frontend: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
    backend: ["Laravel", "REST APIs", "MySQL", "Inertia.js"],
  },
  principles: ["Clean Architecture", "Type Safety", "Accessible UI"],
  status: "available_for_hire",
};`;

export function HeroCodeCard() {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access not available
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg overflow-hidden rounded-xl border text-xs shadow-xl"
      style={{
        background: isDark ? "var(--portfolio-surface)" : "#ffffff",
        borderColor: "var(--portfolio-border)",
        boxShadow: isDark
          ? "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
          : "0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)",
      }}>
      {/* Window Titlebar */}
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{
          background: isDark
            ? "rgba(0, 0, 0, 0.2)"
            : "var(--portfolio-surface-raised)",
          borderColor: "var(--portfolio-border)",
        }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span
            className="ml-2 font-mono text-[11px] font-medium"
            style={{ color: "var(--portfolio-muted)" }}>
            developer.config.ts
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            verified
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy config snippet"
            className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: "var(--portfolio-muted)" }}>
            {copied ? (
              <Check size={13} className="text-emerald-500" />
            ) : (
              <Copy size={13} />
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div
        className="p-5 font-mono text-[12px] leading-relaxed overflow-x-auto"
        style={{ color: isDark ? "#d5dedf" : "#2d3748" }}>
        <div className="space-y-1">
          <div style={{ color: "var(--portfolio-muted)" }}>
            <span className="italic">// developer.config.ts</span>
          </div>

          <div>
            <span className="text-sky-600 dark:text-sky-400 font-semibold">
              export const{" "}
            </span>
            <span className="text-emerald-600 dark:text-teal-300 font-semibold">
              engineer
            </span>
            <span> = {"{"}</span>
          </div>

          <div className="pl-4">
            <span className="text-slate-500 dark:text-slate-400">name: </span>
            <span className="text-amber-700 dark:text-amber-300">
              &quot;Naufal Dwi Saputro&quot;
            </span>
            ,
          </div>

          <div className="pl-4">
            <span className="text-slate-500 dark:text-slate-400">role: </span>
            <span className="text-amber-700 dark:text-amber-300">
              &quot;Full Stack Developer&quot;
            </span>
            ,
          </div>

          <div className="pl-4">
            <span className="text-slate-500 dark:text-slate-400">
              location:{" "}
            </span>
            <span className="text-amber-700 dark:text-amber-300">
              &quot;Surakarta, Indonesia&quot;
            </span>
            ,
          </div>

          <div className="pl-4">
            <span className="text-slate-500 dark:text-slate-400">
              education:{" "}
            </span>
            <span>{"{"}</span>
            <div className="pl-4">
              <span className="text-slate-500 dark:text-slate-400">
                institution:{" "}
              </span>
              <span className="text-amber-700 dark:text-amber-300">
                &quot;Universitas Sebelas Maret&quot;
              </span>
              ,
            </div>
            <div className="pl-4">
              <span className="text-slate-500 dark:text-slate-400">
                degree:{" "}
              </span>
              <span className="text-amber-700 dark:text-amber-300">
                &quot;D3 Informatics Engineering&quot;
              </span>
              ,
            </div>
            <div className="pl-4">
              <span className="text-slate-500 dark:text-slate-400">gpa: </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                &quot;3.91 / 4.00&quot;
              </span>
              ,
            </div>
            <span>{"}"}</span>,
          </div>

          <div className="pl-4">
            <span className="text-slate-500 dark:text-slate-400">stack: </span>
            <span>{"{"}</span>
            <div className="pl-4">
              <span className="text-slate-500 dark:text-slate-400">
                frontend:{" "}
              </span>
              <span>[</span>
              <span className="text-teal-600 dark:text-teal-300">
                &quot;React&quot;
              </span>
              ,{" "}
              <span className="text-teal-600 dark:text-teal-300">
                &quot;Vue.js&quot;
              </span>
              ,{" "}
              <span className="text-teal-600 dark:text-teal-300">
                &quot;TypeScript&quot;
              </span>
              <span>]</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-500 dark:text-slate-400">
                backend:{" "}
              </span>
              <span>[</span>
              <span className="text-teal-600 dark:text-teal-300">
                &quot;Laravel&quot;
              </span>
              ,{" "}
              <span className="text-teal-600 dark:text-teal-300">
                &quot;REST APIs&quot;
              </span>
              ,{" "}
              <span className="text-teal-600 dark:text-teal-300">
                &quot;MySQL&quot;
              </span>
              <span>]</span>,
            </div>
            <span>{"}"}</span>,
          </div>

          <div className="pl-4">
            <span className="text-slate-500 dark:text-slate-400">status: </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              &quot;available_for_hire&quot;
            </span>
            ,
          </div>

          <div>{"};"}</div>
        </div>
      </div>

      {/* Terminal Footer Bar */}
      <div
        className="flex items-center justify-between border-t px-4 py-2.5 text-[11px]"
        style={{
          background: isDark
            ? "rgba(0, 0, 0, 0.2)"
            : "var(--portfolio-surface-raised)",
          borderColor: "var(--portfolio-border)",
          color: "var(--portfolio-muted)",
        }}>
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-teal-600 dark:text-teal-400" />
          <span>UTF-8</span>
          <span>·</span>
          <span>TypeScript</span>
        </div>
        <span className="font-mono text-[10px]">Strict Mode: Enabled</span>
      </div>
    </motion.div>
  );
}
