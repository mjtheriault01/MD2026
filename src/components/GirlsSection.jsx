import { motion } from 'framer-motion'
import { girlsPhotos } from '../data/galleryData'
import MediaTile from './MediaTile'

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
        <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed">
          Two little girls who have no idea how lucky they are to have you.
        </p>
      </motion.div>

      <div
        className="grid gap-3 px-4 sm:px-6"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
      >
        {girlsPhotos.map((photo, i) => (
          <MediaTile key={i} photo={photo} index={i} animDelay={4} />
        ))}
      </div>
    </section>
  )
}
