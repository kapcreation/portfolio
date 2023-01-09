import React, { useState } from 'react'
import './Home.scss'
import Header from '../../components/Header/Header'
import Inventory from '../../components/Inventory/Inventory'
import ContactForm from '../../components/ContactForm/ContactForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const notify = () => toast('Thank you for getting in touch!');

  return (
    <div className='home'>
      <Header onContact={()=>setFormIsOpen(true)} onDownloadCv={()=>toast('CV unavailable')} />
      <Inventory />
      {formIsOpen && <ContactForm isOpen={formIsOpen} onClose={()=>setFormIsOpen(false)} onSubmit={()=>notify()} />}
      <ToastContainer />
    </div>
  )
}

export default Home