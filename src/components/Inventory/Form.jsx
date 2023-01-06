import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { addInventoryItem, updateInventoryItem, deleteInventoryItem } from '../../firebase'

const Form = ({ update, onClose, item }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const initialData = {
    file: null,
    title: '',
    group: '',
    category: [],
    targetUrl: ''
  }
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  
  const passwordInput = useRef(null)

  useEffect(() => {
    if (item) {
      setData({
        title: item.title,
        group: item.group,
        category: item.category.join(', '),
        targetUrl: item.targetUrl
      })
    }
  }, [item])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    if (isLoading) return

    const { file, title, group, category, targetUrl } = data
    
    if ((!item && !file) || !title || !group || !category) {
      console.error('Error: Incomplete data!')
      setMsg('Error: Incomplete data!')
      setIsLoading(false)
      return
    }
    if (passwordInput.current.value !== process.env.REACT_APP_ADMIN_PASSWORD) {
      console.error('Error: Wrong password!')
      setMsg('Error: Wrong password!')
      setIsLoading(false)
      return
    }

    const modifiedData = { ...data, category: data.category.split(', ') }
    
    !item ? 
    await addInventoryItem(modifiedData) 
    : 
    await updateInventoryItem(item, modifiedData)

    clear() 
    setIsLoading(false)
    update()
    close()
  }

  const clear = () => {
    setData(initialData)
  }

  const close = () => {
    onClose && onClose()
  }

  const handleInput = (e) => {
    if (e.target.type === 'file') 
      setData(prev=>({...prev, [e.target.name]: e.target.files[0]})) 
    else 
      setData(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const deleteItem = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    if (isLoading) return

    if (passwordInput.current.value !== process.env.REACT_APP_ADMIN_PASSWORD) {
      console.error('Error: Wrong password!')
      setMsg('Error: Wrong password!')
      setIsLoading(false)
      return
    }
    
    await deleteInventoryItem(item.id)

    clear()
    setIsLoading(false)
    update()
    close()
  }

  return (
    <div className='form'>
      <h2 className='title'>{!item ? 'Add new item' : 'Edit an item'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='titleInput'>Title</label>
          <input type="text" name="title" id='titleInput' value={data.title} onChange={handleInput} />
        </div>
        <div>
          <label htmlFor='groupSelect'>Group</label>
          <select name="group" id="groupSelect" value={data.group} onChange={handleInput}>
            <option value="">None</option>
            <option value="skill">Skill</option>
            <option value="portfolio">Portfolio</option>
          </select>
        </div>
        <div>
          <label htmlFor='categoryInput'>Category</label>
          <input type="text" name="category" id='categoryInput' value={data.category} onChange={handleInput} />
        </div>
        <div>
          <label htmlFor='fileInput'>Icon</label>
          <label htmlFor='fileInput'>
            <input type="file" name="file" id='fileInput' onChange={handleInput} style={{ display: 'none' }} />
            <div className='img-input'>
              {data.file || item ? <img src={data.file ? URL.createObjectURL(data.file) : item.imgUrl} alt="" /> : <>Select file</>}
            </div>
          </label>
        </div>
        <div>
          <label htmlFor='targetUrlInput'>Target Url</label>
          <input type="text" name="targetUrl" id='targetUrlInput' value={data.targetUrl} onChange={handleInput} />
        </div>
        <div>
          <label htmlFor='passwordInput'>Password</label>
          <input ref={passwordInput} type="text" name="password" id='passwordInput' />
        </div>
        {
          !isLoading ?
          <>
            <button className='add'>{!item ? 'Add Item' : 'Update'}</button>
            {item && <button onClick={deleteItem} className='delete'>Delete item</button>}
          </>
          :
          'Loading...'
        }
      </form>
      <button onClick={close} className='close'><CloseIcon /></button>
      {msg && msg}
    </div>
  )
}

export default Form