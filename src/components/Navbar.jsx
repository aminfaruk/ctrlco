import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Floating pill nav ─────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: scrolled
              ? 'rgba(255,255,255,0.88)'
              : 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(13,15,26,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: scrolled
              ? '0 4px 32px rgba(13,15,26,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
              : '0 2px 16px rgba(13,15,26,0.06)',
            transition: 'background 400ms cubic-bezier(0.32,0.72,0,1), box-shadow 400ms cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          {/* Logo mark */}
          <a href="#hero" className="flex items-center gap-2 px-3 py-1.5 rounded-full group">
            <img src="/ctrl1.png" alt="CTRL" className="h-5 w-5 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 hidden sm:block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(13,15,26,0.45)' }}
            >
              CTRL
            </span>
          </a>

          {/* Separator */}
          <div className="w-px h-4 mx-1 hidden md:block" style={{ background: 'rgba(13,15,26,0.08)' }} />

          {/* Links */}
          <div className="hidden md:flex items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 text-[10px] tracking-[0.16em] uppercase font-medium transition-colors duration-300 rounded-full"
                style={{ color: 'rgba(13,15,26,0.4)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(13,15,26,0.85)'}
                onMouseLeave={e => e.target.style.color = 'rgba(13,15,26,0.4)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Separator */}
          <div className="w-px h-4 mx-1" style={{ background: 'rgba(13,15,26,0.08)' }} />

          {/* CTA */}
          <a
            href="#contact"
            className="btn-primary text-[10px] tracking-[0.14em] uppercase font-semibold px-4 py-2 rounded-full"
          >
            Start a project
            <span className="btn-icon w-5 h-5 hidden sm:flex">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 7L7 1M7 1H2.5M7 1v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-1 w-8 h-8 rounded-full flex items-center justify-center relative"
            style={{ background: 'rgba(13,15,26,0.05)' }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }}
              className="absolute block w-3.5 h-px origin-center"
              style={{ background: 'rgba(13,15,26,0.6)' }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }}
              className="absolute block w-3.5 h-px origin-center"
              style={{ background: 'rgba(13,15,26,0.6)' }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center"
            style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', background: 'rgba(248,249,252,0.95)' }}
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                  className="text-3xl font-semibold tracking-[-0.02em] transition-colors duration-300"
                  style={{ color: 'rgba(13,15,26,0.45)' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(13,15,26,0.9)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(13,15,26,0.45)'}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: links.length * 0.07 }}
                className="btn-primary text-[11px] tracking-[0.14em] uppercase font-semibold px-8 py-3.5 rounded-full mt-4"
                onClick={() => setOpen(false)}
              >
                Start a project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
