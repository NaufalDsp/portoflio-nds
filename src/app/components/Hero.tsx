import { ArrowRight, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { TechOrb } from './TechOrb';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export function Hero() {
  const { isDark } = useTheme();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: isDark
          ? '#0D0D12'
          : 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #f0f9ff 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large ambient glow top-left */}
        <div
          className="absolute"
          style={{
            width: 600,
            height: 600,
            top: -200,
            left: -200,
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(79,172,254,0.07) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(79,172,254,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Large ambient glow bottom-right */}
        <div
          className="absolute"
          style={{
            width: 700,
            height: 700,
            bottom: -250,
            right: -200,
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Subtle full-page grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          {/* ── Left: Text Content ── */}
          <div className="flex-1 max-w-xl lg:max-w-none">
            {/* Availability badge */}
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-8">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs"
                style={{
                  background: isDark ? 'rgba(79,172,254,0.08)' : 'rgba(79,172,254,0.08)',
                  borderColor: isDark ? 'rgba(79,172,254,0.2)' : 'rgba(79,172,254,0.25)',
                  color: '#4FACFE',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: '#4FACFE',
                    boxShadow: '0 0 8px #4FACFE',
                    animation: 'pulse 2s infinite',
                  }}
                />
                Available for work
              </div>
            </motion.div>

            {/* Main Name */}
            <motion.div {...fadeUp(0.2)}>
              <h1
                className="mb-2 leading-[1.05] tracking-tight"
                style={{
                  fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Naufal Dwi
              </h1>
              <h1
                className="leading-[1.05] tracking-tight"
                style={{
                  fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Saputro.
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.div {...fadeUp(0.32)} className="mt-5">
              <div className="flex items-center gap-3">
                <div
                  className="h-px flex-1 max-w-[40px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #A0A8C0)',
                  }}
                />
                <p
                  style={{
                    color: isDark ? '#A0A8C0' : '#6B7280',
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Web Developer
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp(0.44)}
              className="mt-7 max-w-md leading-relaxed"
              style={{
                color: isDark ? '#8890A8' : '#6B7280',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              }}
            >
              Building{' '}
              <span style={{ color: isDark ? '#C0C8E0' : '#374151', fontWeight: 500 }}>
                dynamic, responsive,
              </span>{' '}
              and{' '}
              <span style={{ color: isDark ? '#C0C8E0' : '#374151', fontWeight: 500 }}>
                user-centric
              </span>{' '}
              digital experiences that leave a lasting impression — from concept to deployment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.56)} className="flex flex-wrap items-center gap-4 mt-10">
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 8px 35px rgba(79,172,254,0.45)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('#projects')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #4FACFE 0%, #A855F7 100%)',
                  boxShadow: '0 4px 22px rgba(79,172,254,0.35)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                View Projects
                <ArrowRight size={17} />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl transition-all duration-300"
                style={{
                  border: `1.5px solid ${isDark ? 'rgba(160,168,192,0.3)' : 'rgba(107,114,128,0.3)'}`,
                  color: isDark ? '#A0A8C0' : '#6B7280',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <MessageSquare size={17} />
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div {...fadeUp(0.68)} className="flex items-center gap-4 mt-10">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: isDark ? '#4A5268' : '#9CA3AF', fontWeight: 600 }}
              >
                Follow me
              </span>
              <div
                className="h-px w-8"
                style={{ background: isDark ? 'rgba(74,82,104,0.6)' : 'rgba(156,163,175,0.6)' }}
              />
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300"
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      color: isDark ? '#7880A0' : '#9CA3AF',
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: TechOrb Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 hidden md:flex items-center justify-center"
          >
            <TechOrb />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: isDark ? '#4A5268' : '#9CA3AF', fontWeight: 500 }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{
              background: `linear-gradient(to bottom, ${isDark ? 'rgba(79,172,254,0.5)' : 'rgba(79,172,254,0.4)'}, transparent)`,
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
