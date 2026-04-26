import { motion } from 'framer-motion'
import TimelineCard from './components/TimelineCard'
import MaldivesFeature from './components/MaldivesFeature'
import CladdaghDot from './components/CladdaghDot'
import Countdown from './components/Countdown'
import MusicToggle from './components/MusicToggle'
import DadsMessage from './components/DadsMessage'
import PasswordGate from './components/PasswordGate'
import { milestones } from './data/milestones'

// ─── Split milestones around the full-screen feature card ────────
const featureMilestone = milestones.find((m) => m.isFeature)
const beforeFeature = milestones.filter((m) => !m.isFeature && m.id < (featureMilestone?.id ?? Infinity))
const afterFeature = milestones.filter((m) => !m.isFeature && m.id > (featureMilestone?.id ?? 0))

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="text-center pt-16 pb-10 sm:pt-20 sm:pb-12 px-6"
    >
      <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-5">
        Happy Mother's Day
      </p>
      <h1 className="font-serif text-5xl sm:text-7xl font-bold text-gray-800 leading-tight mb-3">
        Our Story
      </h1>
      <p className="font-serif italic text-2xl sm:text-3xl text-rose-300 mb-6">
        For Bridgett
      </p>
      <p className="text-gray-400 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
        Every chapter written together, every moment held forever.
      </p>
      <div className="flex items-center justify-center gap-4 mt-10">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-200" />
        <span className="text-rose-300 text-xl">♡</span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-200" />
      </div>
    </motion.header>
  )
}

// ─── Single milestone row (desktop alternates L/R, mobile = R) ───
function TimelineRow({ milestone, index }) {
  const isLeft = index % 2 === 0

  return (
    <div className="relative">
      {/* ── Desktop ── */}
      <div className="hidden md:flex w-full items-center">
        <div className="w-1/2 flex justify-end pr-14">
          {isLeft ? <TimelineCard milestone={milestone} fromLeft={true} /> : <div />}
        </div>

        <div className="flex-shrink-0 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <CladdaghDot />
          </motion.div>
        </div>

        <div className="w-1/2 pl-14">
          {!isLeft ? <TimelineCard milestone={milestone} fromLeft={false} /> : <div />}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden flex gap-5 w-full">
        <div className="flex flex-col items-center flex-shrink-0 w-7 pt-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <CladdaghDot size="sm" />
          </motion.div>
          <div className="w-px flex-1 bg-gradient-to-b from-rose-200 to-transparent mt-2" />
        </div>

        <div className="flex-1 pb-10">
          <TimelineCard milestone={milestone} fromLeft={false} />
        </div>
      </div>
    </div>
  )
}

// ─── A set of cards with their own vertical center line ──────────
function TimelineSection({ milestones: items, startIndex = 0 }) {
  if (!items.length) return null
  return (
    <section className="relative py-4">
      {/* Desktop center line */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, #fda4af 6%, #fda4af 94%, transparent 100%)',
        }}
      />
      <div className="space-y-8 md:space-y-14">
        {items.map((milestone, i) => (
          <TimelineRow key={milestone.id} milestone={milestone} index={startIndex + i} />
        ))}
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="text-center py-14 border-t border-rose-100 mt-4">
      <p className="font-serif italic text-gray-300 text-xl mb-2">
        "And still, after all this time..."
      </p>
      <p className="text-gray-400 text-xs tracking-widest uppercase">Made with love ♡</p>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen font-sans" style={{ backgroundColor: '#faf9f6' }}>
        {/* Floating controls */}
        <MusicToggle />
        <DadsMessage />

        {/* Pre-feature timeline */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Hero />
          <TimelineSection milestones={beforeFeature} startIndex={0} />
        </div>

        {/* Full-screen Maldives feature */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <MaldivesFeature milestone={featureMilestone} />
        </div>

        {/* Post-feature timeline */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <TimelineSection milestones={afterFeature} startIndex={beforeFeature.length} />
          <Countdown />
          <Footer />
        </div>
      </div>
    </PasswordGate>
  )
}
