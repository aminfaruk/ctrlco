import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import agileabilityImg from '../assets/agileability.png'
import gba5Img from '../assets/gba5.png'

const liveProjects = [
  {
    id: '01',
    title: 'AgileAbility',
    category: 'Design & Development',
    year: '2025',
    tags: ['React', 'Tailwind', 'Accessibility'],
    accent: [99, 102, 241],
    desc: 'NDIS provider website, modern and accessible design built to connect people with the support they need.',
    href: 'https://www.agileability.com.au',
    image: agileabilityImg,
  },
  {
    id: '02',
    title: 'GBA5',
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
    accent: [148, 163, 184],
    desc: 'Something new is in the works. Check back soon.',
    href: null,
  },
]

function Card({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [r, g, b] = project.accent
  const Tag = project.href ? motion.a : motion.div
  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative surface surface-hover rounded-2xl overflow-hidden cursor-pointer block"
      style={{ textDecoration: 'none' }}
    >
      {/* Top accent gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.6), transparent)` }}
      />

      {/* Visual area */}
      <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% 40%, rgba(${r},${g},${b},0.07) 0%, transparent 65%)` }}
            />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: [
                  `linear-gradient(rgba(${r},${g},${b},0.8) 1px, transparent 1px)`,
                  `linear-gradient(90deg, rgba(${r},${g},${b},0.8) 1px, transparent 1px)`,
                ].join(','),
                backgroundSize: '28px 28px',
              }}
            />
            <motion.div
              className="relative flex flex-col items-center gap-2"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.35 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
                style={{
                  background: `rgba(${r},${g},${b},0.1)`,
                  border: `1px solid rgba(${r},${g},${b},0.2)`,
                  color: `rgba(${r},${g},${b},1)`,
                }}
              >
                {project.id}
              </div>
              <span
                className="text-[9px] tracking-[0.22em] uppercase font-medium"
                style={{ color: `rgba(${r},${g},${b},0.55)` }}
              >
                Case Study
              </span>
            </motion.div>
          </>
        )}

        {/* Link arrow */}
        <motion.div
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `rgba(${r},${g},${b},0.12)`, border: `1px solid rgba(${r},${g},${b},0.25)`, color: `rgb(${r},${g},${b})` }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Meta */}
      <div className="p-6 border-t border-black/[0.06]">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-semibold text-[15px] tracking-tight mb-0.5" style={{ color: 'rgba(13,15,26,0.88)' }}>{project.title}</h3>
            <p className="text-[11px] tracking-[0.06em]" style={{ color: 'rgba(13,15,26,0.58)' }}>{project.category}</p>
          </div>
          <span className="text-[11px] tracking-[0.06em] shrink-0 pt-0.5" style={{ color: 'rgba(13,15,26,0.45)' }}>{project.year}</span>
        </div>

        <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(13,15,26,0.68)' }}>{project.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] tracking-[0.1em] uppercase px-2 py-[3px] rounded-full"
              style={{
                background: `rgba(${r},${g},${b},0.07)`,
                border: `1px solid rgba(${r},${g},${b},0.18)`,
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

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" ref={ref} className="relative py-44 px-6">

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(13,15,26,0.07) 30%, rgba(13,15,26,0.07) 70%, transparent)' }}
      />

      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(79,70,229,0.5)' }}>Work</p>
            <h2
              className="text-gradient font-bold tracking-[-0.035em] leading-[1.06]"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)' }}
            >
              Selected<br />work.
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="btn-ghost inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] tracking-[0.12em] uppercase font-medium w-fit shrink-0 mb-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4.5M10 2v5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Live Work */}
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(13,15,26,0.35)' }}>Live</p>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {liveProjects.map((p, i) => <Card key={p.id} project={p} index={i} />)}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(13,15,26,0.35)' }}>In Progress</p>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {inProgressProjects.map((p, i) => <Card key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
