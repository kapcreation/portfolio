import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { deleteInventoryItem } from '../../firebase';

const Item = ({ data, control, update }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setIsDeleting(false)
  }, [data])
  

  const handleDelete = async () => {
    setIsDeleting(true)
    if (isDeleting) return
    
    await deleteInventoryItem(data.id)

    update()
  }

  return (
    <div className='item' style={isDeleting ? { opacity: '0.5' } : {}}>
      <img src={data.imgUrl} alt="" />
      {control && !isDeleting && <button className='close' onClick={handleDelete}><CloseIcon className='btn-icon' /></button>}
    </div>
  )
}

export default Item