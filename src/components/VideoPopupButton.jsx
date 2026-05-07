import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

export default function VideoPopupButton({ url, label, isAudio = false, coverImage = null, className = '' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full
                    bg-white border border-rose-100 shadow-lg text-rose-500
                    text-sm font-medium hover:shadow-xl transition-shadow ${className}`}
      >
        <PlayIcon />
        <span>{label}</span>
      </motion.button>

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
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative bg-gray-950 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <p className="text-white font-medium text-sm">{label}</p>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isAudio ? (
                <div className="flex flex-col items-center gap-0">
                  {coverImage && (
                    <div className="w-full h-72 overflow-hidden">
                      <img
                        src={coverImage}
                        alt=""
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="p-6 w-full flex justify-center">
                    <audio src={url} controls autoPlay className="w-full" />
                  </div>
                </div>
              ) : (
                <video
                  src={url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[70vh] object-contain bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
