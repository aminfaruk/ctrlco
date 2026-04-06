import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import agileabilityImg from '../assets/agileability.png'
import gba5Img from '../assets/gba5.png'

const liveProjects = [
  {
    id: '01',
    title: 'agileability.com.au',
    category: 'Design & Development',
    year: '2025',
    tags: ['React', 'Tailwind', 'Accessibility'],
    accent: [129, 236, 255],
    desc: 'NDIS provider website, modern and accessible design built to connect people with the support they need.',
    href: 'https://www.agileability.com.au',
    image: agileabilityImg,
    logoBg: true,
  },
  {
    id: '02',
    title: 'gba5.team',
    category: 'Design & Development',
    year: '2025',
    tags: ['React', 'Tailwind', 'Sports'],
    accent: [16, 185, 129],
    desc: 'Modern sports platform for the GBA5 basketball association. Schedules, standings, and team pages.',
    href: 'https://gba5.team',
    image: gba5Img,
  },
]

const inProgressProjects = [
  {
    id: '03',
    title: 'Coming Soon',
    category: 'Next Project',
    year: '2025',
    tags: ['TBD'],
    accent: [214, 116, 255],
    desc: 'Something new is in the works. Check back soon.',
    href: null,
  },
]

/* ─────────────────────────────────────────────────────────────
   PARALLAX IMAGE — slow scroll offset on screenshots
───────────────────────────────────────────────────────────── */
function ParallaxImage({ src, alt }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[130%] object-cover object-top transition-transform duration-700 group-hover:scale-[1.08]"
        style={{ y, top: '-15%' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD — with hover overlay reveal
───────────────────────────────────────────────────────────── */
function Card({ project, index, tall = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [r, g, b] = project.accent
  const Tag = project.href ? motion.a : motion.div
  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const imageHeight = 'h-[220px]'

  return (
    <Tag
      {...linkProps}
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-lg overflow-hidden cursor-pointer block"
      style={{
        background: 'var(--surface-container)',
        textDecoration: 'none',
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Top accent gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.7), transparent)`,
        }}
      />

      {/* Visual area */}
      <div className={`relative ${imageHeight} flex items-center justify-center overflow-hidden`}>
        {project.image ? (
          <>
            {/* Ambient background glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, rgba(${r},${g},${b},0.1) 0%, transparent 65%)`,
              }}
            />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: [
                  `linear-gradient(rgba(${r},${g},${b},0.8) 1px, transparent 1px)`,
                  `linear-gradient(90deg, rgba(${r},${g},${b},0.8) 1px, transparent 1px)`,
                ].join(','),
                backgroundSize: '32px 32px',
              }}
            />

            {/* Centered logo */}
            {project.logoBg ? (
              <div
                className="relative z-[1] w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex items-center justify-center p-5 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: '#111111',
                  boxShadow: `0 4px 20px rgba(${r},${g},${b},0.25)`,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <motion.img
                src={project.image}
                alt={project.title}
                className="relative z-[1] w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-xl transition-transform duration-500 group-hover:scale-110"
                style={{
                  filter: `drop-shadow(0 4px 20px rgba(${r},${g},${b},0.25))`,
                }}
              />
            )}

            {/* Hover reveal overlay — "View Project" */}
            <div className="absolute inset-0 z-[2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(14,14,15,0.5)' }}
              />
              <motion.div
                className="relative flex items-center gap-2.5 px-5 py-2.5 rounded"
                style={{
                  background: `rgba(${r},${g},${b},0.12)`,
                  border: `1px solid rgba(${r},${g},${b},0.35)`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <span
                  className="font-display text-xs font-semibold tracking-wide uppercase"
                  style={{ color: `rgb(${r},${g},${b})` }}
                >
                  View Project
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5v5"
                    stroke={`rgb(${r},${g},${b})`}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, rgba(${r},${g},${b},0.08) 0%, transparent 65%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: [
                  `linear-gradient(rgba(${r},${g},${b},0.8) 1px, transparent 1px)`,
                  `linear-gradient(90deg, rgba(${r},${g},${b},0.8) 1px, transparent 1px)`,
                ].join(','),
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-lg font-display font-bold"
                style={{
                  background: `rgba(${r},${g},${b},0.1)`,
                  border: `1px solid rgba(${r},${g},${b},0.2)`,
                  color: `rgba(${r},${g},${b},1)`,
                }}
              >
                {project.id}
              </div>
              <span
                className="text-label"
                style={{ color: `rgba(${r},${g},${b},0.55)` }}
              >
                Case Study
              </span>
            </div>
          </>
        )}
      </div>

      {/* Meta — tonal shift */}
      <div className="p-6" style={{ background: 'var(--surface-low)' }}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3
              className="font-body text-[15px] tracking-tight mb-0.5"
              style={{ color: `rgb(${r},${g},${b})` }}
            >
              <span className="font-bold">{project.title.split('.')[0]}</span>
              <span className="font-normal" style={{ color: 'var(--on-surface-dim)' }}>.{project.title.split('.').slice(1).join('.')}</span>
            </h3>
            <p
              className="text-label"
              style={{ color: 'var(--on-surface-dim)' }}
            >
              {project.category}
            </p>
          </div>
          <span
            className="text-label shrink-0 pt-0.5"
            style={{ color: 'var(--on-surface-dim)' }}
          >
            {project.year}
          </span>
        </div>

        <p
          className="font-body text-xs leading-relaxed mb-4"
          style={{ color: 'var(--on-surface-mid)' }}
        >
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="chip-cyan"
              style={{
                background: `rgba(${r},${g},${b},0.08)`,
                color: `rgba(${r},${g},${b},0.8)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  )
}

/* ─────────────────────────────────────────────────────────────
   WORK SECTION
───────────────────────────────────────────────────────────── */
export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" ref={ref} className="relative py-44 px-6">
      {/* Tonal transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--surface-low)' }}
      />

      <div className="relative max-w-[1360px] mx-auto">
        {/* Header — with decorative background number */}
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          {/* Large faint background number — fills dead space left of heading */}
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-4 -top-16 font-display font-bold pointer-events-none select-none hidden lg:block"
            style={{
              fontSize: 'clamp(10rem, 18vw, 16rem)',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(129, 236, 255, 0.06)',
              letterSpacing: '-0.04em',
            }}
            aria-hidden="true"
          >
            W.
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <p
              className="text-label mb-5"
              style={{ color: 'var(--primary)', opacity: 0.5 }}
            >
              Work
            </p>
            <h2
              className="text-display-md"
              style={{ color: 'var(--on-surface)' }}
            >
              Selected
              <br />
              work.
            </h2>
          </motion.div>

          {/* CTA — prominent glowing electric button with pulse */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative font-display font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded w-fit shrink-0 mb-1 inline-flex items-center gap-3 cursor-pointer"
            style={{
              color: 'var(--primary)',
              background: 'transparent',
              border: '1px solid transparent',
              backgroundImage:
                'linear-gradient(var(--surface-low), var(--surface-low)), linear-gradient(45deg, var(--primary), var(--secondary))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              textDecoration: 'none',
            }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                '0 0 30px rgba(129,236,255,0.15), 0 0 60px rgba(214,116,255,0.08)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Pulse ring behind button */}
            <motion.span
              className="absolute inset-0 rounded pointer-events-none"
              style={{
                border: '1px solid transparent',
                backgroundImage:
                  'linear-gradient(transparent, transparent), linear-gradient(45deg, var(--primary), var(--secondary))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
              animate={{
                opacity: [0.6, 0, 0.6],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>

        {/* Featured label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 flex items-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2 text-label px-3 py-1.5 rounded"
            style={{
              background: 'rgba(129, 236, 255, 0.05)',
              border: '1px solid rgba(129, 236, 255, 0.08)',
              color: 'var(--primary)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--primary)' }}
            />
            Featured
          </span>
          <span
            className="h-px flex-1"
            style={{ background: 'rgba(129,236,255,0.06)' }}
          />
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          <Card project={liveProjects[0]} index={0} />
          <Card project={liveProjects[1]} index={1} />
        </div>

        {/* In Progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-8 flex items-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2 text-label px-3 py-1.5 rounded"
            style={{
              background: 'rgba(214, 116, 255, 0.05)',
              border: '1px solid rgba(214, 116, 255, 0.08)',
              color: 'var(--secondary)',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--secondary)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            In Progress
          </span>
          <span
            className="h-px flex-1"
            style={{ background: 'rgba(214,116,255,0.06)' }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {inProgressProjects.map((p, i) => (
            <Card key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
