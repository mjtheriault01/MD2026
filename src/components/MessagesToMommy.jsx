import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { messagesToMommy, specialMessages } from '../data/galleryData'
import VideoPopupButton from './VideoPopupButton'

const HALLIE_COVER = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,c_fill,g_faces,z_0.8,w_600,h_700/md26/tay_and_hallie_tub_hallie_smile'

function BigPlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 drop-shadow-lg">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.85 14H3a1 1 0 01-1-1V7a1 1 0 011-1h1.85l3.533-2.784a1 1 0 011 .076z" />
      <path d="M12.707 7.293a1 1 0 00-1.414 1.414L12.586 10l-1.293 1.293a1 1 0 101.414 1.414L14 11.414l1.293 1.293a1 1 0 001.414-1.414L15.414 10l1.293-1.293a1 1 0 00-1.414-1.414L14 8.586l-1.293-1.293z" />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.85 14H3a1 1 0 01-1-1V7a1 1 0 011-1h1.85l3.533-2.784a1 1 0 011 .076zM12.93 7.07a1 1 0 011.414 0A5.983 5.983 0 0116 10a5.984 5.984 0 01-1.657 4.13 1 1 0 01-1.415-1.415A3.984 3.984 0 0014 10a3.983 3.983 0 00-1.07-2.716 1 1 0 010-1.414z" />
    </svg>
  )
}

function MessageVideoTile({ src, label, accent = 'rose', aspectRatio = '9/16' }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [vol, setVol] = useState(0.9)
  const [showVol, setShowVol] = useState(false)
  const isAuto = aspectRatio === 'auto'

  const togglePlay = (e) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      window.dispatchEvent(new CustomEvent('videoPlayEnd'))
    } else {
      videoRef.current.muted = muted
      videoRef.current.volume = vol
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
      window.dispatchEvent(new CustomEvent('videoPlayStart'))
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    window.dispatchEvent(new CustomEvent('videoPlayEnd'))
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

  const accentColors = {
    rose:   { ring: 'ring-rose-300/60',    btn: 'bg-rose-500/80',    dot: 'bg-rose-400' },
    mint:   { ring: 'ring-emerald-300/60', btn: 'bg-emerald-600/80', dot: 'bg-emerald-400' },
    blue:   { ring: 'ring-blue-300/60',    btn: 'bg-blue-600/80',    dot: 'bg-blue-400' },
    purple: { ring: 'ring-purple-300/60',  btn: 'bg-purple-600/80',  dot: 'bg-purple-400' },
  }
  const c = accentColors[accent]
  const sliderColor = accent === 'rose' ? '#fb7185' : accent === 'mint' ? '#34d399' : accent === 'purple' ? '#a78bfa' : '#60a5fa'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={togglePlay}
      className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${c.ring} ring-2`}
      style={isAuto ? undefined : { aspectRatio }}
    >
      {!isAuto && (
        /* Blurred background fill — decorative, always plays */
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60 pointer-events-none"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Foreground — controlled by user */}
      <video
        ref={videoRef}
        muted={muted}
        playsInline
        onEnded={handleEnded}
        className={
          isAuto
            ? 'w-full h-auto block'
            : 'absolute inset-0 w-full h-full object-contain z-10'
        }
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play button overlay — shown when paused */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-4 hover:bg-black/60 transition-colors">
              <BigPlayIcon />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top label — shown when playing */}
      {isPlaying && (
        <div className="absolute top-3 left-3 z-20">
          <div className={`${c.btn} backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5`}>
            <div className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
            <span className="text-white text-[11px] font-semibold tracking-wide">{label}</span>
          </div>
        </div>
      )}

      {/* Volume controls — shown when playing */}
      {isPlaying && (
        <div
          className="absolute bottom-3 right-3 z-20 flex items-center gap-2"
          onMouseEnter={() => setShowVol(true)}
          onMouseLeave={() => setShowVol(false)}
        >
          <AnimatePresence>
            {showVol && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 72 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
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
                  className="w-[72px] h-1 cursor-pointer"
                  style={{ accentColor: sliderColor }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={toggleMute}
            className="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors text-white"
          >
            {muted ? <MuteIcon /> : <SoundIcon />}
          </button>
        </div>
      )}
    </motion.div>
  )
}

function GroupHeading({ emoji, name, accent }) {
  const colors = {
    rose:   'text-rose-400',
    mint:   'text-emerald-500',
    blue:   'text-blue-500',
    purple: 'text-purple-500',
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-5"
    >
      <span className="text-2xl">{emoji}</span>
      <h3 className={`font-serif text-2xl font-bold ${colors[accent]}`}>From {name}</h3>
      <div className={`flex-1 h-px bg-gradient-to-r from-current to-transparent opacity-20 ${colors[accent]}`} />
    </motion.div>
  )
}

export default function MessagesToMommy() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-8"
      style={{ background: 'linear-gradient(160deg, #fff7ed 0%, #fdf2f8 50%, #f0f9ff 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-amber-500 text-xs font-semibold uppercase tracking-[0.28em] mb-4">
            Straight from the heart
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-gray-800 leading-tight mb-4">
            Messages to Mommy
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-200" />
            <span className="text-amber-400 text-xl">✉</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-200" />
          </div>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            From the people who love you most — recorded just for you.
          </p>
        </motion.div>

        {/* Taylor — 2×2 grid */}
        <div className="mb-14">
          <GroupHeading emoji="🎀" name="Taylor" accent="rose" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {messagesToMommy.taylor.map((v, i) => (
              <MessageVideoTile key={i} src={v.src} label={v.label} accent="rose" />
            ))}
          </div>
        </div>

        {/* Hallie — 2 side by side + Hallie Too soundbite */}
        <div className="mb-14">
          <GroupHeading emoji="🌿" name="Hallie" accent="mint" />
          <div className="grid grid-cols-2 gap-3 max-w-2xl mb-5">
            {messagesToMommy.hallie.map((v, i) => (
              <MessageVideoTile key={i} src={v.src} label={v.label} accent="mint" aspectRatio="auto" />
            ))}
          </div>
          <VideoPopupButton
            url={specialMessages.hallie}
            label="Hallie too ♡"
            isAudio={true}
            coverImage={HALLIE_COVER}
          />
        </div>

        {/* Grammy */}
        <div className="mb-14">
          <GroupHeading emoji="💜" name="Grammy" accent="purple" />
          <div className="max-w-xs">
            <MessageVideoTile src={messagesToMommy.grammy} label="A message from Grammy" accent="purple" />
          </div>
        </div>

        {/* Dad */}
        <div>
          <GroupHeading emoji="💙" name="Dad" accent="blue" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md">
            {messagesToMommy.dad.map((v, i) => (
              <MessageVideoTile key={i} src={v.src} label={v.label} accent="blue" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
