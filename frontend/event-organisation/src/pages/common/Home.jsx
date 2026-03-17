import AnimatedBackground from '../../components/common/AnimatedBackground'
import Login from '../../components/auth/Login'
import Register from '../../components/auth/Register'
import { useState } from 'react'

const Home = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      
      <aside className='w-full md:w-[60%] relative overflow-hidden'>
        <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 md:px-12">
          <AnimatedBackground />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Event Organizer System
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Plan, Manage & Host events seamlessly!
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
                <div className="text-3xl mb-2">📅</div>
                <h3 className="font-semibold mb-1">Easy Planning</h3>
                <p className="text-sm text-gray-300">Create and manage events effortlessly</p>
              </div>

              <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold mb-1">Track Attendees</h3>
                <p className="text-sm text-gray-300">Monitor registrations in real-time</p>
              </div>

              <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold mb-1">Analytics</h3>
                <p className="text-sm text-gray-300">Get insights on your events</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Section */}
      <aside className='w-full md:w-[40%] bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-700 text-white'>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          {isLogin ? (
              <Login switchToRegister={() => setIsLogin(false)} />
            ) : (
              <Register switchToLogin={() => setIsLogin(true)} />
            )}
        </div>
      </aside>
    </div>
  )
}

export default Home
