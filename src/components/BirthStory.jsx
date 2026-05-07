import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORY = [
  "We went into the office at 7:00 a.m. on Thursday morning. Mommy and daddy had everything packed and ready to go, and had a nice breakfast together. Once we got in, nurse Tracy came and got mommy going. Dr. Wirth — who is absolutely wonderful — came in and talked about the day. They started the medication at about 8:00 a.m. to begin contractions. Bridgett was at 3 cm when she arrived, and Dr. Wirth did a membrane sweep to get things going.",
  "Right around noon they got an epidural going, and Dr. Wirth came in to break the water — saying it would really get contractions moving. The epidural was so strong that Bridgett couldn't feel from her chest down for several hours, which slowed the process. They went back and forth carefully to get the levels just right so she could feel her legs without too much pain. After getting that under control around 4:00 or 5:00 p.m., we got to relax and rest a little. During the day, we watched Simone Biles win gold in the individual all-around gymnastics.",
  "Right around 6:00 p.m., Bridgett was feeling a lot of pressure. Tracy checked and saw she was at full dilation — she was ready. Daddy put his game-time pants on and got ready to give Mommy ice and water. Bridgett pushed from a few different positions for right around an hour, and baby came out at 7:03 p.m.",
  "Hallie had her cord wrapped around her because during the birthing process she was facing the wrong direction and needed to be turned. Dr. Wirth did a phenomenal job, reaching her hand up and turning baby. Mommy pushed and did an absolutely awesome job. Baby came out with light hair, and the nurses cleared her airway — and then baby started crying. Daddy was so happy. After a quick wipe, they placed baby on Mommy's chest, and Hallie calmed down completely, peaceful for almost two hours.",
  "Hallie was born weighing 7 lb 15 oz. (We originally got 8 lb 1 oz — which would have been perfect since she was born on 8/1 — but we forgot to take her diaper off, so we had to do it again.) Bridgett had just one stitch and some swelling, but was in great shape.",
  "The next morning, Daddy cuddled Hallie for a couple of hours so Mommy could take a shower and get freshened up. We had a relaxing day watching the Olympics, nurses and doctors coming and going. At about 2:30, Grandpa came to visit. When he left, Daddy drove home to pick up Taylor.",
  "Taylor was so excited — waiting by the door with Grammy, ready to go. When we got to the hospital, Taylor walked in holding Daddy's hand. She walked into the room and was so excited to see Mommy, and pointed right to the baby. She got to hold Hallie — unsure but so sweet. After her initial sweetness and a little shyness, she was excited to jump on the couch, look out the window, and run around the room being her normal wild self. Hallie had gotten Taylor a present: a big sister book and a Disney I Spy book. Taylor read those in the room and was very excited.",
  "Mommy was a superstar through all of it — taking care of Hallie through the night so Daddy could sleep, then letting Daddy cuddle Hallie through the early morning so Mommy could rest. That's who she is. That's always been who she is.",
]

// Soap bubble SVG with baby silhouette
function BubbleSVG({ popping }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="bubbleGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#7dd3fc" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="shimmer" cx="30%" cy="25%" r="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main bubble */}
      <circle cx="60" cy="60" r="54" fill="url(#bubbleGrad)" stroke="#7dd3fc" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Shimmer highlight top-left */}
      <ellipse cx="40" cy="36" rx="16" ry="10" fill="url(#shimmer)" transform="rotate(-20 40 36)" />

      {/* Small secondary highlight */}
      <ellipse cx="78" cy="42" rx="5" ry="3" fill="white" fillOpacity="0.45" transform="rotate(15 78 42)" />

      {/* Baby silhouette — simple seated baby */}
      <g transform="translate(60,62)" opacity="0.55">
        {/* head */}
        <circle cx="0" cy="-18" r="8" fill="#0ea5e9" />
        {/* body */}
        <ellipse cx="0" cy="-4" rx="7" ry="9" fill="#0ea5e9" />
        {/* left arm */}
        <path d="M-7,-8 Q-16,-4 -13,2" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* right arm */}
        <path d="M7,-8 Q16,-4 13,2" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* legs */}
        <path d="M-4,4 Q-6,12 -2,16" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M4,4 Q6,12 2,16" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* Tiny floating dots inside bubble for whimsy */}
      <circle cx="30" cy="75" r="2" fill="#bae6fd" fillOpacity="0.7" />
      <circle cx="88" cy="80" r="1.5" fill="#bae6fd" fillOpacity="0.6" />
      <circle cx="45" cy="90" r="1" fill="white" fillOpacity="0.8" />

      {/* Bottom rim shine */}
      <ellipse cx="60" cy="110" rx="20" ry="4" fill="#7dd3fc" fillOpacity="0.2" />
    </svg>
  )
}

// Burst particles for pop effect
function PopBurst() {
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const dist = 55 + Math.random() * 25
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 3 + Math.random() * 5 }
  })
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ left: '50%', top: '50%' }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-300"
          style={{ width: p.size, height: p.size, x: '-50%', y: '-50%' }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.01 }}
        />
      ))}
    </div>
  )
}

export default function BirthStory() {
  const [open, setOpen] = useState(false)
  const [popping, setPopping] = useState(false)

  const handlePop = () => {
    if (popping) return
    setPopping(true)
    setTimeout(() => {
      setPopping(false)
      setOpen(true)
    }, 400)
  }

  return (
    <section
      className="py-16 sm:py-20 px-6 text-center"
      style={{ background: 'linear-gradient(to bottom, #fff5f7, #faf9f6)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-5"
      >
        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em]">
          August 1, 2024
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800">
          Hallie's Birth Story
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-200" />
          <span className="text-rose-300">♡</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-200" />
        </div>
        <p className="text-gray-400 max-w-md text-base leading-relaxed">
          The day Hallie came into the world. Every detail, written down so we never forget.
        </p>

        {/* Bubble trigger */}
        <div className="relative mt-2 flex flex-col items-center gap-3">
          <AnimatePresence>
            {popping && <PopBurst key="burst" />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!popping ? (
              <motion.button
                key="bubble"
                onClick={handlePop}
                className="focus:outline-none relative"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1 }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                }}
              >
                <div className="w-28 h-28 drop-shadow-lg">
                  <BubbleSVG />
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="pop"
                className="w-28 h-28"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <BubbleSVG popping />
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-sky-400 text-sm font-semibold tracking-wide">
            Pop the bubble ↑
          </p>
        </div>
      </motion.div>

      {/* Story modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-7 py-5 border-b border-sky-100 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex-shrink-0">
                    <BubbleSVG />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">
                      August 1, 2024
                    </p>
                    <p className="font-serif text-xl font-bold text-gray-800 leading-tight">
                      Hallie's Birth Story
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0 ml-4"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Story — scrollable */}
              <div className="overflow-y-auto px-7 py-7 space-y-5 flex-1">
                {STORY.map((para, i) => (
                  <p key={i} className="font-serif text-gray-600 text-[15px] sm:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
                <div className="flex justify-center pt-3 pb-2">
                  <span className="text-sky-300 text-2xl">♡</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
