import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTER = `Bridgett Marie,

I have no idea where to start this. I love you. From the first night we went out at Bien Trucha, I knew there was something special about you. You had this aura about you that was so special and soothing to me. I realized that was just you. Your heart. Your childlike excitement. Your goofiness. Your adventureness. Your thoughtfulness. Your creativity. This is the You that I fell in love with.

After getting to know you a little bit more, I learned what a real catch I had. You have such a big heart and are there for so many people. I could see how big your heart was within only a few weeks of our first date and I knew that not only were you this amazing, fun, and beautiful girl, but you were a girl I could see myself marrying. You were a girl that could make me a better person by just being around you. You push me to always consider others and love others by giving them my time, help, and friendship. You pick me up when I am down and I know you will always be there when I need you.

I talked to you about how our relationship will not always be 50-50 — because I want you to know that I will always give you my all, and I know you will do the same. We are starting a life together. That means we are a team throughout life. When it feels that one person is doing more, we will communicate and express how we feel. We will work together and look at our relationship in the big picture of our entire lives. Our journey lasts our entire lifetime together, so as long as we always have faith and each other and work to grow together, we will make it.

Marrying you! Wow. I am the luckiest man in the world. Everyone says that, but I truly am. When I see you walking down that aisle, it will truly take my breath away. Thinking about marrying you fills me with joy — a complete happiness that I can't describe. I love you and can't wait to see you today. I can't wait to see what our kiss will be like. I can't wait to dance with you. I can't wait to spend the next couple nights together and then the rest forever.

I am so happy to be getting married with you at the church. There are several moments in our relationship when we have gone to church together and I sense a peacefulness about both of us like a weight has been lifted. I love that we get to start our marriage in such a happy and important place together.

I am looking forward to so many things in the rest of our lives together. Mostly, I am just excited to be with you. There's no one thing that I can do with you that makes it more special — everything I do with you is special. It's special that we will have a lifetime together to do whatever we choose. I am excited to go places with you. I am excited to do the simple things in life with you. I am excited to come home to you. I am excited to wake up next to you. I am excited to have kids with you — to see you as an amazing mother. I am excited to figure everything out with you.

Thank you for being there for me always. Thank you for all you do. Thank you for being the amazing woman that you are. You are my one and only. I wish we would have found each other sooner just to have even more time together.

I love you Bridgett Marie and cannot wait to be able to call you my wife.

Love,
Michael Jay`

function EnvelopeIcon({ isOpen }) {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
      {/* Envelope body */}
      <rect x="2" y="20" width="116" height="58" rx="4" fill="#fff5f7" stroke="#fda4af" strokeWidth="2" />
      {/* Bottom triangle folds */}
      <path d="M2 78 L60 45 L118 78" fill="#fce7f3" stroke="#fda4af" strokeWidth="1.5" />
      <path d="M2 20 L60 50 L118 20" fill="#fce7f3" stroke="none" />
      {/* Flap */}
      <motion.path
        d="M2 20 L60 55 L118 20 L118 20 Q114 16 110 16 L10 16 Q6 16 2 20 Z"
        fill="#fda4af"
        animate={{ rotateX: isOpen ? 180 : 0, originY: '0%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Wax seal */}
      {!isOpen && (
        <circle cx="60" cy="50" r="10" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
      )}
    </svg>
  )
}

export default function WeddingLetter() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Section trigger */}
      <section className="py-16 sm:py-24 flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-4">
            December 12, 2020
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            A Letter From Your Wedding Day
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-200" />
            <span className="text-rose-300">♡</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-200" />
          </div>
          <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
            A letter written to you on the morning of our wedding. Tap the envelope to read it.
          </p>
        </motion.div>

        {/* Envelope */}
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="w-48 h-32 cursor-pointer focus:outline-none drop-shadow-xl"
          aria-label="Open wedding letter"
        >
          <EnvelopeIcon isOpen={false} />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-rose-300 text-xs mt-4 tracking-wide animate-pulse"
        >
          tap to open ♡
        </motion.p>
      </section>

      {/* Letter modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Letter card */}
            <motion.div
              className="relative bg-[#fffaf9] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Letter header */}
              <div className="sticky top-0 bg-[#fffaf9] border-b border-rose-100 px-8 pt-8 pb-4 flex justify-between items-start">
                <div>
                  <p className="text-rose-300 text-[11px] font-semibold uppercase tracking-[0.2em]">
                    December 12, 2020 · Wedding Day
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mt-1">
                    My Letter to You
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-gray-500 transition-colors mt-1"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                </button>
              </div>

              {/* Letter body */}
              <div className="px-8 sm:px-12 py-8">
                {LETTER.split('\n\n').map((para, i) => (
                  <p key={i} className={`font-serif text-gray-700 leading-relaxed mb-5 ${
                    i === 0 ? 'text-lg font-semibold text-rose-400' :
                    para.startsWith('Love,') ? 'mt-8 text-gray-600' : 'text-base'
                  }`}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Rose decoration */}
              <div className="flex justify-center pb-8">
                <span className="text-rose-300 text-2xl">♡</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
