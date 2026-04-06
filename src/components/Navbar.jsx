import { useState, useEffect } from 'react'

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
      <nav className="fixed top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-lg"
          style={{
            background: scrolled
              ? 'rgba(42, 41, 43, 0.75)'
              : 'rgba(42, 41, 43, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)'
              : '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'background 400ms cubic-bezier(0.32,0.72,0,1), box-shadow 400ms cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 px-3 py-1.5 rounded group">
            <img
              src="/ctrl1.png"
              alt="CTRL"
              className="h-5 w-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span
              className="text-label hidden sm:block transition-colors duration-300"
              style={{ color: 'var(--on-surface-dim)' }}
            >
              CTRL
            </span>
          </a>

          {/* Separator */}
          <div
            className="w-px h-4 mx-1 hidden md:block"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          {/* Links */}
          <div className="hidden md:flex items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-label px-3.5 py-1.5 rounded transition-colors duration-300"
                style={{ color: 'var(--on-surface-dim)' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--on-surface-dim)')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Separator */}
          <div
            className="w-px h-4 mx-1"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          {/* CTA */}
          <a
            href="#contact"
            className="btn-primary text-label-md px-4 py-2 rounded"
          >
            Start a project
            <span className="btn-icon w-5 h-5 hidden sm:flex">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1 7L7 1M7 1H2.5M7 1v4.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-1 w-8 h-8 rounded flex items-center justify-center relative"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span
              className="absolute block w-3.5 h-px origin-center transition-transform duration-200"
              style={{
                background: 'var(--on-surface-mid)',
                transform: open ? 'rotate(45deg)' : 'translateY(-3px)',
              }}
            />
            <span
              className="absolute block w-3.5 h-px origin-center transition-transform duration-200"
              style={{
                background: 'var(--on-surface-mid)',
                transform: open ? 'rotate(-45deg)' : 'translateY(3px)',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center"
          style={{
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            background: 'rgba(14, 14, 15, 0.95)',
          }}
        >
          <div className="flex flex-col items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-3xl font-semibold tracking-tight transition-colors duration-300"
                style={{ color: 'var(--on-surface-dim)' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                onMouseLeave={(e) =>
                  (e.target.style.color = 'var(--on-surface-dim)')
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-label-md px-8 py-3.5 rounded mt-4"
              onClick={() => setOpen(false)}
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </>
  )
}
