// Claddagh ring icon used as the timeline bullet — a nod to the
// Halloween night she became yours.

export default function CladdaghDot({ size = 'md' }) {
  const outer = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'
  const icon = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'

  return (
    <div
      className={`${outer} rounded-full bg-rose-400 border-4 border-[#faf9f6] shadow-md
                  flex items-center justify-center flex-shrink-0`}
    >
      {/* Claddagh: two hands, crowned heart */}
      <svg viewBox="0 0 28 26" fill="white" className={icon} aria-hidden="true">
        {/* Left hand */}
        <ellipse cx="3" cy="15" rx="2.5" ry="5" />
        {/* Right hand */}
        <ellipse cx="25" cy="15" rx="2.5" ry="5" />
        {/* Crown band */}
        <rect x="9" y="7" width="10" height="3" rx="1.5" />
        {/* Crown points */}
        <polygon points="9,7 9,3 14,5.5 19,3 19,7" />
        {/* Heart */}
        <path d="M5.5,12 C5.5,9 8,7.5 10.5,9.5 C11,8.5 11.8,8 14,8 C16.2,8 17,8.5 17.5,9.5 C20,7.5 22.5,9 22.5,12 C22.5,16.5 14,23 14,23 C14,23 5.5,16.5 5.5,12 Z" />
      </svg>
    </div>
  )
}
