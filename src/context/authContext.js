import React, { createContext, useEffect, useState } from "react";
import { auth, loginWithGoogle, logout } from "../firebase";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = () => {
    setLoading(true)

    return loginWithGoogle()
  }

  const handleLogout = () => {
    setLoading(true)

    return logout()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])
  
  const value = { currentUser, login, logout: handleLogout }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}