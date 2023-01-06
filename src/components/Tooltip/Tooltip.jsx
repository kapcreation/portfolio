import React from 'react'
import './Tooltip.scss'

const Tooltip = ({ content }) => {
  return (
    <div className='tooltip'>
      <span>
        {content}
      </span>
    </div>
  )
}

export default Tooltip