import React from 'react'
import './Dashboard.scss'
import Inventory from '../../components/Inventory/Inventory'
import DashboardIcon from '@mui/icons-material/Dashboard';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const { logout } = useAuth()

  return (
    <div className='dashboard'>
      <h1><DashboardIcon /> Dashboard</h1>
      <button onClick={logout} className='logout'>Logout</button>
      <Inventory control />
    </div>
  )
}

export default Dashboard