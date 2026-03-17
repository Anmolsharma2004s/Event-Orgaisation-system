import { Link } from "react-router-dom"
import api from '../../api'
import { useState } from "react"

const Navbar = () => {
  const [Logout, setLogut] = useState('Logout succsseful')
   
  const handlLogout=async()=>{
    try{
     const r=await api.post('/auth/logout');

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(r);
    setLogut(Logout)

    window.location.href = "/login";
  
}
catch(err){
    console.log(err);
}
  }
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600">
      <nav className="flex flex-row mx-3 justify-between items-center px-7 py-5 h-16">
        <div className="ml-4">
          <h1 className="text-white text-xl font-bold">Event Organisation</h1>
        </div>
        <div className="flex justify-between gap-6 items-center">
          <Link to="/" className="text-white hover:text-blue-200 transition duration-200">Home</Link>
          <Link to="/about" className="text-white hover:text-blue-200 transition duration-200">About</Link>
          <Link to="/events" className="text-white hover:text-blue-200 transition duration-200">Events</Link>
          <Link to="/contact" className="text-white hover:text-blue-200 transition duration-200">Contact</Link>
        </div>
        <div className="mr-4">
          <button onClick={handlLogout} className="bg-white text-blue-600 hover:bg-blue-100 font-semibold px-6 py-2 rounded-lg transition duration-200">
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar