import { useEffect } from 'react'

import useLatest from 'hooks/useLatest'

const useOutsideClick = (elementRef, handler, isVisible = true) => {
  const latestHandler = useLatest(handler)

  useEffect(() => {
    if (!isVisible) return

    const handleClick = (e) => {
      if (!elementRef.current) return
      if (!elementRef.current.contains(e.target)) latestHandler.current()
    }

    window.addEventListener('click', handleClick)
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('click', handleClick)
  }, [elementRef, latestHandler, isVisible])
}

export default useOutsideClick