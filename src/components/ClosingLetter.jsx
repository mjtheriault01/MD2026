import { motion } from 'framer-motion'

export default function ClosingLetter() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div
          className="relative rounded-3xl px-8 py-10 sm:px-14 sm:py-14 shadow-xl border border-rose-100"
          style={{ background: 'linear-gradient(145deg, #fffbf5 0%, #fdf2f8 60%, #f0f9ff 100%)' }}
        >
          {/* Decorative top line */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-200" />
            <span className="text-rose-300 text-xl">♡</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-200" />
          </div>

          <p className="text-rose-400 font-sans font-semibold text-xs uppercase tracking-[0.24em] mb-8 text-center">
            A note from Mike
          </p>

          <div className="font-serif text-gray-600 leading-[1.85] space-y-5 text-[1.05rem]">
            <p className="text-gray-800 font-semibold text-lg">Bridgett,</p>

            <p>
              Since the day I met you, I have known what a huge heart you have. You are so kind,
              caring, and loving. Seeing you become a mom has been one of the most special things,
              because I see a true peace and joy when you are with our kids. Whatever challenges
              being a mom has brought, you have overcome.
            </p>

            <p>
              Getting to learn how to be a parent with you has shown me even more about the person
              you are. You care so much about our kids, and I just want you to know that there
              isn't a better person for it — and I couldn't have a better wife than you. I hope
              this page helps you see how great you are and the joy that you bring to all of our lives.
            </p>

            <p>
              You are at the center of our family and are the one who makes our family run. The
              planning, the activities, the fun events, the figuring out how to best teach our kids —
              you do so great at all of that. And although it is quite the balancing act, you are
              like Taylor on the balance beam: a natural, and you do so well at it.
            </p>

            <p>
              I'm so lucky to be married to you and to get to parent our beautiful kids with you.
              I can't wait till we extend our family — the girls are going to be so excited for that.
            </p>

            <div className="pt-4 space-y-1">
              <p>I love you the mostest,</p>
              <p className="font-serif italic text-rose-400 text-2xl">Mike ♡</p>
            </div>
          </div>

          {/* Decorative bottom line */}
          <div className="flex items-center gap-4 mt-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-200" />
            <span className="text-rose-300 text-xl">♡</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-200" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
