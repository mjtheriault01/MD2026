import { motion } from 'framer-motion'
import Carousel from './Carousel'

// Special animated placeholder for the future "Grand Adventure" card
function FuturePlaceholder() {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    x: `${(i * 37 + 11) % 100}%`,
    y: `${(i * 53 + 7) % 100}%`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    delay: `${(i * 0.4) % 3}s`,
    duration: `${2.5 + (i % 4) * 0.8}s`,
  }))

  return (
    <div
      className="w-full h-full rounded-t-2xl overflow-hidden relative flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 75%, #0f172a 100%)' }}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
            opacity: 0.7,
          }}
        />
      ))}
      <div className="relative text-center px-4">
        <div className="text-5xl mb-3">✨</div>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">Oct 16, 2026</p>
        <p className="text-white/50 text-[11px] mt-2">Coming soon...</p>
      </div>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}

function Placeholder({ gradient, icon, subtitle }) {
  const [a, b, c] = gradient
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-t-2xl"
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 50%, ${c} 100%)` }}
    >
      <span className="text-6xl drop-shadow">{icon}</span>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-600/70">{subtitle}</p>
    </div>
  )
}

function Media({ milestone }) {
  if (milestone.photos?.length) {
    return <Carousel photos={milestone.photos} alt={milestone.title} />
  }
  if (!milestone.mediaUrl) {
    return milestone.isFuture
      ? <FuturePlaceholder />
      : <Placeholder gradient={milestone.gradient} icon={milestone.icon} subtitle={milestone.subtitle} />
  }
  if (milestone.mediaType === 'video') {
    return (
      <video
        className="w-full h-full object-cover rounded-t-2xl"
        src={milestone.mediaUrl}
        controls
        playsInline
      />
    )
  }
  return (
    <img
      className="w-full h-full object-cover rounded-t-2xl"
      src={milestone.mediaUrl}
      alt={milestone.title}
    />
  )
}

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
const textItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function TimelineCard({ milestone, fromLeft }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: fromLeft ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl shadow-lg border border-rose-50 overflow-hidden
                 hover:shadow-xl transition-shadow duration-300 max-w-xl w-full"
    >
      {/* Media — taller so portrait photos show faces */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <Media milestone={milestone} />
      </div>

      {/* Text — staggered entrance */}
      <motion.div
        className="p-5 sm:p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={textContainer}
      >
        <motion.p variants={textItem} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300 mb-1">
          {milestone.date}
        </motion.p>
        <motion.h3 variants={textItem} className="font-serif text-2xl font-bold text-gray-800 leading-tight">
          {milestone.title}
        </motion.h3>
        <motion.p variants={textItem} className="text-rose-400 text-sm font-medium mt-0.5 mb-3">
          {milestone.subtitle}
        </motion.p>
        <motion.p variants={textItem} className="text-gray-500 text-sm leading-relaxed">
          {milestone.description}
        </motion.p>
      </motion.div>
    </motion.article>
  )
}
