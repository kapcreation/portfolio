import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '../Tooltip/Tooltip';

const Item = ({ data, control, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    setIsDeleting(false)
  }, [data])

  const handleEdit = (e) => {
    e.preventDefault()
    
    onEdit && onEdit()
  }

  const handleClick = (e) => {
    if (!data.targetUrl) e.preventDefault()
  }

  return (
    <a data-tooltip href={data.targetUrl} target='_blank' id={data.id} className='item' style={isDeleting ? { opacity: '0.5' } : {}} onClick={handleClick}>
      <img src={data.imgUrl} alt="" />
      {
        control && !isDeleting && 
        <button className='close' onClick={handleEdit}>
          <EditIcon className='btn-icon' />
        </button>
      }

      <Tooltip content={data.title} />
    </a>
  )
}

export default Item