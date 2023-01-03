import { createContext, useEffect, useRef, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const themeRef = useRef(null)

  const toggleTheme = (e) => {
    themeRef.current.classList.toggle('dark-theme')

    e.target.classList.remove('active')
    
    if (themeRef.current.classList.contains('dark-theme')) {
      e.target.classList.add('active')

      localStorage.setItem('dark-theme', true)
    } else {
      localStorage.setItem('dark-theme', false)
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('dark-theme'))) themeRef.current.classList.add('dark-theme')
  }, [themeRef])
  
  return (
    <ThemeContext.Provider value={{ themeRef, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}