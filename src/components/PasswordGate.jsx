import { useState } from 'react'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'

// The password is checked client-side. This is appropriate for a
// personal family site — it keeps search engines and casual visitors
// out. It is NOT cryptographic; a browser dev-tools user could find it.
const PASSWORD = 'TH?2026'
const STORAGE_KEY = 'mdt_auth_v1'

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-rose-300">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const shakeControls = useAnimationControls()

  if (unlocked) return children

  const attempt = async (e) => {
    e.preventDefault()
    if (input === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
      await shakeControls.start({
        x: [-12, 12, -9, 9, -5, 5, 0],
        transition: { duration: 0.5, ease: 'easeInOut' },
      })
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: '#faf9f6' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm text-center"
      >
        <div className="flex justify-center mb-6">
          <HeartIcon />
        </div>

        <p className="text-rose-300 text-xs font-semibold uppercase tracking-[0.28em] mb-3">
          Private Collection
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
          Our Story
        </h1>
        <p className="text-gray-400 text-sm mb-10 leading-relaxed">
          This is a private page, made with love. Enter the password to continue.
        </p>

        <motion.form onSubmit={attempt} animate={shakeControls} className="space-y-4">
          <input
            type="password"
            value={input}
            autoComplete="current-password"
            placeholder="Enter password"
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            className={`w-full px-5 py-3.5 rounded-xl border bg-white text-center text-gray-700
                        placeholder:text-gray-300 focus:outline-none focus:ring-2 transition-all
                        ${error
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-rose-100 focus:ring-rose-200'
                        }`}
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm"
              >
                That's not quite right — try again.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-rose-400 text-white font-medium
                       hover:bg-rose-500 active:bg-rose-600 transition-colors shadow-md"
          >
            Enter
          </button>
        </motion.form>

        <p className="text-gray-300 text-xs mt-12 tracking-wider">Made with love ♡</p>
      </motion.div>
    </div>
  )
}
