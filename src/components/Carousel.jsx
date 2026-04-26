import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SWIPE_THRESHOLD = 50

export default function Carousel({ photos, alt = '' }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const go = (next) => {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const prev = () => go((index - 1 + photos.length) % photos.length)
  const next = () => go((index + 1) % photos.length)

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next()
    else if (info.offset.x > SWIPE_THRESHOLD) prev()
  }

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-t-2xl select-none">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={photos[index]}
          alt={alt}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Prev / Next arrows — desktop only */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20
                       w-8 h-8 items-center justify-center rounded-full
                       bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20
                       w-8 h-8 items-center justify-center rounded-full
                       bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
