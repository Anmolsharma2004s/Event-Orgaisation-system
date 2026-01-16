const User = require("../Models/AuthModel");
const Booking = require("../Models/BookingModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    // attach booking stats
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const bookings = await Booking.find({ userId: user._id });

        const totalSpent = bookings.reduce(
          (sum, b) => sum + b.totalAmount,
          0
        );

        return {
          ...user.toObject(),
          orders: bookings.length,
          totalSpent,
        };
      })
    );

    res.status(200).json(usersWithStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers };