import React, { useState } from 'react'
import api from '../../api'

const AddEvent = ({onSuccess}) => {
    const [form, setform] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    amount: "",
    strength: "",
    category: "Tech",
    })

    const handleChange =(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{
        await  api.post("/events",form);
          onSuccess();

        } 
        catch(err){
       alert("failed to  create Event")
        }
        

    }
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-between gap-4  '>
        <input onChange={handleChange} name="title" placeholder='Enter the title' className='border-2 rounded h-[40px] p-2'/>
        <textarea  onChange={handleChange} name='description' placeholder='Enter the Descripton 'className='border-2 rounded h-[80px] p-2'></textarea>
        <input  onChange={handleChange}type='date' name='date' className='border-2 rounded h-[40px] p-2'/>
        <input onChange={handleChange} name='location' placeholder='Loaction' className='border-2 rounded h-[40px] p-2'/>
        <input onChange={handleChange} name='amount'  type='number' placeholder='Enter the Amount' className='border-2 rounded h-[40px] p-2'/>
        <input onChange={handleChange} name='strength' type='number' placeholder='Enter the Strength' className='border-2 rounded h-[40px] p-2'/>
        <select onChange={handleChange} name='category' className='border-2 rounded h-[40px] p-2'>
            <option>Tech</option>
            <option>Music</option>
            <option>Sports</option>
            <option>Workshop</option>
        </select>
        <button className=' bg-blue-600 h-[30px] rounded-2xl hover:bg-blue-500 cursor-pointer  text-white '>
            Create Event
        </button>
    </form>
  )
}

export default AddEvent