import { Eye, User, Calendar, Package, IndianRupee } from "lucide-react";
import api from "../../api";
import { useState, useEffect } from "react";
import AddEvent from "../../components/common/AddEvent";
import View from "../../components/common/View";

const Events = () => {

  const [events, setEvents] = useState([]);
  const [showAddEvent, setshowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showView, setShowView] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      console.log(res.data);
      setEvents(res.data);
    } catch (err) {
      console.log("Error while fetching events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const statusColor = {
    upcoming: "bg-yellow-100 text-yellow-700",
    ongoing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl text-black shadow-lg">
      <div className=" flex  justify-between ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Package size={24} className="text-blue-600" />
        Events / Booking Requests
      </h2>
      <button onClick={()=>setshowAddEvent(true)} className=" text-2xl border rounded-full items center p-3 font-bold text-white bg-blue-700 hover:bg-blue-500 transform-border cursor-pointer mb-4">
        Add Events
      </button>

      {
        showAddEvent && (
          <div className="flex inset-0 fixed z-50 ">
           {/* overlay */}
            <div className="flex-1 " onClick={()=>setshowAddEvent(false)}>
              </div>
              <div className=" w-1/2 bg-white p-6 shadow-xl animate-slideIn">
               <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Event</h2>
        <button
          onClick={() => setshowAddEvent(false)}
          className="text-xl text-gray-500"
        >
          ✕
        </button>
        </div>
        <AddEvent onSuccess={()=>{
          setshowAddEvent(false);
          fetchEvents();
        }}/>
              </div>

          </div>
        )
      }
</div>
      
      <div className="overflow-x-auto">
        <table className="w-full  border-collapse">
          <thead className="">
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-4">Event ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
              <th className="p-4">Venue</th>
            </tr>
          </thead>
          <tbody>
  {events.map((event) => (
    <tr key={event._id} className="border-b hover:bg-gray-50">

      <td className="p-4 font-semibold">{event.eventId}</td>

      <td className="p-4">
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-500" />
          Admin
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-1 font-medium">
          <IndianRupee size={16} />
          {event.amount}
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          {new Date(event.date).toLocaleDateString()}
        </div>
      </td>

      <td className="p-4">{event.location}</td>

      <td className="p-4">
        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${statusColor[event.status]}`}>
          {event.status}
        </span>
      </td>

      <td className="p-4 text-center">
        <button onClick={()=>{
          setSelectedEvent(event);
          setShowView(true);
        }} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Eye size={18} />
          View
        </button>
      </td>

    </tr>
  ))}
</tbody>

        </table>
      </div>
      {showView && selectedEvent &&(
        <View event={selectedEvent}
        onClose={()=>{
          setShowView(false);
        }}
          onUpdate={()=>{
           setShowView(false);
           fetchEvents();
          }}
        />
      )}
    </div>
  );
};

export default Events;
