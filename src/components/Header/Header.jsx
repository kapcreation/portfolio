import React, { useContext } from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ThemeContext } from '../../context/themeContext';

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext)

  return (
    <div className="header">
      <div className="img-container">
        <img src={logo} alt="" />
      </div>
      <div className='body'>
        <h1 className='title'>Hi! I'm <span>KAP</span>👋</h1>
        <p className='info'>Web developer | Game developer</p>
        <div className="btns">
          <button>Download CV</button>
          <button>Contact</button>
        </div>
      </div>
      
      <button className='theme-btn' onClick={toggleTheme}><DarkModeOutlinedIcon className='btn-icon' /><WbSunnyIcon className='btn-icon' /></button>
    </div>
  )
}

export default Header