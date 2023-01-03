import React from 'react'
import './Dashboard.scss'
import Inventory from '../../components/Inventory/Inventory'
import DashboardIcon from '@mui/icons-material/Dashboard';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1><DashboardIcon /> Dashboard</h1>
      <Inventory control />
    </div>
  )
}

export default Dashboard