import React from 'react'
import { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

function Forgot_Password() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')  

  return (
    <div className='container'>
      <h2 className='page-header text-center mt-3'>Forgot Password</h2>
      <div className='login-form'>
       
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3 text-center'>
          <div className='mb-3'>
            Already have an account yet? <Link to='/'>Login here</Link>
          </div>
          <button
            className='btn btn-success'
          >
            Update
          </button>
          <button
            className='btn btn-warning'
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Forgot_Password