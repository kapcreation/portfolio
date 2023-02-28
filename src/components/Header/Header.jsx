import React, { useContext } from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'
import github from '../../assets/github.png'
import phone from '../../assets/phone.png'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ThemeContext } from '../../context/themeContext';
import Typewriter from '../Typewriter'

const Header = ({ onContact }) => {
  const { toggleTheme } = useContext(ThemeContext)

  return (
    <div className="header">
      <div className="img-container">
        <img src={logo} alt="" />
      </div>
      <div className='body'>
        <h1 className='title'>Hi! I'm <span>KAP</span>👋</h1>
        <p className='info'>
          <Typewriter text='Web developer | Game developer' />
        </p>
        <div className="btns">
          <button onClick={onContact}>
            <img src={phone} alt="" />
          </button>
          <a href="https://github.com/kapcreation" target="_blank">
            <img src={github} alt="" />
          </a>
        </div>
      </div>
      
      <button className='theme-btn' onClick={toggleTheme}><DarkModeOutlinedIcon className='btn-icon' /><WbSunnyIcon className='btn-icon' /></button>
    </div>
  )
}

export default Header