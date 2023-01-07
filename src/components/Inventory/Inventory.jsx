import React, { useEffect, useRef, useState } from 'react'
import './Inventory.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BrushIcon from '@mui/icons-material/Brush';
import { Link } from 'react-router-dom';
import { getInventoryItems } from '../../firebase';
import Item from './Item';
import Form from './Form'
import AddIcon from '@mui/icons-material/Add';
import Mark from '../Mark';

const Inventory = ({ control }) => {
  const [skills, setSkills] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [filter, setFilter] = useState('all')
  const selects = useRef(null)
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(null)

  const update = () => {
    getInventoryItems('skill').then(data=> setSkills(data))
    getInventoryItems('portfolio').then(data=> setPortfolio(data))
  }

  useEffect(() => {
    update()
  }, [])

  const handleSelect = (e) => {
    if (!e.target.dataset.filter) return

    for (const element of selects.current.children) {
      element.classList.remove('active')
    }
    
    e.target.classList.add('active')
    setFilter(e.target.dataset.filter)
  }

  const openForm = (item) => {
    setItemToEdit(item)

    setFormIsOpen(true)
  }

  const closeForm = () => {
    setItemToEdit(null)

    setFormIsOpen(false)
  }

  return (
    <div className="inventory">
      <div ref={selects} className="selects">
        <button onClick={handleSelect} data-filter='all' className='active'>All</button>
        <button onClick={handleSelect} data-filter='webdev'><DashboardIcon className='btn-icon' /> Web Dev</button>
        <button onClick={handleSelect} data-filter='gamedev'><VideogameAssetIcon className='btn-icon' /> Game Dev</button>
        
        <Mark parent={selects.current} />
      </div>
      <div className="body">
        <div className="group">
          <div className="title">Skills</div>
          <div className="list">
          {skills?.map((item, i) => {
            if (item?.category?.includes(filter) || filter === 'all') 
            return <Item data={item} control={control} onEdit={()=>openForm(item)} update={update} key={i} />
          })}

            {control && <button onClick={()=>openForm()}><AddIcon /></button>}
          </div>
        </div>
        <div className="group">
          <div className="title">Works</div>
          <div className="list">
            {portfolio?.map((item, i) => {
              if (item?.category?.includes(filter) || filter === 'all') 
              return <Item data={item} control={control} onEdit={()=>openForm(item)} update={update} key={i} />
            })}
            
            {control && <button onClick={()=>openForm()}><AddIcon /></button>}
          </div>
        </div>
      </div>

      {formIsOpen && <Form onClose={closeForm} update={update} item={itemToEdit} />}
    </div>
  )
}

export default Inventory