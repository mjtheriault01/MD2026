import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────
//  Replace the value below with your Cloudinary audio URL, e.g.:
//  'https://res.cloudinary.com/dikkdclum/video/upload/your-song.mp3'
// ──────────────────────────────────────────────────────────────────
const MUSIC_URL = 'YOUR_CLOUDINARY_AUDIO_URL_HERE'

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M9 18V5l12-2v13M9 18c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2zm12-2c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying((p) => !p)
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />

      <motion.button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-rose-400 text-white
                   shadow-xl flex items-center justify-center focus:outline-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        {playing ? <PauseIcon /> : <NoteIcon />}

        {/* Pulse ring when playing */}
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
    </>
  )
}
