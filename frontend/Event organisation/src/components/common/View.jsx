import React from 'react'
import api from '../../api'

const View = ({event ,onClose,onUpdate}) => {

    const approveEvent= async()=>{
     await api.patch(`/events/${event._id}/approve`);
     onUpdate();
    }
    const rejectEvent= async ()=>{
        await api.patch(`/events/${event._id}`, { status: "cancelled" });
    onUpdate();
    }
  return (
    <div className='fixed inset-0 z-50 flex'>View
      <div className=' flex-1 'onClick={onClose}>
        <div className="w-1/2 bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

        <p className="text-gray-600 mb-2">{event.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
          <p><b>Location:</b> {event.location}</p>
          <p><b>Amount:</b> ₹{event.amount}</p>
          <p><b>Strength:</b> {event.strength}</p>
          <p><b>Status:</b> {event.status}</p>
          <p><b>Category:</b> {event.category}</p>
        </div>
        <div className='flex gap-4 mt-6'>
            {event.status === "pending" && (
            <>
              <button
                onClick={approveEvent}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={rejectEvent}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="ml-auto border px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

      </div>
      </div>
      </div>
  )
}

export default View