import React, { useEffect, useState } from "react";
import { 
  CalendarDays, 
  IndianRupee, 
  MapPin, 
  Users, 
  Clock,
  Tag,
  TrendingUp,
  Calendar,
  Sparkles
} from "lucide-react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events/approved");
        setEvents(res.data);
      } catch (err) {
        console.log("Error fetching events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(events.map(e => e.category))];

  // Filter events
  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(e => e.category === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading Amazing Events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-purple-600" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Events
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Explore and book exciting events happening around you</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{events.length}</p>
              <p className="text-xs text-gray-500">Total Events</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{categories.length - 1}</p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center gap-2">
            <Users className="text-purple-600" size={20} />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {events.reduce((sum, e) => sum + (e.strength || 0), 0)}
              </p>
              <p className="text-xs text-gray-500">Total Seats</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center gap-2">
            <Clock className="text-orange-600" size={20} />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {events.filter(e => new Date(e.date) > new Date()).length}
              </p>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="text-gray-600" size={18} />
          <p className="font-semibold text-gray-700">Filter by Category:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-xl text-gray-500 font-semibold">No events available right now.</p>
          <p className="text-gray-400 mt-2">Check back soon for exciting events!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="p-6 flex flex-col h-full">
                {/* Title & Category */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
                    {event.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                {/* Info Grid */}
                <div className="mt-auto space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                      <CalendarDays className="text-blue-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {new Date(event.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
                      <IndianRupee className="text-green-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-semibold text-gray-800">₹{event.amount}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-purple-50 rounded-lg p-2">
                      <MapPin className="text-purple-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-2">
                      <Users className="text-orange-600" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Seats</p>
                        <p className="text-sm font-semibold text-gray-800">{event.strength}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate(`${event._id}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                  >
                    View Details & Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;