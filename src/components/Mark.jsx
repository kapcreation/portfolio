import React, { useEffect, useRef, useState } from 'react'
import useWindowSize from '../hooks/useWindowSize'

const Mark = ({ parent }) => {
  const element = useRef(null)
  const [anchor, setAnchor] = useState(null)
  const windowSize = useWindowSize()

  useEffect(() => {
    if (parent) {
      for (let btn of parent.children) {
        btn.onclick = (e)=>setAnchor(e.target)
      }
  
      setAnchor(parent.children[0])
    }
  }, [parent]);

  useEffect(() => {
    if (anchor) setTransform()
  }, [anchor])

  useEffect(() => {
    if (anchor) {
      const initialTransition = element.current.style.transition
      element.current.style.transition = '0s'
      setTransform()
      element.current.style.transition = initialTransition
    }
  }, [windowSize])

  const setTransform = () => {
    element.current.style.left = `${anchor.offsetLeft}px`
    element.current.style.top = `${anchor.offsetTop}px`
    element.current.style.width = `${anchor.offsetWidth}px`
    element.current.style.height = `${anchor.offsetHeight}px`
  }
  
  return (
    <div ref={element} className='mark' style={{ position: 'absolute', pointerEvents: 'none' }}></div>
  )
}

export default Mark