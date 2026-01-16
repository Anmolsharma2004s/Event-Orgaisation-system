const EventModel = require("../Models/EventModel");
const BookingModel = require("../Models/BookingModel");

const getTotalEvents = async (req, res) => {
  try {
    const totalEvents = await EventModel.countDocuments();
    res.json({ totalEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await BookingModel.countDocuments();
    res.json({ totalBookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getTotalRevenue = async (req, res) => {
  try {
    const revenue = await BookingModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.json({ totalRevenue: revenue[0]?.totalRevenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getStatusStats = async (req, res) => {
  try {
    const stats = await EventModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ statusStats: stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await BookingModel.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    res.json({ monthlyRevenue: revenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTotalEvents,
  getTotalBookings,
  getTotalRevenue,
  getStatusStats,
  getMonthlyRevenue,
};