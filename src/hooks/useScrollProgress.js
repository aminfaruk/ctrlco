import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollY(sy)
      setScrollProgress(docH > 0 ? sy / docH : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollProgress }
}
