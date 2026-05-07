import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function MuteIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.85 14H3a1 1 0 01-1-1V7a1 1 0 011-1h1.85l3.533-2.784a1 1 0 011 .076z" />
      <path d="M12.707 7.293a1 1 0 00-1.414 1.414L12.586 10l-1.293 1.293a1 1 0 101.414 1.414L14 11.414l1.293 1.293a1 1 0 001.414-1.414L15.414 10l1.293-1.293a1 1 0 00-1.414-1.414L14 8.586l-1.293-1.293z" />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.85 14H3a1 1 0 01-1-1V7a1 1 0 011-1h1.85l3.533-2.784a1 1 0 011 .076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
    </svg>
  )
}

export default function MediaTile({ photo, index, rowSpan = false, animDelay = 5 }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [vol, setVol] = useState(0.8)
  const [showVol, setShowVol] = useState(false)
  const isTall = rowSpan && photo.src.includes('h_800')
  const isVideo = photo.type === 'video'

  const handleMouseEnter = () => {
    if (isVideo) window.dispatchEvent(new CustomEvent('videoHoverStart'))
  }
  const handleMouseLeave = () => {
    if (isVideo) window.dispatchEvent(new CustomEvent('videoHoverEnd'))
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const next = !muted
    setMuted(next)
    if (videoRef.current) videoRef.current.muted = next
  }

  const handleVol = (e) => {
    e.stopPropagation()
    const v = parseFloat(e.target.value)
    setVol(v)
    if (videoRef.current) {
      videoRef.current.volume = v
      videoRef.current.muted = v === 0
    }
    setMuted(v === 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % animDelay) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer
        ${isTall ? 'row-span-2' : ''}
        ${isVideo ? 'col-span-2 row-span-2' : ''}
      `}
    >
      {isVideo ? (
        <>
          {/* Blurred background fill */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-70 pointer-events-none"
          >
            <source src={photo.src} type="video/mp4" />
          </video>
          {/* Foreground — full video, no cropping */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-contain z-10"
          >
            <source src={photo.src} type="video/mp4" />
          </video>
          {/* Purple ring */}
          <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-300/70 pointer-events-none z-20" />

          {/* Volume control — always visible on video tiles */}
          <div
            className="absolute bottom-2 right-2 z-30 flex items-center gap-1.5"
            onMouseEnter={() => setShowVol(true)}
            onMouseLeave={() => setShowVol(false)}
          >
            <AnimatePresence>
              {showVol && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 64 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={muted ? 0 : vol}
                    onChange={handleVol}
                    onClick={(e) => e.stopPropagation()}
                    className="w-16 h-1 accent-purple-400 cursor-pointer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleMute}
              className="bg-black/50 backdrop-blur-sm rounded-full p-1.5 hover:bg-black/70 transition-colors"
            >
              {muted ? <MuteIcon /> : <SoundIcon />}
            </button>
          </div>

          {/* Video badge */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <div className="bg-purple-500/70 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[10px] font-semibold uppercase tracking-wide">Video</span>
            </div>
          </div>
        </>
      ) : (
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Caption overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end z-20">
        <p className="text-white text-xs font-medium tracking-wide px-3 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {photo.caption}
        </p>
      </div>
    </motion.div>
  )
}
