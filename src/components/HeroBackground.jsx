import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CDN = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:40,c_fill,g_auto,w_1600,h_900'
const md26 = (id) => `${CDN}/md26/${id}`

// 8 photos chosen for visual impact and variety: couple → wedding → family → mom → kids
const PHOTOS = [
  { src: md26('maldives_most_beautiful_woman_bridgett'), pan: 'left'  },
  { src: md26('wedding_dance'),                          pan: 'right' },
  { src: md26('family_4th_of_july_2025'),                pan: 'left'  },
  { src: md26('mom_and_girls_in_bed'),                   pan: 'right' },
  { src: md26('sisters_awesome_smiles_summer_2025'),     pan: 'left'  },
  { src: md26('taylor_born_and_mommy'),                  pan: 'right' },
  { src: md26('maldives_us'),                            pan: 'left'  },
  { src: md26('bridgett_girls'),                         pan: 'right' },
]

const INTERVAL = 5000  // ms each photo stays
const TRANSITION = 1.4 // seconds crossfade

// Each photo gets a unique Ken Burns direction so consecutive slides feel different
const kenBurnsStyle = (pan, active) => {
  if (!active) return {}
  const transforms = {
    left:  { from: 'scale(1.12) translate(2%, -1%)',  to: 'scale(1.0) translate(0%, 0%)' },
    right: { from: 'scale(1.0) translate(0%, 0%)',   to: 'scale(1.12) translate(-2%, 1%)' },
  }
  return transforms[pan]
}

export default function HeroBackground() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), INTERVAL)
    return () => clearInterval(id)
  }, [])

  const current = PHOTOS[index]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION, ease: 'easeInOut' }}
        >
          <motion.img
            src={current.src}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            initial={{ transform: kenBurnsStyle(current.pan, true).from }}
            animate={{ transform: kenBurnsStyle(current.pan, true).to }}
            transition={{ duration: INTERVAL / 1000 + TRANSITION, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#faf9f6]" />
    </div>
  )
}
