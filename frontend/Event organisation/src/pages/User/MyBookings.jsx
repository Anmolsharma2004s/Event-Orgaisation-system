import { useEffect, useState } from "react";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Download,
  TrendingUp,
  Package
} from "lucide-react";
import api from "../../api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (err) {
        console.log("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  // Filter bookings by status
  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status.toLowerCase() === filter);

  // Get status badge
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "confirmed" || statusLower === "approved") {
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        icon: CheckCircle,
        iconColor: "text-green-600"
      };
    } else if (statusLower === "pending") {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        icon: Clock,
        iconColor: "text-yellow-600"
      };
    } else if (statusLower === "cancelled" || statusLower === "rejected") {
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        icon: XCircle,
        iconColor: "text-red-600"
      };
    }
    return {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      icon: AlertCircle,
      iconColor: "text-gray-600"
    };
  };

  // Calculate stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status.toLowerCase() === "confirmed" || b.status.toLowerCase() === "approved").length,
    pending: bookings.filter(b => b.status.toLowerCase() === "pending").length,
    totalSpent: bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Ticket className="text-purple-600" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Bookings
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Track and manage all your event bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-gray-800">{stats.confirmed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-gray-800">₹{stats.totalSpent}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <IndianRupee className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-gray-600" size={18} />
          <p className="font-semibold text-gray-700">Filter by Status:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "confirmed", "pending", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === status
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Ticket className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-xl text-gray-500 font-semibold">
            {filter === "all" 
              ? "You have not booked any events yet." 
              : `No ${filter} bookings found.`}
          </p>
          <p className="text-gray-400 mt-2">Book exciting events to see them here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((b) => {
            const statusConfig = getStatusBadge(b.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div
                key={b._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    {/* Event Info */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {b.eventId?.title || "Event Name"}
                      </h2>
                      
                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                        <StatusIcon size={16} className={statusConfig.iconColor} />
                        <span className="font-semibold text-sm">{b.status}</span>
                      </div>
                    </div>

                    {/* Download/Print Button */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                      <Download size={18} />
                      <span className="font-semibold">Download Ticket</span>
                    </button>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Calendar className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Event Date</p>
                        <p className="text-sm font-bold text-gray-800">
                          {new Date(b.eventId?.date).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-purple-50 rounded-xl p-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <MapPin className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Location</p>
                        <p className="text-sm font-bold text-gray-800">
                          {b.eventId?.location || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Users className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Tickets</p>
                        <p className="text-sm font-bold text-gray-800">{b.tickets} Ticket(s)</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
                        <IndianRupee className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Total Amount Paid</p>
                        <p className="text-2xl font-bold text-gray-800">₹{b.totalAmount}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">Booking ID</p>
                      <p className="text-sm font-mono font-semibold text-gray-700">{b._id.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;