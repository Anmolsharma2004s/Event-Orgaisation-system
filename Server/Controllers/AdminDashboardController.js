const EventModel = require("../Models/EventModel");
const BookingModel = require("../Models/BookingModel");

const getAdminDashboard = async (req, res) => {
  try {
    const totalEvents = await EventModel.countDocuments();
    const pendingEvents = await EventModel.countDocuments({ status: "pending" });

    const totalBookings = await BookingModel.countDocuments();

    const revenueResult = await BookingModel.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    const recentEvents = await EventModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status createdAt");

    res.status(200).json({
      totalEvents,
      pendingEvents,
      totalBookings,
      totalRevenue,
      recentEvents,
    });

  } catch (error) {
    res.status(500).json({
      message: "Dashboard data fetch failed",
      error: error.message,
    });
  }
};

module.exports = { getAdminDashboard };