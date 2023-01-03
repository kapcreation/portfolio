import React, { useEffect, useRef, useState } from 'react'
import './Inventory.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BrushIcon from '@mui/icons-material/Brush';
import AddItemButton from './AddItemButton/AddItemButton';
import { Link } from 'react-router-dom';
import { getInventoryItems } from '../../firebase';
import Item from './Item';

const Inventory = ({ control }) => {
  const [skills, setSkills] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [filter, setFilter] = useState('all')
  const selects = useRef(null)

  const update = () => {
    getInventoryItems('skill').then(data=> setSkills(data))
    getInventoryItems('portfolio').then(data=> setPortfolio(data))
  }

  useEffect(() => {
    update()
  }, [])

  const handleSelect = (e) => {
    if (!e.target.dataset.value) return

    for (const element of selects.current.children) {
      element.classList.remove('active')
    }
    
    e.target.classList.add('active')
    setFilter(e.target.dataset.value)
  }

  return (
    <div className="inventory">
      <div ref={selects} className="selects">
        <button onClick={handleSelect} data-value='all' className='active'>All</button>
        <button onClick={handleSelect} data-value='webdev'><DashboardIcon className='btn-icon' /> Web Dev</button>
        <button onClick={handleSelect} data-value='gamedev'><VideogameAssetIcon className='btn-icon' /> Game Dev</button>
        <button onClick={handleSelect} data-value='digiart'><BrushIcon className='btn-icon' /> Digital Art</button>
      </div>
      <div className="body">
        <div className="group">
          <div className="title">Skills</div>
          <div className="list">
          {skills?.map((item, i) => {
            if (item?.category?.includes(filter) || filter === 'all') return <Item data={item} control={control} update={update} key={i} />
          })}

            {control && <AddItemButton update={update} />}
          </div>
        </div>
        <div className="group">
          <div className="title">Works</div>
          <div className="list">
            {portfolio?.map((item, i) => {
              if (item?.category?.includes(filter) || filter === 'all') return <Item data={item} control={control} update={update} key={i} />
            })}
            
            {control && <AddItemButton update={update} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory