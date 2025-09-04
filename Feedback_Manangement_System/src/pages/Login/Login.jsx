import React, { useState, useEffect } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle

  // ✅ Load saved credentials if remember me was used
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail")
    const savedPassword = localStorage.getItem("rememberPassword")
    const savedRole = localStorage.getItem("rememberRole")

    if (savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRole(savedRole )
      setRemember(true)
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await api.post('Login', {
        email,
        password,
        role
      })

      if (response.data && response.data.message === "Login successful.") {
        // ✅ If remember me checked → save credentials
        if (remember) {
          localStorage.setItem("rememberEmail", email)
          localStorage.setItem("rememberPassword", password)
          localStorage.setItem("rememberRole", role)
        } else {
          // ❌ Clear if not checked
          localStorage.removeItem("rememberEmail")
          localStorage.removeItem("rememberPassword")
          localStorage.removeItem("rememberRole")
        }

        // ✅ Save user info in localStorage (for session)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        // Redirect to /app
        navigate("/app/feedback-dashboard")
      } else {
        setError("Invalid login details.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid email, password, or role.")
    }
  }

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
          {/* <div className='mb-3'>
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div> */}
              <div className='mb-3' style={{ position: "relative" }}>
      <label>Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? "text" : "password"} // 👈 toggle type
        className='form-control'
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "10px",
          top: "28px",
          cursor: "pointer"
        }}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
          <div className='mb-3'>
            <label>Role</label>
            <select
              className='form-select'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option selected value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="staff">Faculty</option>
              
            </select>
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

          {/* 🔴 Error Message */}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <div className='mb-3 text-center '>
            <div className='mb-3'>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button
              className='btn btn-success'
              onClick={handleLogin}
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
