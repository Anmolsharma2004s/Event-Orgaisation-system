import React, { useState } from 'react'
import api from '../../api';

const Register = ({ switchToLogin, onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', {username, email, password});
      console.log(username,email,password);

       const data = response.data;
       console.log('register susscesful', data)
      
    
      if (data.User?.token) {
        localStorage.setItem('token', data.User.token);
      }
      
      setSuccess(true);
      
      if (onRegisterSuccess) {
        onRegisterSuccess(data);
      }
      
    } catch (err) {
      console.log(err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className='flex flex-col w-full items-center justify-center min-h-screen'>
        <div className='bg-white shadow-lg rounded-lg px-5 py-4 w-full max-w-md'>
          <div className='text-center'>
            <div className='text-green-500 text-5xl mb-4'>✓</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Registration Successful!</h2>
            <p className='text-gray-600 mb-6'>Your account has been created successfully.</p>
            {switchToLogin && (
              <button 
                onClick={switchToLogin}
                className='bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-200'
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full items-center justify-center min-h-screen bg-gray-50'>
      <div className='bg-white shadow-lg rounded-lg px-5 py-4 w-full max-w-md'>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Register</h2>
        
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm'>
            {error}
          </div>
        )}
        
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Name</label>
            <input 
              type='text' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your name' 
              className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
              disabled={loading}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Email</label>
            <input 
              type='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' 
              className='border border-gray-300 rounded-md px-4 py-3  text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
              className='border border-gray-300  rounded-md px-4 py-3  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required
              disabled={loading}
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || !username || !email || !password}
            className='bg-blue-500 text-white font-semibold py-3 rounded-md mt-2 hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed'
          >
            {loading ? 'Registering...' : 'Register User'}
          </button>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            {switchToLogin && (
              <button 
                onClick={switchToLogin} 
                className='text-blue-500 font-medium hover:underline focus:outline-none'
              >
                Login
              </button>
            )}
          </p>
        </div>

        <div className='mt-4 text-center'>
          <button 
            onClick={() => alert('Forgot password functionality')}
            className='text-sm text-blue-500 hover:underline focus:outline-none'
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register