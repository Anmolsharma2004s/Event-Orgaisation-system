import { useEffect, useState } from "react";
import api from "../../api";
import { TrendingUp, CalendarDays, Users, IndianRupee } from "lucide-react";

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = async () => {
    try {
      const [
        totalEventsRes,
        totalRevenueRes,
        totalBookingsRes,
        monthlyRevenueRes,
      ] = await Promise.all([
        api.get("/analytics/total-events"),
        api.get("/analytics/total-revenue"),
        api.get("/analytics/total-bookings"),
        api.get("/analytics/monthly-revenue"),
      ]);

      setSummary({
        totalEvents: totalEventsRes.data.totalEvents,
        totalRevenue: totalRevenueRes.data.totalRevenue,
        totalCustomers: totalBookingsRes.data.totalBookings,
      });

      setMonthly(monthlyRevenueRes.data.monthlyRevenue);
    } catch (err) {
      console.error("Error loading analytics data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg text-black">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="text-blue-600" />
        Analytics Dashboard
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card
          icon={<CalendarDays className="text-purple-600" size={28} />}
          title="Total Events"
          value={summary.totalEvents}
        />

        <Card
          icon={<IndianRupee className="text-green-600" size={28} />}
          title="Total Revenue"
          value={`₹${summary.totalRevenue}`}
        />

        <Card
          icon={<Users className="text-orange-600" size={28} />}
          title="Total Bookings"
          value={summary.totalCustomers}
        />

      </div>

      {/* MONTHLY REVENUE */}
      <h3 className="text-2xl font-semibold mb-3">Monthly Revenue</h3>

      <div className="bg-gray-100 p-4 rounded-xl">
        {monthly.length === 0 ? (
          <p>No monthly data available</p>
        ) : (
          <ul className="space-y-2">
            {monthly.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>Month {item._id.month}</span>
                <span className="font-bold">₹{item.total}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="bg-gray-100 p-5 rounded-xl">
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Analytics;