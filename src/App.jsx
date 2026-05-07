import { motion } from 'framer-motion'
import TimelineCard from './components/TimelineCard'
import MaldivesFeature from './components/MaldivesFeature'
import MaldivesGallery from './components/MaldivesGallery'
import CladdaghDot from './components/CladdaghDot'
import Countdown from './components/Countdown'
import MusicToggle from './components/MusicToggle'
import DadsMessage from './components/DadsMessage'
import PasswordGate from './components/PasswordGate'
import MomSection from './components/MomSection'
import AdventuresStrip from './components/AdventuresStrip'
import GirlsSection from './components/GirlsSection'
import WeddingLetter from './components/WeddingLetter'
import BirthStory from './components/BirthStory'
import HeroBackground from './components/HeroBackground'
import { milestones } from './data/milestones'

const featureMilestone = milestones.find((m) => m.isFeature)
const beforeFeature = milestones.filter((m) => !m.isFeature && m.id < (featureMilestone?.id ?? Infinity))
const afterFeature = milestones.filter((m) => !m.isFeature && m.id > (featureMilestone?.id ?? 0))

function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
      <HeroBackground />

      {/* Text content — centered vertically over the photos */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '92vh' }}
      >
        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-5">
          Happy Mother's Day
        </p>
        <h1 className="font-serif text-6xl sm:text-8xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
          Our Story
        </h1>
        <p className="font-serif italic text-3xl sm:text-4xl text-rose-300 mb-6 drop-shadow">
          For Bridgett
        </p>
        <p className="text-white/75 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
          Every chapter written together, every moment held forever.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-300/60" />
          <span className="text-rose-300 text-xl">♡</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-300/60" />
        </div>

        {/* Scroll nudge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-10 text-white/40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

function DecorativeDateFill({ milestone }) {
  const year = milestone.date.match(/\d{4}/)?.[0] ?? ''
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className="flex items-center justify-center w-full h-full select-none pointer-events-none"
      aria-hidden="true"
    >
      <span
        className="font-serif font-bold text-[6rem] sm:text-[8rem] leading-none"
        style={{ color: 'rgba(253, 164, 175, 0.13)' }}
      >
        {year}
      </span>
    </motion.div>
  )
}

function TimelineRow({ milestone, index }) {
  const isLeft = index % 2 === 0
  return (
    <div className="relative">
      <div className="hidden md:flex w-full items-center">
        <div className="w-1/2 flex justify-end pr-8">
          {isLeft
            ? <TimelineCard milestone={milestone} fromLeft={true} />
            : <DecorativeDateFill milestone={milestone} />
          }
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
        <div className="w-1/2 pl-8">
          {!isLeft
            ? <TimelineCard milestone={milestone} fromLeft={false} />
            : <DecorativeDateFill milestone={milestone} />
          }
        </div>
      </div>

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

function TimelineSection({ milestones: items, startIndex = 0 }) {
  if (!items.length) return null
  return (
    <section className="relative py-4">
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, #fda4af 6%, #fda4af 94%, transparent 100%)' }}
      />
      <div className="space-y-4 md:space-y-6">
        {items.map((milestone, i) => (
          <TimelineRow key={milestone.id} milestone={milestone} index={startIndex + i} />
        ))}
      </div>
    </section>
  )
}

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

export default function App() {
  return (
    <PasswordGate>
      <div className="min-h-screen font-sans" style={{ backgroundColor: '#faf9f6' }}>
        <MusicToggle />
        <DadsMessage />

        {/* Hero + pre-Maldives timeline */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Hero />
          <TimelineSection milestones={beforeFeature} startIndex={0} />
        </div>

        {/* Maldives full-screen feature */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <MaldivesFeature milestone={featureMilestone} />
        </div>

        {/* Maldives photo gallery strip */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6">
          <MaldivesGallery />
        </div>

        {/* Post-Maldives timeline */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <TimelineSection milestones={afterFeature} startIndex={beforeFeature.length} />
        </div>

        {/* Hallie's birth story */}
        <BirthStory />

        {/* Wedding letter */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <WeddingLetter />
        </div>

        {/* You As A Mom */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <MomSection />
        </div>

        {/* Our Adventures */}
        <div className="max-w-full">
          <AdventuresStrip />
        </div>

        {/* The Girls */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <GirlsSection />
        </div>

        {/* Countdown + Footer */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Countdown />
          <Footer />
        </div>
      </div>
    </PasswordGate>
  )
}
