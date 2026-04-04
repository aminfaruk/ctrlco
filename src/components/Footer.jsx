import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t py-10 px-6" style={{ borderColor: 'rgba(13,15,26,0.07)' }}>
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">

        <div className="flex items-center gap-2">
          <img src="/ctrl1.png" alt="CTRL" className="h-5 w-5 object-contain opacity-50" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'rgba(13,15,26,0.3)' }}>
            CTRL Solutions
          </span>
        </div>

        <p className="text-[10px] tracking-[0.06em]" style={{ color: 'rgba(13,15,26,0.42)' }}>
          © {new Date().getFullYear()} CTRL Solutions. All rights reserved.
        </p>

        <div className="flex gap-6">
          {['Privacy', 'Terms'].map((t) => (
            <motion.a
              key={t}
              href="#"
              className="text-[10px] tracking-[0.14em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(13,15,26,0.45)' }}
              whileHover={{ y: -1 }}
            >
              {t}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
