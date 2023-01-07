import React, { useState } from 'react'
import './Home.scss'
import Header from '../../components/Header/Header'
import Inventory from '../../components/Inventory/Inventory'
import ContactForm from '../../components/ContactForm/ContactForm'

const Home = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)

  return (
    <div className='home'>
      <Header setFormIsOpen={setFormIsOpen} />
      <Inventory />
      {formIsOpen && <ContactForm isOpen={formIsOpen} onClose={()=>setFormIsOpen(false)} />}
    </div>
  )
}

export default Home