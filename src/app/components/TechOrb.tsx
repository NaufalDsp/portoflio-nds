import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const particles = [
  { x: -178, y: -60, size: 6, delay: 0, color: '#4FACFE' },
  { x: 160, y: -110, size: 4, delay: 0.6, color: '#A855F7' },
  { x: 195, y: 55, size: 7, delay: 1.1, color: '#4FACFE' },
  { x: -160, y: 90, size: 4, delay: 1.7, color: '#A855F7' },
  { x: 10, y: -190, size: 5, delay: 0.3, color: '#A855F7' },
  { x: -40, y: 175, size: 5, delay: 0.9, color: '#4FACFE' },
  { x: 120, y: 155, size: 3, delay: 1.4, color: '#4FACFE' },
  { x: -130, y: -150, size: 3, delay: 0.5, color: '#A855F7' },
];

const codeSymbols = [
  { text: '</', x: -205, y: -70, delay: 0, color: '#4FACFE' },
  { text: '/>', x: 185, y: -55, delay: 0.4, color: '#A855F7' },
  { text: '{}', x: -115, y: 168, delay: 0.8, color: '#A855F7' },
  { text: '=>', x: 105, y: 168, delay: 1.2, color: '#4FACFE' },
  { text: '[]', x: 210, y: 85, delay: 0.6, color: '#4FACFE' },
  { text: '( )', x: -215, y: 75, delay: 1.0, color: '#A855F7' },
  { text: '//~', x: 40, y: -205, delay: 0.2, color: '#A855F7' },
  { text: ';', x: -65, y: -200, delay: 1.5, color: '#4FACFE' },
];

export function TechOrb() {
  const { isDark } = useTheme();

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 460, height: 460, perspective: '900px' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(79,172,254,0.12) 0%, rgba(168,85,247,0.08) 45%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(79,172,254,0.18) 0%, rgba(168,85,247,0.12) 45%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Tech dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(79,172,254,0.35)' : 'rgba(79,172,254,0.5)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(circle at center, white 35%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at center, white 35%, transparent 72%)',
        }}
      />

      {/* Ring 1 — main horizontal orbit */}
      <motion.div
        className="absolute"
        style={{
          width: 390,
          height: 390,
          borderRadius: '50%',
          border: '1px solid rgba(79,172,254,0.28)',
          rotateX: '72deg',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            top: -5,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#4FACFE',
            boxShadow: '0 0 12px #4FACFE, 0 0 24px rgba(79,172,254,0.6)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            bottom: -3,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(79,172,254,0.5)',
            boxShadow: '0 0 8px rgba(79,172,254,0.5)',
          }}
        />
      </motion.div>

      {/* Ring 2 — tilted purple orbit */}
      <motion.div
        className="absolute"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.28)',
          rotateX: '65deg',
          rotateZ: '50deg',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            top: -4,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#A855F7',
            boxShadow: '0 0 10px #A855F7, 0 0 20px rgba(168,85,247,0.6)',
          }}
        />
      </motion.div>

      {/* Ring 3 — shallow outer orbit */}
      <motion.div
        className="absolute"
        style={{
          width: 440,
          height: 440,
          borderRadius: '50%',
          border: '1px solid rgba(79,172,254,0.10)',
          rotateX: '80deg',
          rotateZ: '20deg',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 5,
            height: 5,
            top: -2.5,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(79,172,254,0.7)',
            boxShadow: '0 0 8px rgba(79,172,254,0.5)',
          }}
        />
      </motion.div>

      {/* Ring 4 — inner equatorial ring */}
      <motion.div
        className="absolute"
        style={{
          width: 245,
          height: 245,
          borderRadius: '50%',
          border: '1px dashed rgba(168,85,247,0.18)',
          rotateX: '75deg',
          rotateZ: '-30deg',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main Sphere */}
      <motion.div
        className="relative rounded-full z-10"
        style={{
          width: 180,
          height: 180,
          background:
            'radial-gradient(circle at 34% 30%, rgba(79,172,254,0.85) 0%, rgba(79,172,254,0.35) 35%, rgba(13,13,24,0.97) 65%)',
          boxShadow:
            '0 0 45px rgba(79,172,254,0.45), 0 0 90px rgba(79,172,254,0.22), 0 0 130px rgba(168,85,247,0.18), inset 0 0 35px rgba(0,0,0,0.6)',
        }}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Sphere specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: 55,
            height: 35,
            top: 22,
            left: 26,
            background: 'rgba(255,255,255,0.18)',
            filter: 'blur(7px)',
            transform: 'rotate(-20deg)',
          }}
        />
        {/* Sphere inner purple tint */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 68% 68%, rgba(168,85,247,0.35) 0%, transparent 55%)',
          }}
        />
        {/* Subtle grid on sphere */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(50% + ${p.x}px - ${p.size / 2}px)`,
            top: `calc(50% + ${p.y}px - ${p.size / 2}px)`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2.5}px ${p.color}, 0 0 ${p.size * 5}px ${p.color}55`,
          }}
          animate={{
            y: [0, -14, 0, 14, 0],
            opacity: [0.55, 1, 0.55, 1, 0.55],
            scale: [1, 1.25, 1, 1.25, 1],
          }}
          transition={{ duration: 3.5 + p.delay * 0.5, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating Code Symbols */}
      {codeSymbols.map((sym, i) => (
        <motion.div
          key={`sym-${i}`}
          className="absolute pointer-events-none font-mono text-xs"
          style={{
            left: `calc(50% + ${sym.x}px)`,
            top: `calc(50% + ${sym.y}px)`,
            color: sym.color,
            textShadow: `0 0 12px ${sym.color}`,
            opacity: 0.7,
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
          animate={{
            y: [0, -10, 0, 10, 0],
            opacity: [0.5, 0.85, 0.5, 0.85, 0.5],
          }}
          transition={{ duration: 4.5 + sym.delay * 0.3, repeat: Infinity, delay: sym.delay, ease: 'easeInOut' }}
        >
          {sym.text}
        </motion.div>
      ))}
    </div>
  );
}
