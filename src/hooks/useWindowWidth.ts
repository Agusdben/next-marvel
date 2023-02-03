import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  const handleWindowWidth = () => {
    const windowWidth = window.innerWidth
    setWindowWidth(windowWidth)
  }

  useEffect(() => {
    handleWindowWidth()
    window.addEventListener('resize', handleWindowWidth)

    return () => window.removeEventListener('resize', handleWindowWidth)
  }, [])

  return {
    windowWidth
  }
}

export default useWindowWidth
