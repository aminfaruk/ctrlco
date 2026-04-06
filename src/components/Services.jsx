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
  const isLast = index === total - 1

  return (
    <div>
      <div className="group grid grid-cols-[28px_1fr] lg:grid-cols-[28px_1fr_auto] gap-x-6 lg:gap-x-10 gap-y-2 py-9 cursor-default">
        {/* Number */}
        <span
          className="text-label pt-0.5"
          style={{ color: 'var(--on-surface-dim)' }}
        >
          {service.num}
        </span>

        {/* Title + description */}
        <div className="flex flex-col gap-2">
          <span
            className="text-label"
            style={{ color: 'var(--primary)', fontSize: '0.5625rem' }}
          >
            {service.prefix}
          </span>
          <h3
            className="font-display font-semibold tracking-tight text-xl"
            style={{ color: 'var(--on-surface)' }}
          >
            {service.title}
          </h3>
          <p
            className="font-body text-sm leading-relaxed max-w-xl"
            style={{ color: 'var(--on-surface-mid)' }}
          >
            {service.line}
          </p>
        </div>

        {/* Icon — desktop right */}
        <div
          className="hidden lg:flex w-9 h-9 rounded items-center justify-center self-center"
          style={{
            background: 'rgba(129, 236, 255, 0.06)',
            border: '1px solid rgba(129, 236, 255, 0.1)',
            color: 'var(--primary)',
          }}
        >
          {service.icon}
        </div>
      </div>

      {/* Tonal divider */}
      {!isLast && (
        <div
          className="h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 40%, transparent 80%)',
          }}
        />
      )}
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-44 px-6">
      {/* Surface */}
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
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <div>
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
          </div>

          <p
            className="font-body text-base leading-relaxed lg:max-w-xs lg:ml-auto"
            style={{ color: 'var(--on-surface-dim)' }}
          >
            From first wireframe to final deploy. We handle the full stack.
          </p>
        </div>

        {/* Service list */}
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
