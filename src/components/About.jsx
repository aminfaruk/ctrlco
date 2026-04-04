import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Rise({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const stats = [
  { n: '1', label: 'Live Project' },
  { n: '100%', label: 'Satisfaction' },
]

export default function About() {
  return (
    <section id="about" className="relative py-44 px-6">

      {/* Soft ambient */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-[1360px] mx-auto">

        {/* Label */}
        <Rise>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-16" style={{ color: 'rgba(79,70,229,0.5)' }}>About</p>
        </Rise>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-20 lg:gap-32 items-end">

          {/* Headline + body */}
          <div>
            <Rise delay={0.05}>
              <h2
                className="text-gradient font-bold tracking-[-0.035em] leading-[1.06] mb-8"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)' }}
              >
                Built for those<br />who demand more.
              </h2>
            </Rise>

            <Rise delay={0.15}>
              <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'rgba(13,15,26,0.72)' }}>
                CTRL Solutions crafts high-performance digital products for brands that refuse to compromise. Precision engineering. Thoughtful design. Results that last.
              </p>
            </Rise>

            <Rise delay={0.25}>
              <motion.a
                href="#contact"
                className="btn-ghost inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] tracking-[0.12em] uppercase font-medium mt-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Work with us
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </Rise>
          </div>

          {/* Stats — stacked vertically on right */}
          <Rise delay={0.2} className="flex flex-row lg:flex-col gap-10 lg:gap-8 pb-2">
            {stats.map((s) => (
              <div key={s.n} className="flex flex-col gap-1">
                <span
                  className="text-accent font-bold tracking-tight leading-none"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
                >
                  {s.n}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(13,15,26,0.55)' }}>{s.label}</span>
              </div>
            ))}
          </Rise>
        </div>
      </div>
    </section>
  )
}
