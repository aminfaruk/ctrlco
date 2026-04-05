import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import celestialBg from '../assets/bg-celestial.webp'

const services = [
  {
    num: '01',
    title: 'Website Design',
    line: 'Interfaces crafted with precision. Every detail shaped to communicate and convert.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="1.5" y="2.5" width="15" height="11" rx="1.8"/>
        <path d="M6 15.5h6M9 13.5v2" strokeLinecap="round"/>
        <path d="M1.5 6.5h15" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Website Development',
    line: 'Clean, scalable code on modern frameworks. Engineered to perform under pressure.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 4.5L2 9l4 4.5M12 4.5l4 4.5-4 4.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 3l-4 12" strokeLinecap="round" strokeOpacity="0.45"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Performance Optimisation',
    line: 'Audited, optimised, rebuilt. Hitting elite Core Web Vitals because speed is revenue.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 1.5C5 1.5 1.5 5 1.5 9s3.5 7.5 7.5 7.5 7.5-3.5 7.5-7.5" strokeLinecap="round"/>
        <path d="M9 5v4.5l2.5 2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 1.5l2 2-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Maintenance & Support',
    line: 'Ongoing updates, security patches, and expert support. Your site, kept sharp.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 2a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 9 2z" strokeOpacity="0.4"/>
        <path d="M6 9h6M9 6v6" strokeLinecap="round"/>
        <path d="M13.5 2.5l2 1.5" strokeLinecap="round" strokeOpacity="0.5"/>
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
        <span className="text-[10px] tracking-[0.16em] font-medium pt-0.5" style={{ color: 'rgba(13,15,26,0.50)' }}>{service.num}</span>

        {/* Title + description */}
        <div className="flex flex-col gap-1.5">
          <motion.h3
            variants={{ hovered: { x: 4 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-semibold tracking-[-0.01em] text-xl transition-colors duration-300"
            style={{ color: 'rgba(13,15,26,0.85)' }}
          >
            {service.title}
          </motion.h3>
          <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(13,15,26,0.65)' }}>{service.line}</p>
        </div>

        {/* Icon — desktop right */}
        <motion.div
          variants={{ hovered: { scale: 1.1, rotate: 5 } }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex w-9 h-9 rounded-xl items-center justify-center text-indigo-600/50 self-center"
          style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.14)' }}
        >
          {service.icon}
        </motion.div>

        {/* Hover accent on number */}
        <motion.span
          variants={{ hovered: { color: 'rgba(130,120,255,0.7)' } }}
          className="col-start-1 row-start-1 text-[10px] tracking-[0.16em] font-medium pt-0.5"
          style={{ position: 'absolute', display: 'none' }}
        />
      </motion.div>

      {/* Divider — skip after last */}
      {!isLast && (
        <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(13,15,26,0.07) 0%, transparent 80%)' }} />
      )}
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="relative py-44 px-6">

      {/* Celestial ambient layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={celestialBg}
          alt=""
          aria-hidden="true"
          className="absolute w-[70%] object-cover object-center"
          style={{
            top: '10%',
            right: '-15%',
            opacity: 0.07,
            filter: 'blur(32px) saturate(1.2)',
            maskImage: 'radial-gradient(ellipse 60% 60% at 60% 50%, rgba(0,0,0,0.85) 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 60% 50%, rgba(0,0,0,0.85) 0%, transparent 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-indigo-600/45 mb-5">Services</p>
            <h2
              className="text-gradient font-bold tracking-[-0.035em] leading-[1.06]"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)' }}
            >
              Everything your<br />site needs to win.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-base leading-relaxed lg:max-w-xs lg:ml-auto" style={{ color: 'rgba(13,15,26,0.58)' }}
          >
            From first wireframe to final deploy. We handle the full stack.
          </motion.p>
        </div>

        {/* Service list */}
        <div className="border-t border-black/[0.07]">
          {services.map((s, i) => (
            <ServiceRow key={s.num} service={s} index={i} total={services.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
