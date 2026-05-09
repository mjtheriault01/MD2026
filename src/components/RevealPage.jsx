import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Ambient background stars
const STARS = Array.from({ length: 40 }, (_, i) => ({
  x: `${(i * 47 + 13) % 100}%`,
  y: `${(i * 61 + 7) % 100}%`,
  size: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  delay: `${(i * 0.3) % 4}s`,
  duration: `${2 + (i % 5) * 0.7}s`,
}))

// Burst particles shot outward on open
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2
  const dist = 90 + (i % 3) * 35
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    color: ['#fb7185', '#fda4af', '#fcd34d', '#c084fc', '#f9a8d4', '#a5f3fc'][i % 6],
    size: 7 + (i % 3) * 4,
  }
})

function GiftBox({ isOpen }) {
  return (
    <div className="relative" style={{ width: 220, height: 240 }}>
      {/* Soft glow behind the gift */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(251,113,133,0.35) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Box body */}
      <div
        className="absolute rounded-2xl overflow-hidden"
        style={{ width: 160, height: 100, bottom: 0, left: 30, background: '#f43f5e' }}
      >
        {/* Vertical ribbon */}
        <div className="absolute inset-y-0 bg-rose-200/40" style={{ width: 22, left: 69 }} />
        {/* Horizontal ribbon */}
        <div className="absolute inset-x-0 bg-rose-200/40" style={{ height: 22, top: 38 }} />
        {/* Shine */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/5 rounded-r-full" />
      </div>

      {/* Lid + bow group — animates up together */}
      <motion.div
        className="absolute"
        style={{ left: 25, bottom: 96 }}
        animate={isOpen ? { y: -180, opacity: 0, scale: 0.8 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Bow left loop */}
        <div
          className="absolute bg-rose-700 rounded-full"
          style={{ width: 52, height: 28, right: 90, top: -30, transform: 'rotate(-30deg)' }}
        />
        {/* Bow right loop */}
        <div
          className="absolute bg-rose-700 rounded-full"
          style={{ width: 52, height: 28, left: 90, top: -30, transform: 'rotate(30deg)' }}
        />
        {/* Bow ribbon tails */}
        <div
          className="absolute bg-rose-400/60 rounded-full"
          style={{ width: 10, height: 22, left: 73, top: -8, transform: 'rotate(-12deg)' }}
        />
        <div
          className="absolute bg-rose-400/60 rounded-full"
          style={{ width: 10, height: 22, left: 87, top: -8, transform: 'rotate(12deg)' }}
        />
        {/* Bow center knot */}
        <div
          className="absolute bg-rose-500 rounded-full"
          style={{ width: 26, height: 20, left: 72, top: -16 }}
        />
        {/* Lid */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ width: 170, height: 32, background: '#e11d48', position: 'relative' }}
        >
          <div className="absolute inset-y-0 bg-rose-200/40" style={{ width: 22, left: 74 }} />
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white/5 rounded-r-full" />
        </div>
      </motion.div>
    </div>
  )
}

export default function RevealPage() {
  const [phase, setPhase] = useState('idle') // idle | opening | done

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => {
      setPhase('done')
      setTimeout(() => { window.location.href = '/' }, 700)
    }, 1100)
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1c0010 0%, #2d001a 40%, #150020 100%)' }}
      animate={phase === 'done' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Ambient stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: s.x, top: s.y,
            width: s.size, height: s.size,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
            opacity: 0.4,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.5); }
        }
      `}</style>

      {/* Header text */}
      <motion.div
        className="text-center mb-12 px-6"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-rose-400/70 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
          Happy Mother's Day
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
          A gift just for you,
        </h1>
        <p className="font-serif italic text-rose-300 text-3xl sm:text-4xl">Bridgett</p>
      </motion.div>

      {/* Gift box + burst particles */}
      <motion.div
        className="relative cursor-pointer flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleOpen}
      >
        {/* Floating animation wrapper */}
        <motion.div
          animate={phase === 'idle' ? { y: [0, -14, 0] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GiftBox isOpen={phase !== 'idle'} />
        </motion.div>

        {/* Burst particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size, height: p.size,
              backgroundColor: p.color,
              top: '50%', left: '50%',
              marginTop: -p.size / 2, marginLeft: -p.size / 2,
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 0 }}
            animate={phase !== 'idle' ? {
              x: p.x, y: p.y,
              scale: [1.5, 0],
              opacity: [1, 0],
            } : {}}
            transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.02 }}
          />
        ))}

        {/* Inner light burst when opening */}
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,220,230,0.95) 0%, transparent 70%)' }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 400, height: 400, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tap prompt */}
      <motion.p
        className="mt-10 text-rose-300/60 text-xs font-semibold tracking-[0.25em] uppercase"
        initial={{ opacity: 0 }}
        animate={phase === 'idle' ? { opacity: [0.4, 0.9, 0.4] } : { opacity: 0 }}
        transition={{
          opacity: { delay: 1.4, duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        Tap to open ♡
      </motion.p>
    </motion.div>
  )
}
