import { useState } from 'react'

const services = [
  'Website Design',
  'Website Development',
  'Performance Optimisation',
  'Maintenance & Support',
  'Other',
]

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-label"
        style={{ color: 'var(--on-surface-dim)' }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputBase =
  'w-full rounded px-5 py-3.5 text-sm font-body outline-none transition-all duration-300'

const inputStyle = {
  background: 'var(--surface-low)',
  border: '1px solid var(--ghost-border)',
  color: 'var(--on-surface)',
}

const inputFocusStyle = {
  borderColor: 'var(--primary)',
  background: 'var(--surface-high)',
  borderWidth: '1px',
  borderTopColor: 'var(--ghost-border)',
  borderLeftColor: 'var(--ghost-border)',
  borderRightColor: 'var(--ghost-border)',
}

function StyledInput({ type = 'text', ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type}
      className={inputBase}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  )
}

function StyledSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      className={inputBase}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1.1rem center',
        cursor: 'pointer',
        appearance: 'none',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    >
      {children}
    </select>
  )
}

function StyledTextarea(props) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      className={inputBase}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        resize: 'none',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  )
}

export default function Contact() {
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const set = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <section id="contact" className="relative py-44 px-6">
      {/* Surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--surface)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(129,236,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p
            className="text-label mb-5"
            style={{ color: 'var(--primary)', opacity: 0.5 }}
          >
            Contact
          </p>
          <h2
            className="text-display-md"
            style={{ color: 'var(--on-surface)' }}
          >
            Let's build
            <br />
            something great.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-start">
          {/* Left */}
          <div>
            <p
              className="font-body text-lg leading-relaxed mb-14 max-w-sm"
              style={{ color: 'var(--on-surface-mid)' }}
            >
              Have a project in mind? Send us a message. We reply within 24
              hours.
            </p>

            <div className="flex flex-col gap-5">
              {[
                {
                  label: 'Email',
                  value: 'hello@ctrlsolutions.com.au',
                  icon: (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <rect x="1" y="2.5" width="12" height="9" rx="1.5" />
                      <path d="M1 4.5l6 4.5 6-4.5" strokeOpacity="0.55" />
                    </svg>
                  ),
                },
                {
                  label: 'Location',
                  value: 'Sydney, Australia',
                  icon: (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <path d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" />
                      <circle cx="7" cy="5" r="1.3" strokeOpacity="0.55" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(129, 236, 255, 0.06)',
                      border: '1px solid rgba(129, 236, 255, 0.1)',
                      color: 'var(--primary)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-label mb-0.5"
                      style={{ color: 'var(--on-surface-dim)' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: 'var(--on-surface-mid)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {done ? (
              <div
                className="rounded-lg p-10 flex flex-col items-center text-center gap-5 min-h-[360px] justify-center"
                style={{ background: 'var(--surface-container)' }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(129, 236, 255, 0.1)',
                    border: '1px solid rgba(129, 236, 255, 0.25)',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 10.5l4 4 8-8" />
                  </svg>
                </div>
                <h3
                  className="font-display font-semibold text-lg tracking-tight"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Message sent.
                </h3>
                <p
                  className="font-body text-sm leading-relaxed max-w-[220px]"
                  style={{ color: 'var(--on-surface-mid)' }}
                >
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setDone(false)
                    setForm({ name: '', email: '', service: '', message: '' })
                  }}
                  className="btn-ghost text-label-md px-5 py-2 rounded mt-1"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setDone(true)
                }}
                className="rounded-lg p-8 flex flex-col gap-5"
                style={{ background: 'var(--surface-container)' }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name">
                    <StyledInput
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set}
                      required
                    />
                  </Field>
                  <Field label="Email">
                    <StyledInput
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set}
                      required
                    />
                  </Field>
                </div>

                <Field label="Service">
                  <StyledSelect
                    name="service"
                    value={form.service}
                    onChange={set}
                  >
                    <option value="" style={{ background: '#1a191b' }}>
                      Select a service...
                    </option>
                    {services.map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ background: '#1a191b' }}
                      >
                        {s}
                      </option>
                    ))}
                  </StyledSelect>
                </Field>

                <Field label="Message">
                  <StyledTextarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={set}
                    rows={5}
                  />
                </Field>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 rounded text-label-md mt-1"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
