import React from 'react'
import './Login.scss'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await login()
    navigate('/')
  }

  return (
    <div className='login'>
      <button onClick={handleLogin}>Login With Google</button>
    </div>
  )
}

export default Login