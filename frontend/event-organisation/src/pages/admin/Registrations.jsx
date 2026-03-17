import { useEffect, useState } from "react";
import api from "../../api";

const Registrations = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/all");
      setBookings(res.data);
    } catch (err) {
      console.log("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Registrations</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white shadow rounded-lg p-4"
            >
              <p><b>User:</b> {b.userId?.username} ({b.userId?.email})</p>
              <p><b>Event:</b> {b.eventId?.title}</p>
              <p><b>Tickets:</b> {b.tickets}</p>
              <p><b>Total Amount:</b> ₹{b.totalAmount}</p>
              <p><b>Booking Date:</b> {new Date(b.createdAt).toLocaleDateString()}</p>
              <p><b>Status:</b> {b.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Registrations;
