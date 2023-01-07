import React, { useEffect, useRef } from 'react'
import useWindowSize from '../hooks/useWindowSize'

const Mark = ({ origin }) => {
  const element = useRef(null)
  const windowSize = useWindowSize()

  useEffect(() => {
    if (origin) setTransform()
  }, [origin])

  useEffect(() => {
    if (origin) {
      const initialTransition = element.current.style.transition
      element.current.style.transition = '0s'
      setTransform()
      element.current.style.transition = initialTransition
    }
  }, [windowSize])

  const setTransform = () => {
    element.current.style.left = `${origin.offsetLeft}px`
    element.current.style.top = `${origin.offsetTop}px`
    element.current.style.width = `${origin.offsetWidth}px`
    element.current.style.height = `${origin.offsetHeight}px`
  }
  
  return (
    <div ref={element} className='mark' style={{ position: 'absolute', pointerEvents: 'none' }}></div>
  )
}

export default Mark