import { useState, useEffect } from "react";
import {
  Bell,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react";

// ✅ REAL IMPORTS (IMPORTANT)
import Analytics from "../../pages/admin/Analytics";
import Setting from "../../pages/admin/Settings";
import User from "../../pages/admin/UserData";
import Events from "../../pages/admin/Events";
import Registrations from "../../pages/admin/Registrations";
import api from "../../api";

const Admindashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // SIDEBAR ITEMS
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "events", label: "Manage Events", icon: Calendar },
    { id: "registrations", label: "Registrations", icon: FileText },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // FETCH DASHBOARD STATS
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // FETCH ADMIN NOTIFICATIONS
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data || []);
      } catch (err) {
        console.error("Notification fetch error", err);
      }
    };
    fetchNotifications();
  }, []);

  // STATS CARDS (backend driven)
  const stats = dashboardData
    ? [
        {
          icon: DollarSign,
          label: "Total Revenue",
          value: `₹${dashboardData.totalRevenue}`,
          color: "bg-gradient-to-br from-green-400 to-green-600",
          change: "+12.5%",
          changeType: "up",
        },
        {
          icon: Users,
          label: "Total Users",
          value: dashboardData.totalUsers,
          color: "bg-gradient-to-br from-blue-400 to-blue-600",
          change: "+8.2%",
          changeType: "up",
        },
        {
          icon: ShoppingCart,
          label: "Total Bookings",
          value: dashboardData.totalBookings,
          color: "bg-gradient-to-br from-purple-400 to-purple-600",
          change: "+15.3%",
          changeType: "up",
        },
        {
          icon: TrendingUp,
          label: "Growth Rate",
          value: dashboardData.growthRate,
          color: "bg-gradient-to-br from-orange-400 to-orange-600",
          change: "+5.1%",
          changeType: "up",
        },
      ]
    : [];

  // QUICK STATS (Frontend only - for demo)
  const quickStats = [
    { label: "Active Events", value: "12", icon: Calendar, color: "text-blue-600" },
    { label: "Pending Approvals", value: "5", icon: Clock, color: "text-yellow-600" },
    { label: "Today's Registrations", value: "28", icon: Award, color: "text-green-600" },
    { label: "Total Categories", value: "8", icon: MapPin, color: "text-purple-600" },
  ];

  // RECENT EVENTS STATUS (Frontend only - for demo)
  const recentEventStatus = [
    { name: "Tech Conference 2025", status: "Active", attendees: 150, color: "bg-green-100 text-green-800" },
    { name: "Music Festival", status: "Upcoming", attendees: 320, color: "bg-blue-100 text-blue-800" },
    { name: "Food Carnival", status: "Active", attendees: 89, color: "bg-green-100 text-green-800" },
    { name: "Sports Tournament", status: "Completed", attendees: 200, color: "bg-gray-100 text-gray-800" },
  ];

  // PAGE SWITCHER
  const renderPage = () => {
    switch (currentPage) {
      case "events":
        return <Events />;
      case "users":
        return <User />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Setting />;
      case "registrations":
        return <Registrations />;
      default:
        return renderDashboardContent();
    }
  };

  // DASHBOARD HOME CONTENT
  const renderDashboardContent = () => (
    <>
      {/* WELCOME HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your events today.</p>
      </div>

      {/* MAIN STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp size={16} />
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <item.icon className={item.color} size={20} />
              <div>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* RECENT EVENTS STATUS */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            Recent Events Status
          </h3>
          <div className="space-y-3">
            {recentEventStatus.map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.attendees} attendees</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.color}`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY / NOTIFICATIONS */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="text-blue-600" size={20} />
            Recent Activity
          </h3>

          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto text-gray-300 mb-2" size={48} />
              <p className="text-gray-500">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r hover:bg-blue-100 transition-colors">
                  <p className="font-semibold text-gray-800">{n.message}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={14} />
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SYSTEM STATUS INDICATORS */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-800">Server Status</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-800">Database</p>
              <p className="text-sm text-green-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-800">Payment Gateway</p>
              <p className="text-sm text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-400 mt-1">Event Management System</p>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                currentPage === item.id
                  ? "bg-blue-600 shadow-lg transform scale-105"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default Admindashboard;