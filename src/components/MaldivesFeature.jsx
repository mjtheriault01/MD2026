import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function GradientPlaceholder({ gradient, icon }) {
  const [a, b, c] = gradient
  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(160deg, ${a} 0%, ${b} 50%, ${c} 100%)` }}
    >
      <span className="text-[10rem] opacity-60 select-none">{icon}</span>
    </div>
  )
}

export default function MaldivesFeature({ milestone }) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Image travels ±12% relative to the section — clipped by overflow:hidden
  const yRaw = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const y = prefersReduced ? '0%' : yRaw

  if (!milestone) return null

  return (
    <section
      ref={ref}
      className="relative flex items-end overflow-hidden"
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        height: 'min(100vh, 860px)',
        minHeight: '520px',
      }}
    >
      {/* Parallax background */}
      {milestone.mediaUrl ? (
        <motion.img
          src={milestone.mediaUrl}
          alt={milestone.title}
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover"
          // Slightly oversized so parallax doesn't reveal gaps
        />
      ) : (
        <GradientPlaceholder gradient={milestone.gradient} icon={milestone.icon} />
      )}

      {/* Subtle dark vignette — lighter than before so glass panel pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      {/* Text in frosted glass panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 sm:px-12 pb-12 sm:pb-20 w-full max-w-2xl"
      >
        <div className="backdrop-blur-md bg-black/25 border border-white/15 rounded-2xl p-6 sm:p-8 inline-block">
          <p className="text-white/55 text-xs font-semibold uppercase tracking-[0.22em] mb-3">
            {milestone.date}
          </p>
          <h2 className="font-serif text-5xl sm:text-7xl font-bold text-white leading-none mb-3">
            {milestone.title}
          </h2>
          <p className="text-cyan-300 text-sm font-medium tracking-wide mb-5">
            {milestone.subtitle}
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
            {milestone.description}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
