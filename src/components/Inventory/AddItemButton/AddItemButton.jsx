import React, { useRef, useState } from 'react'
import './AddItemButton.scss'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addInventoryItem } from '../../../firebase'

const AddItemButton = ({ update }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  
  const groupSelect = useRef(null)
  const categoryInput = useRef(null)
  const targetUrlInput = useRef(null)
  const passwordInput = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsAdding(true)
    if (isAdding) return

    if (!file && !targetUrlInput.current.value) return

    const data = { 
      group: groupSelect.current.value, 
      category: categoryInput.current.value, 
      file: file, 
      targetUrl: targetUrlInput.current.value 
    }
    await addInventoryItem(data, passwordInput.current.value)

    clear()
    setModalIsOpen(false)

    setIsAdding(false)

    update()
  }

  const clear = () => {
    setFile(null)
    categoryInput.current.value = ''
    targetUrlInput.current.value = ''
    passwordInput.current.value = ''
  }

  return (
    <>
      <button onClick={()=>setModalIsOpen(true)}><AddIcon /></button>
      {modalIsOpen && <div className='add-item-modal'>
        <h2 className='title'>Add new item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='groupSelect'>Group</label>
            <select ref={groupSelect} name="group" id="groupSelect">
              <option value="skill">Skill</option>
              <option value="portfolio">Portfolio</option>
            </select>
          </div>
          <div>
            <label htmlFor='categoryInput'>Category</label>
            <input ref={categoryInput} type="text" name="category" id='categoryInput' />
          </div>
          <div>
            <label htmlFor='fileInput'>Icon</label>
            <label htmlFor='fileInput'>
              <input type="file" name="file" id='fileInput' onChange={e=>setFile(e.target.files[0])} style={{ display: 'none' }} />
              <div className='img-input'>
                {file ? <img src={URL.createObjectURL(file)} alt="" /> : <>Select file</>}
              </div>
            </label>
          </div>
          <div>
            <label htmlFor='targetUrlInput'>Target Url</label>
            <input ref={targetUrlInput} type="text" name="targetUrl" id='targetUrlInput' />
          </div>
          <div>
            <label htmlFor='passwordInput'>Password</label>
            <input ref={passwordInput} type="text" name="password" id='passwordInput' />
          </div>
          <button>{!isAdding ? 'Add Item' : 'Adding...'}</button>
        </form>
        <button onClick={()=>setModalIsOpen(false)} className='close'><CloseIcon /></button>
      </div>}
    </>
  )
}

export default AddItemButton