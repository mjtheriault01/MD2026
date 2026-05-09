import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TARGET = new Date('2026-10-16T08:00:00')
const BG = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,c_fill,g_faces,w_1800,h_900/md26/blackberry_farm_family_fall_2024'

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 px-4 py-3 min-w-[68px] sm:min-w-[80px]">
        <span className="font-serif text-4xl sm:text-5xl font-bold text-white block text-center tabular-nums leading-none drop-shadow">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-white/60">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span className="font-serif text-3xl text-white/40 self-start mt-3 select-none">:</span>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl my-8"
    >
      {/* Background photo */}
      <img
        src={BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-28 text-center px-4">
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12 bg-rose-300/50" />
          <span className="text-rose-300">✦</span>
          <div className="h-px w-12 bg-rose-300/50" />
        </div>

        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.22em] mb-3">
          The Next Chapter Begins
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          The Grand Adventure
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto mb-12">
          October 16, 2026 — every second brings us one heartbeat closer.
        </p>

        {timeLeft ? (
          <div className="flex items-start justify-center gap-2 sm:gap-4 flex-wrap">
            <Unit value={timeLeft.days} label="Days" />
            <Colon />
            <Unit value={timeLeft.hours} label="Hours" />
            <Colon />
            <Unit value={timeLeft.minutes} label="Minutes" />
            <Colon />
            <Unit value={timeLeft.seconds} label="Seconds" />
          </div>
        ) : (
          <p className="font-serif text-3xl text-white font-semibold italic drop-shadow">
            Welcome to the world, little one! 🌟
          </p>
        )}

        {/* Decorative bottom */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="h-px w-12 bg-rose-300/50" />
          <span className="text-rose-300/60">♡</span>
          <div className="h-px w-12 bg-rose-300/50" />
        </div>
      </div>
    </motion.section>
  )
}
