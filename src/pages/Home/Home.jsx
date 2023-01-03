import React from 'react'
import './Home.scss'
import Header from '../../components/Header/Header'
import Inventory from '../../components/Inventory/Inventory'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <Inventory />
    </div>
  )
}

export default Home