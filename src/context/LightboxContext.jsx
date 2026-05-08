import { createContext, useContext, useState, useCallback } from 'react'

const LightboxContext = createContext(null)

export function LightboxProvider({ children }) {
  const [state, setState] = useState(null) // { photos: [], index: 0, dir: 0 }

  const openLightbox = useCallback((photos, clickedIndex) => {
    const imagePhotos = photos.filter(p => p.type !== 'video')
    const clicked = photos[clickedIndex]
    const imageIndex = imagePhotos.findIndex(p => p === clicked)
    if (imageIndex === -1) return
    setState({ photos: imagePhotos, index: imageIndex, dir: 0 })
  }, [])

  const close = useCallback(() => setState(null), [])

  const navigate = useCallback((dir) => {
    setState(prev => {
      if (!prev) return null
      const newIndex = (prev.index + dir + prev.photos.length) % prev.photos.length
      return { ...prev, index: newIndex, dir }
    })
  }, [])

  return (
    <LightboxContext.Provider value={{ state, openLightbox, close, navigate }}>
      {children}
    </LightboxContext.Provider>
  )
}

export const useLightbox = () => useContext(LightboxContext)
