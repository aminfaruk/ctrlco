import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    num: '01',
    prefix: 'CTRL_DESIGN',
    title: 'Website Design',
    line: 'Interfaces crafted with precision. Every detail shaped to communicate and convert.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="1.5" y="2.5" width="15" height="11" rx="1.8" />
        <path d="M6 15.5h6M9 13.5v2" strokeLinecap="round" />
        <path d="M1.5 6.5h15" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    num: '02',
    prefix: 'CTRL_DEV',
    title: 'Website Development',
    line: 'Clean, scalable code on modern frameworks. Engineered to perform under pressure.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 4.5L2 9l4 4.5M12 4.5l4 4.5-4 4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 3l-4 12" strokeLinecap="round" strokeOpacity="0.45" />
      </svg>
    ),
  },
  {
    num: '03',
    prefix: 'CTRL_PERF',
    title: 'Performance Optimisation',
    line: 'Audited, optimised, rebuilt. Hitting elite Core Web Vitals because speed is revenue.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 1.5C5 1.5 1.5 5 1.5 9s3.5 7.5 7.5 7.5 7.5-3.5 7.5-7.5" strokeLinecap="round" />
        <path d="M9 5v4.5l2.5 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 1.5l2 2-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      </svg>
    ),
  },
  {
    num: '04',
    prefix: 'CTRL_MAINT',
    title: 'Maintenance & Support',
    line: 'Ongoing updates, security patches, and expert support. Your site, kept sharp.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 2a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 9 2z" strokeOpacity="0.4" />
        <path d="M6 9h6M9 6v6" strokeLinecap="round" />
        <path d="M13.5 2.5l2 1.5" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
    ),
  },
]

function ServiceRow({ service, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isLast = index === total - 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="group grid grid-cols-[28px_1fr] lg:grid-cols-[28px_1fr_auto] gap-x-6 lg:gap-x-10 gap-y-2 py-9 cursor-default"
        whileHover="hovered"
      >
        {/* Number */}
        <span
          className="text-label pt-0.5"
          style={{ color: 'var(--on-surface-dim)' }}
        >
          {service.num}
        </span>

        {/* Title + description */}
        <div className="flex flex-col gap-2">
          {/* Status terminal prefix */}
          <span
            className="text-label"
            style={{ color: 'var(--primary)', fontSize: '0.5625rem' }}
          >
            {service.prefix}
          </span>
          <motion.h3
            variants={{ hovered: { x: 4 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-display font-semibold tracking-tight text-xl transition-colors duration-300"
            style={{ color: 'var(--on-surface)' }}
          >
            {service.title}
          </motion.h3>
          <p
            className="font-body text-sm leading-relaxed max-w-xl"
            style={{ color: 'var(--on-surface-mid)' }}
          >
            {service.line}
          </p>
        </div>

        {/* Icon — desktop right */}
        <motion.div
          variants={{ hovered: { scale: 1.1, rotate: 5 } }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex w-9 h-9 rounded items-center justify-center self-center"
          style={{
            background: 'rgba(129, 236, 255, 0.06)',
            border: '1px solid rgba(129, 236, 255, 0.1)',
            color: 'var(--primary)',
          }}
        >
          {service.icon}
        </motion.div>
      </motion.div>

      {/* Tonal divider — no lines, gradient fade */}
      {!isLast && (
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 40%, transparent 80%)',
          }}
        />
      )}
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="relative py-44 px-6">
      {/* Surface — back to base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--surface)' }}
      />

      {/* Ambient */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(214,116,255,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto">
        {/* Header — asymmetric */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-label mb-5"
              style={{ color: 'var(--primary)', opacity: 0.5 }}
            >
              Services
            </p>
            <h2 className="text-display-md" style={{ color: 'var(--on-surface)' }}>
              Everything your
              <br />
              site needs to win.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-body text-base leading-relaxed lg:max-w-xs lg:ml-auto"
            style={{ color: 'var(--on-surface-dim)' }}
          >
            From first wireframe to final deploy. We handle the full stack.
          </motion.p>
        </div>

        {/* Service list — tonal top boundary */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {services.map((s, i) => (
            <ServiceRow
              key={s.num}
              service={s}
              index={i}
              total={services.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
