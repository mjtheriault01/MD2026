import { useRef } from 'react'
import { motion } from 'framer-motion'
import { adventures } from '../data/galleryData'

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function AdventureCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-shrink-0 w-72 sm:w-80 h-52 sm:h-60 rounded-2xl overflow-hidden group"
    >
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <p className="absolute bottom-3 left-4 text-white text-sm font-semibold tracking-wide">
        {item.label}
      </p>
    </motion.div>
  )
}

export default function AdventuresStrip() {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10 px-6"
      >
        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-4">
          Everywhere we've gone
        </p>
        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-gray-800 leading-tight">
          Our Adventures
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-200" />
          <span className="text-rose-300">♡</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-200" />
        </div>
      </motion.div>

      {/* Scroll strip + arrow buttons */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 items-center justify-center rounded-full
                     bg-white/90 shadow-lg text-gray-600 hover:text-rose-500
                     hover:shadow-xl transition-all backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 items-center justify-center rounded-full
                     bg-white/90 shadow-lg text-gray-600 hover:text-rose-500
                     hover:shadow-xl transition-all backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 px-6 sm:px-12
                     scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {adventures.map((item, i) => (
            <div key={i} className="snap-start">
              <AdventureCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-300 text-xs mt-3 tracking-wide sm:hidden">
        ← swipe to explore →
      </p>
    </section>
  )
}
