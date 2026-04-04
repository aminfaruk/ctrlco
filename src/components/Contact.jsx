import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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
      <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(13,15,26,0.58)' }}>{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-black/[0.03] border border-black/[0.08] rounded-xl px-5 py-3.5 text-sm text-[#0d0f1a] placeholder-black/20 outline-none transition-all duration-300 focus:border-indigo-400/50 focus:bg-indigo-50/60'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <section id="contact" ref={ref} className="relative py-44 px-6">

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(13,15,26,0.07) 30%, rgba(13,15,26,0.07) 70%, transparent)' }}
      />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(79,70,229,0.5)' }}>Contact</p>
          <h2
            className="text-gradient font-bold tracking-[-0.035em] leading-[1.06]"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)' }}
          >
            Let's build<br />something great.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg leading-relaxed mb-14 max-w-sm" style={{ color: 'rgba(13,15,26,0.65)' }}>
              Have a project in mind? Send us a message — we reply within 24 hours.
            </p>

            <div className="flex flex-col gap-5">
              {[
                {
                  label: 'Email',
                  value: 'hello@ctrlsolutions.com.au',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <rect x="1" y="2.5" width="12" height="9" rx="1.5"/>
                      <path d="M1 4.5l6 4.5 6-4.5" strokeOpacity="0.55"/>
                    </svg>
                  ),
                },
                {
                  label: 'Location',
                  value: 'Sydney, Australia',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z"/>
                      <circle cx="7" cy="5" r="1.3" strokeOpacity="0.55"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(79,70,229,0.07)', border: '1px solid rgba(79,70,229,0.14)', color: 'rgba(79,70,229,0.6)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: 'rgba(13,15,26,0.50)' }}>{item.label}</p>
                    <p className="text-sm" style={{ color: 'rgba(13,15,26,0.55)' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="surface rounded-2xl p-10 flex flex-col items-center text-center gap-5 min-h-[360px] justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(129,140,248,1)" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 10.5l4 4 8-8"/>
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold text-lg tracking-tight" style={{ color: 'rgba(13,15,26,0.85)' }}>Message sent.</h3>
                  <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: 'rgba(13,15,26,0.65)' }}>
                    We'll be in touch within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setDone(false); setForm({ name: '', email: '', service: '', message: '' }) }}
                    className="btn-ghost text-[11px] tracking-[0.12em] uppercase px-5 py-2 rounded-full mt-1"
                    whileHover={{ scale: 1.02 }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => { e.preventDefault(); setDone(true) }}
                  className="surface rounded-2xl p-8 flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name">
                      <input className={inputClass} name="name" placeholder="Your name" value={form.name} onChange={set} required />
                    </Field>
                    <Field label="Email">
                      <input className={inputClass} type="email" name="email" placeholder="your@email.com" value={form.email} onChange={set} required />
                    </Field>
                  </div>

                  <Field label="Service">
                    <select
                      className={inputClass}
                      name="service"
                      value={form.service}
                      onChange={set}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(13,15,26,0.3)' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1.1rem center',
                        cursor: 'pointer',
                        appearance: 'none',
                      }}
                    >
                      <option value="" style={{ background: '#ffffff' }}>Select a service…</option>
                      {services.map((s) => <option key={s} value={s} style={{ background: '#ffffff' }}>{s}</option>)}
                    </select>
                  </Field>

                  <Field label="Message">
                    <textarea
                      className={inputClass}
                      name="message"
                      placeholder="Tell us about your project…"
                      value={form.message}
                      onChange={set}
                      rows={5}
                      style={{ resize: 'none' }}
                    />
                  </Field>

                  <motion.button
                    type="submit"
                    className="btn-primary w-full py-3.5 rounded-xl text-[11px] tracking-[0.14em] uppercase font-medium mt-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
