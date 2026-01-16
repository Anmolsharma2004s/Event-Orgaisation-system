
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import About from './pages/common/About'
import Event from './pages/common/Event'
import Contact from './pages/common/Contact'
import Home from './pages/common/Home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Admindashboard from './pages/admin/adminDashboard'
import UserDashboard from './pages/User/UserDashboard'
import CheckAuth from './components/auth/checkAuth'
import { useEffect, useState } from 'react'

import RegisterEvents from './pages/User/RegisterEvents.jsx'
import AllEvents from './pages/User/AllEvents'
import UserEventDetaile from './pages/common/userEventDetaile'
import MyBookings from './pages/User/MyBookings'
import Dashboard from './pages/User/dashboard.jsx'
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user,setUser]=useState(null);
  const [isLoading,setIsLoading]=useState(true);


  useEffect(() => {
    const token=localStorage.getItem('token');
    const userData=localStorage.getItem('user');
    if(token && userData){
      setisAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, [])
  
  return (
    <>
      <h1>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/events' element={<Event/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>} />

          {/* proteced routes */}
          <Route path='/admin/admindashboard' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Admindashboard/></CheckAuth>} />
         
          <Route path='/user/dashboard' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><UserDashboard/></CheckAuth>}>

          
          <Route path='registerEvents' element={<RegisterEvents/>}/>
          <Route path="allEvents" element={<AllEvents />} />
         <Route path="allEvents/:id" element={<UserEventDetaile/>} />
          <Route path="my-bookings" element={<MyBookings/>}/>  
          <Route path='dashboard' element={<Dashboard/>}/>
     </Route>
        </Routes>
      </h1>
       
    </>
  )
}

export default App
