import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DADS_VIDEO_URL = 'https://res.cloudinary.com/dikkdclum/video/upload/q_auto,f_mp4/md26_videos/mikes_thoughts.mp4'
const DADS_AUDIO_URL = 'https://res.cloudinary.com/dikkdclum/video/upload/Moms_day_project_kbqyak.m4a'

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
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
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Video popup component for Dad's message
function VideoModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative bg-gray-950 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="text-white font-medium text-sm">A message from Dad</p>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <video
              src={DADS_VIDEO_URL}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[70vh] object-contain bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function DadsMessage() {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const audioRef = useRef(null)

  if (DADS_VIDEO_URL) {
    // Video mode — show popup button
    return (
      <>
        <motion.button
          onClick={() => setOpen(true)}
          title="Play Dad's message"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 h-14 px-4 sm:px-5
                     bg-white text-rose-500 border border-rose-100 rounded-full shadow-xl
                     hover:shadow-2xl transition-shadow focus:outline-none"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
        >
          <VideoIcon />
          <span className="hidden sm:block text-sm font-medium whitespace-nowrap pr-1">
            Dad's Message
          </span>
        </motion.button>
        <VideoModal open={open} onClose={() => setOpen(false)} />
      </>
    )
  }

  // Audio fallback mode
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

  return (
    <>
      <audio ref={audioRef} src={DADS_AUDIO_URL} onEnded={() => { setPlaying(false); setFinished(true) }} />
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
        <MicIcon />
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div key="wave" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden">
              <Waveform />
            </motion.div>
          ) : (
            <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hidden sm:block text-sm font-medium whitespace-nowrap pr-1">
              {finished ? 'Replay Message' : "Dad's Message"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
