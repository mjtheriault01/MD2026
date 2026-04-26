import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────
//  Replace with your Cloudinary audio URL, e.g.:
//  'https://res.cloudinary.com/dikkdclum/video/upload/dads-message.m4a'
// ──────────────────────────────────────────────────────────────────
const DADS_MESSAGE_URL = 'https://res.cloudinary.com/dikkdclum/video/upload/Moms_day_project_kbqyak.m4a'

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

function Waveform() {
  const bars = [0.5, 0.9, 0.7, 1, 0.6, 0.85, 0.4]
  return (
    <div className="flex items-center gap-[3px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-rose-400"
          style={{ height: `${h * 100}%` }}
          animate={{ scaleY: [h, 1, h * 0.5, h] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.09,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function DadsMessage() {
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      setFinished(false)
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setFinished(true)
  }

  return (
    <>
      <audio ref={audioRef} src={DADS_MESSAGE_URL} onEnded={handleEnded} />

      <motion.button
        onClick={toggle}
        title={playing ? 'Pause message' : "Play Dad's message"}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 h-14 px-4 sm:px-5
                   bg-white text-rose-500 border border-rose-100 rounded-full shadow-xl
                   hover:shadow-2xl transition-shadow focus:outline-none"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        {playing ? <PauseIcon /> : <MicIcon />}

        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div
              key="wave"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <Waveform />
            </motion.div>
          ) : (
            <motion.span
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:block text-sm font-medium whitespace-nowrap pr-1"
            >
              {finished ? 'Replay Message' : "Dad's Message"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
