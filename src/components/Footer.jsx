export default function Footer() {
  return (
    <footer
      className="relative py-10 px-6"
      style={{ background: 'var(--surface-low)' }}
    >
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <img
            src="/ctrl1.png"
            alt="CTRL"
            className="h-5 w-5 object-contain opacity-40"
          />
          <span
            className="text-label"
            style={{ color: 'var(--on-surface-dim)' }}
          >
            CTRL Solutions
          </span>
        </div>

        <p
          className="font-body text-[10px] tracking-[0.06em]"
          style={{ color: 'var(--on-surface-dim)' }}
        >
          {new Date().getFullYear()} CTRL Solutions. All rights reserved.
        </p>

        <div className="flex gap-6">
          {['Privacy', 'Terms'].map((t) => (
            <a
              key={t}
              href="#"
              className="text-label transition-colors duration-300"
              style={{ color: 'var(--on-surface-dim)' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) =>
                (e.target.style.color = 'var(--on-surface-dim)')
              }
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
