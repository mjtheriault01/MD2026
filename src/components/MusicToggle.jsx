import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MUSIC_URL = 'https://res.cloudinary.com/dikkdclum/video/upload/v1778096313/Claddagh_in_December_tjckci.mp3'

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M9 18V5l12-2v13M9 18c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2zm12-2c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}
function VolumeIcon({ muted }) {
  return muted ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-rose-300">
      <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0018 19.73L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-rose-300">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  )
}

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef(null)
  const savedVolumeRef = useRef(0.6)
  const duckedRef = useRef(false)

  // Listen for video hover events to duck the music
  useEffect(() => {
    const duck = () => {
      if (!audioRef.current || duckedRef.current) return
      duckedRef.current = true
      savedVolumeRef.current = audioRef.current.volume
      audioRef.current.volume = Math.min(audioRef.current.volume * 0.15, 0.08)
    }
    const unduck = () => {
      if (!audioRef.current || !duckedRef.current) return
      duckedRef.current = false
      audioRef.current.volume = savedVolumeRef.current
    }
    window.addEventListener('videoHoverStart', duck)
    window.addEventListener('videoHoverEnd', unduck)
    return () => {
      window.removeEventListener('videoHoverStart', duck)
      window.removeEventListener('videoHoverEnd', unduck)
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying((p) => !p)
  }

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    savedVolumeRef.current = v
    if (audioRef.current && !duckedRef.current) audioRef.current.volume = v
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />

      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Volume panel — slides up on hover */}
        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-1.5 bg-white rounded-2xl shadow-xl border border-rose-100 px-3 py-3"
            >
              <VolumeIcon muted={volume === 0} />
              {/* Vertical slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="appearance-none cursor-pointer"
                style={{
                  writingMode: 'vertical-lr',
                  direction: 'rtl',
                  width: '4px',
                  height: '72px',
                  background: `linear-gradient(to top, #fb7185 ${volume * 100}%, #fecdd3 ${volume * 100}%)`,
                  borderRadius: '2px',
                  outline: 'none',
                  WebkitAppearance: 'slider-vertical',
                }}
              />
              <span className="text-[10px] text-rose-300 font-medium tabular-nums">
                {Math.round(volume * 100)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main play/pause button */}
        <motion.button
          onClick={toggle}
          title={playing ? 'Pause music' : 'Play music'}
          className="w-14 h-14 rounded-full bg-rose-400 text-white shadow-xl
                     flex items-center justify-center focus:outline-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          {playing ? <PauseIcon /> : <NoteIcon />}

          <AnimatePresence>
            {playing && (
              <motion.span
                key="ring"
                className="absolute inset-0 rounded-full border-2 border-rose-300 pointer-events-none"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
