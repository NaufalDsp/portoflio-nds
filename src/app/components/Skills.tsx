import { motion } from 'motion/react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiVuedotjs,
  SiNodedotjs, SiPython, SiLaravel, SiMysql,
  SiPostgresql, SiMongodb, SiDocker, SiGit, SiFigma,
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

/* ─────────────────────────────────────────────────────────────
   Tech Stack Data  — brand icon + brand colour
───────────────────────────────────────────────────────────── */
const techStack = [
  { name: 'React',      Icon: SiReact,      color: '#61DAFB' },
  { name: 'Next.js',    Icon: SiNextdotjs,  color: '#E8EAF0' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Vue',        Icon: SiVuedotjs,   color: '#4FC08D' },
  { name: 'Node.js',    Icon: SiNodedotjs,  color: '#339933' },
  { name: 'Python',     Icon: SiPython,     color: '#3776AB' },
  { name: 'Laravel',    Icon: SiLaravel,    color: '#FF2D20' },
  { name: 'MySQL',      Icon: SiMysql,      color: '#4479A1' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
  { name: 'Docker',     Icon: SiDocker,     color: '#2496ED' },
  { name: 'Git',        Icon: SiGit,        color: '#F05032' },
  { name: 'Figma',      Icon: SiFigma,      color: '#F24E1E' },
];

/* ─────────────────────────────────────────────────────────────
   Aurora Mesh Background
   Four large blobs in portfolio accent colours that drift slowly
───────────────────────────────────────────────────────────── */
const blobs = [
  {
    color: 'rgba(79,172,254,0.28)',
    size: 720,
    top: '-18%', left: '-12%',
    anim: { x: [0, 80, -30, 0], y: [0, -50, 60, 0], scale: [1, 1.12, 0.92, 1] },
    dur: 28,
  },
  {
    color: 'rgba(168,85,247,0.25)',
    size: 680,
    top: '20%', right: '-15%',
    anim: { x: [0, -70, 40, 0], y: [0, 60, -40, 0], scale: [1, 0.9, 1.15, 1] },
    dur: 34,
  },
  {
    color: 'rgba(52,211,153,0.20)',
    size: 560,
    bottom: '-20%', left: '20%',
    anim: { x: [0, 50, -60, 0], y: [0, -70, 30, 0], scale: [1, 1.1, 0.88, 1] },
    dur: 40,
  },
  {
    color: 'rgba(6,182,212,0.18)',
    size: 500,
    top: '40%', left: '40%',
    anim: { x: [0, -40, 70, 0], y: [0, 50, -60, 0], scale: [1, 1.08, 0.94, 1] },
    dur: 32,
  },
];

function AuroraBg() {
  const { isDark } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Animated aurora blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={b.anim}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            filter: 'blur(72px)',
            top: (b as any).top,
            left: (b as any).left,
            right: (b as any).right,
            bottom: (b as any).bottom,
          }}
        />
      ))}

      {/* Dot grid texture */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="skill-dotgrid" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle
              cx="1.5" cy="1.5" r="1.5"
              fill={isDark ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.045)'}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skill-dotgrid)" />
      </svg>

      {/* Diagonal light streaks */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: isDark ? 0.06 : 0.04 }}
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={`${-20 + i * 28}%`} y1="0%"
            x2={`${20 + i * 28}%`} y2="100%"
            stroke={isDark ? 'white' : '#6366f1'}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Readability scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'rgba(13,13,18,0.72)'
            : 'rgba(248,250,255,0.78)',
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(13,13,18,0.55) 100%)'
            : 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(248,250,255,0.55) 100%)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Tech Card  — glassmorphism, brand icon, glow on hover
───────────────────────────────────────────────────────────── */
function TechCard({
  tech,
  index,
}: {
  tech: (typeof techStack)[0];
  index: number;
}) {
  const { isDark } = useTheme();
  const { Icon, name, color } = tech;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, scale: 1.07, transition: { duration: 0.22 } }}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl border cursor-default relative overflow-hidden"
      style={{
        aspectRatio: '1 / 1',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: isDark
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.65)',
        borderColor: isDark
          ? 'rgba(255,255,255,0.09)'
          : 'rgba(0,0,0,0.08)',
        boxShadow: isDark
          ? '0 4px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)'
          : '0 4px 28px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)',
        padding: '14px 8px',
      }}
    >
      {/* Glow blob behind icon — appears on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${color}22 0%, transparent 70%)`,
        }}
      />

      {/* Brand icon */}
      <Icon
        size={34}
        style={{
          color: color,
          filter: `drop-shadow(0 0 8px ${color}66)`,
          flexShrink: 0,
          transition: 'filter 0.3s',
        }}
        className="group-hover:drop-shadow-[0_0_14px_var(--icon-glow)] relative z-10"
      />

      {/* Name */}
      <span
        className="relative z-10 text-center leading-tight"
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: isDark ? '#C8D0E8' : '#374151',
          letterSpacing: '0.01em',
        }}
      >
        {name}
      </span>

      {/* Bottom colour accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export function Skills() {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      className="relative py-28 overflow-hidden"
      style={{ background: isDark ? '#0D0D12' : '#F8FAFF' }}
    >
      {/* ══ Aurora mesh background ══ */}
      <AuroraBg />

      {/* ══ Content ══ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: '#A855F7', fontWeight: 700, letterSpacing: '0.12em' }}
          >
            My Expertise
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: isDark ? '#E8EAF0' : '#1F2937',
              letterSpacing: '-0.02em',
            }}
          >
            Skills &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A855F7 0%, #4FACFE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Technologies
            </span>
          </h2>
          <p
            style={{
              color: isDark ? '#6B7080' : '#6B7280',
              maxWidth: 460,
              margin: '0 auto',
              fontSize: '0.95rem',
            }}
          >
            A comprehensive stack refined through years of hands-on experience
            building production applications.
          </p>
        </motion.div>

        {/* Divider with label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 mb-10"
        >
          <div
            className="h-px flex-1"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10))'
                : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.10))',
            }}
          />
          <span
            className="text-[10px] tracking-widest uppercase"
            style={{ color: isDark ? '#4A5268' : '#9CA3AF', fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            Tech Stack
          </span>
          <div
            className="h-px flex-1"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, rgba(255,255,255,0.10), transparent)'
                : 'linear-gradient(90deg, rgba(0,0,0,0.10), transparent)',
            }}
          />
        </motion.div>

        {/* Tech Icon Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))' }}
        >
          {techStack.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Count badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)',
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'linear-gradient(135deg,#A855F7,#4FACFE)',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(168,85,247,0.8)',
              }}
            />
            <span style={{ fontSize: '0.78rem', color: isDark ? '#6B7080' : '#9CA3AF', fontWeight: 500 }}>
              {techStack.length} technologies & counting
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
