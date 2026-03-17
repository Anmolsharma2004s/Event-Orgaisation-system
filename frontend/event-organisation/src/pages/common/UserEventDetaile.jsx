import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { 
  CalendarDays, 
  MapPin, 
  IndianRupee, 
  Users, 
  Ticket,
  Clock,
  Tag,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ShoppingCart
} from "lucide-react";

const UserEventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBookEvent = async () => {
    if (tickets < 1) {
      alert("Please select at least 1 ticket");
      return;
    }

    setBookingLoading(true);
    try {
      await api.post("/bookings", {
        eventId: event._id,
        tickets: Number(tickets),
      });
      alert("Event booked successfully! 🎉");
      navigate("/user/dashboard/my-bookings");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.log("Error fetching event details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
          <p className="text-2xl text-gray-700 font-bold mb-4">Event not found</p>
          <button
            onClick={() => navigate("/user/dashboard/all-events")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = event.amount * tickets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 lg:p-10">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/user/dashboard/all-events")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-md hover:shadow-lg font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Events
      </button>

      <div className="max-w-5xl mx-auto">
        
        {/* Event Header Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          {/* Gradient Top Border */}
          <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8 lg:p-12">
            {/* Title & Category */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-purple-600" size={32} />
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {event.title}
                  </h1>
                </div>
                <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-200">
                  <Tag size={16} />
                  {event.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <AlertCircle className="text-blue-600" size={20} />
                About This Event
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-4 bg-blue-50 rounded-xl p-5 border-2 border-blue-100">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <CalendarDays className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">Event Date</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(event.date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-purple-50 rounded-xl p-5 border-2 border-purple-100">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <MapPin className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">Location</p>
                  <p className="text-lg font-bold text-gray-800">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-50 rounded-xl p-5 border-2 border-green-100">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <IndianRupee className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">Price per Ticket</p>
                  <p className="text-lg font-bold text-gray-800">₹{event.amount}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-orange-50 rounded-xl p-5 border-2 border-orange-100">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <Users className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">Available Seats</p>
                  <p className="text-lg font-bold text-gray-800">{event.strength} Seats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>
          
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="text-green-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-800">Book Your Tickets</h2>
            </div>

            {/* Ticket Selection */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-100">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Ticket className="text-purple-600" size={20} />
                Number of Tickets
              </label>
              <input
                type="number"
                min="1"
                max={event.strength}
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                className="w-full border-2 border-blue-300 rounded-xl p-4 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
                placeholder="Enter number of tickets"
              />
              <p className="text-sm text-gray-600 mt-2">Maximum {event.strength} tickets available</p>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mb-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-semibold">Price per Ticket:</span>
                <span className="text-gray-800 font-bold text-lg">₹{event.amount}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-semibold">Number of Tickets:</span>
                <span className="text-gray-800 font-bold text-lg">{tickets}</span>
              </div>
              <div className="border-t-2 border-green-300 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-bold text-xl flex items-center gap-2">
                    <IndianRupee size={24} className="text-green-600" />
                    Total Amount:
                  </span>
                  <span className="text-3xl font-bold text-green-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookEvent}
              disabled={bookingLoading || tickets < 1}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                bookingLoading || tickets < 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white transform hover:scale-105"
              }`}
            >
              {bookingLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={24} />
                  Confirm Booking
                </>
              )}
            </button>

            {/* Additional Info */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                <span>
                  By booking this event, you agree to the terms and conditions. 
                  You will receive a confirmation email with your ticket details.
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserEventDetails;