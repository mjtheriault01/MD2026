import { motion } from 'framer-motion'
import { momPhotos } from '../data/galleryData'
import MediaTile from './MediaTile'

export default function MomSection() {
  return (
    <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(to bottom, rgba(255,228,236,0.3) 0%, transparent 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-6"
      >
        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-4">
          The role you were made for
        </p>
        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-gray-800 leading-tight mb-4">
          You As A Mom
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-200" />
          <span className="text-rose-300">♡</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-200" />
        </div>
        <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed mb-8">
          Watching you be their mom is the greatest gift we've ever been given.
        </p>
      </motion.div>

      {/* Masonry grid */}
      <div
        className="grid gap-3 px-4 sm:px-6"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {momPhotos.map((photo, i) => (
          <MediaTile key={i} photo={photo} index={i} animDelay={5} group={momPhotos} groupIndex={i} />
        ))}
      </div>
    </section>
  )
}
