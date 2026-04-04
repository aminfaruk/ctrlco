import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import celestialBg from '../assets/bg-celestial.webp'

/* ─────────────────────────────────────────────────────────────
   AMBIENT PARTICLES
   Very sparse — 24 pts — so they register as depth, not clutter
───────────────────────────────────────────────────────────── */
function Particles() {
  const pts = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.1 + 0.3,
      dur: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      op: Math.random() * 0.14 + 0.03,
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r, height: p.r }}
          animate={{ opacity: [p.op, p.op * 3.5, p.op] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CINEMATIC LOGO BREAK-APART

   The logo PNG is divided into 3 clip-path layers:
     A  → Key face (top 43%)     lifts UP + slight left lean
     B  → Key body (43–72%)      shears horizontally
     C  → SOLUTIONS (72–100%)    sinks DOWN + right drift

   A "base" full image fades out as pieces diverge.
   Spring physics on every transform — no linear curves.
   Glow bloom amplifies during max-separation moment.
───────────────────────────────────────────────────────────── */
const SPRING = { stiffness: 52, damping: 20, mass: 1.1 }

function LogoCinematic({ scrollYProgress }) {
  // Master "spread" driver 0→1→0
  const rawSpread = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.32],
    [0,  1,    0.45, 0]
  )
  const spread = useSpring(rawSpread, SPRING)

  // ── Piece A (key face) ──────────────────────────────────
  const aY     = useTransform(spread, [0,1], [0, -52])
  const aX     = useTransform(spread, [0,1], [0, -10])
  const aRot   = useTransform(spread, [0,1], [0, -3.5])
  const aScale = useTransform(spread, [0,1], [1,  1.06])

  // ── Piece B (key body) ──────────────────────────────────
  const bX     = useTransform(spread, [0,1], [0,  22])
  const bY     = useTransform(spread, [0,1], [0,  14])
  const bRot   = useTransform(spread, [0,1], [0,  2.2])
  const bScale = useTransform(spread, [0,1], [1,  0.98])

  // ── Piece C (SOLUTIONS text) ────────────────────────────
  const cY     = useTransform(spread, [0,1], [0,  48])
  const cX     = useTransform(spread, [0,1], [0,  14])
  const cRot   = useTransform(spread, [0,1], [0,  2.8])
  const cScale = useTransform(spread, [0,1], [1,  0.92])

  // ── Opacities ───────────────────────────────────────────
  const baseOp  = useTransform(spread, [0, 0.3, 1], [1, 0,  0])
  const pieceOp = useTransform(spread, [0, 0.2, 1], [0, 1,  1])

  // Subtle second piece dimming to simulate depth recession
  const cOp = useTransform(spread, [0, 0.5, 1], [1, 0.75, 0.65])

  // ── Bloom glow ──────────────────────────────────────────
  const glowScale = useTransform(spread, [0, 0.6, 1], [1, 1.7, 1.4])
  const glowOp    = useTransform(spread, [0, 0.5, 1], [0.55, 1, 0.75])

  // ── Light streak during separation ──────────────────────
  const streakOp  = useTransform(spread, [0, 0.35, 0.65, 1], [0, 0.6, 0.6, 0])
  const streakScl = useTransform(spread, [0, 0.5, 1],        [0.5, 1, 0.8])

  const SIZE = 440

  return (
    <div
      className="relative select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* ── Far bloom — soft indigo on white ─────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: '-50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(14,165,233,0.04) 40%, transparent 70%)',
          filter: 'blur(52px)',
          scale: glowScale,
          opacity: glowOp,
        }}
      />

      {/* ── Near bloom ───────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-18%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 60%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ── Soft shadow beneath logo (depth/float) ───────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '2%',
          left: '15%',
          right: '15%',
          height: '60px',
          background: 'radial-gradient(ellipse, rgba(13,15,26,0.12) 0%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      {/* ── Light streak (fires mid-separation) ─────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '-20%',
          right: '-20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)',
          opacity: streakOp,
          scaleX: streakScl,
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '70%',
          left: '-15%',
          right: '-15%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.25), transparent)',
          opacity: streakOp,
          scaleX: streakScl,
        }}
      />

      {/* ═══════════════════════════════════════════════════
          BASE: full undivided logo
          Visible at rest, fades as pieces take over
      ═══════════════════════════════════════════════════ */}
      <motion.img
        src="/ctrl1.png"
        alt="CTRL Solutions"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ opacity: baseOp }}
        draggable={false}
      />

      {/* ═══════════════════════════════════════════════════
          PIECE A — key face (top 43%)
          Lifts up + tilts left — moves toward viewer
      ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: pieceOp, x: aX, y: aY, rotate: aRot, scale: aScale }}
      >
        <div style={{ width: '100%', height: '100%', clipPath: 'polygon(0 0, 100% 0, 100% 44%, 0 44%)' }}>
          <img
            src="/ctrl1.png"
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 -6px 28px rgba(100,98,255,0.35))' }}
            draggable={false}
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          PIECE B — key body / sides (44–72%)
          Shears right + down — the hinge point
      ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: pieceOp, x: bX, y: bY, rotate: bRot, scale: bScale }}
      >
        <div style={{ width: '100%', height: '100%', clipPath: 'polygon(0 43%, 100% 43%, 100% 73%, 0 73%)' }}>
          <img
            src="/ctrl1.png"
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(4px 2px 12px rgba(0,0,0,0.6))' }}
            draggable={false}
          />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          PIECE C — SOLUTIONS text (72–100%)
          Sinks down + drifts right — recedes into distance
      ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: useTransform(
          [pieceOp, cOp],
          ([p, c]) => p * c
        ), x: cX, y: cY, rotate: cRot, scale: cScale }}
      >
        <div style={{ width: '100%', height: '100%', clipPath: 'polygon(0 72%, 100% 72%, 100% 100%, 0 100%)' }}>
          <img
            src="/ctrl1.png"
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 6px 18px rgba(56,189,248,0.2)) brightness(0.85)' }}
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Whole-hero parallax fade
  const heroY   = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroOp  = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Celestial bg parallax — moves slower than content for depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* White base with a very subtle centre warm lift */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #ffffff 0%, #f4f5fb 55%, #f0f1f8 100%)',
          }}
        />

        {/* Celestial parallax layer */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ y: bgY }}
        >
          <img
            src={celestialBg}
            alt=""
            aria-hidden="true"
            className="absolute w-full h-[120%] object-cover object-center"
            style={{
              top: '-10%',
              opacity: 0.13,
              filter: 'blur(18px) saturate(1.4)',
              maskImage: 'radial-gradient(ellipse 75% 70% at 50% 40%, rgba(0,0,0,0.9) 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 40%, rgba(0,0,0,0.9) 0%, transparent 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        </motion.div>

        {/* Perspective grid — very faint on white */}
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(13,15,26,1) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(13,15,26,1) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '90px 90px',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,0,0,0.6) 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,0,0,0.6) 30%, transparent 100%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, #f8f9fc)' }}
        />
      </div>

      <Particles />

      {/* ── Main content ──────────────────────────────────── */}
      <motion.div
        style={{ y: heroY, opacity: heroOp }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-16"
      >

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-center gap-2.5 mb-14"
        >
          <span
            className="px-3 py-1 rounded-full text-[9px] tracking-[0.28em] uppercase font-semibold"
            style={{
              background: 'rgba(79,70,229,0.07)',
              border: '1px solid rgba(79,70,229,0.18)',
              color: 'rgba(79,70,229,0.75)',
            }}
          >
            Web Development Studio
          </span>
        </motion.div>

        {/* ── THE LOGO — product reveal entrance ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
          style={{ willChange: 'transform' }}
        >
          <LogoCinematic scrollYProgress={scrollYProgress} />
        </motion.div>

        {/* Headline — large, confident, minimal */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="text-gradient font-bold tracking-[-0.045em] leading-[1.0] mb-5"
          style={{
            fontSize: 'clamp(3rem, 8.5vw, 7rem)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Take Control.
        </motion.h1>

        {/* Sub — one line only */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="mb-12 max-w-[300px]"
          style={{
            color: 'rgba(13,15,26,0.4)',
            fontSize: '15px',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
          }}
        >
          Fast, refined digital products for brands that refuse to settle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.a
            href="#work"
            className="btn-primary text-[11px] tracking-[0.14em] uppercase font-semibold px-6 py-3 rounded-full"
            whileTap={{ scale: 0.97 }}
          >
            View Work
            <span className="btn-icon">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-ghost text-[11px] tracking-[0.14em] uppercase font-semibold px-6 py-3 rounded-full"
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span
            className="text-[8px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(13,15,26,0.22)' }}
          >
            Scroll
          </span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <rect x="4.5" y="3.5" width="3" height="4.5" rx="1.5" fill="rgba(13,15,26,0.3)" />
            <rect x="0.75" y="0.75" width="10.5" height="18.5" rx="5.25" stroke="rgba(13,15,26,0.15)" strokeWidth="1.2"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
