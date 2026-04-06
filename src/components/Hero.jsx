import ctrl1 from '/ctrl1.png'

/* ─────────────────────────────────────────────────────────────
   LOGO — clean static presentation with ambient glow
───────────────────────────────────────────────────────────── */
function LogoPresentation() {
  const SIZE = 380

  return (
    <div className="relative select-none" style={{ width: SIZE, height: SIZE }}>
      {/* Far bloom — cyan/purple ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-45%',
          background:
            'radial-gradient(circle, rgba(129,236,255,0.1) 0%, rgba(214,116,255,0.05) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
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

      {/* Logo — static */}
      <img
        src="/ctrl1.png"
        alt="CTRL Solutions"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 4px 30px rgba(129,236,255,0.15))',
        }}
        draggable={false}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION — clean, minimal
───────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="hero"
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

      {/* Main content — asymmetric split */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-8 items-center pt-28 lg:pt-0">
        {/* Left — text content */}
        <div className="flex flex-col">
          {/* Status terminal tag */}
          <div className="mb-8">
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
          </div>

          {/* Headline */}
          <h1
            className="text-display-lg mb-6"
            style={{ color: 'var(--on-surface)' }}
          >
            Take{' '}
            <span className="gradient-text">Control</span>.
          </h1>

          {/* Sub */}
          <p
            className="font-body text-base leading-relaxed mb-12 max-w-md"
            style={{ color: 'var(--on-surface-mid)' }}
          >
            Fast, refined digital products for brands that refuse to settle.
            Precision engineering meets thoughtful design.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="btn-primary text-label-md px-6 py-3 rounded"
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
            </a>
            <a
              href="#contact"
              className="btn-ghost text-label-md px-6 py-3 rounded"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right — logo */}
        <div className="flex items-center justify-center">
          <LogoPresentation />
        </div>
      </div>
    </section>
  )
}
