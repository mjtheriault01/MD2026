import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLightbox } from '../context/LightboxContext'

function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${direction === 'left' ? 'left-3 sm:left-5' : 'right-3 sm:right-5'} top-1/2 -translate-y-1/2 z-20
                  w-11 h-11 flex items-center justify-center rounded-full
                  bg-black/40 hover:bg-black/70 text-white/80 hover:text-white
                  transition-all duration-150 backdrop-blur-sm`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
           strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        {direction === 'left'
          ? <path d="M15 18l-6-6 6-6" />
          : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

export default function Lightbox() {
  const { state, close, navigate } = useLightbox()
  const dragStartX = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    if (!state) return
    const handler = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state, close, navigate])

  // Lock body scroll while open
  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [state])

  // Reset loaded state on photo change
  useEffect(() => { setImgLoaded(false) }, [state?.index])

  const photo = state?.photos[state.index]

  // Touch/pointer swipe handlers
  const handlePointerDown = (e) => { dragStartX.current = e.clientX }
  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return
    const diff = e.clientX - dragStartX.current
    if (Math.abs(diff) > 48) navigate(diff < 0 ? 1 : -1)
    dragStartX.current = null
  }

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/92 backdrop-blur-sm"
            onClick={close}
          />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center
                       rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white
                       transition-all duration-150 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                 strokeLinecap="round" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Arrows */}
          {state.photos.length > 1 && (
            <>
              <ArrowButton direction="left" onClick={(e) => { e.stopPropagation(); navigate(-1) }} />
              <ArrowButton direction="right" onClick={(e) => { e.stopPropagation(); navigate(1) }} />
            </>
          )}

          {/* Photo */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={state.index}
              className="relative z-10 flex items-center justify-center"
              initial={{ opacity: 0, x: state.dir > 0 ? 70 : state.dir < 0 ? -70 : 0, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: state.dir > 0 ? -40 : 40, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={photo.src}
                alt={photo.caption || ''}
                onLoad={() => setImgLoaded(true)}
                draggable={false}
                className={`max-w-[88vw] max-h-[82vh] object-contain rounded-2xl shadow-2xl
                            transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption + counter */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-1 pb-6 pt-10 pointer-events-none"
               style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
            {photo.caption && (
              <p className="text-white text-sm font-medium tracking-wide drop-shadow">{photo.caption}</p>
            )}
            {state.photos.length > 1 && (
              <p className="text-white/45 text-xs tabular-nums">{state.index + 1} / {state.photos.length}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
