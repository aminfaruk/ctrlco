import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   AMBIENT PARTICLES — sparse depth markers on dark void
───────────────────────────────────────────────────────────── */
function Particles() {
  const pts = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.2 + 0.3,
        dur: Math.random() * 14 + 10,
        delay: Math.random() * 10,
        op: Math.random() * 0.12 + 0.02,
        color: Math.random() > 0.6 ? 'var(--primary)' : 'var(--secondary)',
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.r,
            height: p.r,
            backgroundColor: p.color,
          }}
          animate={{ opacity: [p.op, p.op * 3, p.op] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CIRCUIT BOARD SVG BACKGROUND
   PCB traces, pads, and vias — pure code, no image
───────────────────────────────────────────────────────────── */
function CircuitBoard() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for traces */}
          <filter id="traceGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial mask to fade edges */}
          <radialGradient id="fadeMask" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="circuitMask">
            <rect width="1440" height="900" fill="url(#fadeMask)" />
          </mask>
        </defs>

        <g mask="url(#circuitMask)">
          {/* ── Horizontal traces ──────────────────── */}
          {/* Main bus lines */}
          <line x1="0" y1="180" x2="520" y2="180" stroke="rgba(129,236,255,0.07)" strokeWidth="1" />
          <line x1="580" y1="180" x2="1440" y2="180" stroke="rgba(129,236,255,0.05)" strokeWidth="1" />
          <line x1="0" y1="360" x2="380" y2="360" stroke="rgba(214,116,255,0.06)" strokeWidth="1" />
          <line x1="440" y1="360" x2="900" y2="360" stroke="rgba(129,236,255,0.05)" strokeWidth="1" />
          <line x1="960" y1="360" x2="1440" y2="360" stroke="rgba(214,116,255,0.04)" strokeWidth="1" />
          <line x1="200" y1="540" x2="1200" y2="540" stroke="rgba(129,236,255,0.04)" strokeWidth="1" />
          <line x1="0" y1="720" x2="640" y2="720" stroke="rgba(129,236,255,0.05)" strokeWidth="1" />
          <line x1="700" y1="720" x2="1440" y2="720" stroke="rgba(214,116,255,0.04)" strokeWidth="1" />

          {/* ── Vertical traces ────────────────────── */}
          <line x1="360" y1="0" x2="360" y2="400" stroke="rgba(129,236,255,0.06)" strokeWidth="1" />
          <line x1="360" y1="440" x2="360" y2="900" stroke="rgba(129,236,255,0.04)" strokeWidth="1" />
          <line x1="720" y1="0" x2="720" y2="320" stroke="rgba(214,116,255,0.05)" strokeWidth="1" />
          <line x1="720" y1="380" x2="720" y2="900" stroke="rgba(129,236,255,0.04)" strokeWidth="1" />
          <line x1="1080" y1="100" x2="1080" y2="600" stroke="rgba(129,236,255,0.05)" strokeWidth="1" />
          <line x1="1080" y1="660" x2="1080" y2="900" stroke="rgba(214,116,255,0.04)" strokeWidth="1" />
          <line x1="540" y1="0" x2="540" y2="900" stroke="rgba(129,236,255,0.03)" strokeWidth="1" />
          <line x1="900" y1="0" x2="900" y2="900" stroke="rgba(129,236,255,0.03)" strokeWidth="1" />

          {/* ── Routed signal traces (L-shapes, corners) ── */}
          {/* Trace 1 — top-left routing */}
          <polyline
            points="120,80 120,180 360,180"
            fill="none"
            stroke="rgba(129,236,255,0.12)"
            strokeWidth="1.5"
            filter="url(#traceGlow)"
          />
          {/* Trace 2 — diagonal route */}
          <polyline
            points="520,180 550,210 550,360 440,360"
            fill="none"
            stroke="rgba(129,236,255,0.1)"
            strokeWidth="1.5"
            filter="url(#traceGlow)"
          />
          {/* Trace 3 — right side routing */}
          <polyline
            points="1080,200 1080,360 960,360"
            fill="none"
            stroke="rgba(214,116,255,0.1)"
            strokeWidth="1.5"
            filter="url(#traceGlow)"
          />
          {/* Trace 4 — center down */}
          <polyline
            points="720,320 720,380 900,380 900,540"
            fill="none"
            stroke="rgba(129,236,255,0.08)"
            strokeWidth="1.5"
            filter="url(#traceGlow)"
          />
          {/* Trace 5 — bottom routing */}
          <polyline
            points="360,540 360,720 640,720"
            fill="none"
            stroke="rgba(129,236,255,0.09)"
            strokeWidth="1.5"
            filter="url(#traceGlow)"
          />
          {/* Trace 6 — far right */}
          <polyline
            points="1200,540 1200,720 1080,720 1080,660"
            fill="none"
            stroke="rgba(214,116,255,0.08)"
            strokeWidth="1.5"
            filter="url(#traceGlow)"
          />
          {/* Trace 7 — top right */}
          <polyline
            points="1300,80 1300,180 1080,180 1080,100"
            fill="none"
            stroke="rgba(129,236,255,0.07)"
            strokeWidth="1"
          />
          {/* Trace 8 — mid left */}
          <polyline
            points="60,440 200,440 200,540"
            fill="none"
            stroke="rgba(214,116,255,0.07)"
            strokeWidth="1"
          />

          {/* ── Via pads (connection points) ────── */}
          {[
            [360, 180, 5, 'rgba(129,236,255,0.25)'],
            [520, 180, 4, 'rgba(129,236,255,0.2)'],
            [720, 320, 5, 'rgba(214,116,255,0.22)'],
            [720, 380, 4, 'rgba(129,236,255,0.18)'],
            [1080, 360, 5, 'rgba(214,116,255,0.2)'],
            [960, 360, 4, 'rgba(129,236,255,0.18)'],
            [440, 360, 4, 'rgba(129,236,255,0.2)'],
            [360, 540, 4, 'rgba(129,236,255,0.18)'],
            [900, 540, 5, 'rgba(129,236,255,0.2)'],
            [640, 720, 4, 'rgba(129,236,255,0.18)'],
            [1080, 660, 4, 'rgba(214,116,255,0.18)'],
            [200, 540, 4, 'rgba(214,116,255,0.16)'],
            [1200, 540, 3, 'rgba(129,236,255,0.15)'],
            [120, 80, 3, 'rgba(129,236,255,0.2)'],
            [1300, 80, 3, 'rgba(129,236,255,0.15)'],
          ].map(([cx, cy, r, color], i) => (
            <g key={`via-${i}`}>
              {/* Outer ring */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth="1"
              />
              {/* Inner pad */}
              <circle
                cx={cx}
                cy={cy}
                r={r * 0.4}
                fill={color}
              />
            </g>
          ))}

          {/* ── IC chip outlines (rectangles) ───── */}
          {/* Chip 1 — top center area */}
          <rect
            x="680"
            y="140"
            width="80"
            height="40"
            rx="2"
            fill="rgba(129,236,255,0.03)"
            stroke="rgba(129,236,255,0.08)"
            strokeWidth="1"
          />
          {/* Chip pins */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`pin1-${i}`}
              x1={695 + i * 16}
              y1="140"
              x2={695 + i * 16}
              y2="130"
              stroke="rgba(129,236,255,0.1)"
              strokeWidth="1"
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`pin1b-${i}`}
              x1={695 + i * 16}
              y1="180"
              x2={695 + i * 16}
              y2="190"
              stroke="rgba(129,236,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Chip 2 — bottom left */}
          <rect
            x="280"
            y="680"
            width="60"
            height="30"
            rx="2"
            fill="rgba(214,116,255,0.02)"
            stroke="rgba(214,116,255,0.07)"
            strokeWidth="1"
          />

          {/* Chip 3 — right area */}
          <rect
            x="1040"
            y="480"
            width="80"
            height="40"
            rx="2"
            fill="rgba(129,236,255,0.02)"
            stroke="rgba(129,236,255,0.06)"
            strokeWidth="1"
          />

          {/* ── Accent energy nodes (glowing dots) ── */}
          {[
            [360, 180, 'var(--primary)'],
            [720, 320, 'var(--secondary)'],
            [1080, 360, 'var(--secondary)'],
            [900, 540, 'var(--primary)'],
          ].map(([cx, cy, color], i) => (
            <circle
              key={`glow-${i}`}
              cx={cx}
              cy={cy}
              r="8"
              fill={color}
              opacity="0.06"
              filter="url(#softGlow)"
            >
              <animate
                attributeName="opacity"
                values="0.04;0.1;0.04"
                dur={`${4 + i * 1.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LOGO — clean floating presentation with ambient glow
───────────────────────────────────────────────────────────── */
function LogoPresentation() {
  const SIZE = 380

  return (
    <div className="relative select-none" style={{ width: SIZE, height: SIZE }}>
      {/* Far bloom — cyan/purple ambient */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: '-45%',
          background:
            'radial-gradient(circle, rgba(129,236,255,0.1) 0%, rgba(214,116,255,0.05) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Near bloom */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-15%',
          background:
            'radial-gradient(circle, rgba(129,236,255,0.06) 0%, transparent 60%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Soft ground shadow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-2%',
          left: '18%',
          right: '18%',
          height: '50px',
          background:
            'radial-gradient(ellipse, rgba(129,236,255,0.05) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Logo — gentle float */}
      <motion.img
        src="/ctrl1.png"
        alt="CTRL Solutions"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 4px 30px rgba(129,236,255,0.15))',
          willChange: 'transform',
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        draggable={false}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION — asymmetric split layout
───────────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const heroOp = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base void */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, #141416 0%, #0e0e0f 55%, #0e0e0f 100%)',
          }}
        />

        {/* Perspective grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(129,236,255,0.6) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(129,236,255,0.6) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '90px 90px',
            maskImage:
              'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,0,0,0.5) 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,0,0,0.5) 30%, transparent 100%)',
          }}
        />

        {/* Bottom fade into surface */}
        <div
          className="absolute bottom-0 inset-x-0 h-48"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--surface))',
          }}
        />
      </div>

      <CircuitBoard />
      <Particles />

      {/* Main content — asymmetric split */}
      <motion.div
        style={{ y: heroY, opacity: heroOp }}
        className="relative z-10 w-full max-w-[1360px] mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-8 items-center pt-28 lg:pt-0"
      >
        {/* Left — text content */}
        <div className="flex flex-col">
          {/* Status terminal tag */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8"
          >
            <span
              className="text-label inline-flex items-center gap-2 px-3 py-1.5 rounded"
              style={{
                background: 'rgba(129, 236, 255, 0.06)',
                color: 'var(--primary)',
                border: '1px solid rgba(129, 236, 255, 0.1)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--primary)' }}
              />
              CTRL_ACTIVE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="text-display-lg mb-6"
            style={{ color: 'var(--on-surface)' }}
          >
            Take{' '}
            <span className="gradient-text">Control</span>.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="font-body text-base leading-relaxed mb-12 max-w-md"
            style={{ color: 'var(--on-surface-mid)' }}
          >
            Fast, refined digital products for brands that refuse to settle.
            Precision engineering meets thoughtful design.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href="#work"
              className="btn-primary text-label-md px-6 py-3 rounded"
              whileTap={{ scale: 0.97 }}
            >
              View Work
              <span className="btn-icon">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5v4.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-ghost text-label-md px-6 py-3 rounded"
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Right — logo cinematic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          <LogoPresentation />
        </motion.div>
      </motion.div>
    </section>
  )
}
