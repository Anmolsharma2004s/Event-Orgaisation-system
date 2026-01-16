import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Ticket,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  Sparkles,
  X,
  Package,
  BarChart3,
  AlertCircle,
  Award,
  Target,
} from "lucide-react";
import { useState } from "react";
import RegisterEvents from "./RegisterEvents";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="text-purple-600" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Welcome back! Here's your event overview</p>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => navigate("/user/dashboard/allEvents")}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Calendar size={20} />
          Browse All Events
        </button>

        <button
          onClick={() => navigate("/user/dashboard/my-bookings")}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Ticket size={20} />
          My Bookings
        </button>

        <button
          onClick={() => setShowRegisterForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={20} />
          Request Event
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Events"
          value="24"
          color="from-blue-500 to-blue-600"
          icon={<Calendar className="w-6 h-6" />}
          note="+12% from last month"
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Approved"
          value="18"
          color="from-green-500 to-green-600"
          icon={<CheckCircle className="w-6 h-6" />}
          note="75% approval rate"
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending"
          value="6"
          color="from-orange-500 to-orange-600"
          icon={<Clock className="w-6 h-6" />}
          note="Awaiting review"
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickStatCard
          label="Active Events"
          value="12"
          icon={<Package className="text-blue-600" size={20} />}
        />
        <QuickStatCard
          label="Completed"
          value="15"
          icon={<Award className="text-green-600" size={20} />}
        />
        <QuickStatCard
          label="This Month"
          value="8"
          icon={<BarChart3 className="text-purple-600" size={20} />}
        />
        <QuickStatCard
          label="Success Rate"
          value="92%"
          icon={<Target className="text-orange-600" size={20} />}
        />
      </div>

      {/* RECENT EVENTS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Recent Event Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Event Name</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Date</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Annual Tech Conference", date: "Dec 15, 2024", status: "Approved" },
                { name: "Team Building Workshop", date: "Dec 20, 2024", status: "Pending" },
                { name: "Holiday Party 2024", date: "Dec 25, 2024", status: "Approved" },
                { name: "Networking Meetup", date: "Jan 10, 2025", status: "Pending" },
              ].map((event, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-800">{event.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{event.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                        event.status === "Approved"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-orange-100 text-orange-800 border-orange-200"
                      }`}
                    >
                      {event.status === "Approved" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          title="Need Help?"
          text="Check out our event planning guide or contact support for assistance."
          icon={<Users className="w-6 h-6" />}
          color="from-purple-50 to-purple-100"
          borderColor="border-purple-200"
          buttonColor="bg-purple-600 hover:bg-purple-700"
          iconBg="bg-purple-600"
        />
        <InfoCard
          title="Upcoming Events"
          text="You have 3 events scheduled in the next 30 days. Stay prepared!"
          icon={<Calendar className="w-6 h-6" />}
          color="from-pink-50 to-pink-100"
          borderColor="border-pink-200"
          buttonColor="bg-pink-600 hover:bg-pink-700"
          iconBg="bg-pink-600"
        />
      </div>

      {/* REGISTER EVENT MODAL */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowRegisterForm(false)}
              className="sticky top-4 float-right mr-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <RegisterEvents onClose={() => setShowRegisterForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

/* ---------------- STAT CARD COMPONENT ---------------- */
const StatCard = ({ title, value, note, icon, color, bgColor, iconColor }) => (
  <div className={`rounded-2xl p-6 text-white bg-gradient-to-br ${color} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm opacity-90 font-medium mb-1">{title}</p>
        <h3 className="text-4xl font-bold">{value}</h3>
      </div>
      <div className="bg-white bg-opacity-20 p-3 rounded-xl shadow-lg">
        {icon}
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm opacity-90 font-medium">
      <TrendingUp size={16} />
      {note}
    </div>
  </div>
);

/* ---------------- QUICK STAT CARD ---------------- */
const QuickStatCard = ({ label, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  </div>
);

/* ---------------- INFO CARD COMPONENT ---------------- */
const InfoCard = ({ title, text, icon, color, borderColor, buttonColor, iconBg }) => (
  <div className={`bg-gradient-to-br ${color} border-2 ${borderColor} rounded-2xl p-6 hover:shadow-lg transition-all`}>
    <div className="flex items-start gap-4">
      <div className={`${iconBg} p-3 rounded-xl text-white shadow-lg`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{text}</p>
        <button className={`${buttonColor} text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg`}>
          Learn More
        </button>
      </div>
    </div>
  </div>
);