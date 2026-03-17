import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api'

const Login = ({ switchToRegister }) => {
  const navigate = useNavigate() 
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') 
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      console.log('Login Response:', response)
      const userData=response.data.User;

      localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify(userData));

      const role = userData?.role || userData.role

      if (role === 'admin') {
        navigate('/admin/admindashboard')
      } else  if(role === 'user') {
        navigate('/user/dashboard')
      } 
    } catch (err) {
      console.error('Login Error:', err)
      

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.message) {
        setError(err.message)
      } else {
        setError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col w-full items-center justify-center min-h-screen'>
      <div className='bg-white shadow-lg rounded-lg px-5 py-4 w-full h-auto max-w-md'>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        
      
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <p className='text-sm'>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
        
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Email</label>
            <input 
              type='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' 
              className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 focus:border-transparent'
              required
              disabled={loading}
            />
          </div>

          
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Password</label>
            <input 
              type='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password' 
              className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 focus:border-transparent'
              required
              disabled={loading}
            />
          </div>
          <button 
            type='submit' 
            disabled={loading}
            className='bg-blue-500 text-white font-semibold py-3 rounded-md mt-2 hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Don't have an account? {' '}
            {switchToRegister ? (
              <button 
                onClick={switchToRegister}
                className='text-blue-500 font-medium hover:underline'
              >
                Register
              </button>
            ) : (
              <Link to='/register' className='text-blue-500 font-medium hover:underline'>
                Register
              </Link>
            )}
          </p>
        </div>

      
        <div className='mt-4 text-center'>
          <Link to='/forgot-password' className='text-sm text-blue-500 hover:underline'>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login