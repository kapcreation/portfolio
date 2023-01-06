import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const Item = ({ data, control, onEdit, update }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setIsDeleting(false)
  }, [data])

  const handleEdit = () => {
    onEdit && onEdit()
  }

  return (
    <>
      <div id={data.id} className='item' style={isDeleting ? { opacity: '0.5' } : {}}>
        <img src={data.imgUrl} alt="" />
        {
          control && !isDeleting && 
          <button className='close' onClick={handleEdit}>
            <EditIcon />
          </button>
        }
      </div>
      <Tooltip anchorId={data.id} content={data.title} place="top" className='tooltip' />
    </>
  )
}

export default Item