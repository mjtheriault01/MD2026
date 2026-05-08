import { useRef } from 'react'
import { motion } from 'framer-motion'
import { maldivesPhotos } from '../data/galleryData'
import { useLightbox } from '../context/LightboxContext'

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

export default function MaldivesGallery() {
  const scrollRef = useRef(null)
  const { openLightbox } = useLightbox()
  const lightboxPhotos = maldivesPhotos.map(p => ({ src: p.src, label: p.label }))

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                   w-9 h-9 items-center justify-center rounded-full
                   bg-white/90 shadow-md text-gray-500 hover:text-rose-500
                   hover:shadow-lg transition-all backdrop-blur-sm -translate-x-1"
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                   w-9 h-9 items-center justify-center rounded-full
                   bg-white/90 shadow-md text-gray-500 hover:text-rose-500
                   hover:shadow-lg transition-all backdrop-blur-sm translate-x-1"
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto pb-4 flex gap-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {maldivesPhotos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => openLightbox(lightboxPhotos, i)}
            className="relative flex-shrink-0 w-64 sm:w-80 h-48 sm:h-56 rounded-xl overflow-hidden group cursor-zoom-in"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-2.5 left-3 text-white text-xs font-medium tracking-wide">
              {photo.label}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-300 text-xs mt-2 tracking-wide sm:hidden">
        ← swipe →
      </p>
    </div>
  )
}
