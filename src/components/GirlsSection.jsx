import { motion } from 'framer-motion'
import { girlsPhotos, specialMessages } from '../data/galleryData'
import VideoPopupButton from './VideoPopupButton'
import MediaTile from './MediaTile'

const HALLIE_COVER = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,c_fill,g_face,z_0.6,w_600,h_700/md26/tay_and_hallie_tub_hallie_smile'

function ComingSoonButton({ label }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full
                    bg-gray-50 border border-gray-100 shadow text-gray-400
                    text-sm font-medium cursor-default">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 opacity-50">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
      </svg>
      <span>{label} — coming soon</span>
    </div>
  )
}

export default function GirlsSection() {
  return (
    <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(to bottom, rgba(237,233,254,0.35) 0%, transparent 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-6"
      >
        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-4">
          Taylor & Hallie
        </p>
        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-gray-800 leading-tight mb-4">
          The Girls
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-200" />
          <span className="text-rose-300">♡</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-200" />
        </div>
        <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed mb-8">
          Two little girls who have no idea how lucky they are to have you.
        </p>

        {/* Message buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          {specialMessages.taylor1
            ? <VideoPopupButton url={specialMessages.taylor1} label="Taylor has something to say" />
            : <ComingSoonButton label="Taylor has something to say" />
          }
          {specialMessages.taylor2
            ? <VideoPopupButton url={specialMessages.taylor2} label="Taylor again ♡" />
            : <ComingSoonButton label="Taylor again ♡" />
          }
          <VideoPopupButton
            url={specialMessages.hallie}
            label="Hallie too"
            isAudio={true}
            coverImage={HALLIE_COVER}
          />
        </div>
      </motion.div>

      <div
        className="grid gap-3 px-4 sm:px-6"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '180px',
        }}
      >
        {girlsPhotos.map((photo, i) => (
          <MediaTile key={i} photo={photo} index={i} rowSpan animDelay={4} />
        ))}
      </div>
    </section>
  )
}
