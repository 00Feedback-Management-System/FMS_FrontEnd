import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  
  

  return (
    <>
      <div className='container'>
        <h2 className='page-header text-center mt-3'>Login</h2>
        <div className='login-form'>
          <div className='mb-3'>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <input
              type='checkbox'
              id='remember'
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor='remember' style={{ marginLeft: 8 }}>
              Remember Me
            </label>
          </div>
          <div className='mb-3 text-center '>
            <div className='mb-3'>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button
              className='btn btn-success  '
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login